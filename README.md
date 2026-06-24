# Desk365 — Astro + Sanity CMS Monorepo

## Overview

This is the **Desk365** website, a Turborepo monorepo with two apps:

| App | Path | Port | Purpose |
|-----|------|------|---------|
| **Web** (Astro) | `apps/web` | `4321` | Public-facing website (SSR + static) |
| **Studio** (Sanity) | `apps/studio` | `3333` | Content management dashboard |

**Tech stack:** Astro 4 · Sanity v3 · TailwindCSS 3 · Turborepo · Vercel · TypeScript

---

## Project Structure

```
astro-sanity/
├── package.json              # Root workspace config (npm workspaces)
├── turbo.json                # Turborepo task pipeline
├── vercel.json               # Root Vercel deployment config
├── rewrite.js                # One-time Header.astro rewrite script
│
├── apps/
│   ├── web/                  # ── ASTRO FRONTEND ──
│   │   ├── astro.config.mjs  # Astro config (hybrid mode, Vercel adapter)
│   │   ├── tailwind.config.mjs
│   │   ├── tsconfig.json
│   │   ├── .env              # Sanity credentials + site config
│   │   ├── vercel.json       # App-level Vercel config (rewrites, headers)
│   │   ├── public/           # Static assets (logos, favicon, robots.txt)
│   │   └── src/
│   │       ├── env.d.ts          # TypeScript env var declarations
│   │       ├── middleware.ts     # Preview cookie reader
│   │       ├── styles/global.css # D365 design tokens + Tailwind layers
│   │       ├── lib/
│   │       │   ├── sanity.ts     # Sanity client (published + draft)
│   │       │   ├── queries.ts    # All GROQ queries
│   │       │   ├── types.ts      # TypeScript interfaces
│   │       │   ├── urlFor.ts     # Sanity image URL builder
│   │       │   └── nav-data.ts   # Hardcoded fallback navigation
│   │       ├── layouts/
│   │       │   └── BaseLayout.astro  # Shell: head, header, footer, preview
│   │       ├── pages/
│   │       │   ├── index.astro           # Homepage (SSR)
│   │       │   ├── [...slug].astro       # Dynamic pages (SSR)
│   │       │   ├── api/preview/enable.ts # Preview mode ON
│   │       │   ├── api/preview/disable.ts# Preview mode OFF
│   │       │   ├── intent/[...path].astro# Studio intent redirect
│   │       │   ├── sitemap_index.xml.ts  # Sitemap index
│   │       │   ├── page-sitemap.xml.ts   # Pages sitemap
│   │       │   ├── post-sitemap.xml.ts   # Blog posts sitemap
│   │       │   └── author-sitemap.xml.ts # Authors sitemap
│   │       └── components/
│   │           ├── PageSection.astro       # Page builder section renderer
│   │           ├── global/  (Header, Footer)
│   │           ├── home/    (16 D365 homepage sections + renderer)
│   │           ├── sections/(Hero, Features, Stats, CTA, etc.)
│   │           ├── blocks/  (18 block types + BlockRenderer)
│   │           ├── preview/ (PreviewBar)
│   │           └── seo/     (BaseHead)
│   │
│   └── studio/               # ── SANITY STUDIO ──
│       ├── sanity.config.ts  # Studio config (plugins, structure, preview)
│       ├── .env              # Studio project ID, dataset, write token
│       ├── actions/
│       │   └── SaveDraftAction.tsx  # "Draft saved" status button
│       ├── scripts/
│       │   └── seed-homepage.ts     # Seed homepage with sample content
│       └── schemas/
│           ├── index.ts             # Schema registry (all types)
│           ├── documents/           # 7 document types
│           ├── objects/             # 6 object types + blocks/
│           │   └── blocks/          # 18 page builder block types
│           └── sections/            # 22 section types (6 generic + 16 D365)
```

---

## How It Works — End to End

### 1. Monorepo Orchestration (Turborepo)

The root `package.json` uses **npm workspaces** (`apps/*`). Turborepo coordinates:

```bash
npm run dev      # Runs both Astro dev + Sanity Studio in parallel
npm run build    # Builds both apps (Astro first, respects dependsOn)
npm run studio   # Runs only Sanity Studio
```

`turbo.json` defines:
- **`dev`**: No cache, persistent (long-running servers)
- **`build`**: Cached, outputs `dist/**`
- **`preview`**: Depends on build completing first

### 2. Sanity Studio (Content Management)

**Location:** `apps/studio` — runs on `localhost:3333`

