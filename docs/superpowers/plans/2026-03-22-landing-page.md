# Devmetry Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the public-facing landing page for Devmetry with a Cyberpunk Dev Hybrid aesthetic, GSAP animations, and SSR-first SEO.

**Architecture:** Next.js 16 App Router with route group `/(landing)`. Server component page assembles client-side animated sections. Reusable UI components in `src/components/ui/` use composition pattern with CVA + tailwind-merge. Landing sections in `src/components/landing/` consume UI components and add GSAP animations.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, GSAP + ScrollTrigger + @gsap/react, class-variance-authority, tailwind-merge, clsx, JetBrains Mono font.

**Spec:** `docs/superpowers/specs/2026-03-22-landing-page-design.md`

**Next.js 16 Docs:** `node_modules/next/dist/docs/01-app/` — READ BEFORE implementing. Key changes: async request APIs, Turbopack default, params are Promises.

**Responsive breakpoint:** `lg` (1024px) — below = mobile stacked, above = desktop multi-column.

---

## File Structure

```
src/
├── app/
│   ├── (landing)/
│   │   └── page.tsx               → Server Component, SEO metadata, JSON-LD, assembles all sections
│   ├── layout.tsx                 → Modified: JetBrains Mono font, dark theme, scan lines
│   ├── globals.css                → Modified: Devmetry color tokens, scan lines, base styles
│   └── favicon.ico                → Keep existing
├── components/
│   ├── ui/
│   │   ├── button.tsx             → Composition: Button with CVA variants (primary, secondary, ghost)
│   │   ├── card.tsx               → Composition: Card.Root, Card.Header, Card.Body
│   │   ├── accordion.tsx          → Composition: Accordion.Root, Accordion.Item, Accordion.Trigger, Accordion.Content
│   │   └── badge.tsx              → Simple badge with CVA variants
│   └── landing/
│       ├── navbar.tsx             → Client: fixed navbar, scroll behavior, mobile menu
│       ├── hero.tsx               → Client: two-column hero with GSAP animations
│       ├── features.tsx           → Client: 2x3 feature grid with ScrollTrigger
│       ├── how-it-works.tsx       → Client: 3-step process with typing animation
│       ├── social-proof.tsx       → Client: stat counters with countUp
│       ├── faq.tsx                → Client: accordion FAQ with GSAP expand/collapse
│       └── footer.tsx             → Server: static footer
└── lib/
    └── utils.ts                   → cn() helper (clsx + tailwind-merge)
```

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install production dependencies**

```bash
cd C:/Users/Douglas/Desktop/dev/estudos/next/devmetry
pnpm add gsap @gsap/react class-variance-authority tailwind-merge clsx
```

- [ ] **Step 2: Verify installation**

```bash
pnpm ls gsap @gsap/react class-variance-authority tailwind-merge clsx
```

Expected: All 5 packages listed with versions.

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: add gsap, cva, tailwind-merge, clsx dependencies"
```

---

### Task 2: Setup cn() utility

**Files:**
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Create the utility file**

```ts
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Verify it compiles**

```bash
cd C:/Users/Douglas/Desktop/dev/estudos/next/devmetry
npx tsc --noEmit src/lib/utils.ts 2>&1 || echo "Check errors above"
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/utils.ts
git commit -m "feat: add cn() utility (clsx + tailwind-merge)"
```

---

### Task 3: Update globals.css with Devmetry color tokens

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace globals.css contents**

Replace the entire file with:

```css
@import "tailwindcss";

:root {
  --bg-base: #050505;
  --bg-surface: #0d1117;
  --bg-elevated: #161b22;
  --border: #30363d;
  --text-primary: #e6edf3;
  --text-secondary: #7d8590;
  --accent-green: #00ff41;
  --accent-purple: #7c3aed;
  --accent-cyan: #06b6d4;
}

@theme inline {
  --color-bg-base: var(--bg-base);
  --color-bg-surface: var(--bg-surface);
  --color-bg-elevated: var(--bg-elevated);
  --color-border: var(--border);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-accent-green: var(--accent-green);
  --color-accent-purple: var(--accent-purple);
  --color-accent-cyan: var(--accent-cyan);
  --font-mono: var(--font-jetbrains-mono);
}

body {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-mono), monospace;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: replace default styles with Devmetry color tokens"
```

---

### Task 4: Update root layout with JetBrains Mono font

**Files:**
- Modify: `src/app/layout.tsx`

Read `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` and `node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md` before implementing.

- [ ] **Step 1: Replace layout.tsx contents**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Devmetry — Track Your GitHub Metrics",
    template: "%s | Devmetry",
  },
  description:
    "Track your GitHub metrics with a beautiful developer dashboard. Commits, PRs, streaks, and more — free and open.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full`}>
      <body className="min-h-full flex flex-col font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Run dev server to verify**

