import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'richTextBlock',
  title: 'Rich Text',
  type: 'object',
  groups: [
    { name: 'content',    title: 'Content',    default: true },
    { name: 'style',      title: 'Style'       },
    { name: 'responsive', title: 'Responsive'  },
    { name: 'advanced',   title: 'Advanced'    },
  ],
  fields: [
    // ── Content ─────────────────────────────────────────────────────────
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Code', value: 'code' },
              { title: 'Strike', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                fields: [
                  { name: 'href', type: 'string', title: 'URL' },
                  { name: 'openInNewTab', title: 'Open in new tab', type: 'boolean', initialValue: false },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),

    // ── Style ────────────────────────────────────────────────────────────
    defineField({ name: 'typography', title: 'Base Typography', type: 'styleTypography', group: 'style',
      description: 'Applies to the entire prose block. Individual marks (bold, links) keep their own styling.' }),
    defineField({ name: 'spacing', title: 'Spacing', type: 'styleSpacing', group: 'style' }),

    // ── Responsive ───────────────────────────────────────────────────────
    defineField({ name: 'responsive', title: 'Responsive Controls', type: 'styleResponsive', group: 'responsive' }),

    // ── Advanced ─────────────────────────────────────────────────────────
    defineField({ name: 'blockId',    title: 'HTML ID',    type: 'string', group: 'advanced' }),
    defineField({ name: 'blockClass', title: 'CSS Class',  type: 'string', group: 'advanced' }),
    defineField({
      name: 'customCss',
      title: 'Custom CSS',
      type: 'text',
      rows: 6,
      description: "Scoped to this block's CSS class. Target headings with h2, h3; links with a.",
      group: 'advanced',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Rich Text' }),
  },
});
