import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Navigation, Footer } from "@/components/layout";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luxury Hotel | Experience Unparalleled Elegance",
    template: "%s | Luxury Hotel",
  },
  description:
    "Discover world-class luxury at our elegant hotel. Experience exceptional service, premium amenities, and unforgettable moments in a stunning setting.",
  keywords: [
    "luxury hotel",
    "5-star accommodation",
    "boutique hotel",
    "premium suites",
    "spa wellness",
    "fine dining",
  ],
  authors: [{ name: "Luxury Hotel" }],
  creator: "Luxury Hotel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luxuryhotel.com",
    siteName: "Luxury Hotel",
    title: "Luxury Hotel | Experience Unparalleled Elegance",
    description:
      "Discover world-class luxury at our elegant hotel. Experience exceptional service, premium amenities, and unforgettable moments.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury Hotel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Hotel | Experience Unparalleled Elegance",
    description:
      "Discover world-class luxury at our elegant hotel. Experience exceptional service and premium amenities.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex flex-col min-h-screen antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
