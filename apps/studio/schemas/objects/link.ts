import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: R => R.required() }),
    defineField({ name: 'href', title: 'URL', type: 'string', validation: R => R.required() }),
    defineField({ name: 'isExternal', title: 'Open in new tab', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
});
