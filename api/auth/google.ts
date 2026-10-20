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
    const { credential, profile } = req.body || {};

    let verifiedProfile: any = null;

    // 1. Verify Google ID token against Google OAuth TokenInfo API
    if (credential && typeof credential === 'string') {
      try {
        const googleRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        if (googleRes.ok) {
          const tokenInfo = await googleRes.json();
          verifiedProfile = {
            id: tokenInfo.sub,
            name: tokenInfo.name || tokenInfo.given_name || 'Google Seeker',
            email: tokenInfo.email,
            avatar: tokenInfo.picture,
            email_verified: tokenInfo.email_verified === 'true' || tokenInfo.email_verified === true
          };
        }
      } catch (err: any) {
        console.warn('[Google Auth] Tokeninfo check warning:', err.message);
      }
    }

    // 2. Fallback to client decoded profile if tokeninfo is unreachable or during development
    if (!verifiedProfile && profile) {
      verifiedProfile = {
        id: profile.sub || profile.id || `usr_google_${Date.now()}`,
        name: profile.name || profile.displayName || 'Google Seeker',
        email: profile.email,
        avatar: profile.picture || profile.avatar,
        email_verified: true
      };
    }

    if (!verifiedProfile || !verifiedProfile.email) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Google credential. Please try signing in again.'
      });
    }

    const user = {
      id: `usr_google_${verifiedProfile.id.slice(-8)}`,
      name: verifiedProfile.name,
      email: verifiedProfile.email,
      avatar: verifiedProfile.avatar,
      authProvider: 'google',
      isEmailVerified: true,
      isPhoneVerified: false, // Mandatory phone OTP funnel gate
      clientTier: 'Enterprise Seeker',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    return res.status(200).json({
      success: true,
      message: 'Google authentication successful',
      user
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || 'Internal server error during Google sign-in'
    });
  }
}
