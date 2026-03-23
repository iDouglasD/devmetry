# Design Spec: Vercel Deploy + GitHub Actions CI/CD

**Date:** 2026-03-23
**Status:** Implemented

---

## Context

The Devmetry project (Next.js 16, React 19, pnpm, Biome.js, Jest) has no CI/CD or deployment setup. This spec covers:

- Deploying the app to Vercel with automatic preview deploys on PRs
- A GitHub Actions pipeline that runs lint, format check, tests, and build before any merge to `main`
- Branch protection on `main` so merges are blocked if CI fails

**Approach:** Vercel GitHub Integration + GitHub Actions CI + Branch Protection

- Vercel handles all deploys (auto, via OAuth GitHub integration, no secrets needed in CI)
- GitHub Actions validates quality gates on every PR and push
- Branch protection on `main` enforces CI must pass before merge

---

## Architecture

```
Push/PR
  └── GitHub Actions (ci.yml)           ← quality gate
        ├── pnpm lint
        ├── pnpm exec biome format --check .
        ├── pnpm test --ci
        └── pnpm build

  └── Vercel (GitHub Integration)        ← auto deploy
        ├── PR → Preview Deploy (unique URL per PR)
        └── Merge to main → Production Deploy

Branch Protection (main):
  └── Requires "CI" status check to pass before merge
```

---

## Key Decisions

- `pnpm format` uses `--write` and is not safe for CI. Format check uses `pnpm exec biome format --check .` instead.
- No environment variables needed — app is purely frontend.
- Node 22 LTS, pnpm via corepack (`pnpm/action-setup@v4` reads `packageManager` from `package.json`).
- pnpm store is cached by `pnpm-lock.yaml` hash to speed up installs.

---

## Files

| File | Purpose |
|---|---|
| `.github/workflows/ci.yml` | GitHub Actions CI pipeline |

---

## Manual Setup Steps

### Vercel

1. Go to vercel.com → Add New Project → Import Git Repository
2. Select the `devmetry` GitHub repo
3. Framework preset: Next.js (auto-detected)
4. Production branch: `main`
5. Deploy — Vercel will auto-configure GitHub integration (preview on PRs, production on `main`)

### GitHub Branch Protection

1. GitHub → repo → Settings → Branches → Add branch ruleset (or classic rule)
2. Branch name pattern: `main`
3. Enable: "Require status checks to pass before merging"
4. Add required status check: `CI` (matches the job name in `ci.yml`)
5. Enable: "Require branches to be up to date before merging"
6. Save

---

## Verification

1. Push `ci.yml` to a branch and open a PR → GitHub shows the "CI" check running
2. Introduce a lint error → CI fails, merge is blocked
3. Fix and re-push → CI passes, merge is unblocked
4. After Vercel is connected: open a PR → Vercel preview URL appears in PR checks
5. Merge to `main` → Vercel production deploy triggers automatically
