import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'loopGridBlock',
  title: 'Loop Grid',
  type: 'object',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string' }),
    defineField({
      name: 'source', title: 'Content Source', type: 'string',
      options: { list: ['testimonials', 'blogPosts', 'custom'], layout: 'radio' },
      initialValue: 'custom',
    }),
    defineField({
      name: 'items',
      title: 'Custom Items',
      type: 'array',
      hidden: ({ parent }: { parent?: any }) => parent?.source !== 'custom',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] },
            { name: 'link', title: 'Link', type: 'string' },
          ],
          preview: { select: { title: 'title', media: 'image' } },
        },
      ],
    }),
    defineField({ name: 'itemCount', title: 'Item Count (for dynamic sources)', type: 'number', initialValue: 6 }),
    defineField({
      name: 'columns', title: 'Columns', type: 'string',
      options: { list: ['1', '2', '3', '4'], layout: 'radio', direction: 'horizontal' },
      initialValue: '3',
    }),
    defineField({
      name: 'gap', title: 'Gap', type: 'string',
      options: { list: ['none', 'sm', 'md', 'lg'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'md',
    }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { source: 'source', cols: 'columns' },
    prepare: ({ source, cols }: { source?: string; cols?: string }) => ({
      title: `Loop Grid · ${source ?? 'custom'} · ${cols ?? '3'} cols`,
    }),
  },
});
