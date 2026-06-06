import { createFileRoute } from '@tanstack/react-router'
import { pageHead, organizationJsonLd, websiteJsonLd } from '../lib/seo'
import { siteConfig, pages } from '../lib/site'

const home = pages.find((p) => p.path === '/')!

export const Route = createFileRoute('/')({
  head: () => {
    const base = pageHead(home)
    return {
      ...base,
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(organizationJsonLd()),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(websiteJsonLd()),
        },
      ],
    }
  },
  component: Home,
})

/* The NI mark, abstracted: a node-graph constellation around a ring.
   Echoes the badge's "Natural Intelligence" symbol — tech woven into the sky. */
function Constellation() {
  const nodes: Array<[number, number, number, boolean]> = [
    // x, y, r, filled
    [110, 95, 4, true],
    [150, 55, 5, true],
    [186, 86, 4, false],
    [196, 132, 5, true],
    [170, 170, 4, false],
    [126, 184, 5, true],
    [74, 170, 4, true],
    [44, 130, 5, false],
    [56, 78, 4, true],
    [88, 44, 4, false],
  ]
  const links: Array<[number, number]> = [
    [9, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [5, 6], [6, 7], [7, 8], [8, 9], [0, 1],
    [0, 5], [0, 3], [0, 7],
  ]
  return (
    <svg
      className="sn-net h-44 w-44 md:h-60 md:w-60"
      viewBox="0 0 240 230"
      fill="none"
      aria-hidden="true"
    >
      {/* central ring — the (NI) lockup */}
      <circle
        cx="120"
        cy="115"
        r="34"
        stroke="#006030"
        strokeWidth="2.5"
        style={{ animationDelay: '0.1s' }}
      />
      <text
        x="120"
        y="124"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="26"
        fontWeight={500}
        fill="#006030"
        style={{ animation: 'sn-pop 0.6s ease 0.5s forwards', opacity: 0 }}
      >
        NI
      </text>
      {links.map(([a, b], i) => {
        const [x1, y1] = nodes[a]
        const [x2, y2] = nodes[b]
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#58a058"
            strokeWidth="1.25"
            style={{ animationDelay: `${0.2 + i * 0.04}s` }}
          />
        )
      })}
      {nodes.map(([x, y, r, filled], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill={filled ? '#006030' : '#fcfcfc'}
          stroke="#006030"
          strokeWidth="1.5"
          style={{ animationDelay: `${0.6 + i * 0.05}s` }}
        />
      ))}
    </svg>
  )
}

const bets = [
  {
    n: '01',
    title: 'Built, not bought.',
    body: 'The plan, the P&L, the licensing exams, the debt-service stress tests. The receipts are the moat.',
  },
  {
    n: '02',
    title: 'Tech as means, not enemy.',
    body: 'AI does the operations; humans deliver the experience.',
  },
  {
    n: '03',
    title: 'Presence is the product.',
    body: 'A bet that craft and hospitality are the economy that survives AGI.',
  },
]

