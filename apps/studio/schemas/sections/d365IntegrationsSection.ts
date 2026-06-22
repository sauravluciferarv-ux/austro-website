import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365IntegrationsSection',
  title: '🔌 Integrations Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 3 }),
    defineField({
      name: 'cards',
      title: 'Integration Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          defineField({ name: 'icon', title: 'Icon Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'linkLabel', title: 'Link Label', type: 'string' }),
          defineField({ name: 'linkHref', title: 'Link URL', type: 'string' }),
        ],
        preview: { select: { title: 'title', media: 'icon' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: '🔌 Integrations', subtitle: title }),
  },
});
