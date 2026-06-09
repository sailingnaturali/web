import { Anchor, Plane, Sailboat, Compass, type LucideIcon } from 'lucide-react'
import { itineraries, type Itinerary } from '../lib/itineraries'
import { siteConfig } from '../lib/site'
import { RouteMap } from './RouteMap'
import { SiteFooter } from './SiteFooter'

const routeIcon: Record<string, LucideIcon> = {
  Backyard: Anchor,
  Destination: Plane,
  Passage: Sailboat,
  Reach: Compass,
}

function TripCard({ trip }: { trip: Itinerary }) {
  const Icon = routeIcon[trip.routeType.label] ?? Compass
  return (
    <article
      className={`group flex flex-col bg-sn-paper p-8 transition-colors hover:bg-sn-foam md:p-10 ${
        trip.featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="flex grow flex-col gap-8 sm:flex-row sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-sn-green">
            <Icon className="h-4 w-4" aria-hidden="true" />
            {trip.routeType.label}
          </div>
          <h3 className="mt-5 text-2xl text-sn-navy md:text-3xl">{trip.name}</h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-sn-navy/70">{trip.tagline}</p>
        </div>
        <RouteMap
          routeId={trip.id}
          label={`Route map — ${trip.region}`}
          className={`w-auto shrink-0 self-start rounded-lg border border-sn-cloud bg-sn-sky/15 ${
            trip.featured ? 'h-44 sm:h-48' : 'h-40'
          }`}
        />
      </div>
      <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 border-t border-sn-cloud pt-5 font-mono text-xs uppercase tracking-[0.12em]">
        <dt className="text-sn-green-mid">Length</dt>
        <dd className="text-sn-navy">{trip.lengthLabel}</dd>
        <dt className="text-sn-green-mid">Region</dt>
        <dd className="text-sn-navy">{trip.region}</dd>
        <dt className="text-sn-green-mid">Season</dt>
        <dd className="text-sn-navy">{trip.season}</dd>
      </dl>
    </article>
  )
}

export function Itineraries() {
  return (
    <main className="font-sans text-sn-navy">
      {/* Intro */}
      <section
        aria-label="Itineraries intro"
        className="mx-auto max-w-6xl px-6 pt-24 pb-12 md:px-10 md:pt-32"
      >
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-sn-green">
          Itineraries · In development
        </p>
        <h1 className="mt-5 max-w-3xl text-balance text-4xl text-sn-navy md:text-6xl">
          The trips we&apos;re planning.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sn-navy/75">
          Four routes through the Pacific Northwest — from a Gulf Islands backyard loop to a
          Desolation Sound expedition and the far-north Broughtons. These are in development for the
          first paid season, shaped and tested through a friends-and-family shakedown year. No dates
          or pricing yet — here&apos;s the shape of them.
        </p>
      </section>

      {/* Tiered card grid (featured trip spans both columns, first row) */}
      <section aria-label="Planned trips" className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        <div className="grid gap-px overflow-hidden rounded-xl border border-sn-cloud bg-sn-cloud md:grid-cols-2">
          {itineraries.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Join the list" className="px-6 pb-24 md:px-10">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-sn-navy px-8 py-16 md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40 blur-2xl"
            style={{ background: 'radial-gradient(circle, #006030, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="relative max-w-xl">
            <h2 className="text-3xl text-sn-paper md:text-4xl">Be first when dates open.</h2>
            <p className="mt-4 text-lg leading-relaxed text-sn-sky">
              We&apos;re building these in the open. Get the build notes and an early word when the
              first season&apos;s dates go live.
            </p>
            <a
              href={siteConfig.substack}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-sn-leaf px-6 py-3 text-sm font-medium text-sn-navy transition-colors hover:bg-sn-paper"
            >
              Join the list
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
