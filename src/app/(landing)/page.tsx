import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import { ScrollParticles } from "@/components/landing/scroll-particles";

// Below-the-fold sections are code-split to keep the initial mobile bundle
// lean. SSR remains enabled so SEO and first paint are unaffected.
const Features = dynamic(() =>
	import("@/components/landing/features").then((m) => m.Features),
);
const HowItWorks = dynamic(() =>
	import("@/components/landing/how-it-works").then((m) => m.HowItWorks),
);
const SocialProof = dynamic(() =>
	import("@/components/landing/social-proof").then((m) => m.SocialProof),
);
const FAQ = dynamic(() =>
	import("@/components/landing/faq").then((m) => m.FAQ),
);
const Footer = dynamic(() =>
	import("@/components/landing/footer").then((m) => m.Footer),
);

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
			<ScrollParticles />
			<Navbar />
			<main className="relative z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)]">
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
