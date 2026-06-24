'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) {
      alert('비밀번호는 6자 이상이어야 합니다.');
      return;
    }
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(form),
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
          <div className="text-5xl mb-3">👋</div>
          <h1 className="text-3xl font-black text-gray-900">처음 오셨군요!</h1>
          <p className="text-gray-400 mt-2 text-sm">가입하고 맛있는 음식을 주문하세요</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              placeholder="이름"
              required
              className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-orange-500 transition text-sm font-medium"
            />
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              placeholder="이메일"
              required
              className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-orange-500 transition text-sm font-medium"
            />
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              placeholder="비밀번호"
              required
              className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-orange-500 transition text-sm font-medium"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-black py-4 rounded-xl hover:bg-orange-600 transition text-base"
            >
              가입하기 →
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-gray-400">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-orange-500 font-bold hover:underline">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}