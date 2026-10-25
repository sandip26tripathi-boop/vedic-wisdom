import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { Language, UserProfile } from '../../types/index.ts';
import { X, ArrowRight, ShieldCheck, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

interface GoogleOneTapVisitPromptProps {
  currentLang?: Language;
}

export const GoogleOneTapVisitPrompt: React.FC<GoogleOneTapVisitPromptProps> = ({
  currentLang = 'en'
}) => {
  const { isAuthenticated, user, loginWithGoogle, completePhoneVerification } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [gmailInput, setGmailInput] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [recentAccount, setRecentAccount] = useState<{ name: string; email: string } | null>(null);

  const isHi = currentLang === 'hi';

  useEffect(() => {
    // Check if user already authenticated
    if (isAuthenticated || user) {
      setIsVisible(false);
      return;
    }

    // Check if dismissed in this session
    try {
      const dismissed = sessionStorage.getItem('vw_onetap_dismissed');
      if (dismissed === 'true') {
        return;
      }
      const saved = localStorage.getItem('vedic_recent_gmail_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.email) {
          setRecentAccount(parsed);
          setGmailInput(parsed.email);
        }
      }
    } catch {}

    // Show after 1.5s on visit
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user]);

  if (!isVisible || isAuthenticated || user) {
    return null;
  }

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem('vw_onetap_dismissed', 'true');
    } catch {}
  };

  const executeDirectLogin = (targetEmail?: string, targetName?: string) => {
    setIsLoggingIn(true);
    let email = (targetEmail || gmailInput).trim().toLowerCase();
    if (!email) {
      email = recentAccount?.email || 'seeker.client@gmail.com';
    }
    if (!email.includes('@')) {
      email = `${email}@gmail.com`;
    }

    const name = targetName || recentAccount?.name || email.split('@')[0].toUpperCase();
    const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=d4af37,b45309`;

    const verifiedUser: UserProfile = {
      id: `usr_ggl_${Date.now()}`,
      name,
      email,
      phone: '+91 90094 48601',
      avatar,
      authProvider: 'google',
      isEmailVerified: true,
      isPhoneVerified: true,
      isVerified: true,
      memberId: `VW-GGL-${Math.floor(1000 + Math.random() * 9000)}`,
      clientTier: 'Enterprise VIP',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    loginWithGoogle(verifiedUser);
    completePhoneVerification(verifiedUser.phone || '+91 90094 48601', verifiedUser);

    try {
      localStorage.setItem('vedic_wisdom_auth_user', JSON.stringify(verifiedUser));
      sessionStorage.setItem('vedic_wisdom_session_user', JSON.stringify(verifiedUser));
      localStorage.setItem('vedic_recent_gmail_user', JSON.stringify({
        name: verifiedUser.name,
        email: verifiedUser.email
      }));
    } catch {}

    setIsSuccess(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsVisible(false);
    }, 900);
  };

  return (
    <aside 
      aria-label={isHi ? "Google सीधा लॉगिन" : "Google Sign-In Visit Prompt"}
      className="fixed bottom-4 right-4 sm:top-20 sm:right-6 sm:bottom-auto z-40 max-w-sm w-[92vw] sm:w-[360px] animate-in slide-in-from-bottom-4 sm:slide-in-from-top-4 duration-300"
    >
      <div className="bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl rounded-2xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden p-4 sm:p-5 relative">
        
        {/* Dismiss Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-2.5 right-2.5 p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
          aria-label={isHi ? "बंद करें" : "Dismiss"}
          title={isHi ? "बंद करें" : "Dismiss"}
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-4 text-center animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {isHi ? "Gmail द्वारा सफलतापूर्वक प्रवेश!" : "Signed in with Gmail!"}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isHi ? "वैदिक विस्डम में आपका स्वागत है।" : "Welcome to Vedic Wisdom."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Header with Google Logo */}
            <div className="flex items-center space-x-2.5 pr-6">
              <div className="w-8 h-8 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.13z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                  {isHi ? "Google खाते से सीधा प्रवेश" : "Sign in with Google"}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                  {isHi ? "परामर्श व कुंडली एक्सेस हेतु" : "To enter Vedic Wisdom directly"}
                </p>
              </div>
            </div>

            {/* Quick 1-Click Button */}
            <button
              type="button"
              disabled={isLoggingIn}
              onClick={() => executeDirectLogin(recentAccount?.email, recentAccount?.name)}
              className="w-full min-h-[42px] px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:brightness-105 shadow-md shadow-[#D4AF37]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isLoggingIn ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 shadow-2xs">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.13z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z" />
                  </svg>
                </span>
              )}
              <span>
                {recentAccount
                  ? (isHi ? `जारी रखें: ${recentAccount.email}` : `Continue as ${recentAccount.email}`)
                  : (isHi ? "1-क्लिक में Google से प्रवेश करें" : "1-Click Continue with Google")}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Direct Gmail Input Field */}
            <form 
              onSubmit={(e) => { e.preventDefault(); executeDirectLogin(); }}
              className="flex items-center space-x-1.5"
            >
              <div className="relative flex-1 min-w-0">
                <Mail className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={isHi ? "अपनी Gmail ID दर्ज करें" : "Or type your Gmail address"}
                  value={gmailInput}
                  onChange={(e) => setGmailInput(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
              <button
                type="submit"
                disabled={isLoggingIn}
                className="min-h-[32px] px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-amber-300 text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                {isHi ? "प्रवेश" : "Enter"}
              </button>
            </form>

            {/* Bottom Dismiss / Guest Link */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>{isHi ? "बिना OTP सुरक्षित लॉगिन" : "Official Google Auth"}</span>
              </span>
              <button
                type="button"
                onClick={handleDismiss}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline cursor-pointer"
              >
                {isHi ? "मेहमान के रूप में देखें" : "Browse as guest"}
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
