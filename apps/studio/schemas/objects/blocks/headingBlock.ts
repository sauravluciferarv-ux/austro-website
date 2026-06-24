import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'headingBlock',
  title: 'Heading',
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
      name: 'level',
      title: 'Heading Level',
      type: 'string',
      options: { list: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'h2',
      group: 'content',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: R => R.required(),
      group: 'content',
    }),

    // ── Style ────────────────────────────────────────────────────────────
    defineField({ name: 'typography', title: 'Typography', type: 'styleTypography', group: 'style' }),
    defineField({ name: 'spacing',    title: 'Spacing',    type: 'styleSpacing',    group: 'style' }),

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
      description: "Scoped to this block's CSS class. Example: font-style: italic; text-decoration: underline;",
      group: 'advanced',
    }),
  ],
  preview: {
    select: { title: 'text', level: 'level' },
    prepare: ({ title, level }: { title?: string; level?: string }) => ({
      title: title ?? 'Heading',
      subtitle: level ?? 'h2',
    }),
  },
});
