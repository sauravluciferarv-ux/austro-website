import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'content', title: 'Page Builder', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [{ type: 'pageSection' }],
      description: 'Build the homepage layout by adding sections and blocks. Click a section to edit its content, layout, and style.',
      group: 'content',
    }),
    // Legacy sections kept for data migration only — hidden from the editor UI
    defineField({
      name: 'sections',
      title: 'Legacy Sections (deprecated)',
      type: 'array',
      description: 'Old fixed sections. Use the Page Builder above instead.',
      hidden: true,
      of: [
        { type: 'heroSection' },
        { type: 'logosSection' },
        { type: 'featuresSection' },
        { type: 'statsSection' },
        { type: 'ctaSection' },
        { type: 'testimonialsSection' },
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
