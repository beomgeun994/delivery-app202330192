import { sql } from '@/lib/db';
import MenuList from './MenuList';
import { notFound } from 'next/navigation';

export default async function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const restaurants = await sql`SELECT * FROM restaurants WHERE id = ${id}`;
  if (restaurants.length === 0) return notFound();
  
  const restaurant = restaurants[0];
  const menus = await sql`SELECT * FROM menus WHERE restaurant_id = ${id}`;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* 식당 헤더 */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-8">
        <div className="bg-gradient-to-br from-orange-400 to-orange-500 h-40 flex items-center justify-center text-7xl">
          🍽️
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold bg-orange-50 text-orange-500 px-3 py-1 rounded-full">{restaurant.category}</span>
              <h1 className="text-3xl font-black mt-2 text-gray-900">{restaurant.name}</h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">최소주문</p>
              <p className="text-xl font-black text-orange-500">{restaurant.min_order.toLocaleString()}원</p>
            </div>
          </div>
        </div>
      </div>

      {/* 메뉴 목록 */}
      <h2 className="text-xl font-black mb-4 text-gray-900">🍴 메뉴</h2>
      <MenuList menus={menus} restaurantId={restaurant.id} />
    </div>
  );
}