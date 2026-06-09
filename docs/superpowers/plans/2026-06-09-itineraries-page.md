# Itineraries Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a `/itineraries` page that previews the four planned charter trips, each led by its length and route type, framed as in-development (no prices/dates), with an email CTA.

**Architecture:** Data-driven. A typed `itineraries.ts` module is the single source of truth; a presentational `Itineraries` component renders the intro + tiered card grid + CTA from it; a thin route wires SEO meta + ItemList JSON-LD. A shared `SiteFooter` is extracted (the new page needs the footer the home route currently inlines). One `PageDef` row makes sitemap/llms.txt follow.

**Tech Stack:** TanStack Start (React 19), Tailwind v4 (`sn-*` palette), lucide-react, vitest + @testing-library/react (jsdom). Spec: `docs/superpowers/specs/2026-06-09-itineraries-page-design.md`.

**Branch:** `itineraries-page` (already created). Ships via PR → Vercel preview → merge. Commit after each task. No co-author trailer needed unless Bryan asks; if added, name `Claude Opus 4.8`.

**Repo conventions confirmed:** `__root.tsx` is just the HTML shell (`<Outlet>`), so each route renders its own footer. `vitest.config.ts` currently includes only `tests/**/*.test.ts` in `node` env — Task 4 broadens it to `{ts,tsx}` and component tests use a per-file `// @vitest-environment jsdom` directive. `tsconfig` has `jsx: react-jsx` (esbuild transforms test JSX; no react plugin needed in vitest). `pnpm build` regenerates `routeTree.gen.ts` and the SEO assets — never hand-edit `routeTree.gen.ts`.

---

### Task 1: Itinerary data module

**Files:**
- Create: `src/lib/itineraries.ts`
- Test: `tests/itineraries.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/itineraries.test.ts
import { describe, it, expect } from 'vitest'
import { itineraries } from '../src/lib/itineraries'

describe('itineraries data', () => {
  it('has four trips, each with all required fields non-empty', () => {
    expect(itineraries).toHaveLength(4)
    for (const t of itineraries) {
      expect(t.id).toBeTruthy()
      expect(t.name).toBeTruthy()
      expect(t.tagline).toBeTruthy()
      expect(t.lengthLabel).toBeTruthy()
      expect(t.routeType.label).toBeTruthy()
      expect(t.routeType.descriptor).toBeTruthy()
      expect(t.region).toBeTruthy()
      expect(t.season).toBeTruthy()
    }
  })

  it('has unique ids', () => {
    const ids = itineraries.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('marks exactly one trip as featured', () => {
    expect(itineraries.filter((t) => t.featured)).toHaveLength(1)
  })
})
```

- [ ] **Step 2: Run it, verify it fails**

Run: `pnpm exec vitest run tests/itineraries.test.ts`
Expected: FAIL — cannot resolve `../src/lib/itineraries`.

- [ ] **Step 3: Create the data module**

```ts
// src/lib/itineraries.ts
export interface RouteType {
  label: string // "Backyard" | "Destination" | "Passage" | "Reach"
  descriptor: string // one-line gloss of the transit character
}

export interface Itinerary {
  id: string // stable slug (future detail-page path)
  name: string
  tagline: string // 2–3 sentence pitch, high-level, no unverified specifics
  lengthLabel: string // "8 days" | "8–10 days" | "10–14 days"
  routeType: RouteType
  region: string
  season: string
  featured: boolean
}

// Desolation first so the featured trip leads the grid.
export const itineraries: Itinerary[] = [
  {
    id: 'desolation-expedition',
    name: 'Desolation Expedition',
    tagline:
      "The headline trip. Fly in to the grounds by floatplane, then the warm-water anchorages, waterfalls, and granite of Desolation Sound — the Pacific Northwest's marquee cruising ground.",
    lengthLabel: '8 days',
    routeType: { label: 'Destination', descriptor: 'Fly in to the grounds, cruise the Sound' },
    region: 'Desolation Sound',
    season: 'Mid-summer',
    featured: true,
  },
  {
    id: 'gulf-islands',
    name: 'Gulf Islands',
    tagline:
      'The home-grounds loop. Quiet anchorages, island hikes, local food and wine, and short hops between them — no long passages, no border crossings.',
    lengthLabel: '8 days',
    routeType: { label: 'Backyard', descriptor: 'All in-grounds, minimal transit' },
    region: 'Southern Gulf Islands',
    season: 'Spring & fall',
    featured: false,
  },
  {
    id: 'coast-passage',
    name: 'Up the Coast',
    tagline:
      'The repositioning legs, made the trip. Sail the Sunshine Coast between the Gulf Islands and the northern grounds — more time under sail, small-town stops, fewer crowds.',
    lengthLabel: '8–10 days',
    routeType: { label: 'Passage', descriptor: 'Journey-as-experience, town-hop migration' },
    region: 'Sunshine Coast',
    season: 'Early & late season',
    featured: false,
  },
  {
    id: 'broughtons-reach',
    name: 'Far North — Broughtons',
    tagline:
      'The long-format expedition. Through the tidal rapids and Johnstone Strait into the Broughton Archipelago — remote anchorages, abundant wildlife, the wildest water on the route.',
    lengthLabel: '10–14 days',
    routeType: { label: 'Reach', descriptor: 'Far-north expedition through the rapids' },
    region: 'Broughton Archipelago',
    season: 'Peak summer',
    featured: false,
  },
]
```

