import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const VISITOR_COUNT_KEY = "nagorik_local_visitor_count";
// Prevent React StrictMode from counting the same page load twice in development.
let countedThisPageLoad = false;

export function getLocalVisitorCount() {
  try {
    const value = Number.parseInt(localStorage.getItem(VISITOR_COUNT_KEY) || "0", 10);
    return Number.isFinite(value) && value >= 0 ? value : 0;
  } catch {
    return 0;
  }
}

function registerLocalVisit() {
  try {
    // Count once on every full website page load/reload, not once per browser forever.
    if (countedThisPageLoad) return getLocalVisitorCount();
    countedThisPageLoad = true;
    const next = getLocalVisitorCount() + 1;
    localStorage.setItem(VISITOR_COUNT_KEY, String(next));
    return next;
  } catch {
    return 0;
  }
}

export default function VisitorCounter({ lang = "bn" }) {
  const [count, setCount] = useState(() => getLocalVisitorCount());

  useEffect(() => {
    setCount(registerLocalVisit());
    const sync = () => setCount(getLocalVisitorCount());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-white/60" aria-live="polite">
      <Users size={15} />
      <span>{lang === "bn" ? "মোট ভিজিটর:" : "Total visitors:"}</span>
      <strong className="text-[#8af0e1]">
        {count.toLocaleString(lang === "bn" ? "bn-BD" : "en-US")}
      </strong>
    </div>
  );
}
