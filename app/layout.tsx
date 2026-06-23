import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import Navbar from '@/components/Navbar';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export const metadata = { title: '배달조아', description: '가장 빠른 배달앱' };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get('auth-token')?.value;
  const user = token ? await verifyToken(token) : null;

  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen text-gray-900">
        <CartProvider>
          <Navbar user={user} />
          <main className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}