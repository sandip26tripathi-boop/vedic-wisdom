'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Currency, Theme, VastuZone, BlogPost } from '@/types';
import { TRANSLATIONS } from '@/data/translations';

interface AppContextType {
  language: Language;
  currency: Currency;
  theme: Theme;
  t: typeof TRANSLATIONS.en;
  toggleLanguage: () => void;
  toggleCurrency: () => void;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  setTheme: (theme: Theme) => void;
  formatPrice: (inr: number, usd: number) => string;
  isWizardOpen: boolean;
  wizardPrefillService: string;
  openWizard: (service?: string) => void;
  closeWizard: () => void;
  selectedZone: VastuZone | null;
  openZoneModal: (zone: VastuZone) => void;
  closeZoneModal: () => void;
  selectedBlog: BlogPost | null;
  openBlogModal: (post: BlogPost) => void;
  closeBlogModal: () => void;
  legalModal: 'privacy' | 'terms' | 'refund' | null;
  openLegalModal: (modal: 'privacy' | 'terms' | 'refund') => void;
  closeLegalModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [currency, setCurrencyState] = useState<Currency>('INR');
  const [theme, setThemeState] = useState<Theme>('day');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardPrefillService, setWizardPrefillService] = useState('');
  const [selectedZone, setSelectedZone] = useState<VastuZone | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'refund' | null>(null);

  useEffect(() => {
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('vw_theme') as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
      if (savedTheme === 'night') {
        document.documentElement.classList.add('night-mode');
      } else {
        document.documentElement.classList.remove('night-mode');
      }
    }

    const savedLang = localStorage.getItem('vw_lang') as Language | null;
    if (savedLang) setLanguageState(savedLang);

    const savedCurr = localStorage.getItem('vw_curr') as Currency | null;
    if (savedCurr) setCurrencyState(savedCurr);
  }, []);

  const toggleLanguage = () => {
    const next = language === 'en' ? 'hi' : 'en';
    setLanguageState(next);
    localStorage.setItem('vw_lang', next);
  };

  const toggleCurrency = () => {
    const next = currency === 'INR' ? 'USD' : 'INR';
    setCurrencyState(next);
    localStorage.setItem('vw_curr', next);
  };

  const toggleTheme = () => {
    const next = theme === 'day' ? 'night' : 'day';
    setThemeState(next);
    localStorage.setItem('vw_theme', next);
    if (next === 'night') {
      document.documentElement.classList.add('night-mode');
    } else {
      document.documentElement.classList.remove('night-mode');
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vw_lang', lang);
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('vw_curr', curr);
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('vw_theme', t);
    if (t === 'night') {
      document.documentElement.classList.add('night-mode');
    } else {
      document.documentElement.classList.remove('night-mode');
    }
  };

  const formatPrice = (inr: number, usd: number) => {
    if (currency === 'INR') {
      return `₹${inr.toLocaleString('en-IN')}`;
    }
    return `$${usd.toLocaleString('en-US')}`;
  };

  const openWizard = (service = '') => {
    setWizardPrefillService(service);
    setIsWizardOpen(true);
  };

  const closeWizard = () => {
    setIsWizardOpen(false);
    setWizardPrefillService('');
  };

  const openZoneModal = (zone: VastuZone) => setSelectedZone(zone);
  const closeZoneModal = () => setSelectedZone(null);

  const openBlogModal = (post: BlogPost) => setSelectedBlog(post);
  const closeBlogModal = () => setSelectedBlog(null);

  const openLegalModal = (m: 'privacy' | 'terms' | 'refund') => setLegalModal(m);
  const closeLegalModal = () => setLegalModal(null);

  const t = TRANSLATIONS[language];

  return (
    <AppContext.Provider
      value={{
        language,
        currency,
        theme,
        t,
        toggleLanguage,
        toggleCurrency,
        toggleTheme,
        setLanguage,
        setCurrency,
        setTheme,
        formatPrice,
        isWizardOpen,
        wizardPrefillService,
        openWizard,
        closeWizard,
        selectedZone,
        openZoneModal,
        closeZoneModal,
        selectedBlog,
        openBlogModal,
        closeBlogModal,
        legalModal,
        openLegalModal,
        closeLegalModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
