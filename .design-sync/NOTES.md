# design-sync notes — web

- **No library build.** This is a TanStack Start app, not a package. The bundle entry is the
  committed `.design-sync/ds-entry.ts` (wired via `cfg.entry`) re-exporting the three components.
  Without `cfg.entry` the converter dies looking for `node_modules/web/package.json`.
- **Tailwind v4 compiled subset.** `cfg.cssEntry` points at generated output of `cfg.buildCmd`
  (Tailwind v4 CLI over `src/styles.css` + font import prepended from `.design-sync/fonts.css`).
  The compiled CSS contains ONLY classes used in `src/` — a preview using any other Tailwind
  class silently gets nothing (bare `h-48` bit us; only `sm:h-48` exists. Used `h-44`).
  **Always re-run `cfg.buildCmd` before the converter on re-sync.**
- **Fonts are remote.** Fraunces/Geist/Geist Mono load via a Google Fonts `@import`
  (`.design-sync/fonts.css`, same URL the app uses in `src/routes/__root.tsx`). Keep in sync
  if the app's font link changes.
- **Render check browser:** no playwright chromium cache on this machine; system Chrome via
  `DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"` (playwright
  npm pkg is installed in `.ds-sync/` by the staging step).
- **Known render warns:** `[FONT_REMOTE] "Geist", "Geist Mono", "Fraunces"` — expected, by design.

## Re-sync risks

- Compiled CSS is a snapshot: new/changed classes in `src/` need `cfg.buildCmd` re-run or the
  bundle styles drift from the app.
- New components must be added to `.design-sync/ds-entry.ts` AND `cfg.componentSrcMap` by hand
  (no `.d.ts` exports to discover them from).
- RouteMap previews hardcode route ids from `src/lib/route-maps.ts` (`desolation-expedition`,
  `gulf-islands`, `coast-passage`, `broughtons-reach`) — renaming a route breaks that preview.
- Itineraries/SiteFooter preview content comes from `src/lib/itineraries.ts` / `site.ts` at
  bundle time — content edits ship on the next re-sync automatically, nothing to update.
- Conventions header (`.design-sync/conventions.md`) enumerates class names — re-validate them
  against the fresh compiled CSS on re-sync (names can rot if the site stops using a class).
