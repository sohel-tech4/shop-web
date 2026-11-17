# Nagorik Computer & e-Service — Email/Password Authentication Setup

এই সংস্করণে শুধু Firebase Email/Password Sign In, Sign Up, password reset, session restore/refresh এবং আলাদা Admin/User Dashboard রাখা হয়েছে। Google Login সম্পূর্ণ বাদ দেওয়া হয়েছে।

## 1. Localhost configuration

1. Project root-এ (যেখানে `package.json` আছে) `.env.example` কপি করে `.env` নামে রাখুন।
2. Firebase Console → Project settings → General → Your apps → Web app → Config থেকে `apiKey` কপি করুন।
3. `.env`-এ `VITE_FIREBASE_API_KEY`-এর value হিসেবে শুধু সেই key দিন।
4. `VITE_ADMIN_EMAIL=dhaka2627@gmail.com` রাখুন। এই ইমেইল দিয়ে Firebase Authentication-এ আগে account তৈরি থাকতে হবে।
5. Terminal-এ `npm install` (প্রথমবার হলে), তারপর `npm run dev` চালান। `.env` বদলালে Vite server restart করুন।

Example `.env`:

```env
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_WEB_API_KEY
VITE_ADMIN_EMAIL=dhaka2627@gmail.com
```

## 2. Firebase Sign-in provider

Firebase Console → Authentication → Sign-in method: **Email/Password** Enable করে Save করুন। Google provider প্রয়োজন নেই।

## 3. Authorized domains

Firebase Console → Authentication → Settings → Authorized domains-এ local development-এর জন্য `localhost` এবং live site-এর hostname যোগ রাখুন। শুধু hostname দিন; `https://` বা path নয়।

## 4. Admin/User Dashboard

- `dhaka2627@gmail.com` দিয়ে Sign In করলে `/admin` Admin Dashboard খুলবে।
- অন্য ইমেইল দিয়ে Sign In করলে `/dashboard` User Dashboard খুলবে।
- Admin email-এর Firebase account আগে থেকে না থাকলে Sign Up tab দিয়ে একই ইমেইল ও password ব্যবহার করে account তৈরি করুন।
- Admin email `.env`-এর `VITE_ADMIN_EMAIL` দিয়ে নিয়ন্ত্রিত।

**Security note:** এই ZIP-এ Admin Dashboard routing email match করে। এটি শুধু UI-level check, নিরাপদ server-side authorization নয়। সংবেদনশীল admin action বা database access রক্ষার জন্য Firebase Admin SDK দিয়ে custom claims এবং Firestore/Storage security rules প্রয়োজন।

## 5. Netlify deployment

Netlify Environment Variables-এ `VITE_FIREBASE_API_KEY` এবং `VITE_ADMIN_EMAIL` যোগ করে নতুন deploy দিন। Google Client ID আর প্রয়োজন নেই।

## 6. Password reset

Sign In-এ ইমেইল লিখে “পাসওয়ার্ড ভুলে গেছেন?” চাপলে Firebase password reset email পাঠাবে।

## 7. Security

- Firebase Web API key public project configuration; এটি admin password নয়।
- Service-account private key বা অন্য কোনো secret frontend/ZIP-এ রাখবেন না।
- `.env` ফাইল ZIP বা public repository-তে শেয়ার করবেন না।
