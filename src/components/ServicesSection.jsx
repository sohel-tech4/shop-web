import { useEffect, useState } from "react";
import { ArrowRight, Search, ChevronDown, ChevronUp } from "lucide-react";
import { categories, fallbackServiceIcon, serviceIcons } from "../data/ui";

export default function ServicesSection({ lang, services, activeCategory, setActiveCategory, query, setQuery, onSelect }) {
  // Show 4 cards on phones/tablets and 8 on large screens, then reveal one batch at a time.
  const [batchSize, setBatchSize] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches ? 8 : 4
  );
  const [visibleCount, setVisibleCount] = useState(batchSize);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const updateBatchSize = () => setBatchSize(media.matches ? 8 : 4);
    updateBatchSize();
    media.addEventListener?.("change", updateBatchSize);
    return () => media.removeEventListener?.("change", updateBatchSize);
  }, []);

  // Start from the first batch whenever the user changes category, search, or screen size.
  useEffect(() => {
    setVisibleCount(batchSize);
  }, [activeCategory, query, batchSize]);

  const visibleServices = services.slice(0, visibleCount);
  const hasMore = visibleCount < services.length;
  const shownCount = Math.min(visibleCount, services.length);

  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 text-sm font-bold uppercase tracking-wider text-[#159f9b]">{lang === "bn" ? "আমাদের সেবা" : "Our Services"}</div>
          <h2 className="text-3xl font-black tracking-tight text-[#07334a] sm:text-4xl">{lang === "bn" ? "যে সেবাগুলো আপনি পাবেন" : "Services You Can Get"}</h2>
          <p className="mt-2 max-w-2xl text-slate-500">{lang === "bn" ? "একটি সেবায় ক্লিক করলে প্রয়োজনীয় কাগজপত্র ও যোগাযোগের অপশন দেখাবে।" : "Click a service to see requirements and contact options."}</p>
        </div>
        <label className="input input-bordered flex w-full items-center gap-2 rounded-xl bg-white lg:max-w-xs">
          <Search size={18} className="text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={lang === "bn" ? "সেবা খুঁজুন..." : "Search services..."} className="grow" />
        </label>
      </div>

      <div className="category-filter-row mt-7 flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button key={cat.key} onClick={() => setActiveCategory(cat.key)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === cat.key ? "bg-[#07334a] text-white shadow-md" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"}`}>
            {lang === "bn" ? cat.bn : cat.en}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleServices.map((service) => {
          const Icon = serviceIcons[service.id] || fallbackServiceIcon;
          return (
            <button key={service.id} onClick={() => onSelect(service)} className="service-card group text-left">
              <div className="flex items-start justify-between gap-3">
                <div className="service-icon"><Icon size={23} strokeWidth={1.9} /></div>
                <ArrowRight size={18} className="mt-2 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#159f9b]" />
              </div>
              <div className="mt-5 text-lg font-bold text-[#07334a]">{lang === "bn" ? service.bn : service.en}</div>
              <div className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{lang === "bn" ? service.descBn : service.descEn}</div>
              <div className="mt-5 text-xs font-bold text-[#159f9b]">{lang === "bn" ? "বিস্তারিত দেখুন →" : "View details →"}</div>
            </button>
          );
        })}
      </div>

      {services.length === 0 && <div className="mt-8 rounded-2xl border border-dashed bg-white p-12 text-center text-slate-500">{lang === "bn" ? "কোনো সেবা পাওয়া যায়নি।" : "No services found."}</div>}

      {services.length > 0 && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-xs font-medium text-slate-400">
            {lang === "bn" ? `${shownCount} / ${services.length} টি সেবা দেখানো হচ্ছে` : `Showing ${shownCount} of ${services.length} services`}
          </p>
          {hasMore ? (
            <button
              type="button"
              onClick={() => setVisibleCount((count) => Math.min(count + batchSize, services.length))}
              className="inline-flex items-center gap-2 rounded-full bg-[#07334a] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#07334a]/15 transition hover:-translate-y-0.5 hover:bg-[#0b5264] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#159f9b]/25"
            >
              {lang === "bn" ? "আরও দেখুন" : "See More"}
              <ChevronDown size={17} />
            </button>
          ) : visibleCount > batchSize ? (
            <button
              type="button"
              onClick={() => {
                setVisibleCount(batchSize);
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-bold text-[#07334a] transition hover:border-[#9cddd2] hover:bg-[#eafaf6] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#159f9b]/20"
            >
              {lang === "bn" ? "কম দেখুন" : "Show Less"}
              <ChevronUp size={17} />
            </button>
          ) : null}
        </div>
      )}
    </section>
  );
}
