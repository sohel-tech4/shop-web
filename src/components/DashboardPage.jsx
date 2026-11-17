import { useEffect, useRef, useState } from "react";
import { Activity, BarChart3, Bell, ChevronRight, FileText, LayoutDashboard, LogOut, Menu, MessageSquare, Settings, ShieldCheck, Users, BriefcaseBusiness, Globe, Search, UserRound, Globe2, Moon, Sun, ChevronDown, X } from "lucide-react";

export default function DashboardPage({ user, isAdmin, lang = "bn", setLang, darkMode = false, setDarkMode, onLogout, onHome }) {
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const bn = lang === "bn";
  const tr = (bnText, enText) => bn ? bnText : enText;
  useEffect(() => {
    if (!profileMenuOpen) return;
    const close = (event) => { if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) setProfileMenuOpen(false); };
    const key = (event) => { if (event.key === "Escape") setProfileMenuOpen(false); };
    document.addEventListener("pointerdown", close); document.addEventListener("keydown", key);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", key); };
  }, [profileMenuOpen]);
  const items = isAdmin ? [
    { id: "overview", label: tr("ড্যাশবোর্ড", "Dashboard"), icon: LayoutDashboard },
    { id: "users", label: tr("ব্যবহারকারী", "Users"), icon: Users },
    { id: "services", label: tr("সার্ভিস ব্যবস্থাপনা", "Service Management"), icon: BriefcaseBusiness },
    { id: "reviews", label: tr("রিভিউ ও কনটেন্ট", "Reviews & Content"), icon: MessageSquare },
    { id: "reports", label: tr("রিপোর্ট", "Reports"), icon: BarChart3 },
    { id: "settings", label: tr("সেটিংস", "Settings"), icon: Settings },
  ] : [
    { id: "overview", label: tr("ড্যাশবোর্ড", "Dashboard"), icon: LayoutDashboard },
    { id: "applications", label: tr("আমার আবেদন", "My Applications"), icon: FileText },
    { id: "profile", label: tr("প্রোফাইল", "Profile"), icon: UserRound },
    { id: "settings", label: tr("সেটিংস", "Settings"), icon: Settings },
  ];
  const title = items.find((item) => item.id === active)?.label || tr("ড্যাশবোর্ড", "Dashboard");
  const initials = (user.displayName || user.email || "N").slice(0, 1).toUpperCase();
  const toggleLanguage = () => setLang?.((value) => value === "bn" ? "en" : "bn");
  const toggleTheme = () => setDarkMode?.((value) => !value);
  return <div className={`ng-dashboard ${darkMode ? "ng-dashboard-dark" : "ng-dashboard-light"}`}>
    <aside className={`ng-dash-sidebar ${sidebarOpen ? "is-open" : ""}`}>
      <a href="/" className="ng-dash-brand ng-dash-brand-link" aria-label="Nagorik Computer & e-Service - মূল ওয়েবসাইট"><img src="/logo.PNG" alt="Nagorik Computer & e-Service logo"/><div><strong>NAGORIK</strong><span>Computer & e-Service</span></div></a>
      <div className="ng-dash-profile"><div className="ng-dash-avatar">{initials}</div><div className="min-w-0"><strong>{user.displayName || tr("ব্যবহারকারী", "User")}</strong><span>{isAdmin ? "Administrator" : tr("সাধারণ ব্যবহারকারী", "Standard User")}</span></div></div>
      <p className="ng-dash-nav-label">{tr("প্রধান মেনু", "MAIN MENU")}</p>
      <nav className="ng-dash-nav">{items.map(({id,label,icon:Icon}) => <button key={id} className={active === id ? "active" : ""} onClick={() => { setActive(id); setSidebarOpen(false); }}><Icon size={18}/><span>{label}</span>{active === id && <ChevronRight size={16} className="ml-auto"/>}</button>)}</nav>
      <div className="ng-dash-sidebar-bottom"><button onClick={onHome}><Globe size={18}/>{tr("মূল ওয়েবসাইট", "Main Website")}</button><button onClick={onLogout}><LogOut size={18}/>{tr("লগআউট", "Log out")}</button></div>
    </aside>
    <main className="ng-dash-main">
      <header className="ng-dash-topbar">
        <button className={`ng-dash-mobile-menu ${sidebarOpen ? "is-active" : ""}`} onClick={() => setSidebarOpen((v) => !v)} aria-label={sidebarOpen ? tr("মেনু বন্ধ করুন", "Close menu") : tr("মেনু খুলুন", "Open menu")} aria-expanded={sidebarOpen}>{sidebarOpen ? <X/> : <Menu/>}</button>
        <div className="ng-dash-heading"><span className="ng-dash-breadcrumb">Nagorik / {isAdmin ? "Admin" : tr("অ্যাকাউন্ট", "Account")}</span><h1>{title}</h1></div>
        <div className="ng-dash-top-actions">
          <button className="ng-dash-icon-btn" aria-label={tr("নোটিফিকেশন", "Notifications")} title={tr("নোটিফিকেশন", "Notifications")}><Bell size={19}/></button>
          <div className="ng-dash-profile-menu-wrap" ref={profileMenuRef}>
            <button className="ng-dash-top-user" onClick={() => setProfileMenuOpen((value) => !value)} aria-expanded={profileMenuOpen}><div className="ng-dash-avatar small">{initials}</div><span>{user.displayName || user.email}</span><ChevronDown size={15}/></button>
            {profileMenuOpen && <div className="ng-dash-profile-dropdown"><div className="ng-dash-dropdown-heading">{tr("অ্যাকাউন্ট সেটিংস", "Account settings")}</div>
              <button onClick={toggleLanguage}><Globe2 size={17}/><span>{tr("ভাষা পরিবর্তন", "Change language")}</span><strong>{bn ? "বাংলা" : "English"}</strong></button>
              <button onClick={toggleTheme}>{darkMode ? <Sun size={17}/> : <Moon size={17}/>}<span>{tr("মুড পরিবর্তন", "Appearance")}</span><strong>{darkMode ? tr("লাইট", "Light") : tr("ডার্ক", "Dark")}</strong></button>
              <div className="ng-dash-dropdown-divider"/><button className="ng-dash-dropdown-logout" onClick={() => { setProfileMenuOpen(false); onLogout?.(); }}><LogOut size={17}/><span>{tr("লগআউট", "Log out")}</span></button>
            </div>}
          </div>
        </div>
      </header>
      <section className="ng-dash-content">
        {active === "overview" ? <>
          <div className="ng-dash-welcome"><div><span>{isAdmin ? tr("অ্যাডমিন কন্ট্রোল সেন্টার", "ADMIN CONTROL CENTER") : tr("আমার অ্যাকাউন্ট", "MY ACCOUNT")}</span><h2>{tr("স্বাগতম", "Welcome")}, {user.displayName || user.email?.split("@")[0]}!</h2><p>{isAdmin ? tr("আপনার ওয়েবসাইট পরিচালনার সংক্ষিপ্ত বিবরণ এখানে দেখুন।", "View a quick overview of your website management here.") : tr("আপনার অ্যাকাউন্ট ও সেবার তথ্য এখান থেকে পরিচালনা করুন।", "Manage your account and service information here.")}</p></div><div className="ng-dash-welcome-mark"><Activity size={34}/></div></div>
          <div className="ng-dash-stat-grid">{(isAdmin ? [
            [tr("মোট ব্যবহারকারী", "Total Users"), "Firebase Auth", "users", Users], [tr("সার্ভিস", "Services"), tr("ওয়েবসাইটে প্রকাশিত", "Published on website"), "services", BriefcaseBusiness], [tr("রিভিউ", "Reviews"), tr("কনটেন্ট বিভাগ", "Content section"), "reviews", MessageSquare], [tr("অ্যাকাউন্ট স্ট্যাটাস", "Account Status"), tr("সক্রিয়", "Active"), "active", ShieldCheck],
          ] : [
            [tr("অ্যাকাউন্ট", "Account"), tr("সাধারণ ব্যবহারকারী", "Standard User"), "account", UserRound], [tr("ইমেইল", "Email"), tr("যাচাইকৃত লগইন তথ্য", "Verified login details"), "email", FileText], [tr("সেশন", "Session"), tr("লগইন সেশন", "Login session"), "session", Activity], [tr("স্ট্যাটাস", "Status"), tr("সক্রিয়", "Active"), "active", ShieldCheck],
          ]).map(([label,value,key,Icon]) => <article className="ng-dash-stat" key={key}><div className="ng-dash-stat-icon"><Icon size={20}/></div><span>{label}</span><strong>{value}</strong><small>{key === "active" ? tr("আপনার সেশন চালু আছে", "Your session is active") : tr("তথ্য সংযুক্ত হলে এখানে দেখাবে", "Details will appear here when connected")}</small></article>)}</div>
          <div className="ng-dash-panel"><div className="ng-dash-panel-head"><div><h3>{isAdmin ? tr("দ্রুত অ্যাকশন", "Quick Actions") : tr("আপনার অ্যাকাউন্ট", "Your Account")}</h3><p>{isAdmin ? tr("প্রয়োজনীয় ব্যবস্থাপনা বিভাগ নির্বাচন করুন", "Choose a management section") : tr("আপনার লগইন সংক্রান্ত তথ্য", "Your login information")}</p></div></div><div className="ng-dash-quick-grid">{items.filter((x) => x.id !== "overview").map(({id,label,icon:Icon}) => <button key={id} onClick={() => setActive(id)}><Icon size={19}/><span>{label}</span><ChevronRight size={16}/></button>)}</div></div>
          <div className="ng-dash-panel ng-dash-account"><ShieldCheck size={21}/><div><strong>{tr("নিরাপদ অ্যাকাউন্ট সেশন", "Secure Account Session")}</strong><p>{tr("লগইন", "Signed in")}: {user.email}</p></div><span className="ng-dash-status">{tr("সক্রিয়", "Active")}</span></div>
          {isAdmin && <p className="ng-dash-note">{tr("নোট: এই ড্যাশবোর্ডের মেনুগুলো UI প্রস্তুত। ব্যবহারকারী, সার্ভিস বা রিভিউ পরিবর্তনের কার্যকর ফিচার যুক্ত করতে সংশ্লিষ্ট ডেটাবেস ও নিরাপদ Admin API প্রয়োজন।", "Note: Dashboard menus are UI-ready. Managing users, services, or reviews requires a connected database and secure Admin API.")}</p>}
        </> : <div className="ng-dash-panel ng-dash-placeholder"><div className="ng-dash-stat-icon"><FileText size={22}/></div><h2>{title}</h2><p>{tr("এই বিভাগের ইন্টারফেস প্রস্তুত করা হয়েছে। কার্যকর তথ্য দেখাতে নিরাপদ সার্ভার ও প্রয়োজনীয় ব্যবস্থাপনা ফিচার সংযুক্ত করতে হবে।", "This section interface is ready. Connect a secure server and the required management features to display live data.")}</p><button onClick={() => setActive("overview")}>{tr("ড্যাশবোর্ডে ফিরে যান", "Back to Dashboard")}</button></div>}
      </section>
    </main>
    {sidebarOpen && <button className="ng-dash-scrim" onClick={() => setSidebarOpen(false)} aria-label="Close menu"/>}
  </div>;
}
