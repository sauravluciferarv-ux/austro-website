import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365AIFeaturesSection',
  title: 'AI Features Section',
  type: 'object',
  groups: [
    { name: 'style',      title: 'Style'      },
    { name: 'responsive', title: 'Responsive' },
    { name: 'advanced',   title: 'Advanced'   },
  ],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 3 }),
    defineField({
      name: 'cards',
      title: 'AI Feature Cards',
      type: 'array',
      of: [{
        type: 'object',
        name: 'aiCard',
        title: 'AI Card',
        groups: [
          { name: 'main', title: 'Main', default: true },
          { name: 'sub', title: 'Sub-features' },
        ],
        fields: [
          defineField({ name: 'label', title: 'Card Label (Tab Name)', type: 'string', validation: R => R.required(), group: 'main' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, group: 'main' }),
          defineField({ name: 'readMoreHref', title: 'Read More Link', type: 'string', group: 'main' }),
          defineField({ name: 'image', title: 'Card Image', type: 'image', options: { hotspot: true }, group: 'main' }),
          defineField({ name: 'imageAlt', title: 'Image Alt', type: 'string', group: 'main' }),
          defineField({
            name: 'subFeatures',
            title: 'Sub-features',
            type: 'array',
            group: 'sub',
            of: [{
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
                defineField({ name: 'description', title: 'Description', type: 'string' }),
              ],
              preview: { select: { title: 'title', subtitle: 'description' } },
            }],
          }),
        ],
        preview: { select: { title: 'label', media: 'image' } },
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
      description: 'Write full selectors like .d365-ai-features { padding: 80px; } or bare CSS properties.' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: 'AI Features', subtitle: title }),
  },
});
