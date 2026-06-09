import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas/index';

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
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
