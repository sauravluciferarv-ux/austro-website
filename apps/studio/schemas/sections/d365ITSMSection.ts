import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365ITSMSection',
  title: '🖥️ Helpdesk + ITSM Section',
  type: 'object',
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
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: '🖥️ ITSM Section', subtitle: title }),
  },
});
