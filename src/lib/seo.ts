import { siteConfig, type PageDef } from './site'

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
  return {
    meta: [
      { title: page.title },
      { name: 'description', content: page.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: page.title },
      { property: 'og:description', content: page.description },
      { property: 'og:url', content: canonical },
      { property: 'og:site_name', content: siteConfig.name },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: page.title },
      { name: 'twitter:description', content: page.description },
    ],
    links: [{ rel: 'canonical', href: canonical }],
  }
}
