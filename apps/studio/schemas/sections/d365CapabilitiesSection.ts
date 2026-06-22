import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365CapabilitiesSection',
  title: '⚡ Capabilities Grid',
  type: 'object',
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
          defineField({
            name: 'icon',
            title: 'Icon Name',
            type: 'string',
            description: 'Icon key: inbox | clock | book | bell | chat | bolt | users | chart | building',
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
        preview: { select: { title: 'title', subtitle: 'description' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: '⚡ Capabilities', subtitle: title }),
  },
});
