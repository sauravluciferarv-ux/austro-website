import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365ChannelTabsSection',
  title: '📡 Channel Tabs',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Section Body', type: 'text', rows: 2 }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Tab Label', type: 'string', validation: R => R.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          defineField({ name: 'image', title: 'Tab Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string' }),
        ],
        preview: { select: { title: 'label', media: 'image' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: '📡 Channel Tabs', subtitle: title }),
  },
});
