import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'buttonBlock',
  title: 'Button',
  type: 'object',
  groups: [
    { name: 'content',    title: 'Content',    default: true },
    { name: 'style',      title: 'Style'       },
    { name: 'responsive', title: 'Responsive'  },
    { name: 'advanced',   title: 'Advanced'    },
  ],
  fields: [
    // ── Content ─────────────────────────────────────────────────────────
    defineField({ name: 'text',         title: 'Button Text',     type: 'string',  validation: R => R.required(), group: 'content' }),
    defineField({ name: 'href',         title: 'Link URL',        type: 'string',  validation: R => R.required(), group: 'content' }),
    defineField({ name: 'openInNewTab', title: 'Open in New Tab', type: 'boolean', initialValue: false, group: 'content' }),
    defineField({ name: 'icon',         title: 'Icon',            type: 'string',  description: 'Icon name or inline SVG string', group: 'content' }),
    defineField({
      name: 'iconPosition',
      title: 'Icon Position',
      type: 'string',
      options: { list: ['left', 'right'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'left',
      group: 'content',
    }),
    defineField({ name: 'ariaLabel', title: 'ARIA Label', type: 'string', description: 'Accessible label override (if button text is not descriptive)', group: 'content' }),

    // ── Style ────────────────────────────────────────────────────────────
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Outline', value: 'outline' },
          { title: 'Ghost', value: 'ghost' },
          { title: 'Link', value: 'link' },
          { title: 'Danger', value: 'danger' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'primary',
      group: 'style',
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: { list: ['xs', 'sm', 'md', 'lg', 'xl'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'md',
      group: 'style',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: { list: ['left', 'center', 'right', 'full-width'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'left',
      group: 'style',
    }),
    // Color overrides
    defineField({ name: 'bgColor',        title: 'Background Color',  type: 'string', placeholder: '#2563eb', group: 'style' }),
    defineField({ name: 'textColor',      title: 'Text Color',        type: 'string', placeholder: '#ffffff',  group: 'style' }),
    defineField({ name: 'hoverBgColor',   title: 'Hover Background',  type: 'string', placeholder: '#1d4ed8', group: 'style' }),
    defineField({ name: 'hoverTextColor', title: 'Hover Text Color',  type: 'string', group: 'style' }),
    defineField({ name: 'border',         title: 'Border & Shadow',   type: 'styleBorder',  group: 'style' }),
    defineField({ name: 'spacing',        title: 'Spacing',           type: 'styleSpacing', group: 'style' }),

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
      description: "Scoped to this block's CSS class. Use & for the button element itself.",
      group: 'advanced',
    }),
  ],
  preview: {
    select: { title: 'text', subtitle: 'variant' },
    prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({
      title: title ?? 'Button',
      subtitle: subtitle ?? 'primary',
    }),
  },
});
