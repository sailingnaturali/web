// Schematic Salish Sea geography for the itinerary route maps.
// Authored as real lat/lon points and run through a tiny equirectangular
// projection. Every card shares this frame (Victoria to the Broughtons)
// so the four routes place themselves relative to each other at a glance.
// Recognizable, not navigational.

export type LatLon = [lat: number, lon: number]

export const MAP_BOUNDS = {
  north: 51.0,
  south: 48.3,
  west: -127.3,
  east: -122.6,
}

const SCALE = 40 // svg units per degree of latitude
const LON_SCALE =
  SCALE * Math.cos((((MAP_BOUNDS.north + MAP_BOUNDS.south) / 2) * Math.PI) / 180)

export const MAP_WIDTH = (MAP_BOUNDS.east - MAP_BOUNDS.west) * LON_SCALE
export const MAP_HEIGHT = (MAP_BOUNDS.north - MAP_BOUNDS.south) * SCALE

export function project([lat, lon]: LatLon): [x: number, y: number] {
  return [(lon - MAP_BOUNDS.west) * LON_SCALE, (MAP_BOUNDS.north - lat) * SCALE]
}

// Land outlines, simplified by hand from chart geography. West-coast and
// border points deliberately run past the frame — the viewBox clips them.
export const landforms: LatLon[][] = [
  // Vancouver Island — east coast south→north, then offshore back down
  [
    [48.4, -123.35],
    [48.46, -123.3],
    [48.65, -123.4],
    [48.69, -123.49],
    [48.75, -123.56],
    [48.87, -123.64],
    [49.0, -123.81],
    [49.17, -123.94],
    [49.26, -124.13],
    [49.35, -124.44],
    [49.47, -124.75],
    [49.62, -124.87],
    [49.71, -124.9],
    [49.85, -125.1],
    [50.03, -125.24],
    [50.12, -125.38],
    [50.33, -125.45],
    [50.39, -125.96],
    [50.49, -126.55],
    [50.59, -127.08],
    [50.72, -127.49],
    [50.85, -128.05],
    [50.78, -128.42],
    [50.1, -127.8],
    [49.55, -126.6],
    [49.1, -125.9],
    [48.83, -125.15],
    [48.55, -124.42],
    [48.37, -123.72],
  ],
  // Mainland — Washington corner up the Sunshine Coast to the Broughtons,
  // with the Desolation Sound notch behind the Malaspina Peninsula
  [
    [48.3, -122.2],
    [48.75, -122.5],
    [48.99, -123.09],
    [49.1, -123.19],
    [49.27, -123.26],
    [49.37, -123.27],
    [49.4, -123.51],
    [49.47, -123.76],
    [49.54, -123.95],
    [49.63, -124.03],
    [49.74, -124.18],
    [49.84, -124.53],
    [49.98, -124.76],
    [50.06, -124.85],
    [50.02, -124.66],
    [50.12, -124.52],
    [50.2, -124.78],
    [50.42, -125.12],
    [50.47, -125.8],
    [50.56, -126.2],
    [50.72, -126.5],
    [50.88, -126.9],
    [51.05, -127.1],
    [51.1, -122.2],
  ],
  // Salt Spring
  [
    [48.92, -123.54],
    [48.84, -123.42],
    [48.72, -123.48],
    [48.77, -123.59],
  ],
  // Galiano–Valdes–Gabriola sliver
  [
    [48.87, -123.29],
    [49.16, -123.8],
    [49.15, -123.84],
    [48.86, -123.33],
  ],
  // Texada
  [
    [49.81, -124.58],
    [49.49, -124.1],
    [49.45, -124.16],
    [49.74, -124.64],
  ],
  // Quadra
  [
    [50.27, -125.22],
    [50.1, -125.13],
    [50.03, -125.2],
    [50.14, -125.31],
    [50.25, -125.32],
  ],
  // Cortes
  [
    [50.14, -124.98],
    [50.05, -124.9],
    [49.99, -124.97],
    [50.06, -125.07],
  ],
]

export interface RouteGeometry {
  waypoints: LatLon[]
  loop: boolean // closed circuit (loop) vs one-way passage
}

// Keyed by itinerary id. Waypoints are real harbours and channels,
// thinned to what reads at thumbnail size.
export const routeGeometries: Record<string, RouteGeometry> = {
  // Comox across to Cortes, the Sound, back down Sutil Channel
  'desolation-expedition': {
    loop: true,
    waypoints: [
      [49.67, -124.84], // Comox
      [49.9, -124.95], // up the Strait of Georgia
      [50.07, -124.89], // Squirrel Cove, Cortes
      [50.14, -124.69], // Prideaux Haven
      [50.18, -124.87], // Teakerne Arm
      [50.18, -125.05], // over the top of Cortes
      [49.98, -125.1], // Sutil Channel
    ],
  },
  // Sidney → Satellite Channel → Sansum Narrows → Telegraph → Montague → home
  'gulf-islands': {
    loop: true,
    waypoints: [
      [48.66, -123.36], // Sidney
      [48.74, -123.44], // Satellite Channel
      [48.74, -123.56],
      [48.84, -123.6], // Sansum Narrows
      [48.98, -123.66], // Telegraph Harbour
      [48.9, -123.41], // Montague Harbour
    ],
  },
  // Sidney up the Strait and Malaspina Strait to the edge of Desolation
  'coast-passage': {
    loop: false,
    waypoints: [
      [48.66, -123.36], // Sidney
      [48.95, -123.28], // Strait of Georgia
      [49.13, -123.72], // off Gabriola
      [49.19, -123.9], // Nanaimo
      [49.62, -124.07], // Pender Harbour
      [49.83, -124.58], // Powell River
      [49.97, -124.82], // Lund
      [50.04, -124.88], // Desolation Sound entrance
    ],
  },
  // Campbell River through Seymour Narrows and Johnstone Strait to the Broughtons
  'broughtons-reach': {
    loop: false,
    waypoints: [
      [50.04, -125.25], // Campbell River
      [50.14, -125.36], // Seymour Narrows
      [50.37, -125.55], // Johnstone Strait
      [50.45, -126.1],
      [50.55, -126.45],
      [50.68, -126.7], // Broughton Archipelago
    ],
  },
}
