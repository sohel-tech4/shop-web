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

export default function App() {
  const [lang, setLang] = useState("bn");
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);
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

  return <div className={`min-h-screen text-slate-800 ${darkMode ? "dark-mode" : "light-mode"}`}>
    <Header lang={lang} setLang={setLang} darkMode={darkMode} setDarkMode={setDarkMode} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
    <main id="home">
      <Hero lang={lang} serviceCount={services.length} onExplore={scrollToServices} />
      <ServicesSection lang={lang} services={filteredServices} activeCategory={activeCategory} setActiveCategory={setActiveCategory} query={query} setQuery={setQuery} onSelect={openService} />
      <AboutSection lang={lang} />
      <ContactSection lang={lang} />
    </main>
    <Footer lang={lang} />
    <ServiceModal lang={lang} service={selectedService} visaType={visaType} setVisaType={setVisaType} landServiceType={landServiceType} setLandServiceType={setLandServiceType} onClose={closeService} />
    <Chatbot lang={lang} />
  </div>;
}
