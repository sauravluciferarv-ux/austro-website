import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365SecuritySection',
  title: '🔒 Security & Compliance Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Security, Safety and Compliance' }),
    defineField({
      name: 'bullets',
      title: 'Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'badgeImage', title: 'Security Badge Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'badgeImageAlt', title: 'Badge Image Alt Text', type: 'string', initialValue: 'SOC 2 Type 2 and GDPR compliance badges' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: '🔒 Security', subtitle: title }),
  },
});
