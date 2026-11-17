// Demo-only browser authentication. For production, replace with a secure server-side auth provider.
const ADMIN_EMAIL = "dhaka2627@gmail.com";
const ADMIN_PASSWORD = "1010995982";
const USERS_KEY = "nagorik_registered_users";

async function hashPassword(password) {
  if (globalThis.crypto?.subtle) {
    const bytes = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  // Fallback is only for local/demo compatibility; do not use this auth for real accounts.
  return btoa(unescape(encodeURIComponent(password)));
}
function readUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); }
  catch { return []; }
}
function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }

export async function signUp(email, password, displayName) {
  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail === ADMIN_EMAIL) throw new Error("এই ইমেইলটি অ্যাডমিনের জন্য সংরক্ষিত।");
  if (password.length < 6) throw new Error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
  const users = readUsers();
  if (users.some((u) => u.email === normalizedEmail)) throw new Error("এই ইমেইল দিয়ে আগে থেকেই অ্যাকাউন্ট খোলা আছে। লগইন করুন।");
  users.push({ email: normalizedEmail, displayName: displayName.trim(), passwordHash: await hashPassword(password), createdAt: new Date().toISOString() });
  saveUsers(users);
  return { email: normalizedEmail, displayName: displayName.trim(), role: "user" };
}

export async function signIn(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail === ADMIN_EMAIL) {
    if (password !== ADMIN_PASSWORD) throw new Error("অ্যাডমিন পাসওয়ার্ড সঠিক নয়।");
    return { email: ADMIN_EMAIL, displayName: "Admin", role: "admin" };
  }
  const user = readUsers().find((u) => u.email === normalizedEmail);
  if (!user || user.passwordHash !== await hashPassword(password)) {
    throw new Error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আগে Sign Up করুন।");
  }
  return { email: user.email, displayName: user.displayName || user.email.split("@")[0], role: "user" };
}

export async function sendPasswordReset() {
  throw new Error("এই ডেমো সংস্করণে পাসওয়ার্ড রিসেট নেই।");
}
