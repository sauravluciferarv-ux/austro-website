import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'imageBoxBlock',
  title: 'Image Box',
  type: 'object',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string' }),
    defineField({
      name: 'image', title: 'Image', type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'link', title: 'Link URL', type: 'string' }),
    defineField({
      name: 'alignment', title: 'Alignment', type: 'string',
      options: { list: ['left', 'center', 'right'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'center',
    }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
    prepare: ({ title, media }: { title?: string; media?: any }) => ({ title: title ?? 'Image Box', media }),
  },
});
