import { useEffect, useMemo, useState } from "react";
import { ClipboardList, RefreshCw, Search, Save, Trash2 } from "lucide-react";
import { readApplications, updateApplication, deleteApplication, statusLabel, APPLICATION_STATUSES } from "../services/applications";

export default function ApplicationsDashboard({ user, isAdmin, lang = "bn" }) {
  const bn = lang === "bn"; const tr = (a,b) => bn ? a : b;
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [query,setQuery] = useState("");
  const [drafts,setDrafts] = useState({});
  const refresh = async () => {
    setLoading(true); setError("");
    try { setItems(await readApplications()); }
    catch (err) { setError(err.message || tr("আবেদন লোড করা যায়নি।", "Could not load applications.")); }
    finally { setLoading(false); }
  };
  useEffect(() => { refresh(); }, []);
  const visible = useMemo(() => (isAdmin ? items : items.filter((x) => (user?.id && x.userId && String(x.userId) === String(user.id)) || (user?.phone && String(x.phone || "").replace(/\D/g, "") === String(user.phone).replace(/\D/g, "")) || (user?.phone && String(x.userEmail || "").replace(/\D/g, "") === String(user.phone).replace(/\D/g, "")))).filter((x) => !query || [x.trackingId,x.name,x.phone,x.serviceNameBn,x.serviceNameEn].some((v)=>String(v||"").toLowerCase().includes(query.toLowerCase()))), [items,isAdmin,user,query]);
  const remove = async (item) => {
    const message = tr("আপনি কি নিশ্চিতভাবে এই আবেদনটি ডিলেট করতে চান? এটি আর ফেরত আনা যাবে না।", "Are you sure you want to delete this request? This cannot be undone.");
    if (!window.confirm(message)) return;
    try {
      await deleteApplication(item.id);
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      setError("");
    } catch (err) { setError(err.message || tr("আবেদনটি ডিলেট করা যায়নি।", "Could not delete the request.")); }
  };
  const save = async (item) => {
    try {
      const updated = await updateApplication(item.id,{ status:drafts[item.id]?.status ?? item.status, adminNote:drafts[item.id]?.note ?? item.adminNote ?? "" });
      setItems((current) => current.map((entry) => entry.id === item.id ? updated : entry));
      setDrafts((d)=>({...d,[item.id]:undefined}));
    } catch (err) { setError(err.message || tr("আপডেট সংরক্ষণ করা যায়নি।", "Could not save the update.")); }
  };
  return <div className="ng-applications-page"><div className="ng-applications-toolbar"><div><h2>{tr(isAdmin?"গ্রাহকের আবেদনসমূহ":"আমার আবেদনসমূহ",isAdmin?"Customer Applications":"My Applications")}</h2><p>{tr(isAdmin?"নতুন অনুরোধ দেখুন এবং আবেদনের অবস্থা আপডেট করুন।":"আপনার অ্যাকাউন্টের সঙ্গে যুক্ত আবেদনগুলোর অবস্থা দেখুন।",isAdmin?"Review new requests and update application status.":"Check requests associated with your account.")}</p></div><button onClick={refresh}><RefreshCw size={16}/>{tr("রিফ্রেশ","Refresh")}</button></div>
    <div className="ng-applications-summary"><div><strong>{visible.length}</strong><span>{tr("মোট আবেদন","Total requests")}</span></div><div><strong>{visible.filter(x=>x.status==="pending").length}</strong><span>{tr("অপেক্ষমাণ","Pending")}</span></div><div><strong>{visible.filter(x=>x.status==="processing").length}</strong><span>{tr("কাজ চলছে","Processing")}</span></div><div><strong>{visible.filter(x=>x.status==="completed").length}</strong><span>{tr("সম্পন্ন","Completed")}</span></div></div>
    <label className="ng-applications-search"><Search size={17}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder={tr("Tracking ID, নাম বা মোবাইল দিয়ে খুঁজুন","Search by tracking ID, name or phone")}/></label>
    {error && <p className="application-error" role="alert">{error}</p>}
    {loading ? <div className="ng-applications-empty"><strong>{tr("আবেদন লোড হচ্ছে...", "Loading applications...")}</strong></div> : visible.length ? <div className="ng-applications-list">{visible.map((item)=><article className="ng-application-card" key={item.id}><div className="ng-application-card-head"><div><small>{tr("TRACKING ID","TRACKING ID")}</small><strong>{item.trackingId}</strong></div><span className={`application-status status-${item.status}`}>{statusLabel(item.status,bn)}</span></div><h3>{bn?item.serviceNameBn:item.serviceNameEn}</h3><div className="ng-application-meta"><span>{item.name}</span><span>{item.phone}</span><span>{new Date(item.createdAt).toLocaleDateString(bn?"bn-BD":"en-US")}</span></div><p>{item.details}</p>{isAdmin ? <div className="ng-application-admin-controls"><label>{tr("আবেদনের অবস্থা","Application status")}<select value={drafts[item.id]?.status ?? item.status} onChange={(e)=>setDrafts(d=>({...d,[item.id]:{...d[item.id],status:e.target.value}}))}>{APPLICATION_STATUSES.map(s=><option value={s} key={s}>{statusLabel(s,bn)}</option>)}</select></label><label>{tr("গ্রাহকের জন্য নোট","Note for customer")}<input value={drafts[item.id]?.note ?? item.adminNote ?? ""} onChange={(e)=>setDrafts(d=>({...d,[item.id]:{...d[item.id],note:e.target.value}}))} placeholder={tr("আপডেট/প্রয়োজনীয় তথ্য লিখুন","Add an update for the customer")}/></label><button onClick={()=>save(item)}><Save size={16}/>{tr("আপডেট সংরক্ষণ","Save update")}</button></div> : <><div className="ng-application-customer-actions">{item.adminNote && <div className="ng-application-note"><strong>{tr("অ্যাডমিনের বার্তা","Admin note")}:</strong> {item.adminNote}</div>}<button type="button" className="ng-application-delete" onClick={()=>remove(item)}><Trash2 size={16}/>{tr("আবেদন ডিলেট করুন","Delete request")}</button></div></>}</article>)}</div> : <div className="ng-applications-empty"><ClipboardList size={32}/><strong>{tr("এখনো কোনো আবেদন পাওয়া যায়নি","No applications found yet")}</strong><p>{tr(isAdmin?"গ্রাহকরা ওয়েবসাইট থেকে আবেদন করলে এখানে দেখা যাবে।":"ওয়েবসাইট থেকে আবেদন জমা দিলে এখানে দেখা যাবে।",isAdmin?"Requests submitted through the website will appear here.":"Requests you submit on the website will appear here.")}</p></div>}
  </div>;
}
