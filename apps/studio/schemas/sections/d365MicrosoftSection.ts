import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365MicrosoftSection',
  title: '🪟 Microsoft Ecosystem Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 3 }),
    defineField({ name: 'linkLabel', title: 'Link Label', type: 'string' }),
    defineField({ name: 'linkHref', title: 'Link URL', type: 'string' }),
    defineField({ name: 'heroImage', title: 'Section Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroImageAlt', title: 'Image Alt Text', type: 'string' }),
    defineField({
      name: 'cards',
      title: 'Feature Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          defineField({ name: 'icon', title: 'Icon Image', type: 'image', options: { hotspot: true } }),
        ],
        preview: { select: { title: 'title', media: 'icon' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: '🪟 Microsoft Section', subtitle: title }),
  },
});
