import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'X (Twitter)', value: 'twitter' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
        ],
      },
      validation: R => R.required(),
    }),
    defineField({ name: 'href', title: 'URL', type: 'url', validation: R => R.required() }),
  ],
  preview: {
    select: { title: 'platform', subtitle: 'href' },
  },
});
