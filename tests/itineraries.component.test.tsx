// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { Itineraries } from '../src/components/Itineraries'
import { itineraries } from '../src/lib/itineraries'

afterEach(cleanup)

describe('Itineraries page', () => {
  it('renders every trip name', () => {
    render(<Itineraries />)
    for (const t of itineraries) {
      expect(screen.getByText(t.name)).toBeTruthy()
    }
  })

  it('surfaces each trip\'s length and route type', () => {
    render(<Itineraries />)
    for (const t of itineraries) {
      expect(screen.getAllByText(t.lengthLabel).length).toBeGreaterThan(0)
      expect(screen.getAllByText(t.routeType.label).length).toBeGreaterThan(0)
    }
  })

  it('draws a route map on every card', () => {
    render(<Itineraries />)
    for (const t of itineraries) {
      expect(screen.getByRole('img', { name: `Route map — ${t.region}` })).toBeTruthy()
    }
  })
})
