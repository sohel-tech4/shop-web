import { FileText, MessageCircle, ShieldCheck } from "lucide-react";

export default function AboutSection({ lang }) {
  const cards = [
    [ShieldCheck, lang === "bn" ? "বিশ্বস্ততা" : "Trust", lang === "bn" ? "তথ্য ও প্রয়োজনীয় কাগজপত্র সম্পর্কে পরিষ্কার ধারণা দেওয়ার চেষ্টা করি।" : "Clear guidance on information and required documents."],
    [FileText, lang === "bn" ? "এক জায়গায় অনেক সেবা" : "Many Services", lang === "bn" ? "সরকারি আবেদন থেকে প্রিন্ট, PDF ও কম্পোজ—দৈনন্দিন ডিজিটাল কাজ এক জায়গায়।" : "Government applications, printing, PDF, typing and everyday digital tasks in one place."],
    [MessageCircle, lang === "bn" ? "সহজ যোগাযোগ" : "Easy Contact", lang === "bn" ? "সেবা বেছে নিয়ে সরাসরি WhatsApp বা Email-এ যোগাযোগ করতে পারবেন।" : "Choose a service and contact us directly through WhatsApp or email."],
  ];

  return <section id="about" className="bg-white"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6"><div className="grid gap-5 md:grid-cols-3">{cards.map(([Icon, title, desc]) => <div key={title} className="rounded-3xl border border-slate-100 bg-base-200 p-7"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#159f9b] shadow-sm"><Icon size={21} /></div><h3 className="mt-5 text-xl font-bold text-[#07334a]">{title}</h3><p className="mt-2 leading-7 text-slate-500">{desc}</p></div>)}</div></div></section>;
}
