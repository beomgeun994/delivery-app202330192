'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      router.push('/');
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🍔</div>
          <h1 className="text-3xl font-black text-gray-900">다시 오셨군요!</h1>
          <p className="text-gray-400 mt-2 text-sm">로그인하고 맛있는 음식을 주문하세요</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일"
              required
              className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-orange-500 transition text-sm font-medium"
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
              className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-orange-500 transition text-sm font-medium"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-black py-4 rounded-xl hover:bg-orange-600 transition text-base"
            >
              로그인 →
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-gray-400">
            계정이 없으신가요?
          </p>
          <Link href="/register" className="block w-full mt-2 text-center border-2 border-orange-500 text-orange-500 font-black py-3 rounded-xl hover:bg-orange-50 transition">
            회원가입하기 →
          </Link>
        </div>
      </div>
    </div>
  );
}