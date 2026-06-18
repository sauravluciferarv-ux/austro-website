import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'buttonBlock',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string' }),
    defineField({ name: 'text', title: 'Button Text', type: 'string', validation: R => R.required() }),
    defineField({ name: 'href', title: 'Link URL', type: 'string', validation: R => R.required() }),
    defineField({
      name: 'style', title: 'Style', type: 'string',
      options: { list: ['primary', 'secondary', 'outline', 'ghost', 'link'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'primary',
    }),
    defineField({
      name: 'size', title: 'Size', type: 'string',
      options: { list: ['sm', 'md', 'lg'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'md',
    }),
    defineField({
      name: 'alignment', title: 'Alignment', type: 'string',
      options: { list: ['left', 'center', 'right'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'left',
    }),
    defineField({ name: 'openInNewTab', title: 'Open in New Tab', type: 'boolean', initialValue: false }),
    defineField({ name: 'icon', title: 'Icon (SVG or icon name)', type: 'string' }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { title: 'text', subtitle: 'style' },
    prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({ title: title ?? 'Button', subtitle }),
  },
});
