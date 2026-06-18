import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: R => R.required(),
      group: 'settings',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '').slice(0, 96),
      },
      validation: R => R.required(),
      group: 'settings',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'settings',
    }),
    defineField({
      name: 'lastModified',
      title: 'Last Modified Date',
      type: 'datetime',
      group: 'settings',
    }),
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
      description: 'Build the page by adding sections and blocks.',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      noIndex: 'seo.noIndex',
    },
    prepare: ({ title, slug, noIndex }: { title?: string; slug?: string; noIndex?: boolean }) => ({
      title,
      subtitle: `/${slug ?? ''}` + (noIndex ? '  ·  noindex' : ''),
    }),
  },
  orderings: [
    { title: 'Title A–Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
    { title: 'Published', name: 'published', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
});
