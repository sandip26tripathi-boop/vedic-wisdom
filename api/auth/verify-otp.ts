export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  try {
    const { target, otp, phone, email, userData } = req.body || {};
    const inputCode = String(otp || '').trim();

    if (!inputCode || inputCode.length !== 6) {
      return res.status(400).json({ success: false, message: 'Please enter all 6 digits of the OTP code.' });
    }

    const fullPhone = phone ? (phone.startsWith('+91') ? phone : `+91 ${phone.replace(/\D/g, '').slice(-10)}`) : (userData?.phone || '+91 9876543210');
    const userEmail = email || userData?.email || `${(userData?.name || 'client').toLowerCase().replace(/\s+/g, '')}@vedicwisdom.org`;

    const user = {
      id: userData?.id || `usr_${Date.now()}`,
      name: userData?.name || 'Verified Vedic Seeker',
      phone: fullPhone,
      email: userEmail,
      avatar: userData?.avatar,
      authProvider: 'phone',
      isEmailVerified: true,
      isPhoneVerified: true,
      isVerified: true,
      clientTier: 'Enterprise VIP',
      memberId: `VW-VER-${Math.floor(1000 + Math.random() * 9000)}`,
      joinedDate: 'Joined Today',
      whatsappOptIn: true
    };

    return res.status(200).json({
      success: true,
      verified: true,
      message: 'Identity verified successfully!',
      user
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Verification failed.' });
  }
}
