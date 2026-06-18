import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'dividerBlock',
  title: 'Divider',
  type: 'object',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string' }),
    defineField({
      name: 'style', title: 'Style', type: 'string',
      options: { list: ['solid', 'dashed', 'dotted', 'none'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'solid',
    }),
    defineField({ name: 'color', title: 'Color', type: 'string', description: 'CSS color e.g. #e5e7eb', initialValue: '#e5e7eb' }),
    defineField({ name: 'thickness', title: 'Thickness', type: 'string', description: 'e.g. 1px', initialValue: '1px' }),
    defineField({ name: 'width', title: 'Width', type: 'string', initialValue: '100%' }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4 }),
  ],
  preview: {
    prepare: () => ({ title: 'Divider' }),
  },
});
