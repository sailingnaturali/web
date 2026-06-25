import { siteConfig, type PageDef } from './site'
import { itineraries } from './itineraries'

const canonicalFor = (path: string) =>
  path === '/' ? `${siteConfig.url}/` : `${siteConfig.url}${path}`

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [siteConfig.youtube, siteConfig.substack, siteConfig.instagram, siteConfig.tiktok],
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
  }
}

export function pageHead(page: PageDef) {
  const canonical = canonicalFor(page.path)
  const image = `${siteConfig.url}${siteConfig.ogImage}` // OG/Twitter need absolute URLs
  return {
    meta: [
      { title: page.title },
      { name: 'description', content: page.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: page.title },
      { property: 'og:description', content: page.description },
      { property: 'og:url', content: canonical },
      { property: 'og:site_name', content: siteConfig.name },
      { property: 'og:image', content: image },
      { property: 'og:image:alt', content: siteConfig.name },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: page.title },
      { name: 'twitter:description', content: page.description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: siteConfig.name },
    ],
    links: [{ rel: 'canonical', href: canonical }],
  }
}

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
