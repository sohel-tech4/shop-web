import { useState } from "react";
import { Send, X, ArrowLeft } from "lucide-react";
import { services } from "../services";
import { createApplication } from "../services/applications";
import { BUSINESS } from "../config";

export default function ApplicationCenter({ lang = "bn", initialService = null, onClose }) {
  const bn = lang === "bn";
  const tr = (a, b) => bn ? a : b;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceId, setServiceId] = useState(initialService?.id || "");
  const [details, setDetails] = useState(initialService ? (bn ? initialService.descBn : initialService.descEn) : "");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const chosen = services.find((service) => service.id === serviceId);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (busy) return;
    if (!name.trim() || !phone.trim() || !serviceId || !details.trim()) {
      setError(tr("সব প্রয়োজনীয় তথ্য পূরণ করুন।", "Please complete all required fields."));
      return;
    }
    if (/\p{N}/u.test(name)) {
      setError(tr("নামের ঘরে কোনো সংখ্যা লেখা যাবে না।", "Numbers are not allowed in the name field."));
      return;
    }
    if (!/^[0-9]+$/.test(phone)) {
      setError(tr("মোবাইল নম্বরের ঘরে শুধু ইংরেজি সংখ্যা (০-৯) লিখুন।", "Enter digits only (0-9) in the mobile number field."));
      return;
    }
    if (phone.length < 10) {
      setError(tr("সঠিক মোবাইল নম্বর দিন (কমপক্ষে ১০টি সংখ্যা)।", "Enter a valid mobile number (at least 10 digits)."));
      return;
    }
    if (!chosen) {
      setError(tr("সেবা নির্বাচন সঠিক নয়।", "The selected service is invalid."));
      return;
    }

    setBusy(true);
    try {
      const application = await createApplication({
        name: name.trim(),
        phone: phone.trim(),
        serviceId,
        serviceNameBn: initialService?.bn || chosen.bn,
        serviceNameEn: initialService?.en || chosen.en,
        details: details.trim(),
      });
      const message = [
        `নতুন সেবা আবেদন — ${BUSINESS.name}`,
        `ট্র্যাকিং নম্বর: ${application.trackingId}`,
        `সেবা: ${application.serviceNameBn}`,
        `গ্রাহকের নাম: ${application.name}`,
        `মোবাইল: ${application.phone}`,
        `বিস্তারিত: ${application.details}`,
      ].join("\n");
      const whatsappUrl = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
      setSuccess(true);
      // Keep the customer on the website with the thank-you message visible for a full 5 seconds.
      // Only after that delay do we open WhatsApp; no blank tab is opened on the submit click.
      window.setTimeout(() => {
        onClose?.();
        window.setTimeout(() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
        const whatsappTab = window.open(whatsappUrl, "_blank");
        // If the browser blocks the delayed new tab, continue in the current tab rather than losing the request.
        if (!whatsappTab) window.location.assign(whatsappUrl);
      }, 5000);
    } catch (submitError) {
      setError(submitError?.message || tr("আবেদন জমা দেওয়া যায়নি।", "Could not submit your request."));
      setBusy(false);
    }
  };

  return (
    <div className="application-overlay" role="dialog" aria-modal="true" aria-labelledby={success ? "application-success-title" : "application-title"}>
      {success ? <section className="application-modal application-thankyou" role="status" aria-live="polite">
        <div className="application-thankyou-glow" aria-hidden="true" />
        <div className="application-thankyou-sparkles" aria-hidden="true"><i>✦</i><i>✧</i><i>✦</i><i>✧</i><i>✦</i></div>
        <div className="application-thankyou-icon"><span>✓</span></div>
        <div className="application-thankyou-badge">{tr("আবেদন প্রস্তুত", "REQUEST READY")}</div>
        <h2 id="application-success-title">{tr("ধন্যবাদ!", "Thank you!")}</h2>
        <p className="application-thankyou-message">{tr("আপনার সেবা গ্রহণের আবেদনটি প্রস্তুত হয়েছে। আপনাকে এখন WhatsApp-এ নিয়ে যাওয়া হচ্ছে।", "Your service request is ready. We are taking you to WhatsApp now.")}</p>
        <div className="application-whatsapp-hint"><strong>{tr("WhatsApp-এ মেসেজটি Send করুন", "Please press Send in WhatsApp")}</strong><span>{tr("মেসেজটি আগে থেকেই লেখা থাকবে—শুধু Send বাটনে চাপ দিন।", "Your message will be ready. Just tap the Send button.")}</span></div>
        <div className="application-thankyou-progress" aria-label={tr("৫ সেকেন্ড পর WhatsApp খুলবে", "WhatsApp opens in 5 seconds")}><span /></div>
        <p className="application-thankyou-footer">{tr("৫ সেকেন্ড পর WhatsApp খুলবে…", "WhatsApp will open in 5 seconds…")}</p>
      </section> : <section className="application-modal">
        <header className="application-head">
          <div>
            <span>NAGORIK E-SERVICE</span>
            <h2 id="application-title">{tr("সেবা গ্রহণের আবেদন", "Service Request")}</h2>
            <p>{tr("তথ্য পূরণ করে সেবা নিন চাপুন—আপনার আবেদন WhatsApp-এ যাবে।", "Complete the form and click Get Service to send your request through WhatsApp.")}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={tr("বন্ধ করুন", "Close")}><X /></button>
        </header>

        <form className="application-form" onSubmit={submit}>
          <div className="application-form-grid">
            <label>{tr("আপনার নাম *", "Your name *")}
              <input value={name} onChange={(event) => {
                const value = event.target.value;
                setName(value);
                if (/\p{N}/u.test(value)) setError(tr("নামের ঘরে কোনো সংখ্যা লেখা যাবে না।", "Numbers are not allowed in the name field."));
                else setError("");
              }} required placeholder={tr("সম্পূর্ণ নাম", "Full name")} autoComplete="name" />
            </label>
            <label>{tr("মোবাইল নম্বর *", "Mobile number *")}
              <input value={phone} onChange={(event) => {
                const value = event.target.value;
                setPhone(value);
                if (value && !/^[0-9]+$/.test(value)) setError(tr("মোবাইল নম্বরের ঘরে শুধু ইংরেজি সংখ্যা (০-৯) লিখুন।", "Enter digits only (0-9) in the mobile number field."));
                else setError("");
              }} required type="tel" inputMode="numeric" pattern="[0-9]+" maxLength={15} placeholder="01XXXXXXXXX" autoComplete="tel" />
            </label>
            <label>{tr("নির্বাচিত সেবা", "Selected service")}
              {initialService
                ? <input value={bn ? initialService.bn : initialService.en} readOnly required className="bg-slate-100 cursor-not-allowed" />
                : <select value={serviceId} onChange={(event) => setServiceId(event.target.value)} required>
                    <option value="">{tr("সার্ভিস নির্বাচন করুন", "Choose a service")}</option>
                    {services.map((service) => <option key={service.id} value={service.id}>{bn ? service.bn : service.en}</option>)}
                  </select>}
            </label>
          </div>
          <label>{tr("কী বিষয়ে সেবা নিচ্ছেন এবং বিস্তারিত লিখুন *", "What service do you need? Please provide details. *")}
            <textarea value={details} onChange={(event) => setDetails(event.target.value)} rows={4} required placeholder={tr("আপনার কী ধরনের সহায়তা প্রয়োজন তা বিস্তারিত লিখুন...", "Describe exactly what assistance you need...")} />
          </label>
          {error && <p className="application-error" role="alert">{error}</p>}
          <p className="application-disclaimer">{tr("সেবা নিন চাপলে আপনার আবেদনটি ট্র্যাকিং নম্বরসহ সরাসরি WhatsApp-এ পাঠানোর জন্য খুলবে। সংবেদনশীল তথ্য লিখবেন না।", "Click Get Service to open WhatsApp with your request and tracking number. Do not enter sensitive information.")}</p>
          <button className="application-primary" type="submit" disabled={busy}>
            <Send size={17} />{busy ? tr("অপেক্ষা করুন...", "Please wait...") : tr("সেবা নিন", "Get Service")}
          </button>
        </form>

        <footer className="application-foot">
          <button type="button" onClick={onClose}><ArrowLeft size={16} />{tr("ওয়েবসাইটে ফিরে যান", "Back to website")}</button>
          <span>Nagorik Computer &amp; e-Service</span>
        </footer>
      </section>}
    </div>
  );
}
