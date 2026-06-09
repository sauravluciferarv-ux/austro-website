# desk365.io — Astro + Sanity CMS + Vercel Migration Plan

**Stack:** Astro (frontend) · Sanity.io (CMS) · Vercel (hosting + edge CDN)
**Scope:** Full migration from WordPress + Elementor to a headless CMS architecture
**Goal:** Marketing team edits header, footer, homepage sections, and all page content in Sanity Studio → Vercel rebuilds in under 60 seconds → live globally on the edge.

---

## Phase Overview

| Phase | Name | Duration | Focus |
|-------|------|----------|-------|
| 1 | Architecture & Setup | Week 1 | Repo, infra, env strategy |
| 2 | Sanity Schema Design | Week 1–2 | All content models |
| 3 | Layout & Global Components | Week 2–3 | Header, footer, base layout |
| 4 | Homepage & Page Builder | Week 3–4 | All CMS-driven sections |
| 5 | Remaining Pages | Week 4–5 | Blog, pricing, about, contact, multilingual |
| 6 | Technical SEO | Week 5 | OG, schema, sitemap, canonicals |
| 7 | Analytics & Scripts | Week 5 | GTM, GA4, Pixel, CookieYes, Clarity |
| 8 | Content Migration | Week 5–6 | WP export → Sanity import |
| 9 | Performance | Week 6 | Lighthouse 90+, caching, images |
| 10 | QA & Redirects | Week 6–7 | Audits, 301s, cross-browser |
| 11 | Launch | Week 7 | DNS cutover, GSC, post-launch |

---

## Phase 1 — Architecture & Project Setup

### 1.1 Monorepo Structure

```
desk365/
├── apps/
│   ├── web/                        # Astro frontend
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── global/         # Header, Footer
│   │   │   │   ├── sections/       # Homepage + page builder sections
│   │   │   │   ├── ui/             # Button, Card, Badge, Tag
│   │   │   │   ├── forms/          # ContactForm, DemoForm
│   │   │   │   └── seo/            # BaseHead, SchemaOrg, OgTags
│   │   │   ├── layouts/
│   │   │   │   ├── BaseLayout.astro         # GTM + CookieYes here
│   │   │   │   ├── PageLayout.astro
│   │   │   │   └── BlogLayout.astro
│   │   │   ├── pages/
│   │   │   │   ├── index.astro              # Homepage
│   │   │   │   ├── pricing.astro
│   │   │   │   ├── about.astro
│   │   │   │   ├── contact.astro
│   │   │   │   ├── blog/
│   │   │   │   │   ├── index.astro          # Blog listing
│   │   │   │   │   └── [slug].astro         # Blog post
│   │   │   │   ├── [lang]/                  # Multilingual (de, fr, nl, es, etc.)
│   │   │   │   │   └── index.astro
│   │   │   │   └── [...slug].astro          # Dynamic page builder pages
│   │   │   ├── lib/
│   │   │   │   ├── sanity.ts                # Client init
│   │   │   │   ├── queries.ts               # All GROQ queries
│   │   │   │   ├── urlFor.ts                # Image URL builder
│   │   │   │   └── i18n.ts                  # Language helpers
│   │   │   └── styles/
│   │   │       ├── global.css
│   │   │       └── tokens.css               # Design tokens
│   │   ├── public/
│   │   │   ├── robots.txt
│   │   │   └── _redirects                   # Fallback redirects
│   │   ├── astro.config.mjs
│   │   ├── vercel.json                      # 301 redirects + headers
│   │   └── package.json
│   └── studio/                     # Sanity Studio (embedded or separate)
│       ├── schemas/
│       │   ├── documents/
│       │   │   ├── siteSettings.ts
│       │   │   ├── navigation.ts
│       │   │   ├── homepage.ts
│       │   │   ├── page.ts                  # Generic page builder
│       │   │   ├── blogPost.ts
│       │   │   ├── author.ts
│       │   │   ├── category.ts
│       │   │   └── redirect.ts
│       │   ├── objects/
│       │   │   ├── seo.ts                   # Reusable SEO fields
│       │   │   ├── heroSection.ts
│       │   │   ├── featureSection.ts
│       │   │   ├── pricingSection.ts
│       │   │   ├── testimonialSection.ts
│       │   │   ├── logoCarousel.ts
│       │   │   ├── ctaSection.ts
│       │   │   ├── faqSection.ts
│       │   │   ├── contactForm.ts
│       │   │   ├── richText.ts
│       │   │   └── link.ts
│       │   └── index.ts
│       ├── sanity.config.ts
│       └── package.json
├── package.json                    # Workspace root
└── turbo.json                      # Turborepo (optional but recommended)
```

### 1.2 Tech Stack Choices

