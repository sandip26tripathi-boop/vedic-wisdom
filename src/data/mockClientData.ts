import { ActiveConsultation, EnrolledCourseStatus, SpatialRemedy, UserProfile } from '../types/index.ts';

export const defaultMockUser: UserProfile = {
  id: 'usr_vedic_9009',
  name: 'Vikramaditya Singhania',
  phone: '+91 90094 48601',
  email: 'vikram.singhania@enterprise-group.in',
  dob: '1984-06-18',
  tob: '06:45',
  pob: 'Bhopal, MP, India',
  rashi: 'Taurus (वृषभ)',
  lagna: 'Scorpio (वृश्चिक)',
  nakshatra: 'Rohini (रोहिणी - Pada 2)',
  whatsappOptIn: true,
  memberId: 'VW-ENT-2026-9009',
  clientTier: 'Enterprise VIP',
  joinedDate: 'October 2024'
};

export const sampleFloorplans = [
  {
    id: 'industrial-plant',
    name: '75,000 sq.ft Heavy Engineering & Auto Components Plant',
    category: 'Industrial',
    facing: 'North-East (045°)',
    builtUpArea: '75,000 sq.ft',
    dimensions: '300 ft x 250 ft',
    description: 'Heavy metal pressing, CNC bays, furnace, raw material staging, and executive dispatch center.',
    imageMock: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    zonesData: [
      { zone: 'N', name: 'North (Kuber)', health: 92, element: 'Water', status: 'Optimal', notes: 'Open sales dispatch & cash flows active.' },
      { zone: 'NE', name: 'North-East (Ishanya)', health: 96, element: 'Water/Spirit', status: 'Exemplary', notes: 'Underground water sump & temple aligned perfectly.' },
      { zone: 'E', name: 'East (Indra/Surya)', health: 88, element: 'Air', status: 'Balanced', notes: 'Large glazing bringing vital morning prana.' },
      { zone: 'SE', name: 'South-East (Agneya)', health: 64, element: 'Fire', status: 'Imbalance Detected', notes: 'Main transformer is slightly shifted towards South-South-East.' },
      { zone: 'S', name: 'South (Yama)', health: 82, element: 'Earth/Fire', status: 'Balanced', notes: 'Heavy storage walls provide stability.' },
      { zone: 'SW', name: 'South-West (Nairutya)', health: 70, element: 'Earth', status: 'Action Required', notes: 'Managing Director office lacks lead grounding weight; vibration from press bay.' },
      { zone: 'W', name: 'West (Varuna)', health: 86, element: 'Space', status: 'Optimal', notes: 'Finished goods inventory warehouse in West maximizes profitability.' },
      { zone: 'NW', name: 'North-West (Vayavya)', health: 84, element: 'Air', status: 'Optimal', notes: 'Logistics and vendor movement bay operating with high throughput.' }
    ],
    remedies: [
      {
        zone: 'SE',
        zoneName: 'South-East (Agneya - Fire)',
        element: 'Fire',
        detectedDefect: 'Transformer shift creating elemental friction with water chillers.',
        nonDemolitionPrescription: 'Install 99.9% pure Red Jasper and Copper Elemental Energy Bar (3mm x 15mm) along the floor boundary to sever energetic leakage without moving heavy electrical conduit.',
        stabilizerType: 'Copper Strip',
        impactArea: 'Prevents electrical trip hazards & optimizes production output.'
      },
      {
        zone: 'SW',
        zoneName: 'South-West (Nairutya - Earth / Stability)',
        element: 'Earth',
        detectedDefect: 'MD Office floor elevation is 2 inches lower than the central shop floor.',
        nonDemolitionPrescription: 'Place 9-unit Lead Helix Pyramids in the south-western floor skirting and affix an unpolished Yellow Jaisalmer marble slab under the executive chair.',
        stabilizerType: 'Lead Pyramid',
        impactArea: 'Anchors leadership decision-making and arrests top-management attrition.'
      },
      {
        zone: 'NNW',
        zoneName: 'North-North-West (Attraction & Dispatch)',
        element: 'Water',
        detectedDefect: 'Scrap metal dumped temporarily near logistics gate.',
        nonDemolitionPrescription: 'Apply Zinc wire virtual boundary perimeter and relocate scrap to West zone.',
        stabilizerType: 'Zinc Wire',
        impactArea: 'Eliminates payment collection delays and accelerates inventory turn.'
      }
    ] as SpatialRemedy[]
  },
  {
    id: 'corporate-hq',
    name: '1,200-Workstation Corporate Tech Campus & Boardroom',
    category: 'Corporate',
    facing: 'North (358°)',
    builtUpArea: '32,000 sq.ft',
    dimensions: '200 ft x 160 ft',
    description: 'Executive C-Suite, open collaborative engineering bays, server farm, cafeteria, and VC pitch room.',
    imageMock: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    zonesData: [
      { zone: 'N', name: 'North (Kuber)', health: 95, element: 'Water', status: 'Exemplary', notes: 'Main entrance with water fountain.' },
      { zone: 'NE', name: 'North-East (Ishanya)', health: 90, element: 'Water/Spirit', status: 'Optimal', notes: 'Brainstorming ideation pods.' },
      { zone: 'E', name: 'East (Indra)', health: 85, element: 'Air', status: 'Balanced', notes: 'Investor relations suite.' },
      { zone: 'SE', name: 'South-East (Agneya)', health: 68, element: 'Fire', status: 'Imbalance Detected', notes: 'Pantry sink adjacent to server rack electrical hub.' },
      { zone: 'SW', name: 'South-West (Nairutya)', health: 94, element: 'Earth', status: 'Exemplary', notes: 'Chairman and CEO corner office with heavy oak desk.' },
      { zone: 'W', name: 'West (Varuna)', health: 80, element: 'Space', status: 'Optimal', notes: 'Accounts and treasury department.' },
      { zone: 'NW', name: 'North-West (Vayavya)', health: 76, element: 'Air', status: 'Attention', notes: 'Sales phone booths generating restless churn.' }
    ],
    remedies: [
      {
        zone: 'SE',
        zoneName: 'South-East (Agneya - Fire)',
        element: 'Fire',
        detectedDefect: 'Water sink placed 4 feet from main server power distribution board.',
        nonDemolitionPrescription: 'Insert Brass energy separator partition strip and embed green aventurine crystal stones between wet area and power bank.',
        stabilizerType: 'Brass Strip',
        impactArea: 'Neutralizes conflict between Fire & Water elements; protects against server downtimes.'
      },
      {
        zone: 'NW',
        zoneName: 'North-West (Vayavya - Air)',
        element: 'Air',
        detectedDefect: 'High employee churn in sales bullpen.',
        nonDemolitionPrescription: 'Place Brass flying horse figurine facing North-West and tone down sharp red wall paint with warm off-white frequency.',
        stabilizerType: 'Brass Strip',
        impactArea: 'Stabilizes sales talent retention and boosts quarterly target attainment.'
      }
    ] as SpatialRemedy[]
  },
  {
    id: 'luxury-villa',
    name: '14,500 sq.ft 5-BHK Luxury Estate & Villa (Bhopal)',
    category: 'Residential Villa',
    facing: 'East (090°)',
    builtUpArea: '14,500 sq.ft',
    dimensions: '120 ft x 120 ft',
    description: 'Master bedroom suite, central Brahmasthan courtyard with skylight, swimming pool, home theatre, and pooja sanctuary.',
    imageMock: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    zonesData: [
      { zone: 'Brahmasthan', name: 'Center (Cosmic Core)', health: 98, element: 'Space', status: 'Exemplary', notes: 'Open double-height light court, zero heavy pillar burden.' },
      { zone: 'NE', name: 'North-East (Ishanya)', health: 94, element: 'Water/Spirit', status: 'Exemplary', notes: 'Marble Mandir with pure morning sun exposure.' },
      { zone: 'SW', name: 'South-West (Nairutya)', health: 88, element: 'Earth', status: 'Optimal', notes: 'Master bedroom on first floor with solid teak headboard towards South.' },
      { zone: 'NW', name: 'North-West (Vayavya)', health: 82, element: 'Air', status: 'Optimal', notes: 'Guest suite and outdoor garden lounge.' },
      { zone: 'N', name: 'North (Kuber)', health: 90, element: 'Water', status: 'Optimal', notes: 'Lawn with quiet water cascade.' }
    ],
    remedies: [
      {
        zone: 'WNW',
        zoneName: 'West-North-West (Detoxification)',
        element: 'Space',
        detectedDefect: 'Family library contains unresolved paperwork and heavy iron safe.',
        nonDemolitionPrescription: 'Move heavy safe to South-West. Place round convex frequency mirror and sea salt bowl in WNW.',
        stabilizerType: 'Mirror Frequency Deflector',
        impactArea: 'Restores restful sleep and deep emotional peace for family members.'
      }
    ] as SpatialRemedy[]
  }
];

