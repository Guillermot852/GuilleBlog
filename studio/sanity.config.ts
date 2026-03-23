import { defineConfig } from 'sanity'
import { deskTool }    from 'sanity/desk'
import { visionTool }  from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name:    'crema-studio',
  title:   'Crema Studio',

  projectId: 'obrlZ0W8r',
  dataset:   'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Crema')
          .items([
            S.listItem()
              .title('☕ Coffee Shops')
              .child(S.documentTypeList('coffeeShop').title('Coffee Shops')),
            S.listItem()
              .title('✨ Style Posts')
              .child(S.documentTypeList('stylePost').title('Style Posts')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
