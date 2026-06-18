import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { defineLocations, presentationTool } from 'sanity/presentation';
import { codeInput } from '@sanity/code-input';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './schemas/index';
import { SaveDraftAction } from './actions/SaveDraftAction';

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
          .title('Content')
          .items([
            S.listItem()
              .title('Navigation')
              .id('navigation')
              .child(
                S.document()
                  .schemaType('navigation')
                  .documentId('navigation')
              ),
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Homepage')
              .id('homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),
            S.listItem()
              .title('Pages')
              .id('pages')
              .child(
                S.documentTypeList('page')
                  .title('Pages')
              ),
            S.divider(),
            S.listItem()
              .title('Blog Posts')
              .id('blogPosts')
              .child(
                S.documentTypeList('blogPost')
                  .title('Blog Posts')
              ),
            S.listItem()
              .title('Authors')
              .id('authors')
              .child(
                S.documentTypeList('author')
                  .title('Authors')
              ),
            S.divider(),
            S.listItem()
              .title('Section Templates')
              .id('sectionTemplates')
              .child(
                S.documentTypeList('sectionTemplate')
                  .title('Section Templates')
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
      // Map each document type to its preview URL so clicking a document in the
      // Structure tool automatically loads the correct preview page.
      resolve: {
        locations: {
          // Dynamic pages — resolve slug to /{slug}
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
          // Blog posts — resolve slug to /blog/{slug}
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
          // Singleton documents always preview the homepage
          homepage: {
            locations: [{ title: 'Homepage', href: '/' }],
          },
          navigation: {
            locations: [{ title: 'Navigation → Homepage', href: '/' }],
          },
          siteSettings: {
            locations: [{ title: 'Site Settings → Homepage', href: '/' }],
          },
          // Section templates preview the homepage (first place they're used)
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
    // Syntax-highlighted code editor fields for custom HTML / CSS / JS
    codeInput(),
    // Enhanced media library browser for images and files
    media(),
    visionTool(),
  ],
  schema: { types: schemaTypes },

  // Add "Draft saved" button next to the Publish button for content documents
  document: {
    actions: (prev, context) => {
      const contentTypes = ['homepage', 'page', 'blogPost', 'navigation', 'siteSettings'];
      if (!contentTypes.includes(context.schemaType)) return prev;
      // Insert SaveDraftAction before the Publish button
      const publishIndex = prev.findIndex(a => (a as any).action === 'publish');
      if (publishIndex === -1) return [SaveDraftAction, ...prev];
      return [
        ...prev.slice(0, publishIndex),
        SaveDraftAction,
        ...prev.slice(publishIndex),
      ];
    },
  },
});