| Concern | Choice | Reason |
|---------|--------|--------|
| Frontend | Astro 4.x | Zero-JS by default, island architecture |
| CMS | Sanity v3 | Structured content, live preview, GROQ, free tier |
| Hosting | Vercel | Edge CDN, ISR, deploy previews, Vercel Analytics |
| CSS | Tailwind CSS 3.x | Utility-first, tree-shaken, fast iteration |
| Forms | Netlify Forms / React Hook Form | Lightweight, no server needed |
| Calendly | `@calendly/react-widget` or script embed | Request Demo |
| Multilingual | Astro i18n routing (`/de/`, `/fr/`, etc.) + Sanity localized fields | Matches existing URL structure |
| Redirects | `vercel.json` `redirects` array | 301s managed in code, versioned |
| Image CDN | Sanity CDN (`cdn.sanity.io`) + Astro Image | Transforms at the edge |

### 1.3 Environments

```
Production  → main branch   → desk365.io          → Sanity dataset: production
Staging     → staging branch → staging.desk365.io  → Sanity dataset: staging
Dev/Preview → PR branches    → *.vercel.app previews
```

**Critical rule:** No staging URLs ever deployed to production. Enforced with a pre-deploy lint check.

### 1.4 Initial Setup Commands

```bash
# Create Astro project
npm create astro@latest apps/web -- --template minimal --typescript strict

# Add Tailwind + Sitemap + Vercel adapter
npx astro add tailwind sitemap vercel

# Sanity Studio
npm create sanity@latest -- --template clean --dataset production

# Install Sanity client in Astro app
npm install @sanity/client @sanity/image-url
```

---

## Phase 2 — Sanity Schema Design

Everything the marketing team edits goes in Sanity. Design schemas before touching components.

### 2.1 `siteSettings` Document (singleton)

Controls global pieces that appear site-wide.

```typescript
// studio/schemas/documents/siteSettings.ts
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // Singleton — no create/delete
  fields: [
    { name: 'siteName', type: 'string' },
    { name: 'siteUrl', type: 'url' },
    { name: 'logo', type: 'image', options: { hotspot: true } },
    { name: 'logoAlt', type: 'string' },
    { name: 'favicon', type: 'image' },
    { name: 'defaultSeo', type: 'seo' },           // fallback meta title/desc
    { name: 'socialLinks', type: 'array', of: [{ type: 'socialLink' }] },
    { name: 'announcementBar', type: 'announcementBar' },
  ]
}
```

### 2.2 `navigation` Document (singleton)

Header and footer are fully CMS-driven.

```typescript
// studio/schemas/documents/navigation.ts
export default {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'header',
      type: 'object',
      fields: [
        { name: 'logo', type: 'image' },
        { name: 'logoAlt', type: 'string' },
        {
          name: 'navLinks',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'label', type: 'string' },
              { name: 'href', type: 'string' },
              { name: 'isExternal', type: 'boolean' },
              {
                name: 'dropdown',
                type: 'array',
                of: [{ type: 'object', fields: [
                  { name: 'label', type: 'string' },
                  { name: 'href', type: 'string' },
                  { name: 'description', type: 'string' },
                  { name: 'icon', type: 'image' },
                ]}]
              }
            ]
          }]
        },
        { name: 'ctaLabel', type: 'string' },
        { name: 'ctaHref', type: 'string' },
        { name: 'ctaStyle', type: 'string', options: { list: ['primary', 'outline'] } },
        { name: 'secondaryCtaLabel', type: 'string' },
        { name: 'secondaryCtaHref', type: 'string' },
      ]
    },
    {
      name: 'footer',
      type: 'object',
      fields: [
        { name: 'logo', type: 'image' },
        { name: 'tagline', type: 'string' },
        {
          name: 'columns',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'heading', type: 'string' },
              { name: 'links', type: 'array', of: [{ type: 'link' }] }
            ]
          }]
        },
        { name: 'legalLinks', type: 'array', of: [{ type: 'link' }] },
        { name: 'copyrightText', type: 'string' },
        { name: 'badgeImages', type: 'array', of: [{ type: 'image' }] }, // G2, Capterra badges
        { name: 'socialLinks', type: 'array', of: [{ type: 'socialLink' }] },
      ]
    }
  ]
}
```

### 2.3 `homepage` Document (singleton)

Each section of the homepage is its own CMS object. Marketing can reorder, toggle visibility, and edit copy.

```typescript
// studio/schemas/documents/homepage.ts
export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    { name: 'seo', type: 'seo' },
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'logoCarousel' },
        { type: 'featureSection' },
        { type: 'statsSection' },
        { type: 'testimonialSection' },
        { type: 'pricingStrip' },
        { type: 'integrationSection' },
        { type: 'faqSection' },
        { type: 'ctaSection' },
      ]
    }
  ]
}
```

### 2.4 `page` Document (generic page builder)

For About, Contact, Features, Comparison pages, and any new pages.

