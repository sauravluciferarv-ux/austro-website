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

const pricingTierFields = [
  defineField({ name: 'id', title: 'Plan ID', type: 'slug', options: { source: 'name' } }),
  defineField({ name: 'name', title: 'Plan Name (e.g. PLUS)', type: 'string' }),
  defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
  defineField({ name: 'monthlyPrice', title: 'Monthly Price (USD)', type: 'number' }),
  defineField({ name: 'yearlyPrice', title: 'Yearly Price/mo (USD)', type: 'number' }),
  defineField({ name: 'ctaLabel', title: 'CTA Button Label', type: 'string' }),
  defineField({ name: 'ctaHref', title: 'CTA Button URL', type: 'string' }),
  defineField({
    name: 'ctaStyle',
    title: 'CTA Style',
    type: 'string',
    options: {
      list: [
        { title: 'Outline', value: 'outline' },
        { title: 'Outline Blue', value: 'outline-blue' },
        { title: 'Green Solid', value: 'green-solid' },
        { title: 'Blue Solid', value: 'blue-solid' },
      ],
    },
  }),
  defineField({ name: 'highlight', title: 'Highlighted (Most Popular)', type: 'boolean' }),
  defineField({ name: 'badge', title: 'Badge Text (e.g. Most Popular)', type: 'string' }),
  defineField({
    name: 'features',
    title: 'Feature Bullets',
    type: 'array',
    of: [defineArrayMember({ type: 'string' })],
  }),
];

const faqItemFields = [
  defineField({ name: 'question', title: 'Question', type: 'string' }),
  defineField({ name: 'answer', title: 'Answer', type: 'text' }),
];

const competitorFields = [
  defineField({ name: 'name', title: 'Competitor Name', type: 'string' }),
  defineField({ name: 'price', title: 'Monthly Price (10 agents)', type: 'number' }),
  defineField({ name: 'highlight', title: 'Highlight (our brand)', type: 'boolean' }),
];

