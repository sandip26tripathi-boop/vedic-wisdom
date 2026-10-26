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
  AlertCircle,
  FileCheck,
  X
} from 'lucide-react';
import { Language } from '../../types/index.ts';
import { useCurrency } from '../../context/CurrencyContext.tsx';
import { CompassCalibrationModal } from '../interactive/CompassCalibrationModal.tsx';
import {
  validateLayoutStep1,
  validateLayoutStep2,
  validateLayoutStep3,
  validateFileUpload,
  validateName,
  validatePhone,
  validateLayoutAllSteps
} from '../../utils/validation.ts';

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

  // Form State - Property type requires active selection
  const [propertyType, setPropertyType] = useState<string>('');
  const [facingDirection, setFacingDirection] = useState<string>('North (0° - 15°)');
  const [facingDegree, setFacingDegree] = useState<number>(0);
  const [reviewFocus, setReviewFocus] = useState<string[]>(['Financial Circulation & Growth']);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [clientName, setClientName] = useState<string>('');
  const [clientContact, setClientContact] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

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
    let nextFocus: string[];
    if (reviewFocus.includes(item)) {
      nextFocus = reviewFocus.filter(f => f !== item);
    } else {
      nextFocus = [...reviewFocus, item];
    }
    setReviewFocus(nextFocus);
    if (errors.reviewFocus && nextFocus.length > 0) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy.reviewFocus;
        return copy;
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const check = validateFileUpload(file, undefined, currentLang);
      if (!check.isValid && check.error) {
        setErrors(prev => ({ ...prev, uploadedFile: check.error! }));
        setUploadedFile(null);
      } else {
        setUploadedFile(file);
        setErrors(prev => {
          const copy = { ...prev };
          delete copy.uploadedFile;
          return copy;
        });
      }
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setErrors(prev => ({
      ...prev,
      uploadedFile: isHi 
        ? 'फ़्लोर प्लान / लेआउट फ़ाइल अपलोड करना अनिवार्य है।' 
        : 'Property layout / blueprint file upload is strictly mandatory before proceeding.'
    }));
  };

  const validateCurrentStep = (step: number): boolean => {
    setServerError(null);
    if (step === 1) {
      const v = validateLayoutStep1(propertyType, currentLang);
      if (!v.isValid && v.error) {
        setErrors(prev => ({ ...prev, propertyType: v.error! }));
        return false;
      }
      setErrors(prev => {
        const copy = { ...prev };
        delete copy.propertyType;
        return copy;
      });
      return true;
    }

    if (step === 2) {
      const v = validateLayoutStep2(facingDirection, facingDegree, currentLang);
      if (!v.isValid && v.error) {
        setErrors(prev => ({ ...prev, facingDirection: v.error! }));
        return false;
      }
      setErrors(prev => {
        const copy = { ...prev };
        delete copy.facingDirection;
        return copy;
      });
      return true;
    }

    if (step === 3) {
      const v = validateLayoutStep3(reviewFocus, currentLang);
      if (!v.isValid && v.error) {
        setErrors(prev => ({ ...prev, reviewFocus: v.error! }));
        return false;
      }
      setErrors(prev => {
        const copy = { ...prev };
        delete copy.reviewFocus;
        return copy;
      });
      return true;
    }

    if (step === 4) {
      const vFile = validateFileUpload(uploadedFile, undefined, currentLang);
      const vName = validateName(clientName, currentLang);
      const vPhone = validatePhone(clientContact, currentLang);
      const newErrors: Record<string, string> = {};

      if (!vFile.isValid && vFile.error) newErrors.uploadedFile = vFile.error;
      if (!vName.isValid && vName.error) newErrors.clientName = vName.error;
      if (!vPhone.isValid && vPhone.error) newErrors.clientContact = vPhone.error;

      if (Object.keys(newErrors).length > 0) {
        setErrors(prev => ({ ...prev, ...newErrors }));
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = (targetStep: number) => {
    // If moving backwards, always permit
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
      return;
    }

    // Step-by-step locking: user must satisfy current step to advance
    if (!validateCurrentStep(currentStep)) {
      return;
    }

    setCurrentStep(targetStep);
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

  const handleComplete = async (target: 'checkout' | 'whatsapp') => {
    setServerError(null);

    // Validate ALL steps strictly before unlocking checkout/whatsapp
    const valResult = validateLayoutAllSteps({
      propertyType,
      facingDirection,
      facingDegree,
      reviewFocus,
      clientName,
      clientContact,
      uploadedFile,
      fileName: uploadedFile?.name
    }, currentLang);

    if (!valResult.isValid) {
      setErrors(valResult.errors);
      if (valResult.firstInvalidStep && valResult.firstInvalidStep !== currentStep) {
        setCurrentStep(valResult.firstInvalidStep);
      }
      return;
    }

    setIsSubmitting(true);

    // Server-side validation dispatch
    try {
      const res = await fetch('/api/intake/layout-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyType,
          facingDirection,
          facingDegree,
          reviewFocus,
          clientName,
          clientContact,
          fileName: uploadedFile?.name,
          fileSize: uploadedFile?.size,
          notes,
          lang: currentLang
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setServerError(data.message || (isHi ? 'सर्वर सत्यापन में त्रुटि आई। कृपया विवरण जांचें।' : 'Server validation failed. Please check your inputs.'));
        setIsSubmitting(false);
        return;
      }
    } catch {
      // Offline fallback: client validation passed, proceed safely
    } finally {
      setIsSubmitting(false);
    }

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
        `• Client Phone: ${clientContact}\n` +
        `• Blueprint File: ${uploadedFile ? uploadedFile.name : 'Ready for direct transmission'}\n\n` +
        `Kindly advise on the next directional review slot.`
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
              <span>{isHi ? "सत्यापित वास्तु इनटेक विज़ार्ड" : "Verified Spatial Intake Wizard"}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100">
              {isHi ? "अपने परिसर का फ़्लोर प्लान मूल्यांकन सबमिट करें" : "Submit Your Layout for Directional Review"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              {isHi 
                ? "4 सरल चरणों में अपनी संपत्ति का विवरण दर्ज करें। सभी फ़ाइलें एंड-टू-एंड एन्क्रिप्टेड व गोपनीय हैं।"
                : "Complete 4 mandatory verified steps. Architectural blueprints are processed under strict DPDP confidentiality."}
            </p>

            {/* Stepper Progress Bar */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleNext(step)}
                    aria-label={`Step ${step}`}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep === step
                        ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400'
                        : currentStep > step
                        ? 'bg-emerald-600 text-white cursor-pointer'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-pointer'
                    }`}
                  >
                    {currentStep > step ? <Check className="w-4 h-4" /> : step}
                  </button>
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
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-[#F3E5AB]">
                  {isHi ? "चरण 1: संपत्ति का प्रकार चुनें *" : "Step 1: Select Your Property Classification *"}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {isHi ? "अनिवार्य चयन" : "Mandatory Selection"}
                </span>
              </div>

              {errors.propertyType && (
                <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center space-x-2 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span className="font-semibold">{errors.propertyType}</span>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {propertyTypes.map((item) => {
                  const Icon = item.icon;
                  const itemValue = isHi ? item.titleHi : item.titleEn;
                  const isSelected = propertyType === itemValue;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setPropertyType(itemValue);
                        if (errors.propertyType) {
                          setErrors(prev => {
                            const copy = { ...prev };
                            delete copy.propertyType;
                            return copy;
                          });
                        }
                      }}
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
                  onClick={() => handleNext(2)}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all flex items-center space-x-2 cursor-pointer ${
                    propertyType
                      ? 'bg-amber-600 hover:bg-amber-500'
                      : 'bg-amber-600/70 hover:bg-amber-600'
                  }`}
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
                  {isHi ? "चरण 2: मुख्य द्वार की दिशा व कोण *" : "Step 2: Main Entrance Cardinal Facing *"}
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

              {errors.facingDirection && (
                <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center space-x-2 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span className="font-semibold">{errors.facingDirection}</span>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
                <div>
                  <label htmlFor="facing-direction-select" className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                    {isHi ? "मुख्य प्रवेश द्वार की दिशा चुनें *" : "Select Main Entrance Orientation *"}
                  </label>
                  <select
                    id="facing-direction-select"
                    value={facingDirection}
                    onChange={(e) => {
                      setFacingDirection(e.target.value);
                      if (errors.facingDirection) {
                        setErrors(prev => {
                          const copy = { ...prev };
                          delete copy.facingDirection;
                          return copy;
                        });
                      }
                    }}
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
                    {isHi ? "स्मार्टफोन कंपास द्वारा प्राप्त सटीक डिग्री (वैकल्पिक, 0°-359°)" : "Exact Compass Degree from Smartphone (Optional, 0°-359°)"}
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      id="facing-degree-input"
                      type="number"
                      min="0"
                      max="359"
                      value={facingDegree ?? ''}
                      onChange={(e) => {
                        const deg = Number(e.target.value);
                        setFacingDegree(deg);
                        if (errors.facingDirection && deg >= 0 && deg <= 359) {
                          setErrors(prev => {
                            const copy = { ...prev };
                            delete copy.facingDirection;
                            return copy;
                          });
                        }
                      }}
                      placeholder="e.g. 45"
                      className="w-32 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {isHi ? "0° से 359° के बीच" : "Degrees (0° to 359°)"}
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
                  onClick={() => handleNext(3)}
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
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-[#F3E5AB]">
                  {isHi ? "चरण 3: प्राथमिक समीक्षा क्षेत्र (कम से कम 1 चुनें) *" : "Step 3: Primary Areas for Directional Review *"}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {isHi ? "न्यूनतम 1 अनिवार्य" : "At least 1 required"}
                </span>
              </div>

              {errors.reviewFocus && (
                <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center space-x-2 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span className="font-semibold">{errors.reviewFocus}</span>
                </div>
              )}

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
                  onClick={() => handleNext(4)}
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
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-[#F3E5AB]">
                  {isHi ? "चरण 4: अनिवार्य फ़ाइल अपलोड व संपर्क विवरण *" : "Step 4: Mandatory Blueprint Upload & Contact Details *"}
                </h3>
                <span className="text-[11px] text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  {isHi ? "सख्त सत्यापन" : "Strict Validation"}
                </span>
              </div>

              {serverError && (
                <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center space-x-2 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span className="font-semibold">{serverError}</span>
                </div>
              )}

              {/* Upload Box (Strictly Mandatory) */}
              <div className="space-y-1.5">
                <div className={`p-6 rounded-2xl border-2 border-dashed text-center relative transition-colors ${
                  errors.uploadedFile
                    ? 'border-red-500/70 bg-red-50/20 dark:bg-red-950/20'
                    : uploadedFile
                    ? 'border-emerald-500/60 bg-emerald-50/20 dark:bg-emerald-950/20'
                    : 'border-amber-500/40 bg-amber-50/30 dark:bg-slate-950/40 hover:bg-amber-50/50'
                }`}>
                  {uploadedFile ? (
                    <FileCheck className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  ) : (
                    <UploadCloud className="w-10 h-10 text-amber-600 mx-auto mb-2" />
                  )}
                  
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {uploadedFile 
                      ? uploadedFile.name 
                      : (isHi ? "फ़्लोर प्लान / संपत्ति का नक्शा अपलोड करें *" : "Upload Architectural PDF, PNG, JPG, or DWG Blueprint *")}
                  </h4>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                    {isHi 
                      ? "अनिवार्य फ़ाइल (PDF, PNG, JPG, DWG, अधिकतम 25 MB)। सटीक दिशांकन हेतु आवश्यक।" 
                      : "Strictly mandatory (PDF, PNG, JPG, JPEG, DWG up to 25 MB) for directional review."}
                  </p>

                  {!uploadedFile && (
                    <input
                      type="file"
                      required
                      accept=".pdf,.png,.jpg,.jpeg,.dwg"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      aria-label="Upload floor plan file"
                    />
                  )}

                  {uploadedFile && (
                    <div className="mt-3 inline-flex items-center space-x-2">
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-500/20">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{isHi ? "फ़ाइल सत्यापित व संलग्न" : "File verified & attached"} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </span>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400"
                        title={isHi ? "फ़ाइल हटाएं" : "Remove file"}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {errors.uploadedFile && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-semibold flex items-center gap-1.5 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.uploadedFile}</span>
                  </p>
                )}
              </div>

              {/* Client Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="intake-client-name" className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {isHi ? "आपका पूरा नाम *" : "Your Full Name *"}
                  </label>
                  <input
                    id="intake-client-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => {
                      const val = e.target.value;
                      setClientName(val);
                      if (errors.clientName && val.trim().length >= 3) {
                        const check = validateName(val, currentLang);
                        if (check.isValid) {
                          setErrors(prev => {
                            const copy = { ...prev };
                            delete copy.clientName;
                            return copy;
                          });
                        }
                      }
                    }}
                    placeholder="e.g. Rajesh Sharma"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 ${
                      errors.clientName 
                        ? 'border-red-500 focus:ring-red-400' 
                        : 'border-slate-300 dark:border-slate-700 focus:ring-amber-500'
                    }`}
                  />
                  {errors.clientName && (
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.clientName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="intake-client-contact" className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {isHi ? "व्हाट्सएप / 10-अंकीय मोबाइल नंबर *" : "WhatsApp / 10-Digit Mobile Number *"}
                  </label>
                  <input
                    id="intake-client-contact"
                    type="tel"
                    required
                    value={clientContact}
                    onChange={(e) => {
                      const val = e.target.value;
                      setClientContact(val);
                      if (errors.clientContact) {
                        const check = validatePhone(val, currentLang);
                        if (check.isValid) {
                          setErrors(prev => {
                            const copy = { ...prev };
                            delete copy.clientContact;
                            return copy;
                          });
                        }
                      }
                    }}
                    placeholder="e.g. 9876543210"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 ${
                      errors.clientContact 
                        ? 'border-red-500 focus:ring-red-400' 
                        : 'border-slate-300 dark:border-slate-700 focus:ring-amber-500'
                    }`}
                  />
                  {errors.clientContact && (
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.clientContact}</span>
                    </p>
                  )}
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
                    disabled={isSubmitting}
                    onClick={() => handleComplete('whatsapp')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-emerald-900 dark:text-emerald-200 bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isHi ? "व्हाट्सएप इनटेक पर भेजें" : "Submit via WhatsApp Desk"}</span>
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleComplete('checkout')}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isSubmitting ? (isHi ? "सत्यापित हो रहा है..." : "Verifying...") : (isHi ? "परामर्श स्लॉट बुक करें" : "Confirm & Proceed to Booking")}</span>
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
