import {
  Briefcase,
  BriefcaseBusiness,
  Camera,
  CreditCard,
  FileCheck2,
  FilePenLine,
  FileText,
  FileUser,
  GraduationCap,
  HardDriveDownload,
  Languages,
  Lightbulb,
  Palette,
  Plane,
  Printer,
  ReceiptText,
  ScanLine,
  Shield,
  Sparkles,
  Stethoscope,
} from "lucide-react";

export const serviceIcons = {
  "indian-visa": Plane,
  nid: CreditCard,
  birth: FileCheck2,
  passport: FileCheck2,
  pcc: Shield,
  etin: ReceiptText,
  "land-tax": ReceiptText,
  jobs: BriefcaseBusiness,
  admission: GraduationCap,
  photo: Camera,
  desco: Lightbulb,
  cv: FileUser,
  print: Printer,
  "scan-email": ScanLine,
  compose: Languages,
  pdf: FilePenLine,
  "file-copy": HardDriveDownload,
  "computer-training": GraduationCap,
  "bmet-training": Briefcase,
  "ai-services": Sparkles,
  "social-poster": Palette,
};

export const heroIcons = [Plane, CreditCard, FileCheck2, Stethoscope, Printer, ScanLine, Palette, Sparkles, Briefcase, GraduationCap, ReceiptText, Camera];

export const categories = [
  { key: "All", bn: "সব সেবা", en: "All Services" },
  { key: "Government", bn: "সরকারি সেবা", en: "Government" },
  { key: "Visa & Travel", bn: "ভিসা ও ভ্রমণ", en: "Visa & Travel" },
  { key: "Tax & Land", bn: "ট্যাক্স ও ভূমি", en: "Tax & Land" },
  { key: "Education & Jobs", bn: "শিক্ষা ও চাকরি", en: "Education & Jobs" },
  { key: "Print & Media", bn: "প্রিন্ট ও মিডিয়া", en: "Print & Media" },
  { key: "Utility", bn: "ইউটিলিটি", en: "Utility" },
  { key: "Computer", bn: "কম্পিউটার", en: "Computer" },
  { key: "AI & Design", bn: "এআই ও ডিজাইন", en: "AI & Design" },
];

export const fallbackServiceIcon = FileText;
