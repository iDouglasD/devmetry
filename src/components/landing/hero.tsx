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

// Split a string into word <span>s containing per-letter <span>s.
// Lets GSAP animate letters without external SplitText plugin.
function SplitWords({ text }: { text: string }) {
	return (
		<>
			{text.split(" ").map((word, wi) => (
				<span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
					{word.split("").map((char, ci) => (
						<span
							key={`${char}-${ci}`}
							className="hero-char inline-block will-change-transform"
						>
							{char}
						</span>
					))}
					{wi < text.split(" ").length - 1 && (
						<span className="inline-block">&nbsp;</span>
					)}
				</span>
			))}
		</>
	);
}

export function Hero() {
	const sectionRef = useRef<HTMLElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const cardInnerRef = useRef<HTMLDivElement>(null);
	const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

	useGSAP(
		() => {
			const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

			// Eyebrow — typewriter-like clip reveal
			tl.from(".hero-eyebrow", {
				opacity: 0,
				xPercent: -10,
				duration: 0.6,
				ease: "power2.out",
			});

			// Heading — per-letter rise with slight rotation
			tl.from(
				".hero-char",
				{
					yPercent: 120,
					rotate: 6,
					opacity: 0,
					duration: 0.9,
					stagger: 0.018,
					ease: "expo.out",
				},
				"-=0.3",
			);

			// Paragraph + CTA group
			tl.from(
				".hero-reveal",
				{
					opacity: 0,
					y: 24,
					duration: 0.8,
					stagger: 0.12,
					ease: "power3.out",
				},
				"-=0.7",
			);

			// Card entrance — clip-path wipe
			tl.from(
				".hero-card",
				{
					opacity: 0,
					yPercent: 8,
					rotateX: 18,
					rotateY: -12,
					scale: 0.96,
					duration: 1.2,
					ease: "expo.out",
					clearProps: "clipPath",
				},
				"-=1.1",
			);

			// Counters — animate numbers
			COUNTER_DATA.forEach((item, i) => {
				const el = counterRefs.current[i];
				if (!el) return;
				const obj = { val: 0 };
				gsap.to(obj, {
					val: item.value,
					duration: 2.2,
					delay: 0.9,
					ease: "power3.out",
					snap: { val: 1 },
					onUpdate() {
						el.textContent = obj.val.toLocaleString();
					},
				});
			});

			// Bars — stagger in from bottom
			tl.from(
				".hero-bar",
				{
					scaleY: 0,
					transformOrigin: "bottom",
					stagger: { each: 0.05, from: "start" },
					duration: 0.9,
					ease: "expo.out",
				},
				"-=1.2",
			);

			// Contribution grid — diagonal wave pulse (continuous)
			gsap.to(".hero-cell", {
				opacity: (_i, el) => Number((el as HTMLElement).dataset.base ?? 0.3),
				duration: 1.4,
				ease: "sine.inOut",
				stagger: { each: 0.02, from: "start", grid: "auto" },
				repeat: -1,
				yoyo: true,
			});

			// Scanning line across the card
			gsap.fromTo(
				".hero-scan",
				{ yPercent: -100, opacity: 0 },
				{
					yPercent: 200,
					opacity: 1,
					duration: 3.2,
					delay: 1.4,
					ease: "power2.inOut",
					repeat: -1,
					repeatDelay: 2.4,
				},
			);

			// Aurora blobs — slow drift
			gsap.to(".hero-aurora-a", {
				xPercent: 12,
				yPercent: -8,
				duration: 9,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});
			gsap.to(".hero-aurora-b", {
				xPercent: -10,
				yPercent: 10,
				duration: 11,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});

			// Card float
			gsap.to(".hero-card", {
				y: -10,
				duration: 3,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});

			// Blinking caret
			gsap.to(".hero-caret", {
				opacity: 0,
				duration: 0.5,
				repeat: -1,
				yoyo: true,
				ease: "steps(1)",
			});

			// Mouse parallax tilt on the card
			const card = cardRef.current;
			const inner = cardInnerRef.current;
			if (card && inner) {
				const qx = gsap.quickTo(inner, "rotationY", {
					duration: 0.6,
					ease: "power3.out",
				});
				const qy = gsap.quickTo(inner, "rotationX", {
					duration: 0.6,
					ease: "power3.out",
				});
				const onMove = (e: MouseEvent) => {
					const r = card.getBoundingClientRect();
					const px = (e.clientX - r.left) / r.width - 0.5;
					const py = (e.clientY - r.top) / r.height - 0.5;
					qx(px * 12);
					qy(-py * 10);
				};
				const onLeave = () => {
					qx(0);
					qy(0);
				};
				card.addEventListener("mousemove", onMove);
				card.addEventListener("mouseleave", onLeave);
				return () => {
					card.removeEventListener("mousemove", onMove);
					card.removeEventListener("mouseleave", onLeave);
				};
			}
		},
		{ scope: sectionRef },
	);

	return (
		<section
			ref={sectionRef}
			id="hero"
			className="relative flex min-h-screen items-center overflow-hidden pt-16"
		>
			{/* Aurora background */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="hero-aurora-a absolute top-1/3 left-1/4 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-green/10 blur-3xl" />
				<div className="hero-aurora-b absolute top-1/2 left-3/4 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-purple/10 blur-3xl" />
				<div className="absolute top-2/3 left-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan/[0.06] blur-3xl" />
				{/* Subtle grid overlay */}
				<div
					className="absolute inset-0 opacity-[0.035]"
					style={{
						backgroundImage:
							"linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
						backgroundSize: "56px 56px",
						color: "var(--color-text-primary, #fff)",
						maskImage:
							"radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
					}}
				/>
			</div>

			<div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
				{/* Left column — text */}
				<div className="flex flex-col gap-6">
					<span className="hero-eyebrow inline-flex w-fit items-center gap-2 rounded-full border border-border bg-bg-surface/60 px-3 py-1 text-text-secondary text-xs backdrop-blur-sm">
						<span className="relative flex h-1.5 w-1.5">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
							<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-green" />
						</span>
						{"// your github metrics, decoded"}
					</span>
					<h1
						aria-label="Track your code. Measure your impact."
						className="overflow-hidden font-bold text-4xl text-text-primary leading-tight lg:text-6xl"
					>
						<span className="block overflow-hidden">
							<SplitWords text="Track your " />
							<span className="inline-block bg-linear-to-r from-accent-green to-accent-purple bg-clip-text text-transparent">
								<SplitWords text="code" />
							</span>
							<SplitWords text="." />
						</span>
						<span className="block overflow-hidden">
							<SplitWords text="Measure your " />
							<span className="inline-block bg-linear-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">
								<SplitWords text="impact" />
							</span>
							<SplitWords text="." />
							<span className="hero-caret ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] bg-accent-green align-middle" />
						</span>
					</h1>
					<p className="hero-reveal max-w-md text-base text-text-secondary lg:text-lg">
						A developer dashboard that turns your GitHub activity into
						actionable insights. Commits, PRs, streaks, and more.
					</p>
					<div className="hero-reveal flex flex-col gap-3">
						<Button variant="primary" size="lg" className="w-fit">
							Explore your metrics
						</Button>
						<span className="text-text-secondary text-xs">
							Free &bull; No credit card &bull; GitHub OAuth
						</span>
					</div>
				</div>

				{/* Right column — animated card */}
				<div
					ref={cardRef}
					className="relative"
					style={{ perspective: "1200px" }}
				>
					{/* Glow halo */}
					<div className="pointer-events-none absolute -inset-px rounded-xl bg-linear-to-br from-accent-green/30 via-accent-purple/20 to-accent-cyan/30 opacity-60 blur-2xl" />

					<div
						ref={cardInnerRef}
						className="hero-card relative overflow-hidden rounded-xl border border-border bg-bg-surface/90 shadow-2xl backdrop-blur-xl"
						style={{ transformStyle: "preserve-3d" }}
					>
						{/* Scanning line */}
						<div className="hero-scan pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-transparent via-accent-green/15 to-transparent" />

						{/* Window bar */}
						<div className="flex items-center gap-2 border-border border-b bg-bg-elevated/80 px-4 py-3">
							<span className="h-3 w-3 rounded-full bg-[#f85149]" />
							<span className="h-3 w-3 rounded-full bg-[#d29922]" />
							<span className="h-3 w-3 rounded-full bg-[#3fb950]" />
							<span className="ml-3 font-mono text-text-secondary text-xs">
								devmetry — dashboard
							</span>
						</div>

						<div className="space-y-6 p-6">
							{/* Counters */}
							<div className="grid grid-cols-3 gap-4 text-center">
								{COUNTER_DATA.map((item, i) => (
									<div
										key={item.label}
										className="rounded-lg border border-border/50 bg-bg-elevated/40 py-3"
									>
										<span
											ref={(el) => {
												counterRefs.current[i] = el;
											}}
											className={`font-bold text-2xl tabular-nums lg:text-3xl ${item.color}`}
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
										data-base={opacity}
										className="hero-cell h-2.5 w-2.5 rounded-sm bg-accent-green"
										style={{ opacity }}
									/>
								))}
							</div>

							{/* Bar chart */}
							<div className="flex h-24 items-end gap-2">
								{BAR_DATA.map((height, i) => (
									<div
										key={i}
										className="hero-bar flex-1 rounded-t bg-linear-to-t from-accent-green via-accent-green/70 to-accent-green/30"
										style={{ height: `${height}%` }}
									/>
								))}
							</div>
							<div className="flex justify-between font-mono text-[10px] text-text-secondary">
								<span>Mon</span>
								<span>Wed</span>
								<span>Fri</span>
								<span>Sun</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
