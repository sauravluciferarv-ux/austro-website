import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: R => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'E.g. "jane-doe" → /authors/jane-doe/',
      options: {
        source: 'name',
        maxLength: 64,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '').slice(0, 64),
      },
      validation: R => R.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 3 }),
    defineField({ name: 'jobTitle', title: 'Job Title', type: 'string' }),
    defineField({ name: 'linkedIn', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'twitter', title: 'Twitter / X URL', type: 'url' }),
  ],
  preview: {
    select: { title: 'name', media: 'avatar', subtitle: 'jobTitle' },
  },
});
