import { randomBytes } from 'node:crypto';
import { getDb, getUserFromToken } from '../lib/auth.mjs';
const json = (statusCode, data) => ({ statusCode, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }, body: JSON.stringify(data) });
const statuses = new Set(['pending', 'processing', 'completed', 'rejected']);
const clean = (value, max = 2000) => String(value || '').trim().slice(0, max);
const serialize = (doc) => ({ ...doc, _id: undefined, id: String(doc._id), createdAt: doc.createdAt?.toISOString?.() || doc.createdAt, updatedAt: doc.updatedAt?.toISOString?.() || doc.updatedAt });

export async function handler(event) {
  const user = await getUserFromToken(event).catch(() => null);
  if (!user) return json(401, { error: 'অনুগ্রহ করে আবার লগইন করুন।' });
  try {
    const db = await getDb();
    const collection = db.collection('applications');
    if (event.httpMethod === 'GET') {
      const filter = user.role === 'admin' ? {} : { userId: user.id };
      const docs = await collection.find(filter).sort({ createdAt: -1 }).limit(500).toArray();
      return json(200, { applications: docs.map(serialize) });
    }
    let body = {};
    if (event.body) { try { body = JSON.parse(event.body); } catch { return json(400, { error: 'Invalid request.' }); } }
    if (event.httpMethod === 'POST') {
      const name = clean(body.name, 100), phone = clean(body.phone, 30), serviceId = clean(body.serviceId, 100);
      const serviceNameBn = clean(body.serviceNameBn, 160), serviceNameEn = clean(body.serviceNameEn, 160), details = clean(body.details, 3000);
      if (!name || !phone || phone.replace(/\D/g, '').length < 10 || !serviceId || !serviceNameBn || !details) return json(400, { error: 'সঠিক নাম, মোবাইল নম্বর ও সেবার বিবরণ দিন।' });
      const now = new Date();
      const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
      let trackingId;
      for (let attempt = 0; attempt < 5; attempt++) {
        trackingId = `NG-${date}-${randomBytes(3).toString('hex').toUpperCase()}`;
        if (!(await collection.findOne({ trackingId }))) break;
      }
      const item = { trackingId, userId: user.id, userEmail: user.email, email: user.email, name, phone, serviceId, serviceNameBn, serviceNameEn, details, status: 'pending', adminNote: '', createdAt: now, updatedAt: now };
      const inserted = await collection.insertOne(item);
      item._id = inserted.insertedId;
      return json(201, { application: serialize(item) });
    }
    if (event.httpMethod === 'PATCH') {
      if (user.role !== 'admin') return json(403, { error: 'শুধু অ্যাডমিন আবেদন আপডেট করতে পারবেন।' });
      const id = clean(body.id, 100), status = clean(body.status, 30), adminNote = clean(body.adminNote, 1000);
      if (!id || !statuses.has(status)) return json(400, { error: 'Invalid update.' });
      const { ObjectId } = await import('mongodb');
      if (!ObjectId.isValid(id)) return json(400, { error: 'Invalid application ID.' });
      const result = await collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { status, adminNote, updatedAt: new Date() } }, { returnDocument: 'after' });
      if (!result) return json(404, { error: 'আবেদন পাওয়া যায়নি।' });
      return json(200, { application: serialize(result) });
    }
    return json(405, { error: 'Method not allowed' });
  } catch (error) {
    console.error('Applications API error:', error.message);
    return json(503, { error: 'ডেটাবেজে সংযোগ করা যায়নি। MongoDB সেটিংস যাচাই করুন।' });
  }
}