```typescript
// studio/schemas/documents/page.ts
export default {
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'seo', type: 'seo' },
    {
      name: 'sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'featureSection' },
        { type: 'richTextSection' },
        { type: 'contactFormSection' },
        { type: 'calendlySection' },
        { type: 'logoCarousel' },
        { type: 'faqSection' },
        { type: 'ctaSection' },
      ]
    }
  ]
}
```

### 2.5 `blogPost` Document

```typescript
// Includes: title, slug, publishedAt, author (ref), categories (ref array),
// heroImage, excerpt, body (portable text), seo, relatedPosts (ref array)
// estimatedReadingTime (computed), isFeatured (boolean)
```

### 2.6 Multilingual Strategy

Sanity supports two approaches:

**Chosen approach: Separate document per language** (matches existing URL structure `/de/`, `/fr/`)

- Homepage gets one document per language: `homepage_de`, `homepage_fr`, etc.
- Language-specific pages fetched by a `language` field.
- Navigation document has language variants as sub-objects.
- Blog posts have a `language` field (`en`, `de`, `fr`, etc.) and a `translationGroup` UUID so editors can see all versions together.

Supported languages: `en`, `de`, `fr`, `nl`, `es`, `it`, `es-latam`, `pt-br`, `pl`, `pt`, `sv`, `cn`, `jp`, `ko`

### 2.7 Reusable `seo` Object

Used on every document that has a public page.

```typescript
// studio/schemas/objects/seo.ts
export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    { name: 'metaTitle', type: 'string', validation: R => R.max(60) },
    { name: 'metaDescription', type: 'text', rows: 3, validation: R => R.max(160) },
    { name: 'ogImage', type: 'image', description: '1200×630px recommended' },
    { name: 'ogTitle', type: 'string' },
    { name: 'ogDescription', type: 'text', rows: 2 },
    { name: 'noIndex', type: 'boolean', initialValue: false },
    { name: 'canonicalUrl', type: 'url', description: 'Leave blank to auto-generate' },
    { name: 'structuredData', type: 'code', options: { language: 'json' }, description: 'Custom schema.org JSON-LD override' },
  ]
}
```

---

## Phase 3 — Layout & Global Components

### 3.1 BaseLayout.astro

This is where GTM and CookieYes live as script tags — **not** inside any component.

```astro
---
// src/layouts/BaseLayout.astro
import BaseHead from '../components/seo/BaseHead.astro';
import Header from '../components/global/Header.astro';
import Footer from '../components/global/Footer.astro';

const { seo, navigation } = Astro.props;
---
<!doctype html>
<html lang={Astro.currentLocale ?? 'en'}>
<head>
  <BaseHead seo={seo} />

  <!-- CookieYes — load before GTM -->
  <script
    id="cookieyes"
    type="text/javascript"
    src="https://cdn-cookieyes.com/client_data/XXXXXXXX/script.js"
  ></script>

  <!-- Google Tag Manager -->
  <script is:inline>
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-XXXXXXX');
  </script>
</head>
<body>
  <!-- GTM noscript fallback -->
  <noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
  </noscript>

  <Header nav={navigation.header} />
  <main>
    <slot />
  </main>
  <Footer nav={navigation.footer} />
</body>
</html>
```

### 3.2 BaseHead Component

Central place for all meta tags, OG tags, canonical, and schema injection.

```astro
---
// src/components/seo/BaseHead.astro
interface Props {
  seo: SeoType;
  pageType?: 'website' | 'article' | 'product';
}
const { seo, pageType = 'website' } = Astro.props;
const canonical = seo.canonicalUrl ?? new URL(Astro.url.pathname, import.meta.env.SITE).href;
---
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{seo.metaTitle}</title>
<meta name="description" content={seo.metaDescription} />
<link rel="canonical" href={canonical} />
{seo.noIndex && <meta name="robots" content="noindex, nofollow" />}

<!-- Open Graph -->
<meta property="og:type" content={pageType} />
<meta property="og:title" content={seo.ogTitle ?? seo.metaTitle} />
<meta property="og:description" content={seo.ogDescription ?? seo.metaDescription} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={seo.ogImage ? urlFor(seo.ogImage).width(1200).height(630).url() : '/og-default.png'} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Desk365" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={seo.ogTitle ?? seo.metaTitle} />
<meta name="twitter:description" content={seo.ogDescription ?? seo.metaDescription} />
<meta name="twitter:image" content={seo.ogImage ? urlFor(seo.ogImage).width(1200).height(630).url() : '/og-default.png'} />

<!-- Favicon + app icons -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

<!-- Custom JSON-LD override from Sanity -->
{seo.structuredData && (
  <script type="application/ld+json" set:html={seo.structuredData} />
)}
```

### 3.3 Header Component

Fetches nav data at build time from Sanity. Renders all CMS-defined nav links, dropdowns, and CTAs.

