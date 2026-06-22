import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365TrustBarSection',
  title: '🏆 Trust Bar (Logo Carousel)',
  type: 'object',
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
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: '🏆 Trust Bar', subtitle: title }),
  },
});
