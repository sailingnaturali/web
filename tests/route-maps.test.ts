import { describe, it, expect } from 'vitest'
import { itineraries } from '../src/lib/itineraries'
import {
  MAP_BOUNDS,
  MAP_HEIGHT,
  MAP_WIDTH,
  landforms,
  project,
  routeGeometries,
} from '../src/lib/route-maps'

describe('route map geometry', () => {
  it('has a route for every itinerary', () => {
    for (const t of itineraries) {
      const geo = routeGeometries[t.id]
      expect(geo, `missing route geometry for ${t.id}`).toBeDefined()
      expect(geo.waypoints.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('keeps every route waypoint inside the shared frame', () => {
    for (const [id, geo] of Object.entries(routeGeometries)) {
      for (const [lat, lon] of geo.waypoints) {
        expect(lat, `${id} lat`).toBeGreaterThan(MAP_BOUNDS.south)
        expect(lat, `${id} lat`).toBeLessThan(MAP_BOUNDS.north)
        expect(lon, `${id} lon`).toBeGreaterThan(MAP_BOUNDS.west)
        expect(lon, `${id} lon`).toBeLessThan(MAP_BOUNDS.east)
      }
    }
  })

  it('projects the frame corners onto the viewBox', () => {
    expect(project([MAP_BOUNDS.north, MAP_BOUNDS.west])).toEqual([0, 0])
    const [x, y] = project([MAP_BOUNDS.south, MAP_BOUNDS.east])
    expect(x).toBeCloseTo(MAP_WIDTH, 5)
    expect(y).toBeCloseTo(MAP_HEIGHT, 5)
  })

  it('has land to draw', () => {
    expect(landforms.length).toBeGreaterThan(2)
    for (const shape of landforms) {
      expect(shape.length).toBeGreaterThanOrEqual(4)
    }
  })
})
