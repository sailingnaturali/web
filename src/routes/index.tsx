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

function Home() {
  return (
    <main>
      <section aria-label="Hero">
        <p>SAILING NATURALI</p>
        <h1>Using AI to build the kind of business AI can't deliver.</h1>
        <p>
          An all-electric expedition catamaran. A Pacific Northwest charter, built in the
          open — with the receipts. AI runs the operations; humans deliver the experience.
        </p>
        <a href={siteConfig.substack}>Follow the build →</a>
      </section>

      <section aria-label="What this is">
        <h2>What this is</h2>
        <p>
          I'm a tech executive building a premium eco-charter operation in the Gulf and San
          Juan Islands — aboard a 49-foot all-electric aluminium catamaran. I'm not leaving
          tech. I'm using AI leverage to fund and run a business that needs presence, craft,
          and judgment: the things AI still can't do.
        </p>
        <p>
          This is the build, documented as it happens — the licensing, the financing, the
          boat, the systems, the math. Built, not bought.
        </p>
      </section>

      <section aria-label="Three bets">
        <article>
          <h3>Built, not bought.</h3>
          <p>
            The plan, the P&amp;L, the licensing exams, the debt-service stress tests. The
            receipts are the moat.
          </p>
        </article>
        <article>
          <h3>Tech as means, not enemy.</h3>
          <p>AI does the operations; humans deliver the experience.</p>
        </article>
        <article>
          <h3>Presence is the product.</h3>
          <p>A bet that craft and hospitality are the economy that survives AGI.</p>
        </article>
      </section>

      <section aria-label="Email capture">
        <h2>Get the build notes.</h2>
        <p>Roughly twice a month — the decisions, the numbers, what worked and what didn't.</p>
        <a href={siteConfig.substack}>Subscribe</a>
      </section>

      <footer>
        <nav aria-label="Footer">
          <a href={siteConfig.youtube}>YouTube</a>
          {' · '}
          <a href={siteConfig.substack}>Substack</a>
          {' · '}
          <span>Charters (Year 5)</span>
        </nav>
        <p>© Sailing Naturali — built in the Pacific Northwest.</p>
      </footer>
    </main>
  )
}
