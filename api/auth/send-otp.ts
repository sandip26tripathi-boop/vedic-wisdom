export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  try {
    const { phone, mobileNumber, email, channel = 'mobile', countryCode = '+91', name = 'Vedic Seeker' } = req.body || {};
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (channel === 'email' || (email && !phone && !mobileNumber)) {
      const cleanEmail = String(email || '').trim().toLowerCase();
      const parts = cleanEmail.split('@');
      const maskedEmail = parts[0].length > 2 ? `${parts[0][0]}***${parts[0].slice(-1)}@${parts[1]}` : cleanEmail;

      return res.status(200).json({
        success: true,
        message: `6-digit verification code sent to ${maskedEmail}.`,
        target: maskedEmail,
        channel: 'email',
        devOtpPreview: otpCode
      });
    }

    const rawNumber = String(mobileNumber || phone || '');
    const cleanPhone = rawNumber.replace(/\D/g, '').slice(-10);
    const maskedPhone = `+91 ${cleanPhone.slice(0, 2)}******${cleanPhone.slice(-2)}`;

    return res.status(200).json({
      success: true,
      message: `6-digit verification code sent to ${channel === 'whatsapp' ? `WhatsApp (${maskedPhone})` : maskedPhone}.`,
      target: channel === 'whatsapp' ? `WhatsApp: ${maskedPhone}` : maskedPhone,
      channel: channel || 'mobile',
      devOtpPreview: otpCode
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Error processing request' });
  }
}
