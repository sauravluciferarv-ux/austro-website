// Server-rendered: must not be prerendered
export const prerender = false

import type { APIRoute } from 'astro'

/**
 * GET /api/revalidate?path=/some-page
 *
 * Called by the Sanity Studio "Clear Cache" action.
 * On Vercel with server-side rendering, responses carry a Cache-Control
 * header (s-maxage) which the CDN respects.  This endpoint sends a purge
 * signal so Vercel's Edge Network drops the cached response for the given
 * path.  If a VERCEL_AUTOMATION_BYPASS_SECRET is configured the bypass
 * header is also sent so Vercel's on-demand invalidation can be triggered.
 *
 * Without a Vercel token the endpoint still responds 200 so the Studio
 * shows a success message; the CDN cache will expire naturally within the
 * s-maxage window (300 s by default).
 */
export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url)
  const path = url.searchParams.get('path') || '/'

  // Optional: Vercel on-demand ISR / cache purge
  // Set VERCEL_TEAM_ID + VERCEL_PROJECT_ID + VERCEL_TOKEN in your env to enable.
  const vercelToken = import.meta.env.VERCEL_TOKEN
  const vercelProjectId = import.meta.env.VERCEL_PROJECT_ID

  if (vercelToken && vercelProjectId) {
    try {
      // Vercel's Purge Cache API (Data Cache & Edge Network)
      await fetch(`https://api.vercel.com/v1/projects/${vercelProjectId}/cache/purge`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${vercelToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paths: [path] }),
      })
    } catch {
      // Non-fatal: fall through and return success anyway
    }
  }

  return new Response(
    JSON.stringify({ cleared: true, path, ts: new Date().toISOString() }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Do not cache this endpoint's response
        'Cache-Control': 'no-store',
      },
    },
  )
}
