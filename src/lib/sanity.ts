import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'obrlZ0W8r',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: import.meta.env.SANITY_API_TOKEN,
})

// ── Coffee shops ──────────────────────────────────────────────────────────────

export const coffeeShopsQuery = `*[_type == "coffeeShop"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  rating,
  neighborhood,
  priceRange,
  summary,
  tags,
  "mainImage": mainImage.asset->url,
  "mainImageAlt": mainImage.alt
}`

export const coffeeShopBySlugQuery = `*[_type == "coffeeShop" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  rating,
  neighborhood,
  priceRange,
  summary,
  tags,
  body,
  "mainImage": mainImage.asset->url,
  "mainImageAlt": mainImage.alt
}`

export const featuredCoffeeShopQuery = `*[_type == "coffeeShop"] | order(publishedAt desc)[0] {
  _id,
  title,
  slug,
  publishedAt,
  rating,
  neighborhood,
  priceRange,
  summary,
  tags,
  "mainImage": mainImage.asset->url,
  "mainImageAlt": mainImage.alt
}`

// ── Style posts ───────────────────────────────────────────────────────────────

export const stylePostsQuery = `*[_type == "stylePost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  summary,
  "mainImage": mainImage.asset->url,
  "mainImageAlt": mainImage.alt
}`

export const stylePostBySlugQuery = `*[_type == "stylePost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  summary,
  body,
  "mainImage": mainImage.asset->url,
  "mainImageAlt": mainImage.alt
}`

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CoffeeShop {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  rating: number
  neighborhood: string
  priceRange: '€' | '€€' | '€€€'
  summary: string
  tags: string[]
  mainImage: string
  mainImageAlt?: string
  body?: PortableTextBlock[]
}

export interface StylePost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  summary: string
  mainImage: string
  mainImageAlt?: string
  body?: PortableTextBlock[]
}

export interface PortableTextBlock {
  _type: string
  _key: string
  style?: string
  children?: Array<{
    _type: string
    _key: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{ _key: string; _type: string; href?: string }>
}

// ── Portable text renderer (simple) ──────────────────────────────────────────

export function portableTextToHtml(blocks: PortableTextBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) return ''

  return blocks
    .map((block) => {
      if (block._type !== 'block') return ''

      const children = (block.children || [])
        .map((child) => {
          let text = child.text || ''
          if (child.marks?.includes('strong')) text = `<strong>${text}</strong>`
          if (child.marks?.includes('em')) text = `<em>${text}</em>`
          if (child.marks?.includes('underline')) text = `<u>${text}</u>`
          if (child.marks?.includes('strike-through')) text = `<s>${text}</s>`
          if (child.marks?.includes('code')) text = `<code>${text}</code>`
          return text
        })
        .join('')

      const style = block.style || 'normal'
      switch (style) {
        case 'h1': return `<h1>${children}</h1>`
        case 'h2': return `<h2>${children}</h2>`
        case 'h3': return `<h3>${children}</h3>`
        case 'h4': return `<h4>${children}</h4>`
        case 'blockquote': return `<blockquote>${children}</blockquote>`
        default: return `<p>${children}</p>`
      }
    })
    .join('\n')
}

export function formatDate(dateString: string): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
