export interface RouteType {
  label: string // "Backyard" | "Destination" | "Passage" | "Reach"
  descriptor: string // one-line gloss of the transit character
}

export interface Itinerary {
  id: string // stable slug (future detail-page path)
  name: string
  tagline: string // 2–3 sentence pitch, high-level, no unverified specifics
  lengthLabel: string // "8 days" | "8–10 days" | "10–14 days"
  routeType: RouteType
  region: string
  season: string
  featured: boolean
}

// Desolation first so the featured trip leads the grid.
export const itineraries: Itinerary[] = [
  {
    id: 'desolation-expedition',
    name: 'Desolation Expedition',
    tagline:
      "The headline trip. Fly in to the grounds by floatplane, then the warm-water anchorages, waterfalls, and granite of Desolation Sound — the Pacific Northwest's marquee cruising ground.",
    lengthLabel: '8 days',
    routeType: { label: 'Destination', descriptor: 'Fly in to the grounds, cruise the Sound' },
    region: 'Desolation Sound',
    season: 'Mid-summer',
    featured: true,
  },
  {
    id: 'gulf-islands',
    name: 'Gulf Islands',
    tagline:
      'The home-grounds loop. Quiet anchorages, island hikes, local food and wine, and short hops between them — no long passages, no border crossings.',
    lengthLabel: '8 days',
    routeType: { label: 'Backyard', descriptor: 'All in-grounds, minimal transit' },
    region: 'Southern Gulf Islands',
    season: 'Spring & fall',
    featured: false,
  },
  {
    id: 'coast-passage',
    name: 'Up the Coast',
    tagline:
      'The repositioning legs, made the trip. Sail the Sunshine Coast between the Gulf Islands and the northern grounds — more time under sail, small-town stops, fewer crowds.',
    lengthLabel: '8–10 days',
    routeType: { label: 'Passage', descriptor: 'Journey-as-experience, town-hop migration' },
    region: 'Sunshine Coast',
    season: 'Early & late season',
    featured: false,
  },
  {
    id: 'broughtons-reach',
    name: 'Far North — Broughtons',
    tagline:
      'The long-format expedition. Through the tidal rapids and Johnstone Strait into the Broughton Archipelago — remote anchorages, abundant wildlife, the wildest water on the route.',
    lengthLabel: '10–14 days',
    routeType: { label: 'Reach', descriptor: 'Far-north expedition through the rapids' },
    region: 'Broughton Archipelago',
    season: 'Peak summer',
    featured: false,
  },
]
