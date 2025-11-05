import type { Metadata } from 'next';
import { Playfair_Display, Lora, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Luxury Hotel & Resorts | Premium Hospitality Experience',
    template: '%s | Luxury Hotel & Resorts',
  },
  description:
    'Experience unparalleled luxury and exceptional service at our premium hotels and resorts. Discover elegance, comfort, and world-class amenities.',
  keywords: [
    'luxury hotel',
    'premium resort',
    'five-star accommodation',
    'luxury hospitality',
    'boutique hotel',
  ],
  authors: [{ name: 'Luxury Hotel & Resorts' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Luxury Hotel & Resorts',
    title: 'Luxury Hotel & Resorts | Premium Hospitality Experience',
    description:
      'Experience unparalleled luxury and exceptional service at our premium hotels and resorts.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Hotel & Resorts | Premium Hospitality Experience',
    description:
      'Experience unparalleled luxury and exceptional service at our premium hotels and resorts.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${lora.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
