import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'styleSize',
  title: 'Size',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: 'width',     title: 'Width',      type: 'string', placeholder: 'e.g. 100%, 400px, auto' }),
    defineField({ name: 'maxWidth',  title: 'Max Width',  type: 'string', placeholder: 'e.g. 640px or 100%' }),
    defineField({ name: 'minWidth',  title: 'Min Width',  type: 'string', placeholder: 'e.g. 200px' }),
    defineField({ name: 'height',    title: 'Height',     type: 'string', placeholder: 'e.g. auto, 400px, 100vh' }),
    defineField({ name: 'minHeight', title: 'Min Height', type: 'string', placeholder: 'e.g. 300px or 50vh' }),
    defineField({ name: 'maxHeight', title: 'Max Height', type: 'string', placeholder: 'e.g. 800px' }),
  ],
});
