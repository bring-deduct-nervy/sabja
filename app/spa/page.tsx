import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spa & Wellness | Luxury Haven Hotel & Spa',
  description: 'Rejuvenate your body and mind with our exclusive spa treatments and wellness programs.',
};

export default function SpaPage() {
  return (
    <div className="min-h-screen bg-[--cream] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-bold text-[--navy] sm:text-5xl">
          Spa & Wellness
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          This page is under construction. Our spa services will be available soon.
        </p>
        <Link
          href="/"
          className="inline-block rounded-md bg-[--gold] px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[--gold-dark]"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
