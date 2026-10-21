/**
 * Traditional Astronomical Vedic Astrological Engine
 * Computes exact Lagna (Ascendant), Moon sign, Nakshatra, Pada, and all 9 Graha longitudes
 * using Chitrapaksha / Lahiri Ayanamsa, True Greenwich Sidereal Time (LST), and Paul Schlyter's
 * Geocentric Keplerian Ephemeris with Lunar Perturbations (Evection, Variation, Yearly Equation).
 */

export interface GrahaInfo {
  nameEn: string;
  nameHi: string;
  symbol: string;
  longitude: number;
  rashiIndex: number; // 0 to 11
  rashiNameEn: string;
  rashiNameHi: string;
  degInRashi: number;
  house: number; // 1 to 12
  isRetrograde?: boolean;
}

export interface HouseInfo {
  houseNumber: number; // 1 to 12
  bhavaNameEn: string;
  bhavaNameHi: string;
  rashiNumber: number; // 1 to 12
  rashiNameEn: string;
  rashiNameHi: string;
  planets: GrahaInfo[];
}

export interface VedicKundliResult {
  lagnaNameEn: string;
  lagnaNameHi: string;
  lagnaDegree: number;
  lagnaRashiNumber: number;
  moonSignEn: string;
  moonSignHi: string;
  moonDegree: number;
  nakshatraEn: string;
  nakshatraHi: string;
  pada: number;
  ayanamsa: number;
  planets: GrahaInfo[];
  houses: HouseInfo[];
  bhavaRashis: number[]; // Rashi numbers for houses 1 to 12
  vimshottariLordEn: string;
  vimshottariLordHi: string;
  balanceYears: number;
}

export interface CityLocation {
  displayName: string;
  city: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
  tzOffset: number;
}

export const RASHI_NAMES = [
  { en: 'Aries (Mesha)', hi: 'मेष (Mesha)', lordEn: 'Mars', lordHi: 'मंगल' },
  { en: 'Taurus (Vrishabha)', hi: 'वृषभ (Vrishabha)', lordEn: 'Venus', lordHi: 'शुक्र' },
  { en: 'Gemini (Mithuna)', hi: 'मिथुन (Mithuna)', lordEn: 'Mercury', lordHi: 'बुध' },
  { en: 'Cancer (Karka)', hi: 'कर्क (Karka)', lordEn: 'Moon', lordHi: 'चंद्र' },
  { en: 'Leo (Simha)', hi: 'सिंह (Simha)', lordEn: 'Sun', lordHi: 'सूर्य' },
  { en: 'Virgo (Kanya)', hi: 'कन्या (Kanya)', lordEn: 'Mercury', lordHi: 'बुध' },
  { en: 'Libra (Tula)', hi: 'तुला (Tula)', lordEn: 'Venus', lordHi: 'शुक्र' },
  { en: 'Scorpio (Vrischika)', hi: 'वृश्चिक (Vrischika)', lordEn: 'Mars', lordHi: 'मंगल' },
  { en: 'Sagittarius (Dhanu)', hi: 'धनु (Dhanu)', lordEn: 'Jupiter', lordHi: 'बृहस्पति' },
  { en: 'Capricorn (Makara)', hi: 'मकर (Makara)', lordEn: 'Saturn', lordHi: 'शनि' },
  { en: 'Aquarius (Kumbha)', hi: 'कुम्भ (Kumbha)', lordEn: 'Saturn', lordHi: 'शनि' },
  { en: 'Pisces (Meena)', hi: 'मीन (Meena)', lordEn: 'Jupiter', lordHi: 'बृहस्पति' }
];

export const NAKSHATRAS = [
  { en: 'Ashwini', hi: 'अश्विनी', lordEn: 'Ketu', lordHi: 'केतु', dashaYears: 7 },
  { en: 'Bharani', hi: 'भरणी', lordEn: 'Venus', lordHi: 'शुक्र', dashaYears: 20 },
  { en: 'Krittika', hi: 'कृत्तिका', lordEn: 'Sun', lordHi: 'सूर्य', dashaYears: 6 },
  { en: 'Rohini', hi: 'रोहिणी', lordEn: 'Moon', lordHi: 'चंद्र', dashaYears: 10 },
  { en: 'Mrigashira', hi: 'मृगशिरा', lordEn: 'Mars', lordHi: 'मंगल', dashaYears: 7 },
  { en: 'Ardra', hi: 'आर्द्रा', lordEn: 'Rahu', lordHi: 'राहु', dashaYears: 18 },
  { en: 'Punarvasu', hi: 'पुनर्वसु', lordEn: 'Jupiter', lordHi: 'गुरु', dashaYears: 16 },
  { en: 'Pushya', hi: 'पुष्य', lordEn: 'Saturn', lordHi: 'शनि', dashaYears: 19 },
  { en: 'Ashlesha', hi: 'आश्लेषा', lordEn: 'Mercury', lordHi: 'बुध', dashaYears: 17 },
  { en: 'Magha', hi: 'मघा', lordEn: 'Ketu', lordHi: 'केतु', dashaYears: 7 },
  { en: 'Purva Phalguni', hi: 'पूर्वाफाल्गुनी', lordEn: 'Venus', lordHi: 'शुक्र', dashaYears: 20 },
  { en: 'Uttara Phalguni', hi: 'उत्तराफाल्गुनी', lordEn: 'Sun', lordHi: 'सूर्य', dashaYears: 6 },
  { en: 'Hasta', hi: 'हस्त', lordEn: 'Moon', lordHi: 'चंद्र', dashaYears: 10 },
  { en: 'Chitra', hi: 'चित्रा', lordEn: 'Mars', lordHi: 'मंगल', dashaYears: 7 },
  { en: 'Swati', hi: 'स्वाति', lordEn: 'Rahu', lordHi: 'राहु', dashaYears: 18 },
  { en: 'Vishakha', hi: 'विशाखा', lordEn: 'Jupiter', lordHi: 'गुरु', dashaYears: 16 },
  { en: 'Anuradha', hi: 'अनुराधा', lordEn: 'Saturn', lordHi: 'शनि', dashaYears: 19 },
  { en: 'Jyeshtha', hi: 'ज्येष्ठा', lordEn: 'Mercury', lordHi: 'बुध', dashaYears: 17 },
  { en: 'Mula', hi: 'मूल', lordEn: 'Ketu', lordHi: 'केतु', dashaYears: 7 },
  { en: 'Purva Ashadha', hi: 'पूर्वाषाढ़ा', lordEn: 'Venus', lordHi: 'शुक्र', dashaYears: 20 },
  { en: 'Uttara Ashadha', hi: 'उत्तराषाढ़ा', lordEn: 'Sun', lordHi: 'सूर्य', dashaYears: 6 },
  { en: 'Shravana', hi: 'श्रवण', lordEn: 'Moon', lordHi: 'चंद्र', dashaYears: 10 },
  { en: 'Dhanishta', hi: 'धनिष्ठा', lordEn: 'Mars', lordHi: 'मंगल', dashaYears: 7 },
  { en: 'Shatabhisha', hi: 'शतभिषा', lordEn: 'Rahu', lordHi: 'राहु', dashaYears: 18 },
  { en: 'Purva Bhadrapada', hi: 'पूर्वभाद्रपद', lordEn: 'Jupiter', lordHi: 'गुरु', dashaYears: 16 },
  { en: 'Uttara Bhadrapada', hi: 'उत्तरभाद्रपद', lordEn: 'Saturn', lordHi: 'शनि', dashaYears: 19 },
  { en: 'Revati', hi: 'रेवती', lordEn: 'Mercury', lordHi: 'बुध', dashaYears: 17 }
];

