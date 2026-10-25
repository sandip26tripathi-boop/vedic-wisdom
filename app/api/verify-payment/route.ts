import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_secret) {
      return NextResponse.json(
        { success: false, message: 'Razorpay secret key not configured on server' },
        { status: 401 }
      );
    }

    const bodyData = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = bodyData || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: 'Missing required payment verification fields' },
        { status: 400 }
      );
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(body.toString())
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf-8');
    const receivedBuffer = Buffer.from(String(razorpay_signature), 'utf-8');

    const isAuthentic =
      expectedBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

    if (isAuthentic) {
      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Payment verification failed: Signature mismatch' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('[Razorpay Verify Payment Error]:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Error verifying Razorpay signature' },
      { status: 500 }
    );
  }
}
