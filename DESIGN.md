# DESIGN.md

Base design system for this portfolio (Tailwind). The user customizes it often. Treat it as a starting point, not a spec.

## Precedence

1. The user's current request
2. A design the user provides
3. This file

If a new design conflicts with this file, follow the design and update this file.

## Rules

- Use role tokens, never raw hex or hue names (`bg-surface`, not `bg-[#FBEF9C]` or `bg-yellow-100`).
- Switching theme changes colors only. Layout stays identical. No `if theme === ...` in components.
- Every token exists in every theme.
- One dominant color mass per viewport (hero or dark section). Accent stays small.
- Keep text contrast at 4.5:1 or better (3:1 for large text). Check any new pair.
- Footer is always dark.

## Tokens

| Token | yellow | blue |
|---|---|---|
| `--bg` | `#FDFDF9` | `#F7FAFD` |
| `--surface` | `#FBEF9C` | `#CFE7FB` |
| `--ink` | `#201D18` | `#0A1F44` |
| `--accent` | `#FEE32B` | `#41A5EE` |
| `--quote-highlight` | `#FEE32B` | `#FEE32B` |
| `--on-accent` | `#201D18` | `#0A1F44` |
| `--primary` | `#FEE32B` | `#1A5CBD` |
| `--on-primary` | `#201D18` | `#FFFFFF` |
| `--primary-hover` | `#201D18` | `#103F91` |
| `--on-primary-hover` | `#FEE32B` | `#FFFFFF` |
| `--hero` | `#FEE32B` | `#2B7CD3` |
| `--on-hero` | `#201D18` | `#FFFFFF` |
| `--hero-btn` | `#201D18` | `#FFFFFF` |
| `--on-hero-btn` | `#FDFDF9` | `#1A5CBD` |
| `--link` | `#877928` | `#1A5CBD` |
| `--link-text` | `#6E6220` | `#1A5CBD` |
| `--link-hover` | `#201D18` | `#103F91` |
| `--dark` | `#201D18` | `#0A1F44` |
| `--on-dark` | `#FDFDF9` | `#F7FAFD` |
| `--body-text` | `#222` | `#222` |

Derived (theme-agnostic): `--ink-muted: color-mix(in srgb, var(--ink) 72%, var(--bg))`; `--line: color-mix(in srgb, var(--ink) 18%, var(--bg))`.

Regular paragraph and detail text on light backgrounds uses `--body-text`. Headings, links, metadata, and text on dark or primary backgrounds keep their own role colors.

The entry chooser is intentionally grayscale and does not use the portfolio theme. White image placeholders use `--placeholder` in both themes. These role tokens are defined in `src/styles/global.css`.

| Shared / entry token | Value | Role |
|---|---|---|
| `--placeholder` | `#FFFFFF` | Image placeholder |
| `--intro-bg` | `#F8F8F8` | Entry background |
| `--intro-ink` | `#141414` | Entry text |
| `--intro-soft` | `#404040` | Muted entry text |
| `--intro-line` | `#A8A8A8` | Entry dividers |
| `--intro-anxious` | `#4C4C4C` | Anxious profile surface |
| `--intro-on-anxious` | `#FFFFFF` | Text on anxious surface |

## Setup

```css
:root, [data-theme="yellow"] {
  --bg:#FDFDF9; --surface:#FBEF9C; --ink:#201D18;
  --accent:#FEE32B; --on-accent:#201D18; --quote-highlight:#FEE32B;
  --primary:#FEE32B; --on-primary:#201D18;
  --primary-hover:#201D18; --on-primary-hover:#FEE32B;
  --hero:#FEE32B; --on-hero:#201D18;
  --hero-btn:#201D18; --on-hero-btn:#FDFDF9;
  --link:#877928; --link-text:#6E6220; --link-hover:#201D18;
  --dark:#201D18; --on-dark:#FDFDF9;
  --body-text:#222;
}
[data-theme="blue"] {
  --bg:#F7FAFD; --surface:#CFE7FB; --ink:#0A1F44;
  --accent:#41A5EE; --on-accent:#0A1F44; --quote-highlight:#FEE32B;
  --primary:#1A5CBD; --on-primary:#FFFFFF;
  --primary-hover:#103F91; --on-primary-hover:#FFFFFF;
  --hero:#2B7CD3; --on-hero:#FFFFFF;
  --hero-btn:#FFFFFF; --on-hero-btn:#1A5CBD;
  --link:#1A5CBD; --link-text:#1A5CBD; --link-hover:#103F91;
  --dark:#0A1F44; --on-dark:#F7FAFD;
  --body-text:#222;
}
:root {
  --ink-muted: color-mix(in srgb, var(--ink) 72%, var(--bg));
  --line: color-mix(in srgb, var(--ink) 18%, var(--bg));
}
```

