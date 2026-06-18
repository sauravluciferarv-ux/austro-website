import { defineType, defineField } from 'sanity';

// All block types allowed inside a section
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
    { name: 'content', title: 'Content', default: true },
    { name: 'layout', title: 'Layout & Style' },
    { name: 'advanced', title: 'Advanced' },
  ],
  fields: [
    // Identity
    defineField({ name: 'sectionId', title: 'Section ID', type: 'string', description: 'Unique HTML id (auto-generated if empty)', group: 'layout' }),
    defineField({ name: 'sectionClass', title: 'CSS Class', type: 'string', description: 'Unique class name for custom CSS targeting', group: 'layout' }),
    defineField({ name: 'label', title: 'Label (editor only)', type: 'string', description: 'Internal label to identify this section', group: 'content' }),
    // Content
    defineField({ name: 'blocks', title: 'Blocks', type: 'array', of: blockTypes, group: 'content' }),
    // Layout
    defineField({
      name: 'containerWidth', title: 'Container Width', type: 'string',
      options: {
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Wide (1400px)', value: 'wide' },
          { title: 'Contained (1200px)', value: 'contained' },
          { title: 'Narrow (800px)', value: 'narrow' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'contained',
      group: 'layout',
    }),
    defineField({
      name: 'layout', title: 'Block Layout', type: 'string',
      options: {
        list: [
          { title: 'Stack (vertical)', value: 'stack' },
          { title: '2 Columns', value: 'cols-2' },
          { title: '3 Columns', value: 'cols-3' },
          { title: '4 Columns', value: 'cols-4' },
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'stack',
      group: 'layout',
    }),
    defineField({
      name: 'gap', title: 'Gap', type: 'string',
      options: { list: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'md',
      group: 'layout',
    }),
    defineField({
      name: 'verticalAlign', title: 'Vertical Alignment', type: 'string',
      options: { list: ['start', 'center', 'end', 'stretch'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'start',
      group: 'layout',
    }),
    defineField({
      name: 'horizontalAlign', title: 'Horizontal Alignment', type: 'string',
      options: { list: ['start', 'center', 'end', 'between', 'around'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'start',
      group: 'layout',
    }),
    // Background
    defineField({ name: 'bgColor', title: 'Background Color', type: 'string', description: 'CSS color e.g. #f9fafb or rgba(0,0,0,0.5)', group: 'layout' }),
    defineField({ name: 'bgImage', title: 'Background Image', type: 'image', options: { hotspot: true }, group: 'layout' }),
    defineField({ name: 'bgGradient', title: 'Background Gradient', type: 'string', description: 'CSS gradient e.g. linear-gradient(135deg, #667eea, #764ba2)', group: 'layout' }),
    // Spacing
    defineField({ name: 'paddingTop', title: 'Padding Top', type: 'string', description: 'CSS value e.g. 80px or 5rem', group: 'layout' }),
    defineField({ name: 'paddingBottom', title: 'Padding Bottom', type: 'string', group: 'layout' }),
    defineField({ name: 'paddingLeft', title: 'Padding Left', type: 'string', group: 'layout' }),
    defineField({ name: 'paddingRight', title: 'Padding Right', type: 'string', group: 'layout' }),
    defineField({ name: 'marginTop', title: 'Margin Top', type: 'string', group: 'layout' }),
    defineField({ name: 'marginBottom', title: 'Margin Bottom', type: 'string', group: 'layout' }),
    defineField({ name: 'minHeight', title: 'Min Height', type: 'string', description: 'e.g. 400px or 100vh', group: 'layout' }),
    // Responsive
    defineField({ name: 'hideOnMobile', title: 'Hide on Mobile', type: 'boolean', initialValue: false, group: 'layout' }),
    defineField({ name: 'hideOnDesktop', title: 'Hide on Desktop', type: 'boolean', initialValue: false, group: 'layout' }),
    // Custom CSS
    defineField({
      name: 'customCss', title: 'Custom CSS', type: 'text', rows: 8,
      description: "CSS scoped to this section's class. Use .{sectionClass} {...} or nest selectors.",
      group: 'advanced',
    }),
  ],
  preview: {
    select: { label: 'label', layout: 'layout', blocks: 'blocks' },
    prepare: ({ label, layout, blocks }: { label?: string; layout?: string; blocks?: any[] }) => ({
      title: label ?? 'Section',
      subtitle: `${layout ?? 'stack'} · ${blocks?.length ?? 0} block(s)`,
    }),
  },
});
