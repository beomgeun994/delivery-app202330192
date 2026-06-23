import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { hashPassword, signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`;
    
    if (existingUser.length > 0) {
      return NextResponse.json({ error: '이미 존재하는 이메일입니다.' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const result = await sql`
      INSERT INTO users (email, password, name) 
      VALUES (${email}, ${hashedPassword}, ${name}) 
      RETURNING id, email, name
    `;
    
    const user = result[0];
    const token = await signToken({ id: user.id, email: user.email, name: user.name });
    
    (await cookies()).set('auth-token', token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: '회원가입 실패' }, { status: 500 });
  }
}