'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function BookingTeaser() {
  return (
    <section className="relative overflow-hidden bg-[--navy] px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="booking-heading">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="booking-heading" className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Your Luxury Escape Awaits
          </h2>
          <p className="mb-8 text-lg text-white/90 sm:text-xl">
            Book your dream vacation today and experience the epitome of elegance and comfort. 
            Special rates available for extended stays.
          </p>

          <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <div className="flex items-center gap-3 text-white">
              <svg className="h-6 w-6 text-[--gold]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <svg className="h-6 w-6 text-[--gold]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Free Cancellation</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <svg className="h-6 w-6 text-[--gold]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Instant Confirmation</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/booking"
              className="rounded-md bg-[--gold] px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[--gold-dark] focus:outline-none focus:ring-2 focus:ring-[--gold] focus:ring-offset-2 focus:ring-offset-[--navy]"
              aria-label="Check availability and book now"
            >
              Check Availability
            </Link>
            <Link
              href="/contact"
              className="rounded-md border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[--navy]"
              aria-label="Contact us for more information"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
