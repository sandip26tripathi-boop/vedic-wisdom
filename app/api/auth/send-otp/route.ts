if (!(global as any).__vedic_otp_store) {
  (global as any).__vedic_otp_store = new Map<string, { otp: string; target: string; channel: string; expiresAt: number; attempts: number }>();
}
const otpStore: Map<string, { otp: string; target: string; channel: string; expiresAt: number; attempts: number }> = (global as any).__vedic_otp_store;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, mobileNumber, email, channel = 'mobile', countryCode = '+91', name = 'Vedic Seeker' } = body || {};

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    if (channel === 'email' || (email && !phone && !mobileNumber)) {
      const cleanEmail = String(email || '').trim().toLowerCase();
      if (!cleanEmail || !cleanEmail.includes('@')) {
        return new Response(
          JSON.stringify({ success: false, message: 'Please provide a valid email address.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      otpStore.set(cleanEmail, {
        otp: otpCode,
        target: cleanEmail,
        channel: 'email',
        expiresAt,
        attempts: 0
      });

      // Send Email via Nodemailer if SMTP credentials configured
      if (process.env.SMTP_HOST || process.env.EMAIL_USER) {
        try {
          const nodemailer = await import('nodemailer');
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
              user: process.env.SMTP_USER || process.env.EMAIL_USER,
              pass: process.env.SMTP_PASS || process.env.EMAIL_PASS
            }
          });

          await transporter.sendMail({
            from: `"Vedic Wisdom" <${process.env.EMAIL_USER || 'no-reply@vedicwisdom.org'}>`,
            to: cleanEmail,
            subject: `Your Vedic Wisdom Verification Code: ${otpCode}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #D4AF37; border-radius: 16px; background-color: #FAF9F6;">
                <h2 style="color: #0B0F19; margin-top: 0;">Vedic Wisdom Verification</h2>
                <p style="color: #475569; font-size: 14px;">Namaste ${name},</p>
                <p style="color: #475569; font-size: 14px;">Use the following 6-digit one-time code to securely verify your identity and access services:</p>
                <div style="margin: 24px 0; text-align: center;">
                  <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #B45309; background: #FFF; padding: 12px 24px; border: 2px solid #D4AF37; border-radius: 12px;">${otpCode}</span>
                </div>
                <p style="color: #64748B; font-size: 12px;">This code is valid for 5 minutes. Please do not share this code with anyone.</p>
              </div>
            `
          });
          console.log(`[Vercel Route Email OTP] Sent to ${cleanEmail}`);
        } catch (emailErr: any) {
          console.warn('[Vercel Route Email OTP Error]:', emailErr.message);
        }
      }

      const parts = cleanEmail.split('@');
      const maskedEmail = parts[0].length > 2 ? `${parts[0][0]}***${parts[0].slice(-1)}@${parts[1]}` : cleanEmail;

      return new Response(
        JSON.stringify({
          success: true,
          message: `6-digit verification code sent to ${maskedEmail}.`,
          target: maskedEmail,
          channel: 'email',
          devOtpPreview: otpCode
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Default: Mobile Phone OTP
    const rawNumber = String(mobileNumber || phone || '');
    const cleanPhone = rawNumber.replace(/\D/g, '').slice(-10);

    if (cleanPhone.length < 10) {
      return new Response(
        JSON.stringify({ success: false, message: 'Please provide a valid 10-digit mobile number.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    otpStore.set(cleanPhone, {
      otp: otpCode,
      target: cleanPhone,
      channel: 'mobile',
      expiresAt,
      attempts: 0
    });

    const maskedPhone = `+91 ${cleanPhone.slice(0, 2)}******${cleanPhone.slice(-2)}`;

    // If Fast2SMS key is present, try real SMS
    const fast2smsApiKey = process.env.FAST2SMS_API_KEY || process.env.SMS_API_KEY;
    if (fast2smsApiKey) {
      try {
        await fetch('https://www.fast2sms.com/dev/bulkV2', {
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
      } catch (e) {
        console.warn('SMS dispatch error', e);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `6-digit verification code sent to ${maskedPhone}.`,
        target: maskedPhone,
        channel: 'mobile',
        devOtpPreview: otpCode
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, message: err.message || 'Error processing verification' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
