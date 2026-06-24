import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365WhyChooseSection',
  title: 'Why Choose Section',
  type: 'object',
  groups: [
    { name: 'style',      title: 'Style'      },
    { name: 'responsive', title: 'Responsive' },
    { name: 'advanced',   title: 'Advanced'   },
  ],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 3 }),
    defineField({ name: 'awardImage', title: 'Award Badge Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'awardText', title: 'Award Text', type: 'string' }),
    defineField({ name: 'ctaLabel', title: 'CTA Button Label', type: 'string', description: 'e.g. "Start Your Free Trial"' }),
    defineField({ name: 'ctaHref', title: 'CTA Button Link', type: 'string', description: 'e.g. "/pricing/"' }),
    defineField({
      name: 'cards',
      title: 'Why-Choose Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          defineField({ name: 'iconImage', title: 'Icon Image (upload)', type: 'image', options: { hotspot: true }, description: 'Upload a custom icon image. If provided, overrides the built-in SVG icon.' }),
          defineField({
            name: 'icon',
            title: 'Built-in Icon (fallback)',
            type: 'string',
            description: 'Used when no icon image is uploaded.',
            options: { list: [
              { title: 'Lightning (Setup)', value: 'lightning' },
              { title: 'Thumbs Up (Easy)', value: 'thumb' },
              { title: 'Chat (Support)', value: 'chat' },
              { title: 'Dollar (ROI)', value: 'dollar' },
            ]},
          }),
        ],
        preview: { select: { title: 'title', subtitle: 'description', media: 'iconImage' } },
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
      description: 'Write full selectors like .d365-why-choose { background: #fff; } or bare CSS properties.' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: 'Why Choose', subtitle: title }),
  },
});
