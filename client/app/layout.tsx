import type { Metadata } from 'next';
import { Questrial } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth';
import { ToastProvider } from '@/components/ui/Toast';
import ErrorBoundary from '@/components/ErrorBoundary';

const questrial = Questrial({ 
  subsets: ['latin'],
  variable: '--font-questrial',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'CureBharat MLM Platform',
  description: 'Premium wellness insurance MLM management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={questrial.variable}>
      <body className="bg-[#0d0f14] text-[#e8eaf0] font-sans antialiased overflow-x-hidden">
        <ErrorBoundary>
          <AuthProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
