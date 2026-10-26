/**
 * Strict Centralized Form Validation Utility
 * Enforces step-by-step and global validations for booking, consultation, and layout intake.
 */

// Strict 10-digit Indian Mobile Regex (starts with 6, 7, 8, or 9)
export const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;

// Standard Email Regex
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Name Regex: English letters, Hindi devanagari, spaces, dots, hyphens (min 3 chars, max 60)
export const NAME_REGEX = /^[a-zA-Z\u0900-\u097F\s.'-]{3,60}$/;

// Common dummy phone numbers to reject
const REJECTED_PHONE_NUMBERS = new Set([
  '0000000000',
  '1111111111',
  '2222222222',
  '3333333333',
  '4444444444',
  '5555555555',
  '6666666666',
  '7777777777',
  '8888888888',
  '9999999999',
  '1234567890',
  '9876543210',
  '9999988888'
]);

// Common dummy names to reject
const REJECTED_DUMMY_NAMES = new Set([
  'test',
  'testing',
  'dummy',
  'asdf',
  'qwerty',
  'admin',
  'user',
  'sample',
  'anonymous',
  'null',
  'undefined'
]);

/**
 * Normalizes phone string by stripping +91, country code, spaces, dashes
 */
export function normalizePhone(phone: string): string {
  if (!phone) return '';
  const digitsOnly = phone.replace(/\D/g, '');
  // If starts with 91 and has 12 digits, strip country code
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    return digitsOnly.slice(2);
  }
  // If starts with 0 and has 11 digits, strip leading 0
  if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    return digitsOnly.slice(1);
  }
  return digitsOnly;
}

/**
 * Validates 10-digit mobile number strictly with regex /^[6-9]\d{9}$/
 */
export function validatePhone(phone: string, lang: 'en' | 'hi' = 'en'): { isValid: boolean; error?: string } {
  const normalized = normalizePhone(phone);
  if (!normalized) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'मोबाइल नंबर दर्ज करना अनिवार्य है।' : 'Mobile number is required.'
    };
  }

  if (normalized.length !== 10) {
    return {
      isValid: false,
      error: lang === 'hi' 
        ? 'कृपया पूरा 10-अंकों का मोबाइल नंबर दर्ज करें।' 
        : 'Please enter a complete 10-digit mobile number.'
    };
  }

  if (!INDIAN_PHONE_REGEX.test(normalized)) {
    return {
      isValid: false,
      error: lang === 'hi'
        ? 'कृपया 6, 7, 8 या 9 से शुरू होने वाला मान्य 10-अंकीय मोबाइल नंबर दर्ज करें।'
        : 'Must be a valid 10-digit mobile number starting with 6, 7, 8, or 9.'
    };
  }

  if (REJECTED_PHONE_NUMBERS.has(normalized)) {
    return {
      isValid: false,
      error: lang === 'hi'
        ? 'कृपया अपना वास्तविक व्यक्तिगत/व्यावसायिक नंबर दर्ज करें।'
        : 'Please provide a valid, active contact number (dummy numbers not accepted).'
    };
  }

  return { isValid: true };
}

/**
 * Validates Full Name strictly (letters & spaces only, min 3 chars, no dummy)
 */
export function validateName(name: string, lang: 'en' | 'hi' = 'en'): { isValid: boolean; error?: string } {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'पूरा नाम दर्ज करना अनिवार्य है।' : 'Full Name is required.'
    };
  }

  if (trimmed.length < 3) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'नाम कम से कम 3 अक्षरों का होना चाहिए।' : 'Name must be at least 3 characters long.'
    };
  }

  if (trimmed.length > 60) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'नाम 60 अक्षरों से अधिक नहीं हो सकता।' : 'Name cannot exceed 60 characters.'
    };
  }

  if (REJECTED_DUMMY_NAMES.has(trimmed.toLowerCase())) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'कृपया वास्तविक नाम दर्ज करें।' : 'Please enter your actual name (dummy names rejected).'
    };
  }

  if (!NAME_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'नाम में केवल अक्षर व स्पेस मान्य हैं।' : 'Name must contain letters only (numbers/symbols not allowed).'
    };
  }

  return { isValid: true };
}

