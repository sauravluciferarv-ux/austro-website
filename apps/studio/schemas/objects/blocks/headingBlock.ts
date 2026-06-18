import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'headingBlock',
  title: 'Heading',
  type: 'object',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string', description: 'Unique ID for this block (auto-generated if empty)' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string', description: 'Unique class name for custom CSS targeting' }),
    defineField({
      name: 'level', title: 'Heading Level', type: 'string',
      options: { list: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'h2',
    }),
    defineField({ name: 'text', title: 'Text', type: 'string', validation: R => R.required() }),
    defineField({
      name: 'alignment', title: 'Alignment', type: 'string',
      options: { list: ['left', 'center', 'right'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'left',
    }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4, description: "CSS scoped to this block's class" }),
    defineField({ name: 'hideOnMobile', title: 'Hide on Mobile', type: 'boolean', initialValue: false }),
    defineField({ name: 'hideOnDesktop', title: 'Hide on Desktop', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'text', level: 'level' },
    prepare: ({ title, level }: { title?: string; level?: string }) => ({ title: title ?? 'Heading', subtitle: level ?? 'h2' }),
  },
});
