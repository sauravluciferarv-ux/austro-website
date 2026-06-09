import { defineType, defineField } from 'sanity';

const dropdownItem = {
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: R => R.required() }),
    defineField({ name: 'href', title: 'URL', type: 'string', validation: R => R.required() }),
    defineField({ name: 'description', title: 'Description', type: 'string' }),
    defineField({
      name: 'iconBg',
      title: 'Icon Background Color',
      type: 'string',
      description: 'Tailwind class e.g. bg-blue-50',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Image',
      type: 'image',
      description: '32×32px icon (optional)',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
};

const solutionItem = {
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: R => R.required() }),
    defineField({ name: 'href', title: 'URL', type: 'string', validation: R => R.required() }),
    defineField({ name: 'description', title: 'Short Description', type: 'string' }),
    defineField({
      name: 'icon',
      title: 'Icon Image',
      type: 'image',
      description: '32×32px icon (optional)',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'description' },
  },
};

const navLink = {
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: R => R.required() }),
    defineField({ name: 'href', title: 'URL', type: 'string', validation: R => R.required() }),
    defineField({ name: 'isExternal', title: 'Open in new tab', type: 'boolean', initialValue: false }),
    defineField({
      name: 'dropdown',
      title: 'Dropdown Items',
      type: 'array',
      of: [dropdownItem],
      description: 'Leave empty for a plain link (no dropdown)',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
};

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'header', title: 'Header' },
    { name: 'solutions', title: 'Solutions Mega Menu' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    // ─── HEADER ────────────────────────────────────────────────────────
    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      group: 'header',
      fields: [
        defineField({
          name: 'logo',
          title: 'Logo',
          type: 'image',
          options: { hotspot: true },
          description: 'SVG or PNG logo — falls back to /desk365-logo.png',
        }),
        defineField({ name: 'logoAlt', title: 'Logo Alt Text', type: 'string', initialValue: 'Desk365.io' }),
        defineField({
          name: 'navLinks',
          title: 'Navigation Links',
          type: 'array',
          of: [navLink],
        }),
        defineField({
          name: 'ctaLabel',
          title: 'Primary CTA Label',
          type: 'string',
          initialValue: 'Free Trial',
        }),
        defineField({
          name: 'ctaHref',
          title: 'Primary CTA URL',
          type: 'string',
          initialValue: '/pricing/',
        }),
        defineField({
          name: 'ctaStyle',
          title: 'Primary CTA Style',
          type: 'string',
          options: { list: ['primary', 'outline'] },
          initialValue: 'primary',
        }),
        defineField({
          name: 'secondaryCtaLabel',
          title: 'Secondary CTA Label',
          type: 'string',
          initialValue: 'Book a Demo',
        }),
        defineField({
          name: 'secondaryCtaHref',
          title: 'Secondary CTA URL',
          type: 'string',
          initialValue: '/request-demo/',
        }),
      ],
    }),

    // ─── SOLUTIONS MEGA MENU ──────────────────────────────────────────
    defineField({
      name: 'solutionsMenu',
      title: 'Solutions Mega Menu',
      type: 'object',
      group: 'solutions',
      description: 'Two-column layout with Industries, Teams, and a featured video card',
      fields: [
        defineField({
          name: 'industries',
          title: 'Industries',
          type: 'array',
          of: [solutionItem],
        }),
        defineField({
          name: 'industriesExploreLabel',
          title: 'Explore All Industries Label',
          type: 'string',
          initialValue: 'Explore All Industries',
        }),
        defineField({
          name: 'industriesExploreHref',
          title: 'Explore All Industries URL',
          type: 'string',
          initialValue: '/industries/',
        }),
        defineField({
          name: 'teams',
          title: 'Teams',
          type: 'array',
          of: [solutionItem],
        }),
        defineField({
          name: 'videoCard',
          title: 'Featured Video Card',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Getting Started with Desk365: Your Modern Helpdesk Ticketing System' }),
            defineField({ name: 'href', title: 'Video URL', type: 'string', initialValue: '/videos/' }),
            defineField({ name: 'linkLabel', title: 'Link Label', type: 'string', initialValue: 'Watch Video' }),
            defineField({ name: 'thumbnail', title: 'Thumbnail', type: 'image' }),
          ],
        }),
      ],
    }),

    // ─── FOOTER ────────────────────────────────────────────────────────
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'footer',
      fields: [
        defineField({
          name: 'logo',
          title: 'Footer Logo',
          type: 'image',
          description: 'Light/white version of the logo for dark background',
        }),
        defineField({ name: 'logoAlt', title: 'Footer Logo Alt Text', type: 'string', initialValue: 'Desk365' }),
        defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
        defineField({
          name: 'columns',
          title: 'Link Columns',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'heading', title: 'Column Heading', type: 'string' }),
              defineField({
                name: 'links',
                title: 'Links',
                type: 'array',
                of: [{ type: 'link' }],
              }),
            ],
            preview: { select: { title: 'heading' } },
          }],
        }),
        defineField({
          name: 'legalLinks',
          title: 'Legal Links',
          type: 'array',
          of: [{ type: 'link' }],
        }),
        defineField({
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          initialValue: '© 2026 Kani Technologies Inc. All rights reserved.',
        }),
        defineField({
          name: 'badgeImages',
          title: 'Badge Images (G2, Capterra, etc.)',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', title: 'Badge Image', type: 'image', options: { hotspot: false } }),
              defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: R => R.required() }),
              defineField({ name: 'href', title: 'Link URL', type: 'string', validation: R => R.required() }),
              defineField({ name: 'label', title: 'Accessible Label', type: 'string', description: 'e.g. "Desk365 reviews on G2"' }),
            ],
            preview: { select: { title: 'alt', subtitle: 'href' } },
          }],
        }),
        defineField({
          name: 'socialLinks',
          title: 'Social Links',
          type: 'array',
          of: [{ type: 'socialLink' }],
        }),
        defineField({
          name: 'languages',
          title: 'Language Switcher',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'label', title: 'Language Name', type: 'string' }),
              defineField({ name: 'code', title: 'Language Code', type: 'string', description: 'e.g. en, de, fr' }),
              defineField({ name: 'href', title: 'URL', type: 'string', description: 'e.g. /de/' }),
            ],
            preview: { select: { title: 'label', subtitle: 'code' } },
          }],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Navigation', subtitle: 'Global header & footer' }),
  },
});
