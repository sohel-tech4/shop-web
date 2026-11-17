import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { ObjectId } from 'mongodb';
import { getDb } from './mongo.mjs';
const scrypt = promisify(scryptCallback);
const b64 = (value) => Buffer.from(value).toString('base64url');

export async function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const derived = await scrypt(password, salt, 64);
  return `${salt}:${Buffer.from(derived).toString('hex')}`;
}
export async function verifyPassword(password, stored) {
  const [salt, hash] = String(stored || '').split(':');
  if (!salt || !hash) return false;
  const derived = Buffer.from(await scrypt(password, salt, 64));
  const expected = Buffer.from(hash, 'hex');
  return expected.length === derived.length && timingSafeEqual(expected, derived);
}
export function createToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) throw new Error('JWT_SECRET must be configured with at least 32 characters');
  const now = Math.floor(Date.now() / 1000);
  const head = b64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = b64(JSON.stringify({ sub: String(user._id), email: user.email, role: user.role, name: user.displayName, iat: now, exp: now + 60 * 60 * 24 * 7 }));
  const signature = createHmac('sha256', secret).update(`${head}.${body}`).digest('base64url');
  return `${head}.${body}.${signature}`;
}
export function readToken(event) {
  const header = event.headers?.authorization || event.headers?.Authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return null;
  const [head, body, signature] = token.split('.');
  const secret = process.env.JWT_SECRET;
  if (!head || !body || !signature || !secret) return null;
  const expected = createHmac('sha256', secret).update(`${head}.${body}`).digest();
  let actual;
  try { actual = Buffer.from(signature, 'base64url'); } catch { return null; }
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (!payload.sub || !payload.email || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch { return null; }
}
export async function getUserFromToken(event) {
  const payload = readToken(event);
  if (!payload) return null;
  const db = await getDb();
  if (!ObjectId.isValid(payload.sub)) return null;
  const user = await db.collection('users').findOne({ _id: new ObjectId(payload.sub) }, { projection: { passwordHash: 0 } });
  if (!user || user.role !== payload.role || user.email !== payload.email) return null;
  return { id: String(user._id), email: user.email, displayName: user.displayName, role: user.role };
}
export { getDb };