```astro
---
// src/components/global/Header.astro
// Props: nav (from Sanity navigation.header)
// Features: sticky header, mobile hamburger (island), dropdown menus, dual CTAs
---
```

**Header island pattern:** The hamburger menu toggle on mobile uses `client:load` on a tiny React/Preact island so the rest of the header is pure HTML with zero JS overhead on desktop.

### 3.4 Footer Component

CMS-driven columns, legal links, badge images (G2/Capterra), social icons, copyright text.

### 3.5 Logo Carousel

```typescript
// Sanity schema: logoCarousel
// Fields: heading, logos[] { image, altText, href, width }
// Component: CSS scroll-snap + IntersectionObserver for infinite scroll feel
// Zero JS on server render; animation via CSS animation
```

### 3.6 Contact Forms

Two form instances — About page and Contact page — configured via Sanity:

```typescript
// Sanity object: contactFormSection
// Fields: formTitle, formSubtitle, fields[] { label, type, required, placeholder },
//         submitLabel, successMessage, recipientEmail (hidden)
// Implementation: React Hook Form island (client:load), submission to Formspree / Web3Forms
```

### 3.7 Calendly Integration (Request Demo)

```astro
<!-- src/components/forms/CalendlyEmbed.astro -->
<div id="calendly-inline" style="min-width:320px;height:700px;"></div>
<script is:inline>
  window.addEventListener('load', function() {
    Calendly.initInlineWidget({
      url: 'https://calendly.com/desk365/demo',
      parentElement: document.getElementById('calendly-inline'),
    });
  });
</script>
<script is:inline src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

Controlled via a `calendlySection` Sanity object — marketers can change the Calendly URL from the CMS without a redeploy.

### 3.8 Shortcode / Slot Patterns

Astro's named slots replace WordPress shortcodes. Define a registry:

```
[cta-button]       → <CTAButton /> component
[pricing-table]    → <PricingTable /> component
[feature-grid]     → <FeatureGrid /> component
[testimonial]      → <TestimonialCard /> component
```

Blog posts using Sanity Portable Text render these via custom components in the `components` map.

---

## Phase 4 — Homepage & Page Builder

### 4.1 Homepage Architecture

The homepage fetches one Sanity document containing an ordered array of sections. Each section type maps to an Astro component.

```astro
---
// src/pages/index.astro
import { sanityClient } from '../lib/sanity';
import { homepageQuery } from '../lib/queries';
import SectionRenderer from '../components/sections/SectionRenderer.astro';

const homepage = await sanityClient.fetch(homepageQuery);
---
<BaseLayout seo={homepage.seo}>
  {homepage.sections.map(section => (
    <SectionRenderer section={section} />
  ))}
</BaseLayout>
```

### 4.2 Section Components to Build

| Section | CMS Fields | Notes |
|---------|-----------|-------|
| `HeroSection` | headline, subheadline, ctaPrimary, ctaSecondary, heroImage, badge text | Animated headline via CSS |
| `LogoCarousel` | heading, logos[], autoScrollSpeed | Infinite CSS animation |
| `FeatureSection` | heading, subheading, features[] {icon, title, body}, layout (2col/3col/tabs) | Multiple layout variants |
| `StatsSection` | stats[] {value, label, suffix} | CountUp animation island |
| `TestimonialSection` | heading, testimonials[] {quote, name, role, company, avatar, rating} | Carousel or grid |
| `PricingStrip` | heading, plans[] {name, price, features[], ctaLabel, ctaHref, isPopular} | Matches /pricing full page |
| `IntegrationSection` | heading, integrations[] {logo, name, href}, ctaLabel | Grid display |
| `FaqSection` | heading, faqs[] {question, answer} | Accordion, FAQPage schema auto-generated |
| `CtaSection` | heading, subheading, ctaPrimary, ctaSecondary, bgColor, bgImage | Full-width CTA band |

### 4.3 SectionRenderer Pattern

```astro
---
// src/components/sections/SectionRenderer.astro
import HeroSection from './HeroSection.astro';
import LogoCarousel from './LogoCarousel.astro';
// ... all imports