#### Document Types (7)
| Document | Type | Description |
|----------|------|-------------|
| Navigation | Singleton | Header nav links, dropdowns, footer columns, social links, legal links |
| Site Settings | Singleton | Site name, URL, default SEO, logo |
| Homepage | Singleton | SEO + `pageBuilder[]` array of sections |
| Page | Collection | Dynamic pages with slug + `pageBuilder[]` |
| Blog Post | Collection | Title, slug, body (Portable Text), author ref, SEO |
| Author | Collection | Name, slug, bio, avatar |
| Section Template | Collection | Reusable section templates (referenced in pages) |

#### Schema Architecture

**Objects** define reusable field groups:
- `seo` — metaTitle, metaDescription, ogImage, canonicalUrl, structuredData, noIndex
- `ctaButton` — label, href, style (filled/outline/ghost), color
- `customCode` — enabled flag + HTML/CSS/JS code fields
- `link`, `socialLink` — basic link structures
- `pageSection` — the core page builder section (layout, blocks[], background, spacing, responsive)

**Blocks** (18 types) are the atomic content units inside sections:
`headingBlock`, `imageBlock`, `richTextBlock`, `videoBlock`, `buttonBlock`, `dividerBlock`, `spacerBlock`, `accordionBlock`, `htmlBlock`, `shortcodeBlock`, `imageBoxBlock`, `iconBoxBlock`, `imageCarouselBlock`, `formBlock`, `loopGridBlock`, `loopCarouselBlock`, `slidesBlock`, `templateBlock`

**Sections** (22 types):
- 6 generic: `heroSection`, `logosSection`, `featuresSection`, `statsSection`, `ctaSection`, `testimonialsSection`
- 16 D365-specific: `d365HeroSection`, `d365TrustBarSection`, `d365StatsSection`, `d365FeatureCardsSection`, `d365ChannelTabsSection`, `d365AIFeaturesSection`, `d365MicrosoftSection`, `d365ITSMSection`, `d365CapabilitiesSection`, `d365ComparisonSection`, `d365IntegrationsSection`, `d365TestimonialsSection`, `d365WhyChooseSection`, `d365SecuritySection`, `d365BlogSection`, `d365FinalCtaSection`

#### Studio UI Structure

The `structureTool` in `sanity.config.ts` defines a custom sidebar:
```
Content
├── Navigation (singleton)
├── Site Settings (singleton)
├── Homepage (singleton)
├── Pages (list)
├── ──────────
├── Blog Posts (list)
├── Authors (list)
├── ──────────
└── Section Templates (list)
```

#### Studio Plugins
- **Structure Tool** — Custom sidebar ordering
- **Presentation Tool** — Live preview with the Astro site embedded in an iframe
- **Vision Tool** — GROQ query playground
- **Code Input** — Syntax-highlighted code fields (HTML/CSS/JS)
- **Media** — Enhanced image/file library browser

#### Custom Document Actions

`SaveDraftAction.tsx` adds a "Draft saved" / "No changes" status button next to the Publish button for content documents.

#### Seed Script

```bash
cd apps/studio && npm run seed
```
Creates a sample homepage with page builder sections (hero, features, CTA) using the `SANITY_WRITE_TOKEN`.

---

### 3. Astro Frontend (Website Rendering)

**Location:** `apps/web` — runs on `localhost:4321`

#### Rendering Mode: Hybrid

`astro.config.mjs` sets `output: 'hybrid'`:
- **Default:** Pages are statically generated at build time
- **SSR routes:** Pages with `export const prerender = false` are server-rendered

SSR routes in this project:
- `index.astro` (homepage) — SSR for preview mode support
- `[...slug].astro` (dynamic pages) — SSR to fetch from Sanity at request time
- `api/preview/enable.ts` and `api/preview/disable.ts` — API routes
- `intent/[...path].astro` — Studio redirect handler

Static routes:
- `sitemap_index.xml.ts`, `page-sitemap.xml.ts`, `post-sitemap.xml.ts`, `author-sitemap.xml.ts`

#### Sanity Client (`lib/sanity.ts`)

Two client configurations:
```typescript
sanityClient    // perspective: 'published', uses CDN when no token
getDraftClient()// perspective: 'previewDrafts', no CDN, requires token
```

Pages check `Astro.locals.isPreview` to decide which client to use.

#### Data Flow

```
Sanity Studio → Content saved to Sanity dataset
                         ↓
Astro page loads → GROQ query via @sanity/client
                         ↓
Raw JSON response → Typed with TypeScript interfaces (lib/types.ts)
                         ↓
Passed as props → Astro components render HTML
                         ↓
Styled with → Tailwind + D365 design tokens (global.css)
```

#### GROQ Queries (`lib/queries.ts`)

