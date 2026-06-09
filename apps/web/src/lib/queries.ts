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
  bgStyle
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