const { section } = Astro.props;
---
{section._type === 'heroSection' && <HeroSection {...section} />}
{section._type === 'logoCarousel' && <LogoCarousel {...section} />}
{section._type === 'featureSection' && <FeatureSection {...section} />}
{section._type === 'statsSection' && <StatsSection {...section} />}
{section._type === 'testimonialSection' && <TestimonialSection {...section} />}
{section._type === 'pricingStrip' && <PricingStrip {...section} />}
{section._type === 'integrationSection' && <IntegrationSection {...section} />}
{section._type === 'faqSection' && <FaqSection {...section} />}
{section._type === 'ctaSection' && <CtaSection {...section} />}
```

This pattern means adding a new section type = add a schema + add one component + add one line here. No other files change.

---

## Phase 5 — Remaining Pages

### 5.1 Blog Pages

**Blog listing** (`/blog/`): Paginated, SSG with `getStaticPaths`, sorted by `publishedAt`. Supports category filtering via URL params.

**Blog post** (`/blog/[slug]/`): Full Portable Text rendering with custom components for callout boxes, code blocks, shortcodes. Author bio, related posts, social share buttons.

**GROQ query example:**
```javascript
export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    title,
    publishedAt,
    excerpt,
    heroImage { asset->{ url, metadata { dimensions } }, alt },
    body[]{
      ...,
      _type == "image" => { ..., asset->{ url, metadata { dimensions } } }
    },
    author->{ name, bio, avatar { asset->{ url } } },
    "relatedPosts": *[_type == "blogPost" && slug.current != $slug
      && count(categories[@._ref in ^.^.categories[]._ref]) > 0]
      | order(publishedAt desc)[0..2] {
        title, slug, publishedAt, excerpt, heroImage
      },
    seo
  }
`;
```

### 5.2 Pricing Page

Full pricing table with toggle (Monthly/Annual). Plan features managed in Sanity. All three signup CTAs must have distinct URLs (fixes the current bug where all CTAs share the same parameter).

```typescript
// Sanity: plans[] { name, monthlyPrice, annualPrice, features[] {text, included},
//                   ctaLabel, ctaMonthlyHref, ctaAnnualHref, isPopular }
```

### 5.3 About Page

Uses `page` document with sections: hero, team grid, values, contact form.

### 5.4 Contact Page

Uses `page` document with: contact form section + Calendly section + office info block.

### 5.5 Multilingual Pages

Pattern: `/[lang]/` renders a language-specific homepage variant fetched from Sanity.

```astro
---
// src/pages/[lang]/index.astro
export async function getStaticPaths() {
  const languages = ['de','fr','nl','es','it','es-latam','pt-br','pl','pt','sv','cn','jp','ko'];
  return languages.map(lang => ({ params: { lang } }));
}
const { lang } = Astro.params;
const homepage = await sanityClient.fetch(langHomepageQuery, { language: lang });
---
```

Each language homepage is a separate Sanity document. Editors for each market edit their own document in Sanity Studio with role-based access.

**`hreflang` tags** generated automatically in `BaseHead.astro` from a language map, covering all 13 language variants + `en` default.

---

## Phase 6 — Technical SEO Implementation

### 6.1 URL Structure

Maintain existing URL patterns exactly to preserve ranking signals.

```
/blog/[slug]/                     — blog posts
/pricing/                         — pricing page
/about/                           — about
/contact/                         — contact
/features/[feature-slug]/         — feature pages
/integrations/[integration-slug]/ — integration pages
/[lang]/                          — language homepages
/alternatives/[competitor]/       — alternatives pages (currently problematic — evaluate for 301 or refresh)
```

**Rule:** All URLs must end with a trailing slash. Configured in `astro.config.mjs`:
```javascript
export default defineConfig({ trailingSlash: 'always' });
```

### 6.2 Sitemap

Auto-generated by `@astrojs/sitemap`. Configuration:

```javascript
// astro.config.mjs
sitemap({
  filter: (page) => !page.includes('/thank-you') && !page.includes('/404'),
  changefreq: 'weekly',
  priority: 0.7,
  lastmod: new Date(),
  i18n: {
    defaultLocale: 'en',
    locales: { de:'de', fr:'fr', nl:'nl', es:'es', it:'it', pl:'pl',
               pt:'pt', sv:'sv', cn:'zh-CN', jp:'ja', ko:'ko' },
  },
})
```

Sitemap submitted to Google Search Console at launch. Updated on every Vercel deploy.

### 6.3 robots.txt

```txt
User-agent: *
Allow: /
Disallow: /studio/
Disallow: /api/
Disallow: /thank-you/
Disallow: /preview/

Sitemap: https://www.desk365.io/sitemap-index.xml
```

### 6.4 Schema Markup

Auto-generated at the component level — no manual JSON-LD needed for standard types.

| Schema Type | Where Generated | Trigger |
|------------|----------------|---------|
| `Organization` | BaseLayout (every page) | Always |
| `WebSite` (with SearchAction) | BaseLayout | Always |
| `SoftwareApplication` | Homepage + Pricing | Always |
| `FAQPage` | FaqSection component | When faq section present |
| `Article` | BlogLayout | Blog posts only |
| `BreadcrumbList` | PageLayout | Pages with depth > 1 |
| `Product` | Pricing page | Pricing page only |
| `Review` / `AggregateRating` | TestimonialSection | When ratings present |

Custom JSON-LD override is always available per-page via the `seo.structuredData` Sanity field.

### 6.5 Canonical Tags

