# App Directory

## Context

Next.js App Router structure. Uses route groups (`(landing)`) for layout organization.

## Conventions

- `layout.tsx` — root layout with font loading and global metadata
- `globals.css` — Tailwind v4 config with `@theme inline` for design tokens
- Route groups (e.g., `(landing)`) do NOT affect URL paths — they exist for layout nesting
- Pages are server components by default; only add `"use client"` when necessary
- JSON-LD structured data goes in `page.tsx` via `<script type="application/ld+json">`
