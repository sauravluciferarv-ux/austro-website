import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sectionTemplate',
  title: 'Section Template',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Template Name',
      type: 'string',
      description: 'Internal label e.g. "Hero — Free Trial CTA"',
      validation: R => R.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'string',
      description: 'Optional: where is this template used?',
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'pageSection',
      description: 'The reusable section content.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'notes' },
  },
});
