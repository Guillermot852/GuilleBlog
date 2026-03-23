import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'stylePost',
  title: 'Style Post',
  type: 'document',
  icon: () => '✨',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
      description: 'Short description shown on listing cards',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal',    value: 'normal'     },
            { title: 'Heading 2', value: 'h2'         },
            { title: 'Heading 3', value: 'h3'         },
            { title: 'Quote',     value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold',    value: 'strong'         },
              { title: 'Italic',  value: 'em'             },
              { title: 'Strike',  value: 'strike-through' },
              { title: 'Code',    value: 'code'           },
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
      options: { layout: 'tags' },
    }),
  ],

  preview: {
    select: {
      title:    'title',
      subtitle: 'publishedAt',
      media:    'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
          : 'Draft',
        media,
      }
    },
  },
})
