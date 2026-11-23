// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { slackwaterUrl } from '../src/lib/site'
import { SiteFooter } from '../src/components/SiteFooter'
import { Itineraries } from '../src/components/Itineraries'

afterEach(cleanup)

function utm(href: string) {
  const u = new URL(href)
  return {
    origin: u.origin,
    path: u.pathname,
    source: u.searchParams.get('utm_source'),
    medium: u.searchParams.get('utm_medium'),
    campaign: u.searchParams.get('utm_campaign'),
    content: u.searchParams.get('utm_content'),
  }
}

describe('slackwaterUrl', () => {
  it('tags the link with where on sailingnaturali.com it came from', () => {
    expect(utm(slackwaterUrl('/tides/ca/bc/victoria/', 'footer'))).toEqual({
      origin: 'https://slackwater.xyz',
      path: '/tides/ca/bc/victoria/',
      source: 'sailingnaturali.com',
      medium: 'referral',
      campaign: 'sailingnaturali-site',
      content: 'footer',
    })
  })
})

describe('Slackwater links', () => {
  it('footer links the app and Victoria tides', () => {
    render(<SiteFooter />)
    const app = utm(screen.getByRole('link', { name: /slackwater/i }).getAttribute('href')!)
    expect(app.path).toBe('/')
    expect(app.content).toBe('footer')
    const tides = utm(screen.getByRole('link', { name: /victoria tides/i }).getAttribute('href')!)
    expect(tides.path).toBe('/tides/ca/bc/victoria/')
    expect(tides.content).toBe('footer')
  })

  it('itineraries page links the Victoria-area stations and the app', () => {
    render(<Itineraries />)
    const section = screen.getByRole('region', { name: /tides and currents/i })
    const paths = Array.from(section.querySelectorAll('a')).map((a) => utm(a.href))
    expect(paths.map((p) => p.path)).toEqual(
      expect.arrayContaining([
        '/',
        '/tides/ca/bc/victoria/',
        '/tides/ca/bc/oak-bay/',
        '/currents/ca/bc/trial-island/',
      ]),
    )
    for (const p of paths) expect(p.content).toBe('itineraries')
  })
})
