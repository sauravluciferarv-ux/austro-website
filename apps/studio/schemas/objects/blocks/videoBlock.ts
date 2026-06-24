import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'videoBlock',
  title: 'Video',
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
      name: 'url',
      title: 'Video URL',
      type: 'string',
      description: 'YouTube or Vimeo URL (e.g. https://www.youtube.com/watch?v=...)',
      validation: R => R.required(),
      group: 'content',
    }),
    defineField({ name: 'thumbnail', title: 'Custom Thumbnail', type: 'image', options: { hotspot: true }, group: 'content' }),
    defineField({ name: 'autoplay',  title: 'Autoplay',         type: 'boolean', initialValue: false, group: 'content' }),
    defineField({ name: 'muted',     title: 'Muted',            type: 'boolean', initialValue: false, group: 'content' }),
    defineField({ name: 'loop',      title: 'Loop',             type: 'boolean', initialValue: false, group: 'content' }),
    defineField({ name: 'controls',  title: 'Show Controls',    type: 'boolean', initialValue: true,  group: 'content' }),

    // ── Style ────────────────────────────────────────────────────────────
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9 (Widescreen)', value: '16/9' },
          { title: '4:3', value: '4/3' },
          { title: '1:1 (Square)', value: '1/1' },
          { title: '9:16 (Vertical)', value: '9/16' },
          { title: '21:9 (Cinematic)', value: '21/9' },
        ],
        layout: 'radio',
      },
      initialValue: '16/9',
      group: 'style',
    }),
    defineField({ name: 'border',  title: 'Border & Shadow', type: 'styleBorder',  group: 'style' }),
    defineField({ name: 'size',    title: 'Size',            type: 'styleSize',    group: 'style' }),
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
    select: { title: 'url' },
    prepare: ({ title }: { title?: string }) => ({ title: title ?? 'Video' }),
  },
});
