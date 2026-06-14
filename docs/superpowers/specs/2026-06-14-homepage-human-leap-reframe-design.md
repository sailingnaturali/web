# Homepage Human-Leap Reframe — Design

**Status:** Approved 2026-06-14
**Scope:** `web/` homepage copy + SEO/meta only. Itineraries page and the planning
brand-pillar docs (content-strategy.md, CLAUDE.md) are out of scope (follow-on).
**Plan:** `docs/superpowers/plans/2026-06-14-homepage-human-leap-reframe.md` (to be written)

## Context

The homepage currently leads with the AI-build thesis: the hero headline *is* the
tagline ("Using AI to build the kind of business AI can't deliver"), the "What
this is" section opens on AI leverage, and the CTA is "Get the build notes." The
felt message is *look how AI lets me build this* — receipts and ops first.

Reframe decision (2026-06-14): the lead story is the **human leap — a tech
executive evolving into a new life at sea — with AI as the means, not the
headline.** Framing chosen: **"the leap, in motion"** (still in tech, pointed at
the exit; the one-foot-in-each-world tension is the drama). The AI tagline is
**demoted to a supporting line**, not retired. Hero voice: **the tension**.

Files: `web/src/routes/index.tsx` (homepage copy) and `web/src/lib/site.ts`
(title/description, which flow into the home `PageDef` and the org/website
JSON-LD via `seo.ts`).

## Final copy (verbatim — implement exactly)

### Hero
- **Eyebrow:** `Sailing Naturali · All-Electric · Pacific Northwest` (unchanged)
- **Headline:** two lines — line 1 plain (`text-sn-paper`): **Building a life at sea.**
  line 2 in the existing leaf-italic emphasis (`em` / `text-sn-leaf italic`):
  **Still in tech.**
- **Subhead:** "A tech executive is dismantling one life and assembling another
  aboard a 49-foot all-electric catamaran — a Pacific Northwest charter,
  documented decision by decision. AI clears the path; presence, craft, and
  judgment are the point."
- **CTAs:** primary `Follow the leap →` → `siteConfig.substack` (was "Follow the
  build"); secondary `Watch on YouTube` → `siteConfig.youtube` (unchanged).

### "What this is"
- **Lead (display, large):** "I'm a tech executive evolving into a new life: a
  premium eco-charter in the Gulf and San Juan Islands, aboard a 49-foot
  all-electric aluminium catamaran."
- **Body:** "Not an escape hatch — a deliberate, documented changeover. I'm still
  at the desk, using the leverage this moment makes possible to fund the leap, and
  pointing everything at the day the dock lines come off for good. What's left is
  the work AI can't touch: presence, craft, judgment, a boat full of people having
  the trip of their lives."
- **Closing supporting line (the demoted tagline):** *"Using AI to build the kind
  of business AI can't deliver."* — rendered as a quiet supporting line (e.g.
  italic / muted, smaller than the body), visually a kicker that closes the
  section. This replaces the old "Built, not bought." closing.

### Three bets — reordered to lead human
Same three pillars, **bodies unchanged**, reordered and renumbered so the human
pillar leads:
1. **01 — Presence is the product.** "A bet that craft and hospitality are the
   economy that survives AGI."
2. **02 — Built, not bought.** "The plan, the P&L, the licensing exams, the
   debt-service stress tests. The receipts are the moat."
3. **03 — Tech as means, not enemy.** "AI does the operations; humans deliver the
   experience."

### Email capture
- **Heading:** "Follow the leap." (was "Get the build notes.")
- **Body:** "Roughly twice a month — the decisions, the doubts, the numbers, what
  worked and what didn't."
- CTA + link unchanged (Subscribe → Substack).

### SEO / meta (`web/src/lib/site.ts`)
- **`title`:** "Sailing Naturali — a tech exec's leap to an all-electric charter"
  (keeps the searchable "all-electric charter"; leads human).
- **`description`:** "A tech executive is upending their life to build a premium
  all-electric sailing charter in the Pacific Northwest — still at the desk,
  pointed at the sea, documenting the leap. AI clears the path; presence is the
  point."
- **`tagline`:** unchanged (still the canonical brand line; now used as the
  supporting line on the page).
- The home `PageDef` references `siteConfig.title`/`description`, and the org/
  website JSON-LD pull `siteConfig.description`, so both update automatically.
  Bump the `/` `PageDef` `lastmod` to `2026-06-14`.

## Out of scope
- Itineraries page copy/meta.
- The canonical brand pillars in `planning/` (content-strategy.md, CLAUDE.md) —
  the three pillars themselves are unchanged here (only their on-page order); a
  deeper planning-doc reframe is a separate follow-on if wanted.
- Visual/layout changes — copy only; reuse existing components, classes, and the
  hero's two-line headline + `em` emphasis pattern.

## Testing
Build + typecheck must pass (`pnpm build` / the repo's check command). Visual
sanity: hero renders two lines with the leaf-italic on "Still in tech.", the
tagline reads as a quiet supporting line (not a heading), bets render Presence
first, and the page's `<title>`/meta description reflect the new strings. No new
components; no behavior change beyond copy + the two CTA label/string swaps.
