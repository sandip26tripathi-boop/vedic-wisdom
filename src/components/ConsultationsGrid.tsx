import React, { useState } from 'react';
import { translations } from '../data/translations.ts';
import { Language } from '../types/index.ts';
import { useCart } from '../context/CartContext.tsx';
import { useCurrency } from '../context/CurrencyContext.tsx';
import { 
  Sparkles, 
  Factory, 
  Building2, 
  Home, 
  Clock, 
  Target, 
  CheckCircle, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Compass, 
  Cpu, 
  RotateCw, 
  Hourglass, 
  Layers, 
  ShoppingBag 
} from 'lucide-react';

interface ConsultationsGridProps {
  currentLang: Language;
  onOpenBooking: (serviceId?: string) => void;
  onOpenScopeModal: (serviceId: string) => void;
}

export const ConsultationsGrid: React.FC<ConsultationsGridProps> = ({
  currentLang,
  onOpenBooking,
  onOpenScopeModal,
}) => {
  const { addToCart, openCart } = useCart();
  const { formatPrice } = useCurrency();
  const [activeWing, setActiveWing] = useState<'astrology' | 'vastu'>('astrology');
  const t = translations[currentLang];
  const c = t.consultations;
  const astro = c.astrologyWing;
  const vastu = c.vastuWing;

  const astrologyServices = [
    {
      id: 'kpCil',
      title: astro.kpCil.title,
      badge: astro.kpCil.badge,
      summary: astro.kpCil.summary,
      deliverables: astro.kpCil.deliverables,
      turnaround: astro.kpCil.turnaround,
      idealFor: astro.kpCil.idealFor,
      priceInr: 5100,
      priceUsd: 75,
      timelineEn: '24–48 Hours',
      timelineHi: '24–48 घंटे',
      icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
      accentColor: 'border-[#D4AF37]/40 hover:border-[#D4AF37]',
      glowColor: 'hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]'
    },
    {
      id: 'bnn',
      title: astro.bnn.title,
      badge: astro.bnn.badge,
      summary: astro.bnn.summary,
      deliverables: astro.bnn.deliverables,
      turnaround: astro.bnn.turnaround,
      idealFor: astro.bnn.idealFor,
      priceInr: 4500,
      priceUsd: 65,
      timelineEn: '24–48 Hours',
      timelineHi: '24–48 घंटे',
      icon: <RotateCw className="w-6 h-6 text-amber-500" />,
      accentColor: 'border-amber-500/40 hover:border-amber-500',
      glowColor: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]'
    },
    {
      id: 'jaimini',
      title: astro.jaimini.title,
      badge: astro.jaimini.badge,
      summary: astro.jaimini.summary,
      deliverables: astro.jaimini.deliverables,
      turnaround: astro.jaimini.turnaround,
      idealFor: astro.jaimini.idealFor,
      priceInr: 4500,
      priceUsd: 65,
      timelineEn: '24–48 Hours',
      timelineHi: '24–48 घंटे',
      icon: <Compass className="w-6 h-6 text-purple-500" />,
      accentColor: 'border-purple-500/40 hover:border-purple-500',
      glowColor: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]'
    },
    {
      id: 'lalKitab',
      title: astro.lalKitab.title,
      badge: astro.lalKitab.badge,
      summary: astro.lalKitab.summary,
      deliverables: astro.lalKitab.deliverables,
      turnaround: astro.lalKitab.turnaround,
      idealFor: astro.lalKitab.idealFor,
      priceInr: 4500,
      priceUsd: 65,
      timelineEn: '24–48 Hours',
      timelineHi: '24–48 घंटे',
      icon: <ShieldCheck className="w-6 h-6 text-rose-500" />,
      accentColor: 'border-rose-500/40 hover:border-rose-500',
      glowColor: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]'
    },
    {
      id: 'btr',
      title: astro.btr.title,
      badge: astro.btr.badge,
      summary: astro.btr.summary,
      deliverables: astro.btr.deliverables,
      turnaround: astro.btr.turnaround,
      idealFor: astro.btr.idealFor,
      priceInr: 6500,
      priceUsd: 95,
      timelineEn: '48–72 Hours',
      timelineHi: '48–72 घंटे',
      icon: <Hourglass className="w-6 h-6 text-sky-500" />,
      accentColor: 'border-sky-500/40 hover:border-sky-500',
      glowColor: 'hover:shadow-[0_0_30px_rgba(14,165,233,0.2)]'
    }
  ];

  const vastuServices = [
    {
      id: 'industrial',
      title: vastu.industrial.title,
      badge: vastu.industrial.badge,
      summary: vastu.industrial.summary,
      deliverables: vastu.industrial.deliverables,
      turnaround: vastu.industrial.turnaround,
      idealFor: vastu.industrial.idealFor,
      priceInr: 25000,
      priceUsd: 350,
      timelineEn: '3–5 Business Days',
      timelineHi: '3–5 कार्य दिवस',
      icon: <Factory className="w-6 h-6 text-[#D4AF37]" />,
      accentColor: 'border-amber-500/40 hover:border-[#D4AF37]',
      glowColor: 'hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]'
    },
    {
      id: 'corporate',
      title: vastu.corporate.title,
      badge: vastu.corporate.badge,
      summary: vastu.corporate.summary,
      deliverables: vastu.corporate.deliverables,
      turnaround: vastu.corporate.turnaround,
      idealFor: vastu.corporate.idealFor,
      priceInr: 21000,
      priceUsd: 295,
      timelineEn: '3–5 Business Days',
      timelineHi: '3–5 कार्य दिवस',
      icon: <Building2 className="w-6 h-6 text-sky-400" />,
      accentColor: 'border-sky-500/40 hover:border-sky-400',
      glowColor: 'hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]'
    },
    {
      id: 'villa',
      title: vastu.villa.title,
      badge: vastu.villa.badge,
      summary: vastu.villa.summary,
      deliverables: vastu.villa.deliverables,
      turnaround: vastu.villa.turnaround,
      idealFor: vastu.villa.idealFor,
      priceInr: 11000,
      priceUsd: 165,
      timelineEn: '48–72 Hours',
      timelineHi: '48–72 घंटे',
      icon: <Home className="w-6 h-6 text-emerald-400" />,
      accentColor: 'border-emerald-500/40 hover:border-emerald-400',
      glowColor: 'hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]'
    }
  ];

  const currentList = activeWing === 'astrology' ? astrologyServices : vastuServices;

  return (
    <section id="consultations" className="py-20 bg-[#FAF9F6] dark:bg-[#0B0F19] transition-colors duration-300 relative">
      <div id="astrology" className="absolute -top-24" aria-hidden="true" />
      <div id="cil-astrology" className="absolute -top-24" aria-hidden="true" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-bold text-amber-950 dark:text-[#F3E5AB]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{c.sectionBadge}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {c.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {c.subtitle}
          </p>

          {/* Primary Dual Toggle Switch [ Astrology Consultations | Astro-Vastu Audits ] */}
          <div className="pt-4 flex items-center justify-center">
            <div className="p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 shadow-inner flex items-center gap-1">
              <button
                onClick={() => setActiveWing('astrology')}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeWing === 'astrology'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{c.tabAstrology}</span>
              </button>

              <button
                onClick={() => setActiveWing('vastu')}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeWing === 'vastu'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <Factory className="w-4 h-4" />
                <span>{c.tabVastu}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className={`grid grid-cols-1 ${activeWing === 'astrology' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3'} gap-8`}>
          {currentList.map((service) => (
            <div
              key={service.id}
              className={`group relative rounded-3xl p-6 sm:p-7 bg-white dark:bg-[#111827] border ${service.accentColor} ${service.glowColor} shadow-xl transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                
                {/* Header Badge & Icon */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#D4AF37]/15 text-amber-950 dark:text-[#F3E5AB] border border-[#D4AF37]/30">
                    {service.badge}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#B45309] dark:group-hover:text-[#D4AF37] transition-colors mb-2.5">
                  {service.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {service.summary}
                </p>

                {/* Key Deliverables Bullet Points */}
                <div className="space-y-2 mb-5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{c.keyDeliverables}</span>
                  </div>
                  {service.deliverables.slice(0, 3).map((deliv, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{deliv}</span>
                    </div>
                  ))}
                </div>

                {/* Visible Commercial Price & Delivery Timeline Box */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#D4AF37]/15 to-transparent border border-[#D4AF37]/35 mb-5 flex items-center justify-between text-xs shadow-2xs">
                  <div>
                    <div className="font-mono text-lg font-black text-amber-950 dark:text-[#F3E5AB]">
                      {formatPrice(service.priceInr, service.priceUsd)}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                      {currentLang === 'en' ? 'Direct Consultation Fee' : 'परामर्श शुल्क'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{currentLang === 'en' ? service.timelineEn : service.timelineHi}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      {currentLang === 'en' ? 'Delivery Timeline' : 'डिलीवरी समय'}
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => onOpenScopeModal(service.id)}
                  className="min-h-[44px] flex-1 flex items-center justify-center space-x-1 px-2.5 py-2.5 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  aria-label={`View scope and methodology for ${service.title}`}
                >
                  <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{c.viewScope}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    addToCart({
                      id: service.id,
                      title: service.title,
                      category: activeWing === 'astrology' ? 'Astrology Consultation' : 'Astro-Vastu Audit',
                      price: service.priceInr,
                      turnaround: currentLang === 'en' ? service.timelineEn : service.timelineHi,
                      badge: service.badge
                    });
                    openCart();
                  }}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#B45309] dark:text-[#F3E5AB] transition-colors cursor-pointer"
                  title={currentLang === 'en' ? 'Add to Cart' : 'कार्ट में जोड़ें'}
                  aria-label={`Add ${service.title} to Cart`}
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                </button>

                <button
                  onClick={() => {
                    addToCart({
                      id: service.id,
                      title: service.title,
                      category: activeWing === 'astrology' ? 'Astrology Consultation' : 'Astro-Vastu Audit',
                      price: service.priceInr,
                      turnaround: currentLang === 'en' ? service.timelineEn : service.timelineHi,
                      badge: service.badge
                    });
                    openCart();
                  }}
                  className="min-h-[44px] flex-1 flex items-center justify-center space-x-1 px-3 py-2.5 rounded-xl font-extrabold text-xs text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-sm transition-all cursor-pointer"
                  aria-label={`Book now for ${service.title}`}
                >
                  <span>{currentLang === 'en' ? 'Book Now' : 'अभी बुक करें'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
