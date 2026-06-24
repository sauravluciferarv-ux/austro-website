import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365BlogSection',
  title: 'Featured Blog Posts',
  type: 'object',
  groups: [
    { name: 'style',      title: 'Style'      },
    { name: 'responsive', title: 'Responsive' },
    { name: 'advanced',   title: 'Advanced'   },
  ],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Featured blog posts' }),
    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string', initialValue: 'Read more' }),
    defineField({ name: 'ctaHref', title: 'CTA URL', type: 'string', initialValue: '/blog/' }),
    defineField({
      name: 'posts',
      title: 'Blog Post Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'category', title: 'Category Label', type: 'string', validation: R => R.required() }),
          defineField({ name: 'title', title: 'Post Title', type: 'string', validation: R => R.required() }),
          defineField({ name: 'href', title: 'Post URL', type: 'string', validation: R => R.required() }),
          defineField({ name: 'image', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'imageAlt', title: 'Image Alt', type: 'string' }),
        ],
        preview: { select: { title: 'title', subtitle: 'category', media: 'image' } },
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
      description: 'Write full selectors like .d365-blog { background: #f9fafb; } or bare CSS properties.' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: 'Blog Posts', subtitle: title }),
  },
});
