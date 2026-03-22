// src/components/landing/hero.tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP);

const COUNTER_DATA = [
	{ label: "commits", value: 1247, color: "text-accent-green" },
	{ label: "PRs merged", value: 89, color: "text-accent-purple" },
	{ label: "day streak", value: 34, color: "text-accent-cyan" },
];

const BAR_DATA = [30, 55, 40, 85, 60, 45, 70, 50, 65, 75, 35, 90];

const GRID_OPACITIES = [
	0.1, 0.3, 0.6, 1, 0.1, 0.4, 0.8, 0.2, 0.1, 0.5, 0.3, 0.7, 0.1, 0.9, 0.4, 0.2,
	0.6, 0.1, 0.3, 0.8, 0.5, 0.1, 0.4, 0.7, 0.2, 0.9, 0.3, 0.1, 0.6, 0.5, 0.1,
	0.2, 0.8, 0.4, 0.1, 0.3, 0.7, 0.5, 0.1, 0.6, 0.4, 0.1, 0.5, 0.9, 0.2, 0.3,
	0.1, 0.7, 0.4, 0.8,
];

export function Hero() {
	const sectionRef = useRef<HTMLElement>(null);
	const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

	useGSAP(
		() => {
			const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

			// Left text stagger
			tl.from(".hero-text > *", {
				opacity: 0,
				y: 30,
				stagger: 0.15,
				duration: 0.8,
			});

			// Card entrance
			tl.from(
				".hero-card",
				{
					opacity: 0,
					scale: 0.95,
					duration: 0.8,
				},
				"-=0.4",
			);

			// Counter animations
			COUNTER_DATA.forEach((item, i) => {
				const el = counterRefs.current[i];
				if (!el) return;
				const obj = { val: 0 };
				gsap.to(obj, {
					val: item.value,
					duration: 2,
					delay: 0.8,
					ease: "power1.out",
					snap: { val: 1 },
					onUpdate() {
						el.textContent = obj.val.toLocaleString();
					},
				});
			});

			// Bars stagger
			tl.from(
				".hero-bar",
				{
					scaleY: 0,
					transformOrigin: "bottom",
					stagger: 0.08,
					duration: 0.6,
					ease: "power2.out",
				},
				"-=1.5",
			);

			// Float animation (continuous)
			gsap.to(".hero-card", {
				y: -8,
				duration: 2,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});
		},
		{ scope: sectionRef },
	);

	return (
		<section
			ref={sectionRef}
			id="hero"
			className="relative flex min-h-screen items-center pt-16"
		>
			{/* Background spotlight */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-green/[0.03] blur-3xl" />
			</div>

			<div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
				{/* Left column — text */}
				<div className="hero-text flex flex-col gap-6">
					<span className="text-sm text-text-secondary">
						{"// your github metrics, decoded"}
					</span>
					<h1 className="font-bold text-4xl text-text-primary leading-tight lg:text-5xl">
						Track your{" "}
						<span className="bg-linear-to-r from-accent-green to-accent-purple bg-clip-text text-transparent">
							code
						</span>
						.
						<br />
						Measure your{" "}
						<span className="bg-linear-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">
							impact
						</span>
						.
					</h1>
					<p className="max-w-md text-base text-text-secondary lg:text-lg">
						A developer dashboard that turns your GitHub activity into
						actionable insights. Commits, PRs, streaks, and more.
					</p>
					<div className="flex flex-col gap-3">
						<Button variant="primary" size="lg" className="w-fit">
							Explore your metrics
						</Button>
						<span className="text-text-secondary text-xs">
							Free &bull; No credit card &bull; GitHub OAuth
						</span>
					</div>
				</div>

				{/* Right column — animated card */}
				<div className="hero-card overflow-hidden rounded-lg border border-border bg-bg-surface">
					{/* Window bar */}
					<div className="flex items-center gap-2 border-border border-b bg-bg-elevated px-4 py-3">
						<span className="h-3 w-3 rounded-full bg-[#f85149]" />
						<span className="h-3 w-3 rounded-full bg-[#d29922]" />
						<span className="h-3 w-3 rounded-full bg-[#3fb950]" />
						<span className="ml-3 text-text-secondary text-xs">
							devmetry — dashboard
						</span>
					</div>

					<div className="space-y-6 p-6">
						{/* Counters */}
						<div className="grid grid-cols-3 gap-4 text-center">
							{COUNTER_DATA.map((item, i) => (
								<div key={item.label}>
									<span
										ref={(el) => {
											counterRefs.current[i] = el;
										}}
										className={`font-bold text-2xl lg:text-3xl ${item.color}`}
									>
										{item.value.toLocaleString()}
									</span>
									<p className="mt-1 text-text-secondary text-xs">
										{item.label}
									</p>
								</div>
							))}
						</div>

						{/* Contribution grid */}
						<div className="flex flex-wrap gap-0.75">
							{GRID_OPACITIES.map((opacity, i) => (
								<div
									key={i}
									className="h-2.5 w-2.5 rounded-sm bg-accent-green"
									style={{ opacity }}
								/>
							))}
						</div>

						{/* Bar chart */}
						<div className="flex h-24 items-end gap-2">
							{BAR_DATA.map((height, i) => (
								<div
									key={i}
									className="hero-bar flex-1 rounded-t bg-linear-to-t from-accent-green to-accent-green/40"
									style={{ height: `${height}%` }}
								/>
							))}
						</div>
						<div className="flex justify-between text-[10px] text-text-secondary">
							<span>Mon</span>
							<span>Wed</span>
							<span>Fri</span>
							<span>Sun</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