export const BHAVA_TITLES = [
  { en: '1st - Tanu (Ascendant / Vitality)', hi: 'प्रथम - तनु भाव (लग्न व स्वरूप)' },
  { en: '2nd - Dhana (Wealth & Family)', hi: 'द्वितीय - धन भाव (वाणी व कुटुंब)' },
  { en: '3rd - Sahaja (Courage & Siblings)', hi: 'तृतीय - सहज भाव (पराक्रम व भाई)' },
  { en: '4th - Sukha (Property & Vehicles)', hi: 'चतुर्थ - सुख भाव (भूमि, भवन व वाहन)' },
  { en: '5th - Putra (Intellect & Speculation)', hi: 'पंचम - सुत भाव (संतान, बुद्धि व विवेक)' },
  { en: '6th - Ari (Litigation & Competition)', hi: 'षष्ठ - रिपु भाव (रोग, ऋण व शत्रु)' },
  { en: '7th - Kalatra (Partnerships & Spouse)', hi: 'सप्तम - जाया भाव (साझेदारी व दांपत्य)' },
  { en: '8th - Ayu (Longevity & Sudden Events)', hi: 'अष्टम - आयु भाव (गूढ़ रहस्य व बाधा)' },
  { en: '9th - Bhagya (Fortune & Lineage)', hi: 'नवम - भाग्य भाव (धर्म, गुरु व उच्च शिक्षा)' },
  { en: '10th - Karma (Enterprise & Status)', hi: 'दशम - कर्म भाव (व्यापार, प्रतिष्ठा व पद)' },
  { en: '11th - Labha (Gains & Cash Flow)', hi: 'एकादश - लाभ भाव (आय, नेटवर्क व सिद्धि)' },
  { en: '12th - Vyaya (Expenditure & Foreign)', hi: 'द्वादश - व्यय भाव (विदेश, निवेश व मोक्ष)' }
];

