'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  id: number;
  restaurant_id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  toast: string | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      if (prev.length > 0 && prev[0].restaurant_id !== item.restaurant_id) {
        if (!confirm('다른 식당의 메뉴를 담으면 기존 장바구니가 초기화됩니다. 계속하시겠습니까?')) return prev;
        showToast(`🛒 ${item.name}이(가) 담겼습니다!`);
        return [{ ...item, quantity: 1 }];
      }
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        showToast(`🛒 ${item.name} 수량이 추가됐습니다!`);
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      showToast(`🛒 ${item.name}이(가) 담겼습니다!`);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    const item = cart.find((i) => i.id === id);
    if (item) showToast(`🗑️ ${item.name}이(가) 삭제됐습니다.`);
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => setCart([]);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, toast }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-bold z-50 animate-bounce">
          {toast}
        </div>
      )}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};