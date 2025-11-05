import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import Lightbox from '@/components/Lightbox';
import { useState } from 'react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
}

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Seeded gallery images
  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1631049307261-da0ec440d385?w=800&h=600&fit=crop',
      alt: 'Luxury hotel bedroom',
      title: 'Premium Suite',
      category: 'Rooms',
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
      alt: 'Elegant dining room',
      title: 'Fine Dining Restaurant',
      category: 'Dining',
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1604452881944-e0b63c5a9c43?w=800&h=600&fit=crop',
      alt: 'Spa and wellness center',
      title: 'Luxury Spa',
      category: 'Wellness',
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1562438905-4263f1b912ff?w=800&h=600&fit=crop',
      alt: 'Swimming pool area',
      title: 'Olympic Pool',
      category: 'Recreation',
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1578149102327-63a6003e3381?w=800&h=600&fit=crop',
      alt: 'Hotel lobby',
      title: 'Grand Lobby',
      category: 'Common Areas',
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1566612394529-994f2842efba?w=800&h=600&fit=crop',
      alt: 'Conference room',
      title: 'Meeting Room',
      category: 'Events',
    },
    {
      id: '7',
      src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      alt: 'Hotel terrace with city view',
      title: 'Rooftop Terrace',
      category: 'Common Areas',
    },
    {
      id: '8',
      src: 'https://images.unsplash.com/photo-1445523677193-36421c949f61?w=800&h=600&fit=crop',
      alt: 'Luxury hotel hallway',
      title: 'Corridor',
      category: 'Common Areas',
    },
  ];

  const categories = ['All', ...new Set(galleryImages.map((img) => img.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredImages =
    selectedCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <Layout
      title="Gallery"
      description="Explore our beautiful hotel spaces, rooms, and facilities through our gallery."
    >
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-xl">Explore the beauty of our hotel</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container-max">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-primary-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow h-64"
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                  <div className="w-full p-4 bg-gradient-to-t from-black to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-semibold">{image.title}</p>
                    <p className="text-sm text-gray-300">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <Lightbox
          images={filteredImages}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}

      {/* Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-8 text-center">Gallery Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🖼️</div>
              <h3 className="text-2xl font-bold mb-2">Responsive Design</h3>
              <p className="text-gray-600">
                Gallery adapts beautifully to all screen sizes, from mobile to desktop.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⌨️</div>
              <h3 className="text-2xl font-bold mb-2">Keyboard Navigation</h3>
              <p className="text-gray-600">
                Use arrow keys to navigate, ESC to close. Fully accessible experience.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-2">Fast Loading</h3>
              <p className="text-gray-600">
                Optimized images with lazy loading for instant gallery experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
