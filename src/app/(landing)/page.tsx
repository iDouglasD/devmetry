import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SocialProof } from "@/components/landing/social-proof";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Devmetry — Track Your GitHub Metrics",
  description:
    "A free developer dashboard that turns your GitHub activity into actionable insights. Track commits, PRs, streaks, code reviews, and more.",
  openGraph: {
    title: "Devmetry — Track Your GitHub Metrics",
    description:
      "A free developer dashboard that turns your GitHub activity into actionable insights.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="relative bg-bg-base bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)]">
        <Hero />
        <Features />
        <HowItWorks />
        <SocialProof />
        <FAQ />
      </main>
      <Footer />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Devmetry",
            description:
              "A free developer dashboard that turns your GitHub activity into actionable insights.",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </>
  );
}
