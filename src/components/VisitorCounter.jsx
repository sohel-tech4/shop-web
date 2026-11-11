
import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function VisitorCounter({ lang = "bn" }) {
  const [count, setCount] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    const key = "Nagorik-visitor-counted";

    let method = "GET";

    try {
      method = sessionStorage.getItem(key) ? "GET" : "POST";
    } catch {
      method = "GET";
    }

    fetch("/.netlify/functions/visitor-count", { method })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Visitor API failed: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        const n = Number(data.count);

        if (!Number.isFinite(n)) {
          throw new Error("Invalid visitor count");
        }

        if (active) {
          setCount(n);
          setError(false);
        }

        if (method === "POST") {
          try {
            sessionStorage.setItem(key, "1");
          } catch {}
        }
      })
      .catch((err) => {
        console.error("Visitor Counter Error:", err);
        if (active) setError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      className="flex items-center gap-2 text-xs text-white/60"
      aria-live="polite"
    >
      <Users size={15} />

      <span>
        {lang === "bn" ? "মোট ভিজিটর:" : "Total visitors:"}
      </span>

      <strong className="text-[#8af0e1]">
        {error
          ? "Unavailable"
          : count === null
          ? "—"
          : count.toLocaleString(lang === "bn" ? "bn-BD" : "en-US")}
      </strong>
    </div>
  );
}
