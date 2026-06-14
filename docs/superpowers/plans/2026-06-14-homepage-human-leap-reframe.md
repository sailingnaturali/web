# Homepage Human-Leap Reframe Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the homepage to lead with the human leap (a tech exec evolving into a new life at sea), demoting the AI tagline to a supporting line, and update SEO/meta to match.

**Architecture:** Pure copy change in two files — `web/src/lib/site.ts` (title/description, which flow into the home `PageDef` and the org/website JSON-LD) and `web/src/routes/index.tsx` (hero, "what this is", three bets order, email capture). No new components, no layout/behavior change; reuse the existing hero two-line headline + `<em className="italic text-sn-leaf">` pattern. Spec: `docs/superpowers/specs/2026-06-14-homepage-human-leap-reframe-design.md`.

**Tech Stack:** TanStack Start, React, Tailwind, Vite, pnpm; verify with `pnpm test` + `pnpm build`.

---

## File Structure
- Modify: `web/src/lib/site.ts` — `siteConfig.title`, `siteConfig.description`; `/` `PageDef.lastmod`.
- Modify: `web/src/routes/index.tsx` — `bets` array (reorder/renumber); hero headline, subhead, CTA label; "What this is" lead + body + new tagline line; email-capture heading + body.

All commands run from `~/src/sailingnaturali/web`.

---

## Task 1: SEO/meta (`site.ts`)

**Files:** Modify `web/src/lib/site.ts`

- [ ] **Step 1: Update title + description**

Replace:
```ts
  title: 'Sailing Naturali — an all-electric charter, built with AI',
  description:
    "A tech exec is using AI leverage to build a premium all-electric sailing charter in the Pacific Northwest — the kind of business AI can't deliver. Follow the build.",
```
with:
```ts
  title: "Sailing Naturali — a tech exec's leap to an all-electric charter",
  description:
    "A tech executive is upending their life to build a premium all-electric sailing charter in the Pacific Northwest — still at the desk, pointed at the sea, documenting the leap. AI clears the path; presence is the point.",
```
Leave `tagline` and the social URLs unchanged.

- [ ] **Step 2: Bump the home page lastmod**

In the `pages` array, the `/` entry: change `lastmod: '2026-06-01',` to `lastmod: '2026-06-14',`. (Its `title`/`description` reference `siteConfig.*`, so they update automatically; the itineraries entry is untouched.)

- [ ] **Step 3: Commit**

```bash
git add src/lib/site.ts
git commit -m "copy(web): reframe homepage SEO/meta to the human leap"
```

---

## Task 2: Homepage copy (`index.tsx`)

**Files:** Modify `web/src/routes/index.tsx`

- [ ] **Step 1: Reorder + renumber the `bets` array (lead with Presence)**

Replace the entire `const bets = [ ... ]` array with:
```tsx
const bets = [
  {
    n: '01',
    title: 'Presence is the product.',
    body: 'A bet that craft and hospitality are the economy that survives AGI.',
  },
  {
    n: '02',
    title: 'Built, not bought.',
    body: 'The plan, the P&L, the licensing exams, the debt-service stress tests. The receipts are the moat.',
  },
  {
    n: '03',
    title: 'Tech as means, not enemy.',
    body: 'AI does the operations; humans deliver the experience.',
  },
]
```

- [ ] **Step 2: Hero headline**

Replace:
```tsx
              Using AI to build the kind of business{' '}
              <em className="italic text-sn-leaf">AI can&apos;t deliver.</em>
```
with:
```tsx
              Building a life at sea.{' '}
              <em className="italic text-sn-leaf">Still in tech.</em>
```

- [ ] **Step 3: Hero subhead**

Replace:
```tsx
              An all-electric expedition catamaran. A Pacific Northwest charter, built
              in the open — with the receipts. AI runs the operations; humans deliver
              the experience.
```
with:
```tsx
              A tech executive is dismantling one life and assembling another aboard a
              49-foot all-electric catamaran — a Pacific Northwest charter, documented
              decision by decision. AI clears the path; presence, craft, and judgment
              are the point.
```

- [ ] **Step 4: Hero primary CTA label**

