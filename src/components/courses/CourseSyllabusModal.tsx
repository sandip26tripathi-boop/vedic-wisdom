import React, { useState } from 'react';
import { SriYantraMotif } from '../SriYantraMotif.tsx';
import { Language } from '../../types/index.ts';
import { 
  X, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Download,
  Calendar,
  Layers
} from 'lucide-react';

export interface CourseSyllabusData {
  id: string;
  title: string;
  badge: string;
  instructor: string;
  duration: string;
  modules: Array<{
    number: number;
    title: string;
    details: string[];
  }>;
  practicalOutcomes: string[];
}

export const ACADEMY_SYLLABUS_REGISTRY: Record<string, CourseSyllabusData> = {
  kpMastery: {
    id: 'kpMastery',
    title: 'Professional KP Astrology Mastery & Cuspal Interlinks (CIL)',
    badge: 'Basics to CIL & Sub-Sub Lord Mastery',
    instructor: 'Sandeep K. Tripathi (12+ Yrs KP Researcher)',
    duration: '16 Weeks (48 Intensive Live Hours + Lifetime Recordings)',
    modules: [
      {
        number: 1,
        title: 'Fundamentals of KP System, Placidus House Division & Ruling Planets',
        details: [
          'Placidus House System vs Sripati / Equal House divisions',
          'Classical derivation of House Cusps & Sign, Star, Sub-Lord arcs',
          'Ruling Planets (RP) technique for instantaneous question decoding',
          'Ayanamsha precision: Krishnamurti Ayanamsha calibration'
        ]
      },
      {
        number: 2,
        title: 'The Power of Sub-Lord & Sub-Sub Lord Theory in Precise Timing',
        details: [
          'Sub-Lord as the definitive decision filter (Yes vs No)',
          'Sub-Sub Lord analysis for calendar timing windows',
          'Significators of Houses: A, B, C, D 4-fold planetary signification',
          'Dasha-Bhukti-Antara-Sookshma micro-event synchronization'
        ]
      },
      {
        number: 3,
        title: 'Cuspal Interlinks (CIL) for Career, Marriage & Wealth Yogas',
        details: [
          'Multi-cuspal interlink matrix linking 1st to 12th cusps',
          'Commercial Wealth Yogas: Interlink of 2nd (Cash), 6th (Loan/Job), 10th (Fame), 11th (Gains)',
          'Corporate IPO & Expansion timing via 10th and 11th cusps',
          'Marital harmony (2-7-11) vs divorce/separation triggers (1-6-10)'
        ]
      },
      {
        number: 4,
        title: 'Birth Time Rectification (BTR) and Practical Real-World Chart Case Studies',
        details: [
          'Sub-second Birth Time Rectification using Ruling Planets and Past Life Events',
          'Medical astrology & litigation (6-8-12 cuspal links)',
          'Live analysis of 50+ real client business horoscopes & enterprise IPOs',
          'Ethical counseling and practical astrological guidance'
        ]
      }
    ],
    practicalOutcomes: [
      'Ability to independently rectify birth times down to the minute.',
      'Definitive yes/no decision forecasting for corporate mergers, promotions, and IPOs.',
      'Official Vedic Wisdom Academy Institutional Certification.'
    ]
  },
  bnn: {
    id: 'bnn',
    title: 'Bhrigu Nandi Nadi (BNN) Predictive Masterclass',
    badge: 'Rapid Life Pattern Decoding',
    instructor: 'Sandeep K. Tripathi',
    duration: '10 Weeks (30 Live Hours)',
    modules: [
      {
        number: 1,
        title: 'Planetary Karakattwas (Significations) & Directional Chart Casting',
        details: [
          'Core planetary karakas: Jupiter as Jeeva (Soul), Saturn as Karma (Work), Venus as Maya/Wealth',
          'Directional trine system (1-5-9 Dharma, 2-6-10 Artha, 3-7-11 Kama, 4-8-12 Moksha)',
          'Casting Nadi charts without lagna or precise birth time',
          'Mutual planetary exchanges (Parivartana) in Nadi logic'
        ]
      },
      {
        number: 2,
        title: 'Planetary Conjunctions (Jupiter-Saturn-Rahu combinations)',
        details: [
          'Jupiter-Saturn conjunction: The Brahma-Karma yoga for high executive stature',
          'Saturn-Rahu combination: Foreign assignments vs corporate espionage',
          'Sun-Mercury-Venus trines: Financial dominance and trading mastery',
          'Mars-Venus-Ketu: Technical innovation and spiritual evolution'
        ]
      },
      {
        number: 3,
        title: 'Double Transit Phenomenon (Saturn & Jupiter Trines) for Pinpoint Predictions',
        details: [
          'Saturn transit over natal planets triggering career revolutions',
          'Jupiter transit activating auspicious events (marriage, progeny, asset acquisition)',
          'Rahu/Ketu 18-year transit cycles over natal karakas',
          'Pinpointing life-changing calendar months using degree-level transits'
        ]
      },
      {
        number: 4,
        title: 'Decoding Past Life Karma and Remedial Nadi Sutras',
        details: [
          'Identifying Rinanu Bandhana (karmic debts) from past incarnations',
          'Ancestral curses (Pitr Dosha) and ethical remediation through Nadi Sutras',
          'Practical daily remedies, charitable actions, and temple alignments'
        ]
      }
    ],
    practicalOutcomes: [
      'Deliver classical observational statements within 60 seconds of seeing a chart.',
      'Decode karmic debts and career patterns without dependency on complex technical calculations.'
    ]
  },
  jaimini: {
    id: 'jaimini',
    title: 'Jaimini Astrology & Karakamsha System',
    badge: 'Classical Vedic Depth',
    instructor: 'Sandeep K. Tripathi',
    duration: '8 Weeks (24 Live Hours)',
    modules: [
      {
        number: 1,
        title: 'The 7 Chara Karakas (Atmakaraka, Amatyakaraka, etc.)',
        details: [
          'Classical derivation of 7 Chara Karakas based on planetary degrees',
          'Atmakaraka (AK) — The soul planet and ultimate life purpose',
          'Amatyakaraka (AmK) — Career advisor planet and wealth driver',
          'Bhratrikaraka, Matrikaraka, Pitrikaraka, Gnatikaraka, and Darakaraka'
        ]
      },
      {
        number: 2,
        title: 'Chara Dasha Calculation and Interpretation',
        details: [
          'Rashi Dasha mechanics (Zodiacal vs Direct / Reverse order)',
          'Assessing period strengths using Atmakaraka and Amatyakaraka transits',
          'Sub-periods (Antardashas) and timing of sudden status changes'
        ]
      },
      {
        number: 3,
        title: 'Karakamsha Lagna, Arudha Padas, and Status/Spiritual Rise',
        details: [
          'Navamsha sign of Atmakaraka as Karakamsha Lagna (KL)',
          'Arudha Padas (A1 to A12): Illusion vs reality in public perception',
          'Rajyogas according to Maharishi Jaimini sutras and Argala interventions'
        ]
      }
    ],
    practicalOutcomes: [
      'Master the classical Karakamsha method for identifying true soul mission.',
      'Evaluate status rise and public acclaim through Arudha analysis.'
    ]
  },
  lalKitab: {
    id: 'lalKitab',
    title: 'Lal Kitab Predictive & Remedial Grammar',
    badge: 'Rapid Remedial Science',
    instructor: 'Sandeep K. Tripathi',
    duration: '10 Weeks (30 Live Hours)',
    modules: [
      {
        number: 1,
        title: 'Masnui Planets (Artificial Planets) and Pakka Ghar concepts',
        details: [
          'Concept of 12 Fixed Houses (Pakka Ghar) independent of signs',
          'Masnui (artificial) planetary unions: Sun + Saturn = Ketu, Mercury + Venus = Sun',
          'Drishti (aspect) grammar: Full, half, quarter aspect rules in Lal Kitab'
        ]
      },
      {
        number: 2,
        title: 'Identifying Andha Teva, Dharmi Teva, and Rin (Karmic Debts)',
        details: [
          'Andha Teva (Blind Horoscope) and Raat Ka Andha (Night Blind) horoscopes',
          'Dharmi Teva (Protected pious charts) where malefic planets lose their sting',
          '7 Ancestral Debts (Pitr Rin, Matri Rin, Stri Rin) and their diagnostic signs'
        ]
      },
      {
        number: 3,
        title: 'The Science of Non-Demolition, Practical Lal Kitab Upayas (Precautions & Remedies)',
        details: [
          'Rules of performing upayas: Daytime execution, uninterrupted 43-day cycles',
          'Custom non-demolition measures: Silver square slabs, copper coins, sea salt, yellow grain',
          'Precautions (Parhez) that prevent awakening dormant malefic planetary forces'
        ]
      }
    ],
    practicalOutcomes: [
      'Diagnose household karmic debts from architectural cues.',
      'Prescribe zero-cost, high-efficacy remedies without expensive gemstones.'
    ]
  },
  vastuMastery: {
    id: 'vastuMastery',
    title: 'Master Industrial & Commercial Non-Demolition Astro-Vastu Certification',
    badge: 'Basic to Industrial (4-in-1 Complete Certification)',
    instructor: 'Sandeep K. Tripathi & Ravindra Pathak',
    duration: '16 Weeks (48 Intensive Live Hours + On-Site Audits)',
    modules: [
      {
        number: 1,
        title: '16 Zonal Energies, 5 Elements (Pancha Tattva) & Heavy Machinery Layouts',
        details: [
          '360-degree classical division of space into 16 cardinal/intercardinal zones',
          'Pancha Tattva cycle of creation, destruction, and exhaustion (Water, Air, Fire, Earth, Space)',
          'Heavy CNC machinery and raw material placement in South-West (Nairutya - Earth)'
        ]
      },
      {
        number: 2,
        title: 'Factory Entrance Dynamics, Boiler/Furnace (Agni Zone) vs Water Tank Placement',
        details: [
          '32 Energy Entrances of Vastu Purusha Mandala (N3, N4, E3, E4 wealth doors)',
          'High-temperature furnaces, boilers, and transformers in South-East (Agneya)',
          'Underground water sumps and borewells in North-East (Ishanya) vs ETP in North-West'
        ]
      },
      {
        number: 3,
        title: 'Geopathic Energy Neutralization & Aura Testing using Lecher Antenna',
        details: [
          'Hartmann Grid, Curry Lines, and underground water vein detection',
          'Traditional operation of Lecher Antenna for environmental frequency resonance',
          'Aura energy measurement of executive cabins and manufacturing floors'
        ]
      },
      {
        number: 4,
        title: 'Zero-Demolition Space Healing: Color, Metal Strips, Pyramids, and Geo-balancing',
        details: [
          '99.9% pure Copper, Brass, Lead, Zinc, and Stainless Steel boundary energy strips',
          'Virtual wall cuts to isolate elemental conflicts without breaking bricks',
          'Lead helix and copper pyramid resonators for stabilizing cash flow and labor unions'
        ]
      }
    ],
    practicalOutcomes: [
      'Conduct complete 16-zone industrial audits for multi-acre factories.',
      'Neutralize severe geopathic stress and machine vibrations with non-demolition measures.'
    ]
  },
  numerology: {
    id: 'numerology',
    title: 'Professional Mobile & Name Numerology',
    badge: 'Modern Vibrational Science',
    instructor: 'Sandeep K. Tripathi',
    duration: '6 Weeks (18 Live Hours)',
    modules: [
      {
        number: 1,
        title: 'Grid Analytics (Lo Shu & Vedic Grids) and Number Frequencies',
        details: [
          'Constructing 3x3 Lo Shu and ancient Vedic Numerology grids',
          'Mental plane (4-9-2), Emotional plane (3-5-7), and Practical plane (8-1-6)',
          'Identifying missing number deficiencies and energetic remedies'
        ]
      },
      {
        number: 2,
        title: 'Mobile Number Vibrations: Identifying Wealth & Debt Combinations',
        details: [
          'Total compound value of mobile numbers (targeting 1, 5, 6, 9 combinations)',
          'Identifying toxic number clusters (2-8, 4-8, 6-3) causing litigation or business debt',
          'Selecting customized VIP business phone numbers aligned with client business'
        ]
      },
      {
        number: 3,
        title: 'Traditional Name Spelling Alignment with Astrological Lagna',
        details: [
          'Chaldean and Pythagorean numerology sound vibration principles',
          'Optimizing individual and brand names to 1 (Sun), 5 (Mercury), or 6 (Venus)',
          'Corporate brand naming guidelines for maximum market recall and IPO success'
        ]
      }
    ],
    practicalOutcomes: [
      'Optimize personal and corporate mobile numbers for wealth and authority.',
      'Harmoniously balance commercial brand names without legal name change confusion.'
    ]
  }
};

