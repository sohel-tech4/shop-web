import { MessageSquareQuote, Star } from "lucide-react";

export default function ReviewsSection({ lang, reviews }) {
  const bn = lang === "bn";
  return <section id="reviews" className="ng-content-section bg-slate-50 px-4 py-16 sm:px-6 lg:py-20">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="ng-eyebrow"><MessageSquareQuote size={15}/>{bn ? "গ্রাহকের মতামত" : "CUSTOMER FEEDBACK"}</span>
        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">{bn ? "গ্রাহক রিভিউ" : "Customer Reviews"}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">{bn ? "আমাদের সেবা সম্পর্কে গ্রাহকদের অভিজ্ঞতা ও মতামত।" : "Experiences and feedback about our services."}</p>
        <p className="mt-2 text-[11px] text-slate-400">{bn ? "প্রদর্শিত রিভিউগুলো নমুনা কনটেন্ট—প্রকৃত গ্রাহকের অনুমোদিত মতামত দিয়ে প্রতিস্থাপন করুন।" : "Sample review content — replace with feedback approved by real customers."}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">{reviews.map((review, i) => <article key={`${review.name}-${i}`} className="ng-review-card">
        <div className="mb-3 flex items-center justify-between"><div className="flex gap-0.5 text-amber-400">{Array.from({ length: review.rating }, (_, n) => <Star key={n} size={14} fill="currentColor"/>)}</div><span className="text-[10px] font-semibold text-teal-700">{review.service}</span></div>
        <p className="text-xs leading-6 text-slate-600 sm:text-sm sm:leading-7">“{review.text}”</p>
        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3"><div className="grid h-8 w-8 place-items-center rounded-full bg-teal-100 text-xs font-black text-teal-800">{review.name.slice(0, 1)}</div><div><h3 className="text-xs font-bold text-slate-800 sm:text-sm">{review.name}</h3><p className="text-[10px] text-slate-400">{review.place}</p></div></div>
      </article>)}</div>
    </div>
  </section>;
}
