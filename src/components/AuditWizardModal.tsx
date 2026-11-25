'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import confetti from 'canvas-confetti';
import { 
  X, Check, ArrowRight, ArrowLeft, Upload, FileCheck, ShieldCheck, Sparkles, Send, Copy, CheckCheck 
} from 'lucide-react';

export default function AuditWizardModal() {
  const { isWizardOpen, closeWizard, wizardPrefillService, language, t } = useApp();

  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryTimezone: 'India (IST - UTC+5:30)',
    propertyCategory: wizardPrefillService || 'Residential Apartment / Villa',
    floorPlanStatus: 'Digital PDF / CAD Blueprint Ready',
    selectedFileName: '',
    dob: '',
    tob: '',
    pob: '',
    challenges: [] as string[],
    notes: ''
  });

  if (!isWizardOpen) return null;

  const handleChallengeToggle = (challenge: string) => {
    setFormData(prev => {
      const exists = prev.challenges.includes(challenge);
      if (exists) {
        return { ...prev, challenges: prev.challenges.filter(c => c !== challenge) };
      } else {
        return { ...prev, challenges: [...prev.challenges, challenge] };
      }
    });
  };

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, selectedFileName: e.target.files![0].name }));
    }
  };

  const generateWhatsAppMessage = () => {
    const text = `*NEW ASTRO-VASTU AUDIT INQUIRY — VEDIC WISDOM*
----------------------------------------
*Client Name:* ${formData.name || 'Not Provided'}
*Phone/WhatsApp:* ${formData.phone || 'Not Provided'}
*Email:* ${formData.email || 'Not Provided'}
*Country & Timezone:* ${formData.countryTimezone}

*Property Category:* ${formData.propertyCategory}
*Floor Plan Status:* ${formData.floorPlanStatus} ${formData.selectedFileName ? `(File: ${formData.selectedFileName})` : ''}

*Astro-Vastu Kundli Details:*
• Date of Birth: ${formData.dob || 'To be shared on call'}
• Time of Birth: ${formData.tob || 'Approx/To be rectified'}
• Place of Birth: ${formData.pob || 'To be shared'}

*Core Challenges Faced:*
${formData.challenges.length > 0 ? formData.challenges.map(c => `• ${c}`).join('\n') : '• General Energy & Wealth Optimization'}

*Additional Architectural Notes:*
${formData.notes || 'Looking for 0% demolition non-invasive corrections.'}
----------------------------------------
_Initiated via Vedic Wisdom Global Web Platform_`;

    return encodeURIComponent(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    setSubmitted(true);
    const waUrl = `https://wa.me/919009448601?text=${generateWhatsAppMessage()}`;
    window.open(waUrl, '_blank');
  };

  const copyBrief = () => {
    const rawText = decodeURIComponent(generateWhatsAppMessage());
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    closeWizard();
  };

  const challengesList = [
    { en: 'Financial Liquidity & Blocked Cash Flow', hi: 'धन की तंगी एवं फंसा हुआ पैसा' },
    { en: 'Career / Business Growth Stagnation', hi: 'करियर व व्यापार में रुकावट' },
    { en: 'Marital Conflict & Relationship Stress', hi: 'वैवाहिक तनाव एवं पारिवारिक कलह' },
    { en: 'Chronic Illness, Insomnia & Low Immunity', hi: 'दीर्घकालिक बीमारी, अनिद्रा व कमजोरी' },
    { en: 'Litigation, Legal Notices & Bad Debts', hi: 'कोर्ट-कचहरी, कानूनी अड़चनें व कर्ज' },
    { en: 'Children Academic Focus & Memory Retention', hi: 'बच्चों की पढ़ाई में एकाग्रता का अभाव' },
    { en: 'Factory Machinery Breakdown & Labor Disputes', hi: 'फैक्ट्री मशीनरी खराबी व मजदूर विवाद' },
    { en: 'Seeking Overall Prosperity & Spiritual Peace', hi: 'समग्र समृद्धि एवं आत्मिक शांति' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border p-6 sm:p-8 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col justify-between"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--gold-primary)',
          color: 'var(--text-main)'
        }}
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                {t.wizard.title}
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                {language === 'en' ? 'Direct Desk: Sandeep K. Tripathi' : 'सीधा परामर्श डेस्क: संदीप के. त्रिपाठी'}
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        {/* Steps Progress Bar */}
        {!submitted && (
          <div className="pt-3 pb-2">
            <div className="flex justify-between items-center text-xs font-semibold text-stone-400 mb-1.5">
              <span>{language === 'en' ? `Step ${step} of 5` : `चरण ${step} / 5`}</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">
                {step === 1 && (language === 'en' ? 'Contact & Timezone' : 'संपर्क व देश')}
                {step === 2 && (language === 'en' ? 'Property Category' : 'भवन का प्रकार')}
                {step === 3 && (language === 'en' ? 'Floor Plan Status' : 'नक्शा उपलब्धता')}
                {step === 4 && (language === 'en' ? 'Kundli Birth Details' : 'जन्म विवरण')}
                {step === 5 && (language === 'en' ? 'Core Challenges' : 'प्रमुख समस्याएं')}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 to-amber-700 transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Wizard Step Body */}
        <div className="py-4 overflow-y-auto flex-1 pr-1">
          {submitted ? (
            /* Success View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20">
                <CheckCheck className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                {language === 'en' ? 'Audit Brief Generated Successfully!' : 'ऑडिट रिक्वेस्ट सफलतापूर्वक तैयार हो गई है!'}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
                {language === 'en' 
                  ? 'Your structured Astro-Vastu brief has opened in WhatsApp (+91 90094 48601). If it did not open automatically, click the button below.' 
                  : 'आपका संपूर्ण विवरण व्हाट्सएप पर भेज दिया गया है (+91 90094 48601)। यदि यह स्वतः न खुले, तो नीचे दिए गए बटन पर क्लिक करें।'}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/919009448601?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'en' ? 'Open WhatsApp Chat' : 'व्हाट्सएप चैट खोलें'}</span>
                </a>

                <button
                  onClick={copyBrief}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-xs border flex items-center justify-center space-x-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? (language === 'en' ? 'Copied to Clipboard' : 'कॉपी हो गया') : (language === 'en' ? 'Copy Text Summary' : 'विवरण कॉपी करें')}</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Step 1: Contact & Timezone */}
              {step === 1 && (
                <div className="space-y-3.5 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      {t.wizard.nameLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma / John Anderson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none focus:border-amber-500 transition-colors"
                      style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-subtle)' }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        {t.wizard.phoneLabel} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210 / +1 (555)..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none focus:border-amber-500 transition-colors"
                        style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-subtle)' }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        {t.wizard.emailLabel}
                      </label>
                      <input
                        type="email"
                        placeholder="client@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none focus:border-amber-500 transition-colors"
                        style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-subtle)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      {t.wizard.countryLabel}
                    </label>
                    <select
                      value={formData.countryTimezone}
                      onChange={(e) => setFormData({ ...formData, countryTimezone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none focus:border-amber-500 transition-colors"
                      style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-subtle)' }}
                    >
                      <option>India (IST - UTC+5:30)</option>
                      <option>United States - East Coast (EST - UTC-5)</option>
                      <option>United States - West Coast (PST - UTC-8)</option>
                      <option>United Arab Emirates / Dubai (GST - UTC+4)</option>
                      <option>United Kingdom / Europe (GMT/BST - UTC+0/+1)</option>
                      <option>Canada (EST / PST)</option>
                      <option>Australia (AEST - UTC+10)</option>
                      <option>Singapore / Malaysia (SGT - UTC+8)</option>
                      <option>Other International Location</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Property Category */}
              {step === 2 && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <label className="block text-xs font-semibold mb-2">
                    {t.wizard.propertyLabel}
                  </label>
                  {[
                    'Residential Apartment / Flat',
                    'Independent Bungalow / Luxury Villa',
                    'Corporate Office / Commercial Hub',
                    'Industrial Factory / Manufacturing Plant',
                    'Retail Showroom / Restaurant / Clinic',
                    'Plot / Land Purchase Evaluation'
                  ].map((cat) => (
                    <div
                      key={cat}
                      onClick={() => setFormData({ ...formData, propertyCategory: cat })}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between text-sm transition-all ${
                        formData.propertyCategory === cat
                          ? 'border-amber-500 bg-amber-500/10 font-bold text-amber-700 dark:text-amber-400'
                          : 'hover:border-stone-400'
                      }`}
                      style={{
                        backgroundColor: formData.propertyCategory === cat ? undefined : 'var(--bg-card-subtle)',
                        borderColor: formData.propertyCategory === cat ? undefined : 'var(--border-subtle)',
                      }}
                    >
                      <span>{cat}</span>
                      {formData.propertyCategory === cat && <Check className="w-4 h-4 text-amber-600" />}
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Floor Plan Status & Upload */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <label className="block text-xs font-semibold mb-1">
                    {t.wizard.planLabel}
                  </label>

                  {[
                    'Digital PDF / CAD Blueprint Ready',
                    'Hand-Drawn Sketch with Approximate Dimensions',
                    'Need Guidance on How to Create a Floor Plan',
                    'Builder Brochure / Online Listing Plan'
                  ].map((status) => (
                    <div
                      key={status}
                      onClick={() => setFormData({ ...formData, floorPlanStatus: status })}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between text-sm transition-all ${
                        formData.floorPlanStatus === status
                          ? 'border-amber-500 bg-amber-500/10 font-bold text-amber-700 dark:text-amber-400'
                          : 'hover:border-stone-400'
                      }`}
                      style={{
                        backgroundColor: formData.floorPlanStatus === status ? undefined : 'var(--bg-card-subtle)',
                        borderColor: formData.floorPlanStatus === status ? undefined : 'var(--border-subtle)',
                      }}
                    >
                      <span>{status}</span>
                      {formData.floorPlanStatus === status && <Check className="w-4 h-4 text-amber-600" />}
                    </div>
                  ))}

                  {/* Simulated Upload Dropzone */}
                  <div className="mt-4 p-5 rounded-2xl border-2 border-dashed border-amber-500/40 text-center bg-amber-500/5">
                    <input
                      type="file"
                      id="plan-file"
                      accept=".pdf,.png,.jpg,.jpeg,.dwg"
                      className="hidden"
                      onChange={handleFileUploadSim}
                    />
                    <label htmlFor="plan-file" className="cursor-pointer block">
                      <Upload className="w-7 h-7 mx-auto text-amber-600 mb-2" />
                      <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                        {formData.selectedFileName ? (
                          <span className="flex items-center justify-center text-emerald-600">
                            <FileCheck className="w-4 h-4 mr-1" />
                            {formData.selectedFileName}
                          </span>
                        ) : (
                          language === 'en' ? 'Click to select CAD / PDF / Image (Optional)' : 'नक्शा फाइल चुनें (वैकल्पिक)'
                        )}
                      </p>
                      <p className="text-[10px] text-stone-400 mt-1">
                        {language === 'en' ? 'You can also share it directly on WhatsApp later.' : 'आप इसे बाद में सीधे व्हाट्सएप पर भी भेज सकते हैं।'}
                      </p>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 4: Birth Details (Optional for Astro-Vastu) */}
              {step === 4 && (
                <div className="space-y-3.5 animate-in fade-in duration-200">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
                    <Sparkles className="w-4 h-4 inline mr-1 text-amber-600" />
                    {language === 'en'
                      ? 'Kundli Synchronization: Your horoscope allows Sandeep K. Tripathi to overlay planetary sub-lords onto your floor plan for personalized 0% demolition remedies.'
                      : 'कुंडली मिलान: आपकी जन्म विवरण से 16 दिशाओं और ग्रहीय दशाओं का मिलान कर 100% व्यक्तिगत उपाय तय किए जाते हैं।'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        {t.wizard.dobLabel}
                      </label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border text-sm outline-none focus:border-amber-500"
                        style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-subtle)' }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        {t.wizard.tobLabel}
                      </label>
                      <input
                        type="time"
                        value={formData.tob}
                        onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border text-sm outline-none focus:border-amber-500"
                        style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-subtle)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      {t.wizard.pobLabel}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bhopal, MP, India / London, UK"
                      value={formData.pob}
                      onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border text-sm outline-none focus:border-amber-500"
                      style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-subtle)' }}
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Core Challenges */}
              {step === 5 && (
                <div className="space-y-3.5 animate-in fade-in duration-200">
                  <label className="block text-xs font-semibold mb-1">
                    {t.wizard.issuesLabel}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {challengesList.map((ch, idx) => {
                      const text = language === 'en' ? ch.en : ch.hi;
                      const isSelected = formData.challenges.includes(text);
                      return (
                        <div
                          key={idx}
                          onClick={() => handleChallengeToggle(text)}
                          className={`p-2.5 rounded-xl border cursor-pointer text-xs transition-all flex items-center space-x-2 ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500/10 font-bold text-amber-700 dark:text-amber-400'
                              : 'hover:border-stone-400'
                          }`}
                          style={{
                            backgroundColor: isSelected ? undefined : 'var(--bg-card-subtle)',
                            borderColor: isSelected ? undefined : 'var(--border-subtle)',
                          }}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-400'
                          }`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <span className="line-clamp-2">{text}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-semibold mb-1">
                      {t.wizard.notesLabel}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={language === 'en' ? 'Describe any specific toilet positions, cuts, or burning concerns...' : 'विशिष्ट वास्तु चिंता या विवरण दर्ज करें...'}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border text-xs outline-none focus:border-amber-500"
                      style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-subtle)' }}
                    ></textarea>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>

        {/* Wizard Footer Navigation */}
        {!submitted && (
          <div className="pt-3 border-t flex items-center justify-between gap-3" style={{ borderColor: 'var(--border-subtle)' }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl font-semibold text-xs border flex items-center space-x-1.5 hover:bg-stone-100 dark:hover:bg-stone-800"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Back' : 'पिछला'}</span>
              </button>
            ) : (
              <div className="flex items-center space-x-1 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Confidential & NDA Protected</span>
              </div>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1 && (!formData.name || !formData.phone)) {
                    alert(language === 'en' ? 'Please provide your Name and WhatsApp phone number.' : 'कृपया अपना नाम एवं व्हाट्सएप नंबर दर्ज करें।');
                    return;
                  }
                  setStep(step + 1);
                }}
                className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow flex items-center space-x-1.5"
              >
                <span>{language === 'en' ? 'Next Step' : 'अगला चरण'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg flex items-center space-x-2 animate-pulse"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.wizard.submitBtn}</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