export const mockActiveConsultations: ActiveConsultation[] = [
  {
    id: 'CNS-2026-IND-01',
    title: 'Automotive Component Plant Spatial Energy Neutralization',
    propertyType: 'Industrial Plant',
    location: 'Plot 48, Industrial Area, Pithampur / Mandideep, MP',
    areaSqFt: '75,000 sq.ft',
    assignedMaster: 'Sandeep K. Tripathi & Ravindra Pathak',
    currentStage: 3,
    stageTitle: '0% Non-Demolition Remedy Matrix Issued',
    startDate: 'March 15, 2026',
    estimatedDelivery: 'April 28, 2026',
    healthScore: 84,
    priority: 'Critical Enterprise',
    remediesCount: 6,
    notes: 'Lecher antenna audit completed. Copper & Lead boundary rods prescribed for SE transformer and SW press bay. 90-day tracking begins after installation.'
  },
  {
    id: 'CNS-2026-AST-02',
    title: 'KP Cuspal Interlink (CIL) Business Expansion & IPO Timing',
    propertyType: 'KP Astro Strategy',
    location: 'Corporate Suite, Virtual & In-Person Bhopal Office',
    areaSqFt: 'Personal Natal Chart',
    assignedMaster: 'Sandeep K. Tripathi (Principal Researcher)',
    currentStage: 2,
    stageTitle: 'Birth Time Rectification & Sub-Sub Lord Analysis Active',
    startDate: 'April 02, 2026',
    estimatedDelivery: 'April 22, 2026',
    healthScore: 92,
    priority: 'High',
    remediesCount: 4,
    notes: '11th Cusp Sub-Sub Lord is Saturn in Rohini Nakshatra. Wealth houses 2-6-10-11 activating in June 2026 Jupiter transit.'
  }
];

