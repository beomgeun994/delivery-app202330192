'use client';
import Link from 'next/link';
import { useCart } from './CartProvider';
import { useRouter } from 'next/navigation';

export default function Navbar({ user }: { user: any }) {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    clearCart();
    router.refresh();
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black text-orange-500 tracking-tight">
          🛵 배달조아
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/cart" className="relative flex items-center gap-1 text-gray-600 hover:text-orange-500 transition">
            🛒 장바구니
            {totalItems > 0 && (
              <span className="bg-orange-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <span className="text-gray-400">안녕하세요, <span className="text-gray-800 font-bold">{user.name}</span>님</span>
              <Link href="/orders" className="text-gray-600 hover:text-orange-500 transition">📋 내 주문</Link>
              <button onClick={handleLogout} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-full transition text-sm">로그아웃</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-orange-500 transition">로그인</Link>
              <Link href="/register" className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition font-bold">회원가입</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}