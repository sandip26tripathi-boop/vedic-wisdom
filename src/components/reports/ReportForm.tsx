import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { Language } from '../../types/index.ts';
import { SriYantraMotif } from '../SriYantraMotif.tsx';
import { 
  FileText, 
  Sparkles, 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw,
  Search,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface ReportFormProps {
  currentLang: Language;
  onReportGenerated: (reportData: any) => void;
}

const COMMON_CITIES = [
  'Bhopal, MP, India', 'Indore, MP, India', 'Jabalpur, MP, India', 'Gwalior, MP, India', 'Ujjain, MP, India',
  'Mumbai, Maharashtra, India', 'Pune, Maharashtra, India', 'Nagpur, Maharashtra, India', 'Nashik, Maharashtra, India', 'Thane, Maharashtra, India',
  'Delhi NCR, India', 'Gurugram, Haryana, India', 'Noida, UP, India', 'Faridabad, Haryana, India', 'Ghaziabad, UP, India',
  'Ahmedabad, Gujarat, India', 'Surat, Gujarat, India', 'Vadodara, Gujarat, India', 'Rajkot, Gujarat, India',
  'Bengaluru, Karnataka, India', 'Hyderabad, Telangana, India', 'Chennai, Tamil Nadu, India', 'Coimbatore, Tamil Nadu, India',
  'Kolkata, West Bengal, India', 'Jaipur, Rajasthan, India', 'Jodhpur, Rajasthan, India', 'Udaipur, Rajasthan, India',
  'Lucknow, UP, India', 'Kanpur, UP, India', 'Varanasi, UP, India', 'Prayagraj, UP, India', 'Agra, UP, India',
  'Chandigarh, India', 'Ludhiana, Punjab, India', 'Amritsar, Punjab, India', 'Dehradun, Uttarakhand, India',
  'Patna, Bihar, India', 'Ranchi, Jharkhand, India', 'Jamshedpur, Jharkhand, India', 'Bhubaneswar, Odisha, India',
  'Raipur, Chhattisgarh, India', 'Kochi, Kerala, India', 'Visakhapatnam, AP, India', 'Vijayawada, AP, India',
  'Dubai, United Arab Emirates', 'Abu Dhabi, UAE', 'Sharjah, UAE', 'London, United Kingdom', 'Singapore', 'New York, NY, USA'
];

export const ReportForm: React.FC<ReportFormProps> = ({
  currentLang,
  onReportGenerated
}) => {
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const [fullName, setFullName] = useState(user?.name || '');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Corporate Entity'>('Male');
  const [dob, setDob] = useState(user?.dob || '1990-06-18');
  const [tob, setTob] = useState(user?.tob || '07:30');
  const [pob, setPob] = useState(user?.pob || 'Bhopal, MP, India');
  const [focusArea, setFocusArea] = useState('Career, Enterprise Command & Status (10th Cusp)');
  
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCityChange = (val: string) => {
    setPob(val);
    if (val.trim().length > 1) {
      const filtered = COMMON_CITIES.filter(c => c.toLowerCase().includes(val.toLowerCase()));
      setCitySuggestions(filtered);
    } else {
      setCitySuggestions([]);
    }
  };

  const handleCitySelect = (cityName: string) => {
    setPob(cityName);
    setCitySuggestions([]);
  };

  const triggerGeneration = async (clientName: string, clientDob: string, clientTob: string, clientPob: string) => {
    setIsGenerating(true);
    setErrorMsg('');
    setGenerationStep(1);

    // Cosmic steps animation
    const stepInterval = setInterval(() => {
      setGenerationStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 900);

    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: clientName,
          gender,
          dob: clientDob,
          tob: clientTob,
          pob: clientPob,
          focusArea
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate report from server.');
      }

      const data = await response.json();
      clearInterval(stepInterval);
      setGenerationStep(4);

      setTimeout(() => {
        setIsGenerating(false);
        onReportGenerated(data);
      }, 600);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsGenerating(false);
      setErrorMsg(err.message || 'Error generating report. Please retry.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !dob || !tob) {
      setErrorMsg(currentLang === 'en' ? 'Please fill in all required birth details.' : 'कृपया सभी आवश्यक जन्म विवरण भरें।');
      return;
    }

    // Auth-Gate Trigger (Requirement Module 1.1)
    if (!isAuthenticated) {
      openAuthModal({
        prefilledData: {
          name: fullName,
          dob,
          tob,
          pob
        },
        message: currentLang === 'en'
          ? 'Verify your mobile via 6-digit OTP to authenticate and initiate your AI-Powered Vedic Dossier.'
          : 'अपनी एआई-संचालित वैदिक रिपोर्ट आरंभ करने हेतु 6-अंकों के ओटीपी से मोबाइल सत्यापित करें।'
      });
      return;
    }

    // Authenticated user generates directly
    triggerGeneration(fullName, dob, tob, pob);
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl bg-white dark:bg-[#111827] border border-[#D4AF37]/35 shadow-2xl overflow-hidden transition-all text-slate-800 dark:text-slate-100">
      
      {/* Top Gold Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309]" />

      {/* Form Header */}
      <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-1 rounded-xl bg-gradient-to-br from-[#D4AF37]/30 to-transparent border border-[#D4AF37]/40">
            <SriYantraMotif className="w-10 h-10" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] mb-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>AI Digital Dossier Engine</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Generate AI Astro-Vastu Dossier
            </h3>
            <p className="text-xs text-slate-500">
              High-Precision KP Cuspal Interlink & 16-Zone Spatial Diagnostic Report
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[10px] font-mono text-slate-400 block">DELIVERY</span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Instant PDF & On-Screen
          </span>
        </div>
      </div>

      {/* Form Body or Loading Animation */}
      <div className="p-6 sm:p-8">
        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {isGenerating ? (
          <div className="py-12 text-center space-y-6 animate-in fade-in duration-300">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/20 animate-ping" />
              <div className="absolute inset-2 rounded-full border-2 border-t-[#D4AF37] border-r-[#B45309] border-b-transparent border-l-transparent animate-spin" />
              <SriYantraMotif className="w-12 h-12" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h4 className="font-cinzel text-lg font-bold text-slate-900 dark:text-white">
                {generationStep === 1 && 'Calculating Planetary Coordinates & Placidus Cusps...'}
                {generationStep === 2 && 'Executing KP Sub-Sub Lord Interlink Matrix...'}
                {generationStep === 3 && 'Mapping 16 Vastu Zones & Non-Demolition Metal Stabilizers...'}
                {generationStep === 4 && 'Synthesizing Formal Dossier & Cryptographic Verification...'}
              </h4>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {generationStep === 1 && 'Resolving Degree-Minute-Second Ephemeris & Lagna Lord'}
                {generationStep === 2 && 'Analyzing 2-6-10-11 Wealth Combinations with Gemini AI'}
                {generationStep === 3 && 'Cross-referencing Elemental Balancing & Cardinal Portals'}
                {generationStep === 4 && 'Formatting Executive Printable PDF Dossier'}
              </p>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-4">
                <div 
                  className="h-full bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] transition-all duration-500"
                  style={{ width: `${generationStep * 25}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Full Name & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-8">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name / Enterprise Executive *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singhania"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Profile Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Corporate Entity">Corporate Entity / Business</option>
                </select>
              </div>
            </div>

            {/* Row 2: Date of Birth & Exact Time of Birth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Date of Birth (Gregorian) *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Exact Time of Birth (HH:MM) *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="time"
                    required
                    value={tob}
                    onChange={(e) => setTob(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  *Accurate time ensures exact Sub-Sub Lord house boundary calculation.
                </span>
              </div>
            </div>

            {/* Row 3: Place of Birth with Search Auto-Complete */}
            <div className="relative">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Place of Birth (City, State, Country) *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Type to search city, e.g. Bhopal, Indore, Mumbai..."
                  value={pob}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              {/* City Suggestions Dropdown */}
              {citySuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 overflow-hidden">
                  {citySuggestions.map((city, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCitySelect(city)}
                      className="w-full text-left px-4 py-2 text-xs text-slate-800 dark:text-slate-200 hover:bg-[#D4AF37]/15 flex items-center justify-between"
                    >
                      <span>{city}</span>
                      <Search className="w-3 h-3 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Row 4: Focus Area Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Analytical Focus Area *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  { id: 'Career, Enterprise Command & Status (10th Cusp)', label: '📈 Career & Enterprise Command (10th Cusp)' },
                  { id: 'Wealth Accumulation & Liquid Cash Flow (2nd & 11th Cusp)', label: '💰 Wealth & Liquid Cash Flow (2-11 Cusps)' },
                  { id: 'Marriage, Partnerships & Joint Ventures (7th Cusp)', label: '💍 Partnerships & Joint Ventures (7th Cusp)' },
                  { id: 'Health, Energy Vitality & Longevity (1st & 6th Cusp)', label: '🌿 Health & Vitality (1st & 6th Cusp)' },
                  { id: 'Full Life & Spatial Vastu Blueprint (Comprehensive 360°)', label: '🏛️ Full Life & Spatial Vastu Blueprint (360°)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFocusArea(item.id)}
                    className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all cursor-pointer ${
                      focusArea === item.id
                        ? 'bg-amber-500/10 border-[#D4AF37] text-slate-900 dark:text-[#F3E5AB] ring-1 ring-[#D4AF37]'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Auth Gating Notice if not logged in */}
            {!isAuthenticated && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5 text-xs text-amber-800 dark:text-amber-200">
                <Lock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  <strong>Verification Step:</strong> Clicking below triggers a quick 6-digit OTP verification on your mobile to securely generate and store your dossier.
                </span>
              </div>
            )}

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-md shadow-[#D4AF37]/25 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAuthenticated ? 'Generate My AI Astro-Vastu Dossier' : 'Verify Mobile OTP & Generate Dossier'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

      {/* Footer Security Badges */}
      <div className="px-6 py-3.5 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Mathematical Placidus Ephemeris Engine
        </span>
        <span>100% Non-Demolition Vastu Prescriptions</span>
      </div>
    </div>
  );
};