export const mockPurchasedReports = [
  {
    id: 'REP-VARSH-2026',
    title: '2026-27 Comprehensive Corporate & Personal Varshphal',
    category: 'Annual Forecast & Tajika Dossier',
    pages: '38 Pages',
    generatedDate: 'April 10, 2026',
    fileSize: '4.8 MB',
    format: 'Official PDF (Cryptographically Signed)',
    status: 'Ready for Download',
    keyInsights: 'Peak financial liquidity window: Oct 2026 – Feb 2027. Avoid long-term capital commitments during July Mercury Retrograde.'
  },
  {
    id: 'REP-CIL-WEALTH',
    title: 'KP Cuspal Interlink: 2-6-10-11 Business & IPO Matrix',
    category: 'Commercial Astrological Dossier',
    pages: '26 Pages',
    generatedDate: 'March 28, 2026',
    fileSize: '3.4 MB',
    format: 'Official PDF (Cryptographically Signed)',
    status: 'Ready for Download',
    keyInsights: 'Confirmed alignment between 10th cusp (Enterprise Command) and 11th cusp (Fulfillment of Desires). High probability of multi-crore institutional capital.'
  },
  {
    id: 'REP-VASTU-IND',
    title: 'Industrial Spatial Energy Blueprint: Non-Demolition Matrix',
    category: 'Spatial Engineering Dossier',
    pages: '44 Pages',
    generatedDate: 'March 18, 2026',
    fileSize: '7.2 MB',
    format: 'CAD Schematic + PDF Report',
    status: 'Ready for Download',
    keyInsights: 'Complete 16-zone arc calculation with elemental color tapes, copper wire virtual barriers, and Lecher antenna wavelength calibrations.'
  }
];

