import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365TrustBarSection',
  title: 'Trust Bar (Logo Carousel)',
  type: 'object',
  groups: [
    { name: 'style',      title: 'Style'      },
    { name: 'responsive', title: 'Responsive' },
    { name: 'advanced',   title: 'Advanced'   },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Trusted by 7,000+ businesses around the world',
    }),
    defineField({
      name: 'logosRow1',
      title: 'Logos — Row 1',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Company Name', type: 'string', validation: R => R.required() }),
          defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'href', title: 'Link (optional)', type: 'string' }),
          defineField({ name: 'badge', title: 'Badge Label (optional)', type: 'string', description: 'e.g. "Case study"' }),
        ],
        preview: { select: { title: 'name', media: 'logo' } },
      }],
    }),
    defineField({
      name: 'logosRow2',
      title: 'Logos — Row 2',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Company Name', type: 'string', validation: R => R.required() }),
          defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'href', title: 'Link (optional)', type: 'string' }),
          defineField({ name: 'badge', title: 'Badge Label (optional)', type: 'string' }),
        ],
        preview: { select: { title: 'name', media: 'logo' } },
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
      description: 'Write full selectors like .d365-trust-bar { padding: 40px 0; } or bare CSS properties.' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: 'Trust Bar', subtitle: title }),
  },
});
