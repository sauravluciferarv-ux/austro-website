// Server-rendered: this route must NOT be prerendered
export const prerender = false;

import type { APIRoute } from 'astro';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { createClient } from '@sanity/client';

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url);

  // Build a Sanity client to validate the shared preview secret stored in the
  // dataset. The Presentation tool creates this secret document automatically
  // and appends it as ?sanity-preview-secret=<token> when enabling preview.
  const client = createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset:   import.meta.env.PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: '2024-01-01',
    useCdn:     false,
    token:      import.meta.env.SANITY_API_READ_TOKEN,
  });

  // Primary validation: check the Sanity-managed shared secret
  const { isValid, redirectTo } = await validatePreviewUrl(client, request.url);

  if (!isValid) {
    // Fallback: accept a static dev secret for local / CI convenience.
    // Set SANITY_PREVIEW_SECRET in apps/web/.env to bypass dataset validation.
    const incomingSecret = url.searchParams.get('sanity-preview-secret')
                        ?? url.searchParams.get('secret');
    const staticSecret   = import.meta.env.SANITY_PREVIEW_SECRET;

    if (!staticSecret || incomingSecret !== staticSecret) {
      return new Response(
        'Invalid preview secret. The Sanity Presentation tool must create a secret first.',
        { status: 401 }
      );
    }
  }

  cookies.set('sanity-preview', 'true', {
    path: '/',
    httpOnly: true,
    // SameSite=None+Secure works in cross-origin iframes in production (HTTPS).
    // On localhost (HTTP) SameSite=Lax is the only safe option;
    // localhost:3333 and localhost:4321 are treated as same-site so Lax works.
    secure: import.meta.env.PROD,
    sameSite: import.meta.env.PROD ? 'none' : 'lax',
    maxAge: 60 * 60, // 1 hour
  });

  // Use the redirectTo from the validated URL, or fall back to the redirect param
  const target = redirectTo ?? url.searchParams.get('redirect') ?? '/';
  return redirect(target, 302);
};
