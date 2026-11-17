import { Globe2, Menu, Moon, Sun, X, ChevronDown, LogIn, LayoutDashboard, UserRound, LogOut } from "lucide-react";
import React from "react";
import { BUSINESS } from "../config";

export default function Header({ lang, setLang, darkMode, setDarkMode, mobileMenu, setMobileMenu, onShowArticles, onLogin, onLogout, authUser }) {
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const settingsRef = React.useRef(null);
  const navItems = [
    ["#home", lang === "bn" ? "হোম" : "Home"],
    ["#services", lang === "bn" ? "সেবাসমূহ" : "Services"],
    ["#articles", lang === "bn" ? "আর্টিকেল" : "Articles"],
    ["#reviews", lang === "bn" ? "রিভিউ" : "Reviews"],
    ["#about", lang === "bn" ? "কেন আমরা" : "Why Us"],
    ["#contact", lang === "bn" ? "যোগাযোগ" : "Contact"],
  ];

  // Keep the menu open while changing language/theme; close only on outside click or Escape.
  React.useEffect(() => {
    if (!settingsOpen) return;
    const handlePointerDown = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) setSettingsOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSettingsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [settingsOpen]);

  React.useEffect(() => {
    if (!mobileMenu) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMobileMenu(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenu, setMobileMenu]);

  const accountLabel = authUser
    ? (lang === "bn" ? "ড্যাশবোর্ড" : "Dashboard")
    : (lang === "bn" ? "লগইন / অ্যাকাউন্ট" : "Login / Account");
  const accountSubLabel = authUser
    ? (authUser.role === "admin" ? "Administrator" : (lang === "bn" ? "সাধারণ ব্যবহারকারী" : "User account"))
    : (lang === "bn" ? "আপনার অ্যাকাউন্টে প্রবেশ করুন" : "Sign in to your account");
  const AccountIcon = authUser ? LayoutDashboard : UserRound;
  const profilePhoto = authUser?.photoURL || authUser?.photoUrl || authUser?.avatarUrl || authUser?.avatar || "";
  const profileInitial = (authUser?.displayName || authUser?.email || "U").trim().charAt(0).toUpperCase();

  const languageControl = (
    <button className="settings-item" onClick={() => setLang((current) => current === "bn" ? "en" : "bn")}>
      <span className="settings-item-icon"><Globe2 size={18} /></span>
      <span className="flex-1 text-left"><strong>{lang === "bn" ? "ভাষা পরিবর্তন" : "Language"}</strong><small>{lang === "bn" ? "বাংলা" : "English"}</small></span>
      <span className="settings-current">{lang === "bn" ? "EN" : "বাং"}</span>
    </button>
  );
  const themeControl = (
    <button className="settings-item" onClick={() => setDarkMode((value) => !value)}>
      <span className="settings-item-icon">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</span>
      <span className="flex-1 text-left"><strong>{lang === "bn" ? "থিম" : "Appearance"}</strong><small>{darkMode ? (lang === "bn" ? "ডার্ক মোড" : "Dark mode") : (lang === "bn" ? "লাইট মোড" : "Light mode")}</small></span>
      <span className={`theme-switch ${darkMode ? "on" : ""}`}><i /></span>
    </button>
  );
  const accountControl = (
    <button className="settings-item settings-login" onClick={() => { onLogin(); setSettingsOpen(false); setMobileMenu(false); }}>
      <span className="settings-item-icon"><AccountIcon size={18} /></span>
      <span className="flex-1 text-left"><strong>{accountLabel}</strong><small>{accountSubLabel}</small></span>
    </button>
  );
  const logoutControl = authUser ? (
    <button className="settings-item settings-logout" onClick={() => { onLogout?.(); setSettingsOpen(false); setMobileMenu(false); }}>
      <span className="settings-item-icon"><LogOut size={18} /></span>
      <span className="flex-1 text-left"><strong>{lang === "bn" ? "লগআউট" : "Log out"}</strong><small>{lang === "bn" ? "আপনার অ্যাকাউন্ট থেকে বের হয়ে যান" : "Sign out of your account"}</small></span>
    </button>
  ) : null;

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/90 backdrop-blur-xl">
      <div className="navbar mx-auto max-w-7xl px-4 sm:px-6">
        <div className="navbar-start gap-3">
          <a href="#home" className="flex items-center gap-3">
            <img src="/logo.PNG" alt={BUSINESS.name} className="h-12 w-12 rounded-full object-contain shadow-sm" />
            <div className="hidden sm:block">
              <div className="text-base font-extrabold tracking-tight brand-title sm:text-lg">Nagorik <span className="brand-accent">Computer & e-Service</span></div>
              <div className="text-xs font-medium text-slate-500">{lang === "bn" ? BUSINESS.taglineBn : BUSINESS.taglineEn}</div>
            </div>
          </a>
        </div>

        <div className="navbar-end gap-2">
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(([href, label]) => <a key={href} href={href} onClick={() => { if (href === "#articles") onShowArticles?.(); }} className="btn btn-ghost btn-sm">{label}</a>)}
          </nav>

          {/* Desktop settings dropdown */}
          <div className="relative hidden md:block" ref={settingsRef}>
            <button className="settings-trigger account-avatar-trigger btn btn-sm rounded-full" onClick={() => setSettingsOpen((open) => !open)} aria-label={authUser ? accountLabel : (lang === "bn" ? "লগইন ও সেটিংস" : "Login and settings")} aria-expanded={settingsOpen} title={authUser ? accountLabel : (lang === "bn" ? "লগইন / সেটিংস" : "Login / Settings")}>
              {authUser && profilePhoto
                ? <img src={profilePhoto} alt="প্রোফাইল ছবি" className="account-avatar-image" />
                : authUser
                  ? <span className="account-avatar-initial">{profileInitial}</span>
                  : <UserRound size={21} />}
            </button>
            {settingsOpen && <div className="settings-menu absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border p-2 shadow-2xl">
              <p className="px-3 pb-2 pt-2 text-xs font-bold uppercase tracking-wider opacity-60">{lang === "bn" ? "ওয়েবসাইট সেটিংস" : "Website settings"}</p>
              {languageControl}
              {themeControl}
              <div className="settings-divider" />
              {accountControl}
              {logoutControl}
            </div>}
          </div>

          <button className={`btn btn-square btn-ghost md:hidden mobile-menu-toggle ${mobileMenu ? "is-active" : ""}`} onClick={() => setMobileMenu((open) => !open)} aria-label={mobileMenu ? (lang === "bn" ? "মেনু বন্ধ করুন" : "Close menu") : (lang === "bn" ? "মেনু খুলুন" : "Open menu")} aria-expanded={mobileMenu} aria-controls="main-mobile-navigation">
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div id="main-mobile-navigation" className={`mobile-nav md:hidden ${mobileMenu ? "is-open" : ""}`} aria-hidden={!mobileMenu}>
        <div className="mobile-nav-inner px-5 py-3">
          <div className="flex flex-col gap-1">
            {navItems.map(([href, label], index) => <a key={href} style={{ "--mobile-nav-index": index }} onClick={() => { setMobileMenu(false); if (href === "#articles") onShowArticles?.(); }} href={href} tabIndex={mobileMenu ? 0 : -1} className="mobile-nav-link rounded-xl px-3 py-2">{label}</a>)}
          </div>
          <div className="mobile-account-settings mt-3 border-t pt-3">
            <p className="mobile-settings-heading">{lang === "bn" ? "অ্যাকাউন্ট ও সেটিংস" : "Account & Settings"}</p>
            <div className="mobile-nav-account-item">{accountControl}</div>
            {logoutControl && <div className="mobile-nav-account-item">{logoutControl}</div>}
            <div className="settings-divider" />
            <div className="mobile-settings-grid">
              {languageControl}
              {themeControl}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
