export const prerender = true;

import { sanityClient } from '../lib/sanity';
import { pageSitemapQuery } from '../lib/queries';

const SITE = 'https://www.desk365.io';

const STATIC_PAGES = [
  { loc: `${SITE}/`,                                  changefreq: 'daily',   priority: 1.0 },
  { loc: `${SITE}/features/`,                         changefreq: 'weekly',  priority: 0.9 },
  { loc: `${SITE}/pricing/`,                          changefreq: 'weekly',  priority: 0.9 },
  { loc: `${SITE}/microsoft-teams-ticketing-system/`, changefreq: 'monthly', priority: 0.8 },
  { loc: `${SITE}/request-demo/`,                     changefreq: 'monthly', priority: 0.8 },
  { loc: `${SITE}/about/`,                            changefreq: 'monthly', priority: 0.7 },
  { loc: `${SITE}/contact/`,                          changefreq: 'monthly', priority: 0.7 },
];

function toDate(iso?: string): string {
  return (iso ?? new Date().toISOString()).split('T')[0];
}

function urlTag(loc: string, lastmod: string, changefreq: string, priority: number): string {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}

export async function GET() {
  const today = toDate();

  const staticTags = STATIC_PAGES.map(p =>
    urlTag(p.loc, today, p.changefreq, p.priority)
  );

  let dynamicTags: string[] = [];
  try {
    const rows: { slug: string; lastmod: string; changefreq: string; priority: number; noIndex: boolean }[] =
      await sanityClient.fetch(pageSitemapQuery);

    dynamicTags = rows
      .filter(r => !r.noIndex && r.slug)
      .map(r => urlTag(
        `${SITE}/${r.slug}/`,
        toDate(r.lastmod),
        r.changefreq ?? 'monthly',
        r.priority  ?? 0.7,
      ));
  } catch {
    // Sanity not reachable at build time — static list only
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticTags, ...dynamicTags].join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
