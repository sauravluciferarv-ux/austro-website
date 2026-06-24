import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365TestimonialsSection',
  title: 'Testimonials Carousel',
  type: 'object',
  groups: [
    { name: 'style',      title: 'Style'      },
    { name: 'responsive', title: 'Responsive' },
    { name: 'advanced',   title: 'Advanced'   },
  ],
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
          defineField({ name: 'avatarImage', title: 'Avatar Photo', type: 'image', options: { hotspot: true }, description: 'Optional photo of the reviewer. Falls back to initials avatar if not provided.' }),
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
          select: { title: 'name', subtitle: 'company', media: 'avatarImage' },
          prepare: ({ title, subtitle, media }) => ({ title: title ?? 'Testimonial', subtitle, media }),
        },
      }],
    }),
    // ── Visual Editor Style Controls ──────────────────────────────────────────
    defineField({ name: 'background', title: 'Background',      type: 'styleBackground', group: 'style' }),
    defineField({ name: 'border',     title: 'Border & Shadow', type: 'styleBorder',     group: 'style' }),
    defineField({ name: 'spacing',    title: 'Spacing',         type: 'styleSpacing',    group: 'style' }),
    defineField({ name: 'size',       title: 'Height / Size',   type: 'styleSize',       group: 'style' }),
    defineField({ name: 'sectionResponsive', title: 'Responsive Controls', type: 'styleResponsive', group: 'responsive' }),
    defineField({ name: 'sectionId',    title: 'Section HTML ID',  type: 'string', group: 'advanced' }),
    defineField({ name: 'sectionClass', title: 'Extra CSS Class',  type: 'string', group: 'advanced',
      description: 'Added alongside the built-in section class for custom CSS targeting.' }),
    defineField({ name: 'customCss',    title: 'Custom CSS',       type: 'text', rows: 8, group: 'advanced',
      description: 'Write full selectors like .d365-testimonials { background: #f5f5f5; } or bare CSS properties.' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: 'Testimonials', subtitle: title }),
  },
});
