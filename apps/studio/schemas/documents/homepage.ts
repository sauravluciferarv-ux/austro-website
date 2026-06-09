import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add, remove, and reorder sections. Choose "Use a saved template" to reuse a saved section — edits to the template update this page automatically.',
      of: [
        { type: 'heroSection' },
        { type: 'logosSection' },
        { type: 'featuresSection' },
        { type: 'statsSection' },
        { type: 'ctaSection' },
        {
          type: 'reference',
          title: 'Use a saved template',
          to: [{ type: 'sectionTemplate' }],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
});
