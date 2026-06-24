import Link from 'next/link';

export default function OrderCompletePage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center text-center px-6">
      <div>
        <div className="text-8xl mb-6">🎉</div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">주문이 완료됐습니다!</h1>
        <p className="text-gray-400 text-sm mb-8">맛있는 음식이 곧 배달될 예정이에요 🛵</p>
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <Link href="/orders" className="bg-orange-500 text-white font-black py-3 rounded-xl hover:bg-orange-600 transition">
            📋 주문 내역 보기
          </Link>
          <Link href="/" className="border-2 border-gray-200 text-gray-600 font-black py-3 rounded-xl hover:border-orange-500 hover:text-orange-500 transition">
            🏪 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}