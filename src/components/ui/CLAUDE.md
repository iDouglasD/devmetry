# UI Components

## Context

Reusable, generic UI primitives (buttons, cards, badges, accordion). These are **not** tied to any specific page — they are shared across the app.

## Conventions

- Use **CVA** (`class-variance-authority`) for variant-based styling
- Use the `cn()` utility from `src/lib/utils.ts` to merge Tailwind classes (`clsx` + `tailwind-merge`)
- Components should accept a `className` prop for external overrides
- Prefer composition over configuration — keep component APIs small
- Accessibility: use semantic HTML elements, ARIA attributes, and keyboard support
