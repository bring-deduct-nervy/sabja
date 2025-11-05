import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
}

export default function Layout({
  children,
  title = 'Luxury Hotel',
  description = 'Experience world-class hospitality and luxury accommodations.',
  ogImage = '/og-image.jpg',
  noindex = false,
}: LayoutProps) {
  const fullTitle = title.includes('Luxury Hotel') ? title : `${title} | Luxury Hotel`;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <link rel="icon" href="/favicon.ico" />
        {noindex && <meta name="robots" content="noindex, nofollow" />}
        <title>{fullTitle}</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}
