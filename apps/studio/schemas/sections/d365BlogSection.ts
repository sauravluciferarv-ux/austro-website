import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365BlogSection',
  title: '📝 Featured Blog Posts',
  type: 'object',
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
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: '📝 Blog Posts', subtitle: title }),
  },
});
