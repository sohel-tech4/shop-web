const USERS_KEY = 'nagorik_local_users';
const SESSION_KEY = 'nagorik_auth_user';
const ADMIN_PROFILE_KEY = 'nagorik_admin_profile';
const ADMIN_PHONE = '01776462919';
// Demo-mode admin PIN verifier. For production, move this check to a server function.
const ADMIN_PIN_SALT = 'nagorik-admin-pin-v1';
const ADMIN_PIN_HASH = '9ef828cdb72d6a7bf27b7281f25e008cecb7fdab210b9f16c0ca1c21c3f9889d';
const PBKDF2_ITERATIONS = 310000;
const normalizePhone = (value) => String(value || '').replace(/[\s-]/g, '').trim();
const makeId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const readUsers = () => {
  try { const value = JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); return Array.isArray(value) ? value : []; }
  catch { return []; }
};
const writeUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));
const validPhone = (phone) => /^(?:\+?8801|01)[3-9]\d{8}$/.test(phone);
const validPin = (pin) => /^\d{6}$/.test(String(pin || ''));
const toHex = (bytes) => Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('');
async function derivePin(pin, salt) {
  if (!globalThis.crypto?.subtle) throw new Error('নিরাপদ PIN যাচাইয়ের জন্য HTTPS ব্যবহার করুন।');
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(String(pin)), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' }, key, 256);
  return toHex(bits);
}
const safeUser = (user) => ({ id: user.id, displayName: user.displayName || '', phone: user.phone, email: user.phone, role: user.role || 'user', createdAt: user.createdAt, pinVerified: true });

// Browser-local PIN login. This does not prove ownership of the phone number.
export async function signIn(phone, pin, confirmPin = '') {
  const cleanPhone = normalizePhone(phone);
  if (!validPhone(cleanPhone)) throw new Error('সঠিক বাংলাদেশি মোবাইল নম্বর দিন।');
  if (!validPin(pin)) throw new Error('PIN অবশ্যই ৬ সংখ্যার হতে হবে।');

  if (cleanPhone === ADMIN_PHONE) {
    const actual = await derivePin(pin, ADMIN_PIN_SALT);
    if (actual !== ADMIN_PIN_HASH) throw new Error('অ্যাডমিন PIN সঠিক নয়।');
    let savedProfile = {};
    try { savedProfile = JSON.parse(localStorage.getItem(ADMIN_PROFILE_KEY) || '{}'); } catch {}
    const admin = { id: 'nagorik-local-admin', displayName: savedProfile.displayName || 'Nagorik Admin', phone: ADMIN_PHONE, email: ADMIN_PHONE, role: 'admin', ...savedProfile, id: 'nagorik-local-admin', phone: ADMIN_PHONE, email: ADMIN_PHONE, role: 'admin', pinVerified: true };
    localStorage.setItem(SESSION_KEY, JSON.stringify(admin));
    return admin;
  }

  throw new Error('শুধুমাত্র অ্যাডমিন লগইন করতে পারবেন।');

}

export function getRegisteredUsers() {
  return readUsers().map(({ passwordHash, passwordSalt, pinHash, pinSalt, ...item }) => ({ ...item, phone: item.phone || item.email, email: item.phone || item.email }));
}

export function updateUserProfile(userId, changes) {
  if (userId === 'nagorik-local-admin') {
    let current = {};
    try { current = JSON.parse(localStorage.getItem(ADMIN_PROFILE_KEY) || '{}'); } catch {}
    const updated = { ...current, displayName: String(changes.displayName ?? current.displayName ?? 'Nagorik Admin').trim(), address: String(changes.address ?? current.address ?? '').trim(), phone: ADMIN_PHONE, photo: changes.photo === undefined ? (current.photo || '') : changes.photo, updatedAt: new Date().toISOString() };
    localStorage.setItem(ADMIN_PROFILE_KEY, JSON.stringify(updated));
    return { id: 'nagorik-local-admin', email: ADMIN_PHONE, phone: ADMIN_PHONE, role: 'admin', pinVerified: true, ...updated };
  }
  const users = readUsers();
  const index = users.findIndex((item) => item.id === userId);
  if (index < 0) throw new Error('ব্যবহারকারী পাওয়া যায়নি।');
  const current = users[index];
  users[index] = { ...current, displayName: String(changes.displayName ?? current.displayName ?? '').trim(), address: String(changes.address ?? current.address ?? '').trim(), phone: current.phone || current.email, email: current.phone || current.email, photo: changes.photo === undefined ? (current.photo || '') : changes.photo, updatedAt: new Date().toISOString() };
  writeUsers(users);
  const { pinHash, pinSalt, ...safe } = users[index];
  return safe;
}

export function deleteRegisteredUser(userId) {
  const users = readUsers();
  const next = users.filter((item) => item.id !== userId);
  if (next.length === users.length) throw new Error('ব্যবহারকারী পাওয়া যায়নি।');
  writeUsers(next);
  return next.length;
}
