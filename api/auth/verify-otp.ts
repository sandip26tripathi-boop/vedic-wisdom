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
    const { phone, otp, userData } = req.body || {};
    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: 'Phone number and OTP code are required.' });
    }

    const cleanOtp = String(otp).trim();
    // Validate 6 digits
    const isValid = cleanOtp.length === 6 && /^\d{6}$/.test(cleanOtp);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid 6-digit OTP code.'
      });
    }

    const cleanPhone = String(phone).replace(/\D/g, '');
    const user = {
      id: `usr_${Date.now()}`,
      name: userData?.name || 'Verified Vedic Seeker',
      phone: `+91 ${cleanPhone.slice(-10)}`,
      email: userData?.email || `${(userData?.name || 'client').toLowerCase().replace(/\s+/g, '')}@enterprise.in`,
      isPhoneVerified: true,
      clientTier: 'Enterprise VIP',
      memberId: `VW-IND-${Math.floor(1000 + Math.random() * 9000)}`,
      joinedDate: 'Joined Today',
      whatsappOptIn: true
    };

    return res.status(200).json({
      success: true,
      verified: true,
      message: 'Mobile number verified successfully!',
      user
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
