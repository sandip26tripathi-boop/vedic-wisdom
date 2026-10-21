import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'INR' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  toggleCurrency: () => void;
  formatPrice: (inr: number, usd: number) => string;
  userTimezone: string;
  userTzAbbr: string;
  formatMeetingTime: (istHour: number, istMinute?: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('INR');
  const [userTimezone, setUserTimezone] = useState<string>('Asia/Kolkata');
  const [userTzAbbr, setUserTzAbbr] = useState<string>('IST');

  useEffect(() => {
    // 1. Detect User Timezone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
      setUserTimezone(tz);

      // Derive abbreviation / offset
      const d = new Date();
      const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short', timeZone: tz }).formatToParts(d);
      const tzPart = parts.find(p => p.type === 'timeZoneName');
      setUserTzAbbr(tzPart ? tzPart.value : 'Local');

      // 2. Auto-detect region if not manually saved
      const saved = localStorage.getItem('vw_currency') as Currency | null;
      if (saved && (saved === 'INR' || saved === 'USD')) {
        setCurrencyState(saved);
      } else {
        const isIndia = tz === 'Asia/Kolkata' || 
          (typeof navigator !== 'undefined' && (navigator.language?.includes('IN') || (navigator.languages && navigator.languages.some(l => l.includes('IN')))));
        setCurrencyState(isIndia ? 'INR' : 'USD');
      }
    } catch {
      setCurrencyState('INR');
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('vw_currency', c);
    } catch {
      // Storage unavailable
    }
  };

  const toggleCurrency = () => {
    setCurrency(currency === 'INR' ? 'USD' : 'INR');
  };

  const formatPrice = (inr: number, usd: number): string => {
    if (currency === 'INR') {
      return `₹${inr.toLocaleString('en-IN')}`;
    }
    return `$${usd.toLocaleString('en-US')}`;
  };

  // Helper to convert an Indian Standard Time (UTC+5:30) hour into the client's local timezone
  const formatMeetingTime = (istHour: number, istMinute = 0): string => {
    try {
      const now = new Date();
      // IST is UTC + 5.5 hours
      const istUtcTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), istHour - 5, istMinute - 30));
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: userTimezone
      }).format(istUtcTime);
    } catch {
      return `${istHour % 12 || 12}:${istMinute < 10 ? '0' : ''}${istMinute} ${istHour >= 12 ? 'PM' : 'AM'} IST`;
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        formatPrice,
        userTimezone,
        userTzAbbr,
        formatMeetingTime
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

// Subtle compact Currency Switcher Component for Nav / Headers
export const CurrencyToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { currency, setCurrency, userTzAbbr } = useCurrency();

  return (
    <div className={`inline-flex items-center space-x-1.5 p-0.5 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/80 dark:border-slate-700/80 text-xs font-semibold select-none ${className}`}>
      <button
        type="button"
        onClick={() => setCurrency('INR')}
        className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
          currency === 'INR'
            ? 'bg-amber-600 text-white shadow-sm font-bold'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
        title="Domestic Pricing (Indian Rupee ₹)"
      >
        ₹ INR
      </button>
      <button
        type="button"
        onClick={() => setCurrency('USD')}
        className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
          currency === 'USD'
            ? 'bg-amber-600 text-white shadow-sm font-bold'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
        title="International / NRI Pricing (US Dollar $)"
      >
        $ USD
      </button>
      <span className="hidden sm:inline-block text-[10px] text-slate-600 dark:text-slate-300 px-1 border-l border-slate-300 dark:border-slate-700">
        {userTzAbbr}
      </span>
    </div>
  );
};
