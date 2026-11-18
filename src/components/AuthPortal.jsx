import { useState } from 'react';
import { Globe2, LogOut, ShieldCheck, UserRound, X } from 'lucide-react';
import { signIn } from '../services/auth';

export default function AuthPortal({ onClose, onAuthenticated, user, onLogout, lang = 'bn', setLang }) {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinSetup, setPinSetup] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const bn = lang === 'bn';
  const tr = (bnText, enText) => bn ? bnText : enText;
  const updatePhone = (value) => {
    setPhone(value); setPin(''); setConfirmPin('');
    const clean = value.replace(/[\s-]/g, '');
    if (clean === '01776462919') { setPinSetup(false); return; }
    try {
      const users = JSON.parse(localStorage.getItem('nagorik_local_users') || '[]');
      const account = Array.isArray(users) ? users.find((item) => String(item.phone || item.email || '').replace(/[\s-]/g, '') === clean) : null;
      setPinSetup(!account?.pinHash);
    } catch { setPinSetup(true); }
  };
  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setError('');
    try { onAuthenticated(await signIn(phone, pin, confirmPin)); }
    catch (err) { setError(err?.message || tr('লগইন করা যায়নি। আবার চেষ্টা করুন।', 'Unable to sign in. Please try again.')); }
    finally { setBusy(false); }
  };
  const isAdmin = user?.role === 'admin';
  return <div className="auth-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget && !user) onClose(); }}>
    <section className="auth-panel" aria-label={tr('মোবাইল নম্বর দিয়ে প্রবেশ', 'Phone sign in')}>
      <div className="auth-panel-tools">
        <button type="button" className="auth-language-toggle" onClick={() => setLang?.((current) => current === 'bn' ? 'en' : 'bn')}><Globe2 size={16} /> {bn ? 'English' : 'বাংলা'}</button>
        <button className="auth-close" onClick={onClose} aria-label={tr('বন্ধ করুন', 'Close')}><X size={20} /></button>
      </div>
      {user ? <>
        <div className="auth-icon">{isAdmin ? <ShieldCheck /> : <UserRound />}</div>
        <p className="auth-eyebrow">NAGORIK ACCOUNT</p>
        <h2>{isAdmin ? 'Admin Dashboard' : 'User Dashboard'}</h2>
        <p className="auth-muted">{tr('স্বাগতম,', 'Welcome,')} {user.displayName || user.phone}</p>
        <div className="dashboard-summary">
          <div><span>{tr('অ্যাকাউন্ট', 'Account')}</span><strong>{isAdmin ? 'Administrator' : tr('সাধারণ ব্যবহারকারী', 'Standard User')}</strong></div>
          <div><span>{tr('মোবাইল নম্বর', 'Mobile number')}</span><strong>{user.phone}</strong></div>
          <div><span>{tr('স্ট্যাটাস', 'Status')}</span><strong className="status-active">{tr('সক্রিয়', 'Active')}</strong></div>
        </div>
        <div className="admin-tools"><h3>{isAdmin ? tr('অ্যাডমিন কন্ট্রোল', 'Admin Controls') : tr('আপনার অ্যাকাউন্ট', 'Your Account')}</h3>
          {isAdmin ? <><p>{tr('অ্যাডমিন পরিচয় শনাক্ত হয়েছে।', 'Administrator access recognized.')}</p><div className="admin-tool-grid"><span>{tr('ব্যবহারকারী ব্যবস্থাপনা', 'User Management')}</span><span>{tr('সার্ভিস ব্যবস্থাপনা', 'Service Management')}</span><span>{tr('রিভিউ ও কনটেন্ট', 'Reviews & Content')}</span><span>{tr('সাইট সেটিংস', 'Site Settings')}</span></div></> : <p>{tr('আপনার অ্যাকাউন্ট চালু হয়েছে।', 'Your account is active.')}</p>}
        </div>
        <button className="auth-submit" onClick={onLogout}><LogOut size={17} /> {tr('লগআউট', 'Log out')}</button>
      </> : <>
        <div className="auth-icon"><UserRound /></div>
        <p className="auth-eyebrow">NAGORIK COMPUTER & E-SERVICE</p>
        <h2>{tr('মোবাইল নম্বর দিয়ে প্রবেশ করুন', 'Continue with mobile number')}</h2>
        <p className="auth-muted">{tr('অ্যাকাউন্ট খুলতে বা লগইন করতে শুধু মোবাইল নম্বর দিন।', 'Enter your mobile number to create an account or sign in.')}</p>
        <form onSubmit={submit} className="auth-form">
          <label>{tr('মোবাইল নম্বর', 'Mobile number')}<input type="tel" value={phone} onChange={(event) => updatePhone(event.target.value)} placeholder="01XXXXXXXXX" required inputMode="numeric" autoComplete="tel" /></label>
          <label>{tr('৬ সংখ্যার PIN', '6-digit PIN')}<input type="password" value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="••••••" required inputMode="numeric" autoComplete="current-password" maxLength={6} /></label>
          {pinSetup && <label>{tr('PIN আবার লিখুন', 'Confirm PIN')}<input type="password" value={confirmPin} onChange={(event) => setConfirmPin(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="••••••" required inputMode="numeric" maxLength={6} /></label>}
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="auth-submit" disabled={busy || pin.length !== 6 || (pinSetup && confirmPin.length !== 6)}>{busy ? tr('অপেক্ষা করুন...', 'Please wait...') : tr('লগইন / PIN সেট করুন', 'Log in / Set PIN')}</button>
        </form>
        <p className="auth-footnote">{tr('প্রথমবার নম্বর দিলে ৬ সংখ্যার PIN সেট করে অ্যাকাউন্ট তৈরি হবে। পরবর্তীতে একই নম্বর ও PIN দিয়ে প্রবেশ করুন।', 'On first use, set a 6-digit PIN to create your account. Use the same phone and PIN next time.')}</p>
      </>}
    </section>
  </div>;
}
