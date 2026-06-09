import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.desk365.io',
  trailingSlash: 'always',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) =>
        !page.includes('/thank-you') &&
        !page.includes('/404') &&
        !page.includes('/studio') &&
        !page.includes('/preview'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: {
          de: 'de',
          fr: 'fr',
          nl: 'nl',
          es: 'es',
          it: 'it',
          pl: 'pl',
          pt: 'pt',
          sv: 'sv',
          cn: 'zh-CN',
          jp: 'ja',
          ko: 'ko',
        },
      },
    }),
  ],
  output: 'static',
});
