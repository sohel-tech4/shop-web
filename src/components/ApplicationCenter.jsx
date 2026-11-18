import { useEffect, useState } from "react";
import { Send, X, ClipboardCheck, ArrowLeft } from "lucide-react";
import { services } from "../services";
import { createApplication } from "../services/applications";
import { BUSINESS } from "../config";

export default function ApplicationCenter({ lang = "bn", user, initialService = null, onClose }) {
  const bn = lang === "bn";
  const tr = (a,b) => bn ? a : b;
  const [name,setName] = useState(user?.displayName || "");
  const [phone,setPhone] = useState(user?.phone || "");
  const [serviceId,setServiceId] = useState(initialService?.id || "");
  const [details,setDetails] = useState(initialService ? (lang === "bn" ? initialService.descBn : initialService.descEn) : "");
  const [created,setCreated] = useState(null);
  const [error,setError] = useState("");
  const chosen = services.find((s) => s.id === serviceId);
  const [busy,setBusy] = useState(false);
  const [toast,setToast] = useState(null);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);
  const copyTrackingId = async () => {
    try {
      await navigator.clipboard.writeText(created.trackingId);
      setToast({ type: "success", message: tr("ট্র্যাকিং নম্বর কপি হয়েছে!", "Tracking number copied!") });
    } catch {
      setToast({ type: "error", message: tr("কপি করা যায়নি। নম্বরটি হাতে কপি করুন।", "Could not copy. Please copy the number manually.") });
    }
  };
  const submit = async (event) => {
    event.preventDefault(); setError("");
    if (busy) return;
    if (!name.trim() || !phone.trim() || !serviceId || !details.trim()) return setError(tr("সব প্রয়োজনীয় তথ্য পূরণ করুন।", "Please complete all required fields."));
    if (phone.replace(/\D/g,"").length < 10) return setError(tr("সঠিক মোবাইল নম্বর দিন।", "Enter a valid phone number."));
    if (!chosen) return setError(tr("সেবা নির্বাচন সঠিক নয়।", "The selected service is invalid."));
    setBusy(true);
    // Open both destinations during the user's click so browser popup blockers are less likely to block them.
    const whatsappTab = window.open("about:blank", "_blank");
    const emailTab = window.open("about:blank", "_blank");
    try {
      const item = await createApplication({ name:name.trim(), phone:phone.trim(), serviceId, serviceNameBn:initialService?.bn || chosen.bn, serviceNameEn:initialService?.en || chosen.en, details:details.trim() });
      const message = [
        `নতুন সেবা আবেদন — ${BUSINESS.name}`,
        `ট্র্যাকিং নম্বর: ${item.trackingId}`,
        `সেবা: ${item.serviceNameBn}`,
        `গ্রাহকের নাম: ${item.name}`,
        `মোবাইল: ${item.phone}`,
        `ইমেইল: ${item.email || "দেওয়া হয়নি"}`,
        `বিস্তারিত: ${item.details}`,
      ].join("\n");
      const whatsappUrl = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
      const subject = `${BUSINESS.name} - নতুন সেবা আবেদন (${item.trackingId})`;
      const mailtoUrl = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      if (whatsappTab) whatsappTab.location.href = whatsappUrl;
      if (emailTab) emailTab.location.href = mailtoUrl;
      setCreated({ ...item, notificationOpened: Boolean(whatsappTab || emailTab) });
      setToast({ type: "success", message: tr("আবেদন জমা হয়েছে! WhatsApp ও Email-এ Send চাপুন।", "Request saved! Press Send in WhatsApp and your email app.") });
    } catch (err) {
      if (whatsappTab) whatsappTab.close();
      if (emailTab) emailTab.close();
      setError(err.message || tr("আবেদন জমা দেওয়া যায়নি।", "Could not submit your request."));
    }
    finally { setBusy(false); }
  };
  return <div className="application-overlay" role="dialog" aria-modal="true" aria-labelledby="application-title">
    {toast && <div role="status" aria-live="polite" className={`fixed right-4 top-4 z-[10000] flex max-w-[min(92vw,390px)] items-center gap-3 rounded-2xl px-5 py-4 text-sm font-bold text-white shadow-2xl ${toast.type === "success" ? "bg-[#087f75]" : "bg-red-600"}`}><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20">{toast.type === "success" ? "✓" : "!"}</span><span>{toast.message}</span><button type="button" onClick={() => setToast(null)} className="ml-2 text-lg leading-none text-white/80" aria-label={tr("বন্ধ করুন", "Dismiss")}>×</button></div>}
    <section className="application-modal">
      <header className="application-head"><div><span>{tr("NAGORIK E-SERVICE", "NAGORIK E-SERVICE")}</span><h2 id="application-title">{tr("সেবা গ্রহণের আবেদন", "Service Request")}</h2><p>{tr("নির্বাচিত সেবার জন্য আপনার আবেদন জমা দিন।", "Submit your request for the selected service.")}</p></div><button onClick={onClose} aria-label={tr("বন্ধ করুন","Close")}><X/></button></header>
      {created ? <div className="application-success"><div className="application-success-icon"><ClipboardCheck size={30}/></div><h3>{tr("আপনার আবেদন গ্রহণ করা হয়েছে!", "Your request has been received!")}</h3><p>{tr("আপনার Tracking Number সংরক্ষণ করুন। আবেদনের বিস্তারিত অবস্থা আপনার ড্যাশবোর্ডে দেখা যাবে।", "Save your Tracking Number. Full application status is available in your dashboard.")}</p><div className="tracking-code"><small>TRACKING ID</small><strong>{created.trackingId}</strong><button type="button" onClick={copyTrackingId}>{tr("কপি", "Copy")}</button></div><p className="application-disclaimer">{tr("আপনার আবেদন সংরক্ষিত হয়েছে। WhatsApp ও Email-এর খোলা উইন্ডোতে Send চাপলে আপনার কাছে আবেদনটি পাঠানো হবে।", "Your request has been saved. Press Send in the opened WhatsApp and email windows to send it to the business.")}</p><button className="application-primary" onClick={onClose}>{tr("সম্পন্ন", "Done")}</button></div> : <form className="application-form" onSubmit={submit}>
        <div className="application-form-grid"><label>{tr("আপনার নাম *", "Your name *")}<input value={name} onChange={(e)=>setName(e.target.value)} required placeholder={tr("সম্পূর্ণ নাম", "Full name")}/></label><label>{tr("মোবাইল নম্বর *", "Phone number *")}<input value={phone} readOnly required inputMode="tel" className="bg-slate-100 cursor-not-allowed" placeholder="01XXXXXXXXX"/><small>{tr("আপনার লগইন করা মোবাইল নম্বর স্বয়ংক্রিয়ভাবে যুক্ত হয়েছে।", "Your signed-in mobile number is added automatically.")}</small></label><label>{tr("নির্বাচিত সেবা", "Selected service")}{initialService ? <input value={bn ? initialService.bn : initialService.en} readOnly required className="bg-slate-100 cursor-not-allowed"/> : <select value={serviceId} onChange={(e)=>setServiceId(e.target.value)} required><option value="">{tr("সার্ভিস নির্বাচন করুন", "Choose a service")}</option>{services.map((s)=><option key={s.id} value={s.id}>{bn?s.bn:s.en}</option>)}</select>}</label></div>
        <label>{tr("কাজের বিস্তারিত লিখুন *", "Request details *")}<textarea value={details} onChange={(e)=>setDetails(e.target.value)} rows={4} required placeholder={tr("আপনার কী ধরনের সহায়তা প্রয়োজন তা লিখুন...", "Describe what assistance you need...")}/></label>
        {error && <p className="application-error">{error}</p>}<p className="application-disclaimer">{tr("এটি প্রাথমিক সার্ভিস অনুরোধ, সরকারি আবেদন নয়। এখানে NID/পাসপোর্ট নম্বর বা পাসওয়ার্ডের মতো সংবেদনশীল তথ্য লিখবেন না।", "This is a service request, not an official government application. Do not enter sensitive data such as NID/passport numbers or passwords here.")}</p><button className="application-primary" type="submit" disabled={busy}><Send size={17}/>{busy ? tr("জমা হচ্ছে...", "Submitting...") : tr("আবেদন জমা দিন", "Submit Request")}</button>
      </form>}
      <footer className="application-foot"><button onClick={onClose}><ArrowLeft size={16}/>{tr("ওয়েবসাইটে ফিরে যান", "Back to website")}</button><span>{tr("Nagorik Computer & e-Service", "Nagorik Computer & e-Service")}</span></footer>
    </section>
  </div>;
}
