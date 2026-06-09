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
      description: 'Internal label e.g. "Hero — Free Trial CTA" or "Bottom CTA — Dark"',
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
      type: 'array',
      description: 'Add exactly one section — this becomes the reusable template.',
      validation: R => R.required().min(1).max(1),
      of: [
        { type: 'heroSection' },
        { type: 'logosSection' },
        { type: 'featuresSection' },
        { type: 'statsSection' },
        { type: 'ctaSection' },
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'notes' },
  },
});
