import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365ComparisonSection',
  title: 'Comparison Table',
  type: 'object',
  groups: [
    { name: 'style',      title: 'Style'      },
    { name: 'responsive', title: 'Responsive' },
    { name: 'advanced',   title: 'Advanced'   },
  ],
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
      description: 'Write full selectors like .d365-compare { background: #fff; } or bare CSS properties.' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: 'Comparison Table', subtitle: title }),
  },
});
