# Itineraries Page — Design

*Design spec. Written 2026-06-09. Repo: `sailingnaturali/web` (TanStack Start, Tailwind v4, Vercel). Ships via feature branch → PR → Vercel preview → merge.*
*Source content: `planning/charter-itinerary-design.md` (the charter product line). Brand/design language: the existing home route (`src/routes/index.tsx`).*

## Goal

A `/itineraries` page that surfaces the four planned charter trips, leading with the two attributes Bryan asked to show — **trip length** and **route type** — framed honestly as in-development previews (charters aren't bookable until the Year 6 paid season).

## Context that shapes the design

- **Charters aren't live.** Year 5 is a friends-&-family shakedown; Year 6 is first paid. The homepage footer greys out "Charters (Year 5)." → This is a **preview/pipeline** surface: no prices, no firm dates, an email CTA to build the pre-booking list.
- **The itinerary content is a working draft.** `charter-itinerary-design.md` flags day-by-day stops "verify before use." → Publish only the **stable high-level shape** (name, length, route type, region, season, a short pitch). No day-by-day in v1.
- **Follow the existing design system.** The home route establishes the editorial language: `sn-*` brand palette, `font-mono` uppercase eyebrows, `font-display` headings, a bordered card grid (the "Three bets" section), an email-capture block, the footer. The new page reuses these patterns rather than inventing new ones.
- **Page registration is data-driven.** Adding a `PageDef` row to `src/lib/site.ts` makes sitemap/robots/llms.txt follow automatically (build-time generation in `scripts/`). Routes set meta via `pageHead()` and inject JSON-LD via `head().scripts` (see `src/routes/index.tsx`).

## Decisions captured during brainstorming

| Fork | Decision |
|---|---|
| Depth (v1) | **Overview cards only** — no per-trip detail pages yet (content is provisional) |
| Framing | **Preview + join the list** — "the trips we're planning," no prices/dates, email CTA |
| Lineup | **All four, tiered** — Gulf Islands, Desolation (featured), Up the Coast, Broughtons |
| Route path | `/itineraries` (footer "Charters (Year 5)" becomes a live "Itineraries" link) |
| Spec/code location | The `web` repo, on the `itineraries-page` branch, shipped in the PR |

## Architecture

Three units, each with one responsibility:

1. **`src/lib/itineraries.ts`** — typed data module, single source of truth for the trip lineup. The page renders from this; future detail pages hang off the same data. Mirrors how `site.ts` holds config.
2. **`src/routes/itineraries.tsx`** — the route/page. Renders the intro band, the tiered card grid from the data, and the email-capture CTA. Pure presentation over the data module.
3. **`src/lib/site.ts`** — add one `PageDef` row so SEO assets (sitemap/llms.txt) include the page.

Plus a one-line footer edit in `src/routes/index.tsx` (the greyed span → a link).

### Data model (`src/lib/itineraries.ts`)

```ts
export interface RouteType {
  label: string       // "Backyard" | "Destination" | "Passage" | "Reach"
  descriptor: string  // one-line gloss of the transit character
}

export interface Itinerary {
  id: string          // slug, stable (future detail-page path)
  name: string
  tagline: string     // 2–3 sentence pitch, high-level, no unverified specifics
  lengthLabel: string // "8 days" | "8–10 days" | "10–14 days"
  routeType: RouteType
  region: string
  season: string
  featured: boolean   // Desolation = true (visual emphasis)
}

export const itineraries: Itinerary[] = [ /* the four below */ ]
```

### The four trips (content — stable high-level only)

| id | name | routeType.label | length | region | season | featured |
|---|---|---|---|---|---|---|
| `gulf-islands` | Gulf Islands | Backyard | 8 days | Southern Gulf Islands | Spring & fall | false |
| `desolation-expedition` | Desolation Expedition | Destination | 8 days | Desolation Sound | Mid-summer | **true** |
| `coast-passage` | Up the Coast | Passage | 8–10 days | Sunshine Coast | Early & late season | false |
| `broughtons-reach` | Far North — Broughtons | Reach | 10–14 days | Broughton Archipelago | Peak summer | false |

Taglines (draft, brand voice — direct, no fluff, no prices/dates):
- **Gulf Islands:** "The home-grounds loop. Quiet anchorages, island hikes, local food and wine, and short hops between them — no long passages, no border crossings."
- **Desolation Expedition:** "The headline trip. Fly in to the grounds by floatplane, then the warm-water anchorages, waterfalls, and granite of Desolation Sound — the Pacific Northwest's marquee cruising ground."
- **Up the Coast:** "The repositioning legs, made the trip. Sail the Sunshine Coast between the Gulf Islands and the northern grounds — more time under sail, small-town stops, fewer crowds."
- **Far North — Broughtons:** "The long-format expedition. Through the tidal rapids and Johnstone Strait into the Broughton Archipelago — remote anchorages, abundant wildlife, the wildest water on the route."

### Page layout (`src/routes/itineraries.tsx`)

Reuses the home route's section rhythm and `sn-*` palette:

1. **Intro band** — `font-mono` eyebrow `Itineraries · In development`; `font-display` headline ("The trips we're planning."); one honest paragraph: the lineup is in development for the Year 6 season and being tested through the Year 5 friends-&-family shakedown. No prices, no dates.
2. **Tiered card grid** — the four trips from the data module. **Desolation (`featured`) gets emphasis** (spans wider / leads the grid / accent treatment). Every card leads with the two requested specs:
   - **Route type** — `font-mono` uppercase label + a `lucide-react` icon, top of card.
   - **Name** + **tagline**.
   - A spec line (`<dl>`-style, mono labels): **Length**, **Region**, **Season**.
3. **Email-capture CTA** — reuse the home route's Substack capture block, copy adapted: "Be first when dates open" → `siteConfig.substack`.
4. No separate footer needed if the page renders within the shared layout; otherwise reuse the home footer pattern. (Confirm `__root.tsx` layout during implementation.)

### SEO

- Add the `/itineraries` `PageDef` to `site.ts` (title, description, `lastmod: '2026-06-09'`) → sitemap/llms.txt auto-follow.
- Route `head()` uses `pageHead(pageDef)` for meta, mirroring the home route.
- Inject an `ItemList` JSON-LD listing the four trips (name + description per item), following the existing `seo.ts` JSON-LD helper pattern. Keep it to schema that's truthful for an in-development product (ItemList of trips, not Offer/Product with prices).

### Tests (`tests/`, vitest + @testing-library/react + jsdom)

Match the existing `tests/seo*.test.ts` style:
- **Data-integrity test** (`itineraries.test.ts`): every `Itinerary` has all required fields non-empty; exactly one `featured`; ids are unique slugs.
- **Route render test** (`itineraries.route.test.tsx`): rendering the page component shows all four trip names, and each trip's **length** and **route-type label** appear (the two attributes the page exists to surface).

## Out of scope (v1)

- Per-trip detail pages / day-by-day arcs (provisional content; revisit when itineraries firm up post-shakedown).
- Prices, dates, booking/enquiry flow, or any "bookable" affordance.
- A homepage teaser section linking to the page (could add later; v1 link is the footer).
- Imagery/photography (no boat yet; keep it typographic like the home route). A later pass can add art.
- Map/route visuals (the mermaid approach-route map lives in the planning doc; not on the marketing page in v1).

## Open items / follow-ups

- Copy is first-draft; Bryan reviews all outbound public text (per the OSS-tone preference). Taglines above are for review.
- When itineraries firm up (post Year-5 shakedown), promote to detail pages and revisit framing toward bookable.
- Icon choices per route type are an implementation detail (lucide: e.g. Anchor / Sailboat / Route / Compass) — finalize in the plan.
