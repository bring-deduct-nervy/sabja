import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luxury Haven Hotel & Spa | Experience Unparalleled Elegance",
  description: "Discover a world of luxury and tranquility at Luxury Haven Hotel & Spa. Experience exquisite rooms, world-class dining, rejuvenating spa treatments, and unparalleled service in the heart of paradise.",
  keywords: "luxury hotel, spa resort, fine dining, accommodation, wellness retreat, boutique hotel",
  openGraph: {
    title: "Luxury Haven Hotel & Spa | Experience Unparalleled Elegance",
    description: "Discover a world of luxury and tranquility at Luxury Haven Hotel & Spa. Experience exquisite rooms, world-class dining, rejuvenating spa treatments, and unparalleled service.",
    type: "website",
    locale: "en_US",
    siteName: "Luxury Haven Hotel & Spa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Haven Hotel & Spa | Experience Unparalleled Elegance",
    description: "Discover a world of luxury and tranquility at Luxury Haven Hotel & Spa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
