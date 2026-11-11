// All service content lives here. UI components should stay focused on presentation.

export const services = [
  {
    id: "indian-visa", category: "Visa & Travel", icon: "🇮🇳",
    bn: "ইন্ডিয়ান ভিসা", en: "Indian Visa",
    descBn: "ট্যুরিস্ট ও মেডিকেল ভিসার অনলাইন আবেদন সহায়তা।",
    descEn: "Online assistance for tourist and medical visa applications.",
    touristRequirementsBn: [
      "বৈধ পাসপোর্ট (কমপক্ষে ৬ মাস মেয়াদ থাকা ভালো এবং প্রয়োজনীয় খালি পৃষ্ঠা)",
      "পাসপোর্টের বায়ো/ফটো পেজের পরিষ্কার কপি",
      "সাম্প্রতিক নির্ধারিত সাইজের ছবি, সাদা/হালকা ব্যাকগ্রাউন্ড",
      "জাতীয় পরিচয়পত্র/জন্ম নিবন্ধনের তথ্য ও ব্যক্তিগত তথ্য",
      "বর্তমান ও স্থায়ী ঠিকানার তথ্য",
      "ভ্রমণের সম্ভাব্য তারিখ, ভারতীয় পোর্ট অব এন্ট্রি ও ফেরত/অনওয়ার্ড টিকিটের তথ্য (প্রযোজ্য ক্ষেত্রে)",
      "আর্থিক সক্ষমতার/অতিরিক্ত সহায়ক কাগজপত্র (প্রযোজ্য ক্ষেত্রে)"
    ],
    touristRequirementsEn: [
      "Valid passport with sufficient validity and required blank pages",
      "Clear passport bio/photo page copy",
      "Recent prescribed-size photo with light/white background",
      "NID/Birth Registration and personal information",
      "Present and permanent address details",
      "Proposed travel date, Indian port of entry and return/onward ticket details when applicable",
      "Financial/supporting documents when applicable"
    ],
    medicalRequirementsBn: [
      "বৈধ পাসপোর্ট ও পাসপোর্টের বায়ো/ফটো পেজের পরিষ্কার কপি",
      "সাম্প্রতিক নির্ধারিত সাইজের ছবি",
      "ভারতের হাসপাতাল/চিকিৎসা প্রতিষ্ঠানের লেটারহেডে চিকিৎসা/অ্যাপয়েন্টমেন্ট বা ভর্তির চিঠি",
      "রোগীর চিকিৎসা সংক্রান্ত রিপোর্ট ও প্রেসক্রিপশন (প্রযোজ্য ক্ষেত্রে)",
      "NID/জন্ম নিবন্ধন ও ব্যক্তিগত তথ্য",
      "ভারতে চিকিৎসার সম্ভাব্য তারিখ ও হাসপাতালের তথ্য",
      "অ্যাটেনডেন্ট/সহযাত্রী থাকলে তার প্রয়োজনীয় তথ্য ও কাগজপত্র (প্রযোজ্য ক্ষেত্রে)"
    ],
    medicalRequirementsEn: [
      "Valid passport and clear passport bio/photo page copy",
      "Recent prescribed-size photo",
      "Letter from the Indian hospital/medical institution on its letterhead showing treatment/admission or tentative date",
      "Medical reports and prescriptions when applicable",
      "NID/Birth Registration and personal information",
      "Proposed treatment date and hospital details",
      "Attendant information/documents when applicable"
    ]
  },
  {
    id: "nid", category: "Government", icon: "🪪", bn: "জাতীয় পরিচয়পত্র সংক্রান্ত অনলাইন সেবা", en: "NID Online Services",
    descBn: "এনআইডি সংশোধন, ডাউনলোড, তথ্য যাচাই ও অন্যান্য অনলাইন সহায়তা।", descEn: "Online assistance for NID correction, download, verification and more.",
    requirementsBn: ["এনআইডি নম্বর/কার্ডের তথ্য", "জন্মতারিখ", "মোবাইল নম্বর", "সংশোধনের ক্ষেত্রে প্রমাণপত্র/সহায়ক কাগজপত্র"], requirementsEn: ["NID/card information", "Date of birth", "Mobile number", "Supporting documents for correction when required"]
  },
  {
    id: "birth", category: "Government", icon: "📜", bn: "জন্ম নিবন্ধন", en: "Birth Registration",
    descBn: "নতুন জন্ম নিবন্ধন, সংশোধন, পুনর্মুদ্রণ ও অনলাইন সংক্রান্ত সহায়তা।", descEn: "New birth registration, correction, reprint and online assistance.",
    requirementsBn: ["জন্মের প্রমাণপত্র—টিকার কার্ড/স্কুলের প্রত্যয়নপত্র", "পিতা-মাতার জন্মনিবন্ধন ও জাতীয় পরিচয়পত্রের ফটোকপি", "বিদ্যুৎ বিল/গ্যাস বিল/পানির বিল", "প্রয়োজনীয় ঠিকানা ও মোবাইল নম্বর"], requirementsEn: ["Proof of birth such as vaccination card/school certificate", "Copies of parents' Birth Registration and NID", "Electricity/gas/water bill", "Required address and mobile number"]
  },
  {
    id: "passport", category: "Government", icon: "🛂", bn: "ই-পাসপোর্ট আবেদন সহায়তা", en: "e-Passport Application",
    descBn: "ই-পাসপোর্ট অনলাইন আবেদন পূরণ ও আবেদন প্রক্রিয়ায় সহায়তা।", descEn: "Online e-Passport application filling and process assistance.",
    requirementsBn: ["জাতীয় পরিচয়পত্র (প্রাপ্তবয়স্ক) / জন্মনিবন্ধন সনদ (অপ্রাপ্তবয়স্ক)", "পিতা ও মাতার জাতীয় পরিচয়পত্রের ফটোকপি", "স্বামী/স্ত্রীর জাতীয় পরিচয়পত্রের ফটোকপি (প্রযোজ্য ক্ষেত্রে)", "ম্যারিজ সার্টিফিকেট/কাবিননামার ফটোকপি (প্রযোজ্য ক্ষেত্রে)", "বিদ্যুৎ বিল/গ্যাস বিল/পানির বিল", "ইউনিয়ন পরিষদ বা সিটি কর্পোরেশন সনদ (ঐচ্ছিক)", "স্কুল/কলেজ আইডি কার্ড (ছাত্র/ছাত্রীদের ক্ষেত্রে)", "অফিস আইডি কার্ড (চাকরিজীবীদের ক্ষেত্রে)", "ট্রেড লাইসেন্স (ব্যবসায়ীদের ক্ষেত্রে)", "অতিরিক্ত কাগজপত্র—যদি প্রযোজ্য হয়"], requirementsEn: ["NID for adults / Birth Registration for minors", "Copies of father's and mother's NID", "Spouse's NID copy when applicable", "Marriage certificate/Kabin Nama copy when applicable", "Electricity/gas/water bill", "Union Parishad/City Corporation certificate if applicable", "School/college ID for students", "Office ID for employees", "Trade license for business owners", "Additional documents when applicable"]
  },
  {
    id: "pcc", category: "Government", icon: "👮", bn: "Police Clearance", en: "Police Clearance",
    descBn: "Police Clearance আবেদন পূরণ ও অনলাইন প্রক্রিয়ায় সহায়তা।", descEn: "Police Clearance application and online process assistance.",
    requirementsBn: ["পাসপোর্টের তথ্য/কপি", "NID/জন্ম নিবন্ধন", "বর্তমান ও স্থায়ী ঠিকানার তথ্য", "প্রয়োজনীয় ছবি ও সহায়ক কাগজপত্র"], requirementsEn: ["Passport information/copy", "NID/Birth Registration", "Present and permanent address", "Required photo and supporting documents"]
  },
  {
    id: "etin", category: "Tax & Land", icon: "🧾", bn: "e-TIN", en: "e-TIN",
    descBn: "e-TIN নিবন্ধন ও সংশ্লিষ্ট অনলাইন সহায়তা।", descEn: "e-TIN registration and related online assistance.",
    requirementsBn: ["NID", "জন্মতারিখ", "মোবাইল নম্বর", "ঠিকানা ও প্রয়োজনীয় ব্যক্তিগত তথ্য"], requirementsEn: ["NID", "Date of birth", "Mobile number", "Address and required personal information"]
  },
  {
    id: "bmet-training", category: "Education & Jobs", icon: "🧑‍🏭", bn: "BMET ট্রেনিং সেবা", en: "BMET Training Service",
    descBn: "BMET/TTC-ভিত্তিক দক্ষতা উন্নয়ন ও বিদেশগামী কর্মীদের প্রয়োজনীয় প্রশিক্ষণ/অনলাইন সহায়তা সম্পর্কে দিকনির্দেশনা।", descEn: "Guidance and online assistance for BMET/TTC skill development and training for overseas workers.",
    requirementsBn: ["NID/পাসপোর্টের তথ্য (প্রযোজ্য ক্ষেত্রে)", "শিক্ষাগত যোগ্যতার তথ্য", "মোবাইল নম্বর", "পছন্দের ট্রেড/কোর্স—যেমন Computer Operation, Graphics Design, AutoCAD, Electrical, Welding, Language বা Pre-departure Training (কেন্দ্রভেদে ভিন্ন হতে পারে)", "কোর্স/সিট/যোগ্যতা সম্পর্কে সর্বশেষ তথ্য যাচাই করে আবেদন করা হবে"], requirementsEn: ["NID/passport information when applicable", "Educational qualification details", "Mobile number", "Preferred trade/course such as Computer Operation, Graphics Design, AutoCAD, Electrical, Welding, Language or Pre-departure Training (availability varies by center)", "Latest eligibility, seat and course information should be verified before application"]
  },
  {
    id: "ai-services", category: "AI & Design", icon: "✨", bn: "AI ভিত্তিক ডিজিটাল সেবা", en: "AI-Powered Digital Services",
    descBn: "AI ব্যবহার করে লেখা, কনটেন্ট, ছবি এডিটিং, আইডিয়া, অনুবাদ ও দৈনন্দিন ডিজিটাল কাজে সহায়তা।", descEn: "AI-assisted writing, content, image editing, ideas, translation and everyday digital tasks.",
    requirementsBn: ["কাজের বিস্তারিত প্রয়োজন/নির্দেশনা", "প্রয়োজনীয় লেখা, ছবি বা ডকুমেন্ট", "কাঙ্ক্ষিত ভাষা ও ফরম্যাট", "AI দিয়ে কনটেন্ট/ক্যাপশন, প্রোডাক্ট বর্ণনা, অনুবাদ, সারাংশ, আইডিয়া, ছবি এডিটিং নির্দেশনা ও অন্যান্য উপযুক্ত ডিজিটাল কাজে সহায়তা নেওয়া যাবে"],
    requirementsEn: ["Task details/instructions", "Required text, images or documents", "Preferred language and format", "AI assistance may be used for content/captions, product descriptions, translation, summaries, ideas, image-editing instructions and other suitable digital tasks"]
  },
  {
    id: "social-poster", category: "AI & Design", icon: "🎨", bn: "সোশ্যাল মিডিয়া প্রোডাক্ট পোস্টার ডিজাইন", en: "Social Media Product Poster Design",
    descBn: "Facebook, Instagram ও WhatsApp-এর জন্য প্রফেশনাল প্রোডাক্ট পোস্টার/প্রমোশনাল ডিজাইন তৈরি।", descEn: "Professional product posters and promotional creatives for Facebook, Instagram and WhatsApp.",
    requirementsBn: ["প্রোডাক্টের পরিষ্কার ছবি", "প্রোডাক্টের নাম, দাম ও অফারের তথ্য", "দোকান/ব্র্যান্ডের নাম ও লোগো (যদি থাকে)", "মোবাইল নম্বর, Facebook Page বা অন্যান্য যোগাযোগের তথ্য", "পছন্দের রঙ/ডিজাইনের নমুনা (যদি থাকে)", "পোস্টারের প্রয়োজনীয় সাইজ/প্ল্যাটফর্ম—Facebook, Instagram, WhatsApp ইত্যাদি"],
    requirementsEn: ["Clear product photos", "Product name, price and offer details", "Shop/brand name and logo if available", "Phone number, Facebook Page or other contact details", "Preferred colors/design reference if available", "Required size/platform such as Facebook, Instagram or WhatsApp"]
  },
  {
    id: "land-tax",
    category: "Tax & Land",
    icon: "🌾",
  
    bn: "ভূমি সেবা",
    en: "Land Service",
  
    descBn: "জমির খাজনা, ভূমি উন্নয়ন কর, নামজারি এবং খতিয়ান/পর্চা সংক্রান্ত অনলাইন সহায়তা।",
    descEn: "Online assistance with land development tax, mutation, and khatian/land records.",
  
    requirementsBn: [],
    requirementsEn: [],
  
    // 1. ভূমি উন্নয়ন কর / খাজনা
    landtaxRequirementsBn: [
      "জমির মালিকের জাতীয় পরিচয়পত্রের তথ্য",
      "জমির মালিকের নাম ও প্রয়োজনীয় ব্যক্তিগত তথ্য",
      "জমির মৌজার নাম",
      "খতিয়ান নম্বর, যদি জানা থাকে",
      "দাগ নম্বর, যদি জানা থাকে",
      "জমির পরিমাণ ও অবস্থানের তথ্য",
      "পূর্ববর্তী ভূমি উন্নয়ন করের দাখিলা বা রসিদ, যদি থাকে",
      "প্রযোজ্য ক্ষেত্রে জমির মালিকানা সংক্রান্ত দলিল বা অন্যান্য কাগজপত্র"
    ],
  
    landtaxRequirementsEn: [
      "Landowner's National ID information",
      "Landowner's name and relevant personal details",
      "Mouza name",
      "Khatian number, if available",
      "Plot (Dag) number, if available",
      "Land area and location details",
      "Previous land development tax receipt, if available",
      "Ownership deed or other relevant documents, where applicable"
    ],
  
    // 2. নামজারি / মিউটেশন
    landNamjariRequirementsBn: [
      "আবেদনকারীর জাতীয় পরিচয়পত্রের তথ্য",
      "জমির মালিকানা হস্তান্তর বা মালিকানা অর্জনের প্রমাণপত্র",
      "সংশ্লিষ্ট জমির দলিলের কপি, প্রযোজ্য ক্ষেত্রে",
      "সর্বশেষ খতিয়ান বা সংশ্লিষ্ট ভূমি রেকর্ড",
      "মৌজার নাম, খতিয়ান নম্বর ও দাগ নম্বর",
      "প্রযোজ্য ক্ষেত্রে পূর্ববর্তী নামজারি খতিয়ান",
      "ওয়ারিশ সূত্রে জমি পেলে ওয়ারিশ সনদ ও প্রয়োজনীয় উত্তরাধিকারসংক্রান্ত কাগজপত্র",
      "প্রযোজ্য ক্ষেত্রে ভূমি উন্নয়ন কর পরিশোধের দাখিলা",
      "আবেদন অনুযায়ী অতিরিক্ত প্রয়োজনীয় কাগজপত্র"
    ],
  
    landNamjariRequirementsEn: [
      "Applicant's National ID information",
      "Proof of land ownership or ownership transfer",
      "Copy of the relevant land deed, where applicable",
      "Latest khatian or relevant land records",
      "Mouza name, khatian number, and plot (Dag) number",
      "Previous mutation khatian, where applicable",
      "Inheritance certificate and relevant succession documents for inherited land",
      "Land development tax receipt, where applicable",
      "Additional documents required for the specific application"
    ],
  
    // 3. খতিয়ান / পর্চা
    landkhatianRequirementsBn: [
      "আবেদনকারীর নাম ও প্রয়োজনীয় পরিচয়সংক্রান্ত তথ্য",
      "জমির মৌজার নাম",
      "জেলা ও উপজেলা/থানার তথ্য",
      "খতিয়ান নম্বর, যদি জানা থাকে",
      "দাগ নম্বর, যদি জানা থাকে",
      "জরিপের ধরন, যেমন CS, SA, RS, BS/BRS—যেটি প্রযোজ্য",
      "জমির মালিকের নাম বা পূর্ববর্তী মালিকের তথ্য, যদি প্রয়োজন হয়",
      "খতিয়ান বা দাগ নম্বর জানা না থাকলে জমি শনাক্ত করার জন্য প্রাসঙ্গিক তথ্য"
    ],
  
    landkhatianRequirementsEn: [
      "Applicant's name and relevant identification details",
      "Mouza name",
      "District and Upazila/Thana details",
      "Khatian number, if available",
      "Plot (Dag) number, if available",
      "Applicable survey type, such as CS, SA, RS, or BS/BRS",
      "Landowner's or previous owner's name, if required",
      "Relevant information to identify the land if the khatian or plot number is unknown"
    ]
  },
  {
    id: "jobs", category: "Education & Jobs", icon: "💼", bn: "সকল চাকরির আবেদন", en: "Job Applications",
    descBn: "সরকারি ও বেসরকারি চাকরির অনলাইন আবেদন সহায়তা।", descEn: "Online application assistance for government and private jobs.",
    requirementsBn: ["NID/জন্ম নিবন্ধন", "শিক্ষাগত যোগ্যতার তথ্য", "ছবি ও স্বাক্ষর", "CV/প্রয়োজনীয় কাগজপত্র"], requirementsEn: ["NID/Birth Registration", "Educational qualification details", "Photo and signature", "CV/required documents"]
  },
  {
    id: "admission", category: "Education & Jobs", icon: "🎓", bn: "স্কুল/কলেজ/বিশ্ববিদ্যালয় ভর্তি", en: "School/College/University Admission",
    descBn: "শিক্ষাপ্রতিষ্ঠানে অনলাইন ভর্তি আবেদন ও ফর্ম পূরণ।", descEn: "Online admission applications and form filling.",
    requirementsBn: ["শিক্ষার্থীর তথ্য", "রোল/রেজিস্ট্রেশন (যদি থাকে)", "ছবি", "অভিভাবকের তথ্য ও প্রয়োজনীয় সনদ"], requirementsEn: ["Student information", "Roll/registration if applicable", "Photo", "Guardian information and required certificates"]
  },
  {
    id: "photo", category: "Print & Media", icon: "📸", bn: "ছবি তোলা ও ছবি থেকে ছবি", en: "Photo & Photo Copy",
    descBn: "পাসপোর্ট ছবি, আইডি ছবি, ছবি তোলা ও ছবি থেকে ছবি তৈরির সেবা।", descEn: "Passport/ID photos, photo capture and photo-to-photo services.",
    requirementsBn: ["ব্যক্তিগত উপস্থিতি অথবা পরিষ্কার ছবি", "প্রয়োজনীয় ছবির সাইজ ও সংখ্যা"], requirementsEn: ["Personal presence or a clear photo", "Required photo size and quantity"]
  },
  {
    id: "desco", category: "Utility", icon: "💡", bn: "DESCO সংক্রান্ত সেবা", en: "DESCO Services",
    descBn: "DESCO বিল/অনলাইন সংক্রান্ত প্রয়োজনীয় সহায়তা।", descEn: "Assistance with DESCO bill and online services.",
    requirementsBn: ["গ্রাহক নম্বর/অ্যাকাউন্ট তথ্য", "মিটার/বিলের তথ্য", "প্রয়োজন অনুযায়ী মোবাইল নম্বর"], requirementsEn: ["Customer/account information", "Meter/bill details", "Mobile number when required"]
  },
  {
    id: "cv", category: "Print & Media", icon: "📄", bn: "CV / Resume তৈরি", en: "CV / Resume",
    descBn: "চাকরির জন্য আধুনিক ও প্রফেশনাল CV/Resume তৈরি।", descEn: "Modern and professional CV/Resume preparation.",
    requirementsBn: ["ব্যক্তিগত তথ্য", "শিক্ষাগত যোগ্যতা", "কাজের অভিজ্ঞতা", "দক্ষতা ও ছবি"], requirementsEn: ["Personal information", "Education", "Work experience", "Skills and photo"]
  },
  {
    id: "print", category: "Print & Media", icon: "🖨️", bn: "সাদা-কালো ও রঙিন প্রিন্ট", en: "Black & White / Color Print",
    descBn: "ডকুমেন্ট, ছবি ও বিভিন্ন ফাইলের সাদা-কালো ও রঙিন প্রিন্ট।", descEn: "Black & white and color printing for documents, photos and files.",
    requirementsBn: ["প্রিন্ট করার ফাইল", "প্রয়োজনীয় কপি সংখ্যা", "সাইজ/পেপার নির্দেশনা (যদি থাকে)"], requirementsEn: ["File to print", "Number of copies", "Size/paper instructions if needed"]
  },
  {
    id: "scan-email", category: "Print & Media", icon: "📧", bn: "স্ক্যান ও ই-মেইল", en: "Scan & Email",
    descBn: "ডকুমেন্ট স্ক্যান করে ই-মেইলে পাঠানোর সুবিধা।", descEn: "Document scanning and email sending service.",
    requirementsBn: ["মূল ডকুমেন্ট", "প্রাপকের সঠিক ই-মেইল ঠিকানা"], requirementsEn: ["Original document", "Correct recipient email address"]
  },
  {
    id: "compose", category: "Computer", icon: "⌨️", bn: "বাংলা ও ইংরেজি কম্পোজ", en: "Bangla & English Typing",
    descBn: "বাংলা ও ইংরেজি টাইপিং, আবেদন ও ডকুমেন্ট কম্পোজ।", descEn: "Bangla and English typing, applications and document composition.",
    requirementsBn: ["লিখিত/ডিজিটাল কনটেন্ট", "নির্দেশনা বা নমুনা", "প্রয়োজনীয় ফরম্যাট"], requirementsEn: ["Written/digital content", "Instructions or sample", "Required format"]
  },
  {
    id: "pdf", category: "Computer", icon: "📑", bn: "PDF তৈরি / এডিট", en: "PDF Create / Edit",
    descBn: "PDF তৈরি, মার্জ, পেজ সাজানো ও প্রয়োজনীয় এডিটিং।", descEn: "PDF creation, merging, page arrangement and basic editing.",
    requirementsBn: ["মূল ফাইল/ছবি/ডকুমেন্ট", "কী পরিবর্তন করতে হবে তার নির্দেশনা"], requirementsEn: ["Original files/photos/documents", "Instructions about required changes"]
  },
  {
    id: "file-copy", category: "Computer", icon: "💾", bn: "পেনড্রাইভ / মেমোরি কার্ডে ফাইল কপি", en: "File Copy to Pen Drive / Memory Card",
    descBn: "ফাইল, ছবি, ভিডিও ও ডকুমেন্ট কপি/ট্রান্সফার।", descEn: "File, photo, video and document copy/transfer.",
    requirementsBn: ["পেনড্রাইভ/মেমোরি কার্ড", "কপি করার ফাইল বা উৎস ডিভাইস"], requirementsEn: ["Pen drive/memory card", "Files or source device"]
  },
  {
    id: "computer-training", category: "Computer", icon: "🎓", bn: "কম্পিউটার ট্রেনিং", en: "Computer Training",
    descBn: "বেসিক কম্পিউটার থেকে গ্রাফিক্স ডিজাইন, অফিস কাজ ও দৈনন্দিন ডিজিটাল সেবা—প্র্যাকটিক্যালভাবে শেখানো হবে।", descEn: "Practical training from basic computer skills to graphics design, office work and everyday digital services.",
    requirementsBn: ["শিক্ষার্থীর নাম ও মোবাইল নম্বর", "কম্পিউটার শেখার বর্তমান স্তর", "প্রশিক্ষণের আগ্রহের বিষয়", "গ্রাফিক্স, MS Office, বাংলা/ইংরেজি টাইপিং, অনলাইন আবেদন, PDF, CV, ছবি এডিটিং, প্রিন্ট/স্ক্যানসহ প্রয়োজনীয় কাজ শেখানো হবে"], requirementsEn: ["Name and mobile number", "Current computer skill level", "Preferred training topics", "Graphics, MS Office, Bangla/English typing, online applications, PDF, CV, photo editing, printing/scanning and other practical tasks"]
  }

,
  {
    id: "photocopy", category: "Print & Media", icon: "📄",
    bn: "ফটোকপি", en: "Photocopy",
    descBn: "প্রয়োজনীয় ডকুমেন্টের সাদা-কালো ও রঙিন ফটোকপি।", descEn: "Black-and-white and color photocopying for documents.",
    requirementsBn: ["ফটোকপি করার মূল কাগজ বা পরিষ্কার ফাইল", "প্রয়োজনীয় কপির সংখ্যা"], requirementsEn: ["Original document or clear file", "Required number of copies"]
  },
  {
    id: "photo-print", category: "Print & Media", icon: "🖼️",
    bn: "ছবি প্রিন্ট", en: "Photo Printing",
    descBn: "বিভিন্ন সাইজে মানসম্মত ছবি প্রিন্ট।", descEn: "Quality photo printing in different sizes.",
    requirementsBn: ["প্রিন্টের জন্য ডিজিটাল ছবি", "ছবির সাইজ ও কপির সংখ্যা"], requirementsEn: ["Digital photo file", "Required photo size and number of copies"]
  },
  {
    id: "driving-license", category: "Government", icon: "🚗",
    bn: "ড্রাইভিং লাইসেন্স", en: "Driving Licence",
    descBn: "লার্নার ও ড্রাইভিং লাইসেন্স-সংক্রান্ত অনলাইন আবেদন সহায়তা।", descEn: "Online assistance for learner and driving licence applications.",
    requirementsBn: ["জাতীয় পরিচয়পত্র", "মোবাইল নম্বর", "প্রয়োজনীয় ছবি ও ঠিকানার তথ্য", "প্রযোজ্য ক্ষেত্রে মেডিকেল সার্টিফিকেট ও অন্যান্য কাগজপত্র"], requirementsEn: ["National ID", "Mobile number", "Required photo and address details", "Medical certificate and other documents where applicable"]
  },
  {
    id: "deed-writing", category: "Computer", icon: "📝",
    bn: "যাবতীয় দলিল ও চুক্তিপত্র লেখা", en: "Deed & Agreement Typing",
    descBn: "বিভিন্ন দলিল, চুক্তিপত্র ও আবেদনপত্র কম্পোজ ও ফরম্যাটিং।", descEn: "Typing and formatting deeds, agreements and applications.",
    requirementsBn: ["মূল তথ্য ও খসড়া/নমুনা", "সংশ্লিষ্ট ব্যক্তি ও সম্পত্তির সঠিক তথ্য", "প্রয়োজনীয় কাগজপত্র"], requirementsEn: ["Source details and draft/sample", "Accurate details of relevant people and property", "Supporting documents"]
  },
  {
    id: "writing", category: "Computer", icon: "✍️",
    bn: "প্রশ্নপত্রসহ যাবতীয় লেখালেখি", en: "Question Papers & General Writing",
    descBn: "প্রশ্নপত্র, দরখাস্ত, আবেদন, নোটিশ ও অন্যান্য লেখালেখি কম্পোজ।", descEn: "Typing and formatting question papers, applications, notices and other documents.",
    requirementsBn: ["লেখার বিষয়বস্তু বা নির্দেশনা", "প্রয়োজনীয় ফরম্যাট ও পৃষ্ঠা সংখ্যা"], requirementsEn: ["Content or instructions", "Required format and page count"]
  },
  {
    id: "laminating-spiral", category: "Print & Media", icon: "📚",
    bn: "লেমিনেটিং / স্পাইরাল", en: "Lamination / Spiral Binding",
    descBn: "ডকুমেন্ট, সার্টিফিকেট ও প্রজেক্টের লেমিনেটিং এবং স্পাইরাল বাইন্ডিং।", descEn: "Lamination and spiral binding for documents, certificates and projects.",
    requirementsBn: ["লেমিনেট/বাইন্ডিং করার কাগজ বা ডকুমেন্ট", "প্রয়োজনীয় সাইজ ও কপি সংখ্যা"], requirementsEn: ["Documents or pages to laminate/bind", "Required size and number of copies"]
  }
];
