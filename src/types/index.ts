export type Language = 'en' | 'hi';
export type Currency = 'INR' | 'USD';
export type Theme = 'day' | 'night';

export interface VastuZone {
  id: string;
  name: string;
  hindiName: string;
  degrees: string;
  startDeg: number;
  endDeg: number;
  element: 'Water' | 'Air' | 'Fire' | 'Earth' | 'Space' | 'Air / Space';
  elementHindi: string;
  colorCode: string;
  deity: string;
  lifeAttribute: string;
  lifeAttributeHindi: string;
  idealUsage: string;
  idealUsageHindi: string;
  imbalanceSymptom: string;
  imbalanceSymptomHindi: string;
  zeroDemolitionRemedy: string;
  zeroDemolitionRemedyHindi: string;
}

export interface ServicePackage {
  id: string;
  category: 'residential' | 'commercial' | 'industrial' | 'online_global';
  title: string;
  titleHindi: string;
  tagline: string;
  taglineHindi: string;
  priceINR: number;
  priceUSD: number;
  features: string[];
  featuresHindi: string[];
  bestFor: string;
  bestForHindi: string;
  turnaround: string;
  iconName: string;
}

export interface AcademyCourse {
  id: string;
  title: string;
  titleHindi: string;
  level: string;
  levelHindi: string;
  duration: string;
  durationHindi: string;
  mode: string;
  modeHindi: string;
  priceINR: number;
  priceUSD: number;
  rating: number;
  studentsEnrolled: number;
  description: string;
  descriptionHindi: string;
  modules: {
    week: string;
    title: string;
    titleHindi: string;
    topics: string[];
  }[];
  certification: string;
  certificationHindi: string;
  nextBatch: string;
}

export interface RemedyItem {
  id: string;
  name: string;
  nameHindi: string;
  category: 'strips' | 'pyramids' | 'gemstones' | 'yantras' | 'clearing';
  categoryLabel: string;
  categoryLabelHindi: string;
  priceINR: number;
  priceUSD: number;
  material: string;
  description: string;
  descriptionHindi: string;
  idealZone: string;
  purpose: string;
  purposeHindi: string;
  shipping: string;
  shippingHindi: string;
  badge?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  titleHindi: string;
  clientType: string;
  clientTypeHindi: string;
  location: string;
  flag: string;
  problem: string;
  problemHindi: string;
  diagnosis: string;
  diagnosisHindi: string;
  astroCorrelation: string;
  astroCorrelationHindi: string;
  solution0Demolition: string;
  solution0DemolitionHindi: string;
  result: string;
  resultHindi: string;
  metric: string;
}

export interface BlogPost {
  id: string;
  title: string;
  titleHindi: string;
  readTime: string;
  category: string;
  date: string;
  excerpt: string;
  excerptHindi: string;
  content: string;
  contentHindi: string;
}

export interface FaqItem {
  id: string;
  question: string;
  questionHindi: string;
  answer: string;
  answerHindi: string;
  category: 'consultation' | 'demolition' | 'academy' | 'global';
}
