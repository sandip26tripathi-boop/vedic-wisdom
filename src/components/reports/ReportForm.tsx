import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { Language } from '../../types/index.ts';
import { SriYantraMotif } from '../SriYantraMotif.tsx';
import { GlobalPlaceSearch, SelectedPlace } from '../ui/GlobalPlaceSearch.tsx';
import { 
  Sparkles, 
  User, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';

interface ReportFormProps {
  currentLang: Language;
  onReportGenerated: (reportData: any) => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({
  currentLang,
  onReportGenerated
}) => {
  const { user, isPhoneVerified, openAuthModal } = useAuth();

  const [fullName, setFullName] = useState(user?.name || '');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Corporate Entity'>('Male');
  const [dob, setDob] = useState(user?.dob || '1990-06-18');
  const [tob, setTob] = useState(user?.tob || '07:30');
  const [pob, setPob] = useState(user?.pob || 'Bhopal, Madhya Pradesh, India');
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
    timezone: string;
    tzOffset: number;
  }>({
    lat: user?.latitude || 23.2599,
    lon: user?.longitude || 77.4126,
    timezone: user?.timezone || 'Asia/Kolkata',
    tzOffset: user?.tzOffset ?? 5.5
  });

  const [focusArea, setFocusArea] = useState('Career, Enterprise Command & Status (10th Cusp)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePlaceSelect = (place: SelectedPlace) => {
    setPob(place.cityName);
    setCoordinates({
      lat: place.latitude,
      lon: place.longitude,
      timezone: place.timezone,
      tzOffset: place.tzOffset
    });
  };

  const triggerGeneration = async (
    clientName: string,
    clientDob: string,
    clientTob: string,
    clientPob: string,
    coords = coordinates
  ) => {
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
          latitude: coords.lat,
          longitude: coords.lon,
          timezone: coords.timezone,
          tzOffset: coords.tzOffset,
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
      setErrorMsg(
        currentLang === 'en'
          ? 'Please fill in all required birth details.'
          : 'कृपया सभी आवश्यक जन्म विवरण भरें।'
      );
      return;
    }

    // Task 1: Strict Auth & Mobile OTP Verification Funnel Gate
    // If user is unauthenticated or phone number is not verified, intercept immediately
    if (!user || !user.isPhoneVerified) {
      openAuthModal({
        prefilledData: {
          name: fullName,
          dob,
          tob,
          pob,
          latitude: coordinates.lat,
          longitude: coordinates.lon,
          timezone: coordinates.timezone,
          tzOffset: coordinates.tzOffset
        },
        message: currentLang === 'en'
          ? 'Authenticate and complete mandatory 6-digit mobile OTP verification to generate and unlock your comprehensive AI Vedic Dossier.'
          : 'अपनी विस्तृत एआई वैदिक रिपोर्ट अनलॉक करने हेतु प्रमाणीकरण व 6-अंकों का मोबाइल ओटीपी सत्यापित करें।',
        onSuccess: (verifiedUser) => {
          // Instant unlock and execution upon OTP completion
          triggerGeneration(
            verifiedUser.name || fullName,
            dob,
            tob,
            pob,
            coordinates
          );
        }
      });
      return;
    }

    // Already authenticated and phone-verified user proceeds directly
    triggerGeneration(fullName, dob, tob, pob, coordinates);
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
                {generationStep === 1 && `Resolving GPS Coordinates (${coordinates.lat}°N, ${coordinates.lon}°E) & Ayanamsa`}
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

            {/* Row 3: Universal Global Place Search with Coordinates Auto-populate (Task 2) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Place of Birth (Global Auto-Complete & GPS Coordinates) *
                </label>
                <span className="text-[10px] text-[#B45309] dark:text-[#F3E5AB] flex items-center gap-1 font-medium">
                  <Globe className="w-3 h-3 text-[#D4AF37]" />
                  <span>Open-Meteo World Geocoding</span>
                </span>
              </div>

              <GlobalPlaceSearch
                value={pob}
                onChange={handlePlaceSelect}
                onRawChange={(raw) => setPob(raw)}
                currentLang={currentLang}
                placeholder="Search world birth city (e.g. Bhopal, Indore, London, Dubai, New York)..."
                required
              />
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

            {/* Auth Gating Notice if not verified */}
            {(!user || !user.isPhoneVerified) && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5 text-xs text-amber-800 dark:text-amber-200">
                <Lock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  <strong>Strict Verification Gate:</strong> Clicking below triggers a rapid 2-step verification (Google/Email + 6-digit Mobile OTP) to authenticate and immediately unlock your report.
                </span>
              </div>
            )}

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-md shadow-[#D4AF37]/25 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {user && user.isPhoneVerified
                  ? 'Generate My AI Astro-Vastu Dossier'
                  : 'Verify Mobile OTP & Unlock Dossier'}
              </span>
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
