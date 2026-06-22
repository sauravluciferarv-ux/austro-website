import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365AIFeaturesSection',
  title: '🤖 AI Features Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 3 }),
    defineField({
      name: 'cards',
      title: 'AI Feature Cards',
      type: 'array',
      of: [{
        type: 'object',
        name: 'aiCard',
        title: 'AI Card',
        groups: [
          { name: 'main', title: 'Main', default: true },
          { name: 'sub', title: 'Sub-features' },
        ],
        fields: [
          defineField({ name: 'label', title: 'Card Label (Tab Name)', type: 'string', validation: R => R.required(), group: 'main' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, group: 'main' }),
          defineField({ name: 'readMoreHref', title: 'Read More Link', type: 'string', group: 'main' }),
          defineField({ name: 'image', title: 'Card Image', type: 'image', options: { hotspot: true }, group: 'main' }),
          defineField({ name: 'imageAlt', title: 'Image Alt', type: 'string', group: 'main' }),
          defineField({
            name: 'subFeatures',
            title: 'Sub-features',
            type: 'array',
            group: 'sub',
            of: [{
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
                defineField({ name: 'description', title: 'Description', type: 'string' }),
              ],
              preview: { select: { title: 'title', subtitle: 'description' } },
            }],
          }),
        ],
        preview: { select: { title: 'label', media: 'image' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: '🤖 AI Features', subtitle: title }),
  },
});
