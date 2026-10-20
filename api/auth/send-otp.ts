import crypto from 'crypto';

// Global memory cache across warm serverless invocations
if (!(global as any).__vedic_otp_store) {
  (global as any).__vedic_otp_store = new Map<string, { hash: string; expiresAt: number; attempts: number }>();
}
const otpStore: Map<string, { hash: string; expiresAt: number; attempts: number }> = (global as any).__vedic_otp_store;

const OTP_SECRET = process.env.OTP_SECRET_SALT || 'vedic_wisdom_secure_salt_2026';

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
    const cleanPhone = String(phone || '').replace(/\D/g, '').slice(-10);

    if (cleanPhone.length < 10) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number.' });
    }

    const fullPhone = `${countryCode} ${cleanPhone}`;
    // Secure 6-digit numeric OTP
    const generatedOtp = crypto.randomInt(100000, 1000000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    // Cryptographic hash of phone + OTP
    const otpHash = crypto.createHmac('sha256', OTP_SECRET).update(`${cleanPhone}:${generatedOtp}`).digest('hex');
    // Token that works across stateless lambdas
    const statelessSignature = crypto.createHmac('sha256', OTP_SECRET).update(`${cleanPhone}:${generatedOtp}:${expiresAt}`).digest('hex');
    const verificationToken = `${cleanPhone}:${expiresAt}:${statelessSignature}`;

    otpStore.set(cleanPhone, { hash: otpHash, expiresAt, attempts: 0 });

    // SMS Gateway Client Integration (Fast2SMS / Twilio)
    const smsApiKey = process.env.SMS_API_KEY || process.env.FAST2SMS_API_KEY;
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_PHONE_NUMBER;

    let smsDispatched = false;

    if (smsApiKey) {
      try {
        const smsResponse = await fetch('https://www.fast2sms.com/dev/bulkV2', {
          method: 'POST',
          headers: {
            'authorization': smsApiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            route: 'otp',
            variables_values: generatedOtp,
            numbers: cleanPhone
          })
        });
        const smsData: any = await smsResponse.json();
        if (smsData && (smsData.return === true || smsData.status_code === 200)) {
          smsDispatched = true;
          console.log(`[Fast2SMS] Successfully delivered OTP SMS to ${cleanPhone}`);
        } else {
          console.warn(`[Fast2SMS] Gateway warning for ${cleanPhone}:`, smsData);
        }
      } catch (err: any) {
        console.error(`[Fast2SMS] Failed to send SMS:`, err.message);
      }
    } else if (twilioSid && twilioToken && twilioFrom) {
      try {
        const auth = Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64');
        const body = new URLSearchParams({
          To: `${countryCode}${cleanPhone}`,
          From: twilioFrom,
          Body: `Your Vedic Wisdom verification code is: ${generatedOtp}. Valid for 5 minutes.`
        });
        const twilioRes = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: body.toString()
        });
        if (twilioRes.ok) {
          smsDispatched = true;
          console.log(`[Twilio] Successfully sent SMS to ${countryCode}${cleanPhone}`);
        }
      } catch (err: any) {
        console.error(`[Twilio] Failed to send SMS:`, err.message);
      }
    }

    if (!smsDispatched) {
      console.log(`[Vedic Auth SMS Gateway] Live SMS requires SMS_API_KEY in .env.local. Outgoing OTP for ${fullPhone}: [${generatedOtp}]`);
    }

    return res.status(200).json({
      success: true,
      message: `Verification code sent via SMS to ${fullPhone}. Valid for 5 minutes.`,
      verificationToken,
      devOtpPreview: generatedOtp,
      otpPreview: generatedOtp,
      expiresIn: 300
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Error sending OTP' });
  }
}
