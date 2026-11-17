import { ArrowRight, BookOpen, Clock3 } from "lucide-react";

export default function ArticlesSection({ lang, articles, onSelect }) {
  const bn = lang === "bn";
  return <section id="articles" className="ng-content-section px-4 py-16 sm:px-6 lg:py-20">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="ng-eyebrow"><BookOpen size={15} /> {bn ? "জানুন ও শিখুন" : "KNOWLEDGE & GUIDES"}</span>
        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">{bn ? "আমাদের আর্টিকেল" : "Articles & Guides"}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">{bn ? "ডিজিটাল ও নাগরিক সেবা সম্পর্কে প্রয়োজনীয় তথ্য, সহজ নির্দেশনা এবং ব্যবহারিক পরামর্শ।" : "Useful information, easy instructions and practical tips about digital and citizen services."}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {articles.map((article) => <button type="button" key={article.id} onClick={() => onSelect(article)} className="ng-article-card group text-left">
          <div className="ng-article-image"><img src={article.cover} alt={bn ? article.titleBn : article.titleEn} loading="lazy" /><span>{article.category}</span></div>
          <div className="p-3 sm:p-5">
            <div className="mb-2 flex items-center gap-2 text-[10px] text-slate-400 sm:text-xs"><span>{article.date}</span><span>·</span><Clock3 size={12} /><span>{article.read}</span></div>
            <h3 className="ng-article-title">{bn ? article.titleBn : article.titleEn}</h3>
            <p className="ng-article-excerpt">{bn ? article.excerptBn : article.excerptEn}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-teal-700 sm:text-sm">{bn ? "বিস্তারিত পড়ুন" : "Read article"}<ArrowRight size={15} /></span>
          </div>
        </button>)}
      </div>
    </div>
  </section>;
}
