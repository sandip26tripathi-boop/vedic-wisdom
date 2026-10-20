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
  openAuthModal: (options?: AuthModalOptions) => void;
  closeAuthModal: () => void;
  setActiveModalTab: (tab: 'phone' | 'google' | 'magicLink' | 'emailPassword') => void;
  loginWithPhoneOtp: (phone: string, enteredOtp: string, additionalData?: Partial<UserProfile>) => boolean;
  loginWithGoogle: (customData?: Partial<UserProfile>) => UserProfile;
  loginWithEmailPassword: (email: string, password?: string, isRegister?: boolean, fullName?: string) => UserProfile;
  loginWithMagicLink: (email: string) => boolean;
  completePhoneVerification: (phone: string, additionalData?: Partial<UserProfile>) => UserProfile;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  generateNewOtp: (phone: string) => string;
  triggerSessionExpiry: () => void;
  clearSessionExpiredNotification: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Ephemeral Session Storage (Expires on tab / browser close)
const SESSION_STORAGE_KEY = 'vedic_wisdom_session_user';

// Clean legacy localStorage to prevent indefinite sessions
try {
  localStorage.removeItem('vedic_wisdom_auth_user');
} catch {}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    // Strict Auth: unauthenticated visitor by default until verified
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'phone' | 'google' | 'magicLink' | 'emailPassword'>('google');
  const [activeModalOptions, setActiveModalOptions] = useState<AuthModalOptions | null>(null);
  const [simulatedOtpCode, setSimulatedOtpCode] = useState('786921');
  const [sessionExpiredNotification, setSessionExpiredNotification] = useState<string | null>(null);

  // Sync user state to ephemeral sessionStorage
  useEffect(() => {
    try {
      if (user) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
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

  // Google 1-Click login creates a provisional user, requiring phone OTP step next
  const loginWithGoogle = (customData?: Partial<UserProfile>): UserProfile => {
    const prefill = activeModalOptions?.prefilledData;
    const googleUser: UserProfile = {
      id: user?.id || `usr_google_${Date.now()}`,
      name: customData?.name || prefill?.name || user?.name || 'Dr. Anandvardhan Verma',
      phone: customData?.phone || prefill?.phone || user?.phone || '',
      email: customData?.email || 'anand.verma@googlemail.com',
      authProvider: 'google',
      isEmailVerified: true,
      isPhoneVerified: user?.isPhoneVerified || false, // Mandatory OTP gate
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
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      memberId: user?.memberId || `VW-ENT-${Math.floor(1000 + Math.random() * 9000)}`,
      clientTier: 'Enterprise VIP',
      joinedDate: user?.joinedDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    setUser(googleUser);
    return googleUser;
  };

  // Email/Password login or registration creates provisional user, requiring phone OTP step next
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
      isPhoneVerified: user?.isPhoneVerified || false, // Mandatory OTP gate
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

  // Mandatory Mobile OTP Completion Step
  const completePhoneVerification = (phone: string, additionalData?: Partial<UserProfile>): UserProfile => {
    const verifiedUser: UserProfile = {
      ...(user || {}),
      id: user?.id || `usr_${Date.now()}`,
      name: additionalData?.name?.trim() || user?.name || 'Vedic Seeker',
      phone: phone.trim(),
      email: additionalData?.email?.trim() || user?.email || `${(additionalData?.name || 'client').toLowerCase().replace(/\s+/g, '')}@vedicwisdom.org`,
      authProvider: user?.authProvider || 'phone',
      isPhoneVerified: true,
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

  const logout = () => {
    setUser(null);
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem('vedic_wisdom_auth_user');
    } catch {
      // ignore
    }
  };

  const triggerSessionExpiry = () => {
    logout();
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

  const isPhoneVerified = Boolean(user && user.isPhoneVerified);
  const isAuthenticated = Boolean(user && user.isPhoneVerified);

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
        openAuthModal,
        closeAuthModal,
        setActiveModalTab,
        loginWithPhoneOtp,
        loginWithGoogle,
        loginWithEmailPassword,
        loginWithMagicLink,
        completePhoneVerification,
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
