import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ctaButton',
  title: 'CTA Button',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'href', title: 'URL', type: 'string' }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Filled', value: 'filled' },
          { title: 'Outline', value: 'outline' },
          { title: 'Ghost (text only)', value: 'ghost' },
        ],
      },
      initialValue: 'filled',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Dark / Navy', value: 'dark' },
          { title: 'White (for dark backgrounds)', value: 'white' },
        ],
      },
      initialValue: 'blue',
    }),
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
});
