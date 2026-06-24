import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'styleTypography',
  title: 'Typography',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'fontFamily',
      title: 'Font Family',
      type: 'string',
      description: 'Default is Roboto. Override only if this element needs a different font.',
      options: {
        list: [
          { title: 'Roboto (Default)', value: "'Roboto', sans-serif" },
          { title: 'Georgia (Serif)', value: "'Georgia', serif" },
          { title: 'Courier New (Monospace)', value: "'Courier New', monospace" },
          { title: 'System UI', value: 'system-ui, sans-serif' },
          { title: 'Custom (enter below)', value: 'custom' },
        ],
      },
      initialValue: "'Roboto', sans-serif",
    }),
    defineField({
      name: 'fontFamilyCustom',
      title: 'Custom Font Family',
      type: 'string',
      placeholder: "e.g. 'Inter', sans-serif",
      hidden: ({ parent }) => parent?.fontFamily !== 'custom',
    }),
    defineField({
      name: 'preset',
      title: 'Preset Style',
      type: 'string',
      description: 'Pick a brand preset. Individual overrides below still apply on top.',
      options: {
        list: [
          { title: 'None (custom)', value: '' },
          { title: 'Display XL', value: 'display-xl' },
          { title: 'Display LG', value: 'display-lg' },
          { title: 'Heading H1', value: 'h1' },
          { title: 'Heading H2', value: 'h2' },
          { title: 'Heading H3', value: 'h3' },
          { title: 'Heading H4', value: 'h4' },
          { title: 'Body Large', value: 'body-lg' },
          { title: 'Body Base', value: 'body' },
          { title: 'Body Small', value: 'body-sm' },
          { title: 'Caption', value: 'caption' },
          { title: 'Label', value: 'label' },
        ],
      },
    }),
    defineField({ name: 'fontSize',      title: 'Font Size',      type: 'string', placeholder: 'e.g. 18px or 1.125rem' }),
    defineField({ name: 'fontWeight',    title: 'Font Weight',    type: 'string', placeholder: 'e.g. 400, 600, 700, bold' }),
    defineField({ name: 'lineHeight',    title: 'Line Height',    type: 'string', placeholder: 'e.g. 1.6 or 28px' }),
    defineField({ name: 'letterSpacing', title: 'Letter Spacing', type: 'string', placeholder: 'e.g. 0.02em or 0.5px' }),
    defineField({
      name: 'textTransform',
      title: 'Text Transform',
      type: 'string',
      options: { list: ['none', 'uppercase', 'lowercase', 'capitalize'], layout: 'radio', direction: 'horizontal' },
    }),
    defineField({
      name: 'textAlign',
      title: 'Text Align',
      type: 'string',
      options: { list: ['left', 'center', 'right', 'justify'], layout: 'radio', direction: 'horizontal' },
    }),
    defineField({ name: 'color', title: 'Color', type: 'string', placeholder: '#1a1a2e or var(--color-text-primary)' }),
  ],
});
