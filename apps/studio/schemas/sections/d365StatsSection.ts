import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365StatsSection',
  title: '📊 Stats Bar',
  type: 'object',
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'number', title: 'Number / Value', type: 'string', validation: R => R.required(), description: 'e.g. "7,000+" or "4.9"' }),
          defineField({ name: 'label', title: 'Label', type: 'string', validation: R => R.required() }),
        ],
        preview: { select: { title: 'number', subtitle: 'label' } },
      }],
    }),
  ],
  preview: {
    prepare: () => ({ title: '📊 Stats Bar' }),
  },
});
