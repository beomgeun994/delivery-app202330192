import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { comparePassword, signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = users[0];

    if (!user || !(await comparePassword(password, user.password))) {
      return NextResponse.json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    const token = await signToken({ id: user.id, email: user.email, name: user.name });
    (await cookies()).set('auth-token', token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 });
    
    return NextResponse.json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    return NextResponse.json({ error: '로그인 실패' }, { status: 500 });
  }
}