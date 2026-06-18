import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'logosSection',
  title: 'Logos / Trusted By',
  type: 'object',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'advanced', title: 'Custom Code' },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
      description: 'e.g. "Trusted by 6,500+ companies worldwide"',
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Company Name', type: 'string', validation: R => R.required() }),
          defineField({ name: 'image', title: 'Logo Image', type: 'image', description: 'Monochrome/grayscale PNG or SVG recommended' }),
          defineField({ name: 'href', title: 'Link URL (optional)', type: 'string' }),
        ],
        preview: { select: { title: 'name', media: 'image' } },
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
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: 'Logos', subtitle: title }),
  },
});
