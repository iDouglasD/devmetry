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
		output: "✓ authenticated as @you",
		title: "Connect GitHub",
		description: "Sign in with your GitHub account. We only read public data.",
	},
	{
		number: 2,
		command: "$ devmetry scan --all",
		output: "↳ parsed 1,247 commits · 89 PRs · 34 streaks",
		title: "Scan Repositories",
		description:
			"We analyze your commits, PRs, reviews, and activity patterns.",
	},
	{
		number: 3,
		command: "$ devmetry dashboard --open",
		output: "→ opening dashboard at devmetry.app/you",
		title: "Explore Dashboard",
		description: "Your personalized metrics dashboard is ready.",
	},
];

export function HowItWorks() {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			// Steps reveal on scroll
			gsap.from(".step-card", {
				opacity: 0,
				x: -40,
				stagger: 0.2,
				duration: 0.9,
				ease: "expo.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 70%",
				},
			});

			// Progress line fills as user scrolls
			gsap.to(".step-progress-fill", {
				scaleY: 1,
				ease: "none",
				scrollTrigger: {
					trigger: ".step-timeline",
					start: "top 70%",
					end: "bottom 70%",
					scrub: 0.5,
				},
			});

			// Step nodes light up as they pass the trigger
			document.querySelectorAll(".step-node").forEach((node) => {
				gsap.to(node, {
					backgroundColor: "var(--color-accent-green)",
					borderColor: "var(--color-accent-green)",
					color: "#000",
					boxShadow: "0 0 24px rgba(0,255,65,0.5)",
					ease: "none",
					scrollTrigger: {
						trigger: node,
						start: "top 60%",
						toggleActions: "play none none reverse",
					},
				});
			});

			// Typing animation per command
			const typingEls =
				sectionRef.current?.querySelectorAll<HTMLElement>("[data-typing]");
			typingEls?.forEach((el, i) => {
				const fullText = el.dataset.typing ?? "";
				el.textContent = "";
				gsap.to(el, {
					duration: fullText.length * 0.035,
					delay: i * 0.2,
					ease: "none",
					scrollTrigger: {
						trigger: el,
						start: "top 80%",
						toggleActions: "play none none none",
					},
					onUpdate() {
						const progress = this.progress();
						const charCount = Math.round(progress * fullText.length);
						el.textContent = fullText.slice(0, charCount);
					},
				});
			});

			// Output fade in after command typed
			gsap.from(".step-output", {
				opacity: 0,
				y: 6,
				duration: 0.5,
				delay: 0.4,
				stagger: 0.3,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 65%",
				},
			});
		},
		{ scope: sectionRef },
	);

	return (
		<section
			ref={sectionRef}
			id="how-it-works"
			className="relative py-24 lg:py-32"
		>
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-1/3 right-0 h-[400px] w-[500px] rounded-full bg-accent-cyan/[0.05] blur-3xl" />
			</div>

			<div className="relative mx-auto max-w-5xl px-4 lg:px-8">
				<div className="mb-16 flex flex-col gap-3">
					<span className="inline-flex w-fit items-center gap-2 font-mono text-accent-cyan text-xs uppercase tracking-[0.2em]">
						<span className="h-px w-8 bg-accent-cyan/50" />
						{"// getting started"}
					</span>
					<h2 className="font-bold text-4xl text-text-primary leading-[1.05] lg:text-5xl">
						Three steps.{" "}
						<span className="text-text-secondary">Two minutes.</span>
					</h2>
				</div>

				{/* Vertical timeline */}
				<div className="step-timeline relative">
					{/* Rail */}
					<div className="absolute top-0 bottom-0 left-5 w-px bg-border lg:left-6" />
					{/* Progress fill (scaled by scroll) */}
					<div
						className="step-progress-fill absolute top-0 bottom-0 left-5 w-px origin-top scale-y-0 bg-linear-to-b from-accent-green via-accent-purple to-accent-cyan lg:left-6"
						style={{ boxShadow: "0 0 12px rgba(0,255,65,0.5)" }}
					/>

					<div className="flex flex-col gap-12 lg:gap-16">
						{STEPS.map((step) => (
							<div
								key={step.number}
								className="step-card relative flex gap-6 pl-2 lg:gap-10"
							>
								{/* Node */}
								<div className="step-node relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-border bg-bg-base font-bold font-mono text-sm text-text-secondary transition-colors lg:h-12 lg:w-12 lg:text-base">
									{String(step.number).padStart(2, "0")}
								</div>

								<div className="flex-1 pt-1">
									<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-10">
										<div className="lg:flex-1">
											<h3 className="font-semibold text-text-primary text-xl lg:text-2xl">
												{step.title}
											</h3>
											<p className="mt-2 max-w-md text-sm text-text-secondary leading-relaxed">
												{step.description}
											</p>
										</div>

										{/* Terminal */}
										<div className="overflow-hidden rounded-xl border border-border bg-bg-surface/90 shadow-lg backdrop-blur-sm lg:w-[340px] lg:shrink-0">
											<div className="flex items-center gap-1.5 border-border border-b bg-bg-elevated/80 px-3 py-2">
												<span className="h-2 w-2 rounded-full bg-[#f85149]" />
												<span className="h-2 w-2 rounded-full bg-[#d29922]" />
												<span className="h-2 w-2 rounded-full bg-[#3fb950]" />
												<span className="ml-2 font-mono text-[10px] text-text-secondary">
													~/devmetry
												</span>
											</div>
											<div className="space-y-1 p-4 font-mono text-sm">
												<div>
													<span
														data-typing={step.command}
														className="text-accent-green"
													>
														{step.command}
													</span>
													<span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em] animate-pulse bg-accent-green align-middle" />
												</div>
												<div className="step-output text-text-secondary text-xs">
													{step.output}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
