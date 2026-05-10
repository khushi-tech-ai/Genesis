import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import '../styles/tailwind.css';
import { Toaster } from 'sonner';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Genesis — The Operating System for Human Progress',
  description: 'Genesis transforms fragmented workforce and rehabilitation systems into coordinated human outcomes infrastructure for program administrators, staff, and participants.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${inter.variable}`}>
      <body className={inter.className}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--forest)',
              color: 'var(--ivory)',
              border: '1px solid rgba(245,242,235,0.15)',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
            },
          }}
        />
</body>
    </html>
  );
}