Replace the primary CTA label `Follow the build` with `Follow the leap` (the `<a href={siteConfig.substack}>` button text — change only the visible label, keep the trailing arrow `<span>` and href):
```tsx
                Follow the leap
                <span className="transition-transform group-hover:translate-x-1">→</span>
```

- [ ] **Step 5: "What this is" lead line**

Replace:
```tsx
          <p className="font-display text-2xl leading-snug text-sn-navy md:text-[2rem]">
            I&apos;m a tech executive building a premium eco-charter operation in the Gulf
            and San Juan Islands — aboard a 49-foot all-electric aluminium catamaran.
          </p>
```
with:
```tsx
          <p className="font-display text-2xl leading-snug text-sn-navy md:text-[2rem]">
            I&apos;m a tech executive evolving into a new life: a premium eco-charter in
            the Gulf and San Juan Islands, aboard a 49-foot all-electric aluminium
            catamaran.
          </p>
```

- [ ] **Step 6: "What this is" body + demoted tagline line**

Replace:
```tsx
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sn-navy/75">
            I&apos;m not leaving tech. I&apos;m using AI leverage to fund and run a business
            that needs presence, craft, and judgment: the things AI still can&apos;t do.
            This is the build, documented as it happens — the licensing, the financing,
            the boat, the systems, the math. Built, not bought.
          </p>
```
with:
```tsx
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sn-navy/75">
            Not an escape hatch — a deliberate, documented changeover. I&apos;m still at
            the desk, using the leverage this moment makes possible to fund the leap, and
            pointing everything at the day the dock lines come off for good. What&apos;s
            left is the work AI can&apos;t touch: presence, craft, judgment, a boat full
            of people having the trip of their lives.
          </p>
          <p className="mt-8 max-w-2xl text-base italic leading-relaxed text-sn-navy/55">
            &ldquo;Using AI to build the kind of business AI can&apos;t deliver.&rdquo;
          </p>
```

- [ ] **Step 7: Email-capture heading + body**

Replace:
```tsx
            <h2 className="text-3xl text-sn-paper md:text-4xl">Get the build notes.</h2>
            <p className="mt-4 text-lg leading-relaxed text-sn-sky">
              Roughly twice a month — the decisions, the numbers, what worked and what
              didn&apos;t.
            </p>
```
with:
```tsx
            <h2 className="text-3xl text-sn-paper md:text-4xl">Follow the leap.</h2>
            <p className="mt-4 text-lg leading-relaxed text-sn-sky">
              Roughly twice a month — the decisions, the doubts, the numbers, what worked
              and what didn&apos;t.
            </p>
```

- [ ] **Step 8: Run tests + build**

Run: `pnpm test`
Expected: pass. If a test asserts the OLD title/description (e.g. a sitemap/SEO snapshot in `src/**/*.test.*` referencing "built with AI" or "Follow the build"), update that assertion to the new strings — the copy is the new source of truth.

Run: `pnpm build`
Expected: builds clean (SEO assets regenerate from the new `site.ts`; Vite build succeeds with no TS/JSX errors).

- [ ] **Step 9: Commit**

```bash
git add src/routes/index.tsx
git commit -m "copy(web): reframe homepage to the human leap; AI tagline → supporting line"
```

---

## Self-Review

**Spec coverage:** Hero headline/subhead/CTA → T2 S2–S4; "What this is" lead+body+demoted tagline → T2 S5–S6; three bets reordered to lead Presence → T2 S1; email capture → T2 S7; SEO title/description + lastmod → T1. All spec sections mapped. ✓

**Placeholder scan:** No TBD/TODO; every step has the exact old→new strings; verification steps name the commands + expected outcome. ✓

**Consistency:** The demoted tagline string matches `siteConfig.tagline` verbatim ("Using AI to build the kind of business AI can't deliver."). Hero keeps the existing `<em className="italic text-sn-leaf">` pattern (now wrapping "Still in tech."). CTA href/arrow unchanged, only the label swaps. Bets `n` renumbered 01/02/03 in the new order. The build pulls the new title/description from `site.ts` into both the home `PageDef` and JSON-LD (no extra edit needed). ✓

**Note for executor:** copy-only change; if `pnpm test` surfaces a string assertion on the old meta, update it (Step 8) rather than reverting copy.