Auto-generated in `BaseHead.astro` from `Astro.url`. Editor can override per-page via `seo.canonicalUrl` in Sanity. Multilingual pages have language-specific canonicals — each `/de/`, `/fr/` page is canonical to itself, not pointing back to `/en/`.

### 6.6 Heading Tag Discipline

**Rule applied across all templates:**
- One `<h1>` per page, always from the hero section `headline` field.
- Section headings use `<h2>`.
- Feature/card headings within sections use `<h3>`.
- No skipped heading levels.
- Heading text always comes from CMS — no hardcoded strings in components.

### 6.7 Internal Linking Patterns

- Blog posts: 3–5 contextual internal links via Portable Text links (marketers add in CMS).
- Footer: covers all major page categories.
- Homepage: hero CTA + pricing CTA + feature deep links.
- Breadcrumbs on all blog posts and feature sub-pages.
- Related posts block on every blog post (3 posts, GROQ query by category overlap).

### 6.8 Staging URL Audit (Critical)

Pre-deploy script scans built HTML for any `staging.desk365.io` occurrences:

```bash
# package.json script
"check:staging-urls": "grep -r 'staging.desk365.io' dist/ && exit 1 || exit 0"
```

Added to Vercel build command: `astro build && npm run check:staging-urls`

---

## Phase 7 — Analytics & Scripts

### 7.1 All Scripts — Location Reference

| Script | Location | Load Strategy |
|--------|----------|--------------|
| CookieYes | `<head>` in BaseLayout | Synchronous (must be first) |
| GTM `<script>` | `<head>` in BaseLayout | Async |
| GTM `<noscript>` | `<body>` top in BaseLayout | Static |
| Microsoft Clarity | Via GTM (not hardcoded) | After consent |
| FB Pixel | Via GTM | After consent |
| Calendly widget | Calendly component only | Async, page-level |

**Rule:** No analytics script is hardcoded except CookieYes and GTM. Everything else fires from GTM tags, controlled by consent triggers.

### 7.2 Google Tag Manager Setup

Container structure:

```
GTM-XXXXXXX
├── Tags
│   ├── GA4 Configuration
│   ├── GA4 — Page View
│   ├── GA4 — CTA Click
│   ├── GA4 — Form Submit
│   ├── GA4 — Demo Request
│   ├── FB Pixel — PageView
│   ├── FB Pixel — Lead
│   └── Microsoft Clarity
├── Triggers
│   ├── All Pages
│   ├── CTA Button Click (CSS selector)
│   ├── Form Submission Success
│   ├── Calendly Event Scheduled
│   └── Consent Granted (CookieYes)
└── Variables
    ├── GA4 Measurement ID
    ├── FB Pixel ID
    └── Page Type (dataLayer)
```

### 7.3 Google Consent Mode v2

```javascript
// In BaseLayout, before GTM — fixes the issue diagnosed in prior audit
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'wait_for_update': 500,
});
```

CookieYes updates consent state via GTM trigger on user choice. This is the remediation path that was already scoped — now applied in this migration.

### 7.4 DataLayer Events

Push to dataLayer at key interaction points:

```javascript
// CTA click
dataLayer.push({ event: 'cta_click', cta_text: 'Start Free Trial', cta_location: 'hero' });

// Form submit
dataLayer.push({ event: 'form_submit', form_id: 'contact', form_location: 'contact_page' });

// Calendly scheduled
window.addEventListener('message', (e) => {
  if (e.data.event === 'calendly.event_scheduled') {
    dataLayer.push({ event: 'demo_scheduled' });
  }
});
```

### 7.5 Vercel Analytics

```javascript
// astro.config.mjs — add Vercel Web Analytics
import vercel from '@astrojs/vercel/serverless';
// In layout: import { Analytics } from '@vercel/analytics/astro';
```

Vercel Analytics is privacy-friendly, no cookie consent required.

---

## Phase 8 — Content Migration

### 8.1 WordPress Export

```bash
# Export WordPress content via WP-CLI
wp export --path=/var/www/html --dir=/tmp/wp-export --post_type=post,page
wp media export --path=/var/www/html --dir=/tmp/media-export

# Or use the WordPress REST API to pull structured JSON
curl https://desk365.io/wp-json/wp/v2/posts?per_page=100 > posts.json
curl https://desk365.io/wp-json/wp/v2/pages?per_page=100 > pages.json
```

### 8.2 Sanity Import Script

```javascript
// scripts/migrate-wp-to-sanity.js
// 1. Read WordPress JSON exports
// 2. Convert HTML body to Portable Text using @portabletext/from-html
// 3. Download and upload images to Sanity asset store
// 4. Create Sanity documents via @sanity/client .createOrReplace()
// 5. Set slugs, published dates, categories, authors
```

### 8.3 Image Migration

All images currently served by Jetpack Photon CDN migrate to Sanity's CDN (`cdn.sanity.io`). The `urlFor()` helper replaces all hardcoded Photon URLs in templates.

