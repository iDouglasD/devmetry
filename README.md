# Devmetry

A developer dashboard that turns your GitHub activity into actionable insights. Track commits, PRs, streaks, code reviews, and more — all in one place.

## Tech Stack

- **Next.js 16** with App Router and React 19
- **TypeScript** for type safety
- **Tailwind CSS v4** with custom dark theme and semantic design tokens
- **GSAP** for scroll-triggered and entrance animations
- **CVA** (class-variance-authority) for component variants
- **Biome.js** for linting and formatting
- **Jest** + **React Testing Library** for unit tests

## Features

- Commit analytics — frequency, totals, and most active repos
- Pull request tracking — opened, merged, closed, and average merge time
- Code review stats — reviews given, comments, repos reviewed
- Contribution streak — current and longest streaks
- Activity heatmap — visualize your most active days and hours
- Language breakdown — tech stack evolution over time

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm lint` | Check linting with Biome |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm format` | Format code with Biome |
| `pnpm test` | Run unit tests |
| `pnpm test:watch` | Run tests in watch mode |

## Project Structure

```
src/
├── app/            # Next.js App Router (layouts, pages, globals)
├── components/
│   ├── landing/    # Landing page sections (hero, features, FAQ, etc.)
│   └── ui/         # Reusable UI components (button, card, badge, accordion)
├── lib/            # Utility functions
└── __tests__/      # Unit tests (mirrors src/ structure)
```

## AI-Assisted Development

This project was built with **Claude Opus 4.6** using [Claude Code](https://claude.com/claude-code) and the **Superpowers** skill set — an agentic workflow that includes brainstorming, TDD, code review, systematic debugging, and parallel subagent execution.