/**
 * Validates Email (optional unless required)
 */
export function validateEmail(email: string, required = false, lang: 'en' | 'hi' = 'en'): { isValid: boolean; error?: string } {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    if (required) {
      return {
        isValid: false,
        error: lang === 'hi' ? 'ईमेल पता अनिवार्य है।' : 'Email address is required.'
      };
    }
    return { isValid: true };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'कृपया मान्य ईमेल पता दर्ज करें (उदा. user@domain.com)।' : 'Please enter a valid email address.'
    };
  }

  return { isValid: true };
}

/**
 * Validates City / Location
 */
export function validateCity(city: string, lang: 'en' | 'hi' = 'en'): { isValid: boolean; error?: string } {
  const trimmed = (city || '').trim();
  if (!trimmed) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'शहर / स्थान दर्ज करना अनिवार्य है।' : 'City / Location is required.'
    };
  }
  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'कृपया मान्य शहर दर्ज करें।' : 'Please enter a valid city name (minimum 2 characters).'
    };
  }
  return { isValid: true };
}

/**
 * Validates Date of Birth (must be valid past date)
 */
export function validateDob(dob: string, lang: 'en' | 'hi' = 'en'): { isValid: boolean; error?: string } {
  if (!dob || !dob.trim()) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'जन्म तिथि दर्ज करना अनिवार्य है।' : 'Date of Birth is required.'
    };
  }
  const dateObj = new Date(dob);
  if (isNaN(dateObj.getTime())) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'कृपया मान्य जन्म तिथि दर्ज करें।' : 'Please enter a valid date.'
    };
  }
  if (dateObj > new Date()) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'जन्म तिथि भविष्य की नहीं हो सकती।' : 'Date of birth cannot be in the future.'
    };
  }
  return { isValid: true };
}

/**
 * Validates Time of Birth (HH:MM)
 */
export function validateTob(tob: string, lang: 'en' | 'hi' = 'en'): { isValid: boolean; error?: string } {
  if (!tob || !tob.trim()) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'जन्म समय दर्ज करना अनिवार्य है।' : 'Time of Birth is required.'
    };
  }
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;
  if (!timeRegex.test(tob.trim())) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'कृपया मान्य जन्म समय दर्ज करें (उदा. 14:30)।' : 'Please enter a valid time (e.g. 14:30).'
    };
  }
  return { isValid: true };
}

/**
 * Validates Mandatory File Upload for Floor Plan
 */
export function validateFileUpload(
  file: File | null, 
  existingFileName?: string,
  lang: 'en' | 'hi' = 'en'
): { isValid: boolean; error?: string } {
  if (!file && !existingFileName) {
    return {
      isValid: false,
      error: lang === 'hi'
        ? 'फ़्लोर प्लान / लेआउट फ़ाइल (PDF, PNG, JPG, DWG) अपलोड करना अनिवार्य है।'
        : 'Property layout / blueprint file upload is strictly mandatory before proceeding.'
    };
  }

  if (file) {
    const allowedExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.dwg'];
    const nameLower = file.name.toLowerCase();
    const hasValidExt = allowedExtensions.some(ext => nameLower.endsWith(ext));

    if (!hasValidExt) {
      return {
        isValid: false,
        error: lang === 'hi'
          ? 'अमान्य फ़ाइल प्रारूप। केवल PDF, PNG, JPG, JPEG अथवा DWG मान्य हैं।'
          : 'Invalid file format. Only PDF, PNG, JPG, JPEG, and DWG are accepted.'
      };
    }

    // Max 25 MB
    const maxSizeBytes = 25 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return {
        isValid: false,
        error: lang === 'hi'
          ? 'फ़ाइल का आकार 25 MB से कम होना चाहिए।'
          : 'File size exceeds maximum limit of 25 MB.'
      };
    }
  }

  return { isValid: true };
}

