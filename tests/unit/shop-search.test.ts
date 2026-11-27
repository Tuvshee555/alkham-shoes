import { describe, expect, it } from 'vitest'
import { matchesQuery, type CatalogProduct } from '@/lib/catalog-filter'

// This shop's own search words: English and Russian loanwords, and Mongolian typed in Latin letters.
function product(name: string, categoryName: string): CatalogProduct {
  return {
    id: name,
    slug: name,
    name,
    categorySlug: 'c',
    categoryName,
    audience: 'unisex',
    shortDescription: '',
    material: '',
    fit: null,
    basePrice: 100_000,
    minPrice: 100_000,
    maxPrice: 100_000,
    isFeatured: false,
    isNewArrival: false,
    tags: [],
    sortOrder: 0,
    publishedAt: null,
    collectionSlugs: [],
    colors: [],
    sizes: [],
    images: [],
    variants: [],
  }
}

describe('shop search words', () => {
  const sneaker = product('Хар цагаан спорт пүүз', 'Пүүз')
  const heel = product('Улаан өсгийтэй гутал', 'Өсгийтэй гутал')
  const chelsea = product('Челси ботинк', 'Ботинк')
  const kids = product('Хүүхдийн ботинк', 'Хүүхдийн гутал')
  const loafer = product('Арьсан лофер', 'Туфли, лофер')
  it('finds shoes by their English, Russian or Latin-typed names', () => {
    expect(matchesQuery(sneaker, 'sneakers')).toBe(true)
    expect(matchesQuery(sneaker, 'puuz')).toBe(true)
    expect(matchesQuery(sneaker, 'кроссовка')).toBe(true)
    expect(matchesQuery(heel, 'heels')).toBe(true)
    expect(matchesQuery(heel, 'osgiitei')).toBe(true)
    expect(matchesQuery(chelsea, 'chelsea boots')).toBe(true)
    expect(matchesQuery(chelsea, 'botink')).toBe(true)
    expect(matchesQuery(kids, 'kids')).toBe(true)
    expect(matchesQuery(loafer, 'loafers')).toBe(true)
  })
  it('does not mix them up', () => {
    expect(matchesQuery(sneaker, 'heels')).toBe(false)
    expect(matchesQuery(heel, 'sneakers')).toBe(false)
    expect(matchesQuery(chelsea, 'kids')).toBe(false)
  })
})
