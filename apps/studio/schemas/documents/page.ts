import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Page Builder', default: true },
    { name: 'settings', title: 'Settings' },
    { name: 'seo', title: 'SEO' },
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
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Review', value: 'review' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'published',
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      description: 'Shown as a thumbnail in the Pages list.',
      type: 'image',
      group: 'settings',
      options: { hotspot: true },
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
      of: [
        { type: 'pageSection' },
        // D365 pre-built sections
        { type: 'd365HeroSection' },
        { type: 'd365TrustBarSection' },
        { type: 'd365StatsSection' },
        { type: 'd365FeatureCardsSection' },
        { type: 'd365ChannelTabsSection' },
        { type: 'd365AIFeaturesSection' },
        { type: 'd365MicrosoftSection' },
        { type: 'd365ITSMSection' },
        { type: 'd365CapabilitiesSection' },
        { type: 'd365ComparisonSection' },
        { type: 'd365IntegrationsSection' },
        { type: 'd365TestimonialsSection' },
        { type: 'd365WhyChooseSection' },
        { type: 'd365SecuritySection' },
        { type: 'd365BlogSection' },
        { type: 'd365FinalCtaSection' },
      ],
      description: 'Build the page by adding and reordering sections.',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'previewImage',
      status: 'status',
      noIndex: 'seo.noIndex',
    },
    prepare: ({ title, slug, media, status, noIndex }: {
      title?: string;
      slug?: string;
      media?: unknown;
      status?: string;
      noIndex?: boolean;
    }) => ({
      title,
      subtitle: `/${slug ?? ''}` + (status ? `  ·  ${status}` : '') + (noIndex ? '  ·  noindex' : ''),
      media,
    }),
  },
  orderings: [
    { title: 'Title A–Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
    { title: 'Published', name: 'published', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
});
