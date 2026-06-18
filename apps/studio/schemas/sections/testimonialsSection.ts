import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'object',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'advanced', title: 'Custom Code' },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      group: 'content',
      description: 'Default: "Don\'t just take our word for it, see why our customers choose us!"',
    }),
    defineField({
      name: 'subheading',
      title: 'Section Subheading',
      type: 'string',
      group: 'content',
      description: 'Default: "Hear from real people who have experienced the difference."',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      group: 'content',
      description: 'Leave empty to show the built-in fallback cards.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote Headline',
              type: 'string',
              description: 'Bold line at the top of the card. E.g. "A very good system all round."',
              validation: R => R.required(),
            }),
            defineField({
              name: 'body',
              title: 'Testimonial Body',
              type: 'text',
              rows: 4,
              description: 'Full review text shown beneath the headline.',
              validation: R => R.required(),
            }),
            defineField({
              name: 'authorName',
              title: 'Author Name',
              type: 'string',
              validation: R => R.required(),
            }),
            defineField({
              name: 'authorTitle',
              title: 'Author Title & Company',
              type: 'string',
              description: 'E.g. "Network Specialist, CSG"',
            }),
            defineField({
              name: 'industry',
              title: 'Industry Label',
              type: 'string',
              description: 'Shown bottom-right when no company logo is uploaded. E.g. "Biotechnology"',
            }),
            defineField({
              name: 'companyLogo',
              title: 'Company Logo',
              type: 'image',
              description: 'Upload a dark or full-colour logo — the frontend renders it white automatically.',
              options: { hotspot: false },
            }),
          ],
          preview: {
            select: {
              title:    'authorName',
              subtitle: 'quote',
              media:    'companyLogo',
            },
            prepare: ({ title, subtitle, media }) => ({
              title:    title ?? 'Testimonial',
              subtitle: subtitle,
              media,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'customCode',
      title: 'Custom Code',
      type: 'customCode',
      group: 'advanced',
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }) => ({
      title:    'Testimonials Section',
      subtitle: heading ?? '(uses fallback cards)',
    }),
  },
});
