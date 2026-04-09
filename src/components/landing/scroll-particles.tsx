// src/components/landing/scroll-particles.tsx
"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed-position canvas that renders floating code glyphs (0/1, {}, //, <>)
 * drifting upward. Particle velocity reacts to scroll — the faster the user
 * scrolls, the more the particles whoosh in the opposite direction.
 *
 * Pure canvas2d, respects prefers-reduced-motion, and pauses when tab hidden.
 */
const GLYPHS = [
	"0",
	"1",
	"{",
	"}",
	"<",
	">",
	"/",
	"*",
	"=",
	";",
	"$",
	"_",
	"λ",
	"#",
];
const COLORS = [
	"rgba(0, 255, 65, ALPHA)", // accent-green
	"rgba(124, 58, 237, ALPHA)", // accent-purple
	"rgba(6, 182, 212, ALPHA)", // accent-cyan
];

type Particle = {
	x: number;
	y: number;
	vy: number; // base upward velocity
	size: number;
	alpha: number;
	glyph: string;
	color: string;
	rot: number;
	vr: number;
};

export function ScrollParticles() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduced) return;

		// Skip on touch-only devices and small viewports — RAF + fullscreen
		// repaints + mix-blend are too expensive on mobile GPUs.
		const isTouchOnly = window.matchMedia("(hover: none)").matches;
		if (isTouchOnly || window.innerWidth < 900) return;

		let dpr = Math.min(window.devicePixelRatio || 1, 2);
		let width = 0;
		let height = 0;
		let particles: Particle[] = [];
		let rafId = 0;
		let lastScrollY = window.scrollY;
		let scrollVelocity = 0;

		function resize() {
			if (!canvas || !ctx) return;
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.scale(dpr, dpr);
			ctx.font = "600 12px var(--font-mono, monospace)";
		}

		function spawn(y?: number): Particle {
			const alpha = 0.15 + Math.random() * 0.4;
			const color = COLORS[Math.floor(Math.random() * COLORS.length)].replace(
				"ALPHA",
				String(alpha),
			);
			return {
				x: Math.random() * width,
				y: y ?? height + Math.random() * 200,
				vy: 0.15 + Math.random() * 0.45,
				size: 10 + Math.random() * 8,
				alpha,
				glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
				color,
				rot: (Math.random() - 0.5) * 0.4,
				vr: (Math.random() - 0.5) * 0.004,
			};
		}

		function init() {
			const count = Math.min(70, Math.floor((width * height) / 22000));
			particles = Array.from({ length: count }, () => ({
				...spawn(),
				y: Math.random() * height,
			}));
		}

		function onScroll() {
			const currentY = window.scrollY;
			scrollVelocity = currentY - lastScrollY;
			lastScrollY = currentY;
		}

		function tick() {
			if (!ctx) return;
			ctx.clearRect(0, 0, width, height);

			// Dampen scroll velocity each frame so it fades out when user stops
			scrollVelocity *= 0.9;
			// Cap influence so fast flicks don't explode the particles
			const scrollPush = Math.max(-6, Math.min(6, scrollVelocity * 0.35));

			for (const p of particles) {
				p.y -= p.vy + scrollPush;
				p.x += Math.sin((p.y + p.size) * 0.008) * 0.2;
				p.rot += p.vr;

				// Recycle
				if (p.y < -20) {
					Object.assign(p, spawn(height + 20));
				} else if (p.y > height + 40) {
					Object.assign(p, spawn(-20));
				}

				ctx.save();
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rot);
				ctx.fillStyle = p.color;
				ctx.font = `600 ${p.size}px var(--font-mono, ui-monospace, monospace)`;
				ctx.fillText(p.glyph, 0, 0);
				ctx.restore();
			}

			rafId = requestAnimationFrame(tick);
		}

		function onVisibility() {
			if (document.hidden) {
				cancelAnimationFrame(rafId);
			} else {
				rafId = requestAnimationFrame(tick);
			}
		}

		resize();
		init();
		rafId = requestAnimationFrame(tick);
		window.addEventListener("resize", () => {
			resize();
			init();
		});
		window.addEventListener("scroll", onScroll, { passive: true });
		document.addEventListener("visibilitychange", onVisibility);

		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener("scroll", onScroll);
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden
			className="pointer-events-none fixed inset-0 z-0 opacity-70 mix-blend-screen"
		/>
	);
}
