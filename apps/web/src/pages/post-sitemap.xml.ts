export const prerender = true;

import { sanityClient } from '../lib/sanity';
import { postSitemapQuery } from '../lib/queries';

const SITE = 'https://www.desk365.io';

function toDate(iso?: string): string {
  return (iso ?? new Date().toISOString()).split('T')[0];
}

export async function GET() {
  let rows: { slug: string; lastmod: string; changefreq: string; priority: number; noIndex: boolean }[] = [];

  try {
    rows = await sanityClient.fetch(postSitemapQuery);
  } catch {
    // Sanity not reachable — return empty sitemap
  }

  const urlTags = rows
    .filter(r => !r.noIndex && r.slug)
    .map(r => `  <url>
    <loc>${SITE}/blog/${r.slug}/</loc>
    <lastmod>${toDate(r.lastmod)}</lastmod>
    <changefreq>${r.changefreq ?? 'weekly'}</changefreq>
    <priority>${(r.priority ?? 0.6).toFixed(1)}</priority>
  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlTags}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