### 8.4 Multilingual Content

Each language homepage recreated in Sanity. Priority order for content population:
1. English (source of truth)
2. German, French, Dutch (tier 1 — populate first)
3. Spanish, Italian, Portuguese (tier 2)
4. Remaining languages (tier 3)

---

## Phase 9 — Performance

### 9.1 Astro's Built-in Wins

- **Zero JS by default** — every page is static HTML unless a component is marked `client:load/idle/visible`.
- **Component islands** — only interactive components (hamburger menu, pricing toggle, carousel) ship JS.
- **Built-in CSS scoping** — no unused CSS leaks between components.
- **Build-time Tailwind purge** — only used utility classes in final CSS.

This eliminates the Elementor bloat issue that was causing HTML page size to exceed Googlebot's crawl threshold.

### 9.2 Image Optimization

```astro
---
import { Image } from 'astro:assets';
---
<!-- Width/height always explicit — fixes the Photon CDN mismatch issue -->
<Image
  src={heroImageUrl}
  alt={heroImageAlt}
  width={1200}
  height={630}
  loading="eager"        <!-- above-fold images: eager -->
  decoding="async"
  format="webp"
/>
```

All below-fold images use `loading="lazy"`. Sanity CDN applies format transforms: WebP for modern browsers, fallback for Safari.

### 9.3 Critical CSS

Astro handles this automatically with its CSS bundler. Additional optimization:

```javascript
// astro.config.mjs
export default defineConfig({
  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        output: { manualChunks: undefined } // Inline critical CSS
      }
    }
  }
});
```

### 9.4 Font Loading

```html
<!-- In BaseHead.astro — preconnect + preload critical font subsets -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  media="print" onload="this.media='all'" />
```

Or self-host fonts in `/public/fonts/` (faster, no Google dependency).

### 9.5 Vercel Edge Caching

```javascript
// In Astro page front-matter or vercel.json headers
// Static pages: cache for 1 year, stale-while-revalidate
// On Sanity publish webhook → Vercel deploy hook → fresh build in <60s
```

```json
// vercel.json headers
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

### 9.6 Third-party Script Strategy

| Script | Issue in Current Site | Fix in New Site |
|--------|----------------------|----------------|
| Microsoft Clarity | Render-blocking | Load via GTM after consent |
| Calendly widget | Only on demo/contact pages | Lazy import, not global |
| GTM | Async (already correct) | Async, after CookieYes |

### 9.7 Target Lighthouse Scores

| Metric | Current (WP+Elementor) | Target (Astro) |
|--------|----------------------|----------------|
| Performance | ~45–60 | ≥90 |
| Accessibility | ~75 | ≥95 |
| Best Practices | ~70 | ≥95 |
| SEO | ~85 | 100 |
| LCP | >4s | <2.5s |
| CLS | >0.1 | <0.05 |
| FID/INP | >200ms | <100ms |

---

## Phase 10 — QA, Redirects & Cross-Browser

### 10.1 301 Redirect Strategy

All existing planned redirects from the P0 sprint (low-value pages, competitor pricing pages) are implemented in `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/blog/zendesk-pricing/",
      "destination": "/alternatives/zendesk/",
      "permanent": true
    },
    {
      "source": "/sorry-for-the-inconvenience/",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

**Redirect management via Sanity (optional Phase 2 upgrade):** A `redirect` document type in Sanity lets marketers add redirects. A Vercel serverless function reads Sanity at edge request time — no rebuild needed for new redirects.

### 10.2 Pre-Launch Audit Checklist

**SEO checks:**
- [ ] All pages have unique meta title + description (populated in Sanity)
- [ ] All pages have `<h1>` — exactly one
- [ ] No heading levels are skipped
- [ ] Canonical tag on every page points to correct production URL
- [ ] No `staging.desk365.io` links in built HTML (automated check)
- [ ] OG image renders at 1200×630 (test with opengraph.xyz)
- [ ] Sitemap accessible at `/sitemap-index.xml`
- [ ] robots.txt accessible and correct
- [ ] Ahrefs: run site crawl on staging before launch
- [ ] All existing 301 redirects in vercel.json and tested

**Technical checks:**
- [ ] All three pricing plan CTAs have distinct `?plan=starter`, `?plan=pro`, `?plan=enterprise` params
- [ ] Contact forms submit successfully and send email
- [ ] Calendly embed loads and schedules correctly
- [ ] Logo carousel renders without layout shift
- [ ] Multilingual pages accessible at `/de/`, `/fr/`, etc.
- [ ] `hreflang` tags correct on all language variants
- [ ] Schema.org valid (test with Google Rich Results Test)
- [ ] GTM container fires on all pages (test in GTM Preview mode)
- [ ] GA4 receives pageviews (test in GA4 Realtime)
- [ ] FB Pixel fires correctly (test with Meta Pixel Helper)
- [ ] CookieYes consent banner appears, all consent options work
- [ ] Consent Mode v2 signals fire correctly (test with GTM Preview)

**Performance checks:**
- [ ] Lighthouse ≥90 on homepage (mobile + desktop)
- [ ] Lighthouse ≥90 on blog post page
- [ ] No render-blocking scripts
- [ ] WebP images serving correctly
- [ ] No images loading without explicit width/height (CLS check)

**Cross-browser checks:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari 16+ (macOS + iOS)
- [ ] Edge (latest)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iPhone)

