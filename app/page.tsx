import Hero from '@/components/Hero';
import HighlightCards from '@/components/HighlightCards';
import AmenitiesPreview from '@/components/AmenitiesPreview';
import BookingTeaser from '@/components/BookingTeaser';
import GalleryTeaser from '@/components/GalleryTeaser';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <HighlightCards />
      <AmenitiesPreview />
      <BookingTeaser />
      <GalleryTeaser />
      <Testimonials />
      <Footer />
    </main>
  );
}
