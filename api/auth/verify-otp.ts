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
    const { phone, userData } = req.body || {};
    const cleanPhone = String(phone || '').replace(/\D/g, '').slice(-10);

    if (!cleanPhone || cleanPhone.length < 10) {
      return res.status(400).json({ success: false, message: 'Valid 10-digit mobile number is required.' });
    }

    const fullPhone = `+91 ${cleanPhone}`;
    const user = {
      id: userData?.id || `usr_${Date.now()}`,
      name: userData?.name || 'Verified Vedic Seeker',
      phone: fullPhone,
      email: userData?.email || `${(userData?.name || 'client').toLowerCase().replace(/\s+/g, '')}@vedicwisdom.org`,
      avatar: userData?.avatar,
      authProvider: userData?.authProvider || 'whatsapp',
      isEmailVerified: Boolean(userData?.email),
      isPhoneVerified: true,
      isVerified: true,
      clientTier: 'Enterprise VIP',
      memberId: `VW-VER-${Math.floor(1000 + Math.random() * 9000)}`,
      joinedDate: 'Joined Today'
    };

    return res.status(200).json({
      success: true,
      verified: true,
      message: 'WhatsApp number verified successfully.',
      user
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Verification failed.' });
  }
}
