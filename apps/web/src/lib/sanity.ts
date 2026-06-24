import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? 'placeholder';
const dataset   = import.meta.env.PUBLIC_SANITY_DATASET   ?? 'production';
const token     = import.meta.env.SANITY_API_READ_TOKEN;
const studioUrl = import.meta.env.PUBLIC_SANITY_STUDIO_URL ?? 'http://localhost:3333';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: !token,
  token,
  perspective: 'published',
});

// Returns a stega-enabled draft client for preview mode.
// Stega encodes invisible field-path metadata into fetched strings so
// enableVisualEditing() can auto-detect clickable elements without
// requiring manual data-sanity attributes on every element.
export function getDraftClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false,
    token,
    perspective: 'previewDrafts',
    stega: {
      enabled: true,
      studioUrl,
    },
  });
}
