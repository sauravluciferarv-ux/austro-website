import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'htmlBlock',
  title: 'HTML Block',
  type: 'object',
  description: '⚠️ Admin only — raw HTML is rendered as-is. Do not use for untrusted content.',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string' }),
    defineField({
      name: 'html',
      title: 'HTML Code',
      type: 'text',
      rows: 10,
      description: '⚠️ Raw HTML. Inline scripts are blocked by Content Security Policy unless intentionally enabled.',
    }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4 }),
  ],
  preview: {
    prepare: () => ({ title: 'HTML Block' }),
  },
});
