import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: R => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'E.g. "how-to-set-up-sla" → /blog/how-to-set-up-sla/',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '').slice(0, 96),
      },
      validation: R => R.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: R => R.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'lastModified',
      title: 'Last Modified Date',
      type: 'datetime',
      description: 'Override the auto-detected sitemap last-modified date.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Used as meta description fallback and in post cards.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Customer Support', 'IT Help Desk', 'Product Updates',
          'How-To Guides', 'Industry News', 'Case Studies',
        ],
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title:     'title',
      slug:      'slug.current',
      media:     'heroImage',
      noIndex:   'seo.noIndex',
      published: 'publishedAt',
    },
    prepare: ({ title, slug, media, noIndex, published }) => ({
      title,
      subtitle: [
        `/blog/${slug ?? ''}`,
        published ? new Date(published).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
        noIndex ? 'noindex' : '',
      ].filter(Boolean).join('  ·  '),
      media,
    }),
  },
  orderings: [
    { title: 'Newest First', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Oldest First', name: 'publishedAsc',  by: [{ field: 'publishedAt', direction: 'asc'  }] },
  ],
});
