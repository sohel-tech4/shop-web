import { Globe2, Menu, Moon, Sun, X } from "lucide-react";
import { BUSINESS } from "../config";

export default function Header({ lang, setLang, darkMode, setDarkMode, mobileMenu, setMobileMenu, onShowArticles }) {
  const navItems = [
    ["#home", lang === "bn" ? "হোম" : "Home"],
    ["#services", lang === "bn" ? "সেবাসমূহ" : "Services"],
    ["#articles", lang === "bn" ? "আর্টিকেল" : "Articles"],
    ["#reviews", lang === "bn" ? "রিভিউ" : "Reviews"],
    ["#about", lang === "bn" ? "কেন আমরা" : "Why Us"],
    ["#contact", lang === "bn" ? "যোগাযোগ" : "Contact"],
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/90 backdrop-blur-xl">
      <div className="navbar mx-auto max-w-7xl px-4 sm:px-6">
        <div className="navbar-start gap-3">
          <a href="#home" className="flex items-center gap-3">
            <img src="/logo.PNG" alt={BUSINESS.name} className="h-12 w-12 rounded-full object-contain shadow-sm" />
            <div className="hidden sm:block">
              <div className="text-base font-extrabold tracking-tight brand-title sm:text-lg">
                Nagorik  <span className="brand-accent">Computer & e-Service</span>
              </div>
              <div className="text-xs font-medium text-slate-500">{lang === "bn" ? BUSINESS.taglineBn : BUSINESS.taglineEn}</div>
            </div>
          </a>
        </div>

        <div className="navbar-end gap-2">
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(([href, label]) => <a key={href} href={href} onClick={href === "#articles" ? onShowArticles : undefined} className="btn btn-ghost btn-sm">{label}</a>)}
          </nav>

          <button className="btn btn-sm border-0 bg-slate-100" onClick={() => setLang(lang === "bn" ? "en" : "bn")} aria-label="Change language">
            <Globe2 size={16} /> {lang === "bn" ? "EN" : "বাংলা"}
          </button>

          <button className="theme-toggle btn btn-sm rounded-xl" onClick={() => setDarkMode((v) => !v)} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            <span className="hidden sm:inline">{darkMode ? (lang === "bn" ? "লাইট" : "Light") : (lang === "bn" ? "ডার্ক" : "Dark")}</span>
          </button>

          <button className="btn btn-square btn-ghost md:hidden" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menu">
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="mobile-nav border-t px-5 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map(([href, label]) => (
              <a key={href} onClick={() => { setMobileMenu(false); if (href === "#articles") onShowArticles?.(); }} href={href} className="rounded-xl px-3 py-2">{label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
