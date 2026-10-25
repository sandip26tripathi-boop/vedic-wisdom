import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json(
        { success: false, message: 'Razorpay API credentials not configured on server' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { amount, currency = 'INR', receipt, notes } = body || {};

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount < 100) {
      return NextResponse.json(
        { success: false, message: 'Invalid amount. Minimum amount is 100 paise (₹1.00).' },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret
    });

    const options = {
      amount: Math.round(numericAmount),
      currency: String(currency).toUpperCase(),
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || { platform: 'Vedic Wisdom' }
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id
    });
  } catch (error: any) {
    console.error('[Razorpay Create Order Error]:', error);
    return NextResponse.json(
      { success: false, message: error?.error?.description || error.message || 'Failed to create Razorpay order' },
      { status: 500 }
    );
  }
}
