# Devmetry — Landing Page Design Spec

## Overview

Public-facing landing page for Devmetry, a GitHub metrics dashboard. The page is unauthenticated, focused on attracting developers to sign up. Style: Cyberpunk Dev Hybrid (dark terminal aesthetic with modern gradients). Built with Next.js 16 App Router, SSR-first for SEO, animations powered by GSAP.

## Target Audience

All developers: individual devs tracking personal metrics, tech leads monitoring teams, devs building portfolios. The landing page speaks broadly; segmentation comes later.

## Tech Stack

- **Framework:** Next.js 16 (App Router, SSR)
- **Styling:** Tailwind CSS v4
- **Font:** JetBrains Mono (via `next/font/google`) — used globally for all text
- **Animations:** GSAP + ScrollTrigger
- **Language:** English

## Architecture

Route group `/(landing)/page.tsx` — server component with full SEO metadata. Animated sections use `"use client"` components. Static sections remain server components.

```
src/app/(landing)/page.tsx          → Server Component, SEO metadata, assembles sections
src/components/
  ├── ui/                            → Reusable base components (composition pattern + CVA + tw-merge)
  │   ├── button.tsx
  │   ├── card.tsx
  │   ├── accordion.tsx
  │   └── ...
  ├── landing/
  │   ├── navbar.tsx                 → Client (scroll listener, mobile menu)
  │   ├── hero.tsx                   → Client (GSAP: counters, bars, fade-ins)
  │   ├── features.tsx               → Client (GSAP: ScrollTrigger stagger)
  │   ├── how-it-works.tsx           → Client (GSAP: typing, line draw, stagger)
  │   ├── social-proof.tsx           → Client wrapper for countUp, content static
  │   ├── faq.tsx                    → Client (GSAP: accordion expand/collapse)
  │   └── footer.tsx                → Server (static)
src/lib/
  └── utils.ts                       → cn() helper (clsx + tailwind-merge)
```

### UI Component Strategy

Reusable base components live in `src/components/ui/`. Design principles:

- **Composition pattern:** Components expose sub-components (e.g., `Card.Root`, `Card.Header`, `Card.Body`) instead of monolithic prop APIs. Consumers compose what they need.
- **CVA (class-variance-authority):** Defines component variants (size, intent, visual style) with type-safe props.
- **tailwind-merge via `cn()` helper:** A `cn()` utility (`src/lib/utils.ts`) wraps `clsx` + `twMerge` so consumers can override styles per-instance without conflicts.
- **Base components for this landing page:** `Button` (variants: primary, secondary, ghost), `Card` (surface container with composition slots), `Accordion` (for FAQ), `Badge` (for labels/tags).
- Landing page components (`src/components/landing/`) consume UI components and add GSAP animations + page-specific layout.

## Visual System

### Palette

| Token           | Value       | Usage                              |
|-----------------|-------------|-------------------------------------|
| bg-base         | `#050505`   | Page background                     |
| bg-surface      | `#0d1117`   | Cards, panels                       |
| bg-elevated     | `#161b22`   | Elevated surfaces, navbar hover     |
| border          | `#30363d`   | Card borders, dividers              |
| text-primary    | `#e6edf3`   | Headings, primary text              |
| text-secondary  | `#7d8590`   | Descriptions, labels                |
| accent-green    | `#00ff41`   | Metrics, highlights, terminal text  |
| accent-purple   | `#7c3aed`   | CTAs, gradients                     |
| accent-cyan     | `#06b6d4`   | Complementary accent                |

### Background Effect

Scan lines overlay on `bg-base`: `repeating-linear-gradient(0deg, transparent, transparent 2px, #ffffff05 2px, #ffffff05 4px)`

### Typography

JetBrains Mono for everything — headings, body, code, UI elements. Loaded via `next/font/google` with variable weights. Replaces default Geist Sans and Geist Mono.

## Section Specs

### 1. Navbar

- **Position:** `fixed` top, `background: #050505cc`, `backdrop-filter: blur(12px)`
- **Left:** Logo "DEVMETRY" in JetBrains Mono bold, green glow (`text-shadow: 0 0 10px #00ff4140`)
- **Center:** Anchor links — Features, How it works, FAQ — smooth scroll via GSAP `scrollTo`
- **Right:** CTA button "Explore your metrics" — border `#7c3aed`, hover fills with purple/cyan gradient
- **Mobile:** Hamburger opens fullscreen menu with GSAP stagger animation on links
- **Scroll behavior:** Always visible. On scroll, gains bottom border `#30363d`

### 2. Hero

**Layout:** Two columns on desktop, stacked on mobile.

**Left column (text):**
- Tagline: `// your github metrics, decoded` in `#7d8590`
- Heading: "Track your code.\nMeasure your impact." — `#e6edf3`, keywords "code" and "impact" in green→purple gradient
- Paragraph: Short product description in `#7d8590`
- CTA button: "Explore your metrics" — gradient `#7c3aed → #06b6d4`, hover with glow
- Sub-CTA text: "Free • No credit card • GitHub OAuth" in `#7d8590`

**Right column (animations):**

*Dashboard Preview Card:*
- Window bar with 3 dots (red/yellow/green)
- Border `#30363d`, background `#0d1117`
- 3 animated counters: commits (`#00ff41`), PRs merged (`#7c3aed`), streak days (`#06b6d4`)
- Mini contribution grid below (small squares with varying `#00ff41` opacities)

*Contribution Graph:*
- Vertical bars (commits/week) that grow with GSAP stagger
- Discrete X-axis labels

