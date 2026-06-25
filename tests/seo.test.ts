import { describe, it, expect } from 'vitest'
import { pageHead, organizationJsonLd, websiteJsonLd } from '../src/lib/seo'
import { pages, siteConfig } from '../src/lib/site'

const home = pages[0]

describe('pageHead', () => {
  it('sets title, description, canonical, and OG/Twitter tags', () => {
    const head = pageHead(home)
    const title = head.meta.find((m: any) => m.title)?.title
    expect(title).toBe(home.title)
    const desc = head.meta.find((m: any) => m.name === 'description')?.content
    expect(desc).toBe(home.description)
    const canonical = head.links.find((l: any) => l.rel === 'canonical')?.href
    expect(canonical).toBe(`${siteConfig.url}/`)
    expect(head.meta.find((m: any) => m.property === 'og:title')?.content).toBe(home.title)
    expect(head.meta.find((m: any) => m.name === 'twitter:card')?.content).toBe(
      'summary_large_image',
    )
  })

  it('sets absolute og:image and twitter:image so link previews render', () => {
    const head = pageHead(home)
    const expected = `${siteConfig.url}${siteConfig.ogImage}`
    const ogImage = head.meta.find((m: any) => m.property === 'og:image')?.content
    const twImage = head.meta.find((m: any) => m.name === 'twitter:image')?.content
    expect(ogImage).toBe(expected)
    expect(twImage).toBe(expected)
    // OG/Twitter require fully-qualified URLs
    expect(ogImage?.startsWith('https://')).toBe(true)
    expect(twImage?.startsWith('https://')).toBe(true)
  })
})

describe('json-ld', () => {
  it('organization has @type Organization and the site name', () => {
    const ld = organizationJsonLd()
    expect(ld['@type']).toBe('Organization')
    expect(ld.name).toBe(siteConfig.name)
    expect(ld.url).toBe(siteConfig.url)
  })
  it('website has @type WebSite', () => {
    expect(websiteJsonLd()['@type']).toBe('WebSite')
  })
})
