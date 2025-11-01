import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Mkanaka Bailey - Portfolio & Web Development',
    template: '%s | Mkanaka Bailey'
  },
  description: 'Professional portfolio and web development services. Specializing in modern, responsive websites and full-stack applications.',
  keywords: ['web development', 'portfolio', 'Next.js', 'React', 'full-stack'],
  authors: [{ name: 'Mkanaka Bailey' }],
  creator: 'Mkanaka Bailey',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    title: 'Mkanaka Bailey - Portfolio & Web Development',
    description: 'Professional portfolio and web development services.',
    siteName: 'Mkanaka Bailey Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mkanaka Bailey Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mkanaka Bailey - Portfolio & Web Development',
    description: 'Professional portfolio and web development services.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}