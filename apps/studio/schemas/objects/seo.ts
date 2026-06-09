import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Appears in browser tab and search results',
      validation: R => R.max(60).warning('Keep under 60 characters'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Appears in search result snippets',
      validation: R => R.max(160).warning('Keep under 160 characters'),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      description: '1200×630px recommended',
      options: { hotspot: true },
    }),
    defineField({ name: 'ogTitle', title: 'OG Title (overrides Meta Title)', type: 'string' }),
    defineField({ name: 'ogDescription', title: 'OG Description', type: 'text', rows: 2 }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Leave blank to auto-generate from page URL',
    }),
    defineField({
      name: 'structuredData',
      title: 'Custom JSON-LD',
      type: 'text',
      rows: 6,
      description: 'Custom schema.org JSON-LD override — advanced users only',
    }),
  ],
});
