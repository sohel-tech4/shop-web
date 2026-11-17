# Nagorik Computer & e-Service

## Run locally
1. Install Node.js 20 or newer.
2. Open this folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev`.

## Admin dashboard
- Open `/admin` (or click the Login button on the homepage) to open the dashboard directly.
- No Firebase, API key, email, or password is used in this no-login demo mode.
- This is intentionally public: anyone who knows the website URL can open the dashboard. Do not use it for private data or sensitive admin operations until a secure backend login is added.

## Build
Run `npm run build`.


## Demo Login / Sign Up
- Admin email: `dhaka2627@gmail.com`
- Admin password: configured in `src/services/auth.js` for this demo build.
- Other visitors can create an account with Sign Up, then log in to the User Dashboard.
- Demo accounts are stored in the current browser's localStorage; the login session uses sessionStorage. Accounts do not sync across devices or browsers.
- **Security warning:** this frontend-only demo is not production authentication. The admin credential can be discovered from the built JavaScript. Do not use it to protect private data or real admin actions. For production, connect a server-side auth/database service and enforce admin roles on the server.

## নতুন ফিচার: অনলাইন আবেদন ও Tracking

- মূল ওয়েবসাইটের Header থেকে **আবেদন / ট্র্যাকিং** খুলে নতুন সার্ভিস অনুরোধ জমা দেওয়া যায়।
- আবেদন জমা হলে `NG-YYYYMMDD-XXXX` ফরম্যাটে Tracking ID তৈরি হয়।
- Tracking ID এবং আবেদনের মোবাইল নম্বর দিয়ে আবেদনকারী স্ট্যাটাস দেখতে পারেন।
- Dashboard-এর **আমার আবেদন** বিভাগে লগইন করা গ্রাহকের ইমেইলের সঙ্গে যুক্ত আবেদন দেখা যায়।
- Admin Dashboard-এর **আবেদন ব্যবস্থাপনা** বিভাগে আবেদন খোঁজা, Pending/Processing/Completed/Rejected স্ট্যাটাস বদলানো এবং গ্রাহকের জন্য নোট সংরক্ষণ করা যায়।

### ডেটা সংরক্ষণ সংক্রান্ত গুরুত্বপূর্ণ সীমাবদ্ধতা

এই সংস্করণে আবেদনগুলো ব্রাউজারের `localStorage`-এ সংরক্ষিত হয়। তাই একই ব্রাউজার/ডিভাইসে ডেমো ও প্রাথমিক পরীক্ষা করা যাবে; অন্য গ্রাহকের ডিভাইস থেকে আবেদন সরাসরি Admin Dashboard-এ দেখা যাবে না। বাস্তব ব্যবহারের আগে Firebase Firestore/নিরাপদ API বা সার্ভার ডেটাবেস, Authentication Rules, validation, rate limiting এবং private document storage যুক্ত করতে হবে। গ্রাহকদের NID/পাসপোর্ট নম্বর, পাসওয়ার্ড বা সংবেদনশীল ডকুমেন্ট এই প্রাথমিক ফর্মে সংগ্রহ করা হয় না।

## MongoDB Atlas backend
See `MONGODB-SETUP-BN.md` for the required Netlify environment variables and deployment steps. The application now uses MongoDB through Netlify Functions; it no longer stores new applications in browser Local Storage. Do not include `.env` in deployments or public repositories.


## Routing

এই প্রজেক্টে client-side navigation-এর জন্য `react-router-dom` (BrowserRouter, useNavigate, useLocation এবং Navigate) ব্যবহার করা হয়েছে। Netlify-তে direct route refresh কাজ করাতে SPA redirect rule (`/* /index.html 200`) কনফিগার থাকতে হবে।

## সহজ ফ্রি WhatsApp ও Email নোটিফিকেশন
`SIMPLE-NOTIFICATION-SETUP-BN.md` দেখুন। আবেদন জমা দিলে WhatsApp ও Email অ্যাপে পূরণ করা বার্তা খুলবে; গ্রাহককে Send চাপতে হবে।