export const mockEnrolledCourses: EnrolledCourseStatus[] = [
  {
    id: 'vastuMastery',
    title: 'Vastu Shastra Mastery: Basic, Advance, Professional & Industrial',
    level: 'Basic to Industrial (4-in-1 Complete Certification)',
    instructor: 'Sandeep K. Tripathi & Ravindra Pathak',
    progressPercent: 68,
    completedModules: 11,
    totalModules: 16,
    nextLiveClass: 'Saturday, 8:00 PM IST (Zoom)',
    zoomLink: 'https://zoom.us/j/9009448601',
    materialsCount: 24
  },
  {
    id: 'kpMastery',
    title: 'Professional KP Astrology Masterclass & Cuspal Interlinks',
    level: 'Intermediate to Master Professional',
    instructor: 'Sandeep K. Tripathi',
    progressPercent: 42,
    completedModules: 7,
    totalModules: 16,
    nextLiveClass: 'Sunday, 11:00 AM IST (Zoom)',
    zoomLink: 'https://zoom.us/j/9009448601',
    materialsCount: 18
  }
];

export const mockKpCuspalTable = [
  { cusp: '1st Cusp', sign: 'Scorpio (वृश्चिक)', starLord: 'Saturn (शनि)', subLord: 'Mercury (बुध)', subSubLord: 'Venus (शुक्र)', signification: 'Self-Vitality, Executive Stature & Longevity' },
  { cusp: '2nd Cusp', sign: 'Sagittarius (धनु)', starLord: 'Ketu (केतु)', subLord: 'Jupiter (गुरु)', subSubLord: 'Sun (सूर्य)', signification: 'Accumulated Wealth, Liquid Cash & Speech' },
  { cusp: '3rd Cusp', sign: 'Capricorn (मकर)', starLord: 'Moon (चंद्र)', subLord: 'Mars (मंगल)', subSubLord: 'Jupiter (गुरु)', signification: 'Contracts, Media, Courage & Siblings' },
  { cusp: '4th Cusp', sign: 'Aquarius (कुंभ)', starLord: 'Mars (मंगल)', subLord: 'Rahu (राहु)', subSubLord: 'Saturn (शनि)', signification: 'Real Estate, Factories, Vehicles & Mother' },
  { cusp: '5th Cusp', sign: 'Pisces (मीन)', starLord: 'Jupiter (गुरु)', subLord: 'Saturn (शनि)', subSubLord: 'Mercury (बुध)', signification: 'Intellect, Intuition, Stock Markets & Mantras' },
  { cusp: '6th Cusp', sign: 'Aries (मेष)', starLord: 'Sun (सूर्य)', subLord: 'Venus (शुक्र)', subSubLord: 'Moon (चंद्र)', signification: 'Competitive Win, Debt Clearance & Workforce' },
  { cusp: '7th Cusp', sign: 'Taurus (वृषभ)', starLord: 'Moon (चंद्र)', subLord: 'Saturn (शनि)', subSubLord: 'Rahu (राहु)', signification: 'Joint Ventures, Global Trade & Spouse' },
  { cusp: '8th Cusp', sign: 'Gemini (मिथुन)', starLord: 'Rahu (राहु)', subLord: 'Mercury (बुध)', subSubLord: 'Ketu (केतु)', signification: 'Sudden Gains, Research & Transformation' },
  { cusp: '9th Cusp', sign: 'Cancer (कर्क)', starLord: 'Saturn (शनि)', subLord: 'Jupiter (गुरु)', subSubLord: 'Mars (मंगल)', signification: 'Higher Vedic Wisdom, Father & Fortune' },
  { cusp: '10th Cusp', sign: 'Leo (सिंह)', starLord: 'Ketu (केतु)', subLord: 'Sun (सूर्य)', subSubLord: 'Jupiter (गुरु)', signification: 'Corporate Authority, Fame & Industrial Scale' },
  { cusp: '11th Cusp', sign: 'Virgo (कन्या)', starLord: 'Mars (मंगल)', subLord: 'Moon (चंद्र)', subSubLord: 'Venus (शुक्र)', signification: 'Fulfillment of Ambitions, Profits & Networks' },
  { cusp: '12th Cusp', sign: 'Libra (तुला)', starLord: 'Jupiter (गुरु)', subLord: 'Mars (मंगल)', subSubLord: 'Saturn (शनि)', signification: 'Foreign Investments, Spiritual Moksha & Peace' }
];
