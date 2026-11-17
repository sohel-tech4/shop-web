# Nagorik Computer & e-Service — MongoDB Atlas সেটআপ

## 1) MongoDB Atlas
- Free M0 cluster চালু রাখুন।
- Database Access-এ একটি dedicated user তৈরি করুন; শুধু `nagorik` database-এ `readWrite` role দিন।
- Network Access-এ Netlify Functions-এর জন্য প্রয়োজনীয় access দিন। `0.0.0.0/0` ব্যবহার করলে তা সব IP-কে অনুমতি দেয়; শক্তিশালী database password ব্যবহার করুন এবং সম্ভব হলে পরে সীমাবদ্ধ করুন।
- Database name হবে `nagorik`; `users` ও `applications` collection API নিজে তৈরি করবে।

## 2) Netlify Environment Variables
Netlify Dashboard → Site configuration → Environment variables-এ নিচেরগুলো যোগ করুন:

- `MONGODB_URI`: Atlas থেকে পাওয়া connection URI, শেষে `/nagorik` database path থাকবে।
- `JWT_SECRET`: অন্তত 32 অক্ষরের random secret। উদাহরণ তৈরি: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
- `ADMIN_EMAIL`: আপনার অ্যাডমিন ইমেইল।
- `ADMIN_PASSWORD`: নতুন, শক্তিশালী অ্যাডমিন পাসওয়ার্ড।

সব variable-এর scope Functions/Build-এ কার্যকর রাখুন এবং Environment Variables যোগ/পরিবর্তনের পর নতুন deploy দিন। কোনো secret `VITE_` prefix দিয়ে রাখবেন না।

## 3) Local development
1. `.env.example` কপি করে `.env` করুন।
2. নিজের Atlas connection URI, JWT_SECRET, ADMIN_EMAIL ও ADMIN_PASSWORD বসান।
3. `npm install` চালান (এতে `mongodb` dependency ইনস্টল হবে)।
4. `npm run dev` দিয়ে শুধু Vite UI চলবে; Netlify Functions পরীক্ষা করতে `npx netlify dev` ব্যবহার করুন।

## 4) Authentication এবং আবেদন
- Signup/Login এখন Netlify Function দিয়ে চলে; password MongoDB-তে scrypt hash হিসেবে থাকে।
- Admin role কেবল `ADMIN_EMAIL` + `ADMIN_PASSWORD` server environment দিয়ে নির্ধারিত হয়।
- Login token 7 দিনের জন্য; ব্রাউজারের sessionStorage-এ থাকে।
- আবেদন POST, list GET, admin update PATCH API-তে token যাচাই হয়। সাধারণ ব্যবহারকারী শুধু নিজের আবেদন দেখতে পারে; admin সব আবেদন দেখতে ও status/note পরিবর্তন করতে পারে।
- পুরোনো Local Storage demo accounts/applications স্বয়ংক্রিয়ভাবে MongoDB-তে স্থানান্তর হয় না। নতুন করে account তৈরি/লগইন করুন এবং test application দিন।

## 5) নিরাপত্তা
- `.env` কখনো GitHub বা ZIP-এ দেবেন না।
- Database password, JWT_SECRET, ADMIN_PASSWORD কাউকে পাঠাবেন না।
- NID/passport number, OTP, password বা sensitive document এই প্রাথমিক request form-এ দেবেন না।
- `0.0.0.0/0` Atlas network rule ঝুঁকিপূর্ণ; database user-কে শুধু প্রয়োজনীয় database-এ সীমিত রাখুন।
