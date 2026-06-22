import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365HeroSection',
  title: '🦸 Hero Section',
  type: 'object',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'cta', title: 'CTAs' },
  ],
  fields: [
    defineField({
      name: 'headlinePrefix',
      title: 'Headline Prefix',
      type: 'string',
      group: 'content',
      description: 'Text before the gradient "AI" word. e.g. "AI-powered helpdesk for"',
      initialValue: 'AI-powered helpdesk for',
    }),
    defineField({
      name: 'rotatingWords',
      title: 'Rotating Words',
      type: 'array',
      group: 'content',
      description: 'Words that cycle in the headline. One per item.',
      of: [{ type: 'string' }],
      initialValue: ['customer service', 'IT admins', 'Microsoft Teams', 'MSPs', 'teams of all sizes'],
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'footnote',
      title: 'Footnote',
      type: 'string',
      group: 'content',
      description: 'e.g. "No credit card required."',
      initialValue: 'No credit card required.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
    }),
    defineField({ name: 'heroImageAlt', title: 'Hero Image Alt Text', type: 'string', group: 'media' }),
    defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'ctaButton', group: 'cta' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'ctaButton', group: 'cta' }),
  ],
  preview: {
    select: { title: 'headlinePrefix', sub: 'subheadline' },
    prepare: ({ title, sub }) => ({ title: '🦸 Hero', subtitle: title ?? sub }),
  },
});
