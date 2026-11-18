
import { useEffect, useRef, useState } from "react";
import {
  Bot,
  X,
  Send,
  MessageCircle,
  RotateCcw,
  LoaderCircle,
  Mail,
} from "lucide-react";
import { BUSINESS, getMailUrl, getWhatsAppUrl } from "../config";

const getGreeting = (lang) =>
  lang === "en"
    ? `Hello! 👋 Welcome to Nagorik Computer & e-Service. How can I help you today? You can ask about our services and required documents.

For direct contact: WhatsApp ${BUSINESS.whatsappDisplay}: +${BUSINESS.whatsappNumber} | Email: ${BUSINESS.email}.`
    : `আসসালামু আলাইকুম! 👋 Nagorik Computer & e-Service-এ স্বাগতম। কীভাবে সাহায্য করতে পারি? আমাদের সার্ভিস ও প্রয়োজনীয় কাগজপত্র সম্পর্কে জানতে পারেন।

সরাসরি যোগাযোগ: WhatsApp: +${BUSINESS.whatsappNumber} | ইমেইল: ${BUSINESS.email}`;

const getErrorMessage = (lang) =>
  lang === "en"
    ? `Sorry! Our AI Assistant is temporarily unavailable. Please try again later. Contact us on WhatsApp: +${BUSINESS.whatsappNumber} or email: ${BUSINESS.email}.`
    : `দুঃখিত! আমাদের AI Assistant এই মুহূর্তে সাময়িকভাবে কাজ করছে না। সরাসরি যোগাযোগ করুন: WhatsApp: +${BUSINESS.whatsappNumber} অথবা ইমেইল: ${BUSINESS.email}। সেবা কার্ডের ‘সেবা নিন’ বাটন দিয়েও আবেদন পাঠাতে পারবেন।`;

export default function Chatbot({ lang = "bn" }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState(() => [
    { role: "assistant", content: getGreeting(lang) },
  ]);

  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading, open]);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(
      () => inputRef.current?.focus(),
      100
    );

    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    setMessages((current) => {
      if (
        current.length === 1 &&
        current[0].role === "assistant"
      ) {
        return [
          { role: "assistant", content: getGreeting(lang) },
        ];
      }

      return current;
    });
  }, [lang]);

  const resetChat = () => {
    setMessages([
      { role: "assistant", content: getGreeting(lang) },
    ]);
  };

  async function sendMessage(event) {
    event?.preventDefault();

    const text = input.trim();

    if (!text || loading) return;

    const nextMessages = [
      ...messages,
      { role: "user", content: text },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "/.netlify/functions/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: nextMessages
              .filter(
                (m) =>
                  m.role === "user" ||
                  m.role === "assistant"
              )
              .slice(-8),
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || "AI service unavailable"
        );
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.reply ||
            (lang === "en"
              ? "Sorry, I couldn't prepare a reply."
              : "দুঃখিত, উত্তর তৈরি করা যায়নি।"),
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: getErrorMessage(lang),
          showContact: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="ng-chatbot"
      style={{
        bottom: "16px",
      }}
    >
      {open && (
        <section
          className="ng-chat-panel"
          aria-label="Nagorik AI chat"
          role="dialog"
          aria-modal="false"
        >
          <header className="ng-chat-header">
            <div className="ng-chat-avatar">
              <Bot size={22} />
            </div>

            <div className="ng-chat-heading">
              <strong>Nagorik Assistant</strong>
              <span>
                <i />
                {lang === "en"
                  ? "AI support · বাংলা / English"
                  : "AI সহায়তা · বাংলা / English"}
              </span>
            </div>

            <button
              type="button"
              className="ng-chat-icon-btn"
              aria-label={
                lang === "en" ? "New chat" : "নতুন চ্যাট"
              }
              title={
                lang === "en" ? "New chat" : "নতুন চ্যাট"
              }
              onClick={resetChat}
            >
              <RotateCcw size={17} />
            </button>

            <button
              type="button"
              className="ng-chat-icon-btn"
              aria-label={
                lang === "en"
                  ? "Close chat"
                  : "চ্যাট বন্ধ করুন"
              }
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </header>

          <div className="ng-chat-notice">
            {lang === "en"
              ? "Please do not send passwords, OTPs, or full identity documents here."
              : "এখানে পাসওয়ার্ড, OTP বা পরিচয়পত্রের সম্পূর্ণ তথ্য পাঠাবেন না।"}
          </div>

          <div className="ng-chat-contact-links" aria-label={lang === "en" ? "Direct contact options" : "সরাসরি যোগাযোগের মাধ্যম"}>
            <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer"><MessageCircle size={14} /> WhatsApp: +{BUSINESS.whatsappNumber}</a>
            <a href={getMailUrl()}><Mail size={14} /> {BUSINESS.email}</a>
          </div>

          <div
            className="ng-chat-messages"
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <div
                key={`${index}-${message.role}`}
                className={`ng-chat-row ${
                  message.role === "user"
                    ? "is-user"
                    : "is-assistant"
                }`}
              >
                {message.role === "assistant" && (
                  <span className="ng-chat-small-avatar">
                    <Bot size={14} />
                  </span>
                )}

                <div className="ng-chat-bubble">
                  <div>{message.content}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="ng-chat-row is-assistant">
                <span className="ng-chat-small-avatar">
                  <Bot size={14} />
                </span>

                <div className="ng-chat-bubble ng-chat-typing">
                  <LoaderCircle
                    size={15}
                    className="ng-chat-spin"
                  />
                  {lang === "en"
                    ? "Thinking…"
                    : "উত্তর তৈরি হচ্ছে…"}
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          <form
            className="ng-chat-form"
            onSubmit={sendMessage}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1500}
              placeholder={
                lang === "en"
                  ? "Write your question…"
                  : "আপনার প্রশ্ন লিখুন…"
              }
              aria-label={
                lang === "en"
                  ? "Your message"
                  : "আপনার বার্তা"
              }
              disabled={loading}
            />

            <button
              type="submit"
              aria-label={
                lang === "en"
                  ? "Send message"
                  : "বার্তা পাঠান"
              }
              disabled={loading || !input.trim()}
            >
              <Send size={18} />
            </button>
          </form>

          <footer className="ng-chat-footer">
            {lang === "en"
              ? "AI can make mistakes. Verify official requirements."
              : "AI ভুল করতে পারে। সরকারি শর্ত অবশ্যই যাচাই করুন।"}
          </footer>
        </section>
      )}

      <button
        type="button"
        className={`ng-chat-launcher ${
          open ? "is-open" : ""
        }`}
        onClick={() => setOpen((value) => !value)}
        aria-label={
          open
            ? lang === "en"
              ? "Close assistant"
              : "চ্যাট বন্ধ করুন"
            : lang === "en"
              ? "Chat with Nagorik"
              : "Nagorik-এর সঙ্গে চ্যাট করুন"
        }
      >
        {open ? (
          <X size={24} />
        ) : (
          <MessageCircle size={25} />
        )}
      </button>
    </div>
  );
}
