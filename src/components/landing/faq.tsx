// src/components/landing/faq.tsx
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
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

/**
 * Wrapper that observes accordion open/close and animates with GSAP.
 * Uses MutationObserver on aria-expanded to detect state changes,
 * then animates the sibling content div's height and opacity.
 */
function AnimatedAccordionItem({
  id,
  question,
  answer,
}: {
  id: string;
  question: string;
  answer: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const content = contentRef.current;
    if (!trigger || !content) return;

    const observer = new MutationObserver(() => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        gsap.to(content, {
          height: "auto",
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        });
      } else {
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });
      }
    });

    observer.observe(trigger, { attributes: true, attributeFilter: ["aria-expanded"] });
    return () => observer.disconnect();
  }, []);

  return (
    <AccordionItem value={id} className="faq-item">
      <AccordionTrigger ref={triggerRef}>
        <span>
          <span className="text-accent-green mr-2">{">"}</span>
          {question}
        </span>
      </AccordionTrigger>
      <AccordionContent ref={contentRef}>
        <p className="text-sm text-text-secondary leading-relaxed">{answer}</p>
      </AccordionContent>
    </AccordionItem>
  );
}

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".faq-item", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="faq" className="py-24 lg:py-32">
      <div className="mx-auto max-w-2xl px-4 lg:px-8">
        <span className="text-sm text-text-secondary block mb-3">
          {"// frequently asked"}
        </span>
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-12">
          Questions &amp; Answers
        </h2>

        <Accordion>
          {FAQ_DATA.map((item) => (
            <AnimatedAccordionItem
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </Accordion>
      </div>
    </section>
  );
}
