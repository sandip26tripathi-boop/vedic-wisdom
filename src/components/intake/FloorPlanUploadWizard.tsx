import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Briefcase, 
  Compass, 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Layers, 
  Sparkles,
  Check,
  AlertCircle
} from 'lucide-react';
import { Language } from '../../types/index.ts';
import { useCurrency } from '../../context/CurrencyContext.tsx';
import { CompassCalibrationModal } from '../interactive/CompassCalibrationModal.tsx';

interface FloorPlanUploadWizardProps {
  currentLang?: Language;
  onProceedToCheckout?: (planDetails: FloorPlanIntakeData) => void;
  onWhatsAppRedirect?: (planDetails: FloorPlanIntakeData) => void;
}

export interface FloorPlanIntakeData {
  propertyType: string;
  facingDirection: string;
  facingDegree?: number;
  reviewFocus: string[];
  clientName: string;
  clientContact: string;
  notes?: string;
  fileName?: string;
}

export const FloorPlanUploadWizard: React.FC<FloorPlanUploadWizardProps> = ({
  currentLang = 'en',
  onProceedToCheckout,
  onWhatsAppRedirect
}) => {
  const isHi = currentLang === 'hi';
  const { formatPrice } = useCurrency();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCompassModalOpen, setIsCompassModalOpen] = useState<boolean>(false);

  // Form State
  const [propertyType, setPropertyType] = useState<string>('Apartment / Flat');
  const [facingDirection, setFacingDirection] = useState<string>('North (0° - 15°)');
  const [facingDegree, setFacingDegree] = useState<number>(0);
  const [reviewFocus, setReviewFocus] = useState<string[]>(['Financial Circulation & Growth']);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [clientName, setClientName] = useState<string>('');
  const [clientContact, setClientContact] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const propertyTypes = [
    { 
      id: 'flat', 
      titleEn: 'Apartment / High-Rise Flat', 
      titleHi: 'फ्लैट अथवा अपार्टमेंट', 
      descEn: 'Fixed pre-built civil layout; non-structural zonal remedy focus',
      descHi: 'पूर्व-निर्मित संरचना; बिना तोड़-फोड़ रंग व धातु संतुलन',
      icon: Building2 
    },
    { 
      id: 'villa', 
      titleEn: 'Independent House / Villa / Kothi', 
      titleHi: 'स्वतंत्र मकान / कोठी / विला', 
      descEn: 'Boundary, main gate, overhead water, and multi-floor alignment',
      descHi: 'मुख्य द्वार, चारदीवारी, जल व अग्नि अक्ष का संतुलन',
      icon: Home 
    },
    { 
      id: 'office', 
      titleEn: 'Commercial Office / Factory', 
      titleHi: 'व्यापारिक कार्यालय / औद्योगिक इकाई', 
      descEn: 'Leadership desk orientation, reception dynamics & cash-flow stability',
      descHi: 'नेतृत्व कक्ष, रिसेप्शन, अकाउंट्स व कार्यक्षमता',
      icon: Briefcase 
    },
    { 
      id: 'plot', 
      titleEn: 'Open Residential / Commercial Plot', 
      titleHi: 'खुला भूखंड / प्लॉट', 
      descEn: 'Soil inclination, perimeter ratio & architectural planning advisory',
      descHi: 'भूमि ढलान, अनुपात व निर्माण पूर्व दिशा परामर्श',
      icon: Layers 
    }
  ];

  const focusOptions = [
    { id: 'finance', en: 'Financial Circulation & Liquidity (South-East / North)', hi: 'वित्तीय प्रवाह एवं तरलता (आग्नेय / उत्तर)' },
    { id: 'productivity', en: 'Workspace Productivity & Decision Clarity (North-East / West)', hi: 'कार्यक्षमता व स्पष्ट निर्णय (ईशान / पश्चिम)' },
    { id: 'health', en: 'Restful Living, Sleep & Vitality (North-North-East / South)', hi: 'गहरी नींद, स्वास्थ्य व शांति (उत्तर-उत्तर-पूर्व / दक्षिण)' },
    { id: 'harmony', en: 'Family Relationships & Stability (South-West)', hi: 'पारिवारिक सौहार्द व संबंध (नैऋत्य)' }
  ];

  const toggleFocus = (item: string) => {
    if (reviewFocus.includes(item)) {
      if (reviewFocus.length > 1) {
        setReviewFocus(reviewFocus.filter(f => f !== item));
      }
    } else {
      setReviewFocus([...reviewFocus, item]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const intakeData: FloorPlanIntakeData = {
    propertyType,
    facingDirection,
    facingDegree,
    reviewFocus,
    clientName,
    clientContact,
    notes,
    fileName: uploadedFile?.name
  };

  const handleComplete = (target: 'checkout' | 'whatsapp') => {
    setIsSubmitted(true);
    if (target === 'checkout' && onProceedToCheckout) {
      onProceedToCheckout(intakeData);
    } else if (onWhatsAppRedirect) {
      onWhatsAppRedirect(intakeData);
    } else {
      // Direct WhatsApp redirect with pre-filled formatted intake text
      const text = encodeURIComponent(
        `Namaste Sandeep ji, I have completed the Property Assessment Intake:\n\n` +
        `• Property: ${propertyType}\n` +
        `• Main Entrance: ${facingDirection} (${facingDegree}°)\n` +
        `• Primary Focus: ${reviewFocus.join(', ')}\n` +
        `• Client Name: ${clientName || 'Valued Client'}\n` +
        `• Blueprint File: ${uploadedFile ? uploadedFile.name : 'Ready for direct transmission'}\n\n` +
        `Kindly advise on the next review slot.`
      );
      window.open(`https://wa.me/919009448601?text=${text}`, '_blank');
    }
  };

  return (
    <section 
      id="floor-plan-intake"
      aria-label={isHi ? "फ़्लोर प्लान मूल्यांकन विज़ार्ड" : "Floor Plan Assessment Wizard"}
      className="w-full py-12 lg:py-16 bg-white dark:bg-[#0B0F19]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Wizard Container */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-amber-500/25 shadow-xl p-6 sm:p-8 lg:p-10">
          
          {/* Header & Step Indicator */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-950 dark:text-[#F3E5AB] border border-amber-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{isHi ? "इंटरएक्टिव वास्तु इनटेक विज़ार्ड" : "Interactive Spatial Intake Wizard"}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100">
              {isHi ? "अपने परिसर का फ़्लोर प्लान मूल्यांकन सबमिट करें" : "Submit Your Layout for Directional Review"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              {isHi 
                ? "4 सरल चरणों में अपनी संपत्ति का विवरण दर्ज करें। सभी फ़ाइलें एंड-टू-एंड एन्क्रिप्टेड व गोपनीय हैं।"
                : "Complete 4 quick steps. All architectural sketches and blueprints are handled under strict confidentiality."}
            </p>

            {/* Stepper Progress Bar */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep === step
                        ? 'bg-amber-600 text-white shadow-md'
                        : currentStep > step
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {currentStep > step ? <Check className="w-4 h-4" /> : step}
                  </div>
                  {step < 4 && (
                    <div className={`w-8 sm:w-16 h-1 mx-1 rounded-full ${
                      currentStep > step ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-slate-800'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: PROPERTY TYPE */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-[#F3E5AB]">
                {isHi ? "चरण 1: संपत्ति का प्रकार चुनें" : "Step 1: Select Your Property Classification"}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {propertyTypes.map((item) => {
                  const Icon = item.icon;
                  const isSelected = propertyType === (isHi ? item.titleHi : item.titleEn);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPropertyType(isHi ? item.titleHi : item.titleEn)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start space-x-3.5 ${
                        isSelected
                          ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-600 dark:border-amber-500 shadow-md ring-2 ring-amber-500/30'
                          : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-amber-400'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 ${
                        isSelected 
                          ? 'bg-amber-600 text-white' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {isHi ? item.titleHi : item.titleEn}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-normal">
                          {isHi ? item.descHi : item.descEn}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>{isHi ? "आगे बढ़ें (दिशा चयन)" : "Next: Cardinal Facing"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CARDINAL FACING & CALIBRATION */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-[#F3E5AB]">
                  {isHi ? "चरण 2: मुख्य द्वार की दिशा व कोण" : "Step 2: Main Entrance Cardinal Facing"}
                </h3>

                {/* Compass Calibration Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsCompassModalOpen(true)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900 dark:text-amber-300 bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/25 transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>{isHi ? "पहले कंपास चेक करें" : "Check Your Direction First"}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
                <div>
                  <label htmlFor="facing-direction-select" className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                    {isHi ? "मुख्य प्रवेश द्वार की अनुमानित दिशा चुनें" : "Select Main Entrance Orientation"}
                  </label>
                  <select
                    id="facing-direction-select"
                    value={facingDirection}
                    onChange={(e) => setFacingDirection(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="North (0° - 15°)">North (0° - 15°) — उत्तर (कुबेर द्वार / नवीन अवसर)</option>
                    <option value="North-East / Ishanya (30° - 60°)">North-East / Ishanya (30° - 60°) — ईशान (मानसिक स्पष्टता)</option>
                    <option value="East (75° - 105°)">East (75° - 105°) — पूर्व (सामाजिक संपर्क व प्रतिष्ठा)</option>
                    <option value="South-East / Agneya (120° - 150°)">South-East / Agneya (120° - 150°) — आग्नेय (नकद तरलता)</option>
                    <option value="South (165° - 195°)">South (165° - 195°) — दक्षिण (विश्राम व स्थायित्व)</option>
                    <option value="South-West / Nairutya (210° - 240°)">South-West / Nairutya (210° - 240°) — नैऋत्य (पारिवारिक संबंध)</option>
                    <option value="West (255° - 285°)">West (255° - 285°) — पश्चिम (लाभ व व्यापारिक प्राप्ति)</option>
                    <option value="North-West / Vayavya (300° - 330°)">North-West / Vayavya (300° - 330°) — वायव्य (सहायता तंत्र)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="facing-degree-input" className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                    {isHi ? "स्मार्टफोन कंपास द्वारा प्राप्त सटीक डिग्री (वैकल्पिक)" : "Exact Compass Degree from Smartphone (Optional)"}
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      id="facing-degree-input"
                      type="number"
                      min="0"
                      max="359"
                      value={facingDegree || ''}
                      onChange={(e) => setFacingDegree(Number(e.target.value))}
                      placeholder="e.g. 45"
                      className="w-32 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {isHi ? "0° से 359° के बीच (यदि उपलब्ध हो)" : "Degrees (0° to 359°)"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{isHi ? "पीछे" : "Back"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>{isHi ? "आगे बढ़ें (समीक्षा क्षेत्र)" : "Next: Areas of Review"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PRIMARY AREA OF REVIEW */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-[#F3E5AB]">
                {isHi ? "चरण 3: प्राथमिक समीक्षा क्षेत्र (कम से कम 1 चुनें)" : "Step 3: Primary Areas for Directional Review"}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {focusOptions.map((opt) => {
                  const label = isHi ? opt.hi : opt.en;
                  const isChecked = reviewFocus.includes(label);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleFocus(label)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-600 dark:border-amber-500 shadow-sm'
                          : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 pr-2">
                        {label}
                      </span>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                        isChecked
                          ? 'bg-amber-600 border-amber-600 text-white'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{isHi ? "पीछे" : "Back"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>{isHi ? "आगे बढ़ें (नक्शा अपलोड)" : "Next: Secure Upload"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SECURE UPLOAD & CONFIDENTIALITY COMMITMENT */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-[#F3E5AB]">
                {isHi ? "चरण 4: सुरक्षित फ़ाइल अपलोड व संपर्क विवरण" : "Step 4: Secure Upload & Client Information"}
              </h3>

              {/* Upload Box */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-50/30 dark:bg-slate-950/40 text-center relative hover:bg-amber-50/50 transition-colors">
                <UploadCloud className="w-10 h-10 text-amber-600 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {uploadedFile 
                    ? uploadedFile.name 
                    : (isHi ? "फ़्लोर प्लान / हाथ से बना स्केच अपलोड करें" : "Upload Architectural PDF, CAD, JPG, or Hand-Drawn Sketch")}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  {isHi 
                    ? "समर्थित प्रारूप: PDF, PNG, JPG (अधिकतम 25 MB). यदि वर्तमान में फ़ाइल उपलब्ध नहीं है, तो भी आप परामर्श बुक कर सकते हैं।" 
                    : "Supported formats: PDF, PNG, JPG (up to 25 MB). You may also submit via WhatsApp post-booking."}
                </p>

                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.dwg"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Upload floor plan file"
                />

                {uploadedFile && (
                  <div className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-500/20">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{isHi ? "फ़ाइल सफलता पूर्वक संलग्न" : "File successfully attached"}</span>
                  </div>
                )}
              </div>

              {/* Client Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="intake-client-name" className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {isHi ? "आपका नाम *" : "Your Full Name *"}
                  </label>
                  <input
                    id="intake-client-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="intake-client-contact" className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {isHi ? "व्हाट्सएप / संपर्क नंबर *" : "WhatsApp or Contact Number *"}
                  </label>
                  <input
                    id="intake-client-contact"
                    type="tel"
                    required
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label htmlFor="intake-notes" className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  {isHi ? "विशिष्ट प्रश्न अथवा संरचनात्मक विवरण (वैकल्पिक)" : "Specific Questions or Layout Context (Optional)"}
                </label>
                <textarea
                  id="intake-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isHi ? "जैसे: किचन किस दिशा में है, मुख्य द्वार के सामने क्या है..." : "e.g., Location of kitchen, overhead water tank, or specific room orientations..."}
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* MANDATORY DPDP ACT / GDPR CLIENT CONFIDENTIALITY BADGE */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-500/30 flex items-start space-x-2.5">
                <Lock className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-emerald-950 dark:text-emerald-200">
                  <strong className="font-bold">
                    {isHi ? "ग्राहक गोपनीयता प्रतिबद्धता (DPDP अनुपालन): " : "Client Confidentiality Commitment: "}
                  </strong>
                  {isHi
                    ? "आपके द्वारा अपलोड किए गए सभी फ़्लोर प्लान, स्केच और व्यक्तिगत विवरण पूरी तरह गोपनीय हैं, एंड-टू-एंड एन्क्रिप्टेड स्टोरेज में सुरक्षित रहते हैं और कभी भी किसी तीसरे पक्ष के साथ साझा अथवा सार्वजनिक नहीं किए जाते हैं।"
                    : "All uploaded blueprints, sketches, and personal natal details are strictly confidential, protected via end-to-end encrypted storage, and never published or shared with third parties."}
                </p>
              </div>

              {/* Final Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{isHi ? "पीछे" : "Back"}</span>
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleComplete('whatsapp')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-emerald-900 dark:text-emerald-200 bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>{isHi ? "व्हाट्सएप इनटेक पर भेजें" : "Submit via WhatsApp Desk"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleComplete('checkout')}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isHi ? "परामर्श स्लॉट बुक करें" : "Confirm & Proceed to Booking"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Compass Calibration Modal */}
      <CompassCalibrationModal
        isOpen={isCompassModalOpen}
        onClose={() => setIsCompassModalOpen(false)}
        currentLang={currentLang}
        onSelectDegree={(deg, zoneName) => {
          setFacingDegree(deg);
          setFacingDirection(`${zoneName} (${deg}°)`);
        }}
      />
    </section>
  );
};
