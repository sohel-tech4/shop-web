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
