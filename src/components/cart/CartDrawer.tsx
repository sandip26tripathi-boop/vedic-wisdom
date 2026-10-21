import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext.tsx';
import { Language } from '../../types/index.ts';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Plus, 
  Minus 
} from 'lucide-react';

interface CartDrawerProps {
  currentLang: Language;
  onProceedToCheckout: () => void;
  onExploreServices: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  currentLang,
  onProceedToCheckout,
  onExploreServices,
}) => {
  const { 
    items, 
    totalItems, 
    subtotal, 
    total, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity 
  } = useCart();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div 
        onClick={closeCart}
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md lg:max-w-lg bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-100 shadow-2xl border-l border-[#D4AF37]/30 flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/60">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#B45309] dark:text-[#F3E5AB]">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-slate-900 dark:text-white">
                  {currentLang === 'en' ? 'Vedic Wisdom Cart' : 'आपकी वैदिक कार्ट'}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {totalItems} {currentLang === 'en' ? (totalItems === 1 ? 'selected service' : 'selected services') : 'चयनित सेवाएं'}
                </span>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close shopping cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1 max-w-xs">
                  <h4 className="font-cinzel font-bold text-base text-slate-900 dark:text-white">
                    {currentLang === 'en' ? 'Your cart is empty' : 'आपकी कार्ट अभी खाली है'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {currentLang === 'en' 
                      ? 'Add any industrial Vastu audit, KP astrology consultation, or digital report to proceed.'
                      : 'परामर्श, कोर्स या डिजिटल रिपोर्ट जोड़कर आगे बढ़ें।'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    onExploreServices();
                  }}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-sm transition-all cursor-pointer"
                >
                  {currentLang === 'en' ? 'Explore Services & Audits' : 'सेवाएं एवं परामर्श देखें'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 hover:border-[#D4AF37]/50 transition-all flex flex-col gap-3 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] border border-[#D4AF37]/25 inline-block">
                          {item.category}
                        </span>
                        <h4 className="font-cinzel text-sm font-bold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </h4>
                        {item.turnaround && (
                          <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                            <Clock className="w-3 h-3 text-[#D4AF37]" />
                            <span>{item.turnaround}</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                        title="Remove item"
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 dark:border-slate-700/60">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="min-h-[36px] min-w-[36px] flex items-center justify-center text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white cursor-pointer"
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="min-h-[36px] min-w-[36px] flex items-center justify-center text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white cursor-pointer"
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <span className="font-cinzel text-base font-bold text-[#B45309] dark:text-[#F3E5AB]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>{currentLang === 'en' ? 'Subtotal' : 'कुल योग'}</span>
                  <span className="font-mono font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>{currentLang === 'en' ? 'Vedic Advisory Taxes & GST' : 'कर एवं परामर्श शुल्क'}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{currentLang === 'en' ? 'Included (₹0 extra)' : 'शामिल'}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm sm:text-base font-bold">
                  <span className="text-slate-900 dark:text-white">{currentLang === 'en' ? 'Total Investment' : 'अंतिम राशि'}</span>
                  <span className="font-cinzel text-xl text-[#B45309] dark:text-[#F3E5AB]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Compliance & Commitment strip */}
              <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{currentLang === 'en' ? 'Strict Non-Demolition Spatial Vastu & Confidentiality Commitment' : 'बिना तोड़-फोड़ वास्तु एवं सुदृढ़ गोपनीयता प्रतिबद्धता'}</span>
              </div>

              {/* Proceed to Payment Action Button */}
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  onProceedToCheckout();
                }}
                className="w-full py-4 px-5 rounded-2xl font-black text-sm sm:text-base text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:brightness-105 shadow-xl shadow-[#D4AF37]/30 flex items-center justify-between transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-slate-950" />
                  <span>{currentLang === 'en' ? 'Proceed to Payment' : 'भुगतान हेतु आगे बढ़ें'}</span>
                </div>
                <div className="flex items-center space-x-1.5 font-mono font-black text-base">
                  <span>₹{total.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
