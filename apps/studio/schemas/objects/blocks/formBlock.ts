import { defineType, defineField } from 'sanity';

const fieldTypes = ['text', 'email', 'tel', 'number', 'textarea', 'select', 'checkbox', 'radio'];

export default defineType({
  name: 'formBlock',
  title: 'Form',
  type: 'object',
  fields: [
    defineField({ name: 'blockId', title: 'Block ID', type: 'string' }),
    defineField({ name: 'blockClass', title: 'CSS Class', type: 'string' }),
    defineField({ name: 'formTitle', title: 'Form Title', type: 'string' }),
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'type', title: 'Field Type', type: 'string', options: { list: fieldTypes }, initialValue: 'text', validation: (R: any) => R.required() },
            { name: 'label', title: 'Label', type: 'string', validation: (R: any) => R.required() },
            { name: 'name', title: 'Field Name (HTML)', type: 'string', validation: (R: any) => R.required() },
            { name: 'placeholder', title: 'Placeholder', type: 'string' },
            { name: 'required', title: 'Required', type: 'boolean', initialValue: false },
            { name: 'options', title: 'Options (for select/radio)', type: 'array', of: [{ type: 'string' }] },
          ],
          preview: { select: { title: 'label', subtitle: 'type' } },
        },
      ],
    }),
    defineField({ name: 'submitText', title: 'Submit Button Text', type: 'string', initialValue: 'Submit' }),
    defineField({ name: 'successMessage', title: 'Success Message', type: 'string', initialValue: 'Thank you! Your message has been received.' }),
    defineField({ name: 'webhookUrl', title: 'Webhook / API URL', type: 'string', description: 'POST the form data here on submission' }),
    defineField({ name: 'customCss', title: 'Custom CSS', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { title: 'formTitle' },
    prepare: ({ title }: { title?: string }) => ({ title: title ?? 'Form' }),
  },
});
