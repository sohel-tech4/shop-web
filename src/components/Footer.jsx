
import { Facebook, Mail, MessageCircle } from "lucide-react";
import { BUSINESS, getMailUrl, getWhatsAppUrl } from "../config";
import VisitorCounter from "./VisitorCounter";

export default function Footer({ lang }) {
  const isBn = lang === "bn";

  return (
    <footer className="bg-[#062d43] text-white">
      <div className="mx-auto max-w-7xl px-5 py-5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">

          {/* Business Information */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img
                src="/logo.PNG"
                alt="Nagorik Computer & e-Service"
                className="h-14 w-14 shrink-0 rounded-xl bg-white p-1 object-contain shadow-sm"
              />
              <h2 className="text-lg font-bold leading-snug text-white sm:text-xl">
                Nagorik Computer &amp; e-Service
              </h2>
            </div>

            <p className="text-sm leading-7 text-white/70">
              {isBn
                ? "আপনার সকল ধরনের অনলাইন ও অফলাইন ডিজিটাল সেবার নির্ভরযোগ্য ঠিকানা। আমরা দ্রুত, সহজ ও বিশ্বস্ততার সঙ্গে আপনাদের সেবা প্রদান করি।"
                : "Your trusted destination for all kinds of online and offline digital services. We provide fast, easy and reliable services."}
            </p>
          </div>

          {/* Quick Links + Contact */}
          <div className="col-span-1 grid grid-cols-2 gap-4 md:col-span-2 md:grid-cols-2 md:gap-10">

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-base font-semibold text-white">
                {isBn ? "দ্রুত লিংক" : "Quick Links"}
              </h3>

              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  <a href="#home" className="transition hover:text-[#8af0e1]">
                    {isBn ? "হোম" : "Home"}
                  </a>
                </li>
                <li>
                  <a href="#services" className="transition hover:text-[#8af0e1]">
                    {isBn ? "আমাদের সেবা" : "Our Services"}
                  </a>
                </li>
                <li>
                  <a href="#about" className="transition hover:text-[#8af0e1]">
                    {isBn ? "আমাদের সম্পর্কে" : "About Us"}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="transition hover:text-[#8af0e1]">
                    {isBn ? "যোগাযোগ" : "Contact"}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 text-base font-semibold text-white">
                {isBn ? "যোগাযোগ" : "Contact"}
              </h3>

              <ul className="space-y-4 text-sm text-white/70">
                <li>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-2 transition hover:text-[#8af0e1]"
                  >
                    <MessageCircle size={17} className="mt-0.5 shrink-0" />
                    <span>01776462919</span>
                  </a>
                </li>

                <li>
                  <a
                    href={getMailUrl()}
                    className="flex items-start gap-2 transition hover:text-[#8af0e1]"
                  >
                    <Mail size={17} className="mt-0.5 shrink-0" />
                    <span className="break-all">dhaka2627@gmail.com</span>
                  </a>
                </li>

                <li>
                  <a
                    href={BUSINESS.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-2 transition hover:text-[#8af0e1]"
                  >
                    <Facebook size={17} className="mt-0.5 shrink-0" />
                    <span>Facebook</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Visitor Counter + Copyright */}
        <div className="mt-9 border-t border-white/10 pt-5">
          <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">

            {/* Visitor Counter: Left on mobile and desktop */}
            <div className="w-full text-left">
              <VisitorCounter lang={lang} />
            </div>

            {/* Copyright: Center on mobile, right on desktop */}
            <div className="w-full text-center text-xs text-white/45 md:text-right">
              © {new Date().getFullYear()} {BUSINESS.name}.{" "}
              {isBn ? "সর্বস্বত্ব সংরক্ষিত।" : "All rights reserved."}
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
