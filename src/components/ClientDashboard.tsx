import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { Language, ClientPortalTab } from '../types/index.ts';
import { SriYantraMotif } from './SriYantraMotif.tsx';
import ravindraPhoto from '../assets/ravindra-pathak.jpg';
import sandeepPhoto from '../assets/sandeep-tripathi.jpg';
import raviPhoto from '../assets/ravi-kumar-nigam.jpg';
import { 
  sampleFloorplans, 
  mockActiveConsultations, 
  mockPurchasedReports, 
  mockEnrolledCourses, 
  mockKpCuspalTable 
} from '../data/mockClientData.ts';
import { 
  Compass, 
  ShieldCheck, 
  Layers, 
  FileText, 
  GraduationCap, 
  MessageCircle, 
  ArrowLeft, 
  LogOut, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Calendar, 
  Clock, 
  Building2, 
  Factory, 
  Home, 
  Upload, 
  Maximize2, 
  Zap, 
  PhoneCall, 
  FileDown, 
  Eye, 
  PlayCircle,
  HelpCircle,
  Star,
  Activity,
  Flame,
  Droplets,
  Wind,
  Globe
} from 'lucide-react';

interface ClientDashboardProps {
  currentLang: Language;
  onReturnToWebsite: () => void;
  onOpenBooking: (serviceType?: string) => void;
  onOpenGenerateReport?: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  currentLang,
  onReturnToWebsite,
  onOpenBooking,
  onOpenGenerateReport
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<ClientPortalTab>('overview');

