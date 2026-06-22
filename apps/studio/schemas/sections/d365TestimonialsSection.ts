import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365TestimonialsSection',
  title: '💬 Testimonials Carousel',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subtext', title: 'Sub-text', type: 'text', rows: 2 }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3, validation: R => R.required() }),
          defineField({ name: 'name', title: 'Name', type: 'string', validation: R => R.required() }),
          defineField({ name: 'title', title: 'Job Title', type: 'string' }),
          defineField({ name: 'company', title: 'Company', type: 'string' }),
          defineField({
            name: 'rating',
            title: 'Star Rating',
            type: 'number',
            initialValue: 5,
            validation: R => R.min(1).max(5),
          }),
          defineField({ name: 'reviewPlatform', title: 'Review Platform', type: 'string', description: 'e.g. G2 or Capterra' }),
        ],
        preview: {
          select: { title: 'name', subtitle: 'company' },
          prepare: ({ title, subtitle }) => ({ title: title ?? 'Testimonial', subtitle }),
        },
      }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: '💬 Testimonials', subtitle: title }),
  },
});
