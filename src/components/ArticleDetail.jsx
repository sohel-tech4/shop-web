import { ArrowLeft, CalendarDays, Clock3, Share2 } from "lucide-react";

export default function ArticleDetail({ lang, article, onBack, relatedArticles, onSelect }) {
  const bn = lang === "bn";
  const title = bn ? article.titleBn : article.titleEn;
  const paragraphs = bn ? article.bodyBn : article.bodyEn;
  return <main className="ng-article-detail px-4 pb-16 pt-8 sm:px-6">
    <div className="mx-auto max-w-5xl">
      <button onClick={onBack} className="mb-7 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-teal-300 hover:text-teal-700"><ArrowLeft size={17} />{bn ? "সব আর্টিকেলে ফিরে যান" : "Back to all articles"}</button>
      <article>
        <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500"><span className="rounded-full bg-teal-50 px-3 py-1 font-bold text-teal-700">{article.category}</span><span className="inline-flex items-center gap-1"><CalendarDays size={14}/>{article.date}</span><span className="inline-flex items-center gap-1"><Clock3 size={14}/>{article.read}</span></div>
        <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{bn ? article.excerptBn : article.excerptEn}</p>
        <img className="mt-8 max-h-[500px] w-full rounded-3xl object-cover shadow-lg" src={article.cover} alt={title}/>
        <div className="mx-auto mt-9 max-w-3xl space-y-6">{paragraphs.map((paragraph, i) => <p key={i} className="text-[15px] leading-8 text-slate-700 sm:text-lg sm:leading-9">{paragraph}</p>)}</div>
        <div className="mx-auto mt-9 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">{article.images.map((src, i) => <img key={src + i} src={src} alt={`${title} ${i + 1}`} loading="lazy" className={`h-56 w-full rounded-2xl object-cover ${i === 0 ? "sm:col-span-2 sm:h-80" : ""}`}/>)}</div>
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-teal-100 bg-teal-50/70 p-5 text-sm leading-7 text-teal-950">{bn ? "মনে রাখবেন: সরকারি সেবার নিয়ম, ফি ও প্রয়োজনীয় কাগজপত্র পরিবর্তিত হতে পারে। আবেদন করার আগে সংশ্লিষ্ট সরকারি ওয়েবসাইট বা অফিস থেকে সর্বশেষ তথ্য যাচাই করুন।" : "Please note: Government service rules, fees and required documents may change. Verify the latest information with the relevant official website or office before applying."}</div>
      </article>
      {relatedArticles.length > 0 && <section className="mt-16"><h2 className="mb-5 text-2xl font-extrabold">{bn ? "আরও পড়ুন" : "More articles"}</h2><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">{relatedArticles.map((item) => <button key={item.id} onClick={() => onSelect(item)} className="ng-article-card text-left"><img src={item.cover} alt="" className="h-28 w-full object-cover sm:h-36"/><div className="p-3"><h3 className="ng-article-title">{bn ? item.titleBn : item.titleEn}</h3></div></button>)}</div></section>}
    </div>
  </main>;
}
