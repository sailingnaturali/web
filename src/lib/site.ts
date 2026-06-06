export const siteConfig = {
  url: 'https://sailingnaturali.com',
  name: 'Sailing Naturali',
  title: 'Sailing Naturali — an all-electric charter, built with AI',
  description:
    "A tech exec is using AI leverage to build a premium all-electric sailing charter in the Pacific Northwest — the kind of business AI can't deliver. Follow the build.",
  tagline: "Using AI to build the kind of business AI can't deliver.",
  // Keep in sync with the canonical list: sailingnaturali/.github → socials.json
  substack: 'https://sailingnaturali.substack.com',
  youtube: 'https://www.youtube.com/@sailingnaturali',
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
    lastmod: '2026-06-01',
  },
]
