import { useState } from 'react';
import { Eye, EyeOff, LogOut, ShieldCheck, UserRound, X } from 'lucide-react';
import { signIn, signUp } from '../services/auth';

const ADMIN_EMAIL = 'dhaka2627@gmail.com';

export default function AuthPortal({ onClose, onAuthenticated, user, onLogout }) {
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const result = mode === 'signup'
        ? await signUp(email, password, name)
        : await signIn(email, password);
      onAuthenticated(result);
    } catch (err) {
      setError(err?.message || 'লগইন করা যায়নি। আবার চেষ্টা করুন।');
    } finally {
      setBusy(false);
    }
  };

  const isAdmin = Boolean(user && ADMIN_EMAIL && user.email?.toLowerCase() === ADMIN_EMAIL);

  return (
    <div className="auth-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget && !user) onClose(); }}>
      <section className="auth-panel" aria-label="Account authentication">
        <button className="auth-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        {user ? (
          <>
            <div className="auth-icon">{isAdmin ? <ShieldCheck /> : <UserRound />}</div>
            <p className="auth-eyebrow">NAGORIK ACCOUNT</p>
            <h2>{isAdmin ? 'Admin Dashboard' : 'User Dashboard'}</h2>
            <p className="auth-muted">স্বাগতম, {user.displayName || user.email}</p>
            <div className="dashboard-summary">
              <div><span>অ্যাকাউন্ট</span><strong>{isAdmin ? 'Administrator' : 'সাধারণ ব্যবহারকারী'}</strong></div>
              <div><span>ইমেইল</span><strong>{user.email}</strong></div>
              <div><span>স্ট্যাটাস</span><strong className="status-active">সক্রিয়</strong></div>
            </div>
            <div className="admin-tools">
              <h3>{isAdmin ? 'অ্যাডমিন কন্ট্রোল' : 'আপনার অ্যাকাউন্ট'}</h3>
              {isAdmin ? <><p>ওয়েবসাইট পরিচালনার অ্যাডমিন পরিচয় শনাক্ত হয়েছে।</p><div className="admin-tool-grid"><span>ব্যবহারকারী ব্যবস্থাপনা</span><span>সার্ভিস ব্যবস্থাপনা</span><span>রিভিউ ও কনটেন্ট</span><span>সাইট সেটিংস</span></div></> : <p>আপনার অ্যাকাউন্ট সফলভাবে চালু হয়েছে।</p>}
            </div>
            <button className="auth-submit" onClick={onLogout}><LogOut size={17} /> লগআউট</button>
          </>
        ) : (
          <>
            <div className="auth-icon"><UserRound /></div>
            <p className="auth-eyebrow">NAGORIK COMPUTER & E-SERVICE</p>
            <h2>{mode === 'signin' ? 'অ্যাকাউন্টে প্রবেশ করুন' : 'নতুন অ্যাকাউন্ট খুলুন'}</h2>
            <p className="auth-muted">{mode === 'signin' ? 'আপনার অ্যাকাউন্টে লগইন করুন' : 'তথ্য দিয়ে সহজেই সাইন আপ করুন'}</p>
            <div className="auth-tabs">
              <button type="button" className={mode === 'signin' ? 'active' : ''} onClick={() => { setMode('signin'); setError(''); setNotice(''); }}>Sign In</button>
              <button type="button" className={mode === 'signup' ? 'active' : ''} onClick={() => { setMode('signup'); setError(''); setNotice(''); }}>Sign Up</button>
            </div>
            <form onSubmit={submit} className="auth-form">
              {mode === 'signup' && <label>আপনার নাম<input value={name} onChange={(event) => setName(event.target.value)} placeholder="সম্পূর্ণ নাম" required autoComplete="name" /></label>}
              <label>ইমেইল<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" required autoComplete="email" /></label>
              <label>পাসওয়ার্ড<div className="password-wrap"><input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="কমপক্ষে ৬ অক্ষর" required minLength={6} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>
              
              {error && <p className="auth-error" role="alert">{error}</p>}
              {notice && <p className="auth-notice" role="status">{notice}</p>}
              <button className="auth-submit" disabled={busy}>{busy ? 'অপেক্ষা করুন...' : mode === 'signin' ? 'Sign In' : 'Create Account'}</button>
            </form>
            <p className="auth-footnote">Sign Up করে অ্যাকাউন্ট তৈরি করুন, তারপর ইমেইল ও পাসওয়ার্ড দিয়ে প্রবেশ করুন।</p>
          </>
        )}
      </section>
    </div>
  );
}
