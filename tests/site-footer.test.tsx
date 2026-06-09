// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { SiteFooter } from '../src/components/SiteFooter'

afterEach(cleanup)

describe('SiteFooter', () => {
  it('links to the itineraries page', () => {
    render(<SiteFooter />)
    const link = screen.getByRole('link', { name: /itineraries/i })
    expect(link.getAttribute('href')).toBe('/itineraries')
  })
})
