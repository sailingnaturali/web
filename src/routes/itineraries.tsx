import { createFileRoute } from '@tanstack/react-router'
import { pageHead, itineraryListJsonLd } from '../lib/seo'
import { pages } from '../lib/site'
import { Itineraries } from '../components/Itineraries'

const page = pages.find((p) => p.path === '/itineraries')!

export const Route = createFileRoute('/itineraries')({
  head: () => {
    const base = pageHead(page)
    return {
      ...base,
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(itineraryListJsonLd()),
        },
      ],
    }
  },
  component: Itineraries,
})