- [ ] **Step 4: Run it, verify it passes**

Run: `pnpm exec vitest run tests/itineraries.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/itineraries.ts tests/itineraries.test.ts
git commit -m "feat(itineraries): typed trip data module"
```

---

### Task 2: Register the page for SEO/sitemap

**Files:**
- Modify: `src/lib/site.ts` (append to the `pages` array, after the `'/'` entry on lines 24–31)
- Test: `tests/itineraries-page.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/itineraries-page.test.ts
import { describe, it, expect } from 'vitest'
import { pages } from '../src/lib/site'

describe('itineraries page registration', () => {
  it('is registered so sitemap/llms.txt include it', () => {
    const page = pages.find((p) => p.path === '/itineraries')
    expect(page).toBeDefined()
    expect(page!.title).toMatch(/itinerar/i)
    expect(page!.description).toBeTruthy()
    expect(page!.lastmod).toBe('2026-06-09')
  })
})
```

- [ ] **Step 2: Run it, verify it fails**

Run: `pnpm exec vitest run tests/itineraries-page.test.ts`
Expected: FAIL — `page` is undefined.

- [ ] **Step 3: Add the PageDef**

In `src/lib/site.ts`, add this object to the `pages` array immediately after the existing `'/'` entry (so the array has two entries):

```ts
  {
    path: '/itineraries',
    title: 'Itineraries — Sailing Naturali',
    description:
      'The charter trips we’re planning aboard an all-electric catamaran in the Pacific Northwest — a Gulf Islands loop, a Desolation Sound expedition, a Sunshine Coast passage, and the far-north Broughtons. In development.',
    lastmod: '2026-06-09',
  },
```

- [ ] **Step 4: Run it, verify it passes**

Run: `pnpm exec vitest run tests/itineraries-page.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/site.ts tests/itineraries-page.test.ts
git commit -m "feat(itineraries): register /itineraries page for SEO"
```

---

### Task 3: ItemList JSON-LD helper

**Files:**
- Modify: `src/lib/seo.ts` (add an import + a new exported function)
- Test: `tests/itineraries-jsonld.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/itineraries-jsonld.test.ts
import { describe, it, expect } from 'vitest'
import { itineraryListJsonLd } from '../src/lib/seo'
import { itineraries } from '../src/lib/itineraries'

describe('itineraryListJsonLd', () => {
  it('is an ItemList of all trips with name + description', () => {
    const ld = itineraryListJsonLd()
    expect(ld['@type']).toBe('ItemList')
    expect(ld.itemListElement).toHaveLength(itineraries.length)
    const first = ld.itemListElement[0]
    expect(first['@type']).toBe('ListItem')
    expect(first.position).toBe(1)
    expect(first.item.name).toBe(itineraries[0].name)
    expect(first.item.description).toBe(itineraries[0].tagline)
  })
})
```

- [ ] **Step 2: Run it, verify it fails**

Run: `pnpm exec vitest run tests/itineraries-jsonld.test.ts`
Expected: FAIL — `itineraryListJsonLd` is not exported.

- [ ] **Step 3: Add the helper**

In `src/lib/seo.ts`, add to the imports at the top:

```ts
import { itineraries } from './itineraries'
```

