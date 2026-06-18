import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'shortcodeBlock',
  title: 'Embed / Shortcode',
  type: 'object',
  description: 'Paste an embed code (iframe, widget, etc.)',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string' }),
    defineField({
      name: 'code',
      title: 'Embed Code',
      type: 'text',
      rows: 8,
      description: 'Paste iframe or embed snippet here.',
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4 }),
  ],
  preview: {
    prepare: () => ({ title: 'Embed / Shortcode' }),
  },
});
