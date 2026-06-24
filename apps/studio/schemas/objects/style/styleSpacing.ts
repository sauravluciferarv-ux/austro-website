import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'styleSpacing',
  title: 'Spacing',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: 'paddingTop',    title: 'Padding Top',    type: 'string', placeholder: 'e.g. 48px or 3rem' }),
    defineField({ name: 'paddingRight',  title: 'Padding Right',  type: 'string', placeholder: 'e.g. 24px' }),
    defineField({ name: 'paddingBottom', title: 'Padding Bottom', type: 'string', placeholder: 'e.g. 48px or 3rem' }),
    defineField({ name: 'paddingLeft',   title: 'Padding Left',   type: 'string', placeholder: 'e.g. 24px' }),
    defineField({ name: 'marginTop',     title: 'Margin Top',     type: 'string', placeholder: 'e.g. 32px or 2rem' }),
    defineField({ name: 'marginRight',   title: 'Margin Right',   type: 'string', placeholder: 'e.g. auto' }),
    defineField({ name: 'marginBottom',  title: 'Margin Bottom',  type: 'string', placeholder: 'e.g. 32px or 2rem' }),
    defineField({ name: 'marginLeft',    title: 'Margin Left',    type: 'string', placeholder: 'e.g. auto' }),
  ],
});
