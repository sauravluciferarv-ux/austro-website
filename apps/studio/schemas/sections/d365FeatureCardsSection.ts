import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365FeatureCardsSection',
  title: 'Feature Cards (3-up)',
  type: 'object',
  groups: [
    { name: 'style', title: 'Style' },
    { name: 'responsive', title: 'Responsive' },
    { name: 'advanced', title: 'Advanced' },
  ],
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
    // ── Visual Editor Style Controls ──────────────────────────────────────────
    defineField({ name: 'background', title: 'Background', type: 'styleBackground', group: 'style' }),
    defineField({ name: 'border', title: 'Border & Shadow', type: 'styleBorder', group: 'style' }),
    defineField({ name: 'spacing', title: 'Spacing', type: 'styleSpacing', group: 'style' }),
    defineField({ name: 'size', title: 'Height / Size', type: 'styleSize', group: 'style' }),
    defineField({ name: 'sectionResponsive', title: 'Responsive Controls', type: 'styleResponsive', group: 'responsive' }),
    defineField({ name: 'sectionId', title: 'Section HTML ID', type: 'string', group: 'advanced' }),
    defineField({
      name: 'sectionClass', title: 'Extra CSS Class', type: 'string', group: 'advanced',
      description: 'Added alongside the built-in section class for custom CSS targeting.'
    }),
    defineField({
      name: 'customCss', title: 'Custom CSS', type: 'text', rows: 8, group: 'advanced',
      description: 'Write full selectors like .d365-feature-cards { padding: 80px; } or bare CSS properties.'
    }),
  ],
  preview: {
    select: { title: 'headingGradient' },
    prepare: ({ title }) => ({ title: '🃏 Feature Cards', subtitle: title }),
  },
});
