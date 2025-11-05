'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden" aria-label="Hero section">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury hotel exterior with palm trees at sunset"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Experience Unparalleled Luxury
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-10 text-lg text-white/90 sm:text-xl md:text-2xl"
          >
            Where elegance meets tranquility in paradise
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/booking"
              className="rounded-md bg-[--gold] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[--gold-dark] focus:outline-none focus:ring-2 focus:ring-[--gold] focus:ring-offset-2 sm:text-lg"
              aria-label="Book your luxury stay now"
            >
              Book Your Stay
            </Link>
            <Link
              href="/rooms"
              className="rounded-md border-2 border-white bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 sm:text-lg"
              aria-label="Explore our luxury rooms"
            >
              Explore Rooms
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-white/80">Scroll to explore</span>
          <svg
            className="h-6 w-6 animate-bounce text-white/80"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