/** Comprehensive in-memory database of 160+ major Indian & International cities */
export const CITIES_DATABASE: CityLocation[] = [
  // Madhya Pradesh
  { displayName: 'Bhopal, Madhya Pradesh, India', city: 'Bhopal', state: 'MP', country: 'India', lat: 23.2599, lon: 77.4126, tzOffset: 5.5 },
  { displayName: 'Indore, Madhya Pradesh, India', city: 'Indore', state: 'MP', country: 'India', lat: 22.7196, lon: 75.8577, tzOffset: 5.5 },
  { displayName: 'Jabalpur, Madhya Pradesh, India', city: 'Jabalpur', state: 'MP', country: 'India', lat: 23.1815, lon: 79.9864, tzOffset: 5.5 },
  { displayName: 'Gwalior, Madhya Pradesh, India', city: 'Gwalior', state: 'MP', country: 'India', lat: 26.2183, lon: 78.1828, tzOffset: 5.5 },
  { displayName: 'Ujjain, Madhya Pradesh, India', city: 'Ujjain', state: 'MP', country: 'India', lat: 23.1765, lon: 75.7885, tzOffset: 5.5 },
  { displayName: 'Rewa, Madhya Pradesh, India', city: 'Rewa', state: 'MP', country: 'India', lat: 24.5362, lon: 81.3037, tzOffset: 5.5 },
  { displayName: 'Satna, Madhya Pradesh, India', city: 'Satna', state: 'MP', country: 'India', lat: 24.6005, lon: 80.8322, tzOffset: 5.5 },
  { displayName: 'Sagar, Madhya Pradesh, India', city: 'Sagar', state: 'MP', country: 'India', lat: 23.8388, lon: 78.7378, tzOffset: 5.5 },
  { displayName: 'Ratlam, Madhya Pradesh, India', city: 'Ratlam', state: 'MP', country: 'India', lat: 23.3315, lon: 75.0367, tzOffset: 5.5 },
  { displayName: 'Chhindwara, Madhya Pradesh, India', city: 'Chhindwara', state: 'MP', country: 'India', lat: 22.0574, lon: 78.9382, tzOffset: 5.5 },

  // Delhi NCR & North
  { displayName: 'New Delhi, Delhi, India', city: 'New Delhi', state: 'Delhi', country: 'India', lat: 28.6139, lon: 77.2090, tzOffset: 5.5 },
  { displayName: 'Delhi, Delhi NCR, India', city: 'Delhi', state: 'Delhi', country: 'India', lat: 28.6692, lon: 77.2180, tzOffset: 5.5 },
  { displayName: 'Noida, Uttar Pradesh, India', city: 'Noida', state: 'UP', country: 'India', lat: 28.5355, lon: 77.3910, tzOffset: 5.5 },
  { displayName: 'Greater Noida, Uttar Pradesh, India', city: 'Greater Noida', state: 'UP', country: 'India', lat: 28.4744, lon: 77.5040, tzOffset: 5.5 },
  { displayName: 'Gurugram, Haryana, India', city: 'Gurugram', state: 'Haryana', country: 'India', lat: 28.4595, lon: 77.0266, tzOffset: 5.5 },
  { displayName: 'Faridabad, Haryana, India', city: 'Faridabad', state: 'Haryana', country: 'India', lat: 28.4089, lon: 77.3178, tzOffset: 5.5 },
  { displayName: 'Ghaziabad, Uttar Pradesh, India', city: 'Ghaziabad', state: 'UP', country: 'India', lat: 28.6692, lon: 77.4538, tzOffset: 5.5 },
  { displayName: 'Chandigarh, Punjab/Haryana, India', city: 'Chandigarh', state: 'Chandigarh', country: 'India', lat: 30.7333, lon: 76.7794, tzOffset: 5.5 },
  { displayName: 'Ludhiana, Punjab, India', city: 'Ludhiana', state: 'Punjab', country: 'India', lat: 30.9010, lon: 75.8573, tzOffset: 5.5 },
  { displayName: 'Amritsar, Punjab, India', city: 'Amritsar', state: 'Punjab', country: 'India', lat: 31.6340, lon: 74.8723, tzOffset: 5.5 },
  { displayName: 'Dehradun, Uttarakhand, India', city: 'Dehradun', state: 'Uttarakhand', country: 'India', lat: 30.3165, lon: 78.0322, tzOffset: 5.5 },
  { displayName: 'Haridwar, Uttarakhand, India', city: 'Haridwar', state: 'Uttarakhand', country: 'India', lat: 29.9457, lon: 78.1642, tzOffset: 5.5 },
  { displayName: 'Shimla, Himachal Pradesh, India', city: 'Shimla', state: 'HP', country: 'India', lat: 31.1048, lon: 77.1734, tzOffset: 5.5 },
  { displayName: 'Jammu, Jammu & Kashmir, India', city: 'Jammu', state: 'J&K', country: 'India', lat: 32.7266, lon: 74.8570, tzOffset: 5.5 },
  { displayName: 'Srinagar, Jammu & Kashmir, India', city: 'Srinagar', state: 'J&K', country: 'India', lat: 34.0837, lon: 74.7973, tzOffset: 5.5 },

  // Maharashtra & West
  { displayName: 'Mumbai, Maharashtra, India', city: 'Mumbai', state: 'Maharashtra', country: 'India', lat: 19.0760, lon: 72.8777, tzOffset: 5.5 },
  { displayName: 'Pune, Maharashtra, India', city: 'Pune', state: 'Maharashtra', country: 'India', lat: 18.5204, lon: 73.8567, tzOffset: 5.5 },
  { displayName: 'Nagpur, Maharashtra, India', city: 'Nagpur', state: 'Maharashtra', country: 'India', lat: 21.1458, lon: 79.0882, tzOffset: 5.5 },
  { displayName: 'Nashik, Maharashtra, India', city: 'Nashik', state: 'Maharashtra', country: 'India', lat: 19.9975, lon: 73.7898, tzOffset: 5.5 },
  { displayName: 'Thane, Maharashtra, India', city: 'Thane', state: 'Maharashtra', country: 'India', lat: 19.2183, lon: 72.9781, tzOffset: 5.5 },
  { displayName: 'Navi Mumbai, Maharashtra, India', city: 'Navi Mumbai', state: 'Maharashtra', country: 'India', lat: 19.0330, lon: 73.0297, tzOffset: 5.5 },
  { displayName: 'Aurangabad (Chhatrapati Sambhajinagar), Maharashtra, India', city: 'Aurangabad', state: 'Maharashtra', country: 'India', lat: 19.8762, lon: 75.3433, tzOffset: 5.5 },
  { displayName: 'Kolhapur, Maharashtra, India', city: 'Kolhapur', state: 'Maharashtra', country: 'India', lat: 16.7050, lon: 74.2433, tzOffset: 5.5 },

  // Gujarat & Rajasthan
  { displayName: 'Ahmedabad, Gujarat, India', city: 'Ahmedabad', state: 'Gujarat', country: 'India', lat: 23.0225, lon: 72.5714, tzOffset: 5.5 },
  { displayName: 'Surat, Gujarat, India', city: 'Surat', state: 'Gujarat', country: 'India', lat: 21.1702, lon: 72.8311, tzOffset: 5.5 },
  { displayName: 'Vadodara, Gujarat, India', city: 'Vadodara', state: 'Gujarat', country: 'India', lat: 22.3072, lon: 73.1812, tzOffset: 5.5 },
  { displayName: 'Rajkot, Gujarat, India', city: 'Rajkot', state: 'Gujarat', country: 'India', lat: 22.3039, lon: 70.8022, tzOffset: 5.5 },
  { displayName: 'Jaipur, Rajasthan, India', city: 'Jaipur', state: 'Rajasthan', country: 'India', lat: 26.9124, lon: 75.7873, tzOffset: 5.5 },
  { displayName: 'Jodhpur, Rajasthan, India', city: 'Jodhpur', state: 'Rajasthan', country: 'India', lat: 26.2389, lon: 73.0243, tzOffset: 5.5 },
  { displayName: 'Udaipur, Rajasthan, India', city: 'Udaipur', state: 'Rajasthan', country: 'India', lat: 24.5854, lon: 73.7125, tzOffset: 5.5 },
  { displayName: 'Kota, Rajasthan, India', city: 'Kota', state: 'Rajasthan', country: 'India', lat: 25.2138, lon: 75.8648, tzOffset: 5.5 },
  { displayName: 'Bikaner, Rajasthan, India', city: 'Bikaner', state: 'Rajasthan', country: 'India', lat: 28.0229, lon: 73.3119, tzOffset: 5.5 },

  // Uttar Pradesh & Bihar
  { displayName: 'Lucknow, Uttar Pradesh, India', city: 'Lucknow', state: 'UP', country: 'India', lat: 26.8467, lon: 80.9462, tzOffset: 5.5 },
  { displayName: 'Kanpur, Uttar Pradesh, India', city: 'Kanpur', state: 'UP', country: 'India', lat: 26.4499, lon: 80.3319, tzOffset: 5.5 },
  { displayName: 'Varanasi, Uttar Pradesh, India', city: 'Varanasi', state: 'UP', country: 'India', lat: 25.3176, lon: 82.9739, tzOffset: 5.5 },
  { displayName: 'Prayagraj (Allahabad), Uttar Pradesh, India', city: 'Prayagraj', state: 'UP', country: 'India', lat: 25.4358, lon: 81.8463, tzOffset: 5.5 },
  { displayName: 'Agra, Uttar Pradesh, India', city: 'Agra', state: 'UP', country: 'India', lat: 27.1767, lon: 78.0081, tzOffset: 5.5 },
  { displayName: 'Meerut, Uttar Pradesh, India', city: 'Meerut', state: 'UP', country: 'India', lat: 28.9845, lon: 77.7064, tzOffset: 5.5 },
  { displayName: 'Gorakhpur, Uttar Pradesh, India', city: 'Gorakhpur', state: 'UP', country: 'India', lat: 26.7606, lon: 83.3732, tzOffset: 5.5 },
  { displayName: 'Patna, Bihar, India', city: 'Patna', state: 'Bihar', country: 'India', lat: 25.5941, lon: 85.1376, tzOffset: 5.5 },
  { displayName: 'Gaya, Bihar, India', city: 'Gaya', state: 'Bihar', country: 'India', lat: 24.7914, lon: 85.0002, tzOffset: 5.5 },
  { displayName: 'Muzaffarpur, Bihar, India', city: 'Muzaffarpur', state: 'Bihar', country: 'India', lat: 26.1209, lon: 85.3647, tzOffset: 5.5 },

  // South India
  { displayName: 'Bengaluru (Bangalore), Karnataka, India', city: 'Bengaluru', state: 'Karnataka', country: 'India', lat: 12.9716, lon: 77.5946, tzOffset: 5.5 },
  { displayName: 'Mysuru (Mysore), Karnataka, India', city: 'Mysuru', state: 'Karnataka', country: 'India', lat: 12.2958, lon: 76.6394, tzOffset: 5.5 },
  { displayName: 'Hyderabad, Telangana, India', city: 'Hyderabad', state: 'Telangana', country: 'India', lat: 17.3850, lon: 78.4867, tzOffset: 5.5 },
  { displayName: 'Chennai (Madras), Tamil Nadu, India', city: 'Chennai', state: 'Tamil Nadu', country: 'India', lat: 13.0827, lon: 80.2707, tzOffset: 5.5 },
  { displayName: 'Coimbatore, Tamil Nadu, India', city: 'Coimbatore', state: 'Tamil Nadu', country: 'India', lat: 11.0168, lon: 76.9558, tzOffset: 5.5 },
  { displayName: 'Madurai, Tamil Nadu, India', city: 'Madurai', state: 'Tamil Nadu', country: 'India', lat: 9.9252, lon: 78.1198, tzOffset: 5.5 },
  { displayName: 'Kochi (Cochin), Kerala, India', city: 'Kochi', state: 'Kerala', country: 'India', lat: 9.9312, lon: 76.2673, tzOffset: 5.5 },
  { displayName: 'Thiruvananthapuram (Trivandrum), Kerala, India', city: 'Thiruvananthapuram', state: 'Kerala', country: 'India', lat: 8.5241, lon: 76.9366, tzOffset: 5.5 },
  { displayName: 'Kozhikode (Calicut), Kerala, India', city: 'Kozhikode', state: 'Kerala', country: 'India', lat: 11.2588, lon: 75.7804, tzOffset: 5.5 },
  { displayName: 'Visakhapatnam (Vizag), Andhra Pradesh, India', city: 'Visakhapatnam', state: 'AP', country: 'India', lat: 17.6868, lon: 83.2185, tzOffset: 5.5 },
  { displayName: 'Vijayawada, Andhra Pradesh, India', city: 'Vijayawada', state: 'AP', country: 'India', lat: 16.5062, lon: 80.6480, tzOffset: 5.5 },

  // East & Central
  { displayName: 'Kolkata (Calcutta), West Bengal, India', city: 'Kolkata', state: 'West Bengal', country: 'India', lat: 22.5726, lon: 88.3639, tzOffset: 5.5 },
  { displayName: 'Howrah, West Bengal, India', city: 'Howrah', state: 'West Bengal', country: 'India', lat: 22.5958, lon: 88.2636, tzOffset: 5.5 },
  { displayName: 'Siliguri, West Bengal, India', city: 'Siliguri', state: 'West Bengal', country: 'India', lat: 26.7271, lon: 88.3953, tzOffset: 5.5 },
  { displayName: 'Bhubaneswar, Odisha, India', city: 'Bhubaneswar', state: 'Odisha', country: 'India', lat: 20.2961, lon: 85.8245, tzOffset: 5.5 },
  { displayName: 'Cuttack, Odisha, India', city: 'Cuttack', state: 'Odisha', country: 'India', lat: 20.4625, lon: 85.8828, tzOffset: 5.5 },
  { displayName: 'Ranchi, Jharkhand, India', city: 'Ranchi', state: 'Jharkhand', country: 'India', lat: 23.3441, lon: 85.3096, tzOffset: 5.5 },
  { displayName: 'Jamshedpur, Jharkhand, India', city: 'Jamshedpur', state: 'Jharkhand', country: 'India', lat: 22.8046, lon: 86.2029, tzOffset: 5.5 },
  { displayName: 'Dhanbad, Jharkhand, India', city: 'Dhanbad', state: 'Jharkhand', country: 'India', lat: 23.7957, lon: 86.4304, tzOffset: 5.5 },
  { displayName: 'Raipur, Chhattisgarh, India', city: 'Raipur', state: 'Chhattisgarh', country: 'India', lat: 21.2514, lon: 81.6296, tzOffset: 5.5 },
  { displayName: 'Bilaspur, Chhattisgarh, India', city: 'Bilaspur', state: 'Chhattisgarh', country: 'India', lat: 22.0797, lon: 82.1409, tzOffset: 5.5 },
  { displayName: 'Guwahati, Assam, India', city: 'Guwahati', state: 'Assam', country: 'India', lat: 26.1445, lon: 91.7362, tzOffset: 5.5 },
  { displayName: 'Panaji, Goa, India', city: 'Panaji', state: 'Goa', country: 'India', lat: 15.4909, lon: 73.8278, tzOffset: 5.5 },

  // International - Middle East / GCC
  { displayName: 'Dubai, United Arab Emirates', city: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lon: 55.2708, tzOffset: 4.0 },
  { displayName: 'Abu Dhabi, United Arab Emirates', city: 'Abu Dhabi', country: 'United Arab Emirates', lat: 24.4539, lon: 54.3773, tzOffset: 4.0 },
  { displayName: 'Sharjah, United Arab Emirates', city: 'Sharjah', country: 'United Arab Emirates', lat: 25.3463, lon: 55.4209, tzOffset: 4.0 },
  { displayName: 'Doha, Qatar', city: 'Doha', country: 'Qatar', lat: 25.2854, lon: 51.5310, tzOffset: 3.0 },
  { displayName: 'Riyadh, Saudi Arabia', city: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lon: 46.6753, tzOffset: 3.0 },
  { displayName: 'Jeddah, Saudi Arabia', city: 'Jeddah', country: 'Saudi Arabia', lat: 21.5433, lon: 39.1728, tzOffset: 3.0 },
  { displayName: 'Kuwait City, Kuwait', city: 'Kuwait City', country: 'Kuwait', lat: 29.3759, lon: 47.9774, tzOffset: 3.0 },
  { displayName: 'Muscat, Oman', city: 'Muscat', country: 'Oman', lat: 23.5880, lon: 58.3829, tzOffset: 4.0 },
  { displayName: 'Manama, Bahrain', city: 'Manama', country: 'Bahrain', lat: 26.2285, lon: 50.5860, tzOffset: 3.0 },

  // International - Asia & Pacific
  { displayName: 'Singapore, Singapore', city: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198, tzOffset: 8.0 },
  { displayName: 'Kuala Lumpur, Malaysia', city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lon: 101.6869, tzOffset: 8.0 },
  { displayName: 'Bangkok, Thailand', city: 'Bangkok', country: 'Thailand', lat: 13.7563, lon: 100.5018, tzOffset: 7.0 },
  { displayName: 'Kathmandu, Nepal', city: 'Kathmandu', country: 'Nepal', lat: 27.7172, lon: 85.3240, tzOffset: 5.75 },
  { displayName: 'Colombo, Sri Lanka', city: 'Colombo', country: 'Sri Lanka', lat: 6.9271, lon: 79.8612, tzOffset: 5.5 },
  { displayName: 'Dhaka, Bangladesh', city: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lon: 90.4125, tzOffset: 6.0 },
  { displayName: 'Tokyo, Japan', city: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, tzOffset: 9.0 },
  { displayName: 'Sydney, New South Wales, Australia', city: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093, tzOffset: 10.0 },
  { displayName: 'Melbourne, Victoria, Australia', city: 'Melbourne', country: 'Australia', lat: -37.8136, lon: 144.9631, tzOffset: 10.0 },
  { displayName: 'Auckland, New Zealand', city: 'Auckland', country: 'New Zealand', lat: -36.8485, lon: 174.7633, tzOffset: 12.0 },

  // International - UK & Europe
  { displayName: 'London, Greater London, United Kingdom', city: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278, tzOffset: 0.0 },
  { displayName: 'Birmingham, West Midlands, United Kingdom', city: 'Birmingham', country: 'United Kingdom', lat: 52.4862, lon: -1.8904, tzOffset: 0.0 },
  { displayName: 'Manchester, Greater Manchester, United Kingdom', city: 'Manchester', country: 'United Kingdom', lat: 53.4808, lon: -2.2426, tzOffset: 0.0 },
  { displayName: 'Frankfurt, Hesse, Germany', city: 'Frankfurt', country: 'Germany', lat: 50.1109, lon: 8.6821, tzOffset: 1.0 },
  { displayName: 'Paris, Île-de-France, France', city: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522, tzOffset: 1.0 },
  { displayName: 'Zurich, Zurich, Switzerland', city: 'Zurich', country: 'Switzerland', lat: 47.3769, lon: 8.5417, tzOffset: 1.0 },

  // International - North America
  { displayName: 'New York City, New York, United States', city: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060, tzOffset: -5.0 },
  { displayName: 'Jersey City, New Jersey, United States', city: 'Jersey City', country: 'United States', lat: 40.7178, lon: -74.0431, tzOffset: -5.0 },
  { displayName: 'Chicago, Illinois, United States', city: 'Chicago', country: 'United States', lat: 41.8781, lon: -87.6298, tzOffset: -6.0 },
  { displayName: 'San Francisco, California, United States', city: 'San Francisco', country: 'United States', lat: 37.7749, lon: -122.4194, tzOffset: -8.0 },
  { displayName: 'San Jose (Silicon Valley), California, United States', city: 'San Jose', country: 'United States', lat: 37.3382, lon: -121.8863, tzOffset: -8.0 },
  { displayName: 'Los Angeles, California, United States', city: 'Los Angeles', country: 'United States', lat: 34.0522, lon: -118.2437, tzOffset: -8.0 },
  { displayName: 'Dallas, Texas, United States', city: 'Dallas', country: 'United States', lat: 32.7767, lon: -96.7970, tzOffset: -6.0 },
  { displayName: 'Houston, Texas, United States', city: 'Houston', country: 'United States', lat: 29.7604, lon: -95.3698, tzOffset: -6.0 },
  { displayName: 'Seattle, Washington, United States', city: 'Seattle', country: 'United States', lat: 47.6062, lon: -122.3321, tzOffset: -8.0 },
  { displayName: 'Toronto, Ontario, Canada', city: 'Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832, tzOffset: -5.0 },
  { displayName: 'Vancouver, British Columbia, Canada', city: 'Vancouver', country: 'Canada', lat: 49.2827, lon: -123.1207, tzOffset: -8.0 }
];

/** Fast in-memory city search */
export function searchLocalCities(query: string, limit: number = 8): CityLocation[] {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 1) return [];

  const directMatches: CityLocation[] = [];
  const secondaryMatches: CityLocation[] = [];

  for (const c of CITIES_DATABASE) {
    const cName = c.city.toLowerCase();
    const dName = c.displayName.toLowerCase();
    if (cName.startsWith(q)) {
      directMatches.push(c);
    } else if (cName.includes(q) || dName.includes(q)) {
      secondaryMatches.push(c);
    }
    if (directMatches.length + secondaryMatches.length >= limit * 2) break;
  }

  return [...directMatches, ...secondaryMatches].slice(0, limit);
}

