import { sql } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function OrdersPage() {
  const token = (await cookies()).get('auth-token')?.value;
  if (!token) redirect('/login');

  const user = await verifyToken(token);
  if (!user) redirect('/login');

  const orders = await sql`
    SELECT o.*, r.name as restaurant_name 
    FROM orders o 
    JOIN restaurants r ON o.restaurant_id = r.id 
    WHERE o.user_id = ${user.id} 
    ORDER BY o.created_at DESC
  `;

  const statusConfig: { [key: string]: { emoji: string; color: string; bg: string } } = {
    '접수': { emoji: '📋', color: 'text-orange-500', bg: 'bg-orange-50' },
    '배달중': { emoji: '🛵', color: 'text-blue-500', bg: 'bg-blue-50' },
    '완료': { emoji: '✅', color: 'text-green-500', bg: 'bg-green-50' },
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-black mb-6">📋 내 주문 내역</h1>
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🍽️</div>
          <p className="text-xl font-black text-gray-900">아직 주문 내역이 없어요</p>
          <p className="text-gray-400 mt-2 text-sm">첫 주문을 해보세요!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status] || statusConfig['접수'];
            return (
              <div key={order.id} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-black ${status.color} ${status.bg}`}>
                    {status.emoji} {order.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleString('ko-KR')}
                  </span>
                </div>
                <h3 className="text-lg font-black text-gray-900">{order.restaurant_name}</h3>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-gray-400 text-sm">주문 #{order.id}</p>
                  <p className="text-orange-500 font-black text-lg">{order.total_price.toLocaleString()}원</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}