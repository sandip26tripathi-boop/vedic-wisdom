/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, Theme } from './types/index.ts';
import { AuthProvider } from './context/AuthContext.tsx';
import { useRequireAuth } from './hooks/useRequireAuth.ts';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { TrustBar } from './components/TrustBar.tsx';
import { OfflineWorkflowSection } from './components/OfflineWorkflowSection.tsx';
import { ConsultationsGrid } from './components/ConsultationsGrid.tsx';
import { DigitalReportsSection } from './components/DigitalReportsSection.tsx';
import { AcademyDirectory } from './components/AcademyDirectory.tsx';
import { AstroToolsEngine } from './components/AstroToolsEngine.tsx';
import { LeadershipSection } from './components/LeadershipSection.tsx';
import { CaseStudiesSection } from './components/CaseStudiesSection.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { BookingModal } from './components/BookingModal.tsx';
import { ConsultationScopeModal } from './components/ConsultationScopeModal.tsx';
import { CourseEnrollModal } from './components/CourseEnrollModal.tsx';
import { ReportOrderModal } from './components/ReportOrderModal.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { ClientDashboard } from './components/ClientDashboard.tsx';
import { AstroCopilot } from './components/ai/AstroCopilot.tsx';
import { ReportForm } from './components/reports/ReportForm.tsx';
import { ReportViewer } from './components/reports/ReportViewer.tsx';
import { Footer } from './components/Footer.tsx';
import { DigitalReportItem, digitalReportsData } from './data/digitalReports.ts';
import { Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';
import { SriYantraMotif } from './components/SriYantraMotif.tsx';

function MainApp() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  // Light-First Luxury Default
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  const { requireAuth } = useRequireAuth();
  
  // Navigation View State: 'website' | 'dashboard' | 'generate-report'
  const [activeView, setActiveView] = useState<'website' | 'dashboard' | 'generate-report'>('website');

  // AI Generated Report State (Module 1)
  const [generatedReportData, setGeneratedReportData] = useState<any | null>(null);

  // AstroCopilot Modal State
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState('industrial');

  const [isScopeOpen, setIsScopeOpen] = useState(false);
  const [scopeServiceId, setScopeServiceId] = useState('industrial');

  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [enrollCourseId, setEnrollCourseId] = useState('kpMastery');

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<DigitalReportItem | null>(digitalReportsData[0]);

  // Handle theme updates
  useEffect(() => {
    const root = document.documentElement;
    if (currentTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [currentTheme]);

  const handleThemeToggle = () => {
    setCurrentTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Universal Gated Action Handlers
  const handleOpenBooking = (serviceId: string = 'industrial') => {
    requireAuth(() => {
      setBookingServiceId(serviceId);
      setIsBookingOpen(true);
    }, {
      message: currentLang === 'hi' 
        ? 'परामर्श बुक करने के लिए कृपया अपना मोबाइल नंबर सत्यापित करें।' 
        : 'Please authenticate & verify your mobile number to book your consultation.',
      source: `booking-${serviceId}`
    });
  };

  const handleOpenScope = (serviceId: string) => {
    setScopeServiceId(serviceId);
    setIsScopeOpen(true);
  };

  const handleOpenEnroll = (courseId: string) => {
    requireAuth(() => {
      setEnrollCourseId(courseId);
      setIsEnrollOpen(true);
    }, {
      message: currentLang === 'hi' 
        ? 'कोर्स में प्रवेश पाने के लिए कृपया अपना मोबाइल नंबर सत्यापित करें।' 
        : 'Please authenticate & verify your mobile number to enroll in this academy program.',
      source: `course-${courseId}`
    });
  };

  const handleOpenReportModal = (report: DigitalReportItem) => {
    requireAuth(() => {
      setSelectedReport(report);
      setIsReportModalOpen(true);
    }, {
      message: currentLang === 'hi' 
        ? 'डिजिटल रिपोर्ट अनलॉक करने के लिए कृपया अपना मोबाइल नंबर सत्यापित करें।' 
        : 'Please authenticate & verify your mobile number to order this digital report.',
      source: `report-${report.id}`
    });
  };

  const handleOpenGenerateReport = () => {
    setGeneratedReportData(null);
    setActiveView('generate-report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTo = (elementId: string) => {
    // If not in website view, switch back to website first then scroll
    if (activeView !== 'website') {
      setActiveView('website');
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`w-full max-w-full overflow-x-hidden min-h-screen flex flex-col font-sans transition-colors duration-300 ${currentLang === 'hi' ? 'font-hindi' : ''} bg-[#FAF9F6] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100`}>
      
      {/* VIEW 1: PROTECTED ENTERPRISE CLIENT DASHBOARD */}
      {activeView === 'dashboard' ? (
        <ClientDashboard
          currentLang={currentLang}
          onReturnToWebsite={() => setActiveView('website')}
          onOpenBooking={handleOpenBooking}
          onOpenGenerateReport={handleOpenGenerateReport}
        />
      ) : activeView === 'generate-report' ? (
        /* VIEW 2: MODULE 1 - AI DIGITAL REPORT GENERATION AGENT */
        <div className="w-full max-w-full overflow-x-hidden min-h-screen flex flex-col">
          <Header
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
            currentTheme={currentTheme}
            onThemeToggle={handleThemeToggle}
            onOpenBooking={handleOpenBooking}
            onOpenDashboard={() => setActiveView('dashboard')}
            onOpenCopilot={() => setIsCopilotOpen(true)}
            onOpenGenerateReport={handleOpenGenerateReport}
          />

          <main className="w-full max-w-full overflow-x-hidden flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Back to Website Button */}
            <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
              <button
                onClick={() => { setActiveView('website'); setGeneratedReportData(null); }}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Vedic Wisdom Platform</span>
              </button>

              <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-[#B45309] dark:text-[#F3E5AB]">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Computational Vedic & KP Analytics Agent</span>
              </div>
            </div>

            {/* Render Report Form or Generated Report Dossier */}
            {generatedReportData ? (
              <ReportViewer
                reportData={generatedReportData}
                currentLang={currentLang}
                onBack={() => setGeneratedReportData(null)}
                onOpenBooking={() => handleOpenBooking('astrology')}
              />
            ) : (
              <ReportForm
                currentLang={currentLang}
                onReportGenerated={(data) => {
                  setGeneratedReportData(data);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </main>

          <Footer
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
            currentTheme={currentTheme}
            onThemeToggle={handleThemeToggle}
            onOpenBooking={handleOpenBooking}
            onScrollTo={handleScrollTo}
          />
        </div>
      ) : (
        /* VIEW 3: PUBLIC HIGH-CONVERTING VEDIC WISDOM PLATFORM */
        <>
          {/* Primary Sticky Header */}
          <Header
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
            currentTheme={currentTheme}
            onThemeToggle={handleThemeToggle}
            onOpenBooking={handleOpenBooking}
            onOpenDashboard={() => setActiveView('dashboard')}
            onOpenCopilot={() => setIsCopilotOpen(true)}
            onOpenGenerateReport={handleOpenGenerateReport}
          />

          {/* Main Content Sections */}
          <main className="w-full max-w-full overflow-x-hidden flex-1">
            {/* 1. Hero Section (Balanced Dual-Pillar Focus) */}
            <Hero
              currentLang={currentLang}
              onOpenBooking={handleOpenBooking}
              onScrollTo={handleScrollTo}
            />

            {/* 2. Enterprise Trust & Credibility Strip */}
            <TrustBar currentLang={currentLang} />

            {/* 2.5. Offline Empirical Execution Workflow (Online Coordinates to On-Site Rectification) */}
            <OfflineWorkflowSection
              currentLang={currentLang}
              onOpenBooking={handleOpenBooking}
            />

            {/* 3. Dual Consultation Ecosystem [ Astrology Consultations | Astro-Vastu Audits ] */}
            <ConsultationsGrid
              currentLang={currentLang}
              onOpenBooking={handleOpenBooking}
              onOpenScopeModal={handleOpenScope}
            />

            {/* 4. Automated Digital Astro Reports (Instant Download Engine) */}
            <DigitalReportsSection
              currentLang={currentLang}
              onOpenReportModal={handleOpenReportModal}
              onOpenGenerateReport={handleOpenGenerateReport}
            />

            {/* 5. Interactive Free Tools & Lead Magnets (Instant Kundli, Panchang & Choghadiya, Vastu Compass) */}
            <AstroToolsEngine
              currentLang={currentLang}
              onOpenBooking={handleOpenBooking}
            />

            {/* 6. Vedic Wisdom Academy Professional Course Directory */}
            <AcademyDirectory
              currentLang={currentLang}
              onOpenEnroll={handleOpenEnroll}
            />

            {/* 7. Leadership, Lineage & Research Methodology */}
            <LeadershipSection
              currentLang={currentLang}
              onOpenBooking={handleOpenBooking}
            />

            {/* 8. Industrial Turnaround Case Studies */}
            <CaseStudiesSection
              currentLang={currentLang}
              onOpenBooking={handleOpenBooking}
            />

            {/* 9. Authentic Vedic & Non-Demolition Vastu FAQ Section */}
            <FAQSection
              currentLang={currentLang}
              onOpenBooking={handleOpenBooking}
            />
          </main>

          {/* 4-Column Luxury Footer */}
          <Footer
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
            currentTheme={currentTheme}
            onThemeToggle={handleThemeToggle}
            onOpenBooking={handleOpenBooking}
            onScrollTo={handleScrollTo}
          />
        </>
      )}

      {/* Intelligent Floating WhatsApp Chatbot & Community Drawer */}
      <FloatingWhatsApp 
        currentLang={currentLang} 
        onOpenCopilot={() => setIsCopilotOpen(true)}
      />

      {/* Streaming AI AstroCopilot Assistant Modal */}
      <AstroCopilot
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        currentLang={currentLang}
      />

      {/* Auth Modal with OTP Verification, Google 1-Click & Mobile Login */}
      <AuthModal
        currentLang={currentLang}
        onSuccessRedirect={() => {
          if (activeView === 'generate-report') {
            // Stay in generator after verification to proceed
            return;
          }
          setActiveView('dashboard');
        }}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        currentLang={currentLang}
        initialServiceId={bookingServiceId}
      />

      <ConsultationScopeModal
        isOpen={isScopeOpen}
        onClose={() => setIsScopeOpen(false)}
        serviceId={scopeServiceId}
        currentLang={currentLang}
        onOpenBooking={handleOpenBooking}
      />

      <CourseEnrollModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        courseId={enrollCourseId}
        currentLang={currentLang}
      />

      <ReportOrderModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        report={selectedReport}
        currentLang={currentLang}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
