import { describe, it, expect } from 'vitest'
import { itineraries } from '../src/lib/itineraries'

describe('itineraries data', () => {
  it('has four trips, each with all required fields non-empty', () => {
    expect(itineraries).toHaveLength(4)
    for (const t of itineraries) {
      expect(t.id).toBeTruthy()
      expect(t.name).toBeTruthy()
      expect(t.tagline).toBeTruthy()
      expect(t.lengthLabel).toBeTruthy()
      expect(t.routeType.label).toBeTruthy()
      expect(t.routeType.descriptor).toBeTruthy()
      expect(t.region).toBeTruthy()
      expect(t.season).toBeTruthy()
    }
  })

  it('has unique ids', () => {
    const ids = itineraries.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('marks exactly one trip as featured', () => {
    expect(itineraries.filter((t) => t.featured)).toHaveLength(1)
  })
})