### 10.3 Issues to Document (from Current Lighthouse/Ahrefs Findings)

Maintain a living doc in Notion/Linear:

| Issue | Source | Status | Fix Applied |
|-------|--------|--------|-------------|
| Homepage HTML > Googlebot crawl threshold | Lighthouse/prior audit | Resolved in Astro (no Elementor CSS) | ✅ |
| All pricing CTAs same signup param | Prior audit | Fixed in Sanity schema + template | ✅ |
| Staging URLs in production | Prior audit | Automated check in build | ✅ |
| Elementor placeholder text in nav | Prior audit | N/A — no Elementor | ✅ |
| Clarity render-blocking | Lighthouse | Via GTM, after consent | ✅ |
| Consent Mode v2 not implemented | Prior audit | BaseLayout script | ✅ |
| OG image missing on some pages | Ahrefs | Sanity SEO object required | ✅ |
| Photon CDN width mismatch | Prior audit | Astro Image with explicit dims | ✅ |

---

## Phase 11 — Launch

### 11.1 Pre-Launch (T-48h)

- [ ] Staging environment passing all QA checks above
- [ ] All content migrated and reviewed in Sanity
- [ ] Marketing team trained on Sanity Studio (1h walkthrough)
- [ ] Vercel production project linked to `main` branch
- [ ] All environment variables set in Vercel production
- [ ] Sanity CORS origin updated to include `desk365.io`
- [ ] Custom domain configured in Vercel
- [ ] SSL certificate auto-provisioned by Vercel

### 11.2 DNS Cutover (T-0)

```
1. Set WordPress to maintenance mode
2. Build final Astro production build (runs in ~2min on Vercel)
3. Update DNS A/CNAME records to point to Vercel
4. TTL: set to 300s (5min) 24h before to enable fast rollback
5. Verify production deployment loads correctly
6. Test contact form, Calendly, blog, and multilingual pages
7. Remove maintenance mode on WordPress (keep WP alive for 30 days as fallback)
```

### 11.3 Post-Launch (T+24h / T+7d)

**T+24h:**
- [ ] Submit sitemap in Google Search Console
- [ ] Request indexing for homepage, pricing, top blog posts
- [ ] Verify Search Console ownership (HTML tag via Sanity `<head>` injection or DNS verification)
- [ ] Check Ahrefs — confirm crawl picks up new URLs
- [ ] Monitor GA4 Realtime for 30min post-launch
- [ ] Check Vercel error logs for any 404s

**T+7d:**
- [ ] Review Google Search Console Coverage report — no new errors
- [ ] Confirm all 301 redirects passing link equity (check in Ahrefs Backlinks)
- [ ] Lighthouse audit on live production site (not staging)
- [ ] Review GA4 — pageview parity with pre-migration baseline
- [ ] Review Core Web Vitals in Search Console — confirm no regression

---

## Appendix A — Sanity Studio Access Control

| Role | Access |
|------|--------|
| Admin | All documents, schema changes, dataset management |
| Editor | All content documents (no settings, no navigation) |
| Language Editor (de) | Homepage_de, BlogPost where language=de |
| Developer | Admin (separate dev dataset) |

---

## Appendix B — Vercel.json Full Template

```json
{
  "framework": "astro",
  "buildCommand": "astro build && npm run check:staging-urls",
  "outputDirectory": "dist",
  "redirects": [
    { "source": "/sorry-for-the-inconvenience/", "destination": "/", "permanent": true }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/studio/(.*)", "destination": "/studio/index.html" }
  ]
}
```

---

## Appendix C — Sanity Webhook → Vercel Deploy

```
Sanity → On document publish → POST to Vercel Deploy Hook URL
Result → Vercel triggers incremental rebuild → New pages live in <60s globally
```

Set up in Sanity: **API → Webhooks → New Webhook**
- URL: `https://api.vercel.com/v1/integrations/deploy/HOOK_ID`
- Dataset: `production`
- Trigger on: `create`, `update`, `delete`
- Filter: `_type in ["homepage","navigation","siteSettings","page","blogPost"]`

---

*Last updated: June 2026 · desk365.io migration planning*

take the UI design from current desk365.io page inclusing the header, footer and the dropdowns under neach navbar and language switcher