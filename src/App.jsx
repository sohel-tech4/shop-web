import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { services } from "./services";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ServiceModal from "./components/ServiceModal";
import Chatbot from "./components/Chatbot";
import ArticlesSection from "./components/ArticlesSection";
import ArticleDetail from "./components/ArticleDetail";

import { articles } from "./data/articles";
import DashboardPage from "./components/DashboardPage";
import AuthPortal from "./components/AuthPortal";
import ApplicationCenter from "./components/ApplicationCenter";

const readSession = () => {
  try { const user = JSON.parse(localStorage.getItem("nagorik_auth_user") || "null"); return user?.role === "admin" && user?.phone && user?.pinVerified === true ? user : null; }
  catch { return null; }
};

export default function App() {
  // One shared language preference for the public site, auth screens and dashboard.
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("Nagorik -language") === "en" ? "en" : "bn"; }
    catch { return "bn"; }
  });
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [visaType, setVisaType] = useState(null);
  const [landServiceType, setLandServiceType] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useTheme();
  const location = useLocation();
  const routerNavigate = useNavigate();
  const route = location.pathname.replace(/\/+$/, "") || "/";
  const [authUser, setAuthUser] = useState(readSession);
  const [showAuth, setShowAuth] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [applicationService, setApplicationService] = useState(null);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);
  const [completedApplications, setCompletedApplications] = useState(() => { try { const v = JSON.parse(localStorage.getItem("nagorik_local_applications") || "[]"); return Array.isArray(v) ? v : []; } catch { return []; } });

  useEffect(() => {
    try { localStorage.setItem("Nagorik -language", lang); } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (route === "/dashboard" || route === "/admin") {
      try { const v = JSON.parse(localStorage.getItem("nagorik_local_applications") || "[]"); setCompletedApplications(Array.isArray(v) ? v : []); } catch { setCompletedApplications([]); }
    }
  }, [route]);

  const navigate = (path, replace = false) => {
    routerNavigate(path, { replace });
    setShowAuth(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleAuthenticated = (user) => {
    setAuthUser(user);
    localStorage.setItem("nagorik_auth_user", JSON.stringify(user));
    // If login was requested from a service card, continue directly to that service request.
    if (applicationService) {
      setShowAuth(false);
      setShowApplications(true);
      setShowLoginSuccess(false);
      return;
    }
    navigate(user.role === "admin" ? "/admin" : "/dashboard");
    setShowLoginSuccess(true);
  };
  // Login confirmation is intentionally brief; the dashboard is already rendered underneath.
  useEffect(() => {
    if (!showLoginSuccess) return undefined;
    const timer = window.setTimeout(() => setShowLoginSuccess(false), 2200);
    return () => window.clearTimeout(timer);
  }, [showLoginSuccess]);

  const handleLogout = () => {
    localStorage.removeItem("nagorik_auth_user");
    setAuthUser(null);
    navigate("/");
    setShowLogoutSuccess(true);
  };

  useEffect(() => {
    if (!showLogoutSuccess) return undefined;
    const timer = window.setTimeout(() => setShowLogoutSuccess(false), 2200);
    return () => window.clearTimeout(timer);
  }, [showLogoutSuccess]);

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((service) => {
      const categoryMatch = activeCategory === "All" || service.category === activeCategory;
      const searchMatch = !q || [service.bn, service.en, service.descBn, service.descEn].some((text) => text.toLowerCase().includes(q));
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);

  const openService = (service) => {
    try { const v = JSON.parse(localStorage.getItem("nagorik_local_applications") || "[]"); setCompletedApplications(Array.isArray(v) ? v : []); } catch { setCompletedApplications([]); }
    setSelectedService(service); setVisaType(null); setLandServiceType(null);
  };
  const startApplication = (service) => {
    setSelectedService(null);
    setApplicationService(service);
    setShowApplications(true);
  };
  const closeService = () => { setSelectedService(null); setVisaType(null); setLandServiceType(null); };
  const scrollToServices = () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  const showArticles = () => { setSelectedArticle(null); requestAnimationFrame(() => document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" })); };
  const openArticle = (article) => { setSelectedArticle(article); window.scrollTo({ top: 0, behavior: "smooth" }); };

  if (route === "/dashboard") return <Navigate to="/" replace />;
  if (route === "/admin") {
    if (!authUser) return <>
      <AuthPortal lang={lang} setLang={setLang} onClose={() => navigate("/")} onAuthenticated={handleAuthenticated} />
      <Chatbot lang={lang} />
    </>;
    const isAdmin = authUser.role === "admin";
    if (!isAdmin) return <Navigate to="/" replace />;
    return <>
      <DashboardPage user={authUser} isAdmin={isAdmin} lang={lang} setLang={setLang} darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout} onHome={() => navigate("/")} completedApplications={completedApplications} onProfileUpdated={setAuthUser} />
      {showLoginSuccess && <div className="login-success-overlay" role="dialog" aria-modal="true" aria-labelledby="login-success-title">
        <div className="login-success-card">
          <button className="login-success-close" onClick={() => setShowLoginSuccess(false)} aria-label="Close">×</button>
          <div className="login-success-orbit"><div className="login-success-check">✓</div><span className="success-spark spark-one">✦</span><span className="success-spark spark-two">✧</span><span className="success-spark spark-three">✦</span></div>
          <span className="login-success-kicker">NAGORIK COMPUTER & E-SERVICE</span>
          <h2 id="login-success-title">{lang === "bn" ? (isAdmin ? "অ্যাডমিন লগইন সফল!" : "লগইন সফল হয়েছে!") : (isAdmin ? "Admin login successful!" : "Login successful!")}</h2>
          <p className="login-success-welcome">{lang === "bn" ? "স্বাগতম," : "Welcome,"} <strong>{authUser.displayName || (authUser.phone || authUser.email)}</strong></p>
          <p className="login-success-description">{lang === "bn" ? (isAdmin ? "আপনি অ্যাডমিন হিসেবে প্রবেশ করেছেন। এখন ওয়েবসাইট পরিচালনা করতে পারবেন।" : "আপনি সফলভাবে আপনার অ্যাকাউন্টে প্রবেশ করেছেন। আপনার ড্যাশবোর্ড প্রস্তুত।") : (isAdmin ? "You are signed in as an administrator and can now manage the website." : "You have signed in successfully. Your dashboard is ready.")}</p>
          <div className="login-success-role"><span>{isAdmin ? "🛡️" : "👤"}</span><div><small>{lang === "bn" ? "অ্যাকাউন্টের ধরন" : "ACCOUNT TYPE"}</small><strong>{isAdmin ? "Administrator" : "Registered User"}</strong></div><span className="login-success-active">{lang === "bn" ? "সক্রিয়" : "Active"}</span></div>
          <div className="login-success-auto"><span className="login-success-progress" /><small>{lang === "bn" ? "আপনার ড্যাশবোর্ড চালু হচ্ছে..." : "Opening your dashboard..."}</small></div>
          <p className="login-success-foot">{lang === "bn" ? "আপনার তথ্য সুরক্ষিত রাখুন" : "Keep your information secure"} • Nagorik e-Service</p>
        </div>
      </div>}
      <Chatbot lang={lang} />
    </>;
  }

  return <div className={`min-h-screen text-slate-800 ${darkMode ? "dark-mode" : "light-mode"}`}>
    {showLogoutSuccess && <div className="logout-success-toast" role="status" aria-live="polite">
      <span className="logout-success-icon">✓</span>
      <span><strong>{lang === "bn" ? "লগআউট সফল হয়েছে!" : "Logged out successfully!"}</strong><small>{lang === "bn" ? "আপনি নিরাপদে আপনার অ্যাকাউন্ট থেকে বের হয়েছেন।" : "You have safely signed out of your account."}</small></span>
    </div>}
    <Header lang={lang} setLang={setLang} darkMode={darkMode} setDarkMode={setDarkMode} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} onShowArticles={showArticles} onLogin={() => authUser?.role === "admin" ? navigate("/admin") : setShowAuth(true)} onLogout={handleLogout} authUser={authUser} />
    <main id="home">
      {selectedArticle ? <ArticleDetail lang={lang} article={selectedArticle} onBack={() => { setSelectedArticle(null); requestAnimationFrame(() => document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" })); }} relatedArticles={articles.filter((item) => item.id !== selectedArticle.id).slice(0, 3)} onSelect={openArticle} /> : <>
        <Hero lang={lang} serviceCount={services.length} onExplore={scrollToServices} />
        <ServicesSection lang={lang} services={filteredServices} activeCategory={activeCategory} setActiveCategory={setActiveCategory} query={query} setQuery={setQuery} onSelect={openService} onApply={startApplication} />
        <AboutSection lang={lang} />
        <ArticlesSection lang={lang} articles={articles} onSelect={openArticle} />
        <ContactSection lang={lang} />
      </>}
    </main>
    <Footer lang={lang} />
    <ServiceModal lang={lang} service={selectedService} visaType={visaType} setVisaType={setVisaType} landServiceType={landServiceType} setLandServiceType={setLandServiceType} onClose={closeService} onApply={startApplication} />
    <Chatbot lang={lang} />
    {showApplications && <ApplicationCenter lang={lang} user={null} initialService={applicationService} onClose={() => { setShowApplications(false); setApplicationService(null); }} />}
    {showAuth && <AuthPortal lang={lang} setLang={setLang} onClose={() => setShowAuth(false)} onAuthenticated={handleAuthenticated} />}
  </div>;
}
