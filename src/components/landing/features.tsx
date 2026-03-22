// src/components/landing/features.tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Card } from "@/components/ui/card";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FEATURES = [
	{
		icon: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="4" />
				<line x1="1.05" y1="12" x2="7" y2="12" />
				<line x1="17.01" y1="12" x2="22.96" y2="12" />
			</svg>
		),
		title: "Commit Analytics",
		description: "Total commits, frequency, and most active repos at a glance.",
		accent: "text-accent-green",
	},
	{
		icon: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="18" cy="18" r="3" />
				<circle cx="6" cy="6" r="3" />
				<path d="M13 6h3a2 2 0 0 1 2 2v7" />
				<path d="M11 18H8a2 2 0 0 1-2-2V9" />
			</svg>
		),
		title: "Pull Requests",
		description: "PRs opened, merged, closed. Track your average merge time.",
		accent: "text-accent-purple",
	},
	{
		icon: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
				<circle cx="12" cy="12" r="3" />
			</svg>
		),
		title: "Code Reviews",
		description: "Reviews given, comments left, and repos you've reviewed.",
		accent: "text-accent-cyan",
	},
	{
		icon: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
			</svg>
		),
		title: "Contribution Streak",
		description: "Current streak, longest streak, and total active days.",
		accent: "text-accent-green",
	},
	{
		icon: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
				<line x1="16" y1="2" x2="16" y2="6" />
				<line x1="8" y1="2" x2="8" y2="6" />
				<line x1="3" y1="10" x2="21" y2="10" />
			</svg>
		),
		title: "Activity Heatmap",
		description: "Contribution graph with your most active days and hours.",
		accent: "text-accent-purple",
	},
	{
		icon: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polyline points="16 18 22 12 16 6" />
				<polyline points="8 6 2 12 8 18" />
			</svg>
		),
		title: "Language Breakdown",
		description:
			"Percentage per language and how your stack evolves over time.",
		accent: "text-accent-cyan",
	},
];

export function Features() {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			gsap.from(".feature-card", {
				opacity: 0,
				y: 40,
				stagger: 0.15,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 75%",
				},
			});
		},
		{ scope: sectionRef },
	);

	return (
		<section ref={sectionRef} id="features" className="py-24 lg:py-32">
			<div className="mx-auto max-w-6xl px-4 lg:px-8">
				<span className="mb-3 block text-sm text-text-secondary">
					{"// what you'll track"}
				</span>
				<h2 className="mb-12 font-bold text-3xl text-text-primary lg:text-4xl">
					Metrics that matter
				</h2>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					{FEATURES.map((feature) => (
						<Card
							key={feature.title}
							className="feature-card transition-colors duration-200 hover:border-accent-green/25 hover:shadow-[0_0_15px_rgba(0,255,65,0.05)]"
						>
							<Card.Header>
								<span className={feature.accent}>{feature.icon}</span>
								<h3 className="font-semibold text-base text-text-primary">
									{feature.title}
								</h3>
							</Card.Header>
							<Card.Body>
								<p className="text-sm text-text-secondary">
									{feature.description}
								</p>
							</Card.Body>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
