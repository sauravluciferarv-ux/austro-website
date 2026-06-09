import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'Small pill label above the headline, e.g. "🚀 Now with AI Agent"',
    }),
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: R => R.required() }),
    defineField({
      name: 'headlineHighlight',
      title: 'Headline Highlight',
      type: 'string',
      description: 'Exact phrase within the headline to render in blue',
    }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'text', rows: 3 }),
    defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'ctaButton' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'ctaButton' }),
    defineField({
      name: 'footnote',
      title: 'Footnote',
      type: 'string',
      description: 'e.g. "No credit card required · 21-day free trial"',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Split — text left, image right', value: 'split' },
          { title: 'Centered — headline and image stacked', value: 'centered' },
        ],
      },
      initialValue: 'split',
    }),
    defineField({
      name: 'highlightColor',
      title: 'Headline Highlight Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Pink / Fuchsia', value: 'fuchsia' },
          { title: 'Green', value: 'green' },
          { title: 'Orange', value: 'orange' },
        ],
      },
      initialValue: 'blue',
    }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroImageAlt', title: 'Hero Image Alt Text', type: 'string' }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare: ({ title }) => ({ title: 'Hero', subtitle: title }),
  },
});
