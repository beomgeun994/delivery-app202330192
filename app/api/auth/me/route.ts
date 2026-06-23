import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const token = (await cookies()).get('auth-token')?.value;
  if (!token) return NextResponse.json({ error: '비로그인' }, { status: 401 });
  const user = await verifyToken(token);
  if (!user) return NextResponse.json({ error: '만료' }, { status: 401 });
  return NextResponse.json(user);
}