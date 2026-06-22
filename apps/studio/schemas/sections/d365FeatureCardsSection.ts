import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365FeatureCardsSection',
  title: '🃏 Feature Cards (3-up)',
  type: 'object',
  fields: [
    defineField({ name: 'headingGradient', title: 'Heading — Gradient Part', type: 'string', initialValue: 'Ticketing + AI', description: 'Renders in pink-to-purple gradient' }),
    defineField({ name: 'headingPlain', title: 'Heading — Plain Part', type: 'string', initialValue: 'The only platform your agents need.' }),
    defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 2 }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
          defineField({ name: 'image', title: 'Card Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string' }),
        ],
        preview: { select: { title: 'title', media: 'image' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'headingGradient' },
    prepare: ({ title }) => ({ title: '🃏 Feature Cards', subtitle: title }),
  },
});
