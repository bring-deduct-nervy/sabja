'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop',
    alt: 'Luxurious hotel suite with ocean view',
  },
  {
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop',
    alt: 'Elegant hotel lobby with chandelier',
  },
  {
    src: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=2071&auto=format&fit=crop',
    alt: 'Infinity pool overlooking the ocean',
  },
  {
    src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop',
    alt: 'Spa treatment room with candles',
  },
  {
    src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop',
    alt: 'Fine dining restaurant interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
    alt: 'Hotel beach view at sunset',
  },
];

export default function GalleryTeaser() {
  return (
    <section className="bg-[--cream] px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 id="gallery-heading" className="mb-4 text-3xl font-bold text-[--navy] sm:text-4xl lg:text-5xl">
            A Glimpse of Paradise
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Explore our stunning facilities and discover why guests choose Luxury Haven
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/30" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-md border-2 border-[--navy] bg-transparent px-8 py-4 text-lg font-semibold text-[--navy] transition-all hover:bg-[--navy] hover:text-white focus:outline-none focus:ring-2 focus:ring-[--navy] focus:ring-offset-2"
            aria-label="View full gallery of hotel images"
          >
            View Full Gallery
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