And append this exported function at the end of the file:

```ts
export function itineraryListJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sailing Naturali — planned charter itineraries',
    itemListElement: itineraries.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'TouristTrip',
        name: it.name,
        description: it.tagline,
        touristType: it.routeType.label,
      },
    })),
  }
}
```

- [ ] **Step 4: Run it, verify it passes**

Run: `pnpm exec vitest run tests/itineraries-jsonld.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/seo.ts tests/itineraries-jsonld.test.ts
git commit -m "feat(itineraries): ItemList JSON-LD helper"
```

---

### Task 4: Extract shared SiteFooter + enable tsx tests

**Files:**
- Modify: `vitest.config.ts` (broaden `include` to also match `.test.tsx`)
- Create: `src/components/SiteFooter.tsx`
- Modify: `src/routes/index.tsx` (import + use `<SiteFooter />`, drop the inline `<footer>`)
- Test: `tests/site-footer.test.tsx`

- [ ] **Step 1: Broaden the vitest include**

Replace the `test` block in `vitest.config.ts` with:

```ts
  test: { environment: 'node', include: ['tests/**/*.test.{ts,tsx}'] },
```

(Existing `.test.ts` files keep matching; the default env stays `node`. Component tests opt into jsdom per-file in Step 2.)

- [ ] **Step 2: Write the failing test**

```tsx
// tests/site-footer.test.tsx
// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { SiteFooter } from '../src/components/SiteFooter'

afterEach(cleanup)

describe('SiteFooter', () => {
  it('links to the itineraries page', () => {
    render(<SiteFooter />)
    const link = screen.getByRole('link', { name: /itineraries/i })
    expect(link.getAttribute('href')).toBe('/itineraries')
  })
})
```

- [ ] **Step 3: Run it, verify it fails**

Run: `pnpm exec vitest run tests/site-footer.test.tsx`
Expected: FAIL — cannot resolve `../src/components/SiteFooter`.

- [ ] **Step 4: Create the SiteFooter component**

```tsx
// src/components/SiteFooter.tsx
import { siteConfig } from '../lib/site'

export function SiteFooter() {
  return (
    <footer className="bg-sn-navy-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-sn-sky/70"
        >
          <a href="/itineraries" className="hover:text-sn-leaf">
            Itineraries
          </a>
          <a href={siteConfig.youtube} className="hover:text-sn-leaf">
            YouTube
          </a>
          <a href={siteConfig.substack} className="hover:text-sn-leaf">
            Substack
          </a>
          <a href={siteConfig.instagram} className="hover:text-sn-leaf">
            Instagram
          </a>
          <a href={siteConfig.tiktok} className="hover:text-sn-leaf">
            TikTok
          </a>
        </nav>
        <p className="font-mono text-xs tracking-[0.1em] text-sn-sky/40">
          © Sailing Naturali — built in the Pacific Northwest.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Use it in the home route**

In `src/routes/index.tsx`: add the import near the top (with the other imports):

```tsx
import { SiteFooter } from '../components/SiteFooter'
```

Then delete the entire inline `{/* ── Footer ─ */}` block (the `<footer className="bg-sn-navy-deep">…</footer>`, currently lines ~263–288) and replace it with:

```tsx
      <SiteFooter />
```

(The footer previously hard-coded a greyed `Charters (Year 5)` span; the extracted component replaces it with the live Itineraries link — that change is intentional.)

- [ ] **Step 6: Run tests, verify pass**

Run: `pnpm exec vitest run tests/site-footer.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add vitest.config.ts src/components/SiteFooter.tsx src/routes/index.tsx tests/site-footer.test.tsx
git commit -m "refactor(footer): extract SiteFooter, link Itineraries; enable tsx tests"
```

---

### Task 5: Itineraries page component

**Files:**
- Create: `src/components/Itineraries.tsx`
- Test: `tests/itineraries.component.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// tests/itineraries.component.test.tsx
// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { Itineraries } from '../src/components/Itineraries'
import { itineraries } from '../src/lib/itineraries'

afterEach(cleanup)

