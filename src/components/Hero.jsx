import { ArrowRight, CheckCircle2, CreditCard, FileCheck2, MessageCircle, Palette, Plane, Printer, ScanLine, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { getWhatsAppUrl } from "../config";
import { heroIcons } from "../data/ui";

export default function Hero({ lang, serviceCount, onExplore }) {
  return (
    <section className="hero-shell overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#bdebe2] bg-white/80 px-4 py-2 text-sm font-semibold text-[#0f706d] shadow-sm">
              <Sparkles size={16} /> {lang === "bn" ? "সহজ • দ্রুত • নির্ভরযোগ্য" : "Simple • Fast • Reliable"}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#07334a] sm:text-5xl lg:text-6xl">
              {lang === "bn" ? <>আপনার <span className="gradient-text">বিশ্বস্ত ডিজিটাল সেবা</span> এক জায়গায়</> : <>Your <span className="gradient-text">Trusted Digital Services</span> in One Place</>}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {lang === "bn" ? "অনলাইন আবেদন, সরকারি সেবা, ভিসা, শিক্ষা, প্রিন্টিং ও কম্পিউটার সংক্রান্ত প্রয়োজনীয় কাজ—সহজভাবে সম্পন্ন করতে আমরা পাশে আছি।" : "Online applications, government services, visa, education, printing and computer services—helping you complete everyday digital tasks with ease."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={onExplore} className="btn btn-primary rounded-xl px-6 text-white shadow-lg shadow-primary/20">{lang === "bn" ? "সেবাসমূহ দেখুন" : "Explore Services"} <ArrowRight size={17} /></button>
              <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer" className="btn rounded-xl border-[#bdebe2] bg-white px-6 text-[#0f706d] hover:bg-[#f0fffb]"><MessageCircle size={17} /> WhatsApp</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={17} className="text-success" /> {lang === "bn" ? "সঠিক তথ্যের প্রতি গুরুত্ব" : "Accuracy focused"}</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck size={17} className="text-success" /> {lang === "bn" ? "সহজ ও স্বচ্ছ প্রক্রিয়া" : "Simple & transparent"}</span>
            </div>
            <div className="mt-8 lg:hidden">
              <div className="mobile-orbit-panel rounded-2xl border border-[#bdebe2] bg-white/70 p-3 shadow-sm">
                <div className="service-orbit mx-auto">
                  <div className="orbit-ring orbit-ring-one" />
                  <div className="orbit-ring orbit-ring-two" />
                  {heroIcons.map((Icon, index) => (
                    <div key={index} className="orbit-icon" style={{ "--orbit-index": index, "--orbit-delay": `${index * 0.18}s` }}><Icon size={21} strokeWidth={1.9} /></div>
                  ))}
                  <div className="orbit-core"><img src="/logo.PNG" alt="Nagorik  Computer & e-Service" className="orbit-logo" /></div>
                </div>
                <div className="text-center text-sm font-bold text-[#0f706d]">{serviceCount}+ {lang === "bn" ? "ধরনের ডিজিটাল সেবা" : "digital services"}</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative mx-auto max-w-md rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <div className="service-orbit mx-auto">
                <div className="orbit-ring orbit-ring-one" />
                <div className="orbit-ring orbit-ring-two" />
                {heroIcons.map((Icon, index) => (
                  <div key={index} className="orbit-icon" style={{ "--orbit-index": index, "--orbit-delay": `${index * 0.18}s` }}><Icon size={24} strokeWidth={1.9} /></div>
                ))}
                <div className="orbit-core"><img src="/logo.PNG" alt="Nagorik  Computer & e-Service" className="orbit-logo" /></div>
              </div>
              <div className="mt-4 rounded-2xl bg-[#07334a] p-5 text-white">
                <div className="text-sm font-semibold text-[#9ce9d9]">{lang === "bn" ? "এক ছাদের নিচে" : "Under one roof"}</div>
                <div className="mt-1 text-xl font-bold">{serviceCount}+ {lang === "bn" ? "ধরনের সেবা" : "types of services"}</div>
                <div className="mt-2 text-sm text-white/70">{lang === "bn" ? "প্রয়োজনীয় তথ্য জানতে যেকোনো সেবায় ক্লিক করুন।" : "Click any service to see what you need."}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
