'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { X, Sparkles, AlertTriangle, ShieldCheck, Compass, Zap } from 'lucide-react';

export default function ZoneInspectorModal() {
  const { selectedZone, closeZoneModal, language, openWizard } = useApp();

  if (!selectedZone) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--gold-primary)',
          color: 'var(--text-main)'
        }}
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center space-x-3">
            <span 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md text-sm"
              style={{ backgroundColor: selectedZone.colorCode }}
            >
              {selectedZone.id}
            </span>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                {language === 'en' ? selectedZone.name : selectedZone.hindiName}
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                {selectedZone.degrees} | {language === 'en' ? `Element: ${selectedZone.element}` : selectedZone.elementHindi}
              </p>
            </div>
          </div>
          <button
            onClick={closeZoneModal}
            className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-5 space-y-4 text-sm max-h-[70vh] overflow-y-auto pr-1">
          {/* Governing Deity & Core Attribute */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border" style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center space-x-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                <Compass className="w-4 h-4" />
                <span>{language === 'en' ? 'Presiding Energy / Deity' : 'अधिष्ठाता देवता / ग्रह'}</span>
              </div>
              <p className="mt-1 font-medium">{selectedZone.deity}</p>
            </div>

            <div className="p-3.5 rounded-xl border" style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                <Zap className="w-4 h-4" />
                <span>{language === 'en' ? 'Primary Life Attribute' : 'जीवन में प्रभाव क्षेत्र'}</span>
              </div>
              <p className="mt-1 font-medium">
                {language === 'en' ? selectedZone.lifeAttribute : selectedZone.lifeAttributeHindi}
              </p>
            </div>
          </div>

          {/* Ideal Usage */}
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'en' ? 'Ideal Architectural Usages' : 'सर्वश्रेष्ठ वास्तु उपयोग'}</span>
            </div>
            <p className="mt-1.5 font-medium leading-relaxed">
              {language === 'en' ? selectedZone.idealUsage : selectedZone.idealUsageHindi}
            </p>
          </div>

          {/* Symptoms of Imbalance */}
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-50/50 dark:bg-red-950/20">
            <div className="flex items-center space-x-2 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4" />
              <span>{language === 'en' ? 'Symptoms When This Zone is Afflicted' : 'दोष होने पर प्रकट होने वाले लक्षण'}</span>
            </div>
            <p className="mt-1.5 font-medium leading-relaxed">
              {language === 'en' ? selectedZone.imbalanceSymptom : selectedZone.imbalanceSymptomHindi}
            </p>
          </div>

          {/* 0% Demolition Remedy */}
          <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'en' ? '0% Demolition Non-Invasive Remedy' : '0% तोड़फोड़ (बिना तोड़फोड़) समाधान'}</span>
            </div>
            <p className="mt-1.5 font-medium leading-relaxed">
              {language === 'en' ? selectedZone.zeroDemolitionRemedy : selectedZone.zeroDemolitionRemedyHindi}
            </p>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="text-xs text-stone-500 text-center sm:text-left">
            {language === 'en' 
              ? 'Synchronized with your personal KP Kundli during audits.' 
              : 'ऑडिट के दौरान आपकी जन्मकुंडली के साथ इसका सटीक मिलान किया जाता है।'}
          </p>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => {
                closeZoneModal();
                openWizard();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow"
            >
              {language === 'en' ? `Audit My ${selectedZone.id} Zone` : `इस दिशा का ऑडिट कराएं`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
