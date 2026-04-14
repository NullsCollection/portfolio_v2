import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Raffy Francisco — Web Developer & Graphic Designer',
  description:
    'Filipino Web Developer and Graphic Designer based remotely. Specializing in React, Next.js, TypeScript, and UI design. Available for freelance & full-time remote roles.',
  keywords: [
    'web developer',
    'graphic designer',
    'Next.js',
    'React',
    'TypeScript',
    'Figma',
    'freelance',
    'remote',
    'Philippines',
  ],
  authors: [{ name: 'Raffy Francisco', url: 'https://www.nullscollection.art' }],
  creator: 'Raffy Francisco',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.nullscollection.art',
    title: 'Raffy Francisco — Web Developer & Graphic Designer',
    description:
      'Filipino Web Developer and Graphic Designer. Available for freelance & full-time remote.',
    siteName: 'NullzCollection',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raffy Francisco — Web Developer & Graphic Designer',
    description:
      'Filipino Web Developer and Graphic Designer. Available for freelance & full-time remote.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://www.nullscollection.art'),
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
