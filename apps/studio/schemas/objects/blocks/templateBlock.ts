import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'templateBlock',
  title: 'Reusable Template',
  type: 'object',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({
      name: 'template',
      title: 'Section Template',
      type: 'reference',
      to: [{ type: 'sectionTemplate' }],
      validation: R => R.required(),
    }),
  ],
  preview: {
    select: { title: 'template.name' },
    prepare: ({ title }: { title?: string }) => ({ title: `Template: ${title ?? '—'}` }),
  },
});
