import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Only load the Vercel adapter when building on Vercel (VERCEL env var is set
// automatically). During local development (`astro dev`), Astro's built-in dev
// server handles SSR natively — no adapter needed.
let adapter;
if (process.env.VERCEL) {
  const { default: vercel } = await import('@astrojs/vercel/serverless');
  adapter = vercel();
}

export default defineConfig({
  site: 'https://www.desk365.io',
  // 'ignore' lets API routes be called without a trailing slash (e.g. from
  // Sanity's Presentation Tool) while still serving HTML pages at /path/ if
  // linked that way. Canonical tags in BaseHead.astro handle SEO deduplication.
  trailingSlash: 'ignore',
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
  // Hybrid mode: pages are static by default; routes with `prerender = false`
  // are server-rendered (used for the preview API and the homepage).
  output: 'hybrid',
  adapter,
});
