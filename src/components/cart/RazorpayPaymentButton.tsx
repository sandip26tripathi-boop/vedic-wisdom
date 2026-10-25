import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { initiateRazorpayCheckout, RazorpaySuccessPayload } from '../../services/razorpay.ts';
import { Language } from '../../types/index.ts';

interface RazorpayPaymentButtonProps {
  amountInInr: number;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  city?: string;
  notes?: Record<string, string>;
  currentLang?: Language;
  onPaymentSuccess: (result: RazorpaySuccessPayload) => void;
  onPaymentError?: (errorMessage: string) => void;
  disabled?: boolean;
  className?: string;
}

export const RazorpayPaymentButton: React.FC<RazorpayPaymentButtonProps> = ({
  amountInInr,
  clientName,
  clientPhone,
  clientEmail,
  city = 'India',
  notes,
  currentLang = 'en',
  onPaymentSuccess,
  onPaymentError,
  disabled = false,
  className = ''
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isHi = currentLang === 'hi';
  const amountInPaise = Math.round(amountInInr * 100);

  const handlePayClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic validation
    if (!clientName.trim() || !clientPhone.trim()) {
      const err = isHi
        ? 'कृपया आगे बढ़ने हेतु अपना नाम और फोन नंबर दर्ज करें।'
        : 'Please provide your Full Name and Mobile Number to proceed.';
      setErrorMessage(err);
      if (onPaymentError) onPaymentError(err);
      return;
    }

    setIsProcessing(true);

    await initiateRazorpayCheckout({
      amountInPaise,
      currency: 'INR',
      name: 'Vedic Wisdom',
      description: isHi ? 'वैदिक परामर्श एवं वास्तु सेवाएं' : 'Vedic Wisdom Consultation & Spatial Vastu',
      prefill: {
        name: clientName.trim(),
        email: clientEmail.trim() || 'client@vedicwisdom.org',
        contact: clientPhone.trim()
      },
      notes: {
        city,
        ...notes
      },
      onSuccess: (result) => {
        setIsProcessing(false);
        setErrorMessage(null);
        onPaymentSuccess(result);
      },
      onFailure: (error: any) => {
        setIsProcessing(false);
        const msg = error?.message || (isHi ? 'भुगतान प्रक्रिया असफल रही। कृपया पुनः प्रयास करें।' : 'Payment failed. Please try again.');
        setErrorMessage(msg);
        if (onPaymentError) onPaymentError(msg);
      },
      onDismiss: () => {
        setIsProcessing(false);
      }
    });
  };

  return (
    <div className="w-full space-y-2">
      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="button"
        onClick={handlePayClick}
        disabled={disabled || isProcessing}
        className={`w-full min-h-[50px] py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:brightness-105 shadow-lg shadow-[#D4AF37]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group ${className}`}
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            <span>{isHi ? 'Razorpay गेटवे से कनेक्ट हो रहा है...' : 'Connecting to Razorpay...'}</span>
          </>
        ) : (
          <>
            <Lock className="w-4 h-4 text-slate-950" />
            <span>
              {isHi
                ? `Razorpay द्वारा ₹${amountInInr.toLocaleString('en-IN')} का भुगतान करें`
                : `Pay ₹${amountInInr.toLocaleString('en-IN')} via Razorpay`}
            </span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        <span>
          {isHi
            ? 'Razorpay 256-बिट सुरक्षित भुगतान | UPI, कार्ड्स, नेटबैंकिंग'
            : '256-Bit Encrypted via Razorpay | UPI, Cards, NetBanking'}
        </span>
      </div>
    </div>
  );
};
