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
  name: 'aboutPage',
  title: 'About Us Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'content', title: 'Content' },
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
    defineField({ name: 'heroBgGradient', title: 'Hero Background Gradient', type: 'string', group: 'hero', description: 'Full CSS gradient for the hero section background, e.g. linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #5e35b1 100%)' }),

    // Content
    defineField({ name: 'missionEyebrow', title: 'Mission Section Eyebrow', type: 'string', group: 'content' }),
    defineField({ name: 'missionHeading', title: 'Mission Heading', type: 'string', group: 'content' }),
    defineField({ name: 'missionBody1', title: 'Mission Body (paragraph 1)', type: 'text', group: 'content' }),
    defineField({ name: 'missionBody2', title: 'Mission Body (paragraph 2)', type: 'text', group: 'content' }),

    defineField({
      name: 'missionStats',
      title: 'Mission Visual Stats',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'missionStat',
          fields: [
            defineField({ name: 'stat', title: 'Stat Value (e.g. 85%)', type: 'string' }),
            defineField({ name: 'label', title: 'Stat Label', type: 'string' }),
            defineField({
              name: 'colorKey',
              title: 'Color Variant',
              type: 'string',
              options: {
                list: [
                  { title: 'Blue', value: 'blue' },
                  { title: 'Green', value: 'green' },
                  { title: 'Dark', value: 'dark' },
                ],
                layout: 'radio',
              },
            }),
          ],
          preview: { select: { title: 'stat', subtitle: 'label' } },
        }),
      ],
    }),

    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'statItem',
          fields: [
            defineField({ name: 'number', title: 'Number (e.g. 7,000+)', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'number', subtitle: 'label' } },
        }),
      ],
    }),

    defineField({ name: 'valuesEyebrow', title: 'Values Section Eyebrow', type: 'string', group: 'content' }),
    defineField({ name: 'valuesHeading', title: 'Values Section Heading', type: 'string', group: 'content' }),

    defineField({
      name: 'values',
      title: 'Company Values',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'valueItem',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'icon', title: 'Icon SVG Path', type: 'string', description: 'SVG path data for the icon' }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),

    defineField({ name: 'timelineEyebrow', title: 'Timeline Section Eyebrow', type: 'string', group: 'content' }),
    defineField({ name: 'timelineHeading', title: 'Timeline Section Heading', type: 'string', group: 'content' }),

    defineField({
      name: 'milestones',
      title: 'Timeline Milestones',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'milestone',
          fields: [
            defineField({ name: 'year', title: 'Year', type: 'string' }),
            defineField({ name: 'event', title: 'Event Description', type: 'text' }),
          ],
          preview: { select: { title: 'year', subtitle: 'event' } },
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
      description: 'Add sections (team grid, testimonials, CTAs, etc.) to the about page.',
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
      title: 'About Us Page',
      subtitle: `/about-us  ·  ${status ?? 'published'}`,
    }),
  },
});
