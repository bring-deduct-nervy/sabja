import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    hotel: [
      { href: "/about", label: "About Us" },
      { href: "/rooms", label: "Rooms & Suites" },
      { href: "/dining", label: "Dining" },
      { href: "/spa", label: "Spa & Wellness" },
    ],
    support: [
      { href: "/contact", label: "Contact Us" },
      { href: "/faq", label: "FAQ" },
      { href: "/careers", label: "Careers" },
      { href: "/press", label: "Press" },
    ],
    legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <Container size="xl" className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Luxury Hotel</h3>
            <p className="text-sm text-muted-foreground">
              Experience unparalleled luxury and exceptional service at our world-class hotel.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Hotel
            </h4>
            <ul className="space-y-2">
              {footerLinks.hotel.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Luxury Hotel. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
