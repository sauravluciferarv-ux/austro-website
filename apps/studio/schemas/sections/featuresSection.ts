import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'featuresSection',
  title: 'Features Section',
  type: 'object',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'advanced', title: 'Custom Code' },
  ],
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'content', description: 'Small label above the heading, e.g. "Everything you need"' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string', group: 'content' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2, group: 'content' }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'icon', title: 'Icon', type: 'image', description: '32×32px SVG or PNG icon' }),
          defineField({ name: 'heading', title: 'Feature Name', type: 'string', validation: R => R.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'heading', subtitle: 'description', media: 'icon' } },
      }],
    }),
    defineField({
      name: 'customCode',
      title: 'Custom Code',
      type: 'customCode',
      group: 'advanced',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: 'Features', subtitle: title }),
  },
});
