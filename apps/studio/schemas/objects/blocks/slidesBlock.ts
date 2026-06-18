import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'slidesBlock',
  title: 'Slides',
  type: 'object',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string' }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            {
              name: 'image', title: 'Background/Slide Image', type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', type: 'string' }],
            },
            { name: 'buttonText', title: 'Button Text', type: 'string' },
            { name: 'buttonHref', title: 'Button Link', type: 'string' },
          ],
          preview: { select: { title: 'title', media: 'image' } },
        },
      ],
      validation: R => R.required().min(1),
    }),
    defineField({ name: 'autoplay', title: 'Autoplay', type: 'boolean', initialValue: false }),
    defineField({ name: 'showDots', title: 'Show Dots', type: 'boolean', initialValue: true }),
    defineField({ name: 'showArrows', title: 'Show Arrows', type: 'boolean', initialValue: true }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { slides: 'slides' },
    prepare: ({ slides }: { slides?: any[] }) => ({ title: `Slides (${slides?.length ?? 0})` }),
  },
});
