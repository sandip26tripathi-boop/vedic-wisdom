import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../data/translations.ts';
import { Language } from '../types/index.ts';
import { vastu16Zones, rashiList, VastuZoneInfo } from '../data/vastuZones.ts';
import { 
  Compass, 
  Moon, 
  Sun, 
  Sparkles, 
  Send, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  ShieldCheck, 
  RefreshCw, 
  Share2, 
  Zap, 
  TrendingUp, 
  Layers, 
  Info, 
  Calendar, 
  Grid, 
  Lock, 
  ArrowRight, 
  PhoneCall, 
  MessageCircle, 
  RotateCw, 
  Globe,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext.tsx';
import { GlobalPlaceSearch, SelectedPlace } from './ui/GlobalPlaceSearch.tsx';
import { 
  computeExactKundli, 
  VedicKundliResult, 
  GrahaInfo, 
  searchLocalCities, 
  resolveCityCoordinates, 
  CityLocation 
} from '../data/vedicAstroCalc.ts';

interface AstroToolsEngineProps {
  currentLang: Language;
  onOpenBooking: (serviceType?: string) => void;
}

export const AstroToolsEngine: React.FC<AstroToolsEngineProps> = ({
  currentLang,
  onOpenBooking,
}) => {
  const { user, isPhoneVerified, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'kundli' | 'panchang' | 'vastu'>('kundli');
  
  // Lead Generation States
  const [userName, setUserName] = useState(user?.name || '');
  const [userPhone, setUserPhone] = useState(user?.phone || '');
  const [userCity, setUserCity] = useState(user?.pob || '');
  const [isUnlocked, setIsUnlocked] = useState(Boolean(user && user.isPhoneVerified));

  useEffect(() => {
    if (user && user.isPhoneVerified) {
      setIsUnlocked(true);
    }
  }, [user]);

  // Kundli Input States
  const [kundliName, setKundliName] = useState('Arjun Singhania');
  const [dob, setDob] = useState('1992-08-18');
  const [tob, setTob] = useState('06:45');
  const [pob, setPob] = useState('Bhopal, Madhya Pradesh, India');
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lon: number; tzOffset: number }>({
    lat: 23.2599,
    lon: 77.4126,
    tzOffset: 5.5
  });

  // Exact Astronomical Vedic Kundli State
  const [kundliResult, setKundliResult] = useState<VedicKundliResult>(() => {
    return computeExactKundli('1992-08-18', '06:45', 23.2599, 77.4126, 5.5);
  });
  const [calculatedLagna, setCalculatedLagna] = useState(kundliResult.lagnaNameEn);
  const [calculatedMoon, setCalculatedMoon] = useState(kundliResult.moonSignEn);
  const [calculatedNakshatra, setCalculatedNakshatra] = useState(kundliResult.nakshatraEn);

  // Vastu Scanner States
  const [selectedZone, setSelectedZone] = useState<VastuZoneInfo>(vastu16Zones[0]);

  // Live Compass & Rotary Heading States
  const [isLiveCompass, setIsLiveCompass] = useState(false);
  const [currentHeading, setCurrentHeading] = useState(135); // Default SE (Agneya)
  const [compassError, setCompassError] = useState<string | null>(null);

  // Lead Generation City Autocomplete
  const [leadCitySuggestions, setLeadCitySuggestions] = useState<string[]>([]);

  const handleHeadingChange = (deg: number) => {
    const normalized = Math.round((deg + 360) % 360);
    setCurrentHeading(normalized);
    const matched = vastu16Zones.reduce((prev, curr) => {
      const pDeg = parseFloat(prev.degrees.replace(/[^0-9.]/g, '')) || 0;
      const cDeg = parseFloat(curr.degrees.replace(/[^0-9.]/g, '')) || 0;
      const pDiff = Math.min(Math.abs(pDeg - normalized), 360 - Math.abs(pDeg - normalized));
      const cDiff = Math.min(Math.abs(cDeg - normalized), 360 - Math.abs(cDeg - normalized));
      return cDiff < pDiff ? curr : prev;
    });
    if (matched) {
      setSelectedZone(matched);
    }
  };

  const toggleLiveCompass = async () => {
    if (isLiveCompass) {
      setIsLiveCompass(false);
      return;
    }
    setCompassError(null);
    if (typeof (DeviceOrientationEvent as any)?.requestPermission === 'function') {
      try {
        const res = await (DeviceOrientationEvent as any).requestPermission();
        if (res !== 'granted') {
          setCompassError(currentLang === 'en' ? 'Motion sensor access denied. Use manual rotary slider.' : 'सेंसर अनुमति अस्वीकृत। मैन्युअल स्लाइडर उपयोग करें।');
          return;
        }
      } catch {
        setCompassError(currentLang === 'en' ? 'Compass sensor not available. Use manual rotary slider.' : 'कंपास सेंसर उपलब्ध नहीं है।');
        return;
      }
    }
    setIsLiveCompass(true);
  };

  useEffect(() => {
    if (!isLiveCompass) return;

    const onOrientation = (e: DeviceOrientationEvent) => {
      let heading: number | null = null;
      if ((e as any).webkitCompassHeading !== undefined) {
        heading = (e as any).webkitCompassHeading;
      } else if (e.alpha !== null) {
        heading = (360 - e.alpha) % 360;
      }
      if (heading !== null) {
        handleHeadingChange(Math.round(heading));
      }
    };

    window.addEventListener('deviceorientation', onOrientation, true);
    return () => {
      window.removeEventListener('deviceorientation', onOrientation, true);
    };
  }, [isLiveCompass]);

  const t = translations[currentLang];
  const tools = t.tools;

  const handleUnlockLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && user.isPhoneVerified) {
      setIsUnlocked(true);
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}
      return;
    }

    openAuthModal({
      prefilledData: {
        name: userName || kundliName,
        phone: userPhone,
        dob,
        tob,
        pob: userCity || pob,
        latitude: selectedCoords.lat,
        longitude: selectedCoords.lon,
        tzOffset: selectedCoords.tzOffset,
        rashi: calculatedMoon,
        lagna: calculatedLagna,
        nakshatra: calculatedNakshatra
      },
      message: currentLang === 'en'
        ? 'Verify your mobile OTP to save this Kundli to your Client Portal & unlock the full 24-page dossier.'
        : 'इस कुंडली को क्लाइंट पोर्टल में सुरक्षित करने व 24-पृष्ठ की रिपोर्ट अनलॉक करने हेतु ओटीपी सत्यापित करें।',
      redirectToTab: 'kundli',
      onSuccess: () => {
        setIsUnlocked(true);
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.7 }
          });
        } catch {}
      }
    });
  };

  const handleComputeKundli = (e: React.FormEvent) => {
    e.preventDefault();
    // Automatically resolve city coordinates if user typed without explicitly clicking dropdown
    const resolved = resolveCityCoordinates(pob);
    let lat = selectedCoords.lat;
    let lon = selectedCoords.lon;
    let tzOffset = selectedCoords.tzOffset;

    // If pob doesn't match current selected coords name, use resolved from DB
    if (resolved && pob.trim()) {
      const topMatch = searchLocalCities(pob, 1)[0];
      if (topMatch) {
        lat = topMatch.lat;
        lon = topMatch.lon;
        tzOffset = topMatch.tzOffset;
        setSelectedCoords({ lat, lon, tzOffset });
      } else if (resolved) {
        lat = resolved.lat;
        lon = resolved.lon;
        tzOffset = resolved.tzOffset;
        setSelectedCoords({ lat, lon, tzOffset });
      }
    }

    // Traditional astronomical Vedic computation using Chitrapaksha / Lahiri Ayanamsa
    const result = computeExactKundli(
      dob,
      tob,
      lat,
      lon,
      tzOffset
    );
    setKundliResult(result);
    setCalculatedLagna(result.lagnaNameEn);
    setCalculatedMoon(result.moonSignEn);
    setCalculatedNakshatra(result.nakshatraEn);

    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {}
  };

  const today = new Date();
  const dayOfWeek = today.getDay();

  const rahuKaalTimes = [
    { start: '16:30', end: '18:00' }, // Sun
    { start: '07:30', end: '09:00' }, // Mon
    { start: '15:00', end: '16:30' }, // Tue
    { start: '12:00', end: '13:30' }, // Wed
    { start: '13:30', end: '15:00' }, // Thu
    { start: '10:30', end: '12:00' }, // Fri
    { start: '09:00', end: '10:30' }  // Sat
  ];

  const choghadiyaWindows = [
    { name: currentLang === 'en' ? 'Shubh (Auspicious)' : 'शुभ', time: '06:15 AM – 07:45 AM', nature: 'Best for travel, inauguration & meetings' },
    { name: currentLang === 'en' ? 'Labh (High Gain)' : 'लाभ', time: '09:15 AM – 10:45 AM', nature: 'Best for banking, commercial sales & profit' },
    { name: currentLang === 'en' ? 'Amrit (Nectar)' : 'अमृत', time: '10:45 AM – 12:15 PM', nature: 'Universal victory in high-stakes negotiations' },
    { name: currentLang === 'en' ? 'Char (Dynamic)' : 'चर', time: '01:45 PM – 03:15 PM', nature: 'Logistics, dispatch & technology operations' }
  ];

  const shareToWhatsApp = () => {
    let message = '';
    if (activeTab === 'kundli') {
      message = `*Vedic Wisdom Kundli Dossier*\nName: ${kundliName}\nDOB: ${dob} ${tob}\nPlace: ${pob}\nLagna: ${calculatedLagna}\nMoon Sign: ${calculatedMoon}\nNakshatra: ${calculatedNakshatra}\nWhatsApp: ${userPhone || 'Registered'}\n\nPlease provide detailed KP Cuspal Interlink analysis.`;
    } else if (activeTab === 'panchang') {
      message = `*Vedic Wisdom Enterprise Panchang Inquiry*\nDate: ${today.toLocaleDateString()}\nName: ${userName || 'Corporate Client'}\nCity: ${userCity || 'India'}\nPlease advise auspicious muhurta for enterprise signing.`;
    } else {
      message = `*Vedic Wisdom 16-Zone Vastu Report*\nZone: ${selectedZone.nameEn} (${selectedZone.degrees})\nScore: ${selectedZone.healthScore}%\nClient: ${userName || 'Industrial Owner'}\nCity: ${userCity || 'India'}\nPlease provide non-demolition remedies.`;
    }

    window.open(`https://wa.me/919009448601?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="free-calculators" className="py-20 bg-slate-50 dark:bg-[#0F172A] border-t border-[#D4AF37]/20 transition-colors duration-300 w-full max-w-full overflow-x-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-bold text-[#B45309] dark:text-[#F3E5AB]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{tools.sectionBadge}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {tools.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {tools.subtitle}
          </p>

          {/* 3 Main Engine Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('kundli')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'kundli'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>{tools.tabKundli}</span>
            </button>

            <button
              onClick={() => setActiveTab('panchang')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'panchang'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{tools.tabPanchang}</span>
            </button>

            <button
              onClick={() => setActiveTab('vastu')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'vastu'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{tools.tabVastu}</span>
            </button>
          </div>
        </div>

        {/* Lead Capture Banner if not unlocked */}
        {!isUnlocked && (
          <div className="max-w-3xl mx-auto mb-10 p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#D4AF37]/15 to-amber-500/10 border border-[#D4AF37]/40 shadow-xl text-center">
            <div className="flex items-center justify-center space-x-2 text-xs font-bold text-[#B45309] dark:text-[#F3E5AB] uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'Unlock Instant Full Vedic Intelligence Report' : 'निःशुल्क पूर्ण वैदिक रिपोर्ट अनलॉक करें'}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-5">
              {tools.leadNotice}
            </p>

            <form onSubmit={handleUnlockLead} className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              <div>
                <label htmlFor="lead-user-name" className="sr-only">
                  {tools.form.name}
                </label>
                <input
                  id="lead-user-name"
                  type="text"
                  required
                  aria-label={tools.form.name}
                  placeholder={tools.form.name}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label htmlFor="lead-user-phone" className="sr-only">
                  {tools.form.phone}
                </label>
                <input
                  id="lead-user-phone"
                  type="tel"
                  required
                  aria-label={tools.form.phone}
                  placeholder={tools.form.phone}
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="relative">
                <label htmlFor="lead-user-city" className="sr-only">
                  {tools.form.city}
                </label>
                <input
                  id="lead-user-city"
                  type="text"
                  aria-label={tools.form.city}
                  placeholder={tools.form.city}
                  value={userCity}
                  onChange={(e) => {
                    const val = e.target.value;
                    setUserCity(val);
                    if (val.trim().length > 0) {
                      setLeadCitySuggestions(searchLocalCities(val, 5).map(c => c.displayName));
                    } else {
                      setLeadCitySuggestions([]);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                />
                {leadCitySuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-white dark:bg-slate-800 border border-[#D4AF37]/40 rounded-xl shadow-lg overflow-hidden text-left">
                    {leadCitySuggestions.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => { setUserCity(c); setLeadCitySuggestions([]); }}
                        className="w-full px-3 py-1.5 text-xs text-left hover:bg-[#D4AF37]/15 text-slate-800 dark:text-slate-200 cursor-pointer"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="sm:col-span-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-md shadow-[#D4AF37]/25 transition-all cursor-pointer"
                >
                  {tools.form.calculateBtn}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 1: Instant Birth Chart & Kundli Calculator */}
        {activeTab === 'kundli' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Birth Input Form */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Grid className="w-5 h-5 text-[#D4AF37]" />
                  <span>{currentLang === 'en' ? 'Birth Chart Inputs' : 'जन्म कुंडली इनपुट'}</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                  LAHIRI AYANAMSA
                </span>
              </div>

              <form onSubmit={handleComputeKundli} className="space-y-3.5">
                <div>
                  <label htmlFor="kundli-user-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {tools.kundliEngine.nameLabel}
                  </label>
                  <input
                    id="kundli-user-name"
                    type="text"
                    required
                    aria-label={tools.kundliEngine.nameLabel}
                    value={kundliName}
                    onChange={(e) => setKundliName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="kundli-dob" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {tools.kundliEngine.dobLabel}
                    </label>
                    <input
                      id="kundli-dob"
                      type="date"
                      required
                      aria-label={tools.kundliEngine.dobLabel}
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="kundli-tob" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {tools.kundliEngine.tobLabel}
                    </label>
                    <input
                      id="kundli-tob"
                      type="time"
                      required
                      aria-label={tools.kundliEngine.tobLabel}
                      value={tob}
                      onChange={(e) => setTob(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="global-place-search-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {tools.kundliEngine.pobLabel} *
                    </label>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <Globe className="w-3 h-3 text-[#D4AF37]" />
                      <span>{currentLang === 'en' ? 'Open-Meteo Global GPS' : 'वैश्विक जीपीएस खोज'}</span>
                    </span>
                  </div>

                  <GlobalPlaceSearch
                    value={pob}
                    onChange={(place: SelectedPlace) => {
                      setPob(place.cityName);
                      setSelectedCoords({
                        lat: place.latitude,
                        lon: place.longitude,
                        tzOffset: place.tzOffset
                      });
                    }}
                    onRawChange={(raw) => setPob(raw)}
                    currentLang={currentLang}
                    placeholder={currentLang === 'en' ? 'Search global city (e.g. Bhopal, London, Dubai, New York)...' : 'विश्व के किसी भी नगर/शहर का नाम लिखें...'}
                    required
                    showQuickPills={true}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 transition-all shadow-md cursor-pointer"
                >
                  {tools.kundliEngine.generateBtn}
                </button>
              </form>

              {isUnlocked && (
                <button
                  onClick={shareToWhatsApp}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm cursor-pointer mt-2"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{tools.form.whatsappShare}</span>
                </button>
              )}
            </div>

            {/* Right Kundli Chart Display */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-[#D4AF37]/30 shadow-2xl relative">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {tools.kundliEngine.chartTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {kundliName} • {dob} {tob} • {pob}
                  </p>
                </div>
                <span className="text-[10px] px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] font-bold">
                  D1 RASHI (LAGNA)
                </span>
              </div>

              {/* Natal Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 uppercase">{tools.kundliEngine.lagnaHeading}</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{kundliResult.lagnaNameEn} ({kundliResult.lagnaDegree}°)</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 uppercase">{tools.kundliEngine.moonSignHeading}</div>
                  <div className="font-bold text-[#B45309] dark:text-[#D4AF37] mt-0.5">{kundliResult.moonSignEn} ({kundliResult.moonDegree}°)</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 uppercase">{tools.kundliEngine.sunSignHeading}</div>
                  <div className="font-bold text-amber-600 dark:text-amber-400 mt-0.5">{kundliResult.planets.find(p => p.symbol === 'Su')?.rashiNameEn.split(' ')[0] || 'Leo'}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 uppercase">{tools.kundliEngine.nakshatraHeading}</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 truncate">{kundliResult.nakshatraEn}</div>
                </div>
              </div>

              {/* Authentic North-Indian Diamond Kundli Chart Graphic (Crisp Vector SVG) */}
              <div className="my-6 flex items-center justify-center">
                <div className="relative w-full max-w-[310px] sm:max-w-sm aspect-square bg-gradient-to-br from-amber-500/5 via-slate-900/10 to-amber-950/20 border-2 border-[#D4AF37] rounded-2xl p-2 shadow-2xl overflow-hidden">
                  <svg viewBox="0 0 320 320" className="w-full h-full select-none" fill="none">
                    {/* Outer Box */}
                    <rect x="8" y="8" width="304" height="304" stroke="#D4AF37" strokeWidth="2.5" className="fill-amber-500/5 dark:fill-amber-950/30" />
                    
                    {/* Diagonals */}
                    <line x1="8" y1="8" x2="312" y2="312" stroke="#D4AF37" strokeWidth="1.6" />
                    <line x1="312" y1="8" x2="8" y2="312" stroke="#D4AF37" strokeWidth="1.6" />
                    
                    {/* Inner Diamond (Kendra bhavas 1, 4, 7, 10) */}
                    <polygon points="160,8 312,160 160,312 8,160" stroke="#B45309" strokeWidth="2" className="fill-amber-500/10 dark:fill-amber-900/20" />

                    {/* House 1: Top Center Diamond (Lagna) */}
                    <text x="160" y="52" textAnchor="middle" className="fill-[#D4AF37] font-cinzel font-black text-[15px]">{kundliResult.bhavaRashis[0]}</text>
                    <text x="160" y="74" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 font-sans text-[10px] font-semibold">H1 (Lagna)</text>
                    <text x="160" y="96" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-mono font-bold text-[11px]">
                      {kundliResult.houses[0]?.planets.map(p => p.symbol + (p.isRetrograde ? '(R)' : '')).join(' ') || '—'}
                    </text>

                    {/* House 2: Top-Left Upper Triangle */}
                    <text x="88" y="32" textAnchor="middle" className="fill-[#D4AF37] font-cinzel font-black text-[12px]">{kundliResult.bhavaRashis[1]}</text>
                    <text x="88" y="47" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500 font-sans text-[8px]">H2</text>
                    <text x="88" y="63" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 font-mono font-bold text-[9px]">
                      {kundliResult.houses[1]?.planets.map(p => p.symbol + (p.isRetrograde ? '(R)' : '')).join(' ')}
                    </text>

                    {/* House 3: Top-Left Side Triangle */}
                    <text x="48" y="78" textAnchor="middle" className="fill-[#D4AF37] font-cinzel font-black text-[12px]">{kundliResult.bhavaRashis[2]}</text>
                    <text x="48" y="92" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500 font-sans text-[8px]">H3</text>
                    <text x="48" y="108" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 font-mono font-bold text-[9px]">
                      {kundliResult.houses[2]?.planets.map(p => p.symbol + (p.isRetrograde ? '(R)' : '')).join(' ')}
                    </text>

                    {/* House 4: Left Diamond (Sukha) */}
                    <text x="48" y="156" textAnchor="middle" className="fill-[#D4AF37] font-cinzel font-black text-[14px]">{kundliResult.bhavaRashis[3]}</text>
                    <text x="88" y="145" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 font-sans text-[10px] font-semibold">H4</text>
                    <text x="88" y="168" textAnchor="middle" className="fill-sky-500 font-mono font-bold text-[11px]">
                      {kundliResult.houses[3]?.planets.map(p => p.symbol + (p.isRetrograde ? '(R)' : '')).join(' ') || '—'}
                    </text>

                    {/* House 5: Bottom-Left Side Triangle */}
                    <text x="48" y="222" textAnchor="middle" className="fill-[#D4AF37] font-cinzel font-black text-[12px]">{kundliResult.bhavaRashis[4]}</text>
                    <text x="48" y="236" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500 font-sans text-[8px]">H5</text>
                    <text x="48" y="252" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 font-mono font-bold text-[9px]">
                      {kundliResult.houses[4]?.planets.map(p => p.symbol + (p.isRetrograde ? '(R)' : '')).join(' ')}
                    </text>

                    {/* House 6: Bottom-Left Lower Triangle */}
                    <text x="88" y="260" textAnchor="middle" className="fill-[#D4AF37] font-cinzel font-black text-[12px]">{kundliResult.bhavaRashis[5]}</text>
                    <text x="88" y="274" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500 font-sans text-[8px]">H6</text>
                    <text x="88" y="290" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 font-mono font-bold text-[9px]">
                      {kundliResult.houses[5]?.planets.map(p => p.symbol + (p.isRetrograde ? '(R)' : '')).join(' ')}
                    </text>

                    {/* House 7: Bottom Diamond (Kalatra) */}
                    <text x="160" y="215" textAnchor="middle" className="fill-[#D4AF37] font-cinzel font-black text-[15px]">{kundliResult.bhavaRashis[6]}</text>
                    <text x="160" y="235" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 font-sans text-[10px] font-semibold">H7</text>
                    <text x="160" y="258" textAnchor="middle" className="fill-purple-400 font-mono font-bold text-[11px]">
                      {kundliResult.houses[6]?.planets.map(p => p.symbol + (p.isRetrograde ? '(R)' : '')).join(' ') || '—'}
                    </text>

                    {/* House 8: Bottom-Right Lower Triangle */}
                    <text x="232" y="260" textAnchor="middle" className="fill-[#D4AF37] font-cinzel font-black text-[12px]">{kundliResult.bhavaRashis[7]}</text>
                    <text x="232" y="274" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500 font-sans text-[8px]">H8</text>
                    <text x="232" y="290" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 font-mono font-bold text-[9px]">
                      {kundliResult.houses[7]?.planets.map(p => p.symbol + (p.isRetrograde ? '(R)' : '')).join(' ')}
                    </text>

                    {/* House 9: Bottom-Right Side Triangle */}
                    <text x="272" y="222" textAnchor="middle" className="fill-[#D4AF37] font-cinzel font-black text-[12px]">{kundliResult.bhavaRashis[8]}</text>
                    <text x="272" y="236" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500 font-sans text-[8px]">H9</text>
                    <text x="272" y="252" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 font-mono font-bold text-[9px]">
                      {kundliResult.houses[8]?.planets.map(p => p.symbol + (p.isRetrograde ? '(R)' : '')).join(' ')}
                    </text>

                    {/* House 10: Right Diamond (Karma) */}
                    <text x="272" y="156" textAnchor="middle" className="fill-[#D4AF37] font-cinzel font-black text-[14px]">{kundliResult.bhavaRashis[9]}</text>
                    <text x="232" y="145" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 font-sans text-[10px] font-semibold">H10</text>
                    <text x="232" y="168" textAnchor="middle" className="fill-amber-500 font-mono font-bold text-[11px]">
                      {kundliResult.houses[9]?.planets.map(p => p.symbol + (p.isRetrograde ? '(R)' : '')).join(' ') || '—'}
                    </text>

                    {/* House 11: Top-Right Side Triangle */}
                    <text x="272" y="78" textAnchor="middle" className="fill-[#D4AF37] font-cinzel font-black text-[12px]">{kundliResult.bhavaRashis[10]}</text>
                    <text x="272" y="92" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500 font-sans text-[8px]">H11</text>
                    <text x="272" y="108" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 font-mono font-bold text-[9px]">
                      {kundliResult.houses[10]?.planets.map(p => p.symbol + (p.isRetrograde ? '(R)' : '')).join(' ')}
                    </text>

                    {/* House 12: Top-Right Upper Triangle */}
                    <text x="232" y="32" textAnchor="middle" className="fill-[#D4AF37] font-cinzel font-black text-[12px]">{kundliResult.bhavaRashis[11]}</text>
                    <text x="232" y="47" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500 font-sans text-[8px]">H12</text>
                    <text x="232" y="63" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 font-mono font-bold text-[9px]">
                      {kundliResult.houses[11]?.planets.map(p => p.symbol + (p.isRetrograde ? '(R)' : '')).join(' ')}
                    </text>
                  </svg>
                </div>
              </div>

              {/* Exact Planetary Degrees & Vimshottari Dasha Coordinates Grid */}
              <div className="my-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-[#D4AF37]/30">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-2.5">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{currentLang === 'en' ? 'Astronomical Graha Coordinates (Chitrapaksha / Lahiri)' : 'ग्रह स्पष्ट स्थिति (लाहिड़ी अयनांश)'}</span>
                  </span>
                  <span className="text-[10px] font-mono text-amber-950 dark:text-[#F3E5AB] font-bold">
                    Ayanamsa: {kundliResult.ayanamsa}°
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px]">
                  {kundliResult.planets.map((p, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 text-center">
                      <div className="font-bold text-[#D4AF37]">{p.symbol} - {currentLang === 'en' ? p.nameEn.split(' ')[0] : p.nameHi}</div>
                      <div className="text-slate-800 dark:text-slate-100 font-semibold truncate">{p.rashiNameEn.split(' ')[0]}</div>
                      <div className="text-slate-600 dark:text-slate-300 font-mono text-[9px] font-semibold">{p.degInRashi.toFixed(1)}° • H{p.house}</div>
                    </div>
                  ))}
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center col-span-2 sm:col-span-1">
                    <div className="font-bold text-amber-950 dark:text-[#F3E5AB]">Vimshottari Dasha</div>
                    <div className="text-[10px] font-semibold text-slate-800 dark:text-slate-200">{kundliResult.vimshottariLordEn}</div>
                    <div className="text-[9px] font-mono text-emerald-800 dark:text-emerald-300 font-bold">{kundliResult.balanceYears} Yrs Bal</div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Verification Action for Kundli */}
              <div className="mb-4">
                <a
                  href={`https://wa.me/919009448601?text=${encodeURIComponent(`*Janam Kundli Offline Analysis Request - Vedic Wisdom*\nName: ${kundliName}\nDOB: ${dob} ${tob}\nPlace: ${pob}\nComputed Lagna: ${calculatedLagna}\nMoon Sign: ${calculatedMoon}\nNakshatra: ${calculatedNakshatra}\n\nPlease verify Cuspal Sub-Sub Lords and schedule an offline 1-on-1 consultation session with Master Sandeep K. Tripathi.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={currentLang === 'en' ? 'Send Kundli to WhatsApp for 1-on-1 Offline Analysis' : 'ऑफ़लाइन विश्लेषण हेतु कुंडली व्हाट्सएप पर भेजें'}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-950" />
                  <span>{currentLang === 'en' ? 'Send Kundli to WhatsApp for 1-on-1 Offline Analysis' : 'ऑफ़लाइन विश्लेषण हेतु कुंडली व्हाट्सएप पर भेजें'}</span>
                </a>
              </div>

              <div className="text-center text-[11px] text-slate-500 dark:text-slate-400">
                {tools.kundliEngine.chartDisclaimer}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500">
                  {currentLang === 'en' ? 'Want full 1-on-1 KP Cuspal Interlink verification?' : 'संदीप त्रिपाठी जी से व्यक्तिगत केपी विश्लेषण चाहिए?'}
                </span>
                <button
                  onClick={() => onOpenBooking('astrology')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 transition-all shadow-sm cursor-pointer"
                >
                  {currentLang === 'en' ? 'Book KP 1-on-1 Session' : 'केपी परामर्श बुक करें'}
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Daily Enterprise Panchang & Choghadiya */}
        {activeTab === 'panchang' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-[#D4AF37]/30 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-slate-900 dark:text-white">
                    {tools.panchangEngine.heading}
                  </h3>
                  <div className="text-xs text-amber-950 dark:text-[#F3E5AB] font-bold mt-0.5">
                    {today.toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/15 text-amber-950 dark:text-[#F3E5AB] font-bold">
                  SURYA SIDDHANTA
                </span>
              </div>

              {/* 4 Pillars of Panchang */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold">{tools.panchangEngine.tithiLabel}</span>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">Shukla Paksha Dashami</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold">{tools.panchangEngine.nakshatraLabel}</span>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">Pushya (Lord Saturn)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold">{tools.panchangEngine.yogaLabel}</span>
                  <div className="font-bold text-emerald-800 dark:text-emerald-300 mt-0.5">Siddha Yoga (Highly Auspicious)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold">{tools.panchangEngine.karanaLabel}</span>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">Gara Karana</div>
                </div>
              </div>

              {/* Critical Rahu Kaal & Shubh Hora */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25">
                  <div className="flex items-center space-x-1.5 text-rose-700 dark:text-rose-400 text-xs font-bold mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{tools.panchangEngine.rahuKaal}</span>
                  </div>
                  <div className="font-mono text-base font-extrabold text-rose-800 dark:text-rose-300">
                    {rahuKaalTimes[dayOfWeek].start} – {rahuKaalTimes[dayOfWeek].end}
                  </div>
                  <div className="text-[10px] text-rose-600/80 dark:text-rose-400/80 mt-1">
                    {currentLang === 'en' ? 'Avoid contract signing & cash disbursals.' : 'अनुबंध हस्ताक्षर व बड़े भुगतान से बचें।'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                  <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-1">
                    <Zap className="w-4 h-4" />
                    <span>{tools.panchangEngine.shubhHora}</span>
                  </div>
                  <div className="font-mono text-base font-extrabold text-emerald-800 dark:text-emerald-300">
                    09:15 AM – 10:45 AM
                  </div>
                  <div className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 mt-1">
                    {currentLang === 'en' ? 'Peak deal closure & partnership launch.' : 'डील्स लॉक करने हेतु स्वर्ण मुहूर्त।'}
                  </div>
                </div>
              </div>

              {/* Executive Advisory */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed">
                <div className="font-bold text-[#B45309] dark:text-[#D4AF37] mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>{tools.panchangEngine.advisory}</span>
                </div>
                {currentLang === 'en'
                  ? 'Pushya Nakshatra aligned with Siddha Yoga creates a golden window for executing long-term manufacturing agreements, purchasing heavy plant machinery, and filing patents.'
                  : 'पुष्य नक्षत्र और सिद्ध योग का यह शुभ संयोग दीर्घकालिक अनुबंधों, भारी मशीनरी क्रय और बौद्धिक संपदा (पेटेंट्स) रजिस्ट्रेशन हेतु अत्यंत लाभकारी है।'}
              </div>
            </div>

            {/* Right Choghadiya Windows */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-[#D4AF37]/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-cinzel text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                  <span>{tools.panchangEngine.choghadiyaHeading}</span>
                </h3>
                <span className="text-xs text-slate-500">Day Muhurta</span>
              </div>

              <div className="space-y-3">
                {choghadiyaWindows.map((chog, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{chog.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{chog.nature}</div>
                    </div>
                    <div className="font-mono font-bold text-xs sm:text-sm text-[#B45309] dark:text-[#F3E5AB]">
                      {chog.time}
                    </div>
                  </div>
                ))}
              </div>

              {isUnlocked && (
                <button
                  onClick={shareToWhatsApp}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm cursor-pointer mt-4"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{tools.form.whatsappShare}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Directional Health Vastu Compass */}
        {activeTab === 'vastu' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 16-Zone Compass Selector */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#D4AF37]" />
                  <span>{tools.vastuEngine.heading}</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] font-bold">
                  16 ZONES
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400">
                {tools.vastuEngine.subheading}
              </p>

              {/* Interactive Degree & Live Compass Sensor Controller */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-[#D4AF37]/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <Compass className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                      {currentLang === 'en' ? 'Live Compass / Degree Dial' : 'लाइव कंपास / डिग्री डायल'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={toggleLiveCompass}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isLiveCompass
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-[#D4AF37]/20 text-[#B45309] dark:text-[#F3E5AB] hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40'
                    }`}
                  >
                    <Compass className={`w-3 h-3 ${isLiveCompass ? 'animate-spin' : ''}`} />
                    <span>{isLiveCompass ? (currentLang === 'en' ? 'Sensor Active' : 'सेंसर चालू') : (currentLang === 'en' ? '📱 Use Live Compass' : '📱 लाइव कंपास चालू')}</span>
                  </button>
                </div>

                {compassError && (
                  <div className="text-[10px] text-amber-600 dark:text-amber-300 bg-amber-500/10 p-2 rounded-lg">
                    {compassError}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300 text-[11px] font-medium">{currentLang === 'en' ? 'Rotary Heading:' : 'घूर्णन दिशा:'}</span>
                  <span className="font-mono font-bold text-xs text-amber-950 dark:text-[#F3E5AB]">
                    {currentHeading}° • {selectedZone.nameEn} ({selectedZone.id})
                  </span>
                </div>

                <label htmlFor="compass-rotary-heading" className="sr-only">
                  {currentLang === 'en' ? 'Rotary Compass Heading in degrees' : 'कम्पास दिशा अंशों में'}
                </label>
                <input
                  id="compass-rotary-heading"
                  type="range"
                  min="0"
                  max="359"
                  value={currentHeading}
                  aria-label={currentLang === 'en' ? 'Rotary Compass Heading in degrees' : 'कम्पास दिशा अंशों में'}
                  onChange={(e) => handleHeadingChange(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-[9px] text-slate-600 dark:text-slate-300 font-mono font-medium">
                  <span>0° N</span>
                  <span>90° E</span>
                  <span>180° S</span>
                  <span>270° W</span>
                  <span>359°</span>
                </div>
              </div>

              {/* 16-Zone Quick Select Grid */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {vastu16Zones.map((zone) => {
                  const isSelected = selectedZone.id === zone.id;
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setSelectedZone(zone)}
                      style={{ borderColor: isSelected ? zone.color : undefined }}
                      className={`p-2 rounded-xl text-center text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-100 dark:bg-slate-800 shadow-md ring-2 ring-[#D4AF37]'
                          : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="text-[11px] font-mono" style={{ color: zone.color }}>
                        {zone.id}
                      </div>
                      <div className="text-[10px] truncate max-w-full font-medium">
                        {currentLang === 'en' ? zone.nameEn.split(' ')[0] : zone.nameHi.split(' ')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Central Brahmasthan Info */}
              <div className="p-3.5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs">
                <div className="font-bold text-[#B45309] dark:text-[#F3E5AB] flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{currentLang === 'en' ? 'Brahmasthan (Cosmic Nexus)' : 'ब्रह्मस्थान (कॉस्मिक नाभि)'}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {currentLang === 'en'
                    ? 'The central zone must remain free of heavy machinery, septic pits, or pillars to maintain factory solvency.'
                    : 'केंद्रीय भाग को भारी मशीनरी, सेप्टिक टैंक या खंभों से मुक्त रखना आवश्यक है।'}
                </p>
              </div>

              {isUnlocked && (
                <button
                  onClick={shareToWhatsApp}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{tools.form.whatsappShare}</span>
                </button>
              )}
            </div>

            {/* Right Display Panel: Inspected Sector Diagnosis */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-[#D4AF37]/30 shadow-2xl relative">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-sm"
                    style={{ backgroundColor: selectedZone.color }}
                  >
                    {selectedZone.id}
                  </div>
                  <div>
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {currentLang === 'en' ? selectedZone.nameEn : selectedZone.nameHi}
                    </h3>
                    <div className="text-xs text-slate-600 dark:text-slate-300 font-mono font-medium">
                      Axis: {selectedZone.degrees} • Element: {currentLang === 'en' ? selectedZone.elementEn : selectedZone.elementHi}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-600 dark:text-slate-300 uppercase font-semibold">{tools.vastuEngine.zoneHealthScore}</div>
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-800 dark:text-emerald-300">
                    {selectedZone.healthScore}%
                  </div>
                </div>
              </div>

              {/* Significance Box */}
              <div className="my-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm">
                <div className="font-bold text-slate-800 dark:text-slate-100 mb-1">
                  {currentLang === 'en' ? 'Spatial & Commercial Impact:' : 'स्थानिक व व्यावसायिक प्रभाव:'}
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentLang === 'en' ? selectedZone.significanceEn : selectedZone.significanceHi}
                </p>
                <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-amber-950 dark:text-[#F3E5AB]">
                    {currentLang === 'en' ? 'Ideal Alignment: ' : 'आदर्श अलाइनमेंट: '}
                  </span>
                  <span>{currentLang === 'en' ? selectedZone.idealForEn : selectedZone.idealForHi}</span>
                </div>
              </div>

              {/* Defect vs 0% Demolition Remedy */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25">
                  <div className="flex items-center space-x-2 text-amber-900 dark:text-amber-200 text-xs font-bold mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <span>{tools.vastuEngine.flawIdentified}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {currentLang === 'en' ? selectedZone.commonDefectEn : selectedZone.commonDefectHi}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                  <div className="flex items-center space-x-2 text-emerald-900 dark:text-emerald-200 text-xs font-bold mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <span>{tools.vastuEngine.remedyRecommended}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                    {currentLang === 'en' ? selectedZone.remedyEn : selectedZone.remedyHi}
                  </p>
                </div>
              </div>

              {/* CTA Strip */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {currentLang === 'en' ? 'Need an on-site Lecher Antenna factory audit?' : 'क्या आपकी फैक्ट्री में ऑन-साइट लेचर एंटीना जांच चाहिए?'}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/919009448601?text=${encodeURIComponent(`*Offline Factory / Site Vastu Audit Inquiry - Vedic Wisdom*\nInspected Zone: ${selectedZone.nameEn} (${selectedZone.degrees} - ${selectedZone.id})\nIdentified Concern: ${selectedZone.commonDefectEn}\nClient: ${userName || 'Property Owner'}\nCity: ${userCity || 'India'}\n\nPlease schedule an on-site visit with Lecher Antenna for physical 0% non-demolition energy rectification.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={currentLang === 'en' ? 'Contact WhatsApp Desk for Factory Vastu Audit Inquiry' : 'फैक्ट्री वास्तु जांच हेतु व्हाट्सएप डेस्क से संपर्क करें'}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-950" />
                    <span>WhatsApp Desk</span>
                  </a>
                  <button
                    onClick={() => onOpenBooking('industrial')}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 transition-all shadow-sm cursor-pointer"
                  >
                    {currentLang === 'en' ? 'Schedule Factory Audit' : 'फैक्ट्री ऑडिट शेड्यूल करें'}
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
