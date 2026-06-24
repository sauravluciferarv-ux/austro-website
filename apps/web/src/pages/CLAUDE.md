# Adding New Editable Fields to a Desk365 Page

Follow this 5-step pattern every time you add a new CMS-editable field to any page.

## Step 1 — Add field to the Sanity schema

Edit the schema file for the target page type:
- `apps/studio/schemas/documents/pricingPage.ts`
- `apps/studio/schemas/documents/featuresPage.ts`
- `apps/studio/schemas/documents/aboutPage.ts`
- `apps/studio/schemas/documents/contactPage.ts`
- `apps/studio/schemas/documents/requestDemoPage.ts`

Use `defineField` and assign the field to an existing `group`. Do NOT remove existing fields.

```typescript
defineField({ name: 'myNewField', title: 'My New Field', type: 'string', group: 'hero' }),
```

For arrays of objects, use `defineArrayMember`:
```typescript
defineField({
  name: 'myItems',
  title: 'My Items',
  type: 'array',
  group: 'content',
  of: [
    defineArrayMember({
      type: 'object',
      name: 'myItem',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text' }),
      ],
      preview: { select: { title: 'title' } },
    }),
  ],
}),
```

## Step 2 — Add default value to page-defaults.ts

Edit `apps/web/src/lib/page-defaults.ts` and add the default value to the relevant `*_DEFAULTS` export:

```typescript
export const PRICING_DEFAULTS = {
  // ...existing fields...
  myNewField: 'Default value here',
};
```

For array defaults, add a named export:
```typescript
export const DEFAULT_MY_ITEMS = [
  { title: 'Item 1', description: 'Description 1' },
  { title: 'Item 2', description: 'Description 2' },
];
```

## Step 3 — Add field to the GROQ query

Edit `apps/web/src/lib/queries.ts` and add the field name(s) to the relevant page query.

Simple scalar field:
```groq
myNewField,
```

Array of objects:
```groq
myItems[] { _key, title, description },
```

Nested object:
```groq
myConfig { fieldA, fieldB },
```

Image with URL:
```groq
myImage { asset->{ url } },
```

## Step 4 — Use the value in the Astro page with fallback

In the Astro frontmatter, read the CMS value with a default fallback:
```typescript
const myNewField = cmsData?.myNewField || PRICING_DEFAULTS.myNewField;
```

For arrays:
```typescript
const myItems: MyItemType[] = cmsData?.myItems?.length ? cmsData.myItems : DEFAULT_MY_ITEMS;
```

Then use in the template:
```astro
<p class="d365-eyebrow">{myNewField}</p>
{myItems.map(item => (
  <div>{item.title}</div>
))}
```

## Step 5 — Add to seed script and run

Edit `apps/studio/scripts/seed-all-pages.ts` and add the field to the corresponding page object with the same default value used in step 2.

For array items, include `_key` and `_type`:
```typescript
myItems: [
  { _key: k(), _type: 'myItem', title: 'Item 1', description: 'Description 1' },
],
```

Then run the seed:
```bash
cd apps/studio && npm run seed:all
```

---

## Page-to-file mapping

| Page URL | Schema | Query export | Defaults export | Astro page |
|---|---|---|---|---|
| /pricing/ | pricingPage.ts | pricingPageQuery | PRICING_DEFAULTS | pages/pricing/index.astro |
| /features/ | featuresPage.ts | featuresPageQuery | FEATURES_DEFAULTS | pages/features/index.astro |
| /about-us/ | aboutPage.ts | aboutPageQuery | ABOUT_DEFAULTS | pages/about-us/index.astro |
| /contact/ | contactPage.ts | contactPageQuery | CONTACT_DEFAULTS | pages/contact/index.astro |
| /request-demo/ | requestDemoPage.ts | requestDemoPageQuery | DEMO_DEFAULTS | pages/request-demo/index.astro |
