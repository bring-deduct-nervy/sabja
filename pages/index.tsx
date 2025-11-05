import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout
      title="Luxury Hotel"
      description="Welcome to our world-class hotel. Experience luxury, comfort, and exceptional service."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-24">
        <div className="container-max text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Luxury Hotel</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience unparalleled hospitality, world-class amenities, and breathtaking views.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/about" className="btn-primary">
              Learn About Us
            </Link>
            <Link href="/contact" className="btn-secondary">
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container-max">
          <h2 className="text-4xl font-bold text-center mb-12">Our Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏨</div>
              <h3 className="text-2xl font-bold mb-4">Luxury Accommodations</h3>
              <p className="text-gray-600">
                Elegantly designed rooms and suites with premium amenities and stunning views.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold mb-4">Fine Dining</h3>
              <p className="text-gray-600">
                Award-winning restaurants and bars offering exquisite cuisine from around the world.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💆</div>
              <h3 className="text-2xl font-bold mb-4">Wellness & Spa</h3>
              <p className="text-gray-600">
                Rejuvenate at our full-service spa with world-class treatments and facilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Experience Luxury?</h2>
          <Link href="/contact" className="btn-secondary">
            Get in Touch with Us
          </Link>
        </div>
      </section>
    </Layout>
  );
}