Tailwind v4: expose every variable as `--color-<name>: var(--<name>)` inside `@theme inline` (so `bg-surface`, `text-ink`, `bg-primary`, `text-on-hero` work). Tailwind v3: same names under `theme.extend.colors` as `"var(--name)"`.

Switch theme with `document.documentElement.dataset.theme = "blue"`. Set it before first paint to avoid a flash.

## Components

| Context | Button classes |
|---|---|
| Default | `bg-primary text-on-primary hover:bg-primary-hover hover:text-on-primary-hover` |
| Secondary | `border border-ink text-ink hover:bg-surface` |
| On hero | `bg-hero-btn text-on-hero-btn` |
| On dark | `bg-accent text-on-accent` |

- Body links: `text-link-text underline hover:text-link-hover`. Use `link` only for icons and large text. On dark, links use `text-accent`.
- A container never matches its parent's background. Alternate `bg` and `surface` between sections.
- Chips, badges, highlights: `bg-accent text-on-accent`.
- One primary button per region.
- Spacing and radius are not defined here. Infer them from the code or the design.

## Typography

- **Display / headings:** Oswald, loaded locally from `public/fonts/oswald-latin.woff2` and `oswald-vietnamese.woff2`. Use uppercase for the large editorial titles in The Intern.
- **Body / labels / controls:** Open Sans, loaded locally from `public/fonts/open-sans-latin.woff2` and `open-sans-vietnamese.woff2`.
- Fallbacks: Impact then sans-serif for display; Arial then sans-serif for body. The Intern uses these existing project fonts; it does not load a remote font.

## Known limits

- White on `#41A5EE` is about 2.7:1. Do not use it.
- Blue primary on blue dark is about 2.6:1. Use the accent button there.
- Yellow link (`#877928`) is about 4.3:1 on bg and 3.7:1 on surface. Icons and large text only.

## The Intern folio

The Intern uses the **blue** palette from the table above. Its role aliases in `src/styles/intern-folio.css` reference those global tokens: `--folio-paper` → `--bg`, `--folio-dark` → `--dark`, `--folio-light-ink` → `--on-dark`, `--folio-ink` → `--ink`, `--folio-accent` → `--accent`. `--quote-highlight` colors the Quick Intro quote lettering yellow over the portrait. `--folio-deep` mixes `--dark` with black for the footer. The stone surface and two project placeholder colors are `color-mix()` combinations of the same tokens. There are no extra literal color codes in The Intern CSS. The horizontal and stacked layouts share the palette.

## EduConnect live demo

`public/demos/educonnect.html` is the supplied standalone EduConnect screen, displayed only inside sandboxed iframes in THE WORK and Selected cases. It does not inherit The Intern theme. The demo loads **Inter** and **Material Symbols Outlined** from Google Fonts and Tailwind from its CDN. Its original palette is confined to the iframe: `#001551`, `#00195e`, `#002b8f`, `#141d23`, `#191c1d`, `#1e3ea0`, `#293138`, `#3b57b9`, `#3c0800`, `#444652`, `#454748`, `#460b00`, `#5c5f60`, `#626566`, `#6b1701`, `#757684`, `#7f99ff`, `#82270f`, `#93000a`, `#b7c4ff`, `#ba1a1a`, `#c5c5d4`, `#c5c7c8`, `#d2dbe4`, `#dbe4ed`, `#dce1ff`, `#e0e9f2`, `#e1e3e4`, `#e6eff8`, `#e9f2fb`, `#ecf5fe`, `#f57d5d`, `#f6faff`, `#ffb4a1`, `#ffdad6`, `#ffdbd2`, `#ffffff`.

## Adapting to a new design or palette

1. Map new colors to existing roles by luminance: lightest to bg, darkest to ink and dark, most vibrant to accent, a light tint to surface, a mid-dark saturated color to link and primary.
2. If a pair fails contrast: swap roles, then switch text to ink or white, then derive a lighter or darker tone of the same hue. Flag derived colors.
3. If a design needs a color with no role, add a new role token (named by job, not hue) to every theme.
4. A new theme is a new `[data-theme]` block with every variable filled.
5. Update this file when tokens change.
