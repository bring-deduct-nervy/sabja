import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Luxury Haven Hotel & Spa',
  description: 'Read our terms of service to understand the guidelines for using our services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[--cream] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-bold text-[--navy] sm:text-5xl">Terms of Service</h1>
        <p className="mb-8 text-lg text-gray-600">This page is under construction.</p>
        <Link href="/" className="inline-block rounded-md bg-[--gold] px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[--gold-dark]">Return to Homepage</Link>
      </div>
    </div>
  );
}
