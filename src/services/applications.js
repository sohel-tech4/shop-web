const STORAGE_KEY = "nagorik_service_applications_v1";

export const APPLICATION_STATUSES = ["pending", "processing", "completed", "rejected"];
export const readApplications = () => {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch { return []; }
};
export const writeApplications = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("nagorik:applications-updated"));
};
export const createApplication = (data) => {
  const now = new Date();
  const date = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,"0")}${String(now.getDate()).padStart(2,"0")}`;
  const trackingId = `NG-${date}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  const item = { ...data, id: trackingId, trackingId, status: "pending", createdAt: now.toISOString(), updatedAt: now.toISOString(), adminNote: "" };
  writeApplications([item, ...readApplications()]);
  return item;
};
export const updateApplication = (id, changes) => writeApplications(readApplications().map((item) => item.id === id ? { ...item, ...changes, updatedAt: new Date().toISOString() } : item));
export const statusLabel = (status, bn = true) => ({
  pending: bn ? "অপেক্ষমাণ" : "Pending",
  processing: bn ? "কাজ চলছে" : "Processing",
  completed: bn ? "সম্পন্ন" : "Completed",
  rejected: bn ? "বাতিল" : "Rejected",
}[status] || status);
