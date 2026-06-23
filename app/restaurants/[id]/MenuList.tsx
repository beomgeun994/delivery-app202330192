'use client';
import { useCart } from '@/components/CartProvider';

export default function MenuList({ menus, restaurantId }: { menus: any[], restaurantId: number }) {
  const { addToCart } = useCart();

  return (
    <div className="space-y-3">
      {menus.map((menu) => (
        <div key={menu.id} className="flex justify-between items-center bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-3xl">
              🍽️
            </div>
            <div>
              <h3 className="font-black text-gray-900">{menu.name}</h3>
              {menu.description && <p className="text-sm text-gray-400 mt-0.5">{menu.description}</p>}
              <p className="text-orange-500 font-black mt-1">{menu.price.toLocaleString()}원</p>
            </div>
          </div>
          <button
            onClick={() => addToCart({ id: menu.id, restaurant_id: restaurantId, name: menu.name, price: menu.price, quantity: 1 })}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold transition shrink-0"
          >
            + 담기
          </button>
        </div>
      ))}
    </div>
  );
}