```bash
cd C:/Users/Douglas/Desktop/dev/estudos/next/devmetry
pnpm dev
```

Open http://localhost:3000 — should see blank dark page with no errors in terminal.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: switch to JetBrains Mono font, update root metadata"
```

---

### Task 5: Build Button UI component

**Files:**
- Create: `src/components/ui/button.tsx`

- [ ] **Step 1: Create the Button component**

```tsx
// src/components/ui/button.tsx
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-mono font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-accent-purple to-accent-cyan text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]",
        secondary:
          "border border-accent-purple text-accent-purple hover:bg-gradient-to-r hover:from-accent-purple hover:to-accent-cyan hover:text-white",
        ghost:
          "text-text-secondary hover:text-text-primary hover:bg-bg-elevated",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        md: "h-10 px-5 text-sm rounded-lg",
        lg: "h-12 px-8 text-base rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/button.tsx
git commit -m "feat: add Button UI component with CVA variants"
```

---

### Task 6: Build Card UI component (composition pattern)

**Files:**
- Create: `src/components/ui/card.tsx`

- [ ] **Step 1: Create the Card component**

```tsx
// src/components/ui/card.tsx
import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const CardRoot = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-bg-surface",
        className
      )}
      {...props}
    />
  )
);
CardRoot.displayName = "Card.Root";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 p-4", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "Card.Header";

const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4 pt-0", className)} {...props} />
  )
);
CardBody.displayName = "Card.Body";

const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Body: CardBody,
});

export { Card, CardRoot, CardHeader, CardBody };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/card.tsx
git commit -m "feat: add Card UI component with composition pattern"
```

---

### Task 7: Build Accordion UI component (composition pattern)

**Files:**
- Create: `src/components/ui/accordion.tsx`

- [ ] **Step 1: Create the Accordion component**

This component provides the structural markup; GSAP animation for expand/collapse is handled by the FAQ landing component.

```tsx
// src/components/ui/accordion.tsx
"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
  openId: string | null;
  toggle: (id: string) => void;
};

const AccordionContext = createContext<AccordionContextValue>({
  openId: null,
  toggle: () => {},
});

function AccordionRoot({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = useCallback(
    (id: string) => setOpenId((prev) => (prev === id ? null : id)),
    []
  );

  return (
    <AccordionContext.Provider value={{ openId, toggle }}>
      <div className={cn("divide-y divide-border", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

type ItemContextValue = {
  value: string;
  isOpen: boolean;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

const ItemContext = createContext<ItemContextValue>({
  value: "",
  isOpen: false,
  contentRef: { current: null },
});

function AccordionItem({
  children,
  value,
  className,
  ...props
}: AccordionItemProps) {
  const { openId } = useContext(AccordionContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const isOpen = openId === value;

  return (
    <ItemContext.Provider value={{ value, isOpen, contentRef }}>
      <div className={cn("py-4", className)} {...props}>
        {children}
      </div>
    </ItemContext.Provider>
  );
}

const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  HTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  const { toggle } = useContext(AccordionContext);
  const { value, isOpen } = useContext(ItemContext);

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex w-full items-center justify-between text-left font-mono text-text-primary cursor-pointer",
        className
      )}
      onClick={() => toggle(value)}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
      <span className="text-text-secondary ml-4 shrink-0">
        {isOpen ? "−" : "+"}
      </span>
    </button>
  );
});
AccordionTrigger.displayName = "Accordion.Trigger";

const AccordionContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("overflow-hidden h-0 opacity-0", className)}
      {...props}
    >
      <div className="pt-3">{children}</div>
    </div>
  );
});
AccordionContent.displayName = "Accordion.Content";

const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

export {
  Accordion,
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/accordion.tsx
git commit -m "feat: add Accordion UI component with composition pattern"
```

---

### Task 8: Build Badge UI component

**Files:**
- Create: `src/components/ui/badge.tsx`

- [ ] **Step 1: Create the Badge component**

```tsx
// src/components/ui/badge.tsx
import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-mono text-xs px-2 py-0.5 rounded",
  {
    variants: {
      variant: {
        green: "text-accent-green bg-accent-green/10",
        purple: "text-accent-purple bg-accent-purple/10",
        cyan: "text-accent-cyan bg-accent-cyan/10",
        muted: "text-text-secondary bg-bg-elevated",
      },
    },
    defaultVariants: {
      variant: "muted",
    },
  }
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/badge.tsx
git commit -m "feat: add Badge UI component with CVA variants"
```

---

### Task 9: Build Navbar landing component

**Files:**
- Create: `src/components/landing/navbar.tsx`

- [ ] **Step 1: Create the Navbar component**

```tsx
// src/components/landing/navbar.tsx
"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
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
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useGSAP(
    () => {
      if (!mobileMenuRef.current) return;
      if (mobileOpen) {
        gsap.fromTo(
          mobileMenuRef.current.querySelectorAll("a, button"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" }
        );
      }
    },
    { dependencies: [mobileOpen] }
  );

  function scrollTo(href: string) {
    setMobileOpen(false);
    gsap.to(window, {
      scrollTo: { y: href, offsetY: 80 },
      duration: 0.8,
      ease: "power2.inOut",
    });
  }

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-bg-base/80 backdrop-blur-xl transition-colors duration-300",
          scrolled && "border-b border-border"
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
          <span className="text-lg font-bold text-text-primary [text-shadow:0_0_10px_rgba(0,255,65,0.25)]">
            DEVMETRY
          </span>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollTo(link.href)}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => scrollTo("#hero")}
            >
              Explore your metrics
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden text-text-secondary hover:text-text-primary p-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-bg-base/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-16"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollTo(link.href)}
              className="text-2xl text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <Button variant="secondary" size="lg" onClick={() => scrollTo("#hero")}>
            Explore your metrics
          </Button>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/navbar.tsx
