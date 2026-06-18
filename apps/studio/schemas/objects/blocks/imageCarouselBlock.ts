import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'imageCarouselBlock',
  title: 'Image Carousel',
  type: 'object',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string' }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
      validation: R => R.required().min(1),
    }),
    defineField({ name: 'autoplay', title: 'Autoplay', type: 'boolean', initialValue: false }),
    defineField({ name: 'autoplayInterval', title: 'Autoplay Interval (ms)', type: 'number', initialValue: 3000 }),
    defineField({ name: 'showDots', title: 'Show Dots', type: 'boolean', initialValue: true }),
    defineField({ name: 'showArrows', title: 'Show Arrows', type: 'boolean', initialValue: true }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { images: 'images' },
    prepare: ({ images }: { images?: any[] }) => ({ title: `Image Carousel (${images?.length ?? 0} images)` }),
  },
});
