import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, ClientPortalTab } from '../types/index.ts';

export interface AuthModalOptions {
  prefilledData?: Partial<UserProfile>;
  redirectToTab?: ClientPortalTab;
  message?: string;
  source?: string;
  initialStep?: 'auth' | 'otp';
  onSuccess?: (user: UserProfile) => void;
}

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isPhoneVerified: boolean;
  isAuthModalOpen: boolean;
  activeModalTab: 'phone' | 'google' | 'magicLink' | 'emailPassword';
  activeModalOptions: AuthModalOptions | null;
  simulatedOtpCode: string;
  sessionExpiredNotification: string | null;
  rememberedUser: UserProfile | null;
  reloginRememberedUser: () => UserProfile | null;
  forgetRememberedUser: () => void;
  openAuthModal: (options?: AuthModalOptions) => void;
  closeAuthModal: () => void;
  setActiveModalTab: (tab: 'phone' | 'google' | 'magicLink' | 'emailPassword') => void;
  loginWithPhoneOtp: (phone: string, enteredOtp: string, additionalData?: Partial<UserProfile>) => boolean;
  loginWithGoogle: (customData?: Partial<UserProfile>) => UserProfile;
  loginWithEmailPassword: (email: string, password?: string, isRegister?: boolean, fullName?: string) => UserProfile;
  loginWithMagicLink: (email: string) => boolean;
  completePhoneVerification: (phone: string, additionalData?: Partial<UserProfile>) => UserProfile;
  signIn: (provider?: string, options?: AuthModalOptions) => Promise<void>;
  logout: (options?: { forgetRemembered?: boolean } | any) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  generateNewOtp: (phone: string) => string;
  triggerSessionExpiry: () => void;
  clearSessionExpiredNotification: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Active session storage key (sessionStorage only, purged automatically when tab/browser closes)
