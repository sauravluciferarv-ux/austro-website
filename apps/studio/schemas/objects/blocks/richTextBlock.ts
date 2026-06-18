import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'richTextBlock',
  title: 'Rich Text',
  type: 'object',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string' }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
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
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                fields: [
                  { name: 'href', type: 'string' },
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
            { name: 'alt', type: 'string' },
            { name: 'caption', type: 'string' },
          ],
        },
      ],
    }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4 }),
    defineField({ name: 'hideOnMobile', title: 'Hide on Mobile', type: 'boolean', initialValue: false }),
  ],
  preview: {
    prepare: () => ({ title: 'Rich Text' }),
  },
});
