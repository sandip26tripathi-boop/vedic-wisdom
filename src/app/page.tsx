'use client';

import React from 'react';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ZeroDemolitionStrip from '@/components/ZeroDemolitionStrip';
import ServicesSection from '@/components/ServicesSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import AcademySection from '@/components/AcademySection';
import FounderSection from '@/components/FounderSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import ZoneInspectorModal from '@/components/ZoneInspectorModal';
import AuditWizardModal from '@/components/AuditWizardModal';
import AiAssistantWidget from '@/components/AiAssistantWidget';
import LegalModals from '@/components/LegalModals';

export default function Home() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <ZeroDemolitionStrip />
          <ServicesSection />
          <CaseStudiesSection />
          <AcademySection />
          {/* RemediesStoreSection has been hidden as requested */}
          <FounderSection />
          <TestimonialsSection />
          <BlogSection />
          <FaqSection />
        </main>
        <Footer />

        {/* Global Floating & Modal Components */}
        <ZoneInspectorModal />
        <AuditWizardModal />
        <AiAssistantWidget />
        <LegalModals />
      </div>
    </AppProvider>
  );
}
