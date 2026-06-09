import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'logosSection',
  title: 'Logos / Trusted By',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'e.g. "Trusted by 6,500+ companies worldwide"',
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
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
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: 'Logos', subtitle: title }),
  },
});
