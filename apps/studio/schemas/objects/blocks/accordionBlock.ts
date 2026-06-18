import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'accordionBlock',
  title: 'Accordion',
  type: 'object',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Question / Title', type: 'string', validation: (R: any) => R.required() },
            { name: 'content', title: 'Answer / Content', type: 'array', of: [{ type: 'block' }] },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
      validation: R => R.required().min(1),
    }),
    defineField({ name: 'openFirst', title: 'Open First Item by Default', type: 'boolean', initialValue: true }),
    defineField({ name: 'allowMultiple', title: 'Allow Multiple Open', type: 'boolean', initialValue: false }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { items: 'items' },
    prepare: ({ items }: { items?: any[] }) => ({ title: `Accordion (${items?.length ?? 0} items)` }),
  },
});
