const headers = { "content-type": "application/json", "cache-control": "no-store" };
export const handler = async (event) => {
  const workspace = process.env.COUNTERAPI_WORKSPACE;
  const token = process.env.COUNTERAPI_TOKEN;
  if (!workspace || !token) return { statusCode: 503, headers, body: JSON.stringify({ error: "Counter not configured" }) };
  const method = event.httpMethod === "POST" ? "POST" : "GET";
  const url = `https://api.counterapi.dev/v2/${encodeURIComponent(workspace)}/Nagorik -visitors${method === "POST" ? "/up" : ""}`;
  try {
    const r = await fetch(url, { method, headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } });
    const payload = await r.json();
    if (!r.ok) return { statusCode: r.status, headers, body: JSON.stringify({ error: "Counter request failed" }) };
    const d = payload?.data ?? payload;
    const count = Number(d?.count ?? d?.up_count ?? d?.value ?? d?.total);
    return { statusCode: 200, headers, body: JSON.stringify({ count: Number.isFinite(count) ? count : null }) };
  } catch {
    return { statusCode: 502, headers, body: JSON.stringify({ error: "Counter service unavailable" }) };
  }
};
