import { createClient } from '@sanity/client';

const token = import.meta.env.SANITY_API_READ_TOKEN;

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? 'placeholder',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: !token,
  token,
  perspective: 'published',
});
