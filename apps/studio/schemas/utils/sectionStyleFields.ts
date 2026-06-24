/**
 * Shared style groups and fields added to every D365 section schema.
 * Import and spread into any section to give marketers Style / Responsive / Advanced tabs.
 *
 * Usage:
 *   import { sectionStyleGroups, sectionStyleFields } from '../utils/sectionStyleFields';
 *
 *   defineType({
 *     groups: [existingGroups, ...sectionStyleGroups],
 *     fields: [...existingFields, ...sectionStyleFields],
 *   })
 */
import { defineField } from 'sanity';

export const sectionStyleGroups = [
  { name: 'style',      title: 'Style'      },
  { name: 'responsive', title: 'Responsive' },
  { name: 'advanced',   title: 'Advanced'   },
] as const;

export const sectionStyleFields = [
  // ── Style ────────────────────────────────────────────────────────────────
  defineField({ name: 'background', title: 'Background',       type: 'styleBackground', group: 'style' }),
  defineField({ name: 'border',     title: 'Border & Shadow',  type: 'styleBorder',     group: 'style' }),
  defineField({ name: 'spacing',    title: 'Spacing',          type: 'styleSpacing',    group: 'style' }),
  defineField({ name: 'size',       title: 'Height / Size',    type: 'styleSize',       group: 'style' }),
  // ── Responsive ───────────────────────────────────────────────────────────
  defineField({ name: 'sectionResponsive', title: 'Responsive Controls', type: 'styleResponsive', group: 'responsive' }),
  // ── Advanced ─────────────────────────────────────────────────────────────
  defineField({ name: 'sectionId',    title: 'Section HTML ID',  type: 'string', group: 'advanced' }),
  defineField({ name: 'sectionClass', title: 'Extra CSS Class',  type: 'string', group: 'advanced',
    description: 'Added alongside the built-in section class. Use for custom CSS targeting.' }),
  defineField({ name: 'customCss',    title: 'Custom CSS',       type: 'text', rows: 8, group: 'advanced',
    description: 'Injected as a scoped <style> for this section. Write bare CSS properties or full selectors like .d365-hero__headline { color: red; }.' }),
];
