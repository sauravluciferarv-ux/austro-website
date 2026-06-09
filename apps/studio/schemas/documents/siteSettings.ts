import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string', initialValue: 'Desk365' }),
    defineField({ name: 'siteUrl', title: 'Site URL', type: 'url', initialValue: 'https://www.desk365.io' }),
    defineField({ name: 'logo', title: 'Logo (Light)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'logoDark', title: 'Logo (Dark — for footer)', type: 'image' }),
    defineField({ name: 'logoAlt', title: 'Logo Alt Text', type: 'string', initialValue: 'Desk365' }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image' }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      description: 'Used as fallback when a page has no SEO fields set',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', title: 'Show Announcement Bar', type: 'boolean', initialValue: false }),
        defineField({ name: 'text', title: 'Text', type: 'string' }),
        defineField({ name: 'linkLabel', title: 'Link Label', type: 'string' }),
        defineField({ name: 'linkHref', title: 'Link URL', type: 'string' }),
        defineField({
          name: 'bgColor',
          title: 'Background Color',
          type: 'string',
          description: 'Tailwind class e.g. bg-blue-600',
          initialValue: 'bg-blue-600',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
