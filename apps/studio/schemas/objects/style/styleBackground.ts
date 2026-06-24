import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'styleBackground',
  title: 'Background',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'type',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Color', value: 'color' },
          { title: 'Gradient', value: 'gradient' },
          { title: 'Image', value: 'image' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      placeholder: '#f9fafb or rgba(0,0,0,0.05)',
      hidden: ({ parent }) => parent?.type !== 'color',
    }),
    defineField({
      name: 'gradient',
      title: 'Gradient (CSS)',
      type: 'string',
      placeholder: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      hidden: ({ parent }) => parent?.type !== 'gradient',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.type !== 'image',
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Center', value: 'center center' },
          { title: 'Top', value: 'top center' },
          { title: 'Bottom', value: 'bottom center' },
          { title: 'Left', value: 'center left' },
          { title: 'Right', value: 'center right' },
        ],
        layout: 'radio',
      },
      initialValue: 'center center',
      hidden: ({ parent }) => parent?.type !== 'image',
    }),
    defineField({
      name: 'imageSize',
      title: 'Image Size',
      type: 'string',
      options: { list: ['cover', 'contain', 'auto'], layout: 'radio', direction: 'horizontal' },
      initialValue: 'cover',
      hidden: ({ parent }) => parent?.type !== 'image',
    }),
    defineField({
      name: 'overlay',
      title: 'Overlay Color',
      type: 'string',
      placeholder: 'rgba(0,0,0,0.4)',
      description: 'Semi-transparent color layer over the background image.',
      hidden: ({ parent }) => parent?.type !== 'image',
    }),
    defineField({
      name: 'opacity',
      title: 'Opacity (0–1)',
      type: 'number',
      validation: R => R.min(0).max(1),
      initialValue: 1,
      hidden: ({ parent }) => !parent?.type || parent?.type === 'none',
    }),
  ],
});
