import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'advanced', title: 'Custom Code' },
  ],
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      group: 'content',
      description: 'Small pill label above the headline, e.g. "🚀 Now with AI Agent"',
    }),
    defineField({ name: 'headline', title: 'Headline', type: 'string', group: 'content', validation: R => R.required() }),
    defineField({
      name: 'headlineHighlight',
      title: 'Headline Highlight',
      type: 'string',
      group: 'content',
      description: 'Exact phrase within the headline to render in blue',
    }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'text', rows: 3, group: 'content' }),
    defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'ctaButton', group: 'content' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'ctaButton', group: 'content' }),
    defineField({
      name: 'footnote',
      title: 'Footnote',
      type: 'string',
      group: 'content',
      description: 'e.g. "No credit card required · 21-day free trial"',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'content',
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
      group: 'content',
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
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', group: 'content', options: { hotspot: true } }),
    defineField({ name: 'heroImageAlt', title: 'Hero Image Alt Text', type: 'string', group: 'content' }),
    defineField({
      name: 'customCode',
      title: 'Custom Code',
      type: 'customCode',
      group: 'advanced',
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare: ({ title }) => ({ title: 'Hero', subtitle: title }),
  },
});
