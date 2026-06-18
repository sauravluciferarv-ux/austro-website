import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'iconBoxBlock',
  title: 'Icon Box',
  type: 'object',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string' }),
    defineField({ name: 'icon', title: 'Icon (SVG or image)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'link', title: 'Link URL', type: 'string' }),
    defineField({
      name: 'alignment', title: 'Alignment', type: 'string',
      options: { list: ['left', 'center', 'right'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'left',
    }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { title: 'title', media: 'icon' },
    prepare: ({ title, media }: { title?: string; media?: any }) => ({ title: title ?? 'Icon Box', media }),
  },
});
