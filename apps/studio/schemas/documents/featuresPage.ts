import { defineType, defineField, defineArrayMember } from 'sanity';

const pageBuilderTypes = [
  { type: 'pageSection' },
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
];

export default defineType({
  name: 'featuresPage',
  title: 'Features Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'categories', title: 'Feature Categories' },
    { name: 'cta', title: 'Final CTA' },
    { name: 'pageBuilder', title: 'Page Builder', default: true },
    { name: 'settings', title: 'Settings' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Settings
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
      type: 'image',
      group: 'settings',
      options: { hotspot: true },
    }),

    // Hero
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'text', group: 'hero' }),
    defineField({ name: 'heroPrimaryCtaLabel', title: 'Primary CTA Label', type: 'string', group: 'hero' }),
    defineField({ name: 'heroPrimaryCtaHref', title: 'Primary CTA URL', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSecondaryCtaLabel', title: 'Secondary CTA Label', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSecondaryCtaHref', title: 'Secondary CTA URL', type: 'string', group: 'hero' }),
    defineField({ name: 'heroFootnote', title: 'Hero Footnote', type: 'string', group: 'hero' }),
    defineField({ name: 'learnMoreLabel', title: 'Feature Card "Learn More" Label', type: 'string', group: 'hero' }),

    // Feature Categories
    defineField({
      name: 'categories',
      title: 'Feature Categories',
      type: 'array',
      group: 'categories',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'featureCategory',
          title: 'Feature Category',
          fields: [
            defineField({ name: 'id', title: 'Category ID (slug)', type: 'slug', options: { source: 'label' } }),
            defineField({ name: 'label', title: 'Category Label', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon SVG Path', type: 'string', description: 'SVG <path> data for the category icon (stroke icon, 24×24 viewBox)' }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'featureItem',
                  title: 'Feature Item',
                  fields: [
                    defineField({ name: 'name', title: 'Feature Name', type: 'string' }),
                    defineField({ name: 'href', title: 'Learn More URL', type: 'string' }),
                    defineField({ name: 'description', title: 'Description', type: 'text' }),
                    defineField({
                      name: 'tags',
                      title: 'Tags',
                      type: 'array',
                      of: [defineArrayMember({ type: 'string' })],
                    }),
                  ],
                  preview: { select: { title: 'name', subtitle: 'description' } },
                }),
              ],
            }),
          ],
          preview: { select: { title: 'label' } },
        }),
      ],
    }),

    // Final CTA
    defineField({ name: 'finalCtaHeading', title: 'Final CTA Heading', type: 'string', group: 'cta' }),
    defineField({ name: 'finalCtaSubheading', title: 'Final CTA Subheading', type: 'text', group: 'cta' }),
    defineField({ name: 'finalCtaPrimaryLabel', title: 'Primary CTA Label', type: 'string', group: 'cta' }),
    defineField({ name: 'finalCtaPrimaryHref', title: 'Primary CTA URL', type: 'string', group: 'cta' }),
    defineField({ name: 'finalCtaSecondaryLabel', title: 'Secondary CTA Label', type: 'string', group: 'cta' }),
    defineField({ name: 'finalCtaSecondaryHref', title: 'Secondary CTA URL', type: 'string', group: 'cta' }),
    defineField({ name: 'finalCtaGradientAccent', title: 'Final CTA Gradient Accent Color', type: 'string', group: 'cta', description: 'End color of the CTA section gradient, e.g. #5e35b1. The gradient goes from brand blue → this color.' }),

    // Page Builder
    defineField({
      name: 'pageBuilder',
      title: 'Additional Sections',
      description: 'Add sections (testimonials, CTAs, comparison tables, etc.) to supplement the features grid.',
      type: 'array',
      group: 'pageBuilder',
      of: pageBuilderTypes,
    }),

    // SEO
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    select: { status: 'status' },
    prepare: ({ status }: { status?: string }) => ({
      title: 'Features Page',
      subtitle: `/features  ·  ${status ?? 'published'}`,
    }),
  },
});
