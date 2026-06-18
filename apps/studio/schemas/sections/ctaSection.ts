import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'advanced', title: 'Custom Code' },
  ],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', group: 'content' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2, group: 'content' }),
    defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'ctaButton', group: 'content' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'ctaButton', group: 'content' }),
    defineField({ name: 'footnote', title: 'Footnote', type: 'string', group: 'content', description: 'e.g. "No credit card required"' }),
    defineField({
      name: 'bgStyle',
      title: 'Background Style',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light grey', value: 'light' },
          { title: 'Dark (charcoal)', value: 'dark' },
          { title: 'Brand blue', value: 'brand' },
        ],
      },
      initialValue: 'brand',
    }),
    defineField({
      name: 'customCode',
      title: 'Custom Code',
      type: 'customCode',
      group: 'advanced',
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'bgStyle' },
    prepare: ({ title, subtitle }) => ({ title: 'CTA', subtitle: title || subtitle }),
  },
});
