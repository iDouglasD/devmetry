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

const AVATARS = Array.from({ length: 8 }, (_, i) => {
	const initials = ["JD", "AK", "MR", "LS", "CP", "TN", "RB", "EW"];
	return { id: i, initials: initials[i] };
});

export function SocialProof() {
	const sectionRef = useRef<HTMLElement>(null);
	const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

	useGSAP(
		() => {
			// Counter animations
			STATS.forEach((_stat, i) => {
				const el = counterRefs.current[i];
				if (!el) return;
				gsap.from(el, {
					textContent: 0,
					duration: 2,
					ease: "power1.out",
					snap: { textContent: 1 },
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 75%",
					},
					onUpdate() {
						el.textContent = Math.round(Number(el.textContent)).toString();
					},
				});
			});

			// Avatars stagger
			gsap.from(".avatar-item", {
				opacity: 0,
				scale: 0.5,
				stagger: 0.05,
				duration: 0.4,
				ease: "back.out(1.7)",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 65%",
				},
			});
		},
		{ scope: sectionRef },
	);

	return (
		<section ref={sectionRef} className="py-24 lg:py-32">
			<div className="mx-auto max-w-6xl px-4 text-center lg:px-8">
				<span className="mb-3 block text-sm text-text-secondary">
					{"// trusted by developers"}
				</span>
				<h2 className="mb-16 font-bold text-3xl text-text-primary lg:text-4xl">
					Join the community
				</h2>

				{/* Stats */}
				<div className="mb-16 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-0 sm:divide-x sm:divide-border">
					{STATS.map((stat, i) => (
						<div key={stat.label} className="px-8 sm:px-12">
							<div className="font-bold text-4xl text-accent-green [text-shadow:0_0_20px_rgba(0,255,65,0.2)] lg:text-5xl">
								<span
									ref={(el) => {
										counterRefs.current[i] = el;
									}}
								>
									{stat.value}
								</span>
								{stat.suffix}
							</div>
							<p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
						</div>
					))}
				</div>

				{/* Avatars */}
				<div className="flex flex-wrap items-center justify-center gap-3">
					{AVATARS.map((avatar) => (
						<div
							key={avatar.id}
							className="avatar-item flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-elevated font-semibold text-text-secondary text-xs"
						>
							{avatar.initials}
						</div>
					))}
					<span className="ml-2 text-sm text-text-secondary">
						+500 devs already tracking
					</span>
				</div>
			</div>
		</section>
	);
}
