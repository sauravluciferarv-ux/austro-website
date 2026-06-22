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
      of: [
        // Generic block-builder section (for custom layouts)
        { type: 'pageSection' },
        // ── D365 Home Sections ──────────────────────────────────
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
      description: 'Build the homepage by adding sections. Use D365 sections for the pre-built layouts, or "Section" for full custom block-builder control.',
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
