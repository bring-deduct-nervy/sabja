import { Navigation } from '@/components/navigation';
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Grid,
  SectionHeader,
} from '@/components/ui';

export default function Home() {
  return (
    <div className="min-h-screen bg-luxury-cream-50">
      <Navigation />

      <main>
        <section className="bg-gradient-to-br from-luxury-navy-900 via-luxury-navy-800 to-luxury-navy-700 text-white py-32">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-display-lg md:text-display-xl font-display font-bold mb-6 animate-fade-in">
                Experience Unparalleled Luxury
              </h1>
              <p className="text-xl md:text-2xl text-luxury-cream-100 mb-8 animate-slide-up">
                Discover a world where elegance meets exceptional service, and
                every moment becomes an unforgettable memory.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Book Your Stay
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-luxury-navy-900"
                >
                  Explore More
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <SectionHeader
              title="Welcome to Luxury"
              subtitle="Where timeless elegance meets modern sophistication"
            />

            <div className="prose prose-lg max-w-3xl mx-auto text-center text-luxury-navy-700">
              <p>
                Our luxury hotel offers an exceptional blend of refined comfort,
                world-class amenities, and personalized service. Each detail has
                been carefully curated to provide you with an extraordinary
                experience that exceeds expectations.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-white">
          <Container>
            <SectionHeader
              title="Our Signature Features"
              subtitle="Discover what makes us extraordinary"
            />

            <Grid cols={3} gap="lg">
              <Card variant="elevated">
                <CardHeader>
                  <div className="w-12 h-12 bg-luxury-gold-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-luxury-gold-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <CardTitle>Elegant Accommodations</CardTitle>
                  <CardDescription>
                    Luxuriously appointed suites with breathtaking views and
                    premium amenities.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <div className="w-12 h-12 bg-luxury-gold-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-luxury-gold-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                      />
                    </svg>
                  </div>
                  <CardTitle>Gourmet Dining</CardTitle>
                  <CardDescription>
                    World-class culinary experiences crafted by renowned chefs
                    using finest ingredients.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <div className="w-12 h-12 bg-luxury-gold-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-luxury-gold-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <CardTitle>Personalized Service</CardTitle>
                  <CardDescription>
                    Dedicated concierge team available 24/7 to fulfill your
                    every desire.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Grid>
          </Container>
        </section>

        <section className="py-20 bg-luxury-navy-900 text-white">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display-md font-display font-bold mb-6">
                Ready to Experience Luxury?
              </h2>
              <p className="text-xl text-luxury-cream-100 mb-8">
                Book your unforgettable stay with us and discover the art of
                refined hospitality.
              </p>
              <Button size="lg" variant="secondary">
                Reserve Now
              </Button>
            </div>
          </Container>
        </section>
      </main>

      <footer className="bg-luxury-navy-950 text-luxury-cream-100 py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-display font-bold mb-4 text-luxury-gold-500">
                Luxury Hotel
              </h3>
              <p className="text-luxury-cream-200">
                Experience the pinnacle of hospitality and comfort.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-luxury-gold-500 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-luxury-gold-500 transition-colors"
                  >
                    Accommodations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-luxury-gold-500 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-luxury-cream-200">
                123 Luxury Avenue
                <br />
                Premium District
                <br />
                contact@luxuryhotel.com
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-luxury-navy-800 text-center text-luxury-cream-300">
            <p>&copy; 2024 Luxury Hotel & Resorts. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