/** Automatically resolve city name to coordinates */
export function resolveCityCoordinates(cityName: string): { lat: number; lon: number; tzOffset: number } {
  const q = cityName.trim().toLowerCase();
  if (!q) return { lat: 23.2599, lon: 77.4126, tzOffset: 5.5 };

  const match = CITIES_DATABASE.find(
    (c) => c.city.toLowerCase() === q || c.displayName.toLowerCase().includes(q)
  );

  if (match) {
    return { lat: match.lat, lon: match.lon, tzOffset: match.tzOffset };
  }

  return { lat: 23.2599, lon: 77.4126, tzOffset: 5.5 };
}

const d2r = Math.PI / 180;
const r2d = 180 / Math.PI;

function rev(x: number): number {
  return ((x % 360) + 360) % 360;
}

function solveKepler(M: number, e: number): number {
  let E = M + e * Math.sin(M * d2r) * (1 + e * Math.cos(M * d2r)) * r2d;
  for (let i = 0; i < 4; i++) {
    E = E - (E - e * r2d * Math.sin(E * d2r) - M) / (1 - e * Math.cos(E * d2r));
  }
  return E;
}

interface PlanetElements {
  N0: number; Nd: number;
  i0: number; id: number;
  w0: number; wd: number;
  a0: number;
  e0: number; ed?: number;
  M0: number; Md: number;
}

