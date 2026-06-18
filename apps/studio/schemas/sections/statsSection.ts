import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'statsSection',
  title: 'Stats Section',
  type: 'object',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'advanced', title: 'Custom Code' },
  ],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', group: 'content' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2, group: 'content' }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. "99.9%" or "6,500+"', validation: R => R.required() }),
          defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "Uptime SLA"', validation: R => R.required() }),
          defineField({ name: 'description', title: 'Description', type: 'string', description: 'Optional short supporting text' }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
    }),
    defineField({
      name: 'customCode',
      title: 'Custom Code',
      type: 'customCode',
      group: 'advanced',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Stats' }),
  },
});
