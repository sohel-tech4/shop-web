import { useState } from "react";
import { Send, X, ClipboardCheck, ArrowLeft } from "lucide-react";
import { services } from "../services";
import { createApplication } from "../services/applications";

export default function ApplicationCenter({ lang = "bn", user, initialService = null, onClose }) {
  const bn = lang === "bn";
  const tr = (a,b) => bn ? a : b;
  const [name,setName] = useState(user?.displayName || "");
  const [phone,setPhone] = useState("");
  const [email] = useState(user?.email || "");
  const [serviceId,setServiceId] = useState(initialService?.id || "");
  const [details,setDetails] = useState(initialService ? (lang === "bn" ? initialService.descBn : initialService.descEn) : "");
  const [created,setCreated] = useState(null);
  const [error,setError] = useState("");
  const chosen = services.find((s) => s.id === serviceId);
  const submit = (event) => {
    event.preventDefault(); setError("");
    if (!name.trim() || !phone.trim() || !serviceId || !details.trim()) return setError(tr("সব প্রয়োজনীয় তথ্য পূরণ করুন।", "Please complete all required fields."));
    if (phone.replace(/\D/g,"").length < 10) return setError(tr("সঠিক মোবাইল নম্বর দিন।", "Enter a valid phone number."));
    const item = createApplication({ name:name.trim(), phone:phone.trim(), email:email.trim(), serviceId, serviceNameBn:chosen.bn, serviceNameEn:chosen.en, details:details.trim(), userEmail:user?.email || "" });
    setCreated(item);
  };
  return <div className="application-overlay" role="dialog" aria-modal="true" aria-labelledby="application-title">
    <section className="application-modal">
      <header className="application-head"><div><span>{tr("NAGORIK E-SERVICE", "NAGORIK E-SERVICE")}</span><h2 id="application-title">{tr("সেবা গ্রহণের আবেদন", "Service Request")}</h2><p>{tr("নির্বাচিত সেবার জন্য আপনার আবেদন জমা দিন।", "Submit your request for the selected service.")}</p></div><button onClick={onClose} aria-label={tr("বন্ধ করুন","Close")}><X/></button></header>
      {created ? <div className="application-success"><div className="application-success-icon"><ClipboardCheck size={30}/></div><h3>{tr("আপনার আবেদন গ্রহণ করা হয়েছে!", "Your request has been received!")}</h3><p>{tr("আপনার Tracking Number সংরক্ষণ করুন। আবেদনের বিস্তারিত অবস্থা আপনার ড্যাশবোর্ডে দেখা যাবে।", "Save your Tracking Number. Full application status is available in your dashboard.")}</p><div className="tracking-code"><small>TRACKING ID</small><strong>{created.trackingId}</strong><button onClick={() => navigator.clipboard?.writeText(created.trackingId)}>{tr("কপি", "Copy")}</button></div><p className="application-disclaimer">{tr("আবেদনটি এই ব্রাউজারের লোকাল স্টোরেজে সংরক্ষিত হয়েছে। অনলাইন/অন্য ডিভাইস থেকে ট্র্যাকিংয়ের জন্য সার্ভার ডেটাবেস সংযোগ প্রয়োজন।", "This request is saved in this browser's local storage. Server/database integration is required for cross-device or online tracking.")}</p><button className="application-primary" onClick={onClose}>{tr("সম্পন্ন", "Done")}</button></div> : <form className="application-form" onSubmit={submit}>
        <div className="application-form-grid"><label>{tr("আপনার নাম *", "Your name *")}<input value={name} onChange={(e)=>setName(e.target.value)} required placeholder={tr("সম্পূর্ণ নাম", "Full name")}/></label><label>{tr("মোবাইল নম্বর *", "Phone number *")}<input value={phone} onChange={(e)=>setPhone(e.target.value)} required inputMode="tel" placeholder="01XXXXXXXXX"/></label><label>{tr("আপনার অ্যাকাউন্টের ইমেইল", "Your account email")}<input type="email" value={email} readOnly required className="bg-slate-100 cursor-not-allowed"/><small>{tr("লগইন করা অ্যাকাউন্ট থেকে স্বয়ংক্রিয়ভাবে যুক্ত হয়েছে।", "Automatically added from your signed-in account.")}</small></label><label>{tr("নির্বাচিত সেবা", "Selected service")}{initialService ? <input value={bn ? initialService.bn : initialService.en} readOnly required className="bg-slate-100 cursor-not-allowed"/> : <select value={serviceId} onChange={(e)=>setServiceId(e.target.value)} required><option value="">{tr("সার্ভিস নির্বাচন করুন", "Choose a service")}</option>{services.map((s)=><option key={s.id} value={s.id}>{bn?s.bn:s.en}</option>)}</select>}</label></div>
        <label>{tr("কাজের বিস্তারিত লিখুন *", "Request details *")}<textarea value={details} onChange={(e)=>setDetails(e.target.value)} rows={4} required placeholder={tr("আপনার কী ধরনের সহায়তা প্রয়োজন তা লিখুন...", "Describe what assistance you need...")}/></label>
        {error && <p className="application-error">{error}</p>}<p className="application-disclaimer">{tr("এটি প্রাথমিক সার্ভিস অনুরোধ, সরকারি আবেদন নয়। এখানে NID/পাসপোর্ট নম্বর বা পাসওয়ার্ডের মতো সংবেদনশীল তথ্য লিখবেন না।", "This is a service request, not an official government application. Do not enter sensitive data such as NID/passport numbers or passwords here.")}</p><button className="application-primary" type="submit"><Send size={17}/>{tr("আবেদন জমা দিন", "Submit Request")}</button>
      </form>}
      <footer className="application-foot"><button onClick={onClose}><ArrowLeft size={16}/>{tr("ওয়েবসাইটে ফিরে যান", "Back to website")}</button><span>{tr("Nagorik Computer & e-Service", "Nagorik Computer & e-Service")}</span></footer>
    </section>
  </div>;
}