| Query | Fetches |
|-------|---------|
| `navigationQuery` | Header + footer + solutions menu from Navigation singleton |
| `siteSettingsQuery` | Site name, URL, default SEO |
| `homepagePageBuilderQuery` | Homepage SEO + pageBuilder[] with all D365 section types |
| `pageBySlugQuery` | Single page by slug with pageBuilder[] |
| `allPageSlugsQuery` | All page slugs (for routing) |
| `blogPostQuery` | Single blog post with author, related posts |
| `pageSitemapQuery` | Page slugs + lastmod for sitemap |
| `postSitemapQuery` | Post slugs + lastmod for sitemap |
| `authorSitemapQuery` | Author slugs + lastmod for sitemap |

#### Page Rendering Flow

**Homepage (`index.astro`):**
1. Checks `isPreview` from middleware → picks published or draft client
2. Fetches `homepagePageBuilderQuery` → gets `pageBuilder[]` array
3. If pageBuilder has items → maps through `HomeSectionRenderer.astro`
4. If empty → renders 16 static fallback `Home*Section` components
5. Sets cache headers: `s-maxage=60, stale-while-revalidate=300`

**Dynamic Pages (`[...slug].astro`):**
1. Extracts slug from URL params
2. Fetches `pageBySlugQuery` with slug parameter
3. Returns 404 if not found
4. Maps through `pageBuilder[]` via `PageSection.astro`
5. Sets cache headers

**HomeSectionRenderer.astro** checks `section._type` and delegates to the matching component (e.g., `d365HeroSection` → `HomeHeroSection.astro`).

**PageSection.astro** handles the generic page builder: applies layout classes (stack, cols-2, cols-3, etc.), container width, backgrounds, spacing, and iterates blocks through `BlockRenderer.astro`.

**BlockRenderer.astro** maps each `block._type` to its component (18 block types).

#### Layout (`BaseLayout.astro`)

Every page wraps in `BaseLayout` which:
1. Imports `global.css` (Tailwind + D365 tokens)
2. Renders `BaseHead.astro` (meta tags, OG, Twitter cards, canonical URL)
3. Fetches navigation from Sanity (falls back to `DEFAULT_NAV` from `nav-data.ts`)
4. Renders `Header` + `<main><slot/></main>` + `Footer`
5. Shows `PreviewBar` when in preview mode
6. Injects Organization + WebSite JSON-LD schema
7. Has placeholders for Google Consent Mode, CookieYes, GTM

#### Image Handling (`lib/urlFor.ts`)

Uses `@sanity/image-url` to build optimized image URLs:
```typescript
urlFor(seo.ogImage).width(1200).height(630).format('webp').url()
```

---

### 4. Preview System (Live Editing)

The preview system lets editors see unpublished changes in real-time.

#### How It Works

```
Editor in Sanity Studio
    ↓ clicks "Preview" tab
Studio loads Presentation Tool
    ↓ opens iframe to http://localhost:4321
    ↓ calls /api/preview/enable?sanity-preview-secret=<token>
Enable endpoint:
    ↓ validates secret via @sanity/preview-url-secret
    ↓ sets cookie: sanity-preview=true (httpOnly, 1hr)
    ↓ redirects to target page
Middleware reads cookie:
    ↓ sets Astro.locals.isPreview = true
Page fetches with getDraftClient():
    ↓ perspective: 'previewDrafts' (sees unpublished content)
    ↓ renders draft content
@sanity/visual-editing:
    ↓ enables click-to-edit overlays
    ↓ clicking opens the field in Studio
PreviewBar shows at bottom:
    ↓ "Preview mode" banner with "Open Studio" + "Exit Preview" buttons
```

#### Key Files

| File | Role |
|------|------|
| `middleware.ts` | Reads `sanity-preview` cookie → sets `locals.isPreview` |
| `api/preview/enable.ts` | Validates Sanity secret, sets preview cookie |
| `api/preview/disable.ts` | Deletes preview cookie |
| `intent/[...path].astro` | Redirects `/intent/edit/...` URLs to Studio |
| `PreviewBar.astro` | Floating banner with exit/studio links |

#### Visual Editing

`@sanity/visual-editing` is activated only when `data-sanity-preview="true"` on `<body>`. It adds click-to-edit overlays using `data-sanity` attributes generated by `createDataAttribute()` in `PageSection.astro` and `BlockRenderer.astro`.

#### Presentation Tool Config

In `sanity.config.ts`, `presentationTool()` maps document types to preview URLs:
- `page` → `/{slug}`
- `blogPost` → `/blog/{slug}`
- `homepage` → `/`
- `navigation`, `siteSettings` → `/`
- `sectionTemplate` → `/`

---

### 5. SEO System

#### BaseHead.astro
- `<title>` with fallback
- `<meta name="description">` with fallback
- Canonical URL (from Sanity or auto-generated)
- robots meta (noindex/nofollow when set)
- Open Graph tags (type, title, description, url, image)
- Twitter Card tags
- Favicon links
- Custom JSON-LD from Sanity `structuredData` field

#### BaseLayout.astro
- Organization schema on every page
- WebSite schema with SearchAction

