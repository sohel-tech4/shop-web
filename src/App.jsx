import { useMemo, useState } from "react";
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
import ReviewsSection from "./components/ReviewsSection";
import { articles, reviews } from "./data/articles";

export default function App() {
  const [lang, setLang] = useState("bn");
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [visaType, setVisaType] = useState(null);
  const [landServiceType, setLandServiceType] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useTheme();

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((service) => {
      const categoryMatch = activeCategory === "All" || service.category === activeCategory;
      const searchMatch = !q || [service.bn, service.en, service.descBn, service.descEn].some((text) => text.toLowerCase().includes(q));
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);

  const openService = (service) => {
    setSelectedService(service);
    setVisaType(null);
    setLandServiceType(null);
  };
  const closeService = () => {
    setSelectedService(null);
    setVisaType(null);
    setLandServiceType(null);
  };
  const scrollToServices = () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  const showArticles = () => { setSelectedArticle(null); requestAnimationFrame(() => document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" })); };
  const openArticle = (article) => { setSelectedArticle(article); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return <div className={`min-h-screen text-slate-800 ${darkMode ? "dark-mode" : "light-mode"}`}>
    <Header lang={lang} setLang={setLang} darkMode={darkMode} setDarkMode={setDarkMode} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} onShowArticles={showArticles} />
    <main id="home">
      {selectedArticle ? <ArticleDetail lang={lang} article={selectedArticle} onBack={() => { setSelectedArticle(null); requestAnimationFrame(() => document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" })); }} relatedArticles={articles.filter((item) => item.id !== selectedArticle.id).slice(0, 3)} onSelect={openArticle} /> : <>
        <Hero lang={lang} serviceCount={services.length} onExplore={scrollToServices} />
        <ServicesSection lang={lang} services={filteredServices} activeCategory={activeCategory} setActiveCategory={setActiveCategory} query={query} setQuery={setQuery} onSelect={openService} />
        <AboutSection lang={lang} />
        <ArticlesSection lang={lang} articles={articles} onSelect={openArticle} />
        <ReviewsSection lang={lang} reviews={reviews} />
        <ContactSection lang={lang} />
      </>}
    </main>
    <Footer lang={lang} />
    <ServiceModal lang={lang} service={selectedService} visaType={visaType} setVisaType={setVisaType} landServiceType={landServiceType} setLandServiceType={setLandServiceType} onClose={closeService} />
    <Chatbot lang={lang} />
  </div>;
}