  // AI Scanner State
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [customFloorplanUrl, setCustomFloorplanUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [selectedZone, setSelectedZone] = useState<string | null>('SE');
  const [facingAngle, setFacingAngle] = useState(45);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // Active Floor Plan
  const activePlan = sampleFloorplans[selectedPlanIndex];

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  React.useEffect(() => {
    return () => {
      if (customFloorplanUrl) {
        URL.revokeObjectURL(customFloorplanUrl);
      }
    };
  }, [customFloorplanUrl]);

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert(currentLang === 'en' ? 'Please upload an image file (PNG, JPG, SVG, WebP).' : 'कृपया एक मान्य छवि फ़ाइल अपलोड करें।');
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        alert(currentLang === 'en' ? 'File size exceeds 15MB limit.' : 'फ़ाइल का आकार 15MB से अधिक है।');
        return;
      }
      if (customFloorplanUrl) {
        URL.revokeObjectURL(customFloorplanUrl);
      }
      const url = URL.createObjectURL(file);
      setCustomFloorplanUrl(url);
      handleSimulateScan();
    }
  };

  const handleDownloadPdf = (reportTitle: string) => {
    setDownloadSuccessToast(reportTitle);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 4000);
  };

  const selectedZoneDetails = activePlan.zonesData.find(z => z.zone === selectedZone) || activePlan.zonesData[0];

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-slate-900 text-white border border-[#D4AF37] shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <FileDown className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <div>
            <p className="text-xs font-bold text-[#F3E5AB]">Export Generated Successfully</p>
            <p className="text-[11px] text-slate-300">{downloadSuccessToast} downloaded to device.</p>
          </div>
        </div>
      )}

      {/* Top Enterprise Portal Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border-b border-[#D4AF37]/25 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Portal Brand & Back to Main */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onReturnToWebsite}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                title="Return to Vedic Wisdom public portal"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Website</span>
              </button>

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

              <div className="flex items-center space-x-3">
                <div className="p-1 rounded-lg bg-gradient-to-br from-[#D4AF37]/30 to-transparent border border-[#D4AF37]/40">
                  <SriYantraMotif className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-slate-900 dark:text-white">
                      CLIENT <span className="gold-gradient-text">PORTAL</span>
                    </span>
                    <span className="hidden md:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/20 text-[#B45309] dark:text-[#F3E5AB] border border-[#D4AF37]/40">
                      {user?.clientTier || 'Enterprise VIP'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                    Vedic Wisdom • Bhopal, MP, India
                  </p>
                </div>
              </div>
            </div>

            {/* Right: VIP Desk Hotline & User Controls */}
            <div className="flex items-center space-x-3">
              
              {/* WhatsApp VIP Direct Desk */}
              <a
                href={`https://wa.me/919009448601?text=${encodeURIComponent(`Namaste Sandeep Ji, Ravindra Ji & Ravi Ji, I am accessing my Vedic Wisdom Portal (Member ID: ${user?.memberId || 'VW-VIP'}). Please connect regarding my consultation.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-500/25 transition-all"
                title="Direct VIP Concierge on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">VIP Desk (+91 90094 48601)</span>
              </a>

              {/* User Avatar & Logout */}
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B45309] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'V'}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {user?.name || 'Vedic Client'}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    {user?.memberId || 'VW-ENT-2026'}
                  </div>
                </div>

                <button
                  onClick={() => logout()}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Sign out of Client Portal"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Segmented Tab Navigation Strip */}
          <div className="flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-100 dark:border-slate-800/80 no-scrollbar text-xs font-semibold">
            {[
              { id: 'overview', label: currentLang === 'en' ? 'Overview' : 'डैशबोर्ड अवलोकन', icon: Activity },
              { id: 'kundli', label: currentLang === 'en' ? 'My Astro Profile & Kundli' : 'मेरी जन्म कुंडली व दशा', icon: Star },
              { id: 'audits', label: currentLang === 'en' ? 'Active Spatial Audits' : 'सक्रिय स्थानिक ऑडिट्स', icon: Building2 },
              { id: 'scanner', label: currentLang === 'en' ? 'AI Spatial Vastu Studio' : 'AI वास्तु स्कैनर व ब्लूप्रिंट', icon: Compass },
              { id: 'reports', label: currentLang === 'en' ? 'Dossiers & Downloads' : 'डिजिटल रिपोर्ट्स व डाउनलोड्स', icon: FileText },
              { id: 'courses', label: currentLang === 'en' ? 'Enrolled Academy LMS' : 'अकादमी कोर्सेज व कक्षाएं', icon: GraduationCap }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ClientPortalTab)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW & EXECUTIVE DESK */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Executive Welcome Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-[#1E293B] to-[#0B0F19] text-white p-6 sm:p-8 border border-[#D4AF37]/30 shadow-xl">
              <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-15 pointer-events-none">
                <SriYantraMotif className="w-96 h-96" />
              </div>

              <div className="relative z-10 max-w-3xl space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-semibold text-[#F3E5AB]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Verified Vedic Enterprise Client Portal</span>
                </div>

                <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Welcome, <span className="gold-gradient-text">{user?.name || 'Executive Seeker'}</span>
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Your enterprise spaces and personal destiny trajectories are actively monitored under the direct research oversight of <strong className="text-white">Master Sandeep K. Tripathi</strong>, <strong className="text-white">Ravindra Pathak</strong> and <strong className="text-white">Ravi Kumar Nigam</strong>.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('scanner')}
                    className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] text-slate-950 font-bold text-xs flex items-center gap-2 hover:opacity-95 shadow-md cursor-pointer transition-all"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Open AI Spatial Vastu Studio</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('kundli')}
                    className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-xs flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Star className="w-4 h-4 text-[#D4AF37]" />
                    <span>View Kundli & Vimshottari Dasha</span>
                  </button>

                  <a
                    href="tel:+919009448601"
                    className="px-4 py-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-semibold text-xs flex items-center gap-2 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Bhopal Desk: +91 90094 48601</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div 
                onClick={() => setActiveTab('audits')}
                className="p-5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-[#D4AF37] shadow-xs cursor-pointer transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Active Audits</span>
                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">1 Plant</div>
                <div className="text-xs text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Remedy Matrix Issued (Stage 3)</span>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('kundli')}
                className="p-5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-[#D4AF37] shadow-xs cursor-pointer transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Current Dasha</span>
                  <Star className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">Saturn - Mercury</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>2-6-10-11 Wealth Trigger Active</span>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('reports')}
                className="p-5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-[#D4AF37] shadow-xs cursor-pointer transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Ready Dossiers</span>
                  <FileText className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">3 Verified</div>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" />
                  <span>2026 Varshphal + CIL Matrix Ready</span>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('courses')}
                className="p-5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-[#D4AF37] shadow-xs cursor-pointer transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Academy Programs</span>
                  <GraduationCap className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">2 Enrolled</div>
                <div className="text-xs text-sky-600 dark:text-sky-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Next Live Class Saturday 8 PM</span>
                </div>
              </div>
            </div>

            {/* Leadership Desk Spotlight & Bhopal Office */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Mentors Card */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="font-cinzel text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                    <span>Direct Research Oversight & Mentors</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-500">Bhopal Head Office</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B45309] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm border border-[#D4AF37]/40 overflow-hidden">
                      <img
                        src={sandeepPhoto}
                        alt="Sandeep K. Tripathi"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Sandeep K. Tripathi
                      </h4>
                      <p className="text-xs text-[#B45309] dark:text-[#F3E5AB] font-medium">
                        Principal Researcher & Chief Educator
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        12+ Yrs KP Cuspal Interlink & Non-Demolition Energy Vastu Authority.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B45309] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm border border-[#D4AF37]/40 overflow-hidden">
                      <img
                        src={ravindraPhoto}
                        alt="Ravindra Pathak"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Ravindra Pathak
                      </h4>
                      <p className="text-xs text-[#B45309] dark:text-[#F3E5AB] font-medium">
                        Founder & Visionary Leader
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Institutional Spatial Alignment, Land Selection & Enterprise Strategy.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B45309] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm border border-[#D4AF37]/40 overflow-hidden">
                      <img
                        src={raviPhoto}
                        alt="Ravi Kumar Nigam"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Ravi Kumar Nigam
                      </h4>
                      <p className="text-xs text-[#B45309] dark:text-[#F3E5AB] font-medium">
                        Senior K.P. Astrologer (Age 63)
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        10+ Yrs Krishnamurti Padhdhati, Sub-Lord & Chart Auditing Specialist.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-amber-900 dark:text-amber-200">
                      Need a confidential 1-on-1 strategy call?
                    </span>
                    <p className="text-[11px] text-amber-700 dark:text-amber-300">
                      Direct booking priority available for verified enterprise accounts.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenBooking('industrial')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#B45309] hover:bg-[#AA820A] text-white font-bold text-xs cursor-pointer transition-all"
                  >
                    Request Review Session
                  </button>
                </div>
              </div>

              {/* Physical Head Office Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="font-cinzel text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#D4AF37]" />
                  <span>Headquarters & In-Person Audits</span>
                </h3>

                <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-start space-x-2">
                    <span className="font-semibold text-slate-900 dark:text-white shrink-0">Address:</span>
                    <span>178 Maple High Street, Bhopal, MP, India</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-semibold text-slate-900 dark:text-white shrink-0">Helpline:</span>
                    <a href="tel:+919009448601" className="text-[#B45309] dark:text-[#F3E5AB] font-bold hover:underline">
                      +91 90094 48601
                    </a>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-semibold text-slate-900 dark:text-white shrink-0">Official Email:</span>
                    <a href="mailto:ask.vedicwisdom@gmail.com" className="hover:underline">
                      ask.vedicwisdom@gmail.com
                    </a>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-semibold text-slate-900 dark:text-white shrink-0">Hours:</span>
                    <span>Mon – Sat, 10:00 AM – 7:30 PM IST</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href="https://wa.me/919009448601"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Research Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MY ASTRO PROFILE & KUNDLI */}
        {/* ========================================================================= */}
        {activeTab === 'kundli' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Header & Birth Verification */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] text-xs font-semibold mb-1">
                  <Star className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Traditional KP Placidus System (BTR Verified)</span>
                </div>
                <h3 className="font-cinzel text-xl font-bold text-slate-900 dark:text-white">
                  Horoscope of {user?.name || 'Vedic Client'}
                </h3>
                <p className="text-xs text-slate-500">
                  DOB: {user?.dob || '1984-06-18'} • TOB: {user?.tob || '06:45 AM'} • City: {user?.pob || 'Bhopal, MP'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadPdf('Complete 24-Page KP Kundli & Dasha Dossier')}
                  className="px-3.5 py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 border border-[#D4AF37]/40 cursor-pointer transition-all"
                >
                  <FileDown className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Export Full Kundli PDF</span>
                </button>
              </div>
            </div>

            {/* Core Significations Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-xs font-semibold text-slate-500 block mb-1">Lagna (Ascendant)</span>
                <span className="font-cinzel text-lg font-bold text-slate-900 dark:text-white">
                  {user?.lagna || 'Scorpio (वृश्चिक)'}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Lord: Mars (मंगल)</span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-xs font-semibold text-slate-500 block mb-1">Chandra Rashi (Moon)</span>
                <span className="font-cinzel text-lg font-bold text-[#B45309] dark:text-[#F3E5AB]">
                  {user?.rashi || 'Taurus (वृषभ)'}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Lord: Venus (Exalted Moon)</span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-xs font-semibold text-slate-500 block mb-1">Janma Nakshatra</span>
                <span className="font-cinzel text-lg font-bold text-slate-900 dark:text-white">
                  {user?.nakshatra || 'Rohini (Pada 2)'}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Deity: Brahma (Creation)</span>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-xs font-semibold text-slate-500 block mb-1">Current Mahadasha</span>
                <span className="font-cinzel text-lg font-bold text-purple-600 dark:text-purple-400">
                  Saturn (शनि)
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Antardasha: Mercury (बुध)</span>
              </div>
            </div>

            {/* Visual Kundli Chart & Vimshottari Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left 6 cols: Authentic North-Indian Kundli Diamond Diagram */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-cinzel text-sm font-bold text-slate-900 dark:text-white">
                    North-Indian Vedic Birth Chart (Lagna Kundli)
                  </h4>
                  <span className="text-[11px] font-semibold text-[#D4AF37]">Scorpio Ascendant (8)</span>
                </div>

                {/* SVG Kundli Graphic */}
                <div className="relative w-full max-w-[360px] mx-auto aspect-square p-2">
                  <svg viewBox="0 0 300 300" className="w-full h-full text-slate-800 dark:text-slate-100 font-sans">
                    {/* Outer Box */}
                    <rect x="10" y="10" width="280" height="280" fill="none" stroke="#D4AF37" strokeWidth="2" />
                    
                    {/* Inner Diamond */}
                    <polygon points="150,10 290,150 150,290 10,150" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                    
                    {/* Diagonals */}
                    <line x1="10" y1="10" x2="290" y2="290" stroke="#D4AF37" strokeWidth="1.2" opacity="0.6" />
                    <line x1="290" y1="10" x2="10" y2="290" stroke="#D4AF37" strokeWidth="1.2" opacity="0.6" />

                    {/* House Text Labels & Planetary Placements */}
                    {/* House 1 (Top Center Diamond) */}
                    <text x="150" y="55" textAnchor="middle" className="text-[12px] font-bold fill-[#B45309] dark:fill-[#F3E5AB]">1: 8 (Sco)</text>
                    <text x="150" y="75" textAnchor="middle" className="text-[11px] font-extrabold fill-slate-900 dark:fill-white">Lagna (Ke)</text>

                    {/* House 2 (Top Left) */}
                    <text x="80" y="50" textAnchor="middle" className="text-[11px] font-bold fill-slate-500">2: 9 (Sgr)</text>
                    <text x="80" y="70" textAnchor="middle" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">Ju (R)</text>

                    {/* House 3 (Left Top Triangle) */}
                    <text x="50" y="90" textAnchor="middle" className="text-[11px] font-bold fill-slate-500">3: 10</text>

                    {/* House 4 (Left Diamond) */}
                    <text x="80" y="150" textAnchor="middle" className="text-[12px] font-bold fill-[#B45309] dark:fill-[#F3E5AB]">4: 11 (Aqu)</text>
                    <text x="80" y="170" textAnchor="middle" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">Ve</text>

                    {/* House 5 (Left Bottom Triangle) */}
                    <text x="50" y="210" textAnchor="middle" className="text-[11px] font-bold fill-slate-500">5: 12</text>
                    <text x="50" y="230" textAnchor="middle" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">Ma</text>

                    {/* House 6 (Bottom Left Triangle) */}
                    <text x="80" y="250" textAnchor="middle" className="text-[11px] font-bold fill-slate-500">6: 1 (Ari)</text>

                    {/* House 7 (Bottom Center Diamond) */}
                    <text x="150" y="235" textAnchor="middle" className="text-[12px] font-bold fill-[#B45309] dark:fill-[#F3E5AB]">7: 2 (Tau)</text>
                    <text x="150" y="255" textAnchor="middle" className="text-[11px] font-extrabold fill-emerald-600 dark:fill-emerald-400">Mo (Ex) / Ra</text>

                    {/* House 8 (Bottom Right Triangle) */}
                    <text x="220" y="250" textAnchor="middle" className="text-[11px] font-bold fill-slate-500">8: 3 (Gem)</text>
                    <text x="220" y="270" textAnchor="middle" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">Su / Me</text>

                    {/* House 9 (Right Bottom Triangle) */}
                    <text x="250" y="210" textAnchor="middle" className="text-[11px] font-bold fill-slate-500">9: 4</text>

                    {/* House 10 (Right Diamond - Career/IPO) */}
                    <text x="220" y="150" textAnchor="middle" className="text-[12px] font-bold fill-[#B45309] dark:fill-[#F3E5AB]">10: 5 (Leo)</text>
                    <text x="220" y="170" textAnchor="middle" className="text-[11px] font-bold fill-amber-600 dark:fill-amber-300">10th Cusp</text>

                    {/* House 11 (Right Top Triangle - Gains) */}
                    <text x="250" y="90" textAnchor="middle" className="text-[11px] font-bold fill-slate-500">11: 6</text>
                    <text x="250" y="110" textAnchor="middle" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">Sa (Ex)</text>

                    {/* House 12 (Top Right Triangle) */}
                    <text x="220" y="50" textAnchor="middle" className="text-[11px] font-bold fill-slate-500">12: 7 (Lib)</text>
                  </svg>
                </div>

                <p className="text-xs text-center text-slate-500 italic">
                  *Exalted Moon in 7th House (Taurus) forming powerful Gajakesari Yoga with Jupiter.
                </p>
              </div>

              {/* Right 6 cols: Vimshottari Dasha & Micro Timing */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Dasha Tracker */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h4 className="font-cinzel text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      <span>Vimshottari Dasha Active Windows</span>
                    </h4>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      High Growth Phase
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Saturn Mahadasha (19 Years)</span>
                        <span className="text-slate-500">2018 — 2037 (42% Elapsed)</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B45309] rounded-full" style={{ width: '42%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-purple-600 dark:text-purple-400">Current Antardasha: Mercury (Budh)</span>
                        <span className="text-slate-500">Ends November 2026</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '75%' }} />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Mercury lords the 8th & 11th houses; ideal for institutional fund-raise, high-ticket mergers, and foreign commercial joint ventures.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1">
                      <span className="font-bold text-slate-900 dark:text-white">Upcoming Pratyantar Dasha:</span>
                      <p className="text-slate-600 dark:text-slate-300">
                        Venus Pratyantar begins August 2026 — Peak wealth amplification and factory throughput milestone.
                      </p>
                    </div>
                  </div>
                </div>

                {/* KP Cuspal Interlink (CIL) Highlights */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="font-cinzel text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#D4AF37]" />
                    <span>KP Cuspal Sub-Sub Lord Verification</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Sandeep K. Tripathi's proprietary CIL verification connects cusps 2, 6, 10, and 11, confirming an extraordinary financial timeline for 2026-2027.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">10th Cusp (Career)</span>
                      <span className="font-bold text-slate-900 dark:text-white">Sub-Sub: Jupiter</span>
                      <span className="text-[10px] text-emerald-500 block">Signifies Houses 2, 9, 11</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">11th Cusp (Cash Gains)</span>
                      <span className="font-bold text-slate-900 dark:text-white">Sub-Sub: Venus</span>
                      <span className="text-[10px] text-emerald-500 block">Signifies Houses 6, 11</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* KP 12 Cusps Table */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="font-cinzel text-sm font-bold text-slate-900 dark:text-white">
                Detailed 1st to 12th Cuspal Interlink (CIL) Table
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Cusp</th>
                      <th className="py-2.5 px-3">Zodiac Sign</th>
                      <th className="py-2.5 px-3">Star Lord</th>
                      <th className="py-2.5 px-3">Sub Lord</th>
                      <th className="py-2.5 px-3">Sub-Sub Lord</th>
                      <th className="py-2.5 px-3">Enterprise Signification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                    {mockKpCuspalTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">{row.cusp}</td>
                        <td className="py-2.5 px-3">{row.sign}</td>
                        <td className="py-2.5 px-3 text-slate-500">{row.starLord}</td>
                        <td className="py-2.5 px-3 text-[#B45309] dark:text-[#F3E5AB] font-bold">{row.subLord}</td>
                        <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-extrabold">{row.subSubLord}</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{row.signification}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ACTIVE SPATIAL CONSULTATIONS & AUDIT PIPELINE */}
        {/* ========================================================================= */}
        {activeTab === 'audits' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-slate-900 dark:text-white">
                  Active Enterprise Consultations & Spatial Audits
                </h3>
                <p className="text-xs text-slate-500">
                  Track the real-time lifecycle of your factory, corporate office, or luxury estate energy harmonization.
                </p>
              </div>

              <button
                onClick={() => onOpenBooking('industrial')}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] text-slate-950 font-bold text-xs flex items-center gap-2 hover:opacity-95 shadow-md cursor-pointer transition-all"
              >
                <span>Book Additional Audit / Facility</span>
              </button>
            </div>

            {/* Consultation Cards */}
            <div className="space-y-6">
              {mockActiveConsultations.map((audit) => (
                <div 
                  key={audit.id}
                  className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-md space-y-6"
                >
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-[#B45309] dark:text-[#F3E5AB] border border-amber-500/30">
                          {audit.propertyType}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{audit.id}</span>
                      </div>
                      <h4 className="font-cinzel text-lg font-bold text-slate-900 dark:text-white">
                        {audit.title}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{audit.location} ({audit.areaSqFt})</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Energy Harmony Score</span>
                      <span className="font-cinzel text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {audit.healthScore}/100
                      </span>
                      <span className="text-[10px] text-emerald-500 block">Target: 96/100 Post-Remedy</span>
                    </div>
                  </div>

                  {/* 4-Stage Visual Pipeline Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                      <span>Audit Progress Pipeline</span>
                      <span className="text-[#B45309] dark:text-[#F3E5AB] font-bold">
                        Stage {audit.currentStage} of 4: {audit.stageTitle}
                      </span>
                    </div>

                    {/* Progress Bar Grid */}
                    <div className="grid grid-cols-4 gap-2 pt-1">
                      {[
                        { step: 1, title: 'Inquiry & Scope Confirmed' },
                        { step: 2, title: 'Floorplan & Energy Audit' },
                        { step: 3, title: '0% Non-Demolition Matrix' },
                        { step: 4, title: '90-Day Industrial Followup' }
                      ].map((st) => {
                        const isCompleted = st.step < audit.currentStage;
                        const isCurrent = st.step === audit.currentStage;
                        return (
                          <div key={st.step} className="space-y-1">
                            <div 
                              className={`h-2.5 rounded-full transition-all ${
                                isCompleted 
                                  ? 'bg-emerald-500' 
                                  : isCurrent 
                                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] animate-pulse' 
                                    : 'bg-slate-200 dark:bg-slate-800'
                              }`} 
                            />
                            <div className="text-[11px] font-medium text-slate-500 truncate">
                              {st.step}. {st.title}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Audit Details & Notes */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-500">
                      <span><strong>Assigned Masters:</strong> {audit.assignedMaster}</span>
                      <span><strong>Initiated:</strong> {audit.startDate}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">
                      <strong>Executive Notes:</strong> {audit.notes}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="text-xs text-slate-500">
                      Prescribed Remedies: <strong className="text-slate-900 dark:text-white">{audit.remediesCount} Non-Demolition Corrections</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('scanner')}
                        className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Inspect in Spatial Studio</span>
                      </button>

                      <button
                        onClick={() => handleDownloadPdf(`${audit.title} - Official Non-Demolition Report`)}
                        className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white hover:opacity-95 text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Download Remedy Blueprint (PDF)</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: AI SPATIAL VASTU SCANNER & BLUEPRINT STUDIO */}
        {/* ========================================================================= */}
        {activeTab === 'scanner' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Studio Header */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] text-xs font-semibold mb-1">
                  <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Interactive 16-Zone Energy Radar & Non-Demolition Solver</span>
                </div>
                <h3 className="font-cinzel text-xl font-bold text-slate-900 dark:text-white">
                  AI Spatial Vastu Scanner & Blueprint Studio
                </h3>
                <p className="text-xs text-slate-500">
                  Select an enterprise layout or upload a CAD / Blueprint image to simulate the 16 Vastu Zones and view zero-tear-down corrective metal wire & pyramid prescriptions.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadPdf(`Spatial Audit Analysis - ${activePlan.name}`)}
                  className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white hover:opacity-95 text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Export Official Spatial Audit PDF</span>
                </button>
              </div>
            </div>

            {/* Preset Blueprint Selectors & File Upload */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {sampleFloorplans.map((plan, idx) => (
                <button
                  key={plan.id}
                  onClick={() => { setSelectedPlanIndex(idx); setCustomFloorplanUrl(null); handleSimulateScan(); }}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedPlanIndex === idx && !customFloorplanUrl
                      ? 'bg-amber-500/10 border-[#D4AF37] ring-1 ring-[#D4AF37]'
                      : 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B45309] dark:text-[#F3E5AB] block">
                    Preset {idx + 1}: {plan.category}
                  </span>
                  <div className="font-bold text-xs text-slate-900 dark:text-white truncate mt-0.5">
                    {plan.name}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {plan.builtUpArea} • Facing {plan.facing}
                  </div>
                </button>
              ))}

              {/* Custom Blueprint Image Upload */}
              <label className="p-3.5 rounded-xl border border-dashed border-[#D4AF37]/50 hover:border-[#D4AF37] bg-white/50 dark:bg-[#111827]/50 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
                <Upload className="w-5 h-5 text-[#D4AF37] mb-1" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Upload Custom Blueprint
                </span>
                <span className="text-[10px] text-slate-400">
                  Drop JPG/PNG/CAD file
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Studio Workspace: Visual Scanner & Detailed Remedy Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left 7 Cols: Interactive Radar & Visual Zone Overlay */}
              <div className="lg:col-span-7 space-y-4">
                
                <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-cinzel text-sm font-bold text-slate-900 dark:text-white">
                        {customFloorplanUrl ? 'Uploaded Blueprint Scanner' : activePlan.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Facing: <strong className="text-slate-800 dark:text-slate-200">{activePlan.facing}</strong> ({activePlan.dimensions})
                      </p>
                    </div>

                    <button
                      onClick={handleSimulateScan}
                      disabled={isScanning}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <Activity className={`w-3.5 h-3.5 text-[#D4AF37] ${isScanning ? 'animate-spin' : ''}`} />
                      <span>{isScanning ? 'Scanning...' : 'Re-Analyze Grid'}</span>
                    </button>
                  </div>

                  {/* Blueprint View with Interactive 16-Zone Overlay */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner flex items-center justify-center">
                    <img 
                      src={customFloorplanUrl || activePlan.imageMock} 
                      alt="Floor plan" 
                      className={`w-full h-full object-cover opacity-60 transition-opacity duration-300 ${isScanning ? 'filter blur-xs' : ''}`}
                    />

                    {/* Laser Scanner Line Animation */}
                    {isScanning && (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent animate-pulse flex items-center justify-center">
                        <div className="text-center bg-black/80 p-4 rounded-xl border border-[#D4AF37] space-y-2">
                          <Compass className="w-8 h-8 text-[#D4AF37] animate-spin mx-auto" />
                          <p className="text-xs font-mono text-[#F3E5AB]">Calculating Lecher Antenna Resonance...</p>
                          <div className="w-40 h-1.5 bg-slate-800 rounded-full overflow-hidden mx-auto">
                            <div className="h-full bg-[#D4AF37] rounded-full transition-all" style={{ width: `${scanProgress}%` }} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Interactive 16-Zone Grid Overlay Markers */}
                    {!isScanning && (
                      <div className="absolute inset-0 p-4 grid grid-cols-4 grid-rows-4 gap-2 pointer-events-auto">
                        {[
                          { zone: 'NW', name: 'North-West (Vayavya)', element: 'Air', status: 'Optimal' },
                          { zone: 'NNW', name: 'NNW (Attraction)', element: 'Water', status: 'Balanced' },
                          { zone: 'N', name: 'North (Kuber)', element: 'Water', status: 'Optimal' },
                          { zone: 'NNE', name: 'NNE (Health)', element: 'Water', status: 'Optimal' },
                          { zone: 'WNW', name: 'WNW (Detox)', element: 'Space', status: 'Balanced' },
                          { zone: 'Brahmasthan', name: 'Center (Core)', element: 'Space', status: 'Exemplary' },
                          { zone: 'NE', name: 'North-East (Ishanya)', element: 'Water/Spirit', status: 'Exemplary' },
                          { zone: 'ENE', name: 'ENE (Recreation)', element: 'Air', status: 'Balanced' },
                          { zone: 'W', name: 'West (Varuna)', element: 'Space', status: 'Optimal' },
                          { zone: 'SW', name: 'South-West (Stability)', element: 'Earth', status: 'Action' },
                          { zone: 'SE', name: 'South-East (Agneya)', element: 'Fire', status: 'Action' },
                          { zone: 'E', name: 'East (Indra)', element: 'Air', status: 'Balanced' },
                          { zone: 'WSW', name: 'WSW (Skills)', element: 'Earth', status: 'Optimal' },
                          { zone: 'SSW', name: 'SSW (Disposal)', element: 'Earth', status: 'Balanced' },
                          { zone: 'S', name: 'South (Yama)', element: 'Fire', status: 'Optimal' },
                          { zone: 'ESE', name: 'ESE (Churning)', element: 'Air', status: 'Balanced' }
                        ].map((z) => {
                          const isSelected = selectedZone === z.zone;
                          const isAlert = z.status === 'Action';
                          return (
                            <button
                              key={z.zone}
                              type="button"
                              onClick={() => setSelectedZone(z.zone)}
                              className={`p-1 rounded-md text-[10px] font-bold flex flex-col items-center justify-center transition-all cursor-pointer backdrop-blur-xs ${
                                isSelected
                                  ? 'bg-[#D4AF37]/90 text-slate-950 ring-2 ring-white shadow-lg'
                                  : isAlert
                                    ? 'bg-red-500/50 text-white border border-red-400 hover:bg-red-500/70 animate-pulse'
                                    : 'bg-black/50 text-slate-200 border border-white/20 hover:bg-black/75'
                              }`}
                            >
                              <span>{z.zone}</span>
                              <span className="text-[8px] opacity-80 truncate">{z.element}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* 5 Elemental Equilibrium Meters */}
                  <div className="pt-2 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      5 Mahabhutas Elemental Equilibrium Radar
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/25">
                        <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 mb-1">
                          <span className="font-semibold flex items-center gap-1">
                            <Droplets className="w-3 h-3" />
                            Water
                          </span>
                          <span className="font-bold">94%</span>
                        </div>
                        <div className="w-full h-1.5 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '94%' }} />
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25">
                        <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-1">
                          <span className="font-semibold flex items-center gap-1">
                            <Wind className="w-3 h-3" />
                            Air
                          </span>
                          <span className="font-bold">88%</span>
                        </div>
                        <div className="w-full h-1.5 bg-emerald-200 dark:bg-emerald-900 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }} />
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/25">
                        <div className="flex items-center justify-between text-red-600 dark:text-red-400 mb-1">
                          <span className="font-semibold flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            Fire
                          </span>
                          <span className="font-bold text-red-500">64% ⚠️</span>
                        </div>
                        <div className="w-full h-1.5 bg-red-200 dark:bg-red-900 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: '64%' }} />
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/25">
                        <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-1">
                          <span className="font-semibold flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            Earth
                          </span>
                          <span className="font-bold text-amber-500">70% ⚠️</span>
                        </div>
                        <div className="w-full h-1.5 bg-amber-200 dark:bg-amber-900 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '70%' }} />
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/25 col-span-2 sm:col-span-1">
                        <div className="flex items-center justify-between text-purple-600 dark:text-purple-400 mb-1">
                          <span className="font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Space
                          </span>
                          <span className="font-bold">96%</span>
                        </div>
                        <div className="w-full h-1.5 bg-purple-200 dark:bg-purple-900 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: '96%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Selected Zone Diagnosis & 0% Non-Demolition Remedies */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Selected Zone Card */}
                <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-semibold text-[#B45309] dark:text-[#F3E5AB]">
                      Active Zone Inspector
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-slate-800 dark:text-white">
                      Zone: {selectedZone}
                    </span>
                  </div>

                  <h4 className="font-cinzel text-base font-bold text-slate-900 dark:text-white">
                    {selectedZoneDetails.name}
                  </h4>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Element & Deity:</span>
                      <span className="font-semibold">{selectedZoneDetails.element}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Resonance Health:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {selectedZoneDetails.health}/100
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Field Status:</span>
                      <span className="font-semibold text-amber-600 dark:text-amber-400">
                        {selectedZoneDetails.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Current Structural Usage:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400">
                      {selectedZoneDetails.notes}
                    </p>
                  </div>
                </div>

                {/* 0% Non-Demolition Remedy Matrix */}
                <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="font-cinzel text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>0% Non-Demolition Remedy Prescriptions</span>
                  </h4>

                  <p className="text-[11px] text-slate-500">
                    No walls broken, no pillars knocked down. Harmonized exclusively via metallic frequency strips, elemental pyramids, and energy barriers.
                  </p>

                  <div className="space-y-2.5">
                    {activePlan.remedies.map((rem, i) => (
                      <div 
                        key={i}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {rem.zoneName}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-[#B45309] dark:text-[#F3E5AB]">
                            {rem.stabilizerType}
                          </span>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 font-medium text-[11px]">
                          <strong>Defect:</strong> {rem.detectedDefect}
                        </p>

                        <p className="text-emerald-700 dark:text-emerald-400 text-[11px]">
                          <strong>Correction:</strong> {rem.nonDemolitionPrescription}
                        </p>

                        <div className="pt-1 text-[10px] text-slate-400 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-[#D4AF37]" />
                          <span>{rem.impactArea}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: DIGITAL REPORTS & DOWNLOAD CENTER */}
        {/* ========================================================================= */}
        {activeTab === 'reports' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-slate-900 dark:text-white">
                  My Purchased Digital Reports & Download Center
                </h3>
                <p className="text-xs text-slate-500">
                  Access your official, cryptographically verified astrological and spatial dossiers at any time.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {onOpenGenerateReport && (
                  <button
                    onClick={onOpenGenerateReport}
                    className="px-3.5 py-2 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate New AI Dossier</span>
                  </button>
                )}
                <div className="text-xs text-[#B45309] dark:text-[#F3E5AB] font-semibold hidden sm:flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Lifetime Cloud Backup</span>
                </div>
              </div>
            </div>

            {/* Reports List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockPurchasedReports.map((report) => (
                <div 
                  key={report.id}
                  className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {report.id}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {report.status}
                      </span>
                    </div>

                    <h4 className="font-cinzel text-base font-bold text-slate-900 dark:text-white">
                      {report.title}
                    </h4>

                    <p className="text-xs text-[#B45309] dark:text-[#F3E5AB] font-medium">
                      {report.category}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-300">
                      <strong>Key Finding:</strong> {report.keyInsights}
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                      <span>{report.pages} • {report.fileSize}</span>
                      <span>Generated: {report.generatedDate}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleDownloadPdf(report.title)}
                      className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Official PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: ENROLLED ACADEMY COURSES & LMS */}
        {/* ========================================================================= */}
        {activeTab === 'courses' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-slate-900 dark:text-white">
                  Enrolled Masterclasses & Academy LMS
                </h3>
                <p className="text-xs text-slate-500">
                  Access live Zoom lectures with Sandeep K. Tripathi & Ravindra Pathak, study notes, and Lecher antenna audit practicals.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#B45309] dark:text-[#F3E5AB] font-bold">
                  Institutional Certification En Route
                </span>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="space-y-6">
              {mockEnrolledCourses.map((crs) => (
                <div 
                  key={crs.id}
                  className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/20 text-[#B45309] dark:text-[#F3E5AB]">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>{crs.level}</span>
                      </div>
                      <h4 className="font-cinzel text-lg font-bold text-slate-900 dark:text-white">
                        {crs.title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Master Mentor: <strong className="text-slate-800 dark:text-slate-200">{crs.instructor}</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Syllabus Progress</span>
                      <span className="font-cinzel text-xl font-bold text-slate-900 dark:text-white">
                        {crs.progressPercent}%
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {crs.completedModules} of {crs.totalModules} Modules Done
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B45309] rounded-full" 
                      style={{ width: `${crs.progressPercent}%` }} 
                    />
                  </div>

                  {/* Upcoming Zoom Class Strip */}
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">
                        <PlayCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          Next Live Interactive Session:
                        </span>
                        <span className="text-slate-600 dark:text-slate-300">
                          {crs.nextLiveClass}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={crs.zoomLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Launch Live Zoom Room</span>
                      </a>

                      <button
                        onClick={() => handleDownloadPdf(`${crs.title} - Complete Study Material & Formulas`)}
                        className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Notes ({crs.materialsCount} PDFs)</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
