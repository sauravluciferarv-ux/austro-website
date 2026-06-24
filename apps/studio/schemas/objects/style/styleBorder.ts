import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'styleBorder',
  title: 'Border & Shadow',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: 'borderWidth',  title: 'Border Width',  type: 'string', placeholder: 'e.g. 1px or 0 0 2px 0' }),
    defineField({
      name: 'borderStyle',
      title: 'Border Style',
      type: 'string',
      options: { list: ['none', 'solid', 'dashed', 'dotted'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'none',
    }),
    defineField({ name: 'borderColor',  title: 'Border Color',  type: 'string', placeholder: '#e5e7eb or rgba(0,0,0,0.1)' }),
    defineField({ name: 'borderRadius', title: 'Border Radius', type: 'string', placeholder: 'e.g. 8px, 50%, or 4px 8px' }),
    defineField({ name: 'boxShadow',    title: 'Box Shadow',    type: 'string', placeholder: 'e.g. 0 4px 16px rgba(0,0,0,0.12)' }),
  ],
});
