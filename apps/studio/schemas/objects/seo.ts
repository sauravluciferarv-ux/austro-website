import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    // ── Meta ──────────────────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Appears in browser tab and search results. Ideal: 50–60 characters.',
      validation: R => R.max(60).warning('Keep under 60 characters'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Appears in search result snippets. Ideal: 120–160 characters.',
      validation: R => R.max(160).warning('Keep under 160 characters'),
    }),

    // ── Open Graph ─────────────────────────────────────────────────────────
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      description: '1200×630px recommended for social sharing previews.',
      options: { hotspot: true },
    }),
    defineField({ name: 'ogTitle', title: 'OG Title (overrides Meta Title)', type: 'string' }),
    defineField({ name: 'ogDescription', title: 'OG Description', type: 'text', rows: 2 }),

    // ── Indexing & Robots ──────────────────────────────────────────────────
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Prevents search engines from indexing this page.',
      initialValue: false,
    }),
    defineField({
      name: 'noFollow',
      title: 'No Follow',
      type: 'boolean',
      description: 'Tells search engines not to follow links on this page.',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Leave blank to auto-generate from the page URL.',
    }),

    // ── Sitemap ────────────────────────────────────────────────────────────
    defineField({
      name: 'changefreq',
      title: 'Change Frequency',
      type: 'string',
      description: 'How often this page is likely to change. Guides (not commands) crawlers.',
      options: {
        list: [
          { title: 'Always',  value: 'always'  },
          { title: 'Hourly',  value: 'hourly'  },
          { title: 'Daily',   value: 'daily'   },
          { title: 'Weekly',  value: 'weekly'  },
          { title: 'Monthly', value: 'monthly' },
          { title: 'Yearly',  value: 'yearly'  },
          { title: 'Never',   value: 'never'   },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'priority',
      title: 'Sitemap Priority',
      type: 'number',
      description: 'Priority relative to other pages on this site. 0.0 (lowest) → 1.0 (highest). Default: 0.7.',
      validation: R => R.min(0).max(1).precision(1),
    }),

    // ── Advanced ───────────────────────────────────────────────────────────
    defineField({
      name: 'structuredData',
      title: 'Custom JSON-LD',
      type: 'text',
      rows: 6,
      description: 'Advanced: paste a custom schema.org JSON-LD block.',
    }),
  ],
});
