import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useState } from 'react';
import Link from 'next/link';

export default function Amenities() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const amenities = [
    {
      icon: '💆',
      title: 'Spa & Wellness',
      description:
        'Full-service spa offering massages, facials, body treatments, and holistic wellness programs.',
      features: ['Sauna', 'Steam Room', 'Yoga Studio', 'Meditation Garden'],
    },
    {
      icon: '🍽️',
      title: 'Fine Dining',
      description:
        'Multiple restaurants and bars serving international cuisine, fine wines, and signature cocktails.',
      features: ['À la carte', 'Tasting Menus', 'Room Service', 'Private Dining'],
    },
    {
      icon: '🏊',
      title: 'Recreation',
      description: 'Olympic-size pool, fitness center, tennis courts, and indoor sports facilities.',
      features: ['Swimming Pool', 'Gym', 'Tennis Courts', 'Basketball Court'],
    },
    {
      icon: '🎉',
      title: 'Event Spaces',
      description:
        'Versatile venues for conferences, weddings, banquets, and corporate events with modern AV.',
      features: ['Grand Ballroom', 'Meeting Rooms', 'Outdoor Terrace', 'Full Catering'],
    },
    {
      icon: '🌐',
      title: 'Business Center',
      description:
        'State-of-the-art facilities for the modern business traveler including high-speed internet.',
      features: ['Co-working Spaces', 'Conference Rooms', 'Tech Support', '24/7 Access'],
    },
    {
      icon: '🚗',
      title: 'Concierge & Transport',
      description:
        'Personal concierge service, airport transfers, and car rental assistance available 24/7.',
      features: ['Airport Pickup', 'Car Rental', 'Reservations', 'City Tours'],
    },
  ];

  const faqs = [
    {
      question: 'What are the spa operating hours?',
      answer: 'Our spa is open daily from 7 AM to 10 PM. However, extended hours can be arranged for our guests.',
    },
    {
      question: 'Is the fitness center complimentary for all guests?',
      answer:
        'Yes, the fitness center is complimentary for all hotel guests. Equipment includes cardio machines, free weights, and strength training equipment.',
    },
    {
      question: 'Can we host private events?',
      answer:
        'Absolutely! We offer flexible event spaces with customizable packages. Contact our events team to discuss your needs.',
    },
    {
      question: 'Do you offer dietary accommodations in your restaurants?',
      answer:
        'Yes, our chefs are experienced in preparing meals for various dietary requirements including vegan, vegetarian, gluten-free, and allergen-free options.',
    },
    {
      question: 'Is Wi-Fi available throughout the hotel?',
      answer:
        'Yes, high-speed complimentary Wi-Fi is available in all rooms, common areas, and throughout the hotel.',
    },
  ];

  return (
    <Layout
      title="Amenities & Services"
      description="Discover our world-class amenities and services designed to make your stay unforgettable."
    >
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Amenities & Services' },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-4">Amenities & Services</h1>
          <p className="text-xl">Everything you need for a perfect stay</p>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-16">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Offerings</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
              >
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-8">
                  <div className="text-5xl mb-4">{amenity.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900">{amenity.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{amenity.description}</p>
                  <div className="space-y-2">
                    {amenity.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-primary-600 font-bold">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md mb-4 overflow-hidden border border-gray-100"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  aria-expanded={expandedFaq === index}
                >
                  <span className="font-bold text-gray-900">{faq.question}</span>
                  <span
                    className={`text-2xl text-primary-600 transition-transform ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold mb-8">Experience Our Amenities</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ready to enjoy world-class facilities and services? Book your stay with us today.
          </p>
          <Link href="/contact" className="btn-secondary">
            Book Your Stay
          </Link>
        </div>
      </section>
    </Layout>
  );
}
