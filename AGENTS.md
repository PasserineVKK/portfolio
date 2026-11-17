# AGENTS.md

Personal portfolio. Keep it simple, fast, and easy to restyle.

## Stack

- Astro (version: check `package.json`, do not assume) + React islands + Tailwind
- Package manager: pnpm only (`pnpm add`, `pnpm dev`, `pnpm build`). Never use npm or yarn; do not create other lockfiles.
- Static output by default. No backend unless asked.

## Before you code

- Colors and theming: read `DESIGN.md`. Use role tokens only (`bg-surface`, `text-ink`), never raw hex.
- Astro APIs change between versions. If unsure, check https://docs.astro.build for the installed version instead of guessing.

## Conventions

- Pages: `src/pages/`. Layouts: `src/layouts/`. Components: `src/components/`.
- Default to `.astro` components (no JS shipped). Use React only when the UI needs state or events (theme toggle, carousel, filters).
- React components used in a page need a directive: `client:load` (needed immediately) or `client:visible` (below the fold). Without it, the component renders but does not run.
- No `useState` or browser APIs in `.astro` files. Build-time logic goes in the frontmatter (`---`).
- Content (projects, posts) goes in Markdown/MDX or content collections, not hardcoded in components.
- Theme is set by `data-theme` on `<html>`. The inline script in `<head>` (`is:inline`) must set it before first paint.
- Images: use Astro's `<Image />`, always with alt.

## Animation and 3D

- Prefer CSS transitions and Astro View Transitions for page and hover effects. Reach for a JS library (GSAP or Motion) only when CSS cannot do it.
- 3D uses three.js, usually via `@react-three/fiber` (+ drei), as a React island: `client:only="react"` (or `client:visible` if SSR-safe). Never import three.js into `.astro` frontmatter or on the server.
- Lazy-load heavy code. The 3D island loads after first paint and must not block the hero text. Show a static fallback (poster image or simple shape) while loading and on devices that cannot run WebGL.
- Models: `.glb`, compressed (Draco or meshopt), ideally under 2 MB, stored in `public/`. Textures sized for the screen, not for the source file.
- Cap pixel ratio (`dpr={[1, 2]}`), pause rendering when off-screen, and dispose of geometries and materials on unmount.
- Respect `prefers-reduced-motion`: disable or simplify animation and auto-rotation.
- 3D colors come from theme tokens (read CSS variables), not hardcoded hex, so the model follows the theme.
- Animation never changes layout between themes.

## Quality

- Semantic HTML, keyboard-accessible, visible focus styles.
- Each page has a `<title>`, meta description, and Open Graph tags (the portfolio gets shared as links).
- Mobile first. Test every page in both themes.

## Before finishing

- `pnpm build` and `pnpm astro check` both pass.
- Pages stay light: check the hero loads fast with the 3D island disabled.
- No raw hex colors in components.
- Mention any new dependency or assumption in your summary.

## Astro development notes

- When starting the dev server, use background mode: `astro dev --background`.
- Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.
- Full documentation: https://docs.astro.build
- Consult the routing, Astro components, framework components, content collections, styling, and internationalization guides before changing related areas.
