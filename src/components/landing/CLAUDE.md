# Landing Page Components

## Context

Server and client components for the marketing landing page. Each file is a self-contained section rendered in `src/app/(landing)/page.tsx`.

## Conventions

- Use **GSAP** (`@gsap/react`) for scroll-triggered and entrance animations
- Wrap client-side animation logic in `"use client"` components
- Static data arrays (e.g., features list, stats) should be defined as `const` outside the component
- SVG icons are inline — no icon library. They are decorative (`aria-hidden` when inside labeled elements)

## Design Tokens

All colors come from `globals.css` via `@theme inline`. Use semantic Tailwind classes:

- Backgrounds: `bg-bg-base`, `bg-bg-surface`, `bg-bg-elevated`
- Text: `text-text-primary`, `text-text-secondary`
- Accents: `text-accent-green`, `bg-accent-green`, `border-accent-cyan`
- Border: `border-border`
