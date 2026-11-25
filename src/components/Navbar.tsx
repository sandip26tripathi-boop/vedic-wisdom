'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import VedicLogo from '@/components/VedicLogo';
import { 
  Sun, Moon, Globe, DollarSign, Menu, X, PhoneCall, Sparkles 
} from 'lucide-react';

export default function Navbar() {
  const { language, currency, theme, t, toggleLanguage, toggleCurrency, toggleTheme, openWizard } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hidden Remedies store as requested
  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#zero-demolition', label: t.nav.zeroDemolition },
    { href: '#chakra-explorer', label: t.nav.chakra },
    { href: '#services', label: t.nav.services },
    { href: '#case-studies', label: t.nav.caseStudies },
    { href: '#academy', label: t.nav.academy },
    { href: '#founder', label: t.nav.founder },
    { href: '#blog', label: t.nav.blog },
    { href: '#faq', label: t.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300"
      style={{
        backgroundColor: theme === 'night' ? 'rgba(11, 17, 32, 0.94)' : 'rgba(250, 244, 230, 0.95)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Top International Strip */}
      <div className="hidden sm:flex justify-between items-center px-4 sm:px-8 py-1.5 text-xs border-b border-opacity-30"
        style={{
          borderColor: 'var(--border-subtle)',
          backgroundColor: theme === 'night' ? '#070B14' : '#F2E7D0',
          color: 'var(--text-muted)'
        }}
      >
        <div className="flex items-center space-x-3">
          <span className="flex items-center font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            {language === 'en' ? 'Global Desk Live: India • USA • UAE • UK • Canada' : 'वैश्विक सहायता उपलब्ध: भारत • अमेरिका • दुबई • यूके'}
          </span>
          <span className="text-stone-400">|</span>
          <span className="hidden md:inline">
            {language === 'en' 
              ? 'Headquarters: Maple Heights, Hoshangabad Rd, Bhopal, India' 
              : 'मुख्यालय: मेपल हाइट्स, होशंगाबाद रोड, भोपाल, भारत'}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <a 
            href="https://wa.me/919009448601" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:text-amber-600 transition-colors font-medium text-emerald-600 dark:text-emerald-400"
          >
            <span>WhatsApp Direct: +91 90094 48601</span>
          </a>
          <span className="text-stone-400">|</span>
          <a href="mailto:ask.vedicwisdom@gmail.com" className="hover:underline">
            ask.vedicwisdom@gmail.com
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* New Premium Logo */}
        <a href="#home">
          <VedicLogo size={46} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1 lg:space-x-4 text-[13px] font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-2.5 py-1 rounded-md transition-colors hover:text-amber-600 dark:hover:text-amber-400 whitespace-nowrap"
              style={{ color: 'var(--text-main)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Global Control Toggles & Booking Button */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            title={language === 'en' ? 'Switch to Hindi (हिंदी)' : 'Switch to English'}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all hover:border-amber-500 shadow-sm"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)',
            }}
          >
            <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{language === 'en' ? 'HI (हि)' : 'EN'}</span>
          </button>

          {/* Currency Switcher */}
          <button
            onClick={toggleCurrency}
            title={currency === 'INR' ? 'Switch to USD ($)' : 'Switch to INR (₹)'}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all hover:border-amber-500 shadow-sm"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)',
            }}
          >
            <DollarSign className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{currency === 'INR' ? 'USD ($)' : 'INR (₹)'}</span>
          </button>

          {/* Theme Day/Night Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'day' ? 'Switch to Night Mode' : 'Switch to Day Mode'}
            className="p-2 rounded-lg border text-xs transition-all hover:border-amber-500 shadow-sm"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)',
            }}
          >
            {theme === 'day' ? (
              <Moon className="w-4 h-4 text-amber-800" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Book Consultation Button */}
          <button
            onClick={() => openWizard()}
            className="hidden sm:flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white shadow-md bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 transform hover:-translate-y-0.5 transition-all gold-glow"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>{t.nav.bookConsultation}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg border text-stone-700 dark:text-stone-300"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className="xl:hidden border-t px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200"
          style={{
            backgroundColor: theme === 'night' ? '#0B1120' : '#FAF4E6',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div className="grid grid-cols-2 gap-2 pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 text-sm font-medium rounded-md hover:bg-amber-500/10 hover:text-amber-600 transition-colors"
                style={{ color: 'var(--text-main)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col space-y-3 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openWizard();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-bold text-sm text-white shadow bg-gradient-to-r from-amber-600 to-amber-800"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{t.nav.bookConsultation}</span>
            </button>

            <a
              href="https://wa.me/919009448601"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl font-semibold text-sm border border-emerald-600 text-emerald-600 dark:text-emerald-400"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Direct Desk (+91 90094 48601)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
