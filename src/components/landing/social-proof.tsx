// src/components/landing/social-proof.tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STATS = [
	{ value: 500, suffix: "+", label: "developers" },
	{ value: 10, suffix: "K+", label: "commits tracked" },
	{ value: 50, suffix: "+", label: "countries" },
];

const AVATARS = [
	{ id: 0, initials: "JD", color: "from-accent-green/30 to-accent-green/5" },
	{ id: 1, initials: "AK", color: "from-accent-purple/30 to-accent-purple/5" },
	{ id: 2, initials: "MR", color: "from-accent-cyan/30 to-accent-cyan/5" },
	{ id: 3, initials: "LS", color: "from-accent-green/30 to-accent-green/5" },
	{ id: 4, initials: "CP", color: "from-accent-purple/30 to-accent-purple/5" },
	{ id: 5, initials: "TN", color: "from-accent-cyan/30 to-accent-cyan/5" },
	{ id: 6, initials: "RB", color: "from-accent-green/30 to-accent-green/5" },
	{ id: 7, initials: "EW", color: "from-accent-purple/30 to-accent-purple/5" },
];

const QUOTES = [
	{
		text: "Finally understood why my Fridays are so unproductive.",
		author: "@alex.codes",
	},
	{
		text: "The streak counter alone is worth it.",
		author: "@mariadev",
	},
	{
		text: "Replaced three different tools I was using.",
		author: "@tomi.ships",
	},
];

export function SocialProof() {
	const sectionRef = useRef<HTMLElement>(null);
	const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

	useGSAP(
		() => {
			STATS.forEach((stat, i) => {
				const el = counterRefs.current[i];
				if (!el) return;
				const obj = { val: 0 };
				gsap.to(obj, {
					val: stat.value,
					duration: 2.4,
					ease: "power3.out",
					snap: { val: 1 },
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 75%",
					},
					onUpdate() {
						el.textContent = obj.val.toLocaleString();
					},
				});
			});

			gsap.from(".avatar-item", {
				opacity: 0,
				scale: 0.3,
				y: 20,
				stagger: { each: 0.06, from: "center" },
				duration: 0.7,
				ease: "back.out(2)",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 65%",
				},
			});

			// Floating avatars
			gsap.to(".avatar-item", {
				y: "random(-6, 6)",
				duration: "random(2.5, 4)",
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
				stagger: { each: 0.2, from: "random" },
			});

			gsap.from(".quote-card", {
				opacity: 0,
				y: 24,
				stagger: 0.15,
				duration: 0.8,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".quote-row",
					start: "top 85%",
				},
			});
		},
		{ scope: sectionRef },
	);

	return (
		<section ref={sectionRef} className="relative py-24 lg:py-32">
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-green/[0.04] blur-3xl" />
			</div>

			<div className="relative mx-auto max-w-6xl px-4 lg:px-8">
				<div className="mb-14 flex flex-col items-center gap-3 text-center">
					<span className="inline-flex items-center gap-2 font-mono text-accent-green text-xs uppercase tracking-[0.2em]">
						<span className="h-px w-8 bg-accent-green/50" />
						{"// trusted by developers"}
						<span className="h-px w-8 bg-accent-green/50" />
					</span>
					<h2 className="font-bold text-4xl text-text-primary leading-[1.05] lg:text-5xl">
						Join the community
					</h2>
				</div>

				{/* Stats — framed with monospace ticks */}
				<div className="mb-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
					{STATS.map((stat, i) => (
						<div
							key={stat.label}
							className="relative flex flex-col items-center gap-2 bg-bg-surface/80 px-8 py-10 backdrop-blur-sm"
						>
							<div className="font-bold text-5xl text-accent-green tabular-nums [text-shadow:0_0_28px_rgba(0,255,65,0.35)] lg:text-6xl">
								<span
									ref={(el) => {
										counterRefs.current[i] = el;
									}}
								>
									0
								</span>
								{stat.suffix}
							</div>
							<p className="font-mono text-text-secondary text-xs uppercase tracking-[0.2em]">
								{stat.label}
							</p>
							<span className="absolute top-3 right-3 font-mono text-[10px] text-text-secondary/40">
								0{i + 1}
							</span>
						</div>
					))}
				</div>

				{/* Avatars cluster */}
				<div className="mb-20 flex flex-col items-center gap-6">
					<div className="flex flex-wrap items-center justify-center gap-3">
						{AVATARS.map((avatar) => (
							<div
								key={avatar.id}
								className={`avatar-item relative flex h-12 w-12 items-center justify-center rounded-full border border-border bg-linear-to-br ${avatar.color} font-semibold text-sm text-text-primary backdrop-blur-sm`}
							>
								{avatar.initials}
								<span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-bg-base bg-accent-green" />
							</div>
						))}
					</div>
					<span className="font-mono text-text-secondary text-xs">
						<span className="text-accent-green">+500</span> devs already
						tracking
					</span>
				</div>

				{/* Quote row */}
				<div className="quote-row grid grid-cols-1 gap-5 md:grid-cols-3">
					{QUOTES.map((q) => (
						<figure
							key={q.author}
							className="quote-card relative overflow-hidden rounded-xl border border-border bg-bg-surface/60 p-6 backdrop-blur-sm"
						>
							<span className="absolute top-2 left-4 font-bold text-6xl text-accent-green/10 leading-none">
								&ldquo;
							</span>
							<blockquote className="relative text-sm text-text-primary leading-relaxed">
								{q.text}
							</blockquote>
							<figcaption className="relative mt-4 font-mono text-text-secondary text-xs">
								— {q.author}
							</figcaption>
						</figure>
					))}
				</div>
			</div>
		</section>
	);
}
