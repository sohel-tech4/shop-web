import { useEffect, useRef, useState } from "react";
import ApplicationsDashboard from "./ApplicationsDashboard";
import UserReviewsDashboard from "./UserReviewsDashboard";
import { getRegisteredUsers, updateUserProfile, deleteRegisteredUser } from "../services/auth";
import { getLocalVisitorCount } from "./VisitorCounter";
import { Activity, BarChart3, Bell, ChevronRight, FileText, LayoutDashboard, LogOut, Menu, MessageSquare, Settings, ShieldCheck, Users, BriefcaseBusiness, Globe, Search, UserRound, Globe2, Moon, Sun, ChevronDown, X } from "lucide-react";

export default function DashboardPage({ user, isAdmin, lang = "bn", setLang, darkMode = false, setDarkMode, onLogout, onHome, completedApplications = [], serviceReviews = [], onSubmitServiceReview, onProfileUpdated }) {
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState(() => getRegisteredUsers());
  const [visitorCount, setVisitorCount] = useState(() => getLocalVisitorCount());
  const [profile, setProfile] = useState(() => ({ ...user, address: user.address || "", phone: user.phone || "", photo: user.photo || "" }));
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
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
    { id: "profile", label: tr("প্রোফাইল", "Profile"), icon: UserRound },
    { id: "users", label: tr("ব্যবহারকারী", "Users"), icon: Users },
    { id: "applications", label: tr("আবেদন ব্যবস্থাপনা", "Applications"), icon: FileText },
    { id: "services", label: tr("সার্ভিস ব্যবস্থাপনা", "Service Management"), icon: BriefcaseBusiness },
    { id: "reviews", label: tr("রিভিউ ও কনটেন্ট", "Reviews & Content"), icon: MessageSquare },
    { id: "reports", label: tr("রিপোর্ট", "Reports"), icon: BarChart3 },
    { id: "settings", label: tr("সেটিংস", "Settings"), icon: Settings },
  ] : [
    { id: "overview", label: tr("ড্যাশবোর্ড", "Dashboard"), icon: LayoutDashboard },
    { id: "applications", label: tr("আমার আবেদন", "My Applications"), icon: FileText },
    { id: "my-reviews", label: tr("আমার রিভিউ", "My Reviews"), icon: MessageSquare },
    { id: "profile", label: tr("প্রোফাইল", "Profile"), icon: UserRound },
    { id: "settings", label: tr("সেটিংস", "Settings"), icon: Settings },
  ];
  const title = items.find((item) => item.id === active)?.label || tr("ড্যাশবোর্ড", "Dashboard");
  useEffect(() => {
    if (active === "users") setRegisteredUsers(getRegisteredUsers());
    if (active === "overview" || active === "reports") setVisitorCount(getLocalVisitorCount());
  }, [active]);
  const initials = (profile.displayName || user.displayName || user.email || "N").slice(0, 1).toUpperCase();
  const handleProfilePhoto = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setProfileError(tr("শুধু ছবি নির্বাচন করুন।", "Please choose an image file.")); return; }
    if (file.size > 2 * 1024 * 1024) { setProfileError(tr("ছবির সাইজ ২ MB-এর কম হতে হবে।", "Image must be smaller than 2 MB.")); return; }
    const reader = new FileReader();
    reader.onload = () => setProfile((old) => ({ ...old, photo: String(reader.result) }));
    reader.readAsDataURL(file);
  };
  const saveProfile = (event) => {
    event.preventDefault(); setProfileError("");
    try {
      const updated = updateUserProfile(user.id, profile);
      setProfile(updated); localStorage.setItem("nagorik_auth_user", JSON.stringify(updated)); onProfileUpdated?.(updated);
      setProfileMessage(tr("প্রোফাইল সফলভাবে আপডেট হয়েছে।", "Profile updated successfully."));
      window.setTimeout(() => setProfileMessage(""), 3000);
    } catch (error) { setProfileError(error.message || tr("প্রোফাইল আপডেট করা যায়নি।", "Could not update profile.")); }
  };
  const handleDeleteUser = (item) => {
    if (!window.confirm(`${item.displayName || item.email} — ${tr("এই ব্যবহারকারীকে মুছে ফেলতে চান?", "Delete this user?")}`)) return;
    deleteRegisteredUser(item.id); setRegisteredUsers(getRegisteredUsers());
  };
  const toggleLanguage = () => setLang?.((value) => value === "bn" ? "en" : "bn");
  const toggleTheme = () => setDarkMode?.((value) => !value);
  return <div className={`ng-dashboard ${darkMode ? "ng-dashboard-dark" : "ng-dashboard-light"}`}>
    {profileMessage && <div className="logout-success-toast" role="status" aria-live="polite"><span className="logout-success-icon">✓</span><span><strong>{profileMessage}</strong><small>{tr("আপনার নতুন তথ্য সেবা আবেদনে স্বয়ংক্রিয়ভাবে বসবে।", "Your updated details will be filled automatically in service requests.")}</small></span></div>}
    <aside className={`ng-dash-sidebar ${sidebarOpen ? "is-open" : ""}`}>
      <a href="/" className="ng-dash-brand ng-dash-brand-link" aria-label="Nagorik Computer & e-Service - মূল ওয়েবসাইট"><img src="/logo.PNG" alt="Nagorik Computer & e-Service logo"/><div><strong>NAGORIK</strong><span>Computer & e-Service</span></div></a>
      <div className="ng-dash-profile"><div className="ng-dash-avatar" style={profile.photo ? {backgroundImage:`url(${profile.photo})`,backgroundSize:"cover",backgroundPosition:"center",color:"transparent"} : {}}>{profile.photo ? "" : initials}</div><div className="min-w-0"><strong>{profile.displayName || tr("ব্যবহারকারী", "User")}</strong><span>{isAdmin ? "Administrator" : tr("সাধারণ ব্যবহারকারী", "Standard User")}</span></div></div>
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
            <button className="ng-dash-top-user" onClick={() => setProfileMenuOpen((value) => !value)} aria-expanded={profileMenuOpen}><div className="ng-dash-avatar small" style={profile.photo ? {backgroundImage:`url(${profile.photo})`,backgroundSize:"cover",backgroundPosition:"center",color:"transparent"} : {}}>{profile.photo ? "" : initials}</div><span>{profile.displayName || profile.displayName || user.displayName || user.email}</span><ChevronDown size={15}/></button>
            {profileMenuOpen && <div className="ng-dash-profile-dropdown"><div className="ng-dash-dropdown-heading">{tr("অ্যাকাউন্ট সেটিংস", "Account settings")}</div>
              <button onClick={toggleLanguage}><Globe2 size={17}/><span>{tr("ভাষা পরিবর্তন", "Change language")}</span><strong>{bn ? "বাংলা" : "English"}</strong></button>
              <button onClick={toggleTheme}>{darkMode ? <Sun size={17}/> : <Moon size={17}/>}<span>{tr("মুড পরিবর্তন", "Appearance")}</span><strong>{darkMode ? tr("লাইট", "Light") : tr("ডার্ক", "Dark")}</strong></button>
              <div className="ng-dash-dropdown-divider"/><button className="ng-dash-dropdown-logout" onClick={() => { setProfileMenuOpen(false); onLogout?.(); }}><LogOut size={17}/><span>{tr("লগআউট", "Log out")}</span></button>
            </div>}
          </div>
        </div>
      </header>
      <section className="ng-dash-content">
        {active === "users" && isAdmin ? <div className="ng-dash-panel">
          <div className="ng-dash-panel-head"><div><h3>{tr("নিবন্ধিত ব্যবহারকারী", "Registered Users")}</h3><p>{tr("এই ব্রাউজারে লোকাল স্টোরেজে সংরক্ষিত সব সাধারণ ব্যবহারকারী", "All standard users saved in this browser's local storage")}</p></div><strong>{registeredUsers.length} {tr("জন", "users")}</strong></div>
          {registeredUsers.length ? <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr><th className="p-3">{tr("নাম", "Name")}</th><th className="p-3">{tr("ইমেইল", "Email")}</th><th className="p-3">{tr("ছবি", "Photo")}</th><th className="p-3">{tr("নিবন্ধনের তারিখ", "Registered")}</th><th className="p-3">{tr("ঠিকানা", "Address")}</th><th className="p-3">{tr("কাজ", "Action")}</th></tr></thead><tbody>{registeredUsers.map((item) => <tr key={item.id} className="border-t border-slate-200/60"><td className="p-3">{item.displayName || "—"}</td><td className="p-3">{item.email}</td><td className="p-3">{item.photo ? <img src={item.photo} alt="" className="h-12 w-12 rounded-full object-cover"/> : "—"}</td><td className="p-3">{item.createdAt ? new Date(item.createdAt).toLocaleDateString(bn ? "bn-BD" : "en-US") : "—"}</td><td className="p-3">{item.address || "—"}</td><td className="p-3"><button className="rounded-lg bg-red-50 px-3 py-2 text-red-700" onClick={() => handleDeleteUser(item)}>{tr("ডিলিট", "Delete")}</button></td></tr>)}</tbody></table></div> : <p className="p-4">{tr("এখনো কোনো ব্যবহারকারী সাইন আপ করেননি।", "No users have signed up yet.")}</p>}
          <p className="ng-dash-note">{tr("নোট: লোকাল স্টোরেজের ব্যবহারকারীরা শুধু এই ব্রাউজার/ডিভাইসেই দেখা যাবে। অন্য ডিভাইসের ব্যবহারকারী এখানে আসবে না।", "Note: Local-storage users are visible only in this browser/device. Users from other devices will not appear here.")}</p>
        </div> : active === "profile" ? <div className="ng-dash-panel">
          <div className="ng-dash-panel-head"><div><h3>{tr("প্রোফাইল সম্পাদনা", "Edit Profile")}</h3><p>{tr("আপনার নাম, ছবি, ফোন ও ঠিকানা পরিবর্তন করতে পারবেন। ইমেইল পরিবর্তন করা যাবে না।", "Update your name, photo, phone and address. Email cannot be changed.")}</p></div></div>
          <form onSubmit={saveProfile} className="grid gap-4" style={{maxWidth:680}}>
            <div className="flex items-center gap-4 flex-wrap"><div className="h-24 w-24 overflow-hidden rounded-full bg-teal-100 grid place-items-center text-3xl font-bold text-teal-800">{profile.photo ? <img src={profile.photo} alt="Profile" className="h-full w-full object-cover"/> : initials}</div><label className="cursor-pointer rounded-xl border px-4 py-2 font-semibold">{tr("প্রোফাইল ছবি নির্বাচন", "Choose profile photo")}<input type="file" accept="image/*" className="hidden" onChange={(e) => handleProfilePhoto(e.target.files?.[0])}/></label>{profile.photo && <button type="button" className="text-sm text-red-600" onClick={() => setProfile((old) => ({...old,photo:""}))}>{tr("ছবি সরান", "Remove photo")}</button>}</div>
            <label className="grid gap-1 text-sm font-semibold">{tr("পূর্ণ নাম", "Full name")}<input required value={profile.displayName || ""} onChange={(e) => setProfile((old) => ({...old,displayName:e.target.value}))} className="rounded-xl border p-3"/></label>
            <label className="grid gap-1 text-sm font-semibold">{tr("ইমেইল (পরিবর্তন করা যাবে না)", "Email (cannot be changed)")}<input value={user.email} disabled className="rounded-xl border bg-slate-100 p-3 text-slate-500"/></label>
            <label className="grid gap-1 text-sm font-semibold">{tr("মোবাইল নম্বর", "Phone number")}<input value={profile.phone || ""} onChange={(e) => setProfile((old) => ({...old,phone:e.target.value}))} className="rounded-xl border p-3" placeholder="01XXXXXXXXX"/></label>
            <label className="grid gap-1 text-sm font-semibold">{tr("সম্পূর্ণ ঠিকানা", "Full address")}<textarea rows="3" value={profile.address || ""} onChange={(e) => setProfile((old) => ({...old,address:e.target.value}))} className="rounded-xl border p-3" placeholder={tr("গ্রাম/মহল্লা, ডাকঘর, উপজেলা, জেলা", "Village/Area, Post Office, Upazila, District")}/></label>
            {profileError && <p className="text-sm text-red-600">{profileError}</p>}
            <button type="submit" className="w-fit rounded-xl bg-teal-700 px-6 py-3 font-bold text-white">{tr("পরিবর্তন সংরক্ষণ করুন", "Save Changes")}</button>
          </form>
        </div> : active === "applications" ? <ApplicationsDashboard user={user} isAdmin={isAdmin} lang={lang}/> : active === "my-reviews" && !isAdmin ? <UserReviewsDashboard user={user} applications={completedApplications} reviews={serviceReviews} lang={lang} onSubmit={onSubmitServiceReview}/> : active === "overview" ? <>
          <div className="ng-dash-welcome"><div><span>{isAdmin ? tr("অ্যাডমিন কন্ট্রোল সেন্টার", "ADMIN CONTROL CENTER") : tr("আমার অ্যাকাউন্ট", "MY ACCOUNT")}</span><h2>{tr("স্বাগতম", "Welcome")}, {user.displayName || user.email?.split("@")[0]}!</h2><p>{isAdmin ? tr("আপনার ওয়েবসাইট পরিচালনার সংক্ষিপ্ত বিবরণ এখানে দেখুন।", "View a quick overview of your website management here.") : tr("আপনার অ্যাকাউন্ট ও সেবার তথ্য এখান থেকে পরিচালনা করুন।", "Manage your account and service information here.")}</p></div><div className="ng-dash-welcome-mark"><Activity size={34}/></div></div>
          <div className="ng-dash-stat-grid">{(isAdmin ? [
            [tr("মোট ব্যবহারকারী", "Total Users"), String(registeredUsers.length), "users", Users], [tr("মোট ভিজিটর", "Total Visitors"), String(visitorCount), "visitors", Globe], [tr("সার্ভিস", "Services"), tr("ওয়েবসাইটে প্রকাশিত", "Published on website"), "services", BriefcaseBusiness], [tr("রিভিউ", "Reviews"), tr("কনটেন্ট বিভাগ", "Content section"), "reviews", MessageSquare], [tr("অ্যাকাউন্ট স্ট্যাটাস", "Account Status"), tr("সক্রিয়", "Active"), "active", ShieldCheck],
          ] : [
            [tr("অ্যাকাউন্ট", "Account"), tr("সাধারণ ব্যবহারকারী", "Standard User"), "account", UserRound], [tr("ইমেইল", "Email"), tr("যাচাইকৃত লগইন তথ্য", "Verified login details"), "email", FileText], [tr("সেশন", "Session"), tr("লগইন সেশন", "Login session"), "session", Activity], [tr("স্ট্যাটাস", "Status"), tr("সক্রিয়", "Active"), "active", ShieldCheck],
          ]).map(([label,value,key,Icon]) => <article className="ng-dash-stat" key={key}><div className="ng-dash-stat-icon"><Icon size={20}/></div><span>{label}</span><strong>{value}</strong><small>{key === "active" ? tr("আপনার সেশন চালু আছে", "Your session is active") : key === "visitors" ? tr("এই ব্রাউজারের ভিজিট হিসাব থেকে", "Page loads in this browser") : tr("লোকাল স্টোরেজে সংরক্ষিত", "Saved in local storage")}</small></article>)}</div>
          <div className="ng-dash-panel"><div className="ng-dash-panel-head"><div><h3>{isAdmin ? tr("দ্রুত অ্যাকশন", "Quick Actions") : tr("আপনার অ্যাকাউন্ট", "Your Account")}</h3><p>{isAdmin ? tr("প্রয়োজনীয় ব্যবস্থাপনা বিভাগ নির্বাচন করুন", "Choose a management section") : tr("আপনার লগইন সংক্রান্ত তথ্য", "Your login information")}</p></div></div><div className="ng-dash-quick-grid">{items.filter((x) => x.id !== "overview").map(({id,label,icon:Icon}) => <button key={id} onClick={() => setActive(id)}><Icon size={19}/><span>{label}</span><ChevronRight size={16}/></button>)}</div></div>
          <div className="ng-dash-panel ng-dash-account"><ShieldCheck size={21}/><div><strong>{tr("নিরাপদ অ্যাকাউন্ট সেশন", "Secure Account Session")}</strong><p>{tr("লগইন", "Signed in")}: {user.email}</p></div><span className="ng-dash-status">{tr("সক্রিয়", "Active")}</span></div>
          {isAdmin && <p className="ng-dash-note">{tr("নোট: ব্যবহারকারী ও ভিজিটর সংখ্যা এই ব্রাউজারের ভিজিট হিসাব থেকে দেখানো হয়। অন্য ডিভাইসের তথ্য এখানে যুক্ত হবে না। একই ব্রাউজার একবারই ভিজিটর হিসেবে গণনা হয়।", "Note: Each full page load or refresh in this browser adds one visit. Other devices are not included.")}</p>}
        </> : <div className="ng-dash-panel ng-dash-placeholder"><div className="ng-dash-stat-icon"><FileText size={22}/></div><h2>{title}</h2><p>{tr("এই বিভাগের ইন্টারফেস প্রস্তুত করা হয়েছে। কার্যকর তথ্য দেখাতে নিরাপদ সার্ভার ও প্রয়োজনীয় ব্যবস্থাপনা ফিচার সংযুক্ত করতে হবে।", "This section interface is ready. Connect a secure server and the required management features to display live data.")}</p><button onClick={() => setActive("overview")}>{tr("ড্যাশবোর্ডে ফিরে যান", "Back to Dashboard")}</button></div>}
      </section>
    </main>
    {sidebarOpen && <button className="ng-dash-scrim" onClick={() => setSidebarOpen(false)} aria-label="Close menu"/>}
  </div>;
}
