import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'iconBoxBlock',
  title: 'Icon Box',
  type: 'object',
  groups: [
    { name: 'content',    title: 'Content',    default: true },
    { name: 'style',      title: 'Style'       },
    { name: 'responsive', title: 'Responsive'  },
    { name: 'advanced',   title: 'Advanced'    },
  ],
  fields: [
    // ── Content ─────────────────────────────────────────────────────────
    defineField({ name: 'icon',        title: 'Icon (image/SVG)',  type: 'image', options: { hotspot: true }, group: 'content' }),
    defineField({ name: 'iconAlt',     title: 'Icon Alt Text',     type: 'string', group: 'content' }),
    defineField({ name: 'title',       title: 'Title',             type: 'string', group: 'content' }),
    defineField({ name: 'description', title: 'Description',       type: 'text', rows: 3, group: 'content' }),
    defineField({ name: 'link',        title: 'Link URL',          type: 'string', group: 'content' }),
    defineField({ name: 'openInNewTab',title: 'Open in New Tab',   type: 'boolean', initialValue: false, group: 'content' }),
    defineField({ name: 'cta',         title: 'CTA Button',        type: 'ctaButton', group: 'content' }),

    // ── Style ────────────────────────────────────────────────────────────
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Icon Top', value: 'icon-top' },
          { title: 'Icon Left', value: 'icon-left' },
          { title: 'Icon Right', value: 'icon-right' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'icon-top',
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
    defineField({ name: 'iconSize',   title: 'Icon Size',        type: 'string', placeholder: 'e.g. 48px or 3rem', group: 'style' }),
    defineField({ name: 'iconColor',  title: 'Icon Tint Color',  type: 'string', placeholder: '#2563eb', group: 'style' }),
    defineField({ name: 'iconBgColor',title: 'Icon Background',  type: 'string', placeholder: '#eff6ff', group: 'style' }),
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
    select: { title: 'title', media: 'icon' },
    prepare: ({ title, media }: { title?: string; media?: any }) => ({
      title: title ?? 'Icon Box',
      media,
    }),
  },
});
