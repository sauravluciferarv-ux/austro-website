import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365FinalCtaSection',
  title: 'Final CTA Section',
  type: 'object',
  groups: [
    { name: 'style',      title: 'Style'      },
    { name: 'responsive', title: 'Responsive' },
    { name: 'advanced',   title: 'Advanced'   },
  ],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 2 }),
    defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'ctaButton' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'ctaButton' }),
    defineField({ name: 'footnote', title: 'Footnote', type: 'string', description: 'e.g. "21-day free trial · No credit card required"' }),
    defineField({ name: 'logoImage', title: 'CTA Visual / Logo Image', type: 'image', options: { hotspot: true }, description: 'Large graphic displayed on the right side of the CTA section. Recommended: 500×500 PNG on transparent background.' }),
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
      description: 'Write full selectors like .d365-final-cta { background: linear-gradient(...); } or bare CSS properties.' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: 'Final CTA', subtitle: title }),
  },
});
