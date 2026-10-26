import React, { useState, useEffect } from 'react';
import { DigitalReportItem } from '../data/digitalReports.ts';
import { Language } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { useCart } from '../context/CartContext.tsx';
import { X, FileText, CheckCircle2, Download, Send, ArrowRight, ShieldCheck, Clock, Sparkles, ShoppingBag, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { validateName, validatePhone, validateEmail, validateCity, validateDob, validateTob } from '../utils/validation.ts';

interface ReportOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: DigitalReportItem | null;
  currentLang: Language;
}

export const ReportOrderModal: React.FC<ReportOrderModalProps> = ({
  isOpen,
  onClose,
  report,
  currentLang,
}) => {
  const { user } = useAuth();
  const { addToCart, openCart } = useCart();
  const [activeTab, setActiveTab] = useState<'order' | 'preview'>('order');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [dob, setDob] = useState(user?.dob || '1990-01-01');
  const [tob, setTob] = useState(user?.tob || '12:00');
  const [pob, setPob] = useState(user?.pob || '');
  const [partnerName, setPartnerName] = useState('');
  const [partnerDob, setPartnerDob] = useState('');
  const [partnerTob, setPartnerTob] = useState('');
  const [partnerPob, setPartnerPob] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user && isOpen) {
      if (user.name) setName(user.name);
      if (user.phone) setPhone(user.phone);
      if (user.email) setEmail(user.email);
      if (user.dob) setDob(user.dob);
      if (user.tob) setTob(user.tob);
      if (user.pob) setPob(user.pob);
    }
  }, [user, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setErrors({});
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !report) return null;

  const isMarriage = report.id === 'marriageMatch';

  const validateAllFields = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameVal = validateName(name, currentLang);
    if (!nameVal.isValid && nameVal.error) newErrors.name = nameVal.error;

    const phoneVal = validatePhone(phone, currentLang);
    if (!phoneVal.isValid && phoneVal.error) newErrors.phone = phoneVal.error;

    const dobVal = validateDob(dob, currentLang);
    if (!dobVal.isValid && dobVal.error) newErrors.dob = dobVal.error;

    const tobVal = validateTob(tob, currentLang);
    if (!tobVal.isValid && tobVal.error) newErrors.tob = tobVal.error;

    const pobVal = validateCity(pob, currentLang);
    if (!pobVal.isValid && pobVal.error) newErrors.pob = pobVal.error;

    const emailVal = validateEmail(email, false, currentLang);
    if (!emailVal.isValid && emailVal.error) newErrors.email = emailVal.error;

    if (isMarriage) {
      const pNameVal = validateName(partnerName, currentLang);
      if (!pNameVal.isValid && pNameVal.error) newErrors.partnerName = pNameVal.error;

      const pDobVal = validateDob(partnerDob, currentLang);
      if (!pDobVal.isValid && pDobVal.error) newErrors.partnerDob = pDobVal.error;

      const pTobVal = validateTob(partnerTob, currentLang);
      if (!pTobVal.isValid && pTobVal.error) newErrors.partnerTob = pTobVal.error;

      const pPobVal = validateCity(partnerPob, currentLang);
      if (!pPobVal.isValid && pPobVal.error) newErrors.partnerPob = pPobVal.error;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAllFields()) {
      return;
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setIsSuccess(true);

    const reportTitle = currentLang === 'en' ? report.titleEn : report.titleHi;
    const text = `*New Digital Astro Report Order - Vedic Wisdom*\n\n` +
      `*Report Dossier:* ${reportTitle}\n` +
      `*Price:* ${report.priceInr} / ${report.priceUsd}\n` +
      `*Applicant Name:* ${name}\n` +
      `*WhatsApp Phone:* ${phone}\n` +
      `*Email:* ${email || 'N/A'}\n` +
      `*Date of Birth:* ${dob}\n` +
      `*Time of Birth:* ${tob}\n` +
      `*Place of Birth:* ${pob}\n` +
      (isMarriage ? `*Partner Name:* ${partnerName}\n*Partner DOB:* ${partnerDob}\n*Partner TOB:* ${partnerTob}\n*Partner POB:* ${partnerPob}\n` : '') +
      `*Delivery Commitment:* Automated 2-Hour Dispatch\n\n` +
      `Please confirm order and send invoice / payment link.`;

    setTimeout(() => {
      window.open(`https://wa.me/919009448601?text=${encodeURIComponent(text)}`, '_blank');
    }, 800);
  };

  const handleAddToCart = () => {
    if (!validateAllFields()) {
      return;
    }

    addToCart({
      id: report.id,
      title: currentLang === 'en' ? report.titleEn : report.titleHi,
      category: 'Digital Report',
      price: parseInt(report.priceInr.replace(/\D/g, ''), 10) || 999,
      turnaround: report.deliveryTimeEn,
      badge: report.badgeEn
    });
    onClose();
    openCart();
  };

  const handleDownloadSample = async () => {
    try {
      confetti({ particleCount: 30, spread: 50 });
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      
      // Top luxury header
      doc.setFillColor(11, 15, 25);
      doc.rect(0, 0, 210, 30, 'F');
      doc.setTextColor(212, 175, 55);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('VEDIC WISDOM', 20, 16);
      doc.setFontSize(9);
      doc.setTextColor(243, 229, 171);
      doc.text('178 Maple High Street, Bhopal • Research Lineage: S.K. Tripathi & R. Pathak', 20, 23);

      // Watermark
      doc.setTextColor(235, 235, 235);
      doc.setFontSize(40);
      doc.text('OFFICIAL SAMPLE EXCERPT', 25, 140, { angle: 45 });

      // Title & Overview
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.text(report.titleEn, 20, 45);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text(`Official Sample Dossier • Format: ${report.pagesEn} Comprehensive Analytical PDF`, 20, 53);
      doc.text(`Pricing: ${report.priceInr} / ${report.priceUsd} • Standard Turnaround: ${report.deliveryTimeEn}`, 20, 60);

      // Accent Line
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.5);
      doc.line(20, 66, 190, 66);

      doc.setFont('helvetica', 'bold');
      doc.save(`${report.id}_sample_preview.pdf`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#111827] border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-bold text-[#B45309] dark:text-[#F3E5AB] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{currentLang === 'en' ? report.badgeEn : report.badgeHi}</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {currentLang === 'en' ? report.titleEn : report.titleHi}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {currentLang === 'en' ? report.descriptionEn : report.descriptionHi}
              </p>
            </div>

            {/* Quick Meta Stats */}
            <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 mb-5 text-center text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">{currentLang === 'en' ? 'Pages' : 'पृष्ठ'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{currentLang === 'en' ? report.pagesEn : report.pagesHi}</span>
              </div>
              <div className="border-x border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">{currentLang === 'en' ? 'Delivery' : 'समय'}</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{currentLang === 'en' ? report.deliveryTimeEn : report.deliveryTimeHi}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">{currentLang === 'en' ? 'Official Fee' : 'शुल्क'}</span>
                <span className="font-bold text-[#B45309] dark:text-[#F3E5AB]">{report.priceInr}</span>
              </div>
            </div>

            {/* Tabs: Order Form vs Preview */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 mb-5">
              <button
                type="button"
                onClick={() => setActiveTab('order')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'order'
                    ? 'border-[#D4AF37] text-[#B45309] dark:text-[#F3E5AB]'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {currentLang === 'en' ? '1. Order Details & Natal Input' : '1. जन्म विवरण व ऑर्डर'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'preview'
                    ? 'border-[#D4AF37] text-slate-900 dark:text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {currentLang === 'en' ? '2. Sample Table of Contents' : '2. विषय सूची व नमूना'}
              </button>
            </div>

            {activeTab === 'order' ? (
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                
                {/* Primary Person Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {currentLang === 'en' ? 'Full Name *' : 'पूरा नाम *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Sharma"
                      value={name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setName(val);
                        if (errors.name && val.trim().length >= 3) {
                          const check = validateName(val, currentLang);
                          if (check.isValid) {
                            setErrors(prev => {
                              const copy = { ...prev };
                              delete copy.name;
                              return copy;
                            });
                          }
                        }
                      }}
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white focus:outline-none ${
                        errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-[#D4AF37]'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {currentLang === 'en' ? 'WhatsApp Number (10-Digit Mobile) *' : 'व्हाट्सएप नंबर (10-अंक) *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9009448601"
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPhone(val);
                        if (errors.phone) {
                          const check = validatePhone(val, currentLang);
                          if (check.isValid) {
                            setErrors(prev => {
                              const copy = { ...prev };
                              delete copy.phone;
                              return copy;
                            });
                          }
                        }
                      }}
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white focus:outline-none ${
                        errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-[#D4AF37]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {currentLang === 'en' ? 'Date of Birth *' : 'जन्म तिथि *'}
                    </label>
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDob(val);
                        if (errors.dob) {
                          const check = validateDob(val, currentLang);
                          if (check.isValid) {
                            setErrors(prev => {
                              const copy = { ...prev };
                              delete copy.dob;
                              return copy;
                            });
                          }
                        }
                      }}
                      className={`w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white focus:outline-none ${
                        errors.dob ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-[#D4AF37]'
                      }`}
                    />
                    {errors.dob && (
                      <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.dob}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {currentLang === 'en' ? 'Time of Birth *' : 'जन्म समय *'}
                    </label>
                    <input
                      type="time"
                      required
                      value={tob}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTob(val);
                        if (errors.tob) {
                          const check = validateTob(val, currentLang);
                          if (check.isValid) {
                            setErrors(prev => {
                              const copy = { ...prev };
                              delete copy.tob;
                              return copy;
                            });
                          }
                        }
                      }}
                      className={`w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white focus:outline-none ${
                        errors.tob ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-[#D4AF37]'
                      }`}
                    />
                    {errors.tob && (
                      <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.tob}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {currentLang === 'en' ? 'Place of Birth *' : 'जन्म स्थान *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bhopal, MP"
                      value={pob}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPob(val);
                        if (errors.pob && val.trim().length >= 2) {
                          const check = validateCity(val, currentLang);
                          if (check.isValid) {
                            setErrors(prev => {
                              const copy = { ...prev };
                              delete copy.pob;
                              return copy;
                            });
                          }
                        }
                      }}
                      className={`w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white focus:outline-none ${
                        errors.pob ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-[#D4AF37]'
                      }`}
                    />
                    {errors.pob && (
                      <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.pob}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {currentLang === 'en' ? 'Email (Optional backup delivery)' : 'ईमेल पता (वैकल्पिक)'}
                  </label>
                  <input
                    type="email"
                    placeholder="client@domain.com"
                    value={email}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEmail(val);
                      if (errors.email) {
                        const check = validateEmail(val, false, currentLang);
                        if (check.isValid) {
                          setErrors(prev => {
                            const copy = { ...prev };
                            delete copy.email;
                            return copy;
                          });
                        }
                      }
                    }}
                    className={`w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white focus:outline-none ${
                      errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-[#D4AF37]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* If Marriage Compatibility Report, require Partner's details */}
                {isMarriage && (
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-3">
                    <div className="text-xs font-bold text-rose-800 dark:text-rose-300">
                      {currentLang === 'en' ? 'Partner / Prospective Spouse Details *:' : 'जीवनसाथी का विवरण *:'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder={currentLang === 'en' ? "Partner's Full Name *" : "जीवनसाथी का नाम *"}
                          value={partnerName}
                          onChange={(e) => {
                            setPartnerName(e.target.value);
                            if (errors.partnerName) {
                              setErrors(prev => {
                                const copy = { ...prev };
                                delete copy.partnerName;
                                return copy;
                              });
                            }
                          }}
                          className={`w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border text-slate-900 dark:text-white ${
                            errors.partnerName ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                          }`}
                        />
                        {errors.partnerName && (
                          <p className="text-[11px] text-red-500 font-semibold mt-1">{errors.partnerName}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          placeholder={currentLang === 'en' ? "Partner's Birth Place *" : "जीवनसाथी का जन्म स्थान *"}
                          value={partnerPob}
                          onChange={(e) => {
                            setPartnerPob(e.target.value);
                            if (errors.partnerPob) {
                              setErrors(prev => {
                                const copy = { ...prev };
                                delete copy.partnerPob;
                                return copy;
                              });
                            }
                          }}
                          className={`w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border text-slate-900 dark:text-white ${
                            errors.partnerPob ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                          }`}
                        />
                        {errors.partnerPob && (
                          <p className="text-[11px] text-red-500 font-semibold mt-1">{errors.partnerPob}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="date"
                          required
                          value={partnerDob}
                          onChange={(e) => {
                            setPartnerDob(e.target.value);
                            if (errors.partnerDob) {
                              setErrors(prev => {
                                const copy = { ...prev };
                                delete copy.partnerDob;
                                return copy;
                              });
                            }
                          }}
                          className={`w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border text-slate-900 dark:text-white ${
                            errors.partnerDob ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                          }`}
                        />
                        {errors.partnerDob && (
                          <p className="text-[11px] text-red-500 font-semibold mt-1">{errors.partnerDob}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="time"
                          required
                          value={partnerTob}
                          onChange={(e) => {
                            setPartnerTob(e.target.value);
                            if (errors.partnerTob) {
                              setErrors(prev => {
                                const copy = { ...prev };
                                delete copy.partnerTob;
                                return copy;
                              });
                            }
                          }}
                          className={`w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border text-slate-900 dark:text-white ${
                            errors.partnerTob ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                          }`}
                        />
                        {errors.partnerTob && (
                          <p className="text-[11px] text-red-500 font-semibold mt-1">{errors.partnerTob}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Commitment Banner */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-800 dark:text-emerald-300 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {currentLang === 'en'
                      ? 'Traditional KP computation guided by Sandeep K. Tripathi\'s research team based on ancient scriptures.'
                      : 'संदीप के. त्रिपाठी जी की शोध टीम द्वारा पारंपरिक शास्त्रों व आस्था के आधार पर तैयार रिपोर्ट।'}
                  </span>
                </div>

                {/* Action Buttons: Add to Cart & Proceed to Payment */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:brightness-105 shadow-lg shadow-[#D4AF37]/25 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-slate-950" />
                    <span>{currentLang === 'en' ? `Add to Cart & Proceed to Payment (${report.priceInr})` : `कार्ट में जोड़ें व भुगतान करें (${report.priceInr})`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>{currentLang === 'en' ? 'Or Request via WhatsApp' : 'अथवा व्हाट्सएप पर विवरण भेजें'}</span>
                  </button>
                </div>

              </form>
            ) : (
              /* Sample Preview Tab */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {currentLang === 'en' ? 'Included Chapters & Analytical Modules:' : 'शामिल अध्याय एवं मॉड्यूल:'}
                  </div>
                  <div className="space-y-2">
                    {(currentLang === 'en' ? report.sampleTopicsEn : report.sampleTopicsHi).map((topic, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs font-medium text-slate-800 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">
                      {currentLang === 'en' ? 'Want to inspect sample PDF quality?' : 'नमूना पीडीएफ गुणवत्ता देखना चाहते हैं?'}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {currentLang === 'en' ? 'Download verified 5-page sample watermark excerpt.' : 'सत्यापित 5-पेज का सैंपल तुरंत देखें।'}
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadSample}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] hover:brightness-105 flex items-center space-x-1.5 transition-all cursor-pointer shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{currentLang === 'en' ? 'Sample Excerpt' : 'नमूना डाउनलोड'}</span>
                  </button>
                </div>

                <button
                  onClick={() => setActiveTab('order')}
                  className="w-full py-3 rounded-xl font-bold text-xs text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {currentLang === 'en' ? '← Proceed to Order This Report' : '← इस रिपोर्ट को ऑर्डर करने के लिए आगे बढ़ें'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-slate-900 dark:text-white">
              {currentLang === 'en' ? 'Report Order Transmitted!' : 'रिपोर्ट ऑर्डर प्रेषित!'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              {currentLang === 'en'
                ? 'Your birth details have been registered. WhatsApp is opening now to confirm your order with our automated dispatch desk.'
                : 'आपका जन्म विवरण दर्ज हो गया है। व्हाट्सएप पर आपका ऑर्डर खोला जा रहा है।'}
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-semibold text-xs text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {currentLang === 'en' ? 'Close Window' : 'खिड़की बंद करें'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
