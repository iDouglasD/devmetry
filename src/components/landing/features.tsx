// src/components/landing/features.tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Feature = {
	icon: React.ReactNode;
	title: string;
	description: string;
	accent: "green" | "purple" | "cyan";
	span?: "col-span-1" | "col-span-2";
};

const FEATURES: Feature[] = [
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
				aria-hidden
			>
				<circle cx="12" cy="12" r="4" />
				<line x1="1.05" y1="12" x2="7" y2="12" />
				<line x1="17.01" y1="12" x2="22.96" y2="12" />
			</svg>
		),
		title: "Commit Analytics",
		description: "Total commits, frequency, and most active repos at a glance.",
		accent: "green",
		span: "col-span-2",
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
				aria-hidden
			>
				<circle cx="18" cy="18" r="3" />
				<circle cx="6" cy="6" r="3" />
				<path d="M13 6h3a2 2 0 0 1 2 2v7" />
				<path d="M11 18H8a2 2 0 0 1-2-2V9" />
			</svg>
		),
		title: "Pull Requests",
		description: "PRs opened, merged, closed. Track your average merge time.",
		accent: "purple",
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
				aria-hidden
			>
				<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
				<circle cx="12" cy="12" r="3" />
			</svg>
		),
		title: "Code Reviews",
		description: "Reviews given, comments left, and repos you've reviewed.",
		accent: "cyan",
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
				aria-hidden
			>
				<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
			</svg>
		),
		title: "Contribution Streak",
		description: "Current streak, longest streak, and total active days.",
		accent: "green",
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
				aria-hidden
			>
				<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
				<line x1="16" y1="2" x2="16" y2="6" />
				<line x1="8" y1="2" x2="8" y2="6" />
				<line x1="3" y1="10" x2="21" y2="10" />
			</svg>
		),
		title: "Activity Heatmap",
		description: "Contribution graph with your most active days and hours.",
		accent: "purple",
		span: "col-span-2",
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
				aria-hidden
			>
				<polyline points="16 18 22 12 16 6" />
				<polyline points="8 6 2 12 8 18" />
			</svg>
		),
		title: "Language Breakdown",
		description:
			"Percentage per language and how your stack evolves over time.",
		accent: "cyan",
	},
];

const ACCENT_MAP = {
	green: {
		text: "text-accent-green",
		bg: "bg-accent-green",
		border: "group-hover:border-accent-green/40",
		glow: "from-accent-green/20",
	},
	purple: {
		text: "text-accent-purple",
		bg: "bg-accent-purple",
		border: "group-hover:border-accent-purple/40",
		glow: "from-accent-purple/20",
	},
	cyan: {
		text: "text-accent-cyan",
		bg: "bg-accent-cyan",
		border: "group-hover:border-accent-cyan/40",
		glow: "from-accent-cyan/20",
	},
} as const;

export function Features() {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			gsap.fromTo(
				".feature-card",
				{ opacity: 0, y: 60 },
				{
					opacity: 1,
					y: 0,
					stagger: { each: 0.1, from: "start" },
					duration: 0.9,
					ease: "expo.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top bottom-=80",
						toggleActions: "play none none none",
					},
				},
			);

			// Spotlight mouse tracking on each card
			const cards =
				sectionRef.current?.querySelectorAll<HTMLElement>(".feature-card");
			const handlers: Array<{ el: HTMLElement; fn: (e: Event) => void }> = [];
			cards?.forEach((el) => {
				const fn = (e: Event) => {
					const me = e as unknown as MouseEvent;
					const r = el.getBoundingClientRect();
					el.style.setProperty("--mx", `${me.clientX - r.left}px`);
					el.style.setProperty("--my", `${me.clientY - r.top}px`);
				};
				el.addEventListener("mousemove", fn);
				handlers.push({ el, fn });
			});

			gsap.fromTo(
				".feature-heading > *",
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.12,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top bottom-=40",
						toggleActions: "play none none none",
					},
				},
			);

			return () => {
				handlers.forEach(({ el, fn }) => {
					el.removeEventListener("mousemove", fn);
				});
			};
		},
		{ scope: sectionRef },
	);

	return (
		<section ref={sectionRef} id="features" className="relative py-24 lg:py-32">
			{/* Ambient accent */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-0 left-1/2 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-accent-purple/[0.06] blur-3xl" />
			</div>

			<div className="relative mx-auto max-w-6xl px-4 lg:px-8">
				<div className="feature-heading mb-14 flex flex-col gap-3">
					<span className="inline-flex w-fit items-center gap-2 font-mono text-accent-green text-xs uppercase tracking-[0.2em]">
						<span className="h-px w-8 bg-accent-green/50" />
						{"// what you'll track"}
					</span>
					<h2 className="max-w-2xl font-bold text-4xl text-text-primary leading-[1.05] lg:text-5xl">
						Metrics that{" "}
						<span className="relative inline-block">
							<span className="relative z-10">matter</span>
							<span className="absolute inset-x-0 -bottom-1 z-0 h-3 bg-accent-green/20" />
						</span>
						.
					</h2>
					<p className="max-w-xl text-text-secondary">
						Six signals that turn raw GitHub activity into a story about your
						craft.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((feature, i) => {
						const accent = ACCENT_MAP[feature.accent];
						return (
							<div
								key={feature.title}
								className={`feature-card group relative overflow-hidden rounded-xl border border-border bg-bg-surface/70 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${accent.border} ${
									feature.span === "col-span-2"
										? "md:col-span-2 lg:col-span-2"
										: ""
								}`}
								style={{ "--mx": "50%", "--my": "50%" } as React.CSSProperties}
							>
								{/* Mouse spotlight */}
								<div
									className={`pointer-events-none absolute inset-0 bg-[radial-gradient(260px_circle_at_var(--mx)_var(--my),var(--tw-gradient-from),transparent_70%)] bg-linear-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${accent.glow}`}
								/>

								{/* Corner brackets */}
								<span className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-text-secondary/40 border-t border-l opacity-60" />
								<span className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-text-secondary/40 border-t border-r opacity-60" />
								<span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-text-secondary/40 border-b border-l opacity-60" />
								<span className="pointer-events-none absolute right-3 bottom-3 h-3 w-3 border-text-secondary/40 border-r border-b opacity-60" />

								<div className="relative flex h-full flex-col gap-4">
									<div className="flex items-start justify-between">
										<div
											className={`flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-bg-elevated ${accent.text} transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-110`}
										>
											{feature.icon}
										</div>
										<span className="font-mono text-[10px] text-text-secondary/60 tracking-widest">
											{String(i + 1).padStart(2, "0")} / 06
										</span>
									</div>

									<div>
										<h3 className="font-semibold text-lg text-text-primary">
											{feature.title}
										</h3>
										<p className="mt-2 text-sm text-text-secondary leading-relaxed">
											{feature.description}
										</p>
									</div>

									<div className="mt-auto flex items-center gap-2 pt-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
										<span className={`h-px flex-1 ${accent.bg} opacity-30`} />
										<span
											className={`font-mono text-[10px] uppercase tracking-widest ${accent.text}`}
										>
											explore →
										</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
