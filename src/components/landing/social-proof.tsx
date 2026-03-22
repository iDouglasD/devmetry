// src/components/landing/social-proof.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
      STATS.forEach((stat, i) => {
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
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 lg:px-8 text-center">
        <span className="text-sm text-text-secondary block mb-3">
          {"// trusted by developers"}
        </span>
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-16">
          Join the community
        </h2>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-0 sm:divide-x sm:divide-border mb-16">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="px-8 sm:px-12">
              <div className="text-4xl lg:text-5xl font-bold text-accent-green [text-shadow:0_0_20px_rgba(0,255,65,0.2)]">
                <span
                  ref={(el) => { counterRefs.current[i] = el; }}
                >
                  {stat.value}
                </span>
                {stat.suffix}
              </div>
              <p className="text-sm text-text-secondary mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Avatars */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {AVATARS.map((avatar) => (
            <div
              key={avatar.id}
              className="avatar-item w-10 h-10 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-xs text-text-secondary font-semibold"
            >
              {avatar.initials}
            </div>
          ))}
          <span className="text-sm text-text-secondary ml-2">
            +500 devs already tracking
          </span>
        </div>
      </div>
    </section>
  );
}
