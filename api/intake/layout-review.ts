import type { Request, Response } from 'express';

// Strict Indian Mobile Regex (starts with 6, 7, 8, 9)
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;
const NAME_REGEX = /^[a-zA-Z\u0900-\u097F\s.'-]{3,60}$/;
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

export function normalizePhoneNumber(phone: string): string {
  if (!phone) return '';
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    return digitsOnly.slice(2);
  }
  if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    return digitsOnly.slice(1);
  }
  return digitsOnly;
}

export function validateLayoutPayload(body: any, lang: 'en' | 'hi' = 'en') {
  const errors: Record<string, string> = {};

  const {
    propertyType,
    facingDirection,
    facingDegree,
    reviewFocus,
    clientName,
    clientContact,
    fileName,
    fileSize
  } = body || {};

  // 1. Property Type
  if (!propertyType || typeof propertyType !== 'string' || !propertyType.trim()) {
    errors.propertyType = lang === 'hi'
      ? 'कृपया संपत्ति का प्रकार चुनें।'
      : 'Property classification must be actively selected.';
  }

  // 2. Facing Direction
  if (!facingDirection || typeof facingDirection !== 'string' || !facingDirection.trim()) {
    errors.facingDirection = lang === 'hi'
      ? 'मुख्य प्रवेश द्वार की दिशा चुनना अनिवार्य है।'
      : 'Cardinal facing direction is mandatory.';
  }

  // Facing degree
  if (facingDegree !== undefined && facingDegree !== null && facingDegree !== '') {
    const numDeg = Number(facingDegree);
    if (isNaN(numDeg) || numDeg < 0 || numDeg > 359) {
      errors.facingDegree = lang === 'hi'
        ? 'डिग्री 0° से 359° के बीच होनी चाहिए।'
        : 'Compass degree must be between 0° and 359°.';
    }
  }

  // 3. Review Focus
  if (!Array.isArray(reviewFocus) || reviewFocus.length === 0) {
    errors.reviewFocus = lang === 'hi'
      ? 'कम से कम एक समीक्षा क्षेत्र चुनना अनिवार्य है।'
      : 'At least one review focus area is mandatory.';
  }

  // 4. File Upload (Strictly Mandatory)
  if (!fileName || typeof fileName !== 'string' || !fileName.trim()) {
    errors.fileName = lang === 'hi'
      ? 'फ़्लोर प्लान / लेआउट फ़ाइल (PDF, PNG, JPG, DWG) अपलोड करना अनिवार्य है।'
      : 'Property blueprint / layout file upload is strictly mandatory.';
  } else {
    const allowed = ['.pdf', '.png', '.jpg', '.jpeg', '.dwg'];
    const nameLower = fileName.toLowerCase();
    const hasValidExt = allowed.some(ext => nameLower.endsWith(ext));
    if (!hasValidExt) {
      errors.fileName = lang === 'hi'
        ? 'अमान्य फ़ाइल प्रारूप। केवल PDF, PNG, JPG, JPEG अथवा DWG मान्य हैं।'
        : 'Invalid file format. Only PDF, PNG, JPG, JPEG, and DWG are accepted.';
    }
    if (fileSize && Number(fileSize) > 25 * 1024 * 1024) {
      errors.fileSize = lang === 'hi'
        ? 'फ़ाइल 25 MB से अधिक नहीं हो सकती।'
        : 'File size must not exceed 25 MB.';
    }
  }

  // 5. Client Name
  const trimmedName = (clientName || '').trim();
  if (!trimmedName) {
    errors.clientName = lang === 'hi'
      ? 'पूरा नाम दर्ज करना अनिवार्य है।'
      : 'Full name is mandatory.';
  } else if (trimmedName.length < 3) {
    errors.clientName = lang === 'hi'
      ? 'नाम कम से कम 3 अक्षरों का होना चाहिए।'
      : 'Name must be at least 3 characters.';
  } else if (trimmedName.length > 60) {
    errors.clientName = lang === 'hi'
      ? 'नाम 60 अक्षरों से अधिक नहीं हो सकता।'
      : 'Name cannot exceed 60 characters.';
  } else if (REJECTED_DUMMY_NAMES.has(trimmedName.toLowerCase())) {
    errors.clientName = lang === 'hi'
      ? 'कृपया वास्तविक नाम दर्ज करें।'
      : 'Please provide an authentic name (dummy names rejected).';
  } else if (!NAME_REGEX.test(trimmedName)) {
    errors.clientName = lang === 'hi'
      ? 'नाम में केवल अक्षर व स्पेस मान्य हैं।'
      : 'Name must contain only letters and standard spaces.';
  }

  // 6. Client Contact / Phone
  const normalizedPhone = normalizePhoneNumber(clientContact || '');
  if (!normalizedPhone) {
    errors.clientContact = lang === 'hi'
      ? 'मोबाइल नंबर दर्ज करना अनिवार्य है।'
      : 'Mobile number is mandatory.';
  } else if (normalizedPhone.length !== 10) {
    errors.clientContact = lang === 'hi'
      ? 'कृपया पूरा 10-अंकों का मोबाइल नंबर दर्ज करें।'
      : 'Please provide a valid 10-digit mobile number.';
  } else if (!INDIAN_PHONE_REGEX.test(normalizedPhone)) {
    errors.clientContact = lang === 'hi'
      ? 'कृपया 6, 7, 8 या 9 से शुरू होने वाला मान्य 10-अंकीय मोबाइल नंबर दर्ज करें।'
      : 'Must be a valid 10-digit mobile number starting with 6, 7, 8, or 9.';
  } else if (REJECTED_PHONE_NUMBERS.has(normalizedPhone)) {
    errors.clientContact = lang === 'hi'
      ? 'कृपया अपना वास्तविक व्यक्तिगत संपर्क नंबर दर्ज करें।'
      : 'Please provide an active personal number (dummy numbers rejected).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { lang = 'en' } = req.body || {};
    const validation = validateLayoutPayload(req.body, lang);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: lang === 'hi'
          ? 'फ़ॉर्म सत्यापन विफल रहा। कृपया लाल रंग में दर्शाई गई त्रुटियों को ठीक करें।'
          : 'Form validation failed. Please correct the highlighted errors.',
        errors: validation.errors
      });
    }

    const intakeId = `VW-INTAKE-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    return res.status(200).json({
      success: true,
      intakeId,
      message: lang === 'hi'
        ? 'फ़्लोर प्लान मूल्यांकन डेटा सफलतापूर्वक सत्यापित व पंजीकृत हुआ।'
        : 'Floor plan review intake successfully verified and registered under DPDP compliance.',
      data: {
        intakeId,
        receivedAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('[Layout Review Intake Error]:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Server error processing layout intake'
    });
  }
}
