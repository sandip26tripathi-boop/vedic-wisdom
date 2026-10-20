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
    const { phone, countryCode = '+91' } = req.body || {};
    if (!phone || String(phone).replace(/\D/g, '').length < 6) {
      return res.status(400).json({ success: false, message: 'Valid phone number is required.' });
    }

    const cleanPhone = String(phone).replace(/\D/g, '');
    const fullPhone = `${countryCode} ${cleanPhone.slice(-10)}`;
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log(`[Vedic Auth Vercel] OTP for ${fullPhone}: ${generatedOtp}`);

    return res.status(200).json({
      success: true,
      message: `OTP sent successfully to ${fullPhone}`,
      otpPreview: generatedOtp,
      expiresIn: 300
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
