import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'coffeeShop',
  title: 'Coffee Shop',
  type: 'document',
  icon: () => '☕',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1–10)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: 'neighborhood',
      title: 'Neighbourhood',
      type: 'string',
      description: 'e.g. Malasaña, Chueca, Lavapiés, Chamberí…',
      options: {
        list: [
          'Malasaña',
          'Chueca',
          'Lavapiés',
          'Chamberí',
          'Salamanca',
          'La Latina',
          'Huertas',
          'Retiro',
          'Moncloa',
          'Other',
        ],
      },
    }),
    defineField({
      name: 'priceRange',
      title: 'Price range',
      type: 'string',
      options: {
        list: [
          { title: '€ — Budget',     value: '€'   },
          { title: '€€ — Mid-range', value: '€€'  },
          { title: '€€€ — Pricey',   value: '€€€' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Important for accessibility',
        }),
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
      description: 'One-liner shown on cards (max ~120 chars)',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'body',
      title: 'Review body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal',       value: 'normal'     },
            { title: 'Heading 2',    value: 'h2'         },
            { title: 'Heading 3',    value: 'h3'         },
            { title: 'Quote',        value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold',          value: 'strong'         },
              { title: 'Italic',        value: 'em'             },
              { title: 'Underline',     value: 'underline'      },
              { title: 'Strike',        value: 'strike-through' },
              { title: 'Code',          value: 'code'           },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          'specialty coffee',
          'good wifi',
          'outdoor seating',
          'dog friendly',
          'great pastries',
          'good for work',
          'quick stop',
          'hidden gem',
          'classic Madrid',
          'third wave',
          'flat white',
          'pour over',
        ],
      },
    }),
  ],

  preview: {
    select: {
      title:    'title',
      subtitle: 'neighborhood',
      media:    'mainImage',
      rating:   'rating',
    },
    prepare({ title, subtitle, media, rating }) {
      return {
        title:    `${rating ? `[${rating}/10] ` : ''}${title}`,
        subtitle: subtitle || 'No neighbourhood set',
        media,
      }
    },
  },
})
