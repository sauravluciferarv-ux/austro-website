import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'spacerBlock',
  title: 'Spacer',
  type: 'object',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string' }),
    defineField({ name: 'height', title: 'Height (desktop)', type: 'string', description: 'CSS height e.g. 40px, 2rem', initialValue: '40px' }),
    defineField({ name: 'heightMobile', title: 'Height (mobile)', type: 'string', description: 'Optional mobile height override', initialValue: '20px' }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'height' },
    prepare: ({ title }: { title?: string }) => ({ title: `Spacer ${title ?? ''}` }),
  },
});
