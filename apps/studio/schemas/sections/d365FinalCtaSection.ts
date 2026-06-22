import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365FinalCtaSection',
  title: '🚀 Final CTA Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 2 }),
    defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'ctaButton' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'ctaButton' }),
    defineField({ name: 'footnote', title: 'Footnote', type: 'string', description: 'e.g. "21-day free trial · No credit card required"' }),
    defineField({ name: 'logoImage', title: 'CTA Visual / Logo Image', type: 'image', options: { hotspot: true }, description: 'Large graphic displayed on the right side of the CTA section. Recommended: 500×500 PNG on transparent background.' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: '🚀 Final CTA', subtitle: title }),
  },
});
