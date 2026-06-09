import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'featuresSection',
  title: 'Features Section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'Small label above the heading, e.g. "Everything you need"' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2 }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
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
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: 'Features', subtitle: title }),
  },
});
