import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365ComparisonSection',
  title: '⚖️ Comparison Table',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string', initialValue: 'Start Your Free Trial' }),
    defineField({ name: 'ctaHref', title: 'CTA URL', type: 'string', initialValue: '/pricing/' }),
    defineField({ name: 'col2Label', title: 'Column 2 Label', type: 'string', initialValue: 'Freshdesk' }),
    defineField({ name: 'col3Label', title: 'Column 3 Label', type: 'string', initialValue: 'Zendesk' }),
    defineField({
      name: 'rows',
      title: 'Comparison Rows',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'feature', title: 'Feature Name', type: 'string', validation: R => R.required() }),
          defineField({
            name: 'desk365',
            title: 'Desk365 Value',
            type: 'string',
            description: 'Use "true" for ✓ checkmark, "false" for ✗, or any text for partial support',
            initialValue: 'true',
          }),
          defineField({
            name: 'col2',
            title: 'Competitor 1 Value',
            type: 'string',
            description: 'Use "true" for ✓ checkmark, "false" for ✗, or any text',
          }),
          defineField({
            name: 'col3',
            title: 'Competitor 2 Value',
            type: 'string',
            description: 'Use "true" for ✓ checkmark, "false" for ✗, or any text',
          }),
        ],
        preview: { select: { title: 'feature', subtitle: 'desk365' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: '⚖️ Comparison Table', subtitle: title }),
  },
});
