import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'imageBoxBlock',
  title: 'Image Box',
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
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
      group: 'content',
    }),
    defineField({ name: 'title',        title: 'Title',           type: 'string',  group: 'content' }),
    defineField({ name: 'description',  title: 'Description',     type: 'text', rows: 3, group: 'content' }),
    defineField({ name: 'link',         title: 'Link URL',        type: 'string',  group: 'content' }),
    defineField({ name: 'openInNewTab', title: 'Open in New Tab', type: 'boolean', initialValue: false, group: 'content' }),
    defineField({ name: 'cta',          title: 'CTA Button',      type: 'ctaButton', group: 'content' }),

    // ── Style ────────────────────────────────────────────────────────────
    defineField({
      name: 'layout',
      title: 'Card Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Image Top', value: 'image-top' },
          { title: 'Image Left', value: 'image-left' },
          { title: 'Image Right', value: 'image-right' },
          { title: 'Image Overlay', value: 'image-overlay' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image-top',
      group: 'style',
    }),
    defineField({
      name: 'imageAspectRatio',
      title: 'Image Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: 'Auto', value: 'auto' },
          { title: '16:9', value: '16/9' },
          { title: '4:3', value: '4/3' },
          { title: '1:1', value: '1/1' },
          { title: '3:2', value: '3/2' },
        ],
        layout: 'radio',
      },
      initialValue: '16/9',
      group: 'style',
    }),
    defineField({
      name: 'objectFit',
      title: 'Image Fit',
      type: 'string',
      options: { list: ['cover', 'contain', 'fill'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'cover',
      group: 'style',
    }),
    defineField({
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: { list: ['left', 'center', 'right'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'left',
      group: 'style',
    }),
    defineField({ name: 'titleTypography', title: 'Title Typography', type: 'styleTypography', group: 'style' }),
    defineField({ name: 'bodyTypography',  title: 'Body Typography',  type: 'styleTypography', group: 'style' }),
    defineField({ name: 'background', title: 'Card Background',  type: 'styleBackground', group: 'style' }),
    defineField({ name: 'border',     title: 'Border & Shadow',  type: 'styleBorder',     group: 'style' }),
    defineField({ name: 'spacing',    title: 'Spacing',          type: 'styleSpacing',    group: 'style' }),

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
    select: { title: 'title', media: 'image' },
    prepare: ({ title, media }: { title?: string; media?: any }) => ({
      title: title ?? 'Image Box',
      media,
    }),
  },
});
