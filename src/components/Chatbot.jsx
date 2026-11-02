
import { useEffect, useRef, useState } from "react";
import {
  Bot,
  X,
  Send,
  MessageCircle,
  RotateCcw,
  LoaderCircle,
} from "lucide-react";

const getGreeting = (lang) =>
  lang === "en"
    ? "Hello! 👋 Welcome to NextGen e-Service Center. How can I help you today? You can ask about our services and required documents."
    : "আসসালামু আলাইকুম! 👋 NextGen e-Service Center-এ স্বাগতম। কীভাবে সাহায্য করতে পারি? আমাদের সার্ভিস ও প্রয়োজনীয় কাগজপত্র সম্পর্কে জানতে পারেন।";

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
          data.error ||
            (lang === "en"
              ? "The assistant is temporarily unavailable."
              : "দুঃখিত, এই মুহূর্তে উত্তর দেওয়া যাচ্ছে না।")
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
          content:
            error.message ||
            (lang === "en"
              ? "Connection error. Please try again."
              : "সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।"),
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
        bottom: "60px",
      }}
    >
      {open && (
        <section
          className="ng-chat-panel"
          aria-label="NextGen AI chat"
          role="dialog"
          aria-modal="false"
        >
          <header className="ng-chat-header">
            <div className="ng-chat-avatar">
              <Bot size={22} />
            </div>

            <div className="ng-chat-heading">
              <strong>NextGen Assistant</strong>
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

          <div className="ng-chat-messages" aria-live="polite">
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
                  {message.content}
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
              ? "Chat with NextGen"
              : "NextGen-এর সঙ্গে চ্যাট করুন"
        }
      >
        {open ? (
          <X size={24} />
        ) : (
          <>
            <MessageCircle size={23} />
            <span>
              {lang === "en" ? "Ask us" : "জিজ্ঞাসা করুন"}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
