/**
 * Razorpay Standard Web Checkout Client Service
 * Official Documentation: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/
 */

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export interface RazorpayOrderResponse {
  success: boolean;
  order_id: string;
  amount: number;
  currency: string;
  key_id?: string;
  message?: string;
}

export interface RazorpayVerificationResponse {
  success: boolean;
  message: string;
  order_id?: string;
  payment_id?: string;
}

export interface RazorpaySuccessPayload {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  verified: boolean;
}

export interface InitiatePaymentOptions {
  amountInPaise: number;
  currency?: string;
  name?: string;
  description?: string;
  receipt?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  onSuccess: (result: RazorpaySuccessPayload) => void;
  onFailure: (error: any) => void;
  onDismiss?: () => void;
}

/**
 * Ensure Razorpay checkout.js script is loaded
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existing = document.querySelector('script[src*="checkout.razorpay.com"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay checkout script');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Call Backend to Create Razorpay Order (POST /api/create-order)
 */
export const createRazorpayOrder = async (
  amountInPaise: number,
  currency: string = 'INR',
  receipt?: string,
  notes?: Record<string, string>
): Promise<RazorpayOrderResponse> => {
  const response = await fetch('/api/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: amountInPaise,
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes
    })
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || `Failed to create order (${response.status})`);
  }

  return data;
};

/**
 * Call Backend to Verify Payment Signature (POST /api/verify-payment)
 */
export const verifyRazorpayPayment = async (payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): Promise<RazorpayVerificationResponse> => {
  const response = await fetch('/api/verify-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Signature verification failed');
  }

  return data;
};

/**
 * Standard Checkout Integration Flow:
 * 1. Create order on backend
 * 2. Open official Razorpay modal
 * 3. Verify payment signature on backend
 */
export const initiateRazorpayCheckout = async ({
  amountInPaise,
  currency = 'INR',
  name = 'Vedic Wisdom',
  description = 'Consultation & Spatial Advisory Services',
  receipt,
  prefill,
  notes,
  onSuccess,
  onFailure,
  onDismiss
}: InitiatePaymentOptions): Promise<void> => {
  try {
    // 1. Minimum amount check
    if (!amountInPaise || amountInPaise < 100) {
      throw new Error('Minimum payable amount is ₹1.00 (100 paise).');
    }

    // 2. Load SDK script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded || !window.Razorpay) {
      throw new Error('Unable to connect to Razorpay payment gateway. Please check your network connection.');
    }

    // 3. Create Order on Backend
    const orderData = await createRazorpayOrder(amountInPaise, currency, receipt, notes);

    // Key ID priority: returned by backend, or frontend env variable
    const keyId =
      orderData.key_id ||
      (import.meta as any).env?.VITE_RAZORPAY_KEY_ID ||
      'rzp_test_Trxx5o2MCYdm01';

    // 4. Configure Razorpay Standard Modal Options
    const options = {
      key: keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name,
      description,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=128&q=80',
      order_id: orderData.order_id,
      prefill: {
        name: prefill?.name || '',
        email: prefill?.email || '',
        contact: prefill?.contact || ''
      },
      notes: notes || {
        source: 'Vedic Wisdom Web Checkout'
      },
      theme: {
        color: '#B45309' // Luxury Vedic Amber / Gold Accent
      },
      modal: {
        confirm_close: true,
        ondismiss: () => {
          if (onDismiss) {
            onDismiss();
          }
        }
      },
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        try {
          // 5. Backend Signature Verification
          const verification = await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });

          if (verification.success) {
            onSuccess({
              ...response,
              verified: true
            });
          } else {
            onFailure(new Error(verification.message || 'Signature mismatch'));
          }
        } catch (verifyErr: any) {
          onFailure(verifyErr);
        }
      }
    };

    const razorpayInstance = new window.Razorpay(options);

    // Handle payment.failed event
    razorpayInstance.on('payment.failed', (response: any) => {
      console.error('[Razorpay Payment Failed]:', response.error);
      const errMsg = response.error?.description || response.error?.reason || 'Payment transaction failed';
      onFailure(new Error(errMsg));
    });

    // 6. Open Modal
    razorpayInstance.open();
  } catch (err: any) {
    console.error('[Razorpay Checkout Error]:', err);
    onFailure(err);
  }
};
