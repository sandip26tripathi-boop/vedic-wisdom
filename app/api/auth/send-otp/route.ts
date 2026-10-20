export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, mobileNumber, countryCode = '+91', name = 'Vedic Seeker' } = body || {};
    const rawNumber = String(mobileNumber || phone || '');
    const cleanPhone = rawNumber.replace(/\D/g, '').slice(-10);

    if (cleanPhone.length < 10) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Please provide a valid 10-digit mobile number.' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const fullPhone = `${countryCode} ${cleanPhone}`;
    const waUrl = `https://wa.me/919009448601?text=${encodeURIComponent(
      `Namaste Vedic Wisdom, I am ${name}. Please verify my mobile number: ${fullPhone} to access services.`
    )}`;

    return new Response(
      JSON.stringify({
        success: true,
        message: '1-Click WhatsApp verification initiated.',
        waUrl,
        phone: fullPhone,
        verified: true
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
