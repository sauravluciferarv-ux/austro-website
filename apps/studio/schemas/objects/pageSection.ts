import { defineType, defineField } from 'sanity';

const blockTypes = [
  { type: 'headingBlock' },
  { type: 'imageBlock' },
  { type: 'richTextBlock' },
  { type: 'videoBlock' },
  { type: 'buttonBlock' },
  { type: 'dividerBlock' },
  { type: 'spacerBlock' },
  { type: 'accordionBlock' },
  { type: 'htmlBlock' },
  { type: 'shortcodeBlock' },
  { type: 'imageBoxBlock' },
  { type: 'iconBoxBlock' },
  { type: 'imageCarouselBlock' },
  { type: 'formBlock' },
  { type: 'loopGridBlock' },
  { type: 'loopCarouselBlock' },
  { type: 'slidesBlock' },
  { type: 'templateBlock' },
];

export default defineType({
  name: 'pageSection',
  title: 'Section',
  type: 'object',
  groups: [
    { name: 'content',    title: 'Content',    default: true },
    { name: 'layout',     title: 'Layout'      },
    { name: 'style',      title: 'Style'       },
    { name: 'responsive', title: 'Responsive'  },
    { name: 'advanced',   title: 'Advanced'    },
  ],
  fields: [
    // ── Content ─────────────────────────────────────────────────────────
    defineField({
      name: 'label',
      title: 'Label (editor only)',
      type: 'string',
      description: 'Internal label to identify this section in the page builder list.',
      group: 'content',
    }),
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: blockTypes,
      group: 'content',
    }),

    // ── Layout ───────────────────────────────────────────────────────────
    defineField({
      name: 'sectionWidth',
      title: 'Section Width',
      type: 'string',
      options: {
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Boxed (1200px)', value: 'boxed' },
          { title: 'Wide (1400px)', value: 'wide' },
          { title: 'Narrow (800px)', value: 'narrow' },
          { title: 'Custom', value: 'custom' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'boxed',
      group: 'layout',
    }),
    defineField({
      name: 'customSectionWidth',
      title: 'Custom Width',
      type: 'string',
      placeholder: 'e.g. 1100px or 90%',
      hidden: ({ parent }) => parent?.sectionWidth !== 'custom',
      group: 'layout',
    }),
    defineField({
      name: 'columns',
      title: 'Column Layout',
      type: 'string',
      options: {
        list: [
          { title: '1 Column', value: '1' },
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns', value: '4' },
          { title: '2/3 + 1/3', value: '2-1' },
          { title: '1/3 + 2/3', value: '1-2' },
          { title: '1/4 + 3/4', value: '1-3' },
          { title: '3/4 + 1/4', value: '3-1' },
          { title: 'Custom Grid', value: 'custom' },
        ],
        layout: 'radio',
      },
      initialValue: '1',
      group: 'layout',
    }),
    defineField({
      name: 'customGridTemplate',
      title: 'Custom Grid Template',
      type: 'string',
      placeholder: 'e.g. 1fr 2fr 1fr',
      description: 'CSS grid-template-columns value.',
      hidden: ({ parent }) => parent?.columns !== 'custom',
      group: 'layout',
    }),
    defineField({
      name: 'columnGap',
      title: 'Column Gap',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'XS (8px)', value: 'xs' },
          { title: 'SM (16px)', value: 'sm' },
          { title: 'MD (24px)', value: 'md' },
          { title: 'LG (32px)', value: 'lg' },
          { title: 'XL (48px)', value: 'xl' },
          { title: '2XL (64px)', value: '2xl' },
        ],
        layout: 'radio',
      },
      initialValue: 'md',
      group: 'layout',
    }),
    defineField({
      name: 'rowGap',
      title: 'Row Gap',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'XS (8px)', value: 'xs' },
          { title: 'SM (16px)', value: 'sm' },
          { title: 'MD (24px)', value: 'md' },
          { title: 'LG (32px)', value: 'lg' },
          { title: 'XL (48px)', value: 'xl' },
          { title: '2XL (64px)', value: '2xl' },
        ],
        layout: 'radio',
      },
      initialValue: 'md',
      group: 'layout',
    }),
    defineField({
      name: 'verticalAlign',
      title: 'Vertical Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Top', value: 'start' },
          { title: 'Middle', value: 'center' },
          { title: 'Bottom', value: 'end' },
          { title: 'Stretch', value: 'stretch' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'start',
      group: 'layout',
    }),
    defineField({
      name: 'horizontalAlign',
      title: 'Horizontal Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'start' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'end' },
          { title: 'Space Between', value: 'between' },
          { title: 'Space Around', value: 'around' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'start',
      group: 'layout',
    }),
    defineField({ name: 'size', title: 'Height / Size', type: 'styleSize', group: 'layout' }),

    // ── Style ────────────────────────────────────────────────────────────
    defineField({ name: 'background', title: 'Background', type: 'styleBackground', group: 'style' }),
    defineField({ name: 'border',     title: 'Border & Shadow', type: 'styleBorder', group: 'style' }),
    defineField({ name: 'spacing',    title: 'Spacing (Padding & Margin)', type: 'styleSpacing', group: 'style' }),

    // ── Responsive ───────────────────────────────────────────────────────
    defineField({ name: 'responsive', title: 'Spacing & Visibility Overrides', type: 'styleResponsive', group: 'responsive' }),
    defineField({
      name: 'tabletColumns',
      title: 'Tablet Column Override (768px–1023px)',
      type: 'string',
      options: { list: ['1', '2', '3', '4'], layout: 'radio', direction: 'horizontal' },
      group: 'responsive',
    }),
    defineField({
      name: 'mobileColumns',
      title: 'Mobile Column Override (≤767px)',
      type: 'string',
      options: { list: ['1', '2'], layout: 'radio', direction: 'horizontal' },
      initialValue: '1',
      group: 'responsive',
    }),

    // ── Advanced ─────────────────────────────────────────────────────────
    defineField({ name: 'sectionId',    title: 'Section HTML ID',  type: 'string', group: 'advanced' }),
    defineField({ name: 'sectionClass', title: 'CSS Class',        type: 'string', group: 'advanced',
      description: 'Used to scope Custom CSS below. Auto-generated from block key if left empty.' }),
    defineField({ name: 'ariaLabel',    title: 'ARIA Label',       type: 'string', group: 'advanced' }),
    defineField({
      name: 'customCss',
      title: 'Custom CSS',
      type: 'text',
      rows: 10,
      description: 'Scoped to .{sectionClass}. Target child blocks using their own CSS classes. Avoid position:fixed or z-index>1000.',
      group: 'advanced',
    }),
  ],
  preview: {
    select: { label: 'label', layout: 'columns', blocks: 'blocks' },
    prepare: ({ label, layout, blocks }: { label?: string; layout?: string; blocks?: any[] }) => ({
      title: label ?? 'Section',
      subtitle: `${layout ?? '1'} col · ${blocks?.length ?? 0} block(s)`,
    }),
  },
});
