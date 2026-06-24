import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'styleResponsive',
  title: 'Responsive Controls',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'desktop',
      title: 'Desktop Spacing Overrides (≥1024px)',
      type: 'styleSpacing',
    }),
    defineField({
      name: 'tablet',
      title: 'Tablet Spacing Overrides (768px–1023px)',
      type: 'styleSpacing',
    }),
    defineField({
      name: 'mobile',
      title: 'Mobile Spacing Overrides (≤767px)',
      type: 'styleSpacing',
    }),
    defineField({ name: 'hideOnMobile',  title: 'Hide on Mobile (≤767px)',          type: 'boolean', initialValue: false }),
    defineField({ name: 'hideOnTablet',  title: 'Hide on Tablet (768px–1023px)',    type: 'boolean', initialValue: false }),
    defineField({ name: 'hideOnDesktop', title: 'Hide on Desktop (≥1024px)',        type: 'boolean', initialValue: false }),
  ],
});