**GSAP Animations:**
- Left text: fade-in + slide-up, stagger per element
- Card: fade-in + scale 0.95→1 + continuous float (yoyo)
- Counters: countUp from 0 to target value over ~2s
- Bars: height grow from 0, stagger 0.1s between each

**Background:** Radial gradient `#00ff4108` centered behind the card

### 3. Features

**Heading:** `// what you'll track` + "Metrics that matter"

**Layout:** 2x3 grid on desktop, stack on mobile. 6 cards:

| # | Name                | Category     | Accent    | Description                                                |
|---|---------------------|--------------|-----------|------------------------------------------------------------|
| 1 | Commit Analytics    | Code         | green     | Total commits, frequency, most active repos                |
| 2 | Pull Requests       | Code         | purple    | PRs opened/merged/closed, average merge time               |
| 3 | Code Reviews        | Code         | cyan      | Reviews given, comments, repos reviewed                    |
| 4 | Contribution Streak | Consistency  | green     | Current streak, longest streak, active days                |
| 5 | Activity Heatmap    | Consistency  | purple    | Contribution graph visualization, most active days/hours   |
| 6 | Language Breakdown  | Consistency  | cyan      | Percentage per language, evolution over time                |

**Card style:**
- Background `#0d1117`, border `#30363d`
- Hover: border `#00ff4140` with subtle glow
- Icon top in alternating accent color
- Title `#e6edf3`, description `#7d8590`

**GSAP:** ScrollTrigger fade-in + slide-up, stagger 0.15s. Icons pulse on viewport entry.

### 4. How It Works

**Heading:** `// getting started` + "Three steps. Two minutes."

**Layout:** 3 horizontal steps on desktop (connected by dashed line), vertical on mobile.

| Step | Command                       | Title             | Description                                                        |
|------|-------------------------------|-------------------|--------------------------------------------------------------------|
| 1    | `$ devmetry connect --github` | Connect GitHub    | Sign in with your GitHub account. We only read public data.        |
| 2    | `$ devmetry scan --all`       | Scan Repositories | We analyze your commits, PRs, reviews, and activity patterns.      |
| 3    | `$ devmetry dashboard --open` | Explore Dashboard | Your personalized metrics dashboard is ready.                      |

**Card style:** Mini terminal card — window bar with dots, background `#0d1117`. Command in `#00ff41`. Step number in circle with `#7c3aed` border. Connector line: dashed `#30363d`.

**GSAP:** ScrollTrigger stagger 0.3s per step. Commands do typing animation on viewport entry. Connector line draws left-to-right via CSS width animation (not drawSVG — paid GSAP plugin).

### 5. Social Proof

**Heading:** `// trusted by developers` + "Join the community"

**Layout:** Centered, clean background `#050505`.

**Content:**
- 3 stat counters in a row: "500+ developers" / "10K+ commits tracked" / "50+ countries"
  - Numbers in large `#00ff41`, labels in `#7d8590`
  - Separated by vertical dividers `#30363d`
  - Subtle green glow behind numbers
- Below: Row of circular avatar placeholders + "+500 devs already tracking"
- Note: Numbers are aspirational/placeholder until real data exists

**GSAP:** ScrollTrigger countUp on the 3 numbers. Avatars fade-in with fast stagger (0.05s).

**Rendering:** Static content in server component, countUp animation in small client wrapper.

### 6. FAQ

**Heading:** `// frequently asked` + "Questions & Answers"

**Layout:** Centered accordion, max-width ~700px.

| Question                            | Answer                                                                                           |
|-------------------------------------|--------------------------------------------------------------------------------------------------|
| Is Devmetry free?                   | Yes, completely free. We use GitHub OAuth and only access public data.                           |
| What data do you access?            | Only public GitHub data: repos, commits, PRs, and activity. We never access private repositories.|
| How often are metrics updated?      | Your dashboard refreshes every time you log in. Real-time tracking coming soon.                  |
| Can I share my dashboard?           | Public sharing is on our roadmap. For now, your dashboard is private to you.                     |

**Style:**
- Question: `#e6edf3`, prefixed with `>` in `#00ff41`
- Answer: `#7d8590`, appears below on expand
- Bottom border `#30363d` between items
- `+`/`-` icon on right in `#7d8590`

**GSAP:** Height animation for expand/collapse. Answer fades in + slides down on open.

### 7. Footer

**Layout:** Two rows.

**Row 1 (3 columns on desktop, stack on mobile):**
- Left: Logo "DEVMETRY" + tagline "Your GitHub metrics, decoded." in `#7d8590`
- Center: Links — Features, How it works, FAQ (same anchors as navbar)
- Right: GitHub icon link to project repo

**Row 2:** Separator `#30363d` + `© 2026 Devmetry. Built for developers.` centered in `#7d8590`

**Style:** Background `#0d1117`, no scan lines. Server component, no animations.

## SEO & Metadata

Configured in `page.tsx` metadata export:
- **Title:** "Devmetry — Track Your GitHub Metrics"
- **Description:** Optimized for search — mentions GitHub metrics, developer dashboard, free
- **Open Graph:** Title, description, image (placeholder for now — create actual OG image before launch)
- **JSON-LD:** `WebApplication` schema
- **SSR:** Page is server-rendered by default; client components hydrate for interactivity

## Dependencies to Add

- `gsap` — animation library
- `@gsap/react` — React integration (if available/needed)
- `class-variance-authority` — component variant definitions
- `tailwind-merge` — smart Tailwind class merging
- `clsx` — conditional class concatenation

## Responsive Breakpoint

All "desktop" vs "mobile" references use Tailwind's `lg` breakpoint (`1024px`) as the consistent cutoff. Below `lg` = mobile/stacked layout, above = desktop/multi-column layout.
