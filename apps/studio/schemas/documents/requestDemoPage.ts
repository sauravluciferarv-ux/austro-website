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
  name: 'requestDemoPage',
  title: 'Request Demo Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'hero', title: 'Hero / Form' },
    { name: 'form', title: 'Form Fields' },
    { name: 'success', title: 'Success State' },
    { name: 'benefits', title: 'Benefits & Social Proof' },
    { name: 'pageBuilder', title: 'Page Builder', default: true },
    { name: 'settings', title: 'Settings' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Settings ───────────────────────────────────────────────────────────
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

    // ── Hero ───────────────────────────────────────────────────────────────
    defineField({ name: 'formHeading', title: 'Form Eyebrow Label', type: 'string', group: 'hero',
      description: 'Small label above the main heading (e.g. "Book a Demo")' }),
    defineField({ name: 'heroHeading', title: 'Page Heading', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Page Subheading', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'formSubheading', title: 'Form Subheading (unused)', type: 'text', group: 'hero',
      hidden: true }),

    // ── Form Fields ────────────────────────────────────────────────────────
    defineField({
      name: 'formConfig',
      title: 'Form Configuration',
      type: 'object',
      group: 'form',
      fields: [
        // Labels
        defineField({ name: 'firstNameLabel', title: 'First Name Label', type: 'string' }),
        defineField({ name: 'lastNameLabel', title: 'Last Name Label', type: 'string' }),
        defineField({ name: 'workEmailLabel', title: 'Work Email Label', type: 'string' }),
        defineField({ name: 'companyLabel', title: 'Company Name Label', type: 'string' }),
        defineField({ name: 'teamSizeLabel', title: 'Team Size Label', type: 'string' }),
        defineField({ name: 'currentHelpdeskLabel', title: 'Current Helpdesk Label', type: 'string' }),
        defineField({ name: 'messageLabel', title: 'Message / Notes Label', type: 'string' }),
        // Placeholders
        defineField({ name: 'firstNamePlaceholder', title: 'First Name Placeholder', type: 'string' }),
        defineField({ name: 'lastNamePlaceholder', title: 'Last Name Placeholder', type: 'string' }),
        defineField({ name: 'workEmailPlaceholder', title: 'Work Email Placeholder', type: 'string' }),
        defineField({ name: 'companyPlaceholder', title: 'Company Name Placeholder', type: 'string' }),
        defineField({ name: 'messagePlaceholder', title: 'Message Placeholder', type: 'text', rows: 2 }),
        // Select options
        defineField({
          name: 'teamSizeOptions',
          title: 'Team Size Options',
          type: 'array',
          description: 'Options shown in the Team Size dropdown',
          of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({
          name: 'currentHelpdeskOptions',
          title: 'Current Helpdesk Options',
          type: 'array',
          description: 'Options shown in the Current Helpdesk dropdown',
          of: [defineArrayMember({ type: 'string' })],
        }),
        // Submit button
        defineField({ name: 'submitLabel', title: 'Submit Button Label', type: 'string' }),
        // Privacy disclaimer
        defineField({ name: 'privacyText', title: 'Privacy Disclaimer Text', type: 'text', rows: 2,
          description: 'Shown below the submit button (without the link)' }),
        defineField({ name: 'privacyPolicyLabel', title: 'Privacy Policy Link Label', type: 'string' }),
        defineField({ name: 'privacyPolicyHref', title: 'Privacy Policy URL', type: 'string' }),
      ],
    }),

    // ── Success State ──────────────────────────────────────────────────────
    defineField({ name: 'successHeading', title: 'Success Heading', type: 'string', group: 'success',
      description: 'Shown after the form is submitted (e.g. "You\'re booked!")' }),
    defineField({ name: 'successBody', title: 'Success Body Text', type: 'text', rows: 3, group: 'success' }),
    defineField({ name: 'successCtaLabel', title: 'Success CTA Label', type: 'string', group: 'success' }),
    defineField({ name: 'successCtaHref', title: 'Success CTA URL', type: 'string', group: 'success' }),
    // Legacy field kept for backward compat — hidden in studio
    defineField({ name: 'formSuccessMessage', title: 'Form Success Message (legacy)', type: 'text', group: 'success', hidden: true }),

    // ── Benefits ───────────────────────────────────────────────────────────
    defineField({ name: 'benefitsSectionTitle', title: 'Benefits Section Title', type: 'string', group: 'benefits',
      description: 'Heading above the bullet list (e.g. "What you\'ll get from the demo")' }),
    defineField({
      name: 'benefits',
      title: 'Demo Benefits',
      description: 'List of what attendees will get from the demo.',
      type: 'array',
      group: 'benefits',
      of: [defineArrayMember({ type: 'string' })],
    }),

    // ── Testimonials ───────────────────────────────────────────────────────
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      group: 'benefits',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonial',
          title: 'Testimonial',
          fields: [
            defineField({ name: 'quote', title: 'Quote', type: 'text' }),
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'title', title: 'Job Title', type: 'string' }),
            defineField({ name: 'company', title: 'Company', type: 'string' }),
          ],
          preview: { select: { title: 'name', subtitle: 'quote' } },
        }),
      ],
    }),

    // ── Trust Badges ───────────────────────────────────────────────────────
    defineField({
      name: 'trustBadges',
      title: 'Trust Badges',
      description: 'Security / compliance badges shown below the testimonials. Upload an SVG or PNG as the icon, or leave icon empty to use the default shield.',
      type: 'array',
      group: 'benefits',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'trustBadge',
          title: 'Trust Badge',
          fields: [
            defineField({ name: 'label', title: 'Badge Label', type: 'string' }),
            defineField({
              name: 'icon',
              title: 'Icon Image (SVG or PNG)',
              type: 'image',
              description: 'Upload an SVG file for the badge icon. Leave empty to use the default shield icon.',
              options: { hotspot: false },
            }),
          ],
          preview: { select: { title: 'label', media: 'icon' } },
        }),
      ],
    }),

    // ── Page Builder ───────────────────────────────────────────────────────
    defineField({
      name: 'pageBuilder',
      title: 'Additional Sections',
      description: 'Add sections below the demo form (e.g. integrations, FAQ, testimonials).',
      type: 'array',
      group: 'pageBuilder',
      of: pageBuilderTypes,
    }),

    // ── SEO ────────────────────────────────────────────────────────────────
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    select: { status: 'status' },
    prepare: ({ status }: { status?: string }) => ({
      title: 'Request Demo Page',
      subtitle: `/request-demo  ·  ${status ?? 'published'}`,
    }),
  },
});
