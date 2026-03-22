// src/components/landing/hero.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP);

const COUNTER_DATA = [
  { label: "commits", value: 1247, color: "text-accent-green" },
  { label: "PRs merged", value: 89, color: "text-accent-purple" },
  { label: "day streak", value: 34, color: "text-accent-cyan" },
];

const BAR_DATA = [30, 55, 40, 85, 60, 45, 70, 50, 65, 75, 35, 90];

const GRID_OPACITIES = [
  0.1, 0.3, 0.6, 1, 0.1, 0.4, 0.8, 0.2, 0.1, 0.5,
  0.3, 0.7, 0.1, 0.9, 0.4, 0.2, 0.6, 0.1, 0.3, 0.8,
  0.5, 0.1, 0.4, 0.7, 0.2, 0.9, 0.3, 0.1, 0.6, 0.5,
  0.1, 0.2, 0.8, 0.4, 0.1, 0.3, 0.7, 0.5, 0.1, 0.6,
  0.4, 0.1, 0.5, 0.9, 0.2, 0.3, 0.1, 0.7, 0.4, 0.8,
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
        "-=0.4"
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
        "-=1.5"
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
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center pt-16"
    >
      {/* Background spotlight */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-green/[0.03] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left column — text */}
        <div className="hero-text flex flex-col gap-6">
          <span className="text-sm text-text-secondary">
            {"// your github metrics, decoded"}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-text-primary">
            Track your{" "}
            <span className="bg-gradient-to-r from-accent-green to-accent-purple bg-clip-text text-transparent">
              code
            </span>
            .
            <br />
            Measure your{" "}
            <span className="bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">
              impact
            </span>
            .
          </h1>
          <p className="text-text-secondary text-base lg:text-lg max-w-md">
            A developer dashboard that turns your GitHub activity into
            actionable insights. Commits, PRs, streaks, and more.
          </p>
          <div className="flex flex-col gap-3">
            <Button variant="primary" size="lg" className="w-fit">
              Explore your metrics
            </Button>
            <span className="text-xs text-text-secondary">
              Free &bull; No credit card &bull; GitHub OAuth
            </span>
          </div>
        </div>

        {/* Right column — animated card */}
        <div className="hero-card rounded-lg border border-border bg-bg-surface overflow-hidden">
          {/* Window bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-bg-elevated border-b border-border">
            <span className="w-3 h-3 rounded-full bg-[#f85149]" />
            <span className="w-3 h-3 rounded-full bg-[#d29922]" />
            <span className="w-3 h-3 rounded-full bg-[#3fb950]" />
            <span className="ml-3 text-xs text-text-secondary">
              devmetry — dashboard
            </span>
          </div>

          <div className="p-6 space-y-6">
            {/* Counters */}
            <div className="grid grid-cols-3 gap-4 text-center">
              {COUNTER_DATA.map((item, i) => (
                <div key={item.label}>
                  <span
                    ref={(el) => { counterRefs.current[i] = el; }}
                    className={`text-2xl lg:text-3xl font-bold ${item.color}`}
                  >
                    {item.value.toLocaleString()}
                  </span>
                  <p className="text-xs text-text-secondary mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Contribution grid */}
            <div className="flex flex-wrap gap-[3px]">
              {GRID_OPACITIES.map((opacity, i) => (
                <div
                  key={i}
                  className="w-[10px] h-[10px] rounded-[2px] bg-accent-green"
                  style={{ opacity }}
                />
              ))}
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-2 h-24">
              {BAR_DATA.map((height, i) => (
                <div
                  key={i}
                  className="hero-bar flex-1 rounded-t bg-gradient-to-t from-accent-green to-accent-green/40"
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
