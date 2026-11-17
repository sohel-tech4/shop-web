import { getDb, hashPassword, verifyPassword, createToken } from '../lib/auth.mjs';
const json = (statusCode, data) => ({ statusCode, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }, body: JSON.stringify(data) });
const normalizeEmail = (value) => String(value || '').trim().toLowerCase();

export async function handler(event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'Invalid request.' }); }
  const action = body.action;
  const email = normalizeEmail(body.email);
  const password = String(body.password || '');
  if (!email || !/^\S+@\S+\.\S+$/.test(email) || password.length < 8 || password.length > 128) return json(400, { error: 'সঠিক ইমেইল এবং কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড দিন।' });
  try {
    const db = await getDb();
    const users = db.collection('users');
    const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL);
    if (action === 'signup') {
      if (email === adminEmail) return json(403, { error: 'এই ইমেইলটি অ্যাডমিনের জন্য সংরক্ষিত।' });
      const displayName = String(body.displayName || '').trim().slice(0, 100);
      if (!displayName) return json(400, { error: 'আপনার নাম লিখুন।' });
      if (await users.findOne({ email })) return json(409, { error: 'এই ইমেইল দিয়ে আগে থেকেই অ্যাকাউন্ট আছে।' });
      const user = { email, displayName, role: 'user', passwordHash: await hashPassword(password), createdAt: new Date() };
      const result = await users.insertOne(user);
      user._id = result.insertedId;
      const token = createToken(user);
      return json(201, { token, user: { id: String(user._id), email, displayName, role: 'user' } });
    }
    if (action === 'signin') {
      let user = await users.findOne({ email });
      if (email === adminEmail) {
        // Admin access is controlled only by private server-side environment variables.
        if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) return json(401, { error: 'ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।' });
        if (!user) {
          const admin = { email, displayName: 'Admin', role: 'admin', passwordHash: await hashPassword(password), createdAt: new Date() };
          const inserted = await users.insertOne(admin); admin._id = inserted.insertedId; user = admin;
        } else if (user.role !== 'admin') {
          await users.updateOne({ _id: user._id }, { $set: { role: 'admin', passwordHash: await hashPassword(password) } });
          user.role = 'admin';
        }
      } else if (!user || !(await verifyPassword(password, user.passwordHash))) {
        return json(401, { error: 'ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।' });
      }
      const token = createToken(user);
      return json(200, { token, user: { id: String(user._id), email: user.email, displayName: user.displayName, role: user.role } });
    }
    return json(400, { error: 'Unknown action.' });
  } catch (error) {
    console.error('Auth API error:', error.message);
    return json(503, { error: 'সার্ভার সংযোগে সমস্যা হয়েছে। Netlify Environment Variables যাচাই করুন।' });
  }
}
