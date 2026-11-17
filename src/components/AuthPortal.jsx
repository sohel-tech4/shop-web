import { useState } from 'react';
import { Eye, EyeOff, Globe2, LogOut, ShieldCheck, UserRound, X } from 'lucide-react';
import { signIn, signUp } from '../services/auth';


export default function AuthPortal({ onClose, onAuthenticated, user, onLogout, lang = 'bn', setLang }) {
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const bn = lang === 'bn';
  const tr = (bnText, enText) => bn ? bnText : enText;

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
      setError(err?.message || tr('লগইন করা যায়নি। আবার চেষ্টা করুন।', 'Unable to sign in. Please try again.'));
    } finally {
      setBusy(false);
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="auth-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget && !user) onClose(); }}>
      <section className="auth-panel" aria-label={tr('অ্যাকাউন্টে প্রবেশ', 'Account authentication')}>
        <div className="auth-panel-tools">
          <button type="button" className="auth-language-toggle" onClick={() => setLang?.((current) => current === 'bn' ? 'en' : 'bn')} aria-label={tr('ভাষা English করুন', 'Change language to Bangla')}>
            <Globe2 size={16} /> {bn ? 'English' : 'বাংলা'}
          </button>
          <button className="auth-close" onClick={onClose} aria-label={tr('বন্ধ করুন', 'Close')}><X size={20} /></button>
        </div>
        {user ? (
          <>
            <div className="auth-icon">{isAdmin ? <ShieldCheck /> : <UserRound />}</div>
            <p className="auth-eyebrow">NAGORIK ACCOUNT</p>
            <h2>{isAdmin ? 'Admin Dashboard' : 'User Dashboard'}</h2>
            <p className="auth-muted">{tr('স্বাগতম,', 'Welcome,')} {user.displayName || user.email}</p>
            <div className="dashboard-summary">
              <div><span>{tr('অ্যাকাউন্ট', 'Account')}</span><strong>{isAdmin ? 'Administrator' : tr('সাধারণ ব্যবহারকারী', 'Standard User')}</strong></div>
              <div><span>{tr('ইমেইল', 'Email')}</span><strong>{user.email}</strong></div>
              <div><span>{tr('স্ট্যাটাস', 'Status')}</span><strong className="status-active">{tr('সক্রিয়', 'Active')}</strong></div>
            </div>
            <div className="admin-tools">
              <h3>{isAdmin ? tr('অ্যাডমিন কন্ট্রোল', 'Admin Controls') : tr('আপনার অ্যাকাউন্ট', 'Your Account')}</h3>
              {isAdmin ? <><p>{tr('ওয়েবসাইট পরিচালনার অ্যাডমিন পরিচয় শনাক্ত হয়েছে।', 'Administrator access for website management has been verified.')}</p><div className="admin-tool-grid"><span>{tr('ব্যবহারকারী ব্যবস্থাপনা', 'User Management')}</span><span>{tr('সার্ভিস ব্যবস্থাপনা', 'Service Management')}</span><span>{tr('রিভিউ ও কনটেন্ট', 'Reviews & Content')}</span><span>{tr('সাইট সেটিংস', 'Site Settings')}</span></div></> : <p>{tr('আপনার অ্যাকাউন্ট সফলভাবে চালু হয়েছে।', 'Your account is active.')}</p>}
            </div>
            <button className="auth-submit" onClick={onLogout}><LogOut size={17} /> {tr('লগআউট', 'Log out')}</button>
          </>
        ) : (
          <>
            <div className="auth-icon"><UserRound /></div>
            <p className="auth-eyebrow">NAGORIK COMPUTER & E-SERVICE</p>
            <h2>{mode === 'signin' ? tr('অ্যাকাউন্টে প্রবেশ করুন', 'Sign in to your account') : tr('নতুন অ্যাকাউন্ট খুলুন', 'Create a new account')}</h2>
            <p className="auth-muted">{mode === 'signin' ? tr('আপনার অ্যাকাউন্টে লগইন করুন', 'Log in to your account') : tr('তথ্য দিয়ে সহজেই সাইন আপ করুন', 'Sign up by entering your details')}</p>
            <div className="auth-tabs">
              <button type="button" className={mode === 'signin' ? 'active' : ''} onClick={() => { setMode('signin'); setError(''); setNotice(''); }}>{tr('লগইন', 'Sign In')}</button>
              <button type="button" className={mode === 'signup' ? 'active' : ''} onClick={() => { setMode('signup'); setError(''); setNotice(''); }}>{tr('সাইন আপ', 'Sign Up')}</button>
            </div>
            <form onSubmit={submit} className="auth-form">
              {mode === 'signup' && <label>{tr('আপনার নাম', 'Your name')}<input value={name} onChange={(event) => setName(event.target.value)} placeholder={tr('সম্পূর্ণ নাম', 'Full name')} required autoComplete="name" /></label>}
              <label>{tr('ইমেইল', 'Email')}<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" required autoComplete="email" /></label>
              <label>{tr('পাসওয়ার্ড', 'Password')}<div className="password-wrap"><input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={tr('কমপক্ষে ৮ অক্ষর', 'At least 8 characters')} required minLength={8} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? tr('পাসওয়ার্ড লুকান', 'Hide password') : tr('পাসওয়ার্ড দেখান', 'Show password')}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>
              {error && <p className="auth-error" role="alert">{error}</p>}
              {notice && <p className="auth-notice" role="status">{notice}</p>}
              <button className="auth-submit" disabled={busy}>{busy ? tr('অপেক্ষা করুন...', 'Please wait...') : mode === 'signin' ? tr('লগইন করুন', 'Sign In') : tr('অ্যাকাউন্ট তৈরি করুন', 'Create Account')}</button>
            </form>
            <p className="auth-footnote">{tr('সাইন আপ করে অ্যাকাউন্ট তৈরি করুন, তারপর ইমেইল ও পাসওয়ার্ড দিয়ে প্রবেশ করুন।', 'Create an account with Sign Up, then sign in using your email and password.')}</p>
          </>
        )}
      </section>
    </div>
  );
}
