import { Container } from "@/components/layout";
import {
  Button,
  SectionHeader,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";

export default function HomePage() {
  const features = [
    {
      title: "Luxurious Accommodations",
      description:
        "Elegantly appointed rooms and suites with premium amenities, breathtaking views, and unparalleled comfort.",
    },
    {
      title: "World-Class Dining",
      description:
        "Savor exquisite culinary creations from our award-winning chefs using the finest local and international ingredients.",
    },
    {
      title: "Spa & Wellness",
      description:
        "Rejuvenate your mind and body with our comprehensive wellness programs and luxurious spa treatments.",
    },
    {
      title: "Exceptional Service",
      description:
        "Experience personalized attention from our dedicated team committed to making your stay unforgettable.",
    },
  ];

  const rooms = [
    {
      title: "Deluxe Suite",
      description: "Spacious elegance with city views",
      price: "From $450/night",
    },
    {
      title: "Presidential Suite",
      description: "Ultimate luxury and privacy",
      price: "From $1,200/night",
    },
    {
      title: "Garden Villa",
      description: "Private retreat in nature",
      price: "From $850/night",
    },
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 dark:from-stone-900 dark:via-stone-800 dark:to-amber-950">
        <Container size="xl" className="py-32 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight">
              Experience Unparalleled{" "}
              <span className="text-primary block mt-2">Luxury & Elegance</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Discover a world where exceptional service meets timeless sophistication in the heart
              of paradise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button size="lg" variant="primary">
                Book Your Stay
              </Button>
              <Button size="lg" variant="outline">
                Explore Rooms
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-background">
        <Container size="xl">
          <SectionHeader
            subtitle="Welcome"
            title="Why Choose Us"
            description="Immerse yourself in an experience crafted for those who appreciate the finest things in life."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} variant="elevated" padding="lg" className="hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-primary rounded" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-muted/50">
        <Container size="xl">
          <SectionHeader
            subtitle="Accommodations"
            title="Rooms & Suites"
            description="Each space is a masterpiece of design, combining modern luxury with classic elegance."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <Card key={index} variant="default" padding="none" className="overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900 dark:to-orange-950" />
                <div className="p-6">
                  <CardHeader>
                    <CardTitle>{room.title}</CardTitle>
                    <CardDescription>{room.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-primary">{room.price}</span>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-background">
        <Container size="xl">
          <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-12 md:p-16 text-center text-primary-foreground">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience Luxury?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Book your unforgettable stay today and discover why discerning travelers choose our
              hotel.
            </p>
            <Button size="lg" variant="secondary">
              Check Availability
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
