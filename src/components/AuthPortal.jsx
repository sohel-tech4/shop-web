import { useState } from 'react';
import { Globe2, LogOut, ShieldCheck, UserRound, X } from 'lucide-react';
import { signIn } from '../services/auth';

export default function AuthPortal({ onClose, onAuthenticated, user, onLogout, lang = 'bn', setLang }) {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const bn = lang === 'bn';
  const tr = (bnText, enText) => bn ? bnText : enText;
  const updatePhone = (value) => { setPhone(value); setPin(''); };
  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setError('');
    try { onAuthenticated(await signIn(phone, pin)); }
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
          {isAdmin ? <><p>{tr('অ্যাডমিন পরিচয় শনাক্ত হয়েছে।', 'Administrator access recognized.')}</p><div className="admin-tool-grid"><span>{tr('ব্যবহারকারী ব্যবস্থাপনা', 'User Management')}</span><span>{tr('সার্ভিস ব্যবস্থাপনা', 'Service Management')}</span><span>{tr('সাইট সেটিংস', 'Site Settings')}</span></div></> : <p>{tr('আপনার অ্যাকাউন্ট চালু হয়েছে।', 'Your account is active.')}</p>}
        </div>
        <button className="auth-submit" onClick={onLogout}><LogOut size={17} /> {tr('লগআউট', 'Log out')}</button>
      </> : <>
        <div className="auth-icon"><UserRound /></div>
        <p className="auth-eyebrow">NAGORIK COMPUTER & E-SERVICE</p>
        <h2>{tr('অ্যাডমিন লগইন', 'Admin Login')}</h2>
        <p className="auth-muted">{tr('শুধুমাত্র অ্যাডমিন প্রবেশ করতে পারবেন।', 'Administrator access only.')}</p>
        <form onSubmit={submit} className="auth-form">
          <label>{tr('মোবাইল নম্বর', 'Mobile number')}<input type="tel" value={phone} onChange={(event) => updatePhone(event.target.value)} placeholder="01XXXXXXXXX" required inputMode="numeric" autoComplete="tel" /></label>
          <label>{tr('৬ সংখ্যার PIN', '6-digit PIN')}<input type="password" value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="••••••" required inputMode="numeric" autoComplete="current-password" maxLength={6} /></label>
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="auth-submit" disabled={busy || pin.length !== 6}>{busy ? tr('অপেক্ষা করুন...', 'Please wait...') : tr('অ্যাডমিন লগইন', 'Admin Login')}</button>
        </form>
        <p className="auth-footnote">{tr('অ্যাডমিনের নির্ধারিত মোবাইল নম্বর ও ৬ সংখ্যার PIN ব্যবহার করুন।', 'Use the administrator phone number and 6-digit PIN.')}</p>
      </>}
    </section>
  </div>;
}