git commit -m "feat: add Navbar landing component with GSAP scroll-to"
```

---

### Task 10: Build Hero landing component

**Files:**
- Create: `src/components/landing/hero.tsx`

- [ ] **Step 1: Create the Hero component**

```tsx
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
        gsap.from(el, {
          textContent: 0,
          duration: 2,
          delay: 0.8,
          ease: "power1.out",
          snap: { textContent: 1 },
          onUpdate() {
            el.textContent = Math.round(
              Number(el.textContent)
            ).toLocaleString();
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/hero.tsx
git commit -m "feat: add Hero landing component with GSAP animations"
```

---

### Task 11: Build Features landing component

**Files:**
- Create: `src/components/landing/features.tsx`

- [ ] **Step 1: Create the Features component**

```tsx
// src/components/landing/features.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Card, CardHeader, CardBody } from "@/components/ui/card";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" /><line x1="1.05" y1="12" x2="7" y2="12" /><line x1="17.01" y1="12" x2="22.96" y2="12" />
      </svg>
    ),
    title: "Commit Analytics",
    description: "Total commits, frequency, and most active repos at a glance.",
    accent: "text-accent-green",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M13 6h3a2 2 0 0 1 2 2v7" /><path d="M11 18H8a2 2 0 0 1-2-2V9" />
      </svg>
    ),
    title: "Pull Requests",
    description: "PRs opened, merged, closed. Track your average merge time.",
    accent: "text-accent-purple",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Code Reviews",
    description: "Reviews given, comments left, and repos you've reviewed.",
    accent: "text-accent-cyan",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
    title: "Contribution Streak",
    description: "Current streak, longest streak, and total active days.",
    accent: "text-accent-green",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Activity Heatmap",
    description: "Contribution graph with your most active days and hours.",
    accent: "text-accent-purple",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Language Breakdown",
    description: "Percentage per language and how your stack evolves over time.",
    accent: "text-accent-cyan",
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".feature-card", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.6,
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
    <section ref={sectionRef} id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <span className="text-sm text-text-secondary block mb-3">
          {"// what you'll track"}
        </span>
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-12">
          Metrics that matter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="feature-card transition-colors duration-200 hover:border-accent-green/25 hover:shadow-[0_0_15px_rgba(0,255,65,0.05)]"
            >
              <Card.Header>
                <span className={feature.accent}>{feature.icon}</span>
                <h3 className="text-base font-semibold text-text-primary">
                  {feature.title}
                </h3>
              </Card.Header>
              <Card.Body>
                <p className="text-sm text-text-secondary">
                  {feature.description}
                </p>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/features.tsx
git commit -m "feat: add Features landing component with ScrollTrigger"
```

---

### Task 12: Build How It Works landing component

**Files:**
- Create: `src/components/landing/how-it-works.tsx`

- [ ] **Step 1: Create the HowItWorks component**

```tsx
// src/components/landing/how-it-works.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <span className="text-sm text-text-secondary block mb-3">
          {"// getting started"}
        </span>
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-16">
          Three steps. Two minutes.
        </h2>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {/* Connector line (desktop only) */}
          <div className="step-connector hidden lg:block absolute top-12 left-[16.67%] right-[16.67%] h-px border-t-2 border-dashed border-border" />

          {STEPS.map((step) => (
            <div key={step.number} className="step-card relative">
              {/* Step number */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-accent-purple text-accent-purple font-bold text-sm mb-4 relative z-10 bg-bg-base">
                {step.number}
              </div>

              {/* Terminal card */}
              <div className="rounded-lg border border-border bg-bg-surface overflow-hidden">
                {/* Window bar */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-bg-elevated border-b border-border">
                  <span className="w-2 h-2 rounded-full bg-[#f85149]" />
                  <span className="w-2 h-2 rounded-full bg-[#d29922]" />
                  <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
                </div>
                <div className="p-4">
                  <TypingText
                    text={step.command}
                    className="text-sm text-accent-green"
                  />
                </div>
              </div>

              <h3 className="text-base font-semibold text-text-primary mt-4">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/how-it-works.tsx
git commit -m "feat: add HowItWorks landing component with typing animation"
```

---

### Task 13: Build Social Proof landing component

**Files:**
- Create: `src/components/landing/social-proof.tsx`

- [ ] **Step 1: Create the SocialProof component**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/social-proof.tsx
git commit -m "feat: add SocialProof landing component with countUp"
```

---

### Task 14: Build FAQ landing component

**Files:**
- Create: `src/components/landing/faq.tsx`

- [ ] **Step 1: Create the FAQ component**

This component uses the Accordion UI but adds GSAP animation for smooth height transitions.

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/faq.tsx
git commit -m "feat: add FAQ landing component with accordion"
```

---

### Task 15: Build Footer landing component

**Files:**
- Create: `src/components/landing/footer.tsx`

- [ ] **Step 1: Create the Footer component**

This is a Server Component — no "use client" directive.

```tsx
// src/components/landing/footer.tsx

const FOOTER_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-border">
      <div className="mx-auto max-w-6xl px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Logo & tagline */}
          <div>
            <span className="text-lg font-bold text-text-primary [text-shadow:0_0_10px_rgba(0,255,65,0.25)]">
              DEVMETRY
            </span>
            <p className="text-sm text-text-secondary mt-2">
              Your GitHub metrics, decoded.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 lg:justify-center">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* GitHub link */}
          <div className="lg:text-right">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-xs text-text-secondary">
            &copy; 2026 Devmetry. Built for developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/footer.tsx
git commit -m "feat: add Footer landing component (server component)"
```

---

### Task 16: Create landing page (route group) and assemble all sections

**Files:**
- Create: `src/app/(landing)/page.tsx`
- Delete: `src/app/page.tsx` (replaced by route group page)

Read `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route-groups.md` before implementing.
Read `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md` for metadata patterns.

- [ ] **Step 1: Delete the old default page**

```bash
rm src/app/page.tsx
```

- [ ] **Step 2: Create the landing page with all sections and SEO metadata**

```tsx
// src/app/(landing)/page.tsx
import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SocialProof } from "@/components/landing/social-proof";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Devmetry — Track Your GitHub Metrics",
  description:
    "A free developer dashboard that turns your GitHub activity into actionable insights. Track commits, PRs, streaks, code reviews, and more.",
  openGraph: {
    title: "Devmetry — Track Your GitHub Metrics",
    description:
      "A free developer dashboard that turns your GitHub activity into actionable insights.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="relative bg-bg-base bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)]">
        <Hero />
        <Features />
        <HowItWorks />
        <SocialProof />
        <FAQ />
      </main>
      <Footer />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Devmetry",
            description:
              "A free developer dashboard that turns your GitHub activity into actionable insights.",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </>
  );
}
```

- [ ] **Step 3: Run the dev server and verify the full page loads**

```bash
cd C:/Users/Douglas/Desktop/dev/estudos/next/devmetry
pnpm dev
```

Open http://localhost:3000 — verify:
- Dark background with scan lines
- Navbar fixed at top with DEVMETRY logo
- Hero section with animated counters and bar chart
- All sections render without console errors
- Mobile responsive (toggle browser width below 1024px)

- [ ] **Step 4: Run production build to verify SSR**

```bash
pnpm build
```

Expected: Build succeeds with no errors. The landing page should be statically rendered.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx "src/app/(landing)/page.tsx"
git commit -m "feat: assemble landing page with all sections and SEO metadata"
```

Note: `git add src/app/page.tsx` will stage the deletion of the old file.

---

### Task 17: Final cleanup and verification

**Files:**
- Modify: `.gitignore` (add `.superpowers/` if not present)

- [ ] **Step 1: Add .superpowers to .gitignore**

Check if `.superpowers/` is already in `.gitignore`. If not, add it:

```bash
echo ".superpowers/" >> .gitignore
```

- [ ] **Step 2: Delete unused assets from the default template**

```bash
rm -f public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
```

Only delete files that exist — skip any that are missing.

- [ ] **Step 3: Full production build verification**

```bash
cd C:/Users/Douglas/Desktop/dev/estudos/next/devmetry
pnpm build && pnpm start
```

Open http://localhost:3000 and verify:
- Page loads with correct dark theme
- GSAP animations play on scroll
- Mobile hamburger menu works
- No hydration errors in browser console
- View page source: verify HTML contains SEO content (title, description, headings, JSON-LD)

- [ ] **Step 4: Commit all cleanup**

```bash
git add .gitignore public/
git commit -m "chore: cleanup default template assets, add .superpowers to gitignore"
```
