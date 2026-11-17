const USERS_KEY = 'nagorik_local_users';
const SESSION_KEY = 'nagorik_auth_user';
const ADMIN_PROFILE_KEY = 'nagorik_admin_profile';

// লোকাল-স্টোরেজ সংস্করণ: অ্যাডমিন পাসওয়ার্ডটি নিজের মতো পরিবর্তন করুন।
// এটি ক্লায়েন্ট-সাইড ডেমো নিরাপত্তা; production-এ নিরাপদ নয়।
const ADMIN_EMAIL = 'dhaka2627@gmail.com';
const ADMIN_PASSWORD = '1010995982';

const readUsers = () => {
  try {
    const value = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};
const writeUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));
const normalizeEmail = (email) => String(email || '').trim().toLowerCase();
const makeId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
async function hashPassword(password, salt) {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function signUp(email, password, displayName = '') {
  const cleanEmail = normalizeEmail(email);
  if (!cleanEmail || !cleanEmail.includes('@')) throw new Error('সঠিক ইমেইল ঠিকানা দিন।');
  if (password.length < 8) throw new Error('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।');
  if (cleanEmail === normalizeEmail(ADMIN_EMAIL)) throw new Error('এই ইমেইলটি অ্যাডমিনের জন্য সংরক্ষিত।');
  const users = readUsers();
  if (users.some((item) => normalizeEmail(item.email) === cleanEmail)) throw new Error('এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট খোলা হয়েছে।');
  const salt = makeId();
  const user = {
    id: makeId(), displayName: String(displayName || '').trim(), email: cleanEmail,
    role: 'user', passwordSalt: salt, passwordHash: await hashPassword(password, salt),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  const safeUser = { id: user.id, displayName: user.displayName, email: user.email, role: user.role, createdAt: user.createdAt };
  localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
  return safeUser;
}

export async function signIn(email, password) {
  const cleanEmail = normalizeEmail(email);
  if (cleanEmail === normalizeEmail(ADMIN_EMAIL)) {
    if (password !== ADMIN_PASSWORD) throw new Error('ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।');
    const savedProfile = (() => { try { return JSON.parse(localStorage.getItem(ADMIN_PROFILE_KEY) || '{}'); } catch { return {}; } })();
    const admin = { id: 'nagorik-local-admin', displayName: 'Nagorik Admin', email: ADMIN_EMAIL, role: 'admin', ...savedProfile, id: 'nagorik-local-admin', email: ADMIN_EMAIL, role: 'admin' };
    localStorage.setItem(SESSION_KEY, JSON.stringify(admin));
    return admin;
  }
  const user = readUsers().find((item) => normalizeEmail(item.email) === cleanEmail);
  if (!user) throw new Error('এই ইমেইলে কোনো অ্যাকাউন্ট পাওয়া যায়নি। আগে সাইন আপ করুন।');
  const enteredHash = await hashPassword(password, user.passwordSalt);
  if (enteredHash !== user.passwordHash) throw new Error('ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।');
  const safeUser = { id: user.id, displayName: user.displayName, email: user.email, role: 'user', createdAt: user.createdAt };
  localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
  return safeUser;
}

export function getRegisteredUsers() {
  return readUsers().map(({ passwordHash, passwordSalt, ...safeUser }) => safeUser);
}

export async function sendPasswordReset() {
  throw new Error('লোকাল-স্টোরেজ সংস্করণে পাসওয়ার্ড রিসেট সুবিধা নেই।');
}

export function updateUserProfile(userId, changes) {
  if (userId === 'nagorik-local-admin') {
    let current = {};
    try { current = JSON.parse(localStorage.getItem(ADMIN_PROFILE_KEY) || '{}'); } catch {}
    const updated = { ...current, displayName: String(changes.displayName ?? current.displayName ?? 'Nagorik Admin').trim(), address: String(changes.address ?? current.address ?? '').trim(), phone: String(changes.phone ?? current.phone ?? '').trim(), photo: changes.photo === undefined ? (current.photo || '') : changes.photo, updatedAt: new Date().toISOString() };
    localStorage.setItem(ADMIN_PROFILE_KEY, JSON.stringify(updated));
    return { id: 'nagorik-local-admin', displayName: updated.displayName, email: ADMIN_EMAIL, role: 'admin', ...updated };
  }
  const users = readUsers();
  const index = users.findIndex((item) => item.id === userId);
  if (index < 0) throw new Error('ব্যবহারকারী পাওয়া যায়নি।');
  const current = users[index];
  users[index] = { ...current, displayName: String(changes.displayName ?? current.displayName).trim(), address: String(changes.address ?? current.address ?? '').trim(), phone: String(changes.phone ?? current.phone ?? '').trim(), photo: changes.photo === undefined ? (current.photo || '') : changes.photo, updatedAt: new Date().toISOString() };
  writeUsers(users);
  const { passwordHash, passwordSalt, ...safeUser } = users[index];
  return safeUser;
}

export function deleteRegisteredUser(userId) {
  const users = readUsers();
  const next = users.filter((item) => item.id !== userId);
  if (next.length === users.length) throw new Error('ব্যবহারকারী পাওয়া যায়নি।');
  writeUsers(next);
  return next.length;
}
