import { describe, it, expect } from 'vitest'
import { itineraryListJsonLd } from '../src/lib/seo'
import { itineraries } from '../src/lib/itineraries'

describe('itineraryListJsonLd', () => {
  it('is an ItemList of all trips with name + description', () => {
    const ld = itineraryListJsonLd()
    expect(ld['@type']).toBe('ItemList')
    expect(ld.itemListElement).toHaveLength(itineraries.length)
    const first = ld.itemListElement[0]
    expect(first['@type']).toBe('ListItem')
    expect(first.position).toBe(1)
    expect(first.item.name).toBe(itineraries[0].name)
    expect(first.item.description).toBe(itineraries[0].tagline)
    ld.itemListElement.forEach((el, i) => expect(el.position).toBe(i + 1))
  })
})
