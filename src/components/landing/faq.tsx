// src/components/landing/faq.tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FAQ_DATA = [
	{
		id: "free",
		question: "Is Devmetry free?",
		answer:
			"Yes, completely free. We use GitHub OAuth and only access public data.",
	},
	{
		id: "data",
		question: "What data do you access?",
		answer:
			"Only public GitHub data: repos, commits, PRs, and activity. We never access private repositories.",
	},
	{
		id: "updates",
		question: "How often are metrics updated?",
		answer:
			"Your dashboard refreshes every time you log in. Real-time tracking coming soon.",
	},
	{
		id: "share",
		question: "Can I share my dashboard?",
		answer:
			"Public sharing is on our roadmap. For now, your dashboard is private to you.",
	},
];

function AnimatedAccordionItem({
	id,
	index,
	question,
	answer,
}: {
	id: string;
	index: number;
	question: string;
	answer: string;
}) {
	const contentRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const itemRef = useRef<HTMLDivElement>(null);
	const iconRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const trigger = triggerRef.current;
		const content = contentRef.current;
		const item = itemRef.current;
		const icon = iconRef.current;
		if (!trigger || !content || !item || !icon) return;

		const observer = new MutationObserver(() => {
			const isOpen = trigger.getAttribute("aria-expanded") === "true";
			if (isOpen) {
				gsap.to(content, {
					height: "auto",
					opacity: 1,
					duration: 0.45,
					ease: "expo.out",
				});
				gsap.to(icon, { rotate: 45, duration: 0.4, ease: "back.out(2)" });
				gsap.to(item, {
					backgroundColor: "rgba(0,255,65,0.03)",
					duration: 0.4,
				});
			} else {
				gsap.to(content, {
					height: 0,
					opacity: 0,
					duration: 0.3,
					ease: "expo.in",
				});
				gsap.to(icon, { rotate: 0, duration: 0.4, ease: "power2.out" });
				gsap.to(item, {
					backgroundColor: "rgba(0,0,0,0)",
					duration: 0.4,
				});
			}
		});

		observer.observe(trigger, {
			attributes: true,
			attributeFilter: ["aria-expanded"],
		});
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={itemRef} className="faq-item overflow-hidden rounded-xl">
			<AccordionItem value={id} className="!py-0 border border-border">
				<AccordionTrigger
					ref={triggerRef}
					className="!font-sans group gap-4 px-5 py-5"
				>
					<span className="flex flex-1 items-center gap-4">
						<span className="font-mono text-accent-green/60 text-xs tabular-nums">
							{String(index + 1).padStart(2, "0")}
						</span>
						<span className="text-base text-text-primary transition-colors group-hover:text-accent-green">
							{question}
						</span>
					</span>
					<span
						ref={iconRef}
						className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-accent-green text-lg leading-none"
					>
						+
					</span>
				</AccordionTrigger>
				<AccordionContent ref={contentRef}>
					<p className="px-5 pb-5 pl-[4.25rem] text-sm text-text-secondary leading-relaxed">
						{answer}
					</p>
				</AccordionContent>
			</AccordionItem>
		</div>
	);
}

export function FAQ() {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			gsap.from(".faq-item", {
				opacity: 0,
				y: 24,
				stagger: 0.08,
				duration: 0.7,
				ease: "expo.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 75%",
				},
			});

			gsap.from(".faq-heading > *", {
				opacity: 0,
				y: 20,
				stagger: 0.1,
				duration: 0.8,
				ease: "power3.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
				},
			});
		},
		{ scope: sectionRef },
	);

	return (
		<section ref={sectionRef} id="faq" className="relative py-24 lg:py-32">
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute bottom-0 left-1/4 h-[380px] w-[500px] rounded-full bg-accent-purple/[0.05] blur-xl md:blur-3xl" />
			</div>

			<div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-8">
				{/* Left — sticky heading */}
				<div className="faq-heading flex flex-col gap-4 lg:sticky lg:top-32 lg:h-fit">
					<span className="inline-flex w-fit items-center gap-2 font-mono text-accent-purple text-xs uppercase tracking-[0.2em]">
						<span className="h-px w-8 bg-accent-purple/50" />
						{"// frequently asked"}
					</span>
					<h2 className="font-bold text-4xl text-text-primary leading-[1.05] lg:text-5xl">
						Questions <br className="hidden lg:block" />
						<span className="text-text-secondary">& answers</span>
					</h2>
					<p className="max-w-sm text-sm text-text-secondary">
						Everything you wanted to know before clicking that button above.
					</p>
				</div>

				{/* Right — accordion */}
				<Accordion className="!divide-y-0 flex flex-col gap-3">
					{FAQ_DATA.map((item, i) => (
						<AnimatedAccordionItem
							key={item.id}
							id={item.id}
							index={i}
							question={item.question}
							answer={item.answer}
						/>
					))}
				</Accordion>
			</div>
		</section>
	);
}
