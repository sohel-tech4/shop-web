import { useState } from "react";
import { Activity, ArrowLeft, BarChart3, Bell, ChevronRight, FileText, LayoutDashboard, LogOut, Menu, MessageSquare, Settings, ShieldCheck, Users, BriefcaseBusiness, Globe, Search, UserRound } from "lucide-react";

export default function DashboardPage({ user, isAdmin, onLogout, onHome }) {
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const items = isAdmin
    ? [
        { id: "overview", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
        { id: "users", label: "ব্যবহারকারী", icon: Users },
        { id: "services", label: "সার্ভিস ব্যবস্থাপনা", icon: BriefcaseBusiness },
        { id: "reviews", label: "রিভিউ ও কনটেন্ট", icon: MessageSquare },
        { id: "reports", label: "রিপোর্ট", icon: BarChart3 },
        { id: "settings", label: "সেটিংস", icon: Settings },
      ]
    : [
        { id: "overview", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
        { id: "applications", label: "আমার আবেদন", icon: FileText },
        { id: "profile", label: "প্রোফাইল", icon: UserRound },
        { id: "settings", label: "সেটিংস", icon: Settings },
      ];
  const title = items.find((item) => item.id === active)?.label || "ড্যাশবোর্ড";
  const initials = (user.displayName || user.email || "N").slice(0, 1).toUpperCase();

  return <div className="ng-dashboard">
    <aside className={`ng-dash-sidebar ${sidebarOpen ? "is-open" : ""}`}>
      <div className="ng-dash-brand">
        <div className="ng-dash-brand-icon"><ShieldCheck size={22}/></div>
        <div><strong>NAGORIK</strong><span>Computer & e-Service</span></div>
      </div>
      <div className="ng-dash-profile">
        <div className="ng-dash-avatar">{initials}</div>
        <div className="min-w-0"><strong>{user.displayName || "ব্যবহারকারী"}</strong><span>{isAdmin ? "Administrator" : "সাধারণ ব্যবহারকারী"}</span></div>
      </div>
      <p className="ng-dash-nav-label">MAIN MENU</p>
      <nav className="ng-dash-nav">
        {items.map(({id,label,icon:Icon}) => <button key={id} className={active === id ? "active" : ""} onClick={() => { setActive(id); setSidebarOpen(false); }}><Icon size={18}/><span>{label}</span>{active === id && <ChevronRight size={16} className="ml-auto"/>}</button>)}
      </nav>
      <div className="ng-dash-sidebar-bottom">
        <button onClick={onHome}><Globe size={18}/> মূল ওয়েবসাইট</button>
        <button onClick={onLogout}><LogOut size={18}/> লগআউট</button>
      </div>
    </aside>

    <main className="ng-dash-main">
      <header className="ng-dash-topbar">
        <button className="ng-dash-mobile-menu" onClick={() => setSidebarOpen((v) => !v)} aria-label="Menu"><Menu/></button>
        <div><span className="ng-dash-breadcrumb">Nagorik / {isAdmin ? "Admin" : "Account"}</span><h1>{title}</h1></div>
        <div className="ng-dash-top-actions"><button className="ng-dash-icon-btn" aria-label="Notifications"><Bell size={19}/></button><div className="ng-dash-top-user"><div className="ng-dash-avatar small">{initials}</div><span>{user.displayName || user.email}</span></div></div>
      </header>

      <section className="ng-dash-content">
        {active === "overview" ? <>
          <div className="ng-dash-welcome"><div><span>{isAdmin ? "ADMIN CONTROL CENTER" : "MY ACCOUNT"}</span><h2>স্বাগতম, {user.displayName || user.email?.split("@")[0]}!</h2><p>{isAdmin ? "আপনার ওয়েবসাইট পরিচালনার সংক্ষিপ্ত বিবরণ এখানে দেখুন।" : "আপনার অ্যাকাউন্ট ও সেবার তথ্য এখান থেকে পরিচালনা করুন।"}</p></div><div className="ng-dash-welcome-mark"><Activity size={34}/></div></div>
          <div className="ng-dash-stat-grid">
            {(isAdmin ? [
              ["মোট ব্যবহারকারী","Firebase Auth","users",Users],
              ["সার্ভিস","ওয়েবসাইটে প্রকাশিত","services",BriefcaseBusiness],
              ["রিভিউ","কনটেন্ট বিভাগ","reviews",MessageSquare],
              ["অ্যাকাউন্ট স্ট্যাটাস","সক্রিয়","active",ShieldCheck],
            ] : [
              ["অ্যাকাউন্ট","সাধারণ ব্যবহারকারী","account",UserRound],
              ["ইমেইল","যাচাইকৃত লগইন তথ্য","email",FileText],
              ["সেশন","Login session","session",Activity],
              ["স্ট্যাটাস","সক্রিয়","active",ShieldCheck],
            ]).map(([label,value,key,Icon]) => <article className="ng-dash-stat" key={key}><div className="ng-dash-stat-icon"><Icon size={20}/></div><span>{label}</span><strong>{value}</strong><small>{key === "active" ? "আপনার সেশন চালু আছে" : "তথ্য সংযুক্ত হলে এখানে দেখাবে"}</small></article>)}
          </div>
          <div className="ng-dash-panel"><div className="ng-dash-panel-head"><div><h3>{isAdmin ? "দ্রুত অ্যাকশন" : "আপনার অ্যাকাউন্ট"}</h3><p>{isAdmin ? "প্রয়োজনীয় ব্যবস্থাপনা বিভাগ নির্বাচন করুন" : "আপনার লগইন সংক্রান্ত তথ্য"}</p></div></div>
            <div className="ng-dash-quick-grid">{items.filter((x) => x.id !== "overview").map(({id,label,icon:Icon}) => <button key={id} onClick={() => setActive(id)}><Icon size={19}/><span>{label}</span><ChevronRight size={16}/></button>)}</div>
          </div>
          <div className="ng-dash-panel ng-dash-account"><ShieldCheck size={21}/><div><strong>নিরাপদ অ্যাকাউন্ট সেশন</strong><p>লগইন: {user.email}</p></div><span className="ng-dash-status">সক্রিয়</span></div>
          {isAdmin && <p className="ng-dash-note">নোট: এই ড্যাশবোর্ডের মেনুগুলো UI প্রস্তুত। ব্যবহারকারী, সার্ভিস বা রিভিউ পরিবর্তনের কার্যকর ফিচার যুক্ত করতে সংশ্লিষ্ট ডেটাবেস ও নিরাপদ Admin API প্রয়োজন।</p>}
        </> : <div className="ng-dash-panel ng-dash-placeholder"><div className="ng-dash-stat-icon"><FileText size={22}/></div><h2>{title}</h2><p>এই বিভাগের ইন্টারফেস প্রস্তুত করা হয়েছে। কার্যকর তথ্য দেখাতে নিরাপদ সার্ভার ও প্রয়োজনীয় ব্যবস্থাপনা ফিচার সংযুক্ত করতে হবে।</p><button onClick={() => setActive("overview")}>ড্যাশবোর্ডে ফিরে যান</button></div>}
      </section>
    </main>
    {sidebarOpen && <button className="ng-dash-scrim" onClick={() => setSidebarOpen(false)} aria-label="Close menu"/>}
  </div>;
}
