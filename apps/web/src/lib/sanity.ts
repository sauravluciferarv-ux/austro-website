import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? 'placeholder';
const dataset   = import.meta.env.PUBLIC_SANITY_DATASET   ?? 'production';
const token     = import.meta.env.SANITY_API_READ_TOKEN;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: !token,
  token,
  perspective: 'published',
});

// Returns a client that reads draft (unpublished) content.
// Use this only during preview mode — never in production page rendering.
export function getDraftClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false,
    token,
    perspective: 'previewDrafts',
  });
}
