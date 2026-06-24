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
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'contact', title: 'Contact Info' },
    { name: 'resources', title: 'Resources' },
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
    defineField({ name: 'heroHeading', title: 'Heading', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', group: 'hero' }),
    defineField({ name: 'heroPrimaryCtaLabel', title: 'Primary CTA Label', type: 'string', group: 'hero' }),
    defineField({ name: 'heroPrimaryCtaHref', title: 'Primary CTA URL', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSecondaryCtaLabel', title: 'Secondary CTA Label', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSecondaryCtaHref', title: 'Secondary CTA URL', type: 'string', group: 'hero' }),

    // Contact info
    defineField({ name: 'supportEmail', title: 'Support Email', type: 'string', group: 'contact' }),
    defineField({ name: 'generalEmail', title: 'General Email', type: 'string', group: 'contact' }),
    defineField({ name: 'careersEmail', title: 'Careers Email', type: 'string', group: 'contact' }),

    defineField({
      name: 'contactCards',
      title: 'Contact Cards',
      type: 'array',
      group: 'contact',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'contactCard',
          title: 'Contact Card',
          fields: [
            defineField({ name: 'title', title: 'Card Title', type: 'string' }),
            defineField({ name: 'description', title: 'Card Description', type: 'text' }),
            defineField({ name: 'emailKey', title: 'Email Key (support | general | careers)', type: 'string', description: 'Maps to which email address to display: support, general, or careers' }),
            defineField({ name: 'icon', title: 'Icon Image (optional SVG upload)', type: 'image', options: { hotspot: false } }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),

    defineField({ name: 'officesEyebrow', title: 'Offices Section Eyebrow', type: 'string', group: 'contact' }),
    defineField({ name: 'officesHeading', title: 'Offices Section Heading', type: 'string', group: 'contact' }),

    defineField({
      name: 'offices',
      title: 'Office Locations',
      type: 'array',
      group: 'contact',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'office',
          fields: [
            defineField({ name: 'city', title: 'City', type: 'string' }),
            defineField({ name: 'region', title: 'Region / Country', type: 'string' }),
            defineField({ name: 'flag', title: 'Flag Emoji', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
          ],
          preview: { select: { title: 'city', subtitle: 'region' } },
        }),
      ],
    }),

    // Resources
    defineField({ name: 'resourcesEyebrow', title: 'Resources Section Eyebrow', type: 'string', group: 'resources' }),
    defineField({ name: 'resourcesHeading', title: 'Resources Section Heading', type: 'string', group: 'resources' }),
    defineField({ name: 'resourcesSubheading', title: 'Resources Section Subheading', type: 'text', group: 'resources' }),

    defineField({
      name: 'resources',
      title: 'Resource Cards',
      type: 'array',
      group: 'resources',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'resource',
          title: 'Resource',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'linkLabel', title: 'Link Label', type: 'string' }),
            defineField({ name: 'linkHref', title: 'Link URL', type: 'string' }),
            defineField({ name: 'external', title: 'Open in new tab', type: 'boolean' }),
            defineField({ name: 'icon', title: 'Icon Image (optional)', type: 'image', options: { hotspot: false } }),
          ],
          preview: { select: { title: 'title', subtitle: 'linkHref' } },
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
      description: 'Add sections (testimonials, FAQs, trust bars, etc.) to the contact page.',
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
      title: 'Contact Page',
      subtitle: `/contact  ·  ${status ?? 'published'}`,
    }),
  },
});
