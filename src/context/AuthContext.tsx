import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, ClientPortalTab } from '../types/index.ts';
import { defaultMockUser } from '../data/mockClientData.ts';

interface AuthModalOptions {
  prefilledData?: Partial<UserProfile>;
  redirectToTab?: ClientPortalTab;
  message?: string;
  source?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  activeModalTab: 'phone' | 'google' | 'magicLink';
  activeModalOptions: AuthModalOptions | null;
  simulatedOtpCode: string;
  openAuthModal: (options?: AuthModalOptions) => void;
  closeAuthModal: () => void;
  setActiveModalTab: (tab: 'phone' | 'google' | 'magicLink') => void;
  loginWithPhoneOtp: (phone: string, enteredOtp: string, additionalData?: Partial<UserProfile>) => boolean;
  loginWithGoogle: () => boolean;
  loginWithMagicLink: (email: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  generateNewOtp: (phone: string) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'vedic_wisdom_auth_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return defaultMockUser; // default active user for immediate exploration
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'phone' | 'google' | 'magicLink'>('phone');
  const [activeModalOptions, setActiveModalOptions] = useState<AuthModalOptions | null>(null);
  const [simulatedOtpCode, setSimulatedOtpCode] = useState('786921');

  // Save user changes to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const openAuthModal = (options?: AuthModalOptions) => {
    setActiveModalOptions(options || null);
    // Generate a fresh 6-digit OTP code
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

  const loginWithPhoneOtp = (
    phone: string,
    enteredOtp: string,
    additionalData?: Partial<UserProfile>
  ): boolean => {
    // Check if code matches (or allow standard bypass 123456 / current code)
    if (enteredOtp.trim() === simulatedOtpCode || enteredOtp.trim() === '123456' || enteredOtp.length === 6) {
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: additionalData?.name?.trim() || user?.name || 'Vedic Seeker',
        phone: phone.trim() || '+91 90094 48601',
        email: additionalData?.email?.trim() || `${(additionalData?.name || 'client').toLowerCase().replace(/\s+/g, '')}@enterprise.in`,
        dob: additionalData?.dob || '1988-09-12',
        tob: additionalData?.tob || '07:30',
        pob: additionalData?.pob || 'Bhopal, MP, India',
        rashi: additionalData?.rashi || 'Taurus (वृषभ)',
        lagna: additionalData?.lagna || 'Scorpio (वृश्चिक)',
        nakshatra: additionalData?.nakshatra || 'Rohini (रोहिणी)',
        whatsappOptIn: additionalData?.whatsappOptIn ?? true,
        memberId: `VW-ENT-${Math.floor(1000 + Math.random() * 9000)}`,
        clientTier: 'Enterprise VIP',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };
      setUser(newUser);
      closeAuthModal();
      return true;
    }
    return false;
  };

  const loginWithGoogle = (): boolean => {
    const googleUser: UserProfile = {
      id: `usr_google_${Date.now()}`,
      name: 'Dr. Anandvardhan Verma',
      phone: '+91 90094 48601',
      email: 'anand.verma@googlemail.com',
      dob: '1982-11-24',
      tob: '10:15',
      pob: 'Delhi NCR, India',
      rashi: 'Cancer (कर्क)',
      lagna: 'Leo (सिंह)',
      nakshatra: 'Pushya (पुष्य)',
      whatsappOptIn: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      memberId: `VW-ENT-${Math.floor(1000 + Math.random() * 9000)}`,
      clientTier: 'Enterprise VIP',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    setUser(googleUser);
    closeAuthModal();
    return true;
  };

  const loginWithMagicLink = (email: string): boolean => {
    const magicUser: UserProfile = {
      id: `usr_ml_${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      phone: '+91 90094 48601',
      email: email.trim(),
      dob: '1985-05-15',
      tob: '14:20',
      pob: 'Bhopal, MP, India',
      rashi: 'Leo (सिंह)',
      lagna: 'Aries (मेष)',
      nakshatra: 'Magha (मघा)',
      whatsappOptIn: true,
      memberId: `VW-ENT-${Math.floor(1000 + Math.random() * 9000)}`,
      clientTier: 'Enterprise VIP',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    setUser(magicUser);
    closeAuthModal();
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        activeModalTab,
        activeModalOptions,
        simulatedOtpCode,
        openAuthModal,
        closeAuthModal,
        setActiveModalTab,
        loginWithPhoneOtp,
        loginWithGoogle,
        loginWithMagicLink,
        logout,
        updateProfile,
        generateNewOtp
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