interface CourseSyllabusModalProps {
  courseId: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenEnroll: (courseId: string) => void;
  currentLang: Language;
}

export const CourseSyllabusModal: React.FC<CourseSyllabusModalProps> = ({
  courseId,
  isOpen,
  onClose,
  onOpenEnroll,
  currentLang
}) => {
  const [expandedModule, setExpandedModule] = useState<number | null>(1);

  if (!isOpen) return null;

  const courseData = ACADEMY_SYLLABUS_REGISTRY[courseId] || ACADEMY_SYLLABUS_REGISTRY.kpMastery;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl bg-[#FAF9F6] dark:bg-[#111827] border border-[#D4AF37]/35 shadow-2xl flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Metallic Gold Border Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309]" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-1 rounded-xl bg-gradient-to-br from-[#D4AF37]/30 to-transparent border border-[#D4AF37]/40 shrink-0">
              <SriYantraMotif className="w-9 h-9" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] mb-1">
                <BookOpen className="w-3 h-3 text-[#D4AF37]" />
                <span>60-Second Syllabus Overview</span>
              </div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {courseData.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Mentor: <strong className="text-slate-800 dark:text-slate-200">{courseData.instructor}</strong> • {courseData.duration}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Quick Curriculum Modules Accordion */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Core Modules & Lecture Syllabus ({courseData.modules.length} Modules)</span>
            </h4>

            <div className="space-y-2.5">
              {courseData.modules.map((mod) => {
                const isExpanded = expandedModule === mod.number;
                return (
                  <div
                    key={mod.number}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedModule(isExpanded ? null : mod.number)}
                      className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 text-[#B45309] dark:text-[#F3E5AB] font-bold text-xs flex items-center justify-center shrink-0">
                          M{mod.number}
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {mod.title}
                        </span>
                      </div>

                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                          {mod.details.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Practical Competencies & Institutional Credentials */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h5 className="font-cinzel text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Verified Competency & Certification Outcome</span>
            </h5>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
              {courseData.practicalOutcomes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#D4AF37]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={() => {
              window.open(`https://wa.me/919009448601?text=${encodeURIComponent(`Namaste Sandeep Ji, I would like to download the full detailed syllabus and brochure for "${courseData.title}".`)}`, '_blank');
            }}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Request Full PDF Syllabus on WhatsApp</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenEnroll(courseId);
            }}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-md shadow-[#D4AF37]/25 cursor-pointer transition-all"
          >
            <span>Reserve Seat / Enroll Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
