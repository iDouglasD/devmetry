@AGENTS.md

## Commit Convention

- Use **Conventional Commits** with scope: `type(scope): description`
- Always write commit messages in **English**
- Do **NOT** add `Co-Authored-By` lines
- Examples:
  - `feat(landing): add hero section with GSAP animations`
  - `fix(ui): correct button hover state on mobile`
  - `docs(specs): add landing page design spec`
  - `chore(deps): install gsap and cva dependencies`
  - `refactor(accordion): extract animation logic`
  - `style(globals): update color tokens`
  - `test(button): add variant rendering tests`

## Tailwind CSS

- **Always prefer Tailwind utility classes** over arbitrary values (`[Xpx]`)
- Use the Tailwind v4 default spacing scale (base 4px): `0.5`=2px, `0.75`=3px, `1`=4px, `1.5`=6px, `2`=8px, `2.5`=10px, `3`=12px, `4`=16px, etc.
- Use named border-radius tokens: `rounded-sm`=2px, `rounded`=4px, `rounded-md`=6px, `rounded-lg`=8px, `rounded-xl`=12px
- Only use arbitrary values when there is **no equivalent Tailwind class** (e.g., `h-[600px]`, `max-w-[700px]`)

## Linting

- **Biome.js** is the linter and formatter — do NOT use ESLint or Prettier
- Run `pnpm lint` to check, `pnpm lint:fix` to auto-fix
- Run `pnpm format` to format code
