# sailingnaturali.com

The apex marketing site for [Sailing Naturali](https://sailingnaturali.com) — an all-electric expedition charter being built in the open in the Pacific Northwest.

Built with **[TanStack Start](https://tanstack.com/start)** (React + Vite), **prerendered to static HTML**, deployed on **Vercel**. No CMS: content lives in the repo and ships via PR → Vercel preview → merge.

This repo also carries a small, copyable **SEO + GEO module** for TanStack Start. If you found your way here looking for "how do I do SEO / answer-engine visibility on TanStack Start," the [SEO/GEO pattern](#the-seogeo-pattern) section is for you.

---

## The SEO/GEO pattern

**SEO** = ranking in classic search (Googlebot, Bingbot). **GEO** (Generative Engine Optimization) = getting *cited* by AI answer engines (GPTBot, PerplexityBot, ClaudeBot, Google AI Overviews).

They share one spine: **a bot that receives clean, prerendered HTML with good structured data wins both.** TanStack Start client-renders by default, which is exactly the thing both SEO and GEO need fixed — so the single highest-leverage move is prerendering every public route to static HTML. Everything else (meta, JSON-LD, sitemap, `llms.txt`) layers on top of that.

### 1. Prerender to static HTML (the load-bearing decision)

In `vite.config.ts`, enable prerendering on the `tanstackStart()` plugin and add `nitro()` for the Vercel build target:

```ts
tanstackStart({
  prerender: {
    enabled: true,
    autoSubfolderIndex: true,
    autoStaticPathsDiscovery: true,
    crawlLinks: true,
    concurrency: 14,
  },
}),
nitro(),
```

Verify it worked by inspecting the built HTML — the page text must be in the file, not just an empty `<div id="root">`:

```bash
pnpm build
grep -a 'your hero text' .output/public/index.html   # must match
```

> Note: Nitro emits `index.html` as a single UTF-8 line; macOS/BSD `grep` treats it as binary, so use `grep -a`.

### 2. Single source of truth — `src/lib/site.ts`

One file defines the site and the page registry. Everything downstream (meta, JSON-LD, sitemap, `llms.txt`) reads from it, so adding a page is a one-line change:

```ts
export const siteConfig = { url, name, title, description, ... } as const
export interface PageDef { path; title; description; lastmod }
export const pages: PageDef[] = [ { path: '/', title, description, lastmod } ]
```

### 3. Per-route `<head>` + JSON-LD — `src/lib/seo.ts`

`pageHead(page)` returns a TanStack Router `head` object (title, description, canonical, Open Graph, Twitter). `organizationJsonLd()` / `websiteJsonLd()` return [schema.org](https://schema.org) objects. A route wires them in:

```tsx
export const Route = createFileRoute('/')({
  head: () => ({
    ...pageHead(home),
    scripts: [
      { type: 'application/ld+json', children: JSON.stringify(organizationJsonLd()) },
      { type: 'application/ld+json', children: JSON.stringify(websiteJsonLd()) },
    ],
  }),
  component: Home,
})
```

Finding worth knowing: TanStack Start's route `head.scripts` **does** emit inline `application/ld+json` into the prerendered `<head>` — no need to render the script tag in the component body. (If a future version regresses, the fallback is a `<script type="application/ld+json" dangerouslySetInnerHTML={...} />` directly in the component JSX.)

### 4. Generated `sitemap.xml`, `robots.txt`, `llms.txt`

`src/lib/seo-assets.ts` holds three pure string builders (`buildSitemap`, `buildRobots`, `buildLlmsTxt`). `scripts/generate-seo-assets.mjs` reads `site.ts` and writes the three files into `public/` at build time, so they stay in lockstep with the page registry. The build runs the generator first:

```jsonc
"build": "tsx scripts/generate-seo-assets.mjs && vite build"
```

**`llms.txt` is the GEO-specific lever** — a plain-Markdown map of the site (see [llmstxt.org](https://llmstxt.org)) that answer engines can read without executing JS or parsing your layout. It's cheap to emit and it's the most direct "make this site legible to LLMs" move available today.

### Copy it into your own site

Lift these four files and the build wiring:

```
src/lib/site.ts            # edit: your site + pages
src/lib/seo.ts             # per-route head + JSON-LD helpers
src/lib/seo-assets.ts      # sitemap / robots / llms.txt builders (pure, unit-tested)
scripts/generate-seo-assets.mjs
```

Then enable `prerender` + `nitro()` in `vite.config.ts` (step 1) and set the `build` script (step 4). The builders in `seo-assets.ts` are framework-agnostic pure functions; `seo.ts`'s return shape is TanStack-Router-specific but trivial to adapt.

---

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm test       # vitest — unit tests for the SEO/GEO builders
pnpm build      # generates SEO assets, then prerenders to .output/public/
```

Tests run under `vitest.config.ts` (Node environment, isolated from the app's Vite plugin stack so pure-function tests don't drag in `tanstackStart`/`nitro`/React).

## Deploy

Vercel auto-detects TanStack Start. Build command `pnpm build`; Nitro auto-targets Vercel in CI. DNS lives on Cloudflare (DNS-only / grey-cloud, so Vercel provisions its own TLS cert).

## Editing content

No dashboard. Change copy in `src/routes/*` or `src/lib/site.ts`, open a PR, review the Vercel preview deploy, merge. To add a page: create the route and add a row to `pages` in `site.ts` — the sitemap and `llms.txt` follow automatically.

## License

MIT.
