import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function About() {
  const staffMembers = [
    {
      name: 'John Smith',
      title: 'General Manager',
      description: 'With over 20 years of hospitality experience, John leads our team to excellence.',
    },
    {
      name: 'Sarah Johnson',
      title: 'Head Chef',
      description: 'Michelin-trained chef bringing culinary innovation to our dining experiences.',
    },
    {
      name: 'Michael Chen',
      title: 'Wellness Director',
      description: 'Expert in holistic wellness with certifications from leading international institutions.',
    },
    {
      name: 'Emma Rodriguez',
      title: 'Guest Relations Manager',
      description:
        'Dedicated to ensuring every guest has a memorable and personalized stay with us.',
    },
  ];

  return (
    <Layout
      title="About Us"
      description="Learn about our hotel's history, mission, and the team that makes luxury hospitality possible."
    >
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-4">About Luxury Hotel</h1>
          <p className="text-xl">Redefining hospitality since 1985</p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-8">Our History</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                Founded in 1985, Luxury Hotel has stood as a beacon of elegance and excellence for
                nearly four decades. What began as a vision to create the perfect refuge for
                discerning travelers has evolved into one of the world&apos;s most renowned hospitality
                destinations.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Our journey has been marked by continuous innovation, unwavering commitment to
                quality, and an absolute dedication to our guests. Each year, we refine our
                offerings while maintaining the timeless elegance that defines our brand.
              </p>
              <p className="text-lg text-gray-700">
                Today, we proudly serve guests from around the globe, each one leaving with
                cherished memories and a promise to return.
              </p>
            </div>
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl text-gray-600">🏨</p>
                <p className="text-gray-600 mt-2">Hero Hotel Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-12">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-primary-600">Excellence</h3>
              <p className="text-gray-700">
                We pursue excellence in every aspect of our operations, from room service to
                fine dining.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-primary-600">Hospitality</h3>
              <p className="text-gray-700">
                Genuine care for our guests drives us to anticipate needs and exceed expectations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-primary-600">Innovation</h3>
              <p className="text-gray-700">
                We embrace modern technology while preserving the timeless charm of luxury
                hospitality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-16">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-12 text-center">Meet Our Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {staffMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-32 flex items-center justify-center">
                  <span className="text-5xl">👤</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-3">{member.title}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-3xl">✨</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-gray-700">Every detail matters. We maintain the highest standards in all we do.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🌍</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p className="text-gray-700">We&apos;re committed to environmental responsibility and ethical practices.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🤝</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-gray-700">We invest in our team and the communities we serve.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Integrity</h3>
                <p className="text-gray-700">Honesty and transparency guide all our business relationships.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