export default defineType({
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'plans', title: 'Plans' },
    { name: 'faq', title: 'FAQ' },
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
    defineField({
      name: 'billingConfig',
      title: 'Billing Toggle Labels',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'monthlyLabel', title: 'Monthly Label', type: 'string' }),
        defineField({ name: 'yearlyLabel', title: 'Yearly Label', type: 'string' }),
        defineField({ name: 'yearlySaveBadge', title: 'Yearly Save Badge (e.g. Save 25%)', type: 'string' }),
        defineField({ name: 'billingYearlyNote', title: 'Billed Yearly Note', type: 'string', description: 'Text shown under paid plan price when yearly billing is active (e.g. "billed yearly")' }),
        defineField({ name: 'billingMonthlyNote', title: 'Billed Monthly Note', type: 'string', description: 'Text shown under paid plan price when monthly billing is active (e.g. "billed monthly")' }),
      ],
    }),
    defineField({ name: 'priceUnit', title: 'Price Unit Label', type: 'string', group: 'hero', description: 'Shown after the price amount, e.g. "/agent/mo"' }),
    defineField({ name: 'freePriceLabel', title: 'Free Plan Price Label', type: 'string', group: 'hero', description: 'Text shown as the "price" for the free plan (e.g. "Free")' }),

    // Plans
    defineField({
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      group: 'plans',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pricingTier',
          title: 'Pricing Tier',
          fields: pricingTierFields,
          preview: {
            select: { title: 'name', subtitle: 'tagline' },
          },
        }),
      ],
    }),

    defineField({ name: 'plansFootnote', title: 'Plans Footnote Text', type: 'text', group: 'plans' }),
    defineField({ name: 'plansFootnoteContactLabel', title: 'Plans Footnote Contact Link Label', type: 'string', group: 'plans' }),
    defineField({ name: 'plansFootnoteContactHref', title: 'Plans Footnote Contact Link URL', type: 'string', group: 'plans' }),

    // Competitors comparison
    defineField({
      name: 'competitors',
      title: 'Competitor Comparison Bar',
      type: 'array',
      group: 'plans',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'competitor',
          title: 'Competitor',
          fields: competitorFields,
          preview: { select: { title: 'name', subtitle: 'price' } },
        }),
      ],
    }),

    defineField({ name: 'comparisonEyebrow', title: 'Comparison Section Eyebrow', type: 'string', group: 'plans' }),
    defineField({ name: 'comparisonHeading', title: 'Comparison Section Heading', type: 'string', group: 'plans' }),
    defineField({ name: 'comparisonSubheading', title: 'Comparison Section Subheading', type: 'string', group: 'plans' }),
    defineField({ name: 'comparisonFootnote', title: 'Comparison Footnote', type: 'string', group: 'plans' }),

    defineField({ name: 'featureTableEyebrow', title: 'Feature Table Eyebrow', type: 'string', group: 'plans' }),
    defineField({ name: 'featureTableHeading', title: 'Feature Table Heading', type: 'string', group: 'plans' }),
    defineField({
      name: 'featureTableColumnLabels',
      title: 'Feature Table Column Headers',
      type: 'object',
      group: 'plans',
      fields: [
        defineField({ name: 'featureCol', title: 'Feature Column Header', type: 'string' }),
        defineField({ name: 'freeCol', title: 'Free Plan Column Header', type: 'string' }),
        defineField({ name: 'standardCol', title: 'Standard Plan Column Header', type: 'string' }),
        defineField({ name: 'plusCol', title: 'Plus Plan Column Header', type: 'string' }),
        defineField({ name: 'premiumCol', title: 'Premium Plan Column Header', type: 'string' }),
      ],
    }),

    // AI Add-on
    defineField({ name: 'aiAddonEyebrow', title: 'AI Add-on Eyebrow', type: 'string', group: 'plans' }),
    defineField({ name: 'aiAddonHeading', title: 'AI Add-on Section Heading', type: 'string', group: 'plans' }),
    defineField({ name: 'aiAddonBody', title: 'AI Add-on Body', type: 'text', group: 'plans' }),
    defineField({
      name: 'aiAddonBullets',
      title: 'AI Add-on Bullet Points',
      type: 'array',
      group: 'plans',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'aiAddonCtaLabel', title: 'AI Add-on CTA Label', type: 'string', group: 'plans' }),
    defineField({ name: 'aiAddonCtaHref', title: 'AI Add-on CTA URL', type: 'string', group: 'plans' }),
    defineField({
      name: 'aiAddonCreditCards',
      title: 'AI Add-on Credit Cards',
      type: 'array',
      group: 'plans',
      description: 'Shows included free credits per plan tier (e.g. Plus: 100 free credits/mo)',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'aiAddonCreditCard',
          fields: [
            defineField({ name: 'planName', title: 'Plan Name', type: 'string' }),
            defineField({ name: 'credits', title: 'Credits Label', type: 'string' }),
          ],
          preview: { select: { title: 'planName', subtitle: 'credits' } },
        }),
      ],
    }),
    defineField({ name: 'aiAddonCardGradient', title: 'AI Visual Card Gradient (Main)', type: 'string', group: 'plans', description: 'CSS gradient for the large AI stat card, e.g. linear-gradient(135deg, var(--d365-blue) 0%, #7b1fa2 100%)' }),
    defineField({ name: 'aiAddonCardSmallBg', title: 'AI Visual Card Background (Small)', type: 'string', group: 'plans', description: 'Background color for smaller AI stat cards, e.g. #1a1a2e' }),
    defineField({
      name: 'aiAddonStats',
      title: 'AI Add-on Visual Stats',
      type: 'array',
      group: 'plans',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'aiAddonStat',
          fields: [
            defineField({ name: 'stat', title: 'Stat Value (e.g. 85%)', type: 'string' }),
            defineField({ name: 'label', title: 'Stat Label', type: 'string' }),
          ],
          preview: { select: { title: 'stat', subtitle: 'label' } },
        }),
      ],
    }),

    // Trust Bar
    defineField({ name: 'trustBarLabel', title: 'Trust Bar Label', type: 'string', group: 'plans' }),
    defineField({
      name: 'trustBarCustomers',
      title: 'Trust Bar Customer Names',
      type: 'array',
      group: 'plans',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'trustBarStats',
      title: 'Trust Bar Stats',
      type: 'array',
      group: 'plans',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'trustBarStat',
          fields: [
            defineField({ name: 'number', title: 'Number (e.g. 4.9)', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'number', subtitle: 'label' } },
        }),
      ],
    }),

    // FAQ
    defineField({ name: 'faqEyebrow', title: 'FAQ Eyebrow', type: 'string', group: 'faq' }),
    defineField({ name: 'faqHeading', title: 'FAQ Heading', type: 'string', group: 'faq' }),
    defineField({
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      group: 'faq',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: faqItemFields,
          preview: { select: { title: 'question' } },
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
    defineField({ name: 'finalCtaFootnote', title: 'Final CTA Footnote', type: 'string', group: 'cta' }),
    defineField({ name: 'finalCtaGradientAccent', title: 'Final CTA Gradient Accent Color', type: 'string', group: 'cta', description: 'End color of the CTA section gradient, e.g. #5e35b1. The gradient goes from brand blue → this color.' }),

    // Page Builder — additional sections above/below the structured content
    defineField({
      name: 'pageBuilder',
      title: 'Additional Sections',
      description: 'Add extra sections (hero banners, testimonials, CTAs, etc.) above or below the pricing content.',
      type: 'array',
      group: 'pageBuilder',
      of: pageBuilderTypes,
    }),

    // SEO
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    select: { previewImage: 'previewImage', status: 'status' },
    prepare: ({ status }: { status?: string }) => ({
      title: 'Pricing Page',
      subtitle: `/pricing  ·  ${status ?? 'published'}`,
    }),
  },
});
