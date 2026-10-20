import crypto from 'crypto';

if (!(global as any).__vedic_otp_store) {
  (global as any).__vedic_otp_store = new Map<string, { hash: string; expiresAt: number; attempts: number }>();
}
const otpStore: Map<string, { hash: string; expiresAt: number; attempts: number }> = (global as any).__vedic_otp_store;

const OTP_SECRET = process.env.OTP_SECRET_SALT || 'vedic_wisdom_secure_salt_2026';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, countryCode = '+91' } = body || {};
    const cleanPhone = String(phone || '').replace(/\D/g, '').slice(-10);

    if (cleanPhone.length < 10) {
      return new Response(
        JSON.stringify({ success: false, message: 'Please provide a valid 10-digit mobile number.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const fullPhone = `${countryCode} ${cleanPhone}`;
    // Cryptographically secure 6-digit numeric OTP
    const otpCode = crypto.randomInt(100000, 1000000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes TTL

    // Hash OTP with salt
    const otpHash = crypto.createHmac('sha256', OTP_SECRET).update(`${cleanPhone}:${otpCode}`).digest('hex');
    const statelessSignature = crypto.createHmac('sha256', OTP_SECRET).update(`${cleanPhone}:${otpCode}:${expiresAt}`).digest('hex');
    const verificationToken = `${cleanPhone}:${expiresAt}:${statelessSignature}`;

    otpStore.set(cleanPhone, { hash: otpHash, expiresAt, attempts: 0 });

    const fast2smsApiKey = process.env.FAST2SMS_API_KEY || process.env.SMS_API_KEY || '';

    // Fast2SMS API integration for Real Indian Mobile SMS Delivery
    if (fast2smsApiKey) {
      try {
        const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
          method: 'POST',
          headers: {
            'authorization': fast2smsApiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            route: 'otp',
            variables_values: otpCode,
            numbers: cleanPhone
          })
        });

        const smsData: any = await response.json();
        if (smsData && (smsData.return === true || smsData.status_code === 200)) {
          console.log(`[Fast2SMS Real Gateway] SMS delivered successfully to ${cleanPhone}`);
        } else {
          console.warn(`[Fast2SMS Warning] Gateway status:`, smsData);
        }
      } catch (err: any) {
        console.error(`[Fast2SMS Delivery Error]:`, err.message);
      }
    } else {
      console.log(`[Vedic Auth SMS] FAST2SMS_API_KEY not set. Outgoing OTP for ${fullPhone}: [${otpCode}]`);
    }

    const isProduction = process.env.NODE_ENV === 'production' || Boolean(fast2smsApiKey);

    // In production mode, remove the on-screen "Development Mode OTP" badge completely
    // Return only `{ success: true, message: "OTP sent to your mobile phone." }`
    const responsePayload: any = {
      success: true,
      message: 'OTP sent to your mobile phone.',
      verificationToken,
      expiresIn: 300,
      isProduction
    };

    if (!isProduction) {
      responsePayload.devOtpPreview = otpCode;
    }

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, message: err.message || 'Error sending OTP' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
