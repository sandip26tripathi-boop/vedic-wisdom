import { NextResponse } from 'next/server';
import { validateLayoutPayload } from '../../../../api/intake/layout-review.ts';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lang = 'en' } = body || {};

    const validation = validateLayoutPayload(body, lang);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: lang === 'hi'
            ? 'फ़ॉर्म सत्यापन विफल रहा। कृपया लाल रंग में दर्शाई गई त्रुटियों को ठीक करें।'
            : 'Form validation failed. Please correct the highlighted errors.',
          errors: validation.errors
        },
        { status: 400 }
      );
    }

    const intakeId = `VW-INTAKE-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json({
      success: true,
      intakeId,
      message: lang === 'hi'
        ? 'फ़्लोर प्लान मूल्यांकन डेटा सफलतापूर्वक सत्यापित व पंजीकृत हुआ।'
        : 'Floor plan review intake successfully verified and registered under DPDP compliance.',
      data: {
        intakeId,
        receivedAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('[Layout Review Intake Route Error]:', error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Server error processing layout intake'
      },
      { status: 500 }
    );
  }
}
