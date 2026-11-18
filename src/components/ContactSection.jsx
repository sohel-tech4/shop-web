import { Facebook, Mail, MessageCircle } from "lucide-react";
import { BUSINESS, getMailUrl, getWhatsAppUrl } from "../config";

export default function ContactSection({ lang }) {
  const isBn = lang === "bn";
  const linkClass = "inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/20";

  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="rounded-[2rem] bg-[#07334a] p-7 text-white sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-[#9ce9d9]">{isBn ? "যোগাযোগ" : "Contact"}</div>
            <h2 className="mt-2 text-3xl font-black">{isBn ? "আপনার প্রয়োজনীয় সেবা নিয়ে কথা বলুন" : "Talk to us about the service you need"}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-white/70">{isBn ? "সরাসরি যোগাযোগ করতে WhatsApp, ইমেইল অথবা Facebook গ্রুপ বেছে নিন। সেবা নিতে চাইলে সেবার কার্ডের ‘সেবা নিন’ বাটন ব্যবহার করুন।" : "Contact us directly through WhatsApp, email or our Facebook group. To request a service, use the Get Service button in its service details."}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer" className={linkClass}><MessageCircle size={18} /> WhatsApp</a>
            <a href={getMailUrl()} className={linkClass}><Mail size={18} /> {isBn ? "ইমেইল" : "Email"}</a>
            <a href={BUSINESS.facebook} target="_blank" rel="noreferrer" className={linkClass}><Facebook size={18} /> {isBn ? "Facebook গ্রুপ" : "Facebook Group"}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
