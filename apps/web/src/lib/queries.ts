// groq tag: identity function for syntax highlighting and type safety
// (avoids ESM named-export issues with @sanity/client in some bundlers)
const groq = String.raw;

export const navigationQuery = groq`
  *[_type == "navigation"][0] {
    header {
      logo { asset->{ url }, alt },
      logoAlt,
      navLinks[] {
        label,
        href,
        isExternal,
        dropdown[] {
          label,
          href,
          description,
          iconBg,
          icon { asset->{ url } }
        }
      },
      ctaLabel,
      ctaHref,
      ctaStyle,
      secondaryCtaLabel,
      secondaryCtaHref
    },
    solutionsMenu {
      industries[] { label, href, description, icon { asset->{ url } } },
      industriesExploreLabel,
      industriesExploreHref,
      teams[] { label, href, description, icon { asset->{ url } } },
      videoCard { title, href, linkLabel, thumbnail { asset->{ url } } }
    },
    footer {
      logo { asset->{ url }, alt },
      logoAlt,
      tagline,
      columns[] {
        heading,
        links[] { label, href, isExternal }
      },
      legalLinks[] { label, href, isExternal },
      copyrightText,
      badgeImages[] { image { asset->{ url } }, alt, href, label },
      socialLinks[] { platform, href },
      languages[] { label, code, href }
    }
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteUrl,
    logo { asset->{ url } },
    logoAlt,
    defaultSeo {
      metaTitle,
      metaDescription,
      ogImage { asset->{ url } }
    }
  }
`;

// Shared projection used for both inline sections and template-referenced sections
const sectionFields = groq`
  _type,
  badge, headline, headlineHighlight, highlightColor, layout, subheadline,
  primaryCta { label, href, style, color },
  secondaryCta { label, href, style, color },
  footnote,
  heroImage { asset->{ url } }, heroImageAlt,
  logos[] { name, image { asset->{ url } }, href },
  eyebrow, heading, subheading,
  features[] { heading, description, icon { asset->{ url } } },
  stats[] { value, label, description },
  bgStyle,
  testimonials[] {
    quote, body, authorName, authorTitle, industry,
    companyLogo { asset->{ url } },
    source, rating
  },
  customCode {
    enabled,
    "html": html.code,
    "css": css.code,
    "javascript": javascript.code
  }
`;

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    seo {
      metaTitle,
      metaDescription,
      ogImage { asset->{ url } },
      ogTitle,
      ogDescription,
      noIndex,
      canonicalUrl,
      structuredData
    },
    sections[] {
      "key": _key,
      ${sectionFields},
      "resolvedTemplate": select(
        _type == "reference" => @->section[0]{ ${sectionFields} }
      )
    }
  }
`;

// ── Sitemap queries ──────────────────────────────────────────────────────────

export const pageSitemapQuery = groq`
  *[_type == "page"] | order(publishedAt desc) {
    "slug": slug.current,
    "lastmod": coalesce(lastModified, _updatedAt),
    "publishedAt": publishedAt,
    "changefreq": coalesce(seo.changefreq, "monthly"),
    "priority": coalesce(seo.priority, 0.7),
    "noIndex": coalesce(seo.noIndex, false)
  }
`;

export const postSitemapQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    "slug": slug.current,
    "lastmod": coalesce(lastModified, _updatedAt),
    "publishedAt": publishedAt,
    "changefreq": coalesce(seo.changefreq, "weekly"),
    "priority": coalesce(seo.priority, 0.6),
    "noIndex": coalesce(seo.noIndex, false)
  }
`;

export const authorSitemapQuery = groq`
  *[_type == "author"] | order(name asc) {
    "slug": slug.current,
    "lastmod": _updatedAt
  }
`;

// ── Page Builder queries ─────────────────────────────────────────────────────

// Shared block projection — all content fields for any block type
const blockFields = groq`
  _type,
  _key,
  blockId,
  blockClass,
  customCss,
  hideOnMobile,
  hideOnDesktop,
  level,
  text,
  image { asset->{ url, _id }, alt },
  images[] { _key, asset->{ url }, alt, caption },
  caption,
  link,
  openInNewTab,
  width,
  alignment,
  content[] { ..., _type == "image" => { asset->{ url } } },
  url,
  thumbnail { asset->{ url } },
  autoplay,
  muted,
  controls,
  aspectRatio,
  href,
  style,
  size,
  icon,
  color,
  thickness,
  height,
  heightMobile,
  items[] { _key, title, content[] { ... }, buttonText, buttonHref, description, image { asset->{ url }, alt } },
  openFirst,
  allowMultiple,
  html,
  code,
  title,
  description,
  formTitle,
  fields[] { _key, type, label, name, placeholder, required, options },
  submitText,
  successMessage,
  webhookUrl,
  source,
  itemCount,
  columns,
  gap,
  slides[] { _key, title, description, image { asset->{ url }, alt }, buttonText, buttonHref },
  autoplayInterval,
  showDots,
  showArrows,
  template->{ name }
`;

const sectionFields_pb = groq`
  _key,
  sectionId,
  sectionClass,
  label,
  containerWidth,
  layout,
  gap,
  verticalAlign,
  horizontalAlign,
  bgColor,
  bgImage { asset->{ url } },
  bgGradient,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  marginTop,
  marginBottom,
  minHeight,
  hideOnMobile,
  hideOnDesktop,
  customCss,
  blocks[] { ${blockFields} }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    slug,
    publishedAt,
    lastModified,
    seo {
      metaTitle,
      metaDescription,
      ogImage { asset->{ url } },
      ogTitle,
      ogDescription,
      noIndex,
      canonicalUrl,
      structuredData
    },
    pageBuilder[] { ${sectionFields_pb} }
  }
`;

export const allPageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)] { "slug": slug.current }
`;

// Homepage using the page builder (same block system as dynamic pages)
export const homepagePageBuilderQuery = groq`
  *[_type == "homepage" && _id in ["homepage", "drafts.homepage"]][0] {
    _id,
    _type,
    seo {
      metaTitle,
      metaDescription,
      ogImage { asset->{ url } },
      ogTitle,
      ogDescription,
      noIndex,
      canonicalUrl,
      structuredData
    },
    pageBuilder[] { ${sectionFields_pb} }
  }
`;

// ── Blog post detail query ───────────────────────────────────────────────────

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    title,
    publishedAt,
    excerpt,
    heroImage { asset->{ url, metadata { dimensions } }, alt },
    body[] {
      ...,
      _type == "image" => { ..., asset->{ url, metadata { dimensions } } }
    },
    author->{ name, bio, avatar { asset->{ url } } },
    "relatedPosts": *[_type == "blogPost" && slug.current != $slug
      && count(categories[@._ref in ^.^.categories[]._ref]) > 0]
      | order(publishedAt desc)[0..2] {
        title, slug, publishedAt, excerpt, heroImage
      },
    seo
  }
`;
