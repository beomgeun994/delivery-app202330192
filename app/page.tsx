import { sql } from '@/lib/db';
import Link from 'next/link';

export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  
  const restaurants = category 
    ? await sql`SELECT * FROM restaurants WHERE category = ${category} ORDER BY id DESC`
    : await sql`SELECT * FROM restaurants ORDER BY id DESC`;

  const categories = ['한식', '중식', '일식', '양식', '치킨', '피자', '분식'];
  const categoryEmoji: { [key: string]: string } = {
    '한식': '🍚', '중식': '🥢', '일식': '🍣', '양식': '🍝', '치킨': '🍗', '피자': '🍕', '분식': '🌶️'
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      {/* 히어로 배너 */}
      <div className="bg-orange-500 rounded-3xl p-8 text-white">
        <p className="text-sm font-medium opacity-80">빠르고 맛있는</p>
        <h1 className="text-4xl font-black mt-1">지금 바로 주문하세요 🛵</h1>
        <p className="mt-2 opacity-80 text-sm">{restaurants.length}개 식당 · 즉시 배달</p>
      </div>

      {/* 카테고리 필터 */}
      <div>
        <h2 className="text-lg font-black mb-4 text-gray-900">카테고리</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Link href="/" className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition ${!category ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-900'}`}>
            전체보기
          </Link>
          {categories.map((c) => (
            <Link key={c} href={`/?category=${c}`} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition ${category === c ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-900'}`}>
              {categoryEmoji[c]} {c}
            </Link>
          ))}
        </div>
      </div>

      {/* 식당 목록 */}
      <div>
        <h2 className="text-lg font-black mb-4 text-gray-900">
          {category ? `${categoryEmoji[category]} ${category}` : '🏪 전체 식당'} 
          <span className="text-gray-400 font-normal text-sm ml-2">{restaurants.length}개</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurants.map((res) => (
            <Link key={res.id} href={`/restaurants/${res.id}`} className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 h-32 flex items-center justify-center text-5xl">
                {categoryEmoji[res.category] || '🍽️'}
              </div>
              <div className="p-4">
                <span className="text-xs font-bold bg-orange-50 text-orange-500 px-2 py-1 rounded-md">{res.category}</span>
                <h3 className="text-lg font-black mt-2 text-gray-900 group-hover:text-orange-500 transition">{res.name}</h3>
                <p className="text-sm text-gray-400 mt-1">최소주문 {res.min_order.toLocaleString()}원</p>
              </div>
            </Link>
          ))}
          {restaurants.length === 0 && (
            <p className="text-gray-400 text-center py-10 col-span-full">해당 카테고리의 식당이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}