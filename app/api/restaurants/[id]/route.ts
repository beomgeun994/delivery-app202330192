import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await sql`SELECT * FROM restaurants WHERE id = ${id}`;
  return NextResponse.json(result[0]);
}