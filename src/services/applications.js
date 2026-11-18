const APPLICATIONS_KEY = 'nagorik_local_applications';
export const APPLICATION_STATUSES = ['pending', 'processing', 'completed', 'rejected'];

const readAll = () => {
  try {
    const value = JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};
const writeAll = (items) => localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(items));
const makeId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const makeTrackingId = () => `NG-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export async function readApplications() {
  return readAll().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function createApplication(data) {
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('nagorik_auth_user') || 'null'); }
    catch { return null; }
  })();
  if (!(user?.phone || user?.email)) throw new Error('আবেদন জমা দিতে প্রথমে লগইন করুন।');
  const item = {
    id: makeId(),
    trackingId: makeTrackingId(),
    userId: user.id,
    userEmail: user.phone || user.email,
    email: user.phone || user.email,
    name: String(data.name || '').trim(),
    phone: String(data.phone || '').trim(),
    serviceId: data.serviceId,
    serviceNameBn: data.serviceNameBn || '',
    serviceNameEn: data.serviceNameEn || '',
    details: String(data.details || '').trim(),
    status: 'pending',
    adminNote: '',
    createdAt: new Date().toISOString(),
  };
  const items = readAll();
  items.unshift(item);
  writeAll(items);
  return item;
}

export async function updateApplication(id, changes) {
  const items = readAll();
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) throw new Error('আবেদনটি পাওয়া যায়নি।');
  const next = { ...items[index], ...changes, id: items[index].id };
  if (!APPLICATION_STATUSES.includes(next.status)) throw new Error('আবেদনের অবস্থা সঠিক নয়।');
  items[index] = next;
  writeAll(items);
  return next;
}

export async function deleteApplication(id) {
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('nagorik_auth_user') || 'null'); }
    catch { return null; }
  })();
  if (!user) throw new Error('আবেদন মুছতে প্রথমে লগইন করুন।');
  const items = readAll();
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) throw new Error('আবেদনটি পাওয়া যায়নি।');
  const item = items[index];
  const isOwner = (user.id && item.userId && String(user.id) === String(item.userId)) ||
    (user.phone && String(item.phone || '').replace(/\D/g, '') === String(user.phone).replace(/\D/g, ''));
  if (!isOwner) throw new Error('শুধু নিজের আবেদন মুছতে পারবেন।');
  items.splice(index, 1);
  writeAll(items);
  return true;
}

export const statusLabel = (status, bn = true) => ({
  pending: bn ? 'অপেক্ষমাণ' : 'Pending',
  processing: bn ? 'কাজ চলছে' : 'Processing',
  completed: bn ? 'সম্পন্ন' : 'Completed',
  rejected: bn ? 'বাতিল' : 'Rejected',
}[status] || status);
