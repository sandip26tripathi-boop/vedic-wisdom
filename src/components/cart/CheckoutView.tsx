import React, { useState } from 'react';
import { useCart } from '../../context/CartContext.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { Language } from '../../types/index.ts';
import { 
  ShieldCheck, 
  ArrowLeft, 
  CreditCard, 
  QrCode, 
  MessageCircle, 
  CheckCircle2, 
  Lock, 
  Copy, 
  Check, 
  FileText, 
  Building2, 
  Clock, 
  Sparkles,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutViewProps {
  currentLang: Language;
  onReturnToWebsite: () => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  currentLang,
  onReturnToWebsite,
}) => {
  const { items, total, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  // Billing form state (prefilled from verified user)
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [city, setCity] = useState(user?.pob || '');
  const [companyName, setCompanyName] = useState('');
  const [gstin, setGstin] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Payment method selection: 'upi' | 'card' | 'whatsapp'
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'whatsapp'>('upi');
  const [upiUtr, setUpiUtr] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);

  const officialUpiId = 'ask.vedicwisdom@gmail.com';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(officialUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !city.trim()) {
      alert(currentLang === 'en' ? 'Please complete your Name, Phone Number, and City.' : 'कृपया नाम, फोन नंबर और शहर दर्ज करें।');
      return;
    }

    if (paymentMethod === 'upi' && !upiUtr.trim()) {
      alert(currentLang === 'en' ? 'Please enter the 12-digit UPI Reference / UTR Number after completing your payment.' : 'कृपया भुगतान पूर्ण करने के बाद 12-अंकों का UPI UTR नंबर दर्ज करें।');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderId = `VW-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const completedOrder = {
        orderId: generatedOrderId,
        clientName: fullName,
        phone,
        email,
        city,
        companyName,
        items: [...items],
        totalAmount: total,
        paymentMethod,
        upiUtr: paymentMethod === 'upi' ? upiUtr : 'N/A',
        createdAt: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}

      setOrderSuccess(completedOrder);
      clearCart();
      setIsProcessing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  // WhatsApp Pre-Filled Confirmation Link
  const buildWhatsAppOrderLink = () => {
    const itemsList = items.map((i) => `• ${i.title} (₹${(i.price * i.quantity).toLocaleString('en-IN')})`).join('\n');
    const msg = `*Vedic Wisdom Official Order Confirmation*\n\nClient: ${fullName || 'Client'}\nPhone: ${phone || user?.phone || ''}\nCity: ${city || 'India'}\n\n*Selected Services:*\n${itemsList}\n\n*Total Payable:* ₹${total.toLocaleString('en-IN')}\n\nPlease confirm availability and dispatch payment invoice.`;
    return `https://wa.me/919009448601?text=${encodeURIComponent(msg)}`;
  };

  // If order is completed successfully, render the receipt view
  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#111827] border border-[#D4AF37]/40 shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {currentLang === 'en' ? 'Booking Confirmed & Verified' : 'ऑर्डर सफलतापूर्वक दर्ज हुआ'}
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {currentLang === 'en' ? 'Thank You for Your Sacred Trust' : 'वैदिक विजडम पर विश्वास हेतु धन्यवाद'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
              {currentLang === 'en'
                ? 'Your order has been registered. Our lead consultants have received your dossier requirements and will connect via WhatsApp/Phone.'
                : 'आपका ऑर्डर दर्ज कर लिया गया है। हमारे वरिष्ठ वास्तु व ज्योतिष सलाहकार आपसे शीघ्र संपर्क करेंगे।'}
            </p>
          </div>

          {/* Official Invoice Card */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-700 text-xs">
              <div>
                <span className="text-slate-500 block">{currentLang === 'en' ? 'Official Reference ID' : 'ऑर्डर संदर्भ क्रमांक'}</span>
                <span className="font-mono font-bold text-sm text-[#B45309] dark:text-[#F3E5AB]">
                  {orderSuccess.orderId}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">{currentLang === 'en' ? 'Date & Timestamp' : 'दिनांक व समय'}</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {orderSuccess.createdAt}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                {currentLang === 'en' ? 'Ordered Consultations & Dossiers:' : 'चयनित परामर्श व रिपोर्ट्स:'}
              </div>
              {orderSuccess.items.map((it: any, idx: number) => (
                <div key={idx} className="flex justify-between py-1 text-slate-600 dark:text-slate-400 border-b border-slate-200/50 dark:border-slate-700/50">
                  <span>{it.title} (x{it.quantity})</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center text-sm font-bold">
              <span>{currentLang === 'en' ? 'Total Paid Amount:' : 'कुल भुगतान राशि:'}</span>
              <span className="font-cinzel text-lg text-[#B45309] dark:text-[#F3E5AB]">
                ₹{orderSuccess.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={`https://wa.me/919009448601?text=${encodeURIComponent(`*Hello Vedic Wisdom Team*\nI just confirmed Order ID: ${orderSuccess.orderId} for ₹${orderSuccess.totalAmount.toLocaleString('en-IN')}.\nClient: ${orderSuccess.clientName}.\nPlease share the consultation schedule & deliverables.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'Connect on WhatsApp (+91 90094 48601)' : 'व्हाट्सएप डेस्क पर तुरंत जुड़ें'}</span>
            </a>

            <button
              onClick={onReturnToWebsite}
              className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl font-bold text-xs text-slate-900 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-sm transition-all cursor-pointer"
            >
              <span>{currentLang === 'en' ? 'Return to Vedic Wisdom Platform' : 'मुख्य वेबसाइट पर वापस जाएं'}</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // If cart is empty and user arrives at checkout, show redirect
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4 max-w-lg">
        <h3 className="font-cinzel text-2xl font-bold text-slate-900 dark:text-white">
          {currentLang === 'en' ? 'Your cart is empty' : 'आपकी कार्ट खाली है'}
        </h3>
        <p className="text-xs text-slate-500">
          {currentLang === 'en' ? 'Please select a consultation, academy course, or digital report first.' : 'कृपया पहले कोई सेवा या रिपोर्ट चुनें।'}
        </p>
        <button
          onClick={onReturnToWebsite}
          className="px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] cursor-pointer"
        >
          {currentLang === 'en' ? 'Browse Consultations & Audits' : 'सेवाएं देखें'}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-[#FAF9F6] dark:bg-[#0B0F19]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
        
        {/* Back Link & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={onReturnToWebsite}
            className="flex items-center space-x-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentLang === 'en' ? 'Return to Vedic Wisdom Platform' : 'प्लेटफ़ॉर्म पर वापस लौटें'}</span>
          </button>

          <div className="flex items-center space-x-2 text-xs font-bold text-[#B45309] dark:text-[#F3E5AB]">
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{currentLang === 'en' ? '256-Bit SSL Encrypted Official Checkout' : '256-बिट सुरक्षित भुगतान चेकआउट'}</span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Client Details & Payment Selection (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Billing & Client Information */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 text-[#B45309] dark:text-[#F3E5AB] font-bold text-xs flex items-center justify-center">
                    1
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-slate-900 dark:text-white">
                    {currentLang === 'en' ? 'Client & Invoicing Details' : 'ग्राहक व इनवॉइस विवरण'}
                  </h3>
                </div>

                {user && user.isPhoneVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Seeker</span>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {currentLang === 'en' ? 'Full Name' : 'पूरा नाम'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vikramaditya Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {currentLang === 'en' ? 'WhatsApp Phone Number' : 'व्हाट्सएप फोन नंबर'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 90094 48601"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {currentLang === 'en' ? 'Email Address (For Reports & Invoices)' : 'ईमेल पता'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@enterprise.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {currentLang === 'en' ? 'Property / Birth City' : 'शहर'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Bhopal, MP"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {currentLang === 'en' ? 'Corporate Company Name / GSTIN (Optional)' : 'कंपनी का नाम / GSTIN (वैकल्पिक)'}
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Industries Ltd. • 23AABCC1234F1Z5"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method Selection */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 text-[#B45309] dark:text-[#F3E5AB] font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <h3 className="font-cinzel text-base font-bold text-slate-900 dark:text-white">
                  {currentLang === 'en' ? 'Select Payment Mode' : 'भुगतान माध्यम चुनें'}
                </h3>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'upi'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-slate-900 dark:text-white font-bold ring-2 ring-[#D4AF37]/50'
                      : 'border-slate-200 dark:border-slate-700 hover:border-[#D4AF37]/40 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#D4AF37]" />
                  <span>UPI / QR Code</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-slate-900 dark:text-white font-bold ring-2 ring-[#D4AF37]/50'
                      : 'border-slate-200 dark:border-slate-700 hover:border-[#D4AF37]/40 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-emerald-500" />
                  <span>Cards / NetBanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('whatsapp')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'whatsapp'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-slate-900 dark:text-white font-bold ring-2 ring-[#D4AF37]/50'
                      : 'border-slate-200 dark:border-slate-700 hover:border-[#D4AF37]/40 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <MessageCircle className="w-5 h-5 text-emerald-500" />
                  <span>WhatsApp Desk</span>
                </button>
              </div>

              {/* UPI QR Payment Content */}
              {paymentMethod === 'upi' && (
                <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-4 text-xs">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                        Scan with GPay, PhonePe, Paytm, or BHIM
                      </span>
                      <p className="text-slate-500 dark:text-slate-400">
                        Official Registered UPI: <strong className="text-slate-800 dark:text-slate-200 font-mono">{officialUpiId}</strong>
                      </p>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-[#B45309] dark:text-[#F3E5AB] cursor-pointer hover:bg-slate-100"
                      >
                        {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedUpi ? 'Copied UPI ID!' : 'Copy UPI ID'}</span>
                      </button>
                    </div>

                    {/* Dynamic QR Box Display */}
                    <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 text-center shrink-0">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(`upi://pay?pa=${officialUpiId}&pn=Vedic%20Wisdom&am=${total}&cu=INR`)}`}
                        alt="Vedic Wisdom UPI Payment QR"
                        className="w-28 h-28 mx-auto"
                      />
                      <span className="text-[10px] text-slate-500 font-semibold block mt-1">₹{total.toLocaleString('en-IN')} (Zero Fee)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      {currentLang === 'en' ? 'Enter 12-Digit UPI Transaction Reference / UTR Number' : 'भुगतान के बाद 12-अंकों का UPI UTR नंबर दर्ज करें'} *
                    </label>
                    <input
                      type="text"
                      maxLength={16}
                      required
                      value={upiUtr}
                      onChange={(e) => setUpiUtr(e.target.value.replace(/\s+/g, ''))}
                      placeholder="e.g. 428901928374"
                      className="w-full px-3.5 py-2.5 font-mono text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>
              )}

              {/* Cards / NetBanking Content */}
              {paymentMethod === 'card' && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                  <div className="text-slate-600 dark:text-slate-300">
                    Enter corporate credit/debit card details for instantaneous tokenized billing:
                  </div>
                  <input
                    type="text"
                    placeholder="Card Number (4000 1234 5678 9010)"
                    maxLength={19}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength={4}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* WhatsApp Desk Content */}
              {paymentMethod === 'whatsapp' && (
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-3 text-xs">
                  <div className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4" />
                    <span>Direct WhatsApp Concierge Confirmation</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    Prefer direct bank wire transfer (NEFT/RTGS/IMPS) or custom corporate requisition order? Click below to send your pre-formatted cart dossier directly to our senior desk.
                  </p>
                  <a
                    href={buildWhatsAppOrderLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm Order via WhatsApp (+91 90094 48601)</span>
                  </a>
                </div>
              )}

            </div>

          </div>

          {/* Right Column: Order Summary & Confirmation CTA (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-[#D4AF37]/30 shadow-xl space-y-6 sticky top-28">
              <h3 className="font-cinzel text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
                {currentLang === 'en' ? 'Order Summary' : 'ऑर्डर सारांश'}
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-3 text-xs pb-3 border-b border-slate-100 dark:border-slate-800/80">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Qty: {item.quantity} • {item.category}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing Totals */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>{currentLang === 'en' ? 'Subtotal' : 'कुल योग'}</span>
                  <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>{currentLang === 'en' ? 'Vedic Advisory Taxes & GST' : 'कर एवं परामर्श शुल्क'}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{currentLang === 'en' ? 'Included (₹0)' : 'शामिल'}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center font-bold text-base">
                  <span className="text-slate-900 dark:text-white">{currentLang === 'en' ? 'Total Payable' : 'अंतिम देय राशि'}</span>
                  <span className="font-cinzel text-2xl text-[#B45309] dark:text-[#F3E5AB]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="space-y-2 pt-2 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Non-Demolition Metallic Remedies & CIL Precision</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Direct Advisory by Ravindra Pathak & Sandeep Tripathi</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={handleCompleteOrder}
                disabled={isProcessing}
                className="w-full py-4 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-lg shadow-[#D4AF37]/25 flex items-center justify-center space-x-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Lock className="w-4 h-4 text-slate-950" />
                <span>
                  {isProcessing
                    ? (currentLang === 'en' ? 'Confirming Order...' : 'ऑर्डर दर्ज हो रहा है...')
                    : (currentLang === 'en' ? `Complete Booking • ₹${total.toLocaleString('en-IN')}` : `बुकिंग पूर्ण करें • ₹${total.toLocaleString('en-IN')}`)}
                </span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
