'use client';

import { Inter, Quicksand } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Layout/Sidebar';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });
const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/(auth)') || pathname === '/login' || pathname === '/signup' || pathname === '/onboarding';

  return (
    <html lang="en">
      <body className={`${inter.className} ${quicksand.variable}`}>
        <div className="flex h-screen overflow-hidden bg-gray-50">
          {!isAuthPage && <Sidebar />}
          <main className="flex-1 overflow-auto relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