#### Sitemaps
- `sitemap_index.xml` → links to page/post/author sitemaps
- `page-sitemap.xml` → static pages + dynamic Sanity pages
- `post-sitemap.xml` → blog posts from Sanity
- `author-sitemap.xml` → authors from Sanity
- `robots.txt` → allows all, disallows `/studio/`, `/api/`, `/preview/`

---

### 6. Styling System

**Tailwind CSS 3** with custom config:
- Custom `primary` color palette (blue shades)
- `Roboto` font family
- `fade-in` and `slide-down` animations

**D365 Design Tokens** (`global.css`):
- CSS custom properties: `--d365-blue`, `--d365-green`, `--d365-pink`, etc.
- Utility classes: `.d365-section`, `.d365-container`, `.d365-heading`, `.d365-body`, `.d365-btn`, `.d365-card`, `.d365-icon-box`, `.d365-grid`, `.d365-link`
- Nav dropdown animations (opacity + transform transitions)
- Page builder preview styles (dashed outlines, labels)

---

### 7. Deployment (Vercel)

#### Configuration

Root `vercel.json`:
- `buildCommand`: `turbo run build --filter=desk365-web`
- `outputDirectory`: `apps/web/dist`
- `framework`: `astro`
- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- Asset caching: `Cache-Control: public, max-age=31536000, immutable`
- Redirect: `/sorry-for-the-inconvenience/` → `/`

App-level `apps/web/vercel.json`:
- Rewrite: `/studio/(.*)` → `/studio/index.html`

#### Adapter

`astro.config.mjs` conditionally loads `@astrojs/vercel/serverless` only when `process.env.VERCEL` is set (production). Local dev uses Astro's built-in server.

#### Build Safety

The build script includes a staging URL check:
```json
"build": "astro build && npm run check:staging-urls"
```
This greps the output for `staging.desk365.io` and fails the build if found.

---

### 8. Navigation System

Navigation data comes from **two sources**:

1. **Sanity** — `Navigation` singleton fetched via `navigationQuery`
2. **Fallback** — `nav-data.ts` has hardcoded `DEFAULT_NAV` used when Sanity is unavailable

`BaseLayout.astro` tries Sanity first, falls back silently:
```typescript
let nav = DEFAULT_NAV;
try {
  const fetched = await sanityClient.fetch(navigationQuery);
  if (fetched?.header && fetched?.footer) nav = fetched;
} catch { /* use fallback */ }
```

The `Header.astro` component renders mega menus (Features, Solutions, Resources) with hardcoded navigation data arrays and SVG icons.

---

## Environment Variables

### `apps/web/.env`
| Variable | Description |
|----------|-------------|
| `PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `PUBLIC_SANITY_DATASET` | Dataset name (staging/production) |
| `SANITY_API_READ_TOKEN` | API token for reading content |
| `PUBLIC_SITE_URL` | Public site URL |
| `SANITY_PREVIEW_SECRET` | Static preview secret (empty for local dev) |
| `PUBLIC_SANITY_STUDIO_URL` | Studio URL for preview bar links |

### `apps/studio/.env`
| Variable | Description |
|----------|-------------|
| `SANITY_STUDIO_PROJECT_ID` | Sanity project ID |
| `SANITY_STUDIO_DATASET` | Dataset name |
| `SANITY_STUDIO_PREVIEW_URL` | Astro app URL for Presentation tool iframe |
| `SANITY_WRITE_TOKEN` | Editor token for seed script |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp apps/web/.env.example apps/web/.env
# Edit with your Sanity credentials

# 3. Start both apps
npm run dev
# Web  → http://localhost:4321
# Studio → http://localhost:3333

# 4. (Optional) Seed homepage content
cd apps/studio && npm run seed
```

---

## Key Workflows

### Adding a New Page
1. Open Studio → Pages → Create new
2. Set title, slug, SEO fields
3. Add sections to `pageBuilder[]`
4. Add blocks inside each section
5. Publish → page is live at `/{slug}`

### Adding a Homepage Section
1. Open Studio → Homepage
2. Add a new item to `pageBuilder[]`
3. Choose from D365 section types or generic `pageSection`
4. Fill in content fields
5. Publish → section appears on homepage

### Creating a Blog Post
1. Open Studio → Blog Posts → Create new
2. Set title, slug, excerpt, hero image
3. Write body content (Portable Text)
4. Assign author, categories
5. Fill SEO fields
6. Publish → post is live at `/blog/{slug}`

### Using Preview Mode
1. Open Studio → click "Preview" tab (eye icon)
2. Presentation tool loads the site in an iframe
3. Edit any document → changes appear live (no publish needed)
4. Hover content → click pencil to jump to that field in Studio
5. Click "Exit Preview" to return to published view
