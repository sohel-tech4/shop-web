import { useState } from "react";
import { Star, MessageSquare, CheckCircle2 } from "lucide-react";

export default function UserReviewsDashboard({ user, applications = [], reviews = [], lang = "bn", onSubmit }) {
  const bn = lang === "bn";
  const tr = (a, b) => bn ? a : b;
  const [drafts, setDrafts] = useState({});
  const [toast, setToast] = useState("");
  const completed = applications.filter((app) => app.status === "completed" && (app.userId === user.id || (app.userEmail || app.email || "").toLowerCase() === (user.email || "").toLowerCase()));
  const reviewed = (serviceId) => reviews.some((r) => r.serviceId === serviceId && ((r.userId && r.userId === user.id) || (r.email || "").toLowerCase() === (user.email || "").toLowerCase()));
  const submit = (app) => {
    const draft = drafts[app.serviceId] || {};
    if (!draft.comment?.trim()) return;
    if (reviewed(app.serviceId)) return;
    onSubmit?.({ serviceId: app.serviceId, serviceNameBn: app.serviceNameBn, serviceNameEn: app.serviceNameEn, rating: draft.rating || 5, comment: draft.comment.trim() });
    setDrafts((v) => ({ ...v, [app.serviceId]: { rating: 5, comment: "" } }));
    setToast(tr("আপনার রিভিউ সফলভাবে জমা হয়েছে এবং সংশ্লিষ্ট সেবায় যুক্ত হয়েছে।", "Your review was submitted and added to the service."));
    window.setTimeout(() => setToast(""), 3500);
  };
  return <div className="ng-dash-panel space-y-4">
    <div><h3 className="text-lg font-black">{tr("আমার সেবা রিভিউ", "My Service Reviews")}</h3><p className="text-sm opacity-70">{tr("সম্পন্ন হওয়া সেবার জন্য একবারই রিভিউ দিতে পারবেন।", "You can submit one review for each completed service.")}</p></div>
    {toast && <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-bold text-emerald-800"><CheckCircle2 className="mr-2 inline" size={17}/>{toast}</div>}
    {!completed.length ? <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-600">{tr("আপনার কোনো আবেদন এখনো সম্পন্ন হয়নি। আবেদন সম্পন্ন হলে এখানে রিভিউ দিতে পারবেন।", "You have no completed applications yet. Once an application is completed, you can review that service here.")}</div> : completed.map((app) => {
      const done = reviewed(app.serviceId);
      const draft = drafts[app.serviceId] || { rating: 5, comment: "" };
      return <article key={app.id} className="rounded-xl border border-slate-200 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2"><h4 className="font-bold">{bn ? app.serviceNameBn : app.serviceNameEn}</h4>{done && <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{tr("রিভিউ দেওয়া হয়েছে", "Reviewed")}</span>}</div>
        {done ? <p className="mt-2 text-sm text-slate-500">{tr("এই সেবায় আপনি ইতিমধ্যে রিভিউ দিয়েছেন। দ্বিতীয়বার রিভিউ দেওয়া যাবে না।", "You have already reviewed this service. A second review is not allowed.")}</p> : <>
          <div className="mt-3 flex items-center gap-1 text-amber-500">{Array.from({ length: 5 }, (_, i) => <button type="button" key={i} onClick={() => setDrafts((v) => ({ ...v, [app.serviceId]: { ...draft, rating: i + 1 } }))} aria-label={`${i + 1} stars`}><Star size={25} fill={i < draft.rating ? "currentColor" : "none"}/></button>)}</div>
          <textarea value={draft.comment} onChange={(e) => setDrafts((v) => ({ ...v, [app.serviceId]: { ...draft, comment: e.target.value } }))} rows={3} maxLength={700} placeholder={tr("আপনার অভিজ্ঞতা লিখুন...", "Write your experience...")} className="mt-3 w-full rounded-xl border border-slate-200 p-3 text-sm"/>
          <button type="button" onClick={() => submit(app)} disabled={!draft.comment.trim()} className="mt-3 rounded-xl bg-[#087f75] px-4 py-2 text-sm font-bold text-white disabled:opacity-40"><MessageSquare className="mr-2 inline" size={16}/>{tr("রিভিউ জমা দিন", "Submit Review")}</button>
        </>}
      </article>;
    })}
  </div>;
}
