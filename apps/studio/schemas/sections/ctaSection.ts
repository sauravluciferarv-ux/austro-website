import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2 }),
    defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'ctaButton' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'ctaButton' }),
    defineField({ name: 'footnote', title: 'Footnote', type: 'string', description: 'e.g. "No credit card required"' }),
    defineField({
      name: 'bgStyle',
      title: 'Background Style',
      type: 'string',
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
  ],
  preview: {
    select: { title: 'heading', subtitle: 'bgStyle' },
    prepare: ({ title, subtitle }) => ({ title: 'CTA', subtitle: title || subtitle }),
  },
});
