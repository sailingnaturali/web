export const siteConfig = {
  url: 'https://sailingnaturali.com',
  name: 'Sailing Naturali',
  title: "Sailing Naturali — a tech exec's leap to an all-electric charter",
  description:
    "A tech executive is upending their life to build a premium all-electric sailing charter in the Pacific Northwest — still at the desk, pointed at the sea, documenting the leap. AI clears the path; presence is the point.",
  tagline: "Using AI to build the kind of business AI can't deliver.",
  // Social share image (1200×630, summary_large_image), site-relative; resolved
  // to an absolute URL in seo.ts. Regenerate via scripts/make-og.py.
  ogImage: '/og-image.png',
  // Keep in sync (incl. order) with the canonical list: sailingnaturali/.github → socials.json
  // Importance order: youtube, substack, website — then instagram, tiktok.
  youtube: 'https://www.youtube.com/@sailingnaturali',
  substack: 'https://sailingnaturali.substack.com',
  instagram: 'https://www.instagram.com/sailingnaturali',
  tiktok: 'https://www.tiktok.com/@sailingnaturali',
} as const

export interface PageDef {
  path: string // route path, leading slash, no trailing slash (except '/')
  title: string
  description: string
  lastmod: string // ISO date; bump when content changes
}

// The page registry. Add a row here when a route ships; sitemap/llms.txt follow automatically.
export const pages: PageDef[] = [
  {
    path: '/',
    title: siteConfig.title,
    description: siteConfig.description,
    lastmod: '2026-06-14',
  },
  {
    path: '/itineraries',
    title: 'Itineraries — Sailing Naturali',
    description:
      "The charter trips we’re planning aboard an all-electric catamaran in the Pacific Northwest — a Gulf Islands loop, a Desolation Sound expedition, a Sunshine Coast passage, and the far-north Broughtons. In development.",
    lastmod: '2026-06-09',
  },
]