describe('Itineraries page', () => {
  it('renders every trip name', () => {
    render(<Itineraries />)
    for (const t of itineraries) {
      expect(screen.getByText(t.name)).toBeTruthy()
    }
  })

  it('surfaces each trip’s length and route type', () => {
    render(<Itineraries />)
    for (const t of itineraries) {
      // lengthLabel may repeat (e.g. two "8 days"); routeType labels are unique
      expect(screen.getAllByText(t.lengthLabel).length).toBeGreaterThan(0)
      expect(screen.getAllByText(t.routeType.label).length).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 2: Run it, verify it fails**

Run: `pnpm exec vitest run tests/itineraries.component.test.tsx`
Expected: FAIL — cannot resolve `../src/components/Itineraries`.

- [ ] **Step 3: Create the component**

```tsx
// src/components/Itineraries.tsx
import { Anchor, Plane, Sailboat, Compass, type LucideIcon } from 'lucide-react'
import { itineraries, type Itinerary } from '../lib/itineraries'
import { siteConfig } from '../lib/site'
import { SiteFooter } from './SiteFooter'

const routeIcon: Record<string, LucideIcon> = {
  Backyard: Anchor,
  Destination: Plane,
  Passage: Sailboat,
  Reach: Compass,
}

function TripCard({ trip }: { trip: Itinerary }) {
  const Icon = routeIcon[trip.routeType.label] ?? Compass
  return (
    <article
      className={`group flex flex-col bg-sn-paper p-8 transition-colors hover:bg-sn-foam md:p-10 ${
        trip.featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-sn-green">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {trip.routeType.label}
      </div>
      <h3 className="mt-5 text-2xl text-sn-navy md:text-3xl">{trip.name}</h3>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-sn-navy/70">{trip.tagline}</p>
      <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 border-t border-sn-cloud pt-5 font-mono text-xs uppercase tracking-[0.12em]">
        <dt className="text-sn-green-mid">Length</dt>
        <dd className="text-sn-navy">{trip.lengthLabel}</dd>
        <dt className="text-sn-green-mid">Region</dt>
        <dd className="text-sn-navy">{trip.region}</dd>
        <dt className="text-sn-green-mid">Season</dt>
        <dd className="text-sn-navy">{trip.season}</dd>
      </dl>
    </article>
  )
}

export function Itineraries() {
  return (
    <main className="font-sans text-sn-navy">
      {/* Intro */}
      <section
        aria-label="Itineraries intro"
        className="mx-auto max-w-6xl px-6 pt-24 pb-12 md:px-10 md:pt-32"
      >
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-sn-green">
          Itineraries · In development
        </p>
        <h1 className="mt-5 max-w-3xl text-balance text-4xl text-sn-navy md:text-6xl">
          The trips we&apos;re planning.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sn-navy/75">
          Four routes through the Pacific Northwest — from a Gulf Islands backyard loop to a
          Desolation Sound expedition and the far-north Broughtons. These are in development for the
          first paid season, shaped and tested through a friends-and-family shakedown year. No dates
          or pricing yet — here&apos;s the shape of them.
        </p>
      </section>

      {/* Tiered card grid (featured trip spans both columns, first row) */}
      <section aria-label="Planned trips" className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        <div className="grid gap-px overflow-hidden rounded-xl border border-sn-cloud bg-sn-cloud md:grid-cols-2">
          {itineraries.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Join the list" className="px-6 pb-24 md:px-10">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-sn-navy px-8 py-16 md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40 blur-2xl"
            style={{ background: 'radial-gradient(circle, #006030, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="relative max-w-xl">
            <h2 className="text-3xl text-sn-paper md:text-4xl">Be first when dates open.</h2>
            <p className="mt-4 text-lg leading-relaxed text-sn-sky">
              We&apos;re building these in the open. Get the build notes and an early word when the
              first season&apos;s dates go live.
            </p>
            <a
              href={siteConfig.substack}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-sn-leaf px-6 py-3 text-sm font-medium text-sn-navy transition-colors hover:bg-sn-paper"
            >
              Join the list
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
```

- [ ] **Step 4: Run it, verify it passes**

Run: `pnpm exec vitest run tests/itineraries.component.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/Itineraries.tsx tests/itineraries.component.test.tsx
git commit -m "feat(itineraries): page component — intro, tiered cards, CTA"
```

---

### Task 6: Wire the route

**Files:**
- Create: `src/routes/itineraries.tsx`

- [ ] **Step 1: Create the route file**

```tsx
// src/routes/itineraries.tsx
import { createFileRoute } from '@tanstack/react-router'
import { pageHead, itineraryListJsonLd } from '../lib/seo'
import { pages } from '../lib/site'
import { Itineraries } from '../components/Itineraries'

const page = pages.find((p) => p.path === '/itineraries')!

export const Route = createFileRoute('/itineraries')({
  head: () => {
    const base = pageHead(page)
    return {
      ...base,
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(itineraryListJsonLd()),
        },
      ],
    }
  },
  component: Itineraries,
})
```

- [ ] **Step 2: Regenerate the route tree + typecheck**

Run: `pnpm build`
Expected: build succeeds; the router plugin regenerates `src/routeTree.gen.ts` to include `/itineraries`, and `scripts/generate-seo-assets.mjs` regenerates the sitemap.

- [ ] **Step 3: Verify the route + sitemap wired up**

Run: `grep -c "/itineraries" src/routeTree.gen.ts && grep -c "itineraries" public/sitemap.xml`
Expected: both counts ≥ 1 (route registered; sitemap includes the page). *(If `sitemap.xml` is emitted to `dist/` instead of `public/`, grep there — check where `generate-seo-assets.mjs` writes.)*

- [ ] **Step 4: Commit**

```bash
git add src/routes/itineraries.tsx src/routeTree.gen.ts
git commit -m "feat(itineraries): wire /itineraries route + ItemList JSON-LD"
```

---

### Task 7: Full verification + PR

**Files:** none (verification + PR)

- [ ] **Step 1: Run the whole test suite**

Run: `pnpm test`
Expected: PASS — all suites green (existing `seo*` + the four new itineraries suites).

- [ ] **Step 2: Typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Production build**

Run: `pnpm build`
Expected: succeeds clean.

- [ ] **Step 4: Eyeball the page (optional but recommended)**

Run: `pnpm dev` then open `http://localhost:5173/itineraries`. Confirm: four cards, Desolation featured/wider, each card shows route-type label + Length/Region/Season, footer links to Itineraries, CTA points at Substack. Ctrl-C when done.

- [ ] **Step 5: Push and open the PR**

```bash
git push -u origin itineraries-page
gh pr create --title "Itineraries preview page" --body "$(cat <<'EOF'
Adds `/itineraries` — a preview of the four planned charter trips (Gulf Islands, Desolation, Up the Coast, Broughtons), each led by **length** and **route type**. Framed as in-development (no prices/dates) with a join-the-list CTA, per `docs/superpowers/specs/2026-06-09-itineraries-page-design.md`.

- Data-driven from `src/lib/itineraries.ts`
- Shared `SiteFooter` extracted; footer now links Itineraries (was a greyed "Charters (Year 5)")
- SEO: `PageDef` + `ItemList`/`TouristTrip` JSON-LD; sitemap/llms.txt follow
- Tests: data integrity, page registration, JSON-LD, footer link, page render

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
Expected: PR opened; Vercel posts a preview URL on the PR.

---

## Self-Review

**Spec coverage:**
- `/itineraries` route + registration → Tasks 2, 6.
- Data module (single source of truth) → Task 1.
- Overview cards only, all four tiered, Desolation featured → Task 5.
- Length + route type led on each card → Task 5 (+ component test asserts both).
- Preview framing, no prices/dates, email CTA → Task 5 (intro copy + CTA).
- Footer link (greyed span → live link) → Task 4.
- SEO PageDef + ItemList JSON-LD → Tasks 2, 3, 6.
- Tests (data integrity + render of length/route-type) → Tasks 1, 5 (+ 2, 3, 4 coverage).
- Out-of-scope items (detail pages, prices, imagery, map, homepage teaser) → not in any task. ✓ Correctly excluded.

No gaps.

**Placeholder scan:** All code blocks are complete and runnable; no TBD/TODO. The only conditional is Task 6 Step 3's sitemap-path note (`public/` vs `dist/`) — that's a real grep-location hedge, not a missing instruction.

**Type consistency:** `Itinerary` / `RouteType` field names (`id`, `name`, `tagline`, `lengthLabel`, `routeType.label`, `routeType.descriptor`, `region`, `season`, `featured`) are defined in Task 1 and used identically in Tasks 3 (JSON-LD), 5 (component), and the tests. `itineraryListJsonLd` named the same in Task 3, its test, and Task 6. `SiteFooter` / `Itineraries` component names consistent across Tasks 4–6 and tests.
