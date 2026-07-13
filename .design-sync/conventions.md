# Sailing Naturali — build conventions

Brand: a premium all-electric sailing charter in the Pacific Northwest. Calm, editorial, nautical — deep navy + forest green on warm paper, serif display type, uppercase mono eyebrows. No card shadows; hairline `border-sn-cloud` borders and flat color bands do the separation.

## Setup

No provider or wrapper is needed — components are self-contained (their content ships with the bundle). `styles.css` supplies everything global: the base layer already styles `body` (paper background, navy text, Geist), `h1–h3` (Fraunces, tight leading), selection and focus states, and loads the brand fonts (Fraunces, Geist, Geist Mono) via a Google Fonts `@import`.

## Styling idiom — Tailwind utilities, compiled subset only

This is a Tailwind CSS v4 system, but the shipped stylesheet contains **only the classes the site already uses** — an arbitrary Tailwind class you invent will NOT resolve. Before using a utility, confirm it exists in `styles.css` (imports `_ds_bundle.css`, the full inventory). For anything missing, style with the design tokens directly: `style={{ background: 'var(--color-sn-navy)' }}`.

**Color tokens** (CSS custom properties, all defined in `styles.css`):
`--color-sn-navy` #002448 (primary text/dark bands) · `--color-sn-navy-deep` #00183c (footer) · `--color-sn-green` #006030 (accent, eyebrows, links) · `--color-sn-green-mid` #58a058 · `--color-sn-leaf` #88b868 (CTA buttons, rules) · `--color-sn-steel` `--color-sn-harbor` `--color-sn-deep` (water blues) · `--color-sn-sky` `--color-sn-mist` `--color-sn-foam` `--color-sn-cloud` `--color-sn-paper` (light neutrals).

**Shipped utility vocabulary** (the families that exist — real names):
- Color: `bg-sn-navy` `bg-sn-navy-deep` `bg-sn-green` `bg-sn-leaf` `bg-sn-paper` `bg-sn-cloud` `text-sn-navy` `text-sn-navy/70` `text-sn-paper` `text-sn-green` `text-sn-green-mid` `text-sn-leaf` `text-sn-sky` `text-sn-sky/70` `border-sn-cloud` `hover:bg-sn-foam` `hover:text-sn-leaf`
- Type: `font-display` (Fraunces — all headings) · `font-sans` (Geist — body) · `font-mono` (Geist Mono — eyebrows/labels, always with `text-xs uppercase tracking-[0.18em]`) · sizes `text-xs`→`text-4xl`, `md:text-6xl`
- Layout: `mx-auto max-w-6xl px-6 md:px-10` (the page container), `flex`/`grid` families, `gap-*`, `rounded-lg`/`rounded-xl`/`rounded-2xl`/`rounded-full`
- Brand extras: `sn-hero` (the sky→navy water gradient band) · `sn-rule` (short green hairline) · `sn-rise` (entrance motion) · `sn-route` (self-drawing SVG route line); reduced-motion is handled globally.

## Components

`window.SailingNaturali` exports `Itineraries` (full itineraries page), `RouteMap` (SVG route chart — `routeId` must be one of `desolation-expedition`, `gulf-islands`, `coast-passage`, `broughtons-reach`), `SiteFooter` (use on every page). API in each `<Name>.d.ts`, usage in `<Name>.prompt.md`.

## Idiomatic pattern

```jsx
<section className="mx-auto max-w-6xl px-6 pt-24 pb-12 md:px-10">
  <p className="font-mono text-xs uppercase tracking-[0.22em] text-sn-green">Itineraries · In development</p>
  <h1 className="mt-5 max-w-3xl text-4xl text-sn-navy md:text-6xl">The trips we're planning.</h1>
  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sn-navy/75">Body copy in Geist on paper.</p>
  <a href="#" className="mt-8 inline-flex items-center gap-2 rounded-full bg-sn-leaf px-6 py-3 text-sm font-medium text-sn-navy transition-colors hover:bg-sn-paper">Join the list</a>
</section>
<SiteFooter />
```