const SESSION_STORAGE_KEY = 'vedic_wisdom_session_user';
// Persistent remembered user key (localStorage, used to offer "Welcome Back / Login Again" on new sessions)
const REMEMBERED_USER_KEY = 'vedic_wisdom_remembered_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load active user EXCLUSIVELY from sessionStorage so that closing the tab/browser automatically signs out!
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      // Clear legacy permanent auth key if present to respect session signout
      localStorage.removeItem('vedic_wisdom_auth_user');

      const storedSession = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (storedSession) {
        const parsed = JSON.parse(storedSession);
        if (parsed && typeof parsed === 'object' && parsed.email) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Remembered user (persisted in localStorage across sessions to provide "Welcome Back / Login Again")
  const [rememberedUser, setRememberedUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(REMEMBERED_USER_KEY) || localStorage.getItem('vedic_recent_gmail_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object' && (parsed.email || parsed.name)) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'phone' | 'google' | 'magicLink' | 'emailPassword'>('google');
  const [activeModalOptions, setActiveModalOptions] = useState<AuthModalOptions | null>(null);
  const [simulatedOtpCode, setSimulatedOtpCode] = useState('786921');
  const [sessionExpiredNotification, setSessionExpiredNotification] = useState<string | null>(null);

  // Sync user state to sessionStorage and update rememberedUser in localStorage
  useEffect(() => {
    try {
      if (user) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
        localStorage.setItem(REMEMBERED_USER_KEY, JSON.stringify(user));
        localStorage.setItem('vedic_recent_gmail_user', JSON.stringify({
          name: user.name,
          email: user.email
        }));
        setRememberedUser(user);
      } else {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const openAuthModal = (options?: AuthModalOptions) => {
    setActiveModalOptions(options || null);
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtpCode(newCode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setActiveModalOptions(null);
  };

  const generateNewOtp = (_phone: string) => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtpCode(newCode);
    return newCode;
  };

  // Google 1-Click login creates a verified user profile
  const loginWithGoogle = (customData?: Partial<UserProfile>): UserProfile => {
    const prefill = activeModalOptions?.prefilledData;
    const googleUser: UserProfile = {
      id: customData?.id || user?.id || `usr_google_${Date.now()}`,
      name: customData?.name || prefill?.name || user?.name || 'Google Seeker',
      phone: customData?.phone || prefill?.phone || user?.phone || '',
      email: customData?.email || prefill?.email || user?.email || 'seeker@gmail.com',
      authProvider: 'google',
      isEmailVerified: true,
      isPhoneVerified: true,
      isVerified: true,
      dob: customData?.dob || prefill?.dob || user?.dob || '1984-06-18',
      tob: customData?.tob || prefill?.tob || user?.tob || '07:30',
      pob: customData?.pob || prefill?.pob || user?.pob || 'Bhopal, MP, India',
      latitude: customData?.latitude ?? prefill?.latitude ?? user?.latitude ?? 23.2599,
      longitude: customData?.longitude ?? prefill?.longitude ?? user?.longitude ?? 77.4126,
      timezone: customData?.timezone || prefill?.timezone || user?.timezone || 'Asia/Kolkata',
      tzOffset: customData?.tzOffset ?? prefill?.tzOffset ?? user?.tzOffset ?? 5.5,
      rashi: customData?.rashi || prefill?.rashi || user?.rashi || 'Cancer (कर्क)',
      lagna: customData?.lagna || prefill?.lagna || user?.lagna || 'Leo (सिंह)',
      nakshatra: customData?.nakshatra || prefill?.nakshatra || user?.nakshatra || 'Pushya (पुष्य)',
      whatsappOptIn: customData?.whatsappOptIn ?? prefill?.whatsappOptIn ?? user?.whatsappOptIn ?? true,
      avatar: customData?.avatar || user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      memberId: user?.memberId || `VW-ENT-${Math.floor(1000 + Math.random() * 9000)}`,
      clientTier: 'Enterprise VIP',
      joinedDate: user?.joinedDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    setUser(googleUser);
    return googleUser;
  };

  // Email/Password login or registration
  const loginWithEmailPassword = (
    email: string,
    _password?: string,
    isRegister: boolean = false,
    fullName?: string
  ): UserProfile => {
    const prefill = activeModalOptions?.prefilledData;
    const cleanEmail = email.trim();
    const cleanName = fullName?.trim() || prefill?.name || (isRegister ? 'New Vedic Seeker' : cleanEmail.split('@')[0].toUpperCase());

    const emailUser: UserProfile = {
      id: user?.id || `usr_em_${Date.now()}`,
      name: cleanName,
      phone: prefill?.phone || user?.phone || '',
      email: cleanEmail,
      authProvider: 'email',
      isEmailVerified: true,
      isPhoneVerified: user?.isPhoneVerified || false,
      dob: prefill?.dob || user?.dob || '1990-01-01',
      tob: prefill?.tob || user?.tob || '08:00',
      pob: prefill?.pob || user?.pob || 'Bhopal, MP, India',
      latitude: prefill?.latitude ?? user?.latitude ?? 23.2599,
      longitude: prefill?.longitude ?? user?.longitude ?? 77.4126,
      timezone: prefill?.timezone || user?.timezone || 'Asia/Kolkata',
      tzOffset: prefill?.tzOffset ?? user?.tzOffset ?? 5.5,
      rashi: prefill?.rashi || user?.rashi || 'Taurus (वृषभ)',
      lagna: prefill?.lagna || user?.lagna || 'Scorpio (वृश्चिक)',
      nakshatra: prefill?.nakshatra || user?.nakshatra || 'Rohini (रोहिणी)',
      whatsappOptIn: prefill?.whatsappOptIn ?? user?.whatsappOptIn ?? true,
      memberId: user?.memberId || `VW-ENT-${Math.floor(1000 + Math.random() * 9000)}`,
      clientTier: 'Enterprise VIP',
      joinedDate: user?.joinedDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    setUser(emailUser);
    return emailUser;
  };

  // Magic link sign-in creates provisional user
  const loginWithMagicLink = (email: string): boolean => {
    loginWithEmailPassword(email, undefined, false);
    return true;
  };

  // Mobile OTP Completion Step
  const completePhoneVerification = (phone: string, additionalData?: Partial<UserProfile>): UserProfile => {
    const verifiedUser: UserProfile = {
      ...(user || {}),
      id: user?.id || `usr_${Date.now()}`,
      name: additionalData?.name?.trim() || user?.name || 'Vedic Seeker',
      phone: phone.trim(),
      email: additionalData?.email?.trim() || user?.email || `${(additionalData?.name || 'client').toLowerCase().replace(/\s+/g, '')}@vedicwisdom.org`,
      avatar: additionalData?.avatar || user?.avatar || undefined,
      authProvider: user?.authProvider || additionalData?.authProvider || 'phone',
      isPhoneVerified: true,
      isVerified: true,
      isEmailVerified: user?.isEmailVerified ?? true,
      dob: additionalData?.dob || user?.dob || '1988-06-18',
      tob: additionalData?.tob || user?.tob || '07:30',
      pob: additionalData?.pob || user?.pob || 'Bhopal, MP, India',
      latitude: additionalData?.latitude ?? user?.latitude ?? 23.2599,
      longitude: additionalData?.longitude ?? user?.longitude ?? 77.4126,
      timezone: additionalData?.timezone || user?.timezone || 'Asia/Kolkata',
      tzOffset: additionalData?.tzOffset ?? user?.tzOffset ?? 5.5,
      rashi: additionalData?.rashi || user?.rashi || 'Taurus (वृषभ)',
      lagna: additionalData?.lagna || user?.lagna || 'Scorpio (वृश्चिक)',
      nakshatra: additionalData?.nakshatra || user?.nakshatra || 'Rohini (रोहिणी)',
      whatsappOptIn: additionalData?.whatsappOptIn ?? user?.whatsappOptIn ?? true,
      memberId: user?.memberId || `VW-ENT-${Math.floor(1000 + Math.random() * 9000)}`,
      clientTier: user?.clientTier || 'Enterprise VIP',
      joinedDate: user?.joinedDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    setUser(verifiedUser);
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(verifiedUser));
      localStorage.setItem(REMEMBERED_USER_KEY, JSON.stringify(verifiedUser));
    } catch {
      // ignore
    }
    return verifiedUser;
  };

  const loginWithPhoneOtp = (
    phone: string,
    enteredOtp: string,
    additionalData?: Partial<UserProfile>
  ): boolean => {
    if (
      enteredOtp.trim() === simulatedOtpCode ||
      enteredOtp.trim() === '123456' ||
      enteredOtp.trim() === '786921' ||
      enteredOtp.length === 6
    ) {
      completePhoneVerification(phone, additionalData);
      closeAuthModal();
      return true;
    }
    return false;
  };

  // Instant 1-Click Re-login for returning client in a new session
  const reloginRememberedUser = (): UserProfile | null => {
    const target = rememberedUser || (() => {
      try {
        const saved = localStorage.getItem(REMEMBERED_USER_KEY);
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    })();

    if (!target) return null;

    const refreshedUser: UserProfile = {
      ...target,
      isPhoneVerified: true,
      isVerified: true
    };
    setUser(refreshedUser);
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(refreshedUser));
    } catch {}
    return refreshedUser;
  };

  // Forget remembered account on this device
  const forgetRememberedUser = () => {
    setRememberedUser(null);
    try {
      localStorage.removeItem(REMEMBERED_USER_KEY);
      localStorage.removeItem('vedic_recent_gmail_user');
      localStorage.removeItem('vedic_wisdom_auth_user');
    } catch {}
  };

  const signIn = async (provider: string = 'google', options?: AuthModalOptions) => {
    openAuthModal({
      ...options,
      initialStep: 'auth'
    });
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('vedic:auth:trigger', { detail: { provider, options } });
      window.dispatchEvent(event);
    }
  };

  // Manual sign out clears active session. Options can forget remembered device.
  const logout = (options?: { forgetRemembered?: boolean } | any) => {
    setUser(null);
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      if (options && typeof options === 'object' && 'forgetRemembered' in options && options.forgetRemembered) {
        forgetRememberedUser();
      }
    } catch {
      // ignore
    }
  };

  // Inactivity timeout triggers automatic signout from active session
  const triggerSessionExpiry = () => {
    setUser(null);
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {}
    setSessionExpiredNotification(
      'Session expired due to 15 minutes of inactivity. Please log in again.'
    );
  };

  const clearSessionExpiredNotification = () => {
    setSessionExpiredNotification(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const isPhoneVerified = Boolean(user && (user.isPhoneVerified || user.isVerified));
  const isAuthenticated = Boolean(user && (user.isPhoneVerified || user.isVerified));

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isPhoneVerified,
        isAuthModalOpen,
        activeModalTab,
        activeModalOptions,
        simulatedOtpCode,
        sessionExpiredNotification,
        rememberedUser,
        reloginRememberedUser,
        forgetRememberedUser,
        openAuthModal,
        closeAuthModal,
        setActiveModalTab,
        loginWithPhoneOtp,
        loginWithGoogle,
        loginWithEmailPassword,
        loginWithMagicLink,
        completePhoneVerification,
        signIn,
        logout,
        updateProfile,
        generateNewOtp,
        triggerSessionExpiry,
        clearSessionExpiredNotification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const signIn = async (provider: string = 'google', options?: any) => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('vedic:auth:trigger', { detail: { provider, options } });
    window.dispatchEvent(event);
  }
};
