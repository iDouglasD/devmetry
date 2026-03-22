// src/components/landing/how-it-works.tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = [
	{
		number: 1,
		command: "$ devmetry connect --github",
		title: "Connect GitHub",
		description: "Sign in with your GitHub account. We only read public data.",
	},
	{
		number: 2,
		command: "$ devmetry scan --all",
		title: "Scan Repositories",
		description:
			"We analyze your commits, PRs, reviews, and activity patterns.",
	},
	{
		number: 3,
		command: "$ devmetry dashboard --open",
		title: "Explore Dashboard",
		description: "Your personalized metrics dashboard is ready.",
	},
];

function TypingText({ text, className }: { text: string; className?: string }) {
	return (
		<span className={className} data-typing={text}>
			{text}
		</span>
	);
}

export function HowItWorks() {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			// Steps stagger in
			gsap.from(".step-card", {
				opacity: 0,
				y: 40,
				stagger: 0.3,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 75%",
				},
			});

			// Connector line width animation
			gsap.from(".step-connector", {
				scaleX: 0,
				transformOrigin: "left",
				duration: 1,
				ease: "power2.inOut",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 65%",
				},
			});

			// Typing animation for each command
			const typingEls = sectionRef.current?.querySelectorAll("[data-typing]");
			typingEls?.forEach((el, i) => {
				const fullText = el.getAttribute("data-typing") || "";
				el.textContent = "";
				const chars = fullText.split("");

				gsap.to(el, {
					duration: fullText.length * 0.04,
					delay: 0.8 + i * 0.5,
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 65%",
					},
					onUpdate() {
						const progress = this.progress();
						const charCount = Math.round(progress * chars.length);
						el.textContent = chars.slice(0, charCount).join("");
					},
				});
			});
		},
		{ scope: sectionRef },
	);

	return (
		<section ref={sectionRef} id="how-it-works" className="py-24 lg:py-32">
			<div className="mx-auto max-w-6xl px-4 lg:px-8">
				<span className="mb-3 block text-sm text-text-secondary">
					{"// getting started"}
				</span>
				<h2 className="mb-16 font-bold text-3xl text-text-primary lg:text-4xl">
					Three steps. Two minutes.
				</h2>

				<div className="relative grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
					{/* Connector line (desktop only) */}
					<div className="step-connector absolute top-12 right-[16.67%] left-[16.67%] hidden h-px border-border border-t-2 border-dashed lg:block" />

					{STEPS.map((step) => (
						<div key={step.number} className="step-card relative">
							{/* Step number */}
							<div className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent-purple bg-bg-base font-bold text-accent-purple text-sm">
								{step.number}
							</div>

							{/* Terminal card */}
							<div className="overflow-hidden rounded-lg border border-border bg-bg-surface">
								{/* Window bar */}
								<div className="flex items-center gap-1.5 border-border border-b bg-bg-elevated px-3 py-2">
									<span className="h-2 w-2 rounded-full bg-[#f85149]" />
									<span className="h-2 w-2 rounded-full bg-[#d29922]" />
									<span className="h-2 w-2 rounded-full bg-[#3fb950]" />
								</div>
								<div className="p-4">
									<TypingText
										text={step.command}
										className="text-accent-green text-sm"
									/>
								</div>
							</div>

							<h3 className="mt-4 font-semibold text-base text-text-primary">
								{step.title}
							</h3>
							<p className="mt-1 text-sm text-text-secondary">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
