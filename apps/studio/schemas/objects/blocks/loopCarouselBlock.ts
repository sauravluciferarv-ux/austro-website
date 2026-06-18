import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'loopCarouselBlock',
  title: 'Loop Carousel',
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
    defineField({ name: 'itemCount', title: 'Item Count', type: 'number', initialValue: 6 }),
    defineField({ name: 'autoplay', title: 'Autoplay', type: 'boolean', initialValue: false }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4 }),
  ],
  preview: {
    prepare: () => ({ title: 'Loop Carousel' }),
  },
});
