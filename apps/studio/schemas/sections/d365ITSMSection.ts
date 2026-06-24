import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365ITSMSection',
  title: 'Helpdesk + ITSM Section',
  type: 'object',
  groups: [
    { name: 'style',      title: 'Style'      },
    { name: 'responsive', title: 'Responsive' },
    { name: 'advanced',   title: 'Advanced'   },
  ],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 3 }),
    defineField({
      name: 'cards',
      title: 'ITSM Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
          defineField({ name: 'linkLabel', title: 'Link Label', type: 'string' }),
          defineField({ name: 'linkHref', title: 'Link URL', type: 'string' }),
          defineField({ name: 'image', title: 'Card Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'imageAlt', title: 'Image Alt', type: 'string' }),
        ],
        preview: { select: { title: 'title', media: 'image' } },
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
      description: 'Write full selectors like .d365-itsm { padding: 80px 0; } or bare CSS properties.' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: 'ITSM Section', subtitle: title }),
  },
});
