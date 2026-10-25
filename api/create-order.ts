import Razorpay from 'razorpay';

export default async function handler(req: any, res: any) {
  // CORS headers
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
    const key_id = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_Trxx5o2MCYdm01';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || '2GD8iVdtLQBXjK0QyCYSQg6Q';

    if (!key_id || !key_secret) {
      return res.status(401).json({
        success: false,
        message: 'Razorpay API credentials not configured on server'
      });
    }

    const { amount, currency = 'INR', receipt, notes } = req.body || {};

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount < 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount. Minimum amount is 100 paise (₹1.00).'
      });
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

    return res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id
    });
  } catch (error: any) {
    console.error('[Razorpay Create Order Error]:', error);
    return res.status(500).json({
      success: false,
      message: error?.error?.description || error.message || 'Failed to create Razorpay order'
    });
  }
}
