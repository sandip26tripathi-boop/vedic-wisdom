import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Astrology Consultation' | 'Astro-Vastu Audit' | 'Academy Certification' | 'Digital Report';
  price: number; // In INR (₹)
  originalPrice?: number;
  badge?: string;
  turnaround?: string;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'vedic_wisdom_cart_session';
const COUPON_STORAGE_KEY = 'vedic_wisdom_coupon_session';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = sessionStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(COUPON_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync items to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  // Sync coupon to sessionStorage
  useEffect(() => {
    try {
      if (appliedCoupon) {
        sessionStorage.setItem(COUPON_STORAGE_KEY, appliedCoupon);
      } else {
        sessionStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {}
  }, [appliedCoupon]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Calculate discount from coupon
  let discount = 0;
  if (appliedCoupon && subtotal > 0) {
    const code = appliedCoupon.toUpperCase().trim();
    if (code === 'VEDIC10' || code === 'ACADEMY10') {
      discount = Math.round(subtotal * 0.10);
    } else if (code === 'SHREE' || code === 'VASTU500') {
      discount = subtotal > 500 ? 500 : 0;
    } else if (code === 'SCHOLARSHIP' || code === 'GURUKUL') {
      discount = Math.round(subtotal * 0.15);
    } else if (code === 'SPECIAL' || code === 'DIWALI') {
      discount = subtotal > 1000 ? 1000 : 0;
    }
  }

  // Ensure total is at least ₹1 if cart is not empty (for Razorpay compliance)
  const total = items.length === 0 ? 0 : Math.max(1, subtotal - discount);

  const applyCoupon = (rawCode: string): { success: boolean; message: string } => {
    const code = rawCode.toUpperCase().trim();
    if (!code) {
      return { success: false, message: 'Please enter a coupon code.' };
    }
    if (items.length === 0) {
      return { success: false, message: 'Add items or courses to your cart first.' };
    }

    if (code === 'VEDIC10' || code === 'ACADEMY10') {
      setAppliedCoupon(code);
      return { success: true, message: '10% Vedic discount successfully applied!' };
    }
    if (code === 'SHREE' || code === 'VASTU500') {
      if (subtotal < 1000) {
        return { success: false, message: 'Code SHREE requires minimum order of ₹1,000.' };
      }
      setAppliedCoupon(code);
      return { success: true, message: 'Flat ₹500 Vedic discount successfully applied!' };
    }
    if (code === 'SCHOLARSHIP' || code === 'GURUKUL') {
      setAppliedCoupon(code);
      return { success: true, message: 'Academic 15% scholarship discount successfully applied!' };
    }
    if (code === 'SPECIAL' || code === 'DIWALI') {
      if (subtotal < 2000) {
        return { success: false, message: 'Special promo requires minimum order of ₹2,000.' };
      }
      setAppliedCoupon(code);
      return { success: true, message: 'Flat ₹1,000 festive discount successfully applied!' };
    }

    return { success: false, message: 'Invalid promo code. Try "VEDIC10" or "SHREE".' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    // Automatically trigger slide-in drawer on adding
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    try {
      sessionStorage.removeItem(CART_STORAGE_KEY);
      sessionStorage.removeItem(COUPON_STORAGE_KEY);
    } catch {}
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        discount,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
