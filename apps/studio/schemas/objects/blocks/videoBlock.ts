import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'videoBlock',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string' }),
    defineField({
      name: 'url', title: 'Video URL', type: 'string',
      description: 'YouTube or Vimeo URL',
      validation: R => R.required(),
    }),
    defineField({ name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'autoplay', title: 'Autoplay', type: 'boolean', initialValue: false }),
    defineField({ name: 'muted', title: 'Muted', type: 'boolean', initialValue: false }),
    defineField({ name: 'controls', title: 'Show Controls', type: 'boolean', initialValue: true }),
    defineField({
      name: 'aspectRatio', title: 'Aspect Ratio', type: 'string',
      options: { list: ['16/9', '4/3', '1/1', '9/16'], layout: 'radio', direction: 'horizontal' },
      initialValue: '16/9',
    }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { title: 'url' },
    prepare: ({ title }: { title?: string }) => ({ title: title ?? 'Video' }),
  },
});
