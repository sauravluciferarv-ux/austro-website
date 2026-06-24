import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365SecuritySection',
  title: 'Security & Compliance Section',
  type: 'object',
  groups: [
    { name: 'style',      title: 'Style'      },
    { name: 'responsive', title: 'Responsive' },
    { name: 'advanced',   title: 'Advanced'   },
  ],
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
      description: 'Write full selectors like .d365-security { background: #0f172a; } or bare CSS properties.' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: 'Security', subtitle: title }),
  },
});
