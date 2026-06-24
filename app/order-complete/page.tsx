import Link from 'next/link';

export default function OrderCompletePage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center text-center px-6">
      <div className="max-w-md w-full">
        {/* 애니메이션 원 */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-30"></div>
          <div className="absolute inset-0 bg-orange-50 rounded-full flex items-center justify-center">
            <span className="text-6xl">🎉</span>
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-3">주문 완료!</h1>
        <p className="text-gray-500 mb-2">주문이 성공적으로 접수됐습니다.</p>
        <p className="text-gray-400 text-sm mb-10">🛵 맛있는 음식이 곧 배달될 예정이에요!</p>

        {/* 상태 프로그레스 */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-black">✓</div>
            <p className="text-xs text-orange-500 font-bold mt-1">접수</p>
          </div>
          <div className="w-12 h-0.5 bg-gray-200"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs">🛵</div>
            <p className="text-xs text-gray-400 mt-1">배달중</p>
          </div>
          <div className="w-12 h-0.5 bg-gray-200"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs">✓</div>
            <p className="text-xs text-gray-400 mt-1">완료</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
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