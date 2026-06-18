import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'imageBlock',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string' }),
    defineField({
      name: 'image', title: 'Image', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
      validation: R => R.required(),
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'link', title: 'Link URL', type: 'string' }),
    defineField({ name: 'openInNewTab', title: 'Open in New Tab', type: 'boolean', initialValue: false }),
    defineField({ name: 'width', title: 'Width', type: 'string', description: 'CSS width e.g. 100%, 400px', initialValue: '100%' }),
    defineField({
      name: 'alignment', title: 'Alignment', type: 'string',
      options: { list: ['left', 'center', 'right'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'left',
    }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4 }),
    defineField({ name: 'hideOnMobile', title: 'Hide on Mobile', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'image.alt', media: 'image' },
    prepare: ({ title, media }: { title?: string; media?: any }) => ({ title: title ?? 'Image', media }),
  },
});
