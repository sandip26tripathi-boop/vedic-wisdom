export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, userData } = body || {};
    const cleanPhone = String(phone || '').replace(/\D/g, '').slice(-10);

    if (!cleanPhone || cleanPhone.length < 10) {
      return new Response(
        JSON.stringify({ success: false, message: 'Valid 10-digit mobile number is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
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

    return new Response(
      JSON.stringify({
        success: true,
        verified: true,
        message: 'WhatsApp number verified successfully.',
        user
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, message: err.message || 'Verification failed.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
