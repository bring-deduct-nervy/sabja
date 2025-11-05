"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "./Container";
import { Button } from "@/components/ui";
import { useScrollPosition } from "@/hooks";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 50;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms & Suites" },
    { href: "/dining", label: "Dining" },
    { href: "/spa", label: "Spa & Wellness" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <Container size="xl">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Luxury Hotel
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm" variant="primary">
              Book Now
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button size="sm" variant="primary" className="mt-2">
                Book Now
              </Button>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
