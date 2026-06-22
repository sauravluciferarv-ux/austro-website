import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'd365WhyChooseSection',
  title: '🌟 Why Choose Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 3 }),
    defineField({ name: 'awardImage', title: 'Award Badge Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'awardText', title: 'Award Text', type: 'string' }),
    defineField({ name: 'ctaLabel', title: 'CTA Button Label', type: 'string', description: 'e.g. "Start Your Free Trial"' }),
    defineField({ name: 'ctaHref', title: 'CTA Button Link', type: 'string', description: 'e.g. "/pricing/"' }),
    defineField({
      name: 'cards',
      title: 'Why-Choose Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            options: { list: [
              { title: 'Lightning (Setup)', value: 'lightning' },
              { title: 'Thumbs Up (Easy)', value: 'thumb' },
              { title: 'Chat (Support)', value: 'chat' },
              { title: 'Dollar (ROI)', value: 'dollar' },
            ]},
          }),
        ],
        preview: { select: { title: 'title', subtitle: 'description' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: '🌟 Why Choose', subtitle: title }),
  },
});
