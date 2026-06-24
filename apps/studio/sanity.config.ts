import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { defineDocuments, defineLocations, presentationTool } from 'sanity/presentation';
import { codeInput } from '@sanity/code-input';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './schemas/index';
import { SaveDraftAction } from './actions/SaveDraftAction';
import { OpenVisualEditorAction } from './actions/OpenVisualEditorAction';
import { ClearCacheAction } from './actions/ClearCacheAction';
import { PageTableView } from './components/PageTableView';

const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_URL ?? 'http://localhost:4321';

export default defineConfig({
  name: 'desk365',
  title: 'Desk365 CMS',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'staging',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website')
          .items([
            // ── PAGES ──────────────────────────────────────────────────────
            // Custom table view — lists all page types with status, SEO,
            // permalink and quick actions (edit / visual edit / trash / cache).
            S.listItem()
              .title('Pages')
              .id('pages-group')
              .child(
                S.component(PageTableView)
                  .title('Pages')
                  .id('pages-table')
              ),

            S.divider(),

            // ── GLOBAL COMPONENTS ──────────────────────────────────────────
            // Tip: use the "Preview" tab at the top of Studio to live-preview any page
            S.listItem()
              .title('Global Components')
              .id('global-components')
              .child(
                S.list()
                  .title('Global Components')
                  .items([
                    S.listItem()
                      .title('Header & Footer')
                      .id('navigation')
                      .child(
                        S.document()
                          .schemaType('navigation')
                          .documentId('navigation')
                          .title('Header & Footer')
                      ),
                    S.listItem()
                      .title('Site Settings & SEO')
                      .id('siteSettings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('Site Settings & SEO')
                      ),
                  ])
              ),

            S.divider(),

            // ── REUSABLE SECTION TEMPLATES ─────────────────────────────────
            S.listItem()
              .title('Reusable Section Templates')
              .id('section-templates')
              .child(
                S.documentTypeList('sectionTemplate')
                  .title('Reusable Section Templates')
              ),

            S.divider(),

            // ── BLOG ───────────────────────────────────────────────────────
            S.listItem()
              .title('Blog')
              .id('blog-group')
              .child(
                S.list()
                  .title('Blog')
                  .items([
                    S.listItem()
                      .title('Blog Posts')
                      .id('blogPosts')
                      .child(S.documentTypeList('blogPost').title('Blog Posts')),
                    S.listItem()
                      .title('Authors')
                      .id('authors')
                      .child(S.documentTypeList('author').title('Authors')),
                  ])
              ),
          ]),
    }),

    presentationTool({
      name: 'presentation',
      title: 'Preview',
      previewUrl: {
        initial: previewOrigin,
        previewMode: {
          enable: `${previewOrigin}/api/preview/enable`,
          disable: `${previewOrigin}/api/preview/disable`,
        },
      },
      resolve: {
        // Maps URLs → Sanity documents so the Studio sidebar knows which
        // document to show when the Presentation Tool iframe is on a given page.
        mainDocuments: defineDocuments([
          { route: '/',               filter: `_type == "homepage"` },
          { route: '/pricing',        filter: `_type == "pricingPage"` },
          { route: '/pricing/',       filter: `_type == "pricingPage"` },
          { route: '/features',       filter: `_type == "featuresPage"` },
          { route: '/features/',      filter: `_type == "featuresPage"` },
          { route: '/about-us',       filter: `_type == "aboutPage"` },
          { route: '/about-us/',      filter: `_type == "aboutPage"` },
          { route: '/contact',        filter: `_type == "contactPage"` },
          { route: '/contact/',       filter: `_type == "contactPage"` },
          { route: '/request-demo',   filter: `_type == "requestDemoPage"` },
          { route: '/request-demo/',  filter: `_type == "requestDemoPage"` },
          { route: '/blog/:slug',     filter: `_type == "blogPost" && slug.current == $slug` },
          { route: '/:slug',          filter: `_type == "page" && slug.current == $slug` },
        ]),

        // Maps Sanity documents → preview URLs so the Presentation Tool
        // knows where to navigate when you open a document.
        locations: {
          // ── Singleton page documents ──
          homepage: defineLocations({
            locations: [{ title: 'Homepage', href: '/' }],
          }),
          pricingPage: defineLocations({
            locations: [{ title: 'Pricing', href: '/pricing/' }],
          }),
          featuresPage: defineLocations({
            locations: [{ title: 'Features', href: '/features/' }],
          }),
          aboutPage: defineLocations({
            locations: [{ title: 'About Us', href: '/about-us/' }],
          }),
          contactPage: defineLocations({
            locations: [{ title: 'Contact', href: '/contact/' }],
          }),
          requestDemoPage: defineLocations({
            locations: [{ title: 'Request Demo', href: '/request-demo/' }],
          }),

          // ── Dynamic pages ──
          page: defineLocations({
            select: { title: 'title', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title ?? 'Untitled Page',
                  href: `/${doc?.slug ?? ''}`,
                },
              ],
            }),
          }),

          // ── Blog posts ──
          blogPost: defineLocations({
            select: { title: 'title', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title ?? 'Untitled Post',
                  href: `/blog/${doc?.slug ?? ''}`,
                },
              ],
            }),
          }),

          // ── Global settings → always preview homepage ──
          navigation: defineLocations({
            locations: [{ title: 'Navigation → Homepage', href: '/' }],
          }),
          siteSettings: defineLocations({
            locations: [{ title: 'Site Settings → Homepage', href: '/' }],
          }),
          sectionTemplate: defineLocations({
            select: { title: 'title' },
            resolve: (doc) => ({
              locations: [
                {
                  title: `Template: ${doc?.title ?? 'Untitled'}`,
                  href: '/',
                },
              ],
            }),
          }),
        },
      },
    }),

    codeInput(),
    media(),
    visionTool(),
  ],

  schema: { types: schemaTypes },

  document: {
    actions: (prev, context) => {
      const contentTypes = [
        'homepage',
        'page',
        'blogPost',
        'navigation',
        'siteSettings',
        'pricingPage',
        'featuresPage',
        'contactPage',
        'aboutPage',
        'requestDemoPage',
      ];
      if (!contentTypes.includes(context.schemaType)) return prev;

      // Find the Publish button position so we can insert our actions just before it
      const publishIndex = prev.findIndex(a => (a as any).action === 'publish');

      // Page types that have a visual preview URL — get Visual Editor + Clear Cache
      const previewableTypes = [
        'homepage', 'page', 'blogPost',
        'pricingPage', 'featuresPage', 'contactPage', 'aboutPage', 'requestDemoPage',
      ];
      const extraActions = previewableTypes.includes(context.schemaType)
        ? [OpenVisualEditorAction, ClearCacheAction]
        : [];

      if (publishIndex === -1) {
        return [SaveDraftAction, ...extraActions, ...prev];
      }
      return [
        ...prev.slice(0, publishIndex),
        SaveDraftAction,
        ...extraActions,
        ...prev.slice(publishIndex),
      ];
    },
  },
});
