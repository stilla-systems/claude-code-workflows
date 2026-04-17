import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ideora — Content Intelligence Platform',
  description: 'Discover what is trending, why it is trending, and what to post today for maximum traction. The premier content intelligence platform for creators, brands, and agencies.',
  keywords: ['content intelligence', 'trend discovery', 'creator tools', 'content strategy', 'social media trends'],
  openGraph: {
    title: 'Ideora — Content Intelligence Platform',
    description: 'Real-time signals into daily content opportunities',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A12',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full" style={{ background: 'var(--bg-base)' }}>
        {children}
      </body>
    </html>
  );
}
