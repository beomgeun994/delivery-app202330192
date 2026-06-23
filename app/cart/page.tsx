'use client';
import { useCart } from '@/components/CartProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    const restaurant = await fetch(`/api/restaurants/${cart[0].restaurant_id}`).then(r => r.json());
    if (totalPrice < restaurant.min_order) {
      alert(`최소 주문금액은 ${restaurant.min_order.toLocaleString()}원입니다.`);
      return;
    }
    setLoading(true);

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        restaurant_id: cart[0].restaurant_id,
        total_price: totalPrice,
        items: cart
      })
    });

    if (res.ok) {
      clearCart();
      router.push('/orders');
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || '주문 처리 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  if (cart.length === 0) return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <div className="text-6xl mb-4">🛒</div>
      <p className="text-xl font-black text-gray-900">장바구니가 비어있어요</p>
      <p className="text-gray-400 mt-2 text-sm">맛있는 음식을 담아보세요!</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-black mb-6">🛒 장바구니</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-5">
            <div>
              <p className="font-black text-gray-900">{item.name}</p>
              <p className="text-orange-500 font-bold text-sm mt-1">{(item.price * item.quantity).toLocaleString()}원</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 font-bold transition">-</button>
                <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 font-bold transition">+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-400 transition text-lg">✕</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">총 결제금액</span>
          <span className="text-2xl font-black text-orange-500">{totalPrice.toLocaleString()}원</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full mt-4 bg-orange-500 text-white font-black py-4 rounded-2xl shadow-md hover:bg-orange-600 transition disabled:bg-gray-200 disabled:text-gray-400 text-lg"
      >
        {loading ? '주문 중...' : `${totalPrice.toLocaleString()}원 주문하기 🚀`}
      </button>
    </div>
  );
}