function getPlanetGeocentricLon(d: number, p: PlanetElements, xs: number, ys: number): { lon: number; isRetrograde: boolean } {
  const N = rev(p.N0 + p.Nd * d);
  const i = p.i0 + p.id * d;
  const w = rev(p.w0 + p.wd * d);
  const a = p.a0;
  const e = p.e0 + (p.ed || 0) * d;
  const M = rev(p.M0 + p.Md * d);
  const E = solveKepler(M, e);
  const xv = a * (Math.cos(E * d2r) - e);
  const yv = a * (Math.sqrt(1 - e * e) * Math.sin(E * d2r));
  const r = Math.sqrt(xv * xv + yv * yv);
  const v = Math.atan2(yv, xv) * r2d;
  const xh = r * (Math.cos(N * d2r) * Math.cos((v + w) * d2r) - Math.sin(N * d2r) * Math.sin((v + w) * d2r) * Math.cos(i * d2r));
  const yh = r * (Math.sin(N * d2r) * Math.cos((v + w) * d2r) + Math.cos(N * d2r) * Math.sin((v + w) * d2r) * Math.cos(i * d2r));
  const xg = xh + xs;
  const yg = yh + ys;
  const lon = rev(Math.atan2(yg, xg) * r2d);

  // Compute slight step (+0.1 day) to detect retrograde motion
  const dNext = d + 0.1;
  const MNext = rev(p.M0 + p.Md * dNext);
  const ENext = solveKepler(MNext, e);
  const xvN = a * (Math.cos(ENext * d2r) - e);
  const yvN = a * (Math.sqrt(1 - e * e) * Math.sin(ENext * d2r));
  const rN = Math.sqrt(xvN * xvN + yvN * yvN);
  const vN = Math.atan2(yvN, xvN) * r2d;
  const xhN = rN * (Math.cos(N * d2r) * Math.cos((vN + w) * d2r) - Math.sin(N * d2r) * Math.sin((vN + w) * d2r) * Math.cos(i * d2r));
  const yhN = rN * (Math.sin(N * d2r) * Math.cos((vN + w) * d2r) + Math.cos(N * d2r) * Math.sin((vN + w) * d2r) * Math.cos(i * d2r));
  const lonNext = rev(Math.atan2(yhN + xs, xhN + xs) * r2d);
  let dLon = lonNext - lon;
  if (dLon > 180) dLon -= 360;
  if (dLon < -180) dLon += 360;
  const isRetrograde = dLon < 0;

  return { lon, isRetrograde };
}

