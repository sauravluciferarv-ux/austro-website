# Adding a New Singleton Page to Desk365

A "singleton page" is a page with a fixed URL that has its own Sanity document type (e.g. /pricing/, /about-us/). This guide covers how to wire one up end-to-end.

## 5 files to touch

1. `apps/studio/schemas/documents/<typeName>.ts` — Sanity schema
2. `apps/studio/schemas/index.ts` — register the schema
3. `apps/web/src/lib/page-defaults.ts` — TypeScript fallback defaults
4. `apps/web/src/lib/queries.ts` — GROQ query
5. `apps/web/src/pages/<slug>/index.astro` — Astro page
6. `apps/studio/scripts/seed-all-pages.ts` — seed document

---

## Step 1 — Create the schema file

Copy an existing schema (e.g. `aboutPage.ts`) as a template. Key requirements:

- `name` must be unique (e.g. `'myNewPage'`)
- Add `__experimental_actions: ['update', 'publish']` to prevent accidental creation of duplicates
- Use `groups` to organize fields into tabs (hero, content, cta, settings, seo)
- Always keep `status`, `previewImage`, `pageBuilder`, and `seo` fields
- Use `defineField` + `defineArrayMember` for all fields

```typescript
export default defineType({
  name: 'myNewPage',
  title: 'My New Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'content', title: 'Content' },
    { name: 'cta', title: 'Final CTA' },
    { name: 'pageBuilder', title: 'Page Builder', default: true },
    { name: 'settings', title: 'Settings' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ... your fields here
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
});
```

## Step 2 — Register in schemas/index.ts

Import and add the schema to the `schemaTypes` array:

```typescript
import myNewPage from './documents/myNewPage';

export const schemaTypes = [
  // ...existing schemas...
  myNewPage,
];
```

## Step 3 — Add defaults to page-defaults.ts

```typescript
export const MY_NEW_PAGE_DEFAULTS = {
  heroEyebrow: 'My Page',
  heroHeading: 'Welcome to My Page',
  // ...all fields with sensible defaults
};
```

## Step 4 — Add GROQ query to queries.ts

```typescript
export const myNewPageQuery = groq`
  *[_type == "myNewPage" && _id in ["myNewPage", "drafts.myNewPage"]][0] {
    _id, _type,
    status,
    heroEyebrow, heroHeading, heroSubheading,
    // ... all your fields
    ${d365PageBuilderProjection},
    seo {
      metaTitle, metaDescription,
      ogImage { asset->{ url } },
      ogTitle, ogDescription, noIndex, canonicalUrl, structuredData
    }
  }
`;
```

## Step 5 — Create the Astro page

Create `apps/web/src/pages/<slug>/index.astro`. Required boilerplate:

```astro
---
export const prerender = false;

import BaseLayout from '../../layouts/BaseLayout.astro';
import HomeSectionRenderer from '../../components/home/HomeSectionRenderer.astro';
import { sanityClient, getDraftClient } from '../../lib/sanity';
import { myNewPageQuery } from '../../lib/queries';
import { MY_NEW_PAGE_DEFAULTS } from '../../lib/page-defaults';

const isPreview = Astro.locals.isPreview ?? false;
const client = isPreview ? getDraftClient() : sanityClient;
const cmsData = await client.fetch(myNewPageQuery).catch(() => null);

if (!isPreview) {
  Astro.response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
}

const heroEyebrow = cmsData?.heroEyebrow || MY_NEW_PAGE_DEFAULTS.heroEyebrow;
// ... rest of your variables with fallbacks

const pageBuilder = cmsData?.pageBuilder ?? [];
const docId = cmsData?._id ?? 'myNewPage';
const seo = cmsData?.seo ?? {};
---

<BaseLayout seo={{ metaTitle: seo.metaTitle || 'My New Page — Desk365' }}>
  <!-- your sections here -->

  {pageBuilder.map((section: any) => (
    <HomeSectionRenderer section={section} isPreview={isPreview} docId={docId} docType="myNewPage" />
  ))}
</BaseLayout>
```

## Step 6 — Add to seed script

In `apps/studio/scripts/seed-all-pages.ts`, add the document object and include it in the `documents` array:

```typescript
const myNewPage = {
  _id: 'myNewPage',
  _type: 'myNewPage',
  status: 'published',
  heroEyebrow: 'My Page',
  // ...all fields with default values
  seo: { metaTitle: 'My New Page — Desk365' },
};

// Add to documents array:
{ doc: myNewPage, label: 'My New Page (/my-page)' },
```

Then run:
```bash
cd apps/studio && npm run seed:all
```

---

## Checklist

- [ ] Schema file created in `apps/studio/schemas/documents/`
- [ ] Schema imported and added to `apps/studio/schemas/index.ts`
- [ ] Defaults added to `apps/web/src/lib/page-defaults.ts`
- [ ] GROQ query added to `apps/web/src/lib/queries.ts`
- [ ] Astro page created at `apps/web/src/pages/<slug>/index.astro`
- [ ] Seed document added to `apps/studio/scripts/seed-all-pages.ts`
- [ ] `npm run seed:all` run successfully
- [ ] Page appears in Sanity Studio
- [ ] Visual editing works with `?preview=true`
