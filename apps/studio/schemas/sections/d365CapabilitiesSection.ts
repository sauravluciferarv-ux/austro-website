import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365CapabilitiesSection',
  title: 'Capabilities Grid',
  type: 'object',
  groups: [
    { name: 'style',      title: 'Style'      },
    { name: 'responsive', title: 'Responsive' },
    { name: 'advanced',   title: 'Advanced'   },
  ],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 2 }),
    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string', initialValue: 'Explore all features' }),
    defineField({ name: 'ctaHref', title: 'CTA URL', type: 'string', initialValue: '/features/' }),
    defineField({
      name: 'capabilities',
      title: 'Capability Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          defineField({ name: 'iconImage', title: 'Icon Image (upload)', type: 'image', options: { hotspot: true }, description: 'Upload a custom icon. If provided, overrides the built-in SVG icon.' }),
          defineField({
            name: 'icon',
            title: 'Built-in Icon (fallback)',
            type: 'string',
            description: 'Used when no icon image is uploaded. Keys: inbox | clock | book | bell | chat | bolt | users | chart | building',
            options: {
              list: [
                { title: 'Inbox (Unified Inbox)', value: 'inbox' },
                { title: 'Clock (SLAs)', value: 'clock' },
                { title: 'Book (Knowledge Base)', value: 'book' },
                { title: 'Bell (Notifications)', value: 'bell' },
                { title: 'Chat (Canned Responses)', value: 'chat' },
                { title: 'Bolt (Automations)', value: 'bolt' },
                { title: 'Users (Round Robin)', value: 'users' },
                { title: 'Chart (Reports)', value: 'chart' },
                { title: 'Building (Multi-Department)', value: 'building' },
              ],
            },
          }),
        ],
        preview: { select: { title: 'title', subtitle: 'description', media: 'iconImage' } },
      }],
    }),
    // ── Visual Editor Style Controls ──────────────────────────────────────────
    defineField({ name: 'background', title: 'Background',      type: 'styleBackground', group: 'style' }),
    defineField({ name: 'border',     title: 'Border & Shadow', type: 'styleBorder',     group: 'style' }),
    defineField({ name: 'spacing',    title: 'Spacing',         type: 'styleSpacing',    group: 'style' }),
    defineField({ name: 'size',       title: 'Height / Size',   type: 'styleSize',       group: 'style' }),
    defineField({ name: 'sectionResponsive', title: 'Responsive Controls', type: 'styleResponsive', group: 'responsive' }),
    defineField({ name: 'sectionId',    title: 'Section HTML ID',  type: 'string', group: 'advanced' }),
    defineField({ name: 'sectionClass', title: 'Extra CSS Class',  type: 'string', group: 'advanced',
      description: 'Added alongside the built-in section class for custom CSS targeting.' }),
    defineField({ name: 'customCss',    title: 'Custom CSS',       type: 'text', rows: 8, group: 'advanced',
      description: 'Write full selectors like .d365-capabilities { background: #f9fafb; } or bare CSS properties.' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: 'Capabilities', subtitle: title }),
  },
});
