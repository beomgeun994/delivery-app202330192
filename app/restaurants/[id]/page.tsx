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
    <div>
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 border border-gray-100">
        <h1 className="text-2xl font-bold">{restaurant.name}</h1>
        <p className="text-gray-500 text-sm mt-1">{restaurant.category} • 최소주문 {restaurant.min_order.toLocaleString()}원</p>
      </div>
      
      <h2 className="text-lg font-bold mb-4">메뉴</h2>
      <MenuList menus={menus} restaurantId={restaurant.id} />
    </div>
  );
}