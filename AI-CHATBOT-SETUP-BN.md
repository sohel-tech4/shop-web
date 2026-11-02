# NextGen e-Service Center — Gemini AI Chatbot Setup (বাংলা)

এই সংস্করণে সাইটের বিদ্যমান বাংলা/ইংরেজি চ্যাটবটের ডিজাইন অপরিবর্তিত রেখে OpenAI API-এর বদলে Google Gemini API ব্যবহার করা হয়েছে। API key শুধু Netlify serverless function-এ থাকবে; ব্রাউজারের কোডে নয়।

## কী পরিবর্তন হয়েছে

- `netlify/functions/chat.mjs` — এখন Google Gemini `generateContent` API ব্যবহার করে।
- ডিফল্ট মডেল `gemini-2.5-flash`; চাইলে Netlify environment variable `GEMINI_MODEL` দিয়ে পরিবর্তন করা যায়, যদি আপনার API key/project-এ সেই মডেল উপলব্ধ থাকে।
- বিদ্যমান `src/services.js` থেকে সার্ভিসের নাম, বিবরণ ও কাগজপত্রের তথ্য নেওয়া হয়।
- চ্যাট উইজেট, বাংলা/ইংরেজি UI, সাইটের অন্য সেকশন ও ডিজাইন অপরিবর্তিত রাখা হয়েছে।

## Google Gemini API ফ্রি টিয়ার চালু করার নিয়ম

1. Google AI Studio খুলুন: https://aistudio.google.com/apikey
2. Google অ্যাকাউন্ট দিয়ে লগইন করে API key তৈরি করুন।
3. Netlify Dashboard → আপনার সাইট → **Site configuration / Project configuration → Environment variables** খুলুন।
4. এই variable যোগ করুন:

   - **Key:** `GEMINI_API_KEY`
   - **Value:** Google AI Studio থেকে তৈরি করা API key

5. ঐচ্ছিকভাবে `GEMINI_MODEL` নামে variable যোগ করতে পারেন। না দিলে `gemini-2.5-flash` ব্যবহৃত হবে।
6. Netlify-তে **নতুন deploy** করুন। Environment variable যোগ/পরিবর্তনের পর redeploy জরুরি।
7. লাইভ সাইটে চ্যাট খুলে বাংলা ও ইংরেজিতে প্রশ্ন করে পরীক্ষা করুন।

## লোকাল টেস্ট

Node.js 20+ ব্যবহার করে প্রজেক্টের মূল ফোল্ডারে `.env` ফাইল তৈরি করুন:

```env
GEMINI_API_KEY=your_google_ai_studio_api_key
GEMINI_MODEL=gemini-2.5-flash
```

`.env` ফাইল GitHub-এ আপলোড করবেন না। এরপর চালান:

```bash
npm install
npx netlify dev
```

শুধু `npm run dev` চালালে Netlify Function চলবে না।

## ফ্রি টিয়ারের সীমাবদ্ধতা

- Gemini API-এর ফ্রি টিয়ার সব মডেল ও সব অঞ্চলে একই সীমা দেয় না; rate limit/কোটা শেষ হলে কিছুক্ষণ অপেক্ষা করে আবার চেষ্টা করুন। বর্তমান শর্ত দেখুন: https://ai.google.dev/gemini-api/docs/pricing এবং https://ai.google.dev/gemini-api/docs/rate-limits
- ফ্রি টিয়ারের ব্যবহার পরিবর্তনশীল এবং এটি সীমাহীন/নিশ্চিত স্থায়ী ফ্রি সেবা নয়। Google-এর নীতিতে ফ্রি-টিয়ারের কনটেন্ট পণ্য উন্নয়নে ব্যবহৃত হতে পারে; সংবেদনশীল গ্রাহক তথ্য পাঠাবেন না।
- API key কখনো `VITE_...` নামে বা `src`-এর মধ্যে রাখবেন না। শুধুমাত্র Netlify environment variable ব্যবহার করুন।
- ভিসা, সরকারি সেবা, ফি ও কাগজপত্রের সর্বশেষ শর্ত সংশ্লিষ্ট সরকারি কর্তৃপক্ষ থেকে যাচাই করতে হবে।
- এই পরিবর্তনটি ফাইলের স্তরে করা হয়েছে; এখানে আপনার Google API key বা Netlify অ্যাকাউন্টে প্রবেশাধিকার নেই, তাই লাইভ API সংযোগ পরীক্ষা করা হয়নি।
