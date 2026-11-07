import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function VisitorCounter({ lang = "bn" }) {
  const [count, setCount] = useState(null);
  useEffect(() => {
    let active = true;
    const key = "Nagorik -visitor-counted";
    const method = sessionStorage.getItem(key) ? "GET" : "POST";
    fetch("/.netlify/functions/visitor-count", { method })
      .then(r => { if (!r.ok) throw new Error("Unavailable"); return r.json(); })
      .then(data => {
        const n = Number(data.count);
        if (active && Number.isFinite(n)) setCount(n);
        if (method === "POST") sessionStorage.setItem(key, "1");
      }).catch(() => {});
    return () => { active = false; };
  }, []);
  return <div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/60" aria-live="polite">
    <Users size={15}/><span>{lang === "bn" ? "মোট ভিজিটর:" : "Total visitors:"}</span>
    <strong className="text-[#8af0e1]">{count === null ? "—" : count.toLocaleString(lang === "bn" ? "bn-BD" : "en-US")}</strong>
  </div>;
}
