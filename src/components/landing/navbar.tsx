// src/components/landing/navbar.tsx
"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollToPlugin);

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useGSAP(
    () => {
      if (!mobileMenuRef.current) return;
      if (mobileOpen) {
        gsap.fromTo(
          mobileMenuRef.current.querySelectorAll("a, button"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" }
        );
      }
    },
    { dependencies: [mobileOpen] }
  );

  function scrollTo(href: string) {
    setMobileOpen(false);
    gsap.to(window, {
      scrollTo: { y: href, offsetY: 80 },
      duration: 0.8,
      ease: "power2.inOut",
    });
  }

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-bg-base/80 backdrop-blur-xl transition-colors duration-300",
          scrolled && "border-b border-border"
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
          <span className="text-lg font-bold text-text-primary [text-shadow:0_0_10px_rgba(0,255,65,0.25)]">
            DEVMETRY
          </span>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollTo(link.href)}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => scrollTo("#hero")}
            >
              Explore your metrics
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden text-text-secondary hover:text-text-primary p-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-bg-base/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-16"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollTo(link.href)}
              className="text-2xl text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <Button variant="secondary" size="lg" onClick={() => scrollTo("#hero")}>
            Explore your metrics
          </Button>
        </div>
      )}
    </>
  );
}