/**
 * Validates Floor Plan Wizard Step 1: Property Classification
 */
export function validateLayoutStep1(propertyType: string, lang: 'en' | 'hi' = 'en'): { isValid: boolean; error?: string } {
  const trimmed = (propertyType || '').trim();
  if (!trimmed) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'कृपया संपत्ति का प्रकार चुनें।' : 'Please actively select a property classification.'
    };
  }
  return { isValid: true };
}

/**
 * Validates Floor Plan Wizard Step 2: Cardinal Facing & Degree
 */
export function validateLayoutStep2(
  facingDirection: string, 
  facingDegree?: number, 
  lang: 'en' | 'hi' = 'en'
): { isValid: boolean; error?: string } {
  if (!facingDirection || !facingDirection.trim()) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'मुख्य द्वार की दिशा चुनना अनिवार्य है।' : 'Cardinal facing orientation is required.'
    };
  }

  if (facingDegree !== undefined && facingDegree !== null && !isNaN(facingDegree) && (facingDegree < 0 || facingDegree > 359)) {
    return {
      isValid: false,
      error: lang === 'hi' ? 'डिग्री 0° से 359° के बीच होनी चाहिए।' : 'Compass degree must be between 0° and 359°.'
    };
  }

  return { isValid: true };
}

/**
 * Validates Floor Plan Wizard Step 3: Consultation Review Areas
 */
export function validateLayoutStep3(reviewFocus: string[], lang: 'en' | 'hi' = 'en'): { isValid: boolean; error?: string } {
  if (!reviewFocus || reviewFocus.length === 0) {
    return {
      isValid: false,
      error: lang === 'hi' 
        ? 'कृपया कम से कम 1 प्राथमिक समीक्षा क्षेत्र का चयन करें।' 
        : 'Please select at least 1 primary review focus area.'
    };
  }
  return { isValid: true };
}

/**
 * Validates all steps of Floor Plan Layout review wizard
 */
export function validateLayoutAllSteps(
  data: {
    propertyType: string;
    facingDirection: string;
    facingDegree?: number;
    reviewFocus: string[];
    clientName: string;
    clientContact: string;
    uploadedFile?: File | null;
    fileName?: string;
  },
  lang: 'en' | 'hi' = 'en'
): { isValid: boolean; errors: Record<string, string>; firstInvalidStep?: number } {
  const errors: Record<string, string> = {};

  // Step 1
  const step1 = validateLayoutStep1(data.propertyType, lang);
  if (!step1.isValid && step1.error) {
    errors.propertyType = step1.error;
  }

  // Step 2
  const step2 = validateLayoutStep2(data.facingDirection, data.facingDegree, lang);
  if (!step2.isValid && step2.error) {
    errors.facingDirection = step2.error;
  }

  // Step 3
  const step3 = validateLayoutStep3(data.reviewFocus, lang);
  if (!step3.isValid && step3.error) {
    errors.reviewFocus = step3.error;
  }

  // Step 4: File
  const fileCheck = validateFileUpload(data.uploadedFile || null, data.fileName, lang);
  if (!fileCheck.isValid && fileCheck.error) {
    errors.uploadedFile = fileCheck.error;
  }

  // Step 4: Name
  const nameCheck = validateName(data.clientName, lang);
  if (!nameCheck.isValid && nameCheck.error) {
    errors.clientName = nameCheck.error;
  }

  // Step 4: Phone
  const phoneCheck = validatePhone(data.clientContact, lang);
  if (!phoneCheck.isValid && phoneCheck.error) {
    errors.clientContact = phoneCheck.error;
  }

  let firstInvalidStep: number | undefined;
  if (errors.propertyType) {
    firstInvalidStep = 1;
  } else if (errors.facingDirection) {
    firstInvalidStep = 2;
  } else if (errors.reviewFocus) {
    firstInvalidStep = 3;
  } else if (errors.uploadedFile || errors.clientName || errors.clientContact) {
    firstInvalidStep = 4;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    firstInvalidStep
  };
}
