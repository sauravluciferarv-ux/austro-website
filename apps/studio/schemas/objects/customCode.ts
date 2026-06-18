import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'customCode',
  title: 'Custom Code',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Custom Code',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle on to inject custom HTML, CSS, or JavaScript into this section.',
    }),
    defineField({
      name: 'html',
      title: 'Custom HTML',
      type: 'code',
      options: {
        language: 'html',
        languageAlternatives: [{ title: 'HTML', value: 'html' }],
      },
      description: 'Injected at the bottom of the section wrapper. Use valid HTML only.',
      hidden: ({ parent }) => !parent?.enabled,
    }),
    defineField({
      name: 'css',
      title: 'Custom CSS',
      type: 'code',
      options: {
        language: 'css',
        languageAlternatives: [{ title: 'CSS', value: 'css' }],
      },
      description:
        'Styles scoped to this section. Use "#section-{key}" as your root selector to avoid affecting the rest of the page.',
      hidden: ({ parent }) => !parent?.enabled,
    }),
    defineField({
      name: 'javascript',
      title: 'Custom JavaScript',
      type: 'code',
      options: {
        language: 'javascript',
        languageAlternatives: [{ title: 'JavaScript', value: 'javascript' }],
      },
      description:
        'Runs after page load. A `section` variable is injected pointing to this section element. Avoid document.write() or blocking calls.',
      hidden: ({ parent }) => !parent?.enabled,
    }),
  ],
  preview: {
    select: { enabled: 'enabled' },
    prepare: ({ enabled }) => ({
      title: 'Custom Code',
      subtitle: enabled ? 'Enabled' : 'Disabled',
    }),
  },
});
