import { describe, it, expect } from 'vitest'
import { buildSitemap, buildRobots, buildLlmsTxt } from '../src/lib/seo-assets'
import { siteConfig, pages } from '../src/lib/site'

describe('buildSitemap', () => {
  it('emits a urlset with one <loc> per page, absolute URLs', () => {
    const xml = buildSitemap(pages, siteConfig.url)
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xml).toContain('<urlset')
    expect(xml).toContain(`<loc>${siteConfig.url}/</loc>`)
    expect((xml.match(/<url>/g) || []).length).toBe(pages.length)
  })
})

describe('buildRobots', () => {
  it('allows all and points at the sitemap', () => {
    const txt = buildRobots(siteConfig.url)
    expect(txt).toContain('User-agent: *')
    expect(txt).toContain('Allow: /')
    expect(txt).toContain(`Sitemap: ${siteConfig.url}/sitemap.xml`)
  })
})

describe('buildLlmsTxt', () => {
  it('emits an H1 of the site name and a link line per page', () => {
    const txt = buildLlmsTxt(siteConfig, pages)
    expect(txt.startsWith(`# ${siteConfig.name}`)).toBe(true)
    expect(txt).toContain(siteConfig.description)
    for (const p of pages) {
      expect(txt).toContain(`${siteConfig.url}${p.path === '/' ? '' : p.path}`)
    }
  })
})
