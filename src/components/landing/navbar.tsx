// src/components/landing/navbar.tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollToPlugin);

const NAV_LINKS = [
	{ label: "Features", href: "#features" },
	{ label: "How it works", href: "#how-it-works" },
	{ label: "FAQ", href: "#faq" },
];

export function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [activeId, setActiveId] = useState<string>("hero");
	const navRef = useRef<HTMLElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);

	// Scroll state — shrinks navbar after threshold
	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 10);
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Scroll spy — tracks which section is in view
	useEffect(() => {
		const ids = ["hero", ...NAV_LINKS.map((l) => l.href.slice(1))];
		const elements = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);
		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
				if (visible) setActiveId(visible.target.id);
			},
			{ rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
		);
		elements.forEach((el) => {
			observer.observe(el);
		});
		return () => observer.disconnect();
	}, []);

	// Mobile menu stagger
	useGSAP(
		() => {
			if (!mobileMenuRef.current) return;
			if (mobileOpen) {
				gsap.fromTo(
					mobileMenuRef.current.querySelectorAll("a, button"),
					{ opacity: 0, y: 24 },
					{
						opacity: 1,
						y: 0,
						stagger: 0.06,
						duration: 0.5,
						ease: "expo.out",
					},
				);
			}
		},
		{ dependencies: [mobileOpen] },
	);

	// Entry animation on mount
	useGSAP(() => {
		gsap.from(".nav-item", {
			opacity: 0,
			y: -12,
			stagger: 0.08,
			duration: 0.7,
			ease: "expo.out",
			delay: 0.2,
		});
	});

	function scrollTo(href: string) {
		setMobileOpen(false);
		gsap.to(window, {
			scrollTo: { y: href, offsetY: 80 },
			duration: 0.9,
			ease: "power3.inOut",
		});
	}

	return (
		<>
			<nav
				ref={navRef}
				className={cn(
					"fixed top-0 right-0 left-0 z-50 transition-all duration-500",
					scrolled ? "py-2" : "py-4",
				)}
			>
				<div
					className={cn(
						"mx-auto flex items-center justify-between transition-all duration-500",
						scrolled
							? "max-w-4xl rounded-full border border-border bg-bg-surface/70 px-4 shadow-black/20 shadow-lg backdrop-blur-xl lg:px-6"
							: "max-w-6xl border-transparent border-b bg-transparent px-4 lg:px-8",
					)}
				>
					<div
						className={cn(
							"flex items-center transition-all duration-500",
							scrolled ? "h-12" : "h-16",
						)}
					>
						{/* Logo */}
						<button
							type="button"
							onClick={() => scrollTo("#hero")}
							className="nav-item group relative flex cursor-pointer items-center gap-2"
						>
							<span className="relative flex h-2 w-2" aria-hidden>
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
							</span>
							<span className="font-bold text-lg text-text-primary tracking-tight [text-shadow:0_0_12px_rgba(0,255,65,0.3)]">
								DEVMETRY
							</span>
							<span className="ml-0.5 hidden font-mono text-[10px] text-text-secondary sm:inline">
								v1.0
							</span>
						</button>
					</div>

					{/* Desktop links — pill with active indicator */}
					<div className="relative hidden items-center gap-1 rounded-full border border-border/60 bg-bg-elevated/40 p-1 backdrop-blur-sm lg:flex">
						{NAV_LINKS.map((link) => {
							const id = link.href.slice(1);
							const isActive = activeId === id;
							return (
								<button
									key={link.href}
									type="button"
									onClick={() => scrollTo(link.href)}
									className={cn(
										"nav-item relative cursor-pointer rounded-full px-4 py-1.5 font-medium text-xs transition-colors duration-300",
										isActive
											? "text-bg-base"
											: "text-text-secondary hover:text-text-primary",
									)}
								>
									{isActive && (
										<span
											className="absolute inset-0 rounded-full bg-accent-green shadow-[0_0_16px_rgba(0,255,65,0.5)]"
											style={{ zIndex: 0 }}
										/>
									)}
									<span className="relative z-10">{link.label}</span>
								</button>
							);
						})}
					</div>

					<div className="hidden items-center gap-3 lg:flex">
						<span className="nav-item hidden font-mono text-[10px] text-text-secondary xl:inline">
							{"// ready"}
						</span>
						<div className="nav-item">
							<Button
								variant="primary"
								size="sm"
								onClick={() => scrollTo("#hero")}
							>
								Explore →
							</Button>
						</div>
					</div>

					{/* Mobile hamburger */}
					<button
						type="button"
						className="nav-item cursor-pointer p-2 text-text-secondary transition-colors hover:text-accent-green lg:hidden"
						onClick={() => setMobileOpen(!mobileOpen)}
						aria-label="Toggle menu"
						aria-expanded={mobileOpen}
					>
						<svg
							width="22"
							height="22"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						>
							{mobileOpen ? (
								<path d="M6 6l12 12M6 18L18 6" />
							) : (
								<>
									<path d="M4 7h16" />
									<path d="M4 12h10" />
									<path d="M4 17h16" />
								</>
							)}
						</svg>
					</button>
				</div>
			</nav>

			{/* Mobile menu overlay */}
			{mobileOpen && (
				<div
					ref={mobileMenuRef}
					className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg-base/95 pt-16 backdrop-blur-2xl"
				>
					{/* Ambient glow */}
					<div className="pointer-events-none absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-accent-green/[0.08] blur-3xl" />

					<div className="relative flex flex-col items-center gap-2">
						<span className="mb-6 font-mono text-accent-green text-xs uppercase tracking-[0.3em]">
							{"// navigate"}
						</span>
						{NAV_LINKS.map((link, i) => (
							<button
								key={link.href}
								type="button"
								onClick={() => scrollTo(link.href)}
								className="group flex cursor-pointer items-center gap-4 text-3xl text-text-secondary transition-colors hover:text-accent-green"
							>
								<span className="font-mono text-accent-green/40 text-sm tabular-nums">
									0{i + 1}
								</span>
								<span className="font-semibold">{link.label}</span>
								<span className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
									→
								</span>
							</button>
						))}
					</div>

					<div className="relative mt-8">
						<Button
							variant="primary"
							size="lg"
							onClick={() => scrollTo("#hero")}
						>
							Explore your metrics
						</Button>
					</div>
				</div>
			)}
		</>
	);
}
