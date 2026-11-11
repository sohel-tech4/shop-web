// ================================================
// Nagorik  Computer & e-Service — EDIT THESE DETAILS
// ================================================

export const BUSINESS = {
  name: "Nagorik  Computer & e-Service",
  shortName: "Nagorik ",
  taglineBn: "আপনার বিশ্বস্ত ডিজিটাল সেবা কেন্দ্র",
  taglineEn: "Your Trusted Digital Service Center",

  // Replace these with your real contact details.
  whatsappNumber: "8801776462919",
  whatsappDisplay: "WhatsApp",
  email: "dhaka2627@gmail.com",

  facebook:
    "https://www.facebook.com/Nagorikcomputer"
};

export const getWhatsAppUrl = (serviceName = "") => {
  const message = serviceName
    ? `আসসালামু আলাইকুম, ${BUSINESS.name}। আমি "${serviceName}" সেবা সম্পর্কে জানতে চাই।`
    : `আসসালামু আলাইকুম, ${BUSINESS.name}। আমি একটি সেবা সম্পর্কে জানতে চাই।`;

  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

export const getMailUrl = (serviceName = "") => {
  const subject = serviceName
    ? `${BUSINESS.name} - ${serviceName}`
    : `${BUSINESS.name} - Service Inquiry`;

  return `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}`;
};