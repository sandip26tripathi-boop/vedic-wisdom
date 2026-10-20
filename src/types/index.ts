export type Language = 'en' | 'hi';

export type Theme = 'light' | 'dark';

export interface ConsultationService {
  id: string;
  titleKey: string;
  category: 'industrial' | 'corporate' | 'villa' | 'astrology';
  badgeKey: string;
  summaryKey: string;
  deliverablesKey: string[];
  turnaroundKey: string;
  idealForKey: string;
  pricingIndicatorKey: string;
  iconName: string;
}

export interface AcademyCourse {
  id: string;
  titleKey: string;
  category: 'astrology' | 'vastu' | 'numerology';
  levelKey: string;
  durationKey: string;
  instructorKey: string;
  curriculumHighlightsKey: string[];
  certificationKey: string;
  formatKey: string;
  tokenFee: string;
}

export interface LeaderProfile {
  id: string;
  nameKey: string;
  roleKey: string;
  credentialsKey: string[];
  bioKey: string;
  quoteKey: string;
  specialties: string[];
  imagePlaceholderColor: string;
}

export interface CaseStudy {
  id: string;
  industryKey: string;
  locationKey: string;
  challengeKey: string;
  remedyKey: string;
  resultsKey: string[];
  roiKey: string;
}

export interface DigitalReport {
  id: string;
  titleKey: string;
  badgeKey: string;
  descriptionKey: string;
  priceInr: string;
  priceUsd: string;
  deliveryTimeKey: string;
  pagesKey: string;
  highlightsKey: string[];
  icon: string;
}

// Enterprise Authentication & User Profile
export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  dob?: string;
  tob?: string;
  pob?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  tzOffset?: number;
  rashi?: string;
  lagna?: string;
  nakshatra?: string;
  whatsappOptIn: boolean;
  avatar?: string;
  memberId: string;
  clientTier: 'Enterprise VIP' | 'Corporate' | 'Seeker Elite';
  joinedDate: string;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  authProvider?: 'google' | 'email' | 'phone';
}

// Client Portal Tabs
export type ClientPortalTab = 
  | 'overview' 
  | 'kundli' 
  | 'audits' 
  | 'scanner' 
  | 'reports' 
  | 'courses';

// Active Consultation Pipeline
export interface ActiveConsultation {
  id: string;
  title: string;
  propertyType: 'Industrial Plant' | 'Corporate HQ' | 'Luxury Villa' | 'KP Astro Strategy';
  location: string;
  areaSqFt?: string;
  assignedMaster: string;
  currentStage: 1 | 2 | 3 | 4; // 1: Inquiry, 2: Energy Audit, 3: Remedies Issued, 4: 90-Day Followup
  stageTitle: string;
  startDate: string;
  estimatedDelivery: string;
  healthScore: number;
  priority: 'High' | 'Critical Enterprise' | 'Standard';
  remediesCount: number;
  notes: string;
}

// Spatial Scan Remedy Item
export interface SpatialRemedy {
  zone: string;
  zoneName: string;
  element: string;
  detectedDefect: string;
  nonDemolitionPrescription: string;
  stabilizerType: 'Copper Strip' | 'Brass Strip' | 'Lead Pyramid' | 'Zinc Wire' | 'Mirror Frequency Deflector';
  impactArea: string;
}

// Enrolled Course Status in Portal
export interface EnrolledCourseStatus {
  id: string;
  title: string;
  level: string;
  instructor: string;
  progressPercent: number;
  completedModules: number;
  totalModules: number;
  nextLiveClass: string;
  zoomLink: string;
  materialsCount: number;
}
