import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'imageBlock',
  title: 'Image',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: R => R.required() }),
      ],
      validation: R => R.required(),
      group: 'content',
    }),
    defineField({ name: 'caption',       title: 'Caption',         type: 'string',  group: 'content' }),
    defineField({ name: 'link',          title: 'Link URL',        type: 'string',  group: 'content' }),
    defineField({ name: 'openInNewTab',  title: 'Open in New Tab', type: 'boolean', initialValue: false, group: 'content' }),

    // ── Style ────────────────────────────────────────────────────────────
    defineField({
      name: 'objectFit',
      title: 'Object Fit',
      type: 'string',
      options: { list: ['cover', 'contain', 'fill', 'scale-down', 'none'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'cover',
      group: 'style',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: 'Auto', value: 'auto' },
          { title: '1:1 (Square)', value: '1/1' },
          { title: '4:3', value: '4/3' },
          { title: '16:9 (Widescreen)', value: '16/9' },
          { title: '3:2', value: '3/2' },
          { title: '2:3 (Portrait)', value: '2/3' },
          { title: '21:9 (Cinematic)', value: '21/9' },
        ],
        layout: 'radio',
      },
      initialValue: 'auto',
      group: 'style',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: { list: ['left', 'center', 'right'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'left',
      group: 'style',
    }),
    defineField({ name: 'size',    title: 'Size',            type: 'styleSize',   group: 'style' }),
    defineField({ name: 'border',  title: 'Border & Shadow', type: 'styleBorder', group: 'style' }),
    defineField({ name: 'spacing', title: 'Spacing',         type: 'styleSpacing', group: 'style' }),

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
      description: "Scoped to this block's CSS class.",
      group: 'advanced',
    }),
  ],
  preview: {
    select: { title: 'image.alt', media: 'image' },
    prepare: ({ title, media }: { title?: string; media?: any }) => ({
      title: title ?? 'Image',
      media,
    }),
  },
});
