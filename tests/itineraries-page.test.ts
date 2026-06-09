import { describe, it, expect } from 'vitest'
import { pages } from '../src/lib/site'

describe('itineraries page registration', () => {
  it('is registered so sitemap/llms.txt include it', () => {
    const page = pages.find((p) => p.path === '/itineraries')
    expect(page).toBeDefined()
    expect(page!.title).toMatch(/itinerar/i)
    expect(page!.description).toBeTruthy()
    expect(page!.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
