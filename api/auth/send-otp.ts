export default async function handler(req: any, res: any) {
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
    const { phone, mobileNumber, countryCode = '+91', name = 'Vedic Seeker' } = req.body || {};
    const rawNumber = String(mobileNumber || phone || '');
    const cleanPhone = rawNumber.replace(/\D/g, '').slice(-10);

    if (cleanPhone.length < 10) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number.' });
    }

    const fullPhone = `${countryCode} ${cleanPhone}`;
    const waUrl = `https://wa.me/919009448601?text=${encodeURIComponent(
      `Namaste Vedic Wisdom, I am ${name}. Please verify my mobile number: ${fullPhone} to access services.`
    )}`;

    return res.status(200).json({
      success: true,
      message: '1-Click WhatsApp verification initiated.',
      waUrl,
      phone: fullPhone,
      verified: true
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Error processing request' });
  }
}