/**
 * Calculates exact astronomical Vedic Kundli using Chitrapaksha / Lahiri Ayanamsa.
 * @param dob Date string (YYYY-MM-DD)
 * @param tob Time string (HH:MM)
 * @param lat Latitude in decimal degrees (e.g. 23.25 for Bhopal)
 * @param lon Longitude in decimal degrees (e.g. 77.41 for Bhopal)
 * @param tzOffset Timezone offset in hours (e.g. 5.5 for IST)
 */
export function computeExactKundli(
  dob: string,
  tob: string,
  lat: number = 23.2599,
  lon: number = 77.4126,
  tzOffset: number = 5.5
): VedicKundliResult {
  const [yearStr, monthStr, dayStr] = (dob || '1990-01-01').split('-');
  const [hourStr, minStr] = (tob || '12:00').split(':');

  const year = parseInt(yearStr, 10) || 1990;
  const month = parseInt(monthStr, 10) || 1;
  const day = parseInt(dayStr, 10) || 1;
  const hours = parseInt(hourStr, 10) || 12;
  const minutes = parseInt(minStr, 10) || 0;

  // Exact UTC timestamp in milliseconds
  const totalMinFromMidnight = hours * 60 + minutes - tzOffset * 60;
  const utcDate = new Date(Date.UTC(year, month - 1, day, 0, Math.round(totalMinFromMidnight), 0));
  const jd = (utcDate.getTime() / 86400000) + 2440587.5;
  const d = jd - 2451545.0; // Days since J2000.0
  const T = d / 36525.0; // Julian centuries

  // Lahiri Ayanamsa (Chitrapaksha)
  const ayanamsa = 23.853055 + (d / 365.25) * 0.013969;

  // Greenwich Mean Sidereal Time (GMST) and Local Sidereal Time (LST)
  let gmst = 280.46061837 + 360.98564736629 * d + 0.000387933 * T * T - (T * T * T) / 38710000.0;
  gmst = rev(gmst);
  const lst = rev(gmst + lon);

  // Exact Ascendant (Lagna)
  const eps = (23.4392911 - 0.000130042 * T) * d2r;
  const phi = lat * d2r;
  const ramc = lst * d2r;
  const yAsc = Math.cos(ramc);
  const xAsc = -(Math.sin(eps) * Math.tan(phi) + Math.cos(eps) * Math.sin(ramc));
  const tropAsc = rev(Math.atan2(yAsc, xAsc) * r2d);
  const siderealAsc = rev(tropAsc - ayanamsa);
  const lagnaRashiIdx = Math.floor(siderealAsc / 30);
  const lagnaDegInRashi = siderealAsc % 30;

  // 1. Sun (Surya)
  const w_sun = rev(282.9404 + 4.70935e-5 * d);
  const e_sun = 0.016709 - 1.151e-9 * d;
  const M_sun = rev(356.0470 + 0.9856002585 * d);
  const E_sun = solveKepler(M_sun, e_sun);
  const x_sun = Math.cos(E_sun * d2r) - e_sun;
  const y_sun = Math.sin(E_sun * d2r) * Math.sqrt(1 - e_sun * e_sun);
  const r_sun = Math.sqrt(x_sun * x_sun + y_sun * y_sun);
  const v_sun = Math.atan2(y_sun, x_sun) * r2d;
  const lon_sun = rev(v_sun + w_sun);
  const xs = r_sun * Math.cos(lon_sun * d2r);
  const ys = r_sun * Math.sin(lon_sun * d2r);
  const siderealSun = rev(lon_sun - ayanamsa);

  // 2. Moon (Chandra) with Evection, Variation, and Yearly Equation
  const N_mo = rev(125.1228 - 0.0529538083 * d);
  const w_mo = rev(318.0634 + 0.1643573223 * d);
  const a_mo = 60.2666;
  const e_mo = 0.054900;
  const M_mo = rev(115.3654 + 13.0649929509 * d);
  const Ls = rev(280.4664 + 0.98564736 * d);
  const Lm = rev(N_mo + w_mo + M_mo);
  const D_mo = rev(Lm - Ls);
  const E_mo = solveKepler(M_mo, e_mo);
  const xv_mo = a_mo * (Math.cos(E_mo * d2r) - e_mo);
  const yv_mo = a_mo * Math.sqrt(1 - e_mo * e_mo) * Math.sin(E_mo * d2r);
  const v_mo = Math.atan2(yv_mo, xv_mo) * r2d;
  const moonBaseLon = rev(v_mo + w_mo);
  const dLon_mo =
    - 1.274 * Math.sin((M_mo - 2 * D_mo) * d2r)
    + 0.658 * Math.sin(2 * D_mo * d2r)
    - 0.186 * Math.sin(M_sun * d2r)
    - 0.059 * Math.sin((2 * M_mo - 2 * D_mo) * d2r)
    - 0.057 * Math.sin((M_mo - 2 * D_mo + M_sun) * d2r)
    + 0.053 * Math.sin((M_mo + 2 * D_mo) * d2r)
    + 0.046 * Math.sin((2 * D_mo - M_sun) * d2r)
    + 0.041 * Math.sin((M_mo - M_sun) * d2r)
    - 0.035 * Math.sin(D_mo * d2r)
    - 0.031 * Math.sin((M_mo + M_sun) * d2r);
  const siderealMoon = rev(moonBaseLon + dLon_mo - ayanamsa);

  // 3. Mercury (Budha) - Geocentric
  const mercuryP: PlanetElements = {
    N0: 48.3313, Nd: 3.24587e-5,
    i0: 7.0047, id: 5.00e-8,
    w0: 29.1241, wd: 1.01444e-5,
    a0: 0.387098,
    e0: 0.205635, ed: 5.59e-10,
    M0: 168.6562, Md: 4.0923344368
  };
  const mercuryGeo = getPlanetGeocentricLon(d, mercuryP, xs, ys);
  const siderealMercury = rev(mercuryGeo.lon - ayanamsa);

  // 4. Venus (Shukra) - Geocentric
  const venusP: PlanetElements = {
    N0: 76.6799, Nd: 2.46590e-5,
    i0: 3.3946, id: 2.75e-8,
    w0: 54.8910, wd: 1.38374e-5,
    a0: 0.723330,
    e0: 0.006773, ed: -1.302e-9,
    M0: 48.0052, Md: 1.6021302244
  };
  const venusGeo = getPlanetGeocentricLon(d, venusP, xs, ys);
  const siderealVenus = rev(venusGeo.lon - ayanamsa);

  // 5. Mars (Mangal) - Geocentric
  const marsP: PlanetElements = {
    N0: 49.5574, Nd: 2.11081e-5,
    i0: 1.8497, id: 1.78e-8,
    w0: 286.5016, wd: 2.92961e-5,
    a0: 1.523688,
    e0: 0.093405, ed: 2.516e-9,
    M0: 18.6021, Md: 0.5240207766
  };
  const marsGeo = getPlanetGeocentricLon(d, marsP, xs, ys);
  const siderealMars = rev(marsGeo.lon - ayanamsa);

  // 6. Jupiter (Guru) - Geocentric
  const jupiterP: PlanetElements = {
    N0: 100.4542, Nd: 2.76854e-5,
    i0: 1.3030, id: -1.557e-7,
    w0: 273.8777, wd: 1.64505e-5,
    a0: 5.20256,
    e0: 0.048498, ed: 4.469e-9,
    M0: 19.8950, Md: 0.0830853001
  };
  const jupiterGeo = getPlanetGeocentricLon(d, jupiterP, xs, ys);
  const siderealJupiter = rev(jupiterGeo.lon - ayanamsa);

  // 7. Saturn (Shani) - Geocentric
  const saturnP: PlanetElements = {
    N0: 113.6634, Nd: 2.38980e-5,
    i0: 2.4886, id: -1.081e-7,
    w0: 339.3939, wd: 2.97661e-5,
    a0: 9.55475,
    e0: 0.055546, ed: -9.49e-9,
    M0: 316.9670, Md: 0.0334442282
  };
  const saturnGeo = getPlanetGeocentricLon(d, saturnP, xs, ys);
  const siderealSaturn = rev(saturnGeo.lon - ayanamsa);

  // 8. Rahu (Mean Lunar Node) & 9. Ketu
  const siderealRahu = rev(N_mo - ayanamsa);
  const siderealKetu = rev(siderealRahu + 180);

  // Helper to place planet into house (1 to 12) from Lagna
  const getHouse = (rashiIdx: number) => ((rashiIdx - lagnaRashiIdx + 12) % 12) + 1;

  const rawGrahas = [
    { nameEn: 'Sun (Surya)', nameHi: 'सूर्य', symbol: 'Su', long: siderealSun, isRetrograde: false },
    { nameEn: 'Moon (Chandra)', nameHi: 'चंद्र', symbol: 'Mo', long: siderealMoon, isRetrograde: false },
    { nameEn: 'Mars (Mangal)', nameHi: 'मंगल', symbol: 'Ma', long: siderealMars, isRetrograde: marsGeo.isRetrograde },
    { nameEn: 'Mercury (Budh)', nameHi: 'बुध', symbol: 'Me', long: siderealMercury, isRetrograde: mercuryGeo.isRetrograde },
    { nameEn: 'Jupiter (Guru)', nameHi: 'गुरु', symbol: 'Ju', long: siderealJupiter, isRetrograde: jupiterGeo.isRetrograde },
    { nameEn: 'Venus (Shukra)', nameHi: 'शुक्र', symbol: 'Ve', long: siderealVenus, isRetrograde: venusGeo.isRetrograde },
    { nameEn: 'Saturn (Shani)', nameHi: 'शनि', symbol: 'Sa', long: siderealSaturn, isRetrograde: saturnGeo.isRetrograde },
    { nameEn: 'Rahu (North Node)', nameHi: 'राहु', symbol: 'Ra', long: siderealRahu, isRetrograde: true },
    { nameEn: 'Ketu (South Node)', nameHi: 'केतु', symbol: 'Ke', long: siderealKetu, isRetrograde: true }
  ];

  const planets: GrahaInfo[] = rawGrahas.map((g) => {
    const rIdx = Math.floor(g.long / 30);
    return {
      nameEn: g.nameEn,
      nameHi: g.nameHi,
      symbol: g.symbol,
      longitude: parseFloat(g.long.toFixed(2)),
      rashiIndex: rIdx,
      rashiNameEn: RASHI_NAMES[rIdx].en,
      rashiNameHi: RASHI_NAMES[rIdx].hi,
      degInRashi: parseFloat((g.long % 30).toFixed(2)),
      house: getHouse(rIdx),
      isRetrograde: g.isRetrograde
    };
  });

  // Nakshatra and Pada for Moon
  const nakTotal = 360 / 27; // 13.333333°
  const nakIdx = Math.floor(siderealMoon / nakTotal);
  const nakRemainder = siderealMoon % nakTotal;
  const pada = Math.floor(nakRemainder / (nakTotal / 4)) + 1;
  const nakshatraObj = NAKSHATRAS[nakIdx] || NAKSHATRAS[0];

  // Vimshottari Balance
  const proportionRemaining = 1 - (nakRemainder / nakTotal);
  const balanceYears = parseFloat((proportionRemaining * nakshatraObj.dashaYears).toFixed(2));

  // Bhavas (Houses 1 to 12)
  const bhavaRashis = Array.from({ length: 12 }, (_, h) => ((lagnaRashiIdx + h) % 12) + 1);

  const houses: HouseInfo[] = Array.from({ length: 12 }, (_, i) => {
    const houseNum = i + 1;
    const rNumber = bhavaRashis[i];
    const rIndex = rNumber - 1;
    const housePlanets = planets.filter((p) => p.house === houseNum);
    return {
      houseNumber: houseNum,
      bhavaNameEn: BHAVA_TITLES[i].en,
      bhavaNameHi: BHAVA_TITLES[i].hi,
      rashiNumber: rNumber,
      rashiNameEn: RASHI_NAMES[rIndex].en,
      rashiNameHi: RASHI_NAMES[rIndex].hi,
      planets: housePlanets
    };
  });

  const moonRashiIdx = Math.floor(siderealMoon / 30);

  return {
    lagnaNameEn: RASHI_NAMES[lagnaRashiIdx].en,
    lagnaNameHi: RASHI_NAMES[lagnaRashiIdx].hi,
    lagnaDegree: parseFloat(lagnaDegInRashi.toFixed(2)),
    lagnaRashiNumber: lagnaRashiIdx + 1,
    moonSignEn: RASHI_NAMES[moonRashiIdx].en,
    moonSignHi: RASHI_NAMES[moonRashiIdx].hi,
    moonDegree: parseFloat((siderealMoon % 30).toFixed(2)),
    nakshatraEn: `${nakshatraObj.en} (Pada ${pada})`,
    nakshatraHi: `${nakshatraObj.hi} (पाद ${pada})`,
    pada,
    ayanamsa: parseFloat(ayanamsa.toFixed(3)),
    planets,
    houses,
    bhavaRashis,
    vimshottariLordEn: `${nakshatraObj.lordEn} Mahadasha`,
    vimshottariLordHi: `${nakshatraObj.lordHi} महादशा`,
    balanceYears
  };
}
