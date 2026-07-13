import { RouteMap } from 'web'

// The four planned routes, styled the way TripCard frames them in the app.
const frame = 'h-40 w-auto rounded-lg border border-sn-cloud bg-sn-sky/15'

export const DesolationExpedition = () => (
  <RouteMap routeId="desolation-expedition" label="Route map — Desolation Sound" className={frame} />
)

export const GulfIslandsLoop = () => (
  <RouteMap routeId="gulf-islands" label="Route map — Southern Gulf Islands" className={frame} />
)

export const CoastPassage = () => (
  <RouteMap routeId="coast-passage" label="Route map — Sunshine Coast" className={frame} />
)

export const BroughtonsReach = () => (
  <RouteMap
    routeId="broughtons-reach"
    label="Route map — Broughton Archipelago"
    className="h-44 w-auto rounded-lg border border-sn-cloud bg-sn-sky/15"
  />
)