function Home() {
  return (
    <main className="font-sans text-sn-navy">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        aria-label="Hero"
        className="sn-hero sn-grain relative isolate flex min-h-[92vh] flex-col overflow-hidden"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-10 pb-20 md:px-10 md:pt-14">
          {/* mark, upper-right in the light sky band */}
          <div className="flex justify-end">
            <Constellation />
          </div>

          {/* headline, anchored low in the dark water */}
          <div className="mt-auto max-w-3xl">
            <p
              className="sn-rise font-mono text-[0.7rem] uppercase tracking-[0.28em] text-sn-leaf"
              style={{ animationDelay: '0.1s' }}
            >
              Sailing Naturali · All-Electric · Pacific Northwest
            </p>
            <h1
              className="sn-rise mt-5 text-balance text-4xl text-sn-paper sm:text-5xl md:text-7xl"
              style={{ animationDelay: '0.22s' }}
            >
              Using AI to build the kind of business{' '}
              <em className="italic text-sn-leaf">AI can&apos;t deliver.</em>
            </h1>
            <p
              className="sn-rise mt-6 max-w-xl text-lg leading-relaxed text-sn-sky"
              style={{ animationDelay: '0.34s' }}
            >
              An all-electric expedition catamaran. A Pacific Northwest charter, built
              in the open — with the receipts. AI runs the operations; humans deliver
              the experience.
            </p>
            <div
              className="sn-rise mt-9 flex flex-wrap items-center gap-x-7 gap-y-3"
              style={{ animationDelay: '0.46s' }}
            >
              <a
                href={siteConfig.substack}
                className="group inline-flex items-center gap-2 rounded-full bg-sn-green px-6 py-3 text-sm font-medium text-sn-paper transition-colors hover:bg-sn-green-mid"
              >
                Follow the build
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href={siteConfig.youtube}
                className="font-mono text-xs uppercase tracking-[0.18em] text-sn-sky/80 underline-offset-4 hover:text-sn-paper hover:underline"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── What this is ─────────────────────────────────────── */}
      <section
        aria-label="What this is"
        className="mx-auto grid max-w-6xl gap-x-12 gap-y-8 px-6 py-24 md:grid-cols-12 md:px-10 md:py-32"
      >
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-sn-green">
            What this is
          </p>
          <hr className="sn-rule mt-5" />
        </div>
        <div className="md:col-span-8">
          <p className="font-display text-2xl leading-snug text-sn-navy md:text-[2rem]">
            I&apos;m a tech executive building a premium eco-charter operation in the Gulf
            and San Juan Islands — aboard a 49-foot all-electric aluminium catamaran.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sn-navy/75">
            I&apos;m not leaving tech. I&apos;m using AI leverage to fund and run a business
            that needs presence, craft, and judgment: the things AI still can&apos;t do.
            This is the build, documented as it happens — the licensing, the financing,
            the boat, the systems, the math. Built, not bought.
          </p>
        </div>
      </section>

      {/* ── Three bets ───────────────────────────────────────── */}
      <section
        aria-label="Three bets"
        className="border-t border-sn-cloud bg-sn-foam/40"
      >
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-sn-green">
            Three bets
          </p>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-sn-cloud bg-sn-cloud md:grid-cols-3">
            {bets.map((b) => (
              <article
                key={b.n}
                className="group flex flex-col bg-sn-paper p-8 transition-colors hover:bg-sn-foam md:p-10"
              >
                <span className="font-mono text-sm font-medium text-sn-green-mid transition-colors group-hover:text-sn-green">
                  {b.n}
                </span>
                <h3 className="mt-6 text-2xl text-sn-navy">{b.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-sn-navy/70">
                  {b.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Email capture ────────────────────────────────────── */}
      <section aria-label="Email capture" className="px-6 pb-24 pt-4 md:px-10">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-sn-navy px-8 py-16 md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40 blur-2xl"
            style={{ background: 'radial-gradient(circle, #006030, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="relative max-w-xl">
            <h2 className="text-3xl text-sn-paper md:text-4xl">Get the build notes.</h2>
            <p className="mt-4 text-lg leading-relaxed text-sn-sky">
              Roughly twice a month — the decisions, the numbers, what worked and what
              didn&apos;t.
            </p>
            <a
              href={siteConfig.substack}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-sn-leaf px-6 py-3 text-sm font-medium text-sn-navy transition-colors hover:bg-sn-paper"
            >
              Subscribe
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-sn-navy-deep">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-sn-sky/70"
          >
            <a href={siteConfig.youtube} className="hover:text-sn-leaf">
              YouTube
            </a>
            <a href={siteConfig.substack} className="hover:text-sn-leaf">
              Substack
            </a>
            <a href={siteConfig.instagram} className="hover:text-sn-leaf">
              Instagram
            </a>
            <a href={siteConfig.tiktok} className="hover:text-sn-leaf">
              TikTok
            </a>
            <span className="text-sn-sky/40">Charters (Year 5)</span>
          </nav>
          <p className="font-mono text-xs tracking-[0.1em] text-sn-sky/40">
            © Sailing Naturali — built in the Pacific Northwest.
          </p>
        </div>
      </footer>
    </main>
  )
}
