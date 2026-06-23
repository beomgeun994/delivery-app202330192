import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const token = (await cookies()).get('auth-token')?.value;
  if (!token) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });

  const user = await verifyToken(token);
  if (!user) return NextResponse.json({ error: '유효하지 않은 토큰입니다.' }, { status: 401 });

  const { restaurant_id, total_price, items } = await req.json();

  try {
    // 1. 주문 생성
    const orderResult = await sql`
      INSERT INTO orders (user_id, restaurant_id, total_price, status) 
      VALUES (${user.id}, ${restaurant_id}, ${total_price}, '접수') 
      RETURNING id
    `;
    const orderId = orderResult[0].id;

    // 2. 주문 상세 항목 생성 (Neon Serverless는 트랜잭션이 제한적일 수 있어 순차 처리)
    for (const item of items) {
      await sql`
        INSERT INTO order_items (order_id, menu_id, quantity, price) 
        VALUES (${orderId}, ${item.id}, ${item.quantity}, ${item.price})
      `;
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    return NextResponse.json({ error: '주문 실패' }, { status: 500 });
  }
}