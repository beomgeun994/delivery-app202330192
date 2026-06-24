import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center text-center px-6">
      <div>
        <div className="text-8xl mb-6">🛵</div>
        <h1 className="text-4xl font-black text-gray-900 mb-3">404</h1>
        <p className="text-xl font-bold text-gray-600 mb-2">페이지를 찾을 수 없어요</p>
        <p className="text-gray-400 text-sm mb-8">요청하신 페이지가 존재하지 않습니다.</p>
        <Link href="/" className="bg-orange-500 text-white font-black px-8 py-3 rounded-xl hover:bg-orange-600 transition">
          🏪 홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}