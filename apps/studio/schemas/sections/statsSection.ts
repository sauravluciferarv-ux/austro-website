import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'statsSection',
  title: 'Stats Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2 }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
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
  ],
  preview: {
    prepare: () => ({ title: 'Stats' }),
  },
});
