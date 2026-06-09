export interface SanityImage {
  asset: { url: string };
  alt?: string;
}

export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
  iconBg?: string;
  icon?: SanityImage;
}

export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
  dropdown?: NavDropdownItem[];
}

export interface NavigationHeader {
  logo?: SanityImage;
  logoAlt?: string;
  navLinks: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  ctaStyle?: 'primary' | 'outline';
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: 'linkedin' | 'youtube' | 'twitter' | 'facebook' | 'instagram';
  href: string;
}

export interface Language {
  label: string;
  code: string;
  href: string;
}

export interface BadgeImage {
  image?: { asset: { url: string } };
  alt: string;
  href: string;
  label?: string;
}

export interface NavigationFooter {
  logo?: SanityImage;
  logoAlt?: string;
  tagline?: string;
  columns: FooterColumn[];
  legalLinks: FooterLink[];
  copyrightText: string;
  socialLinks: SocialLink[];
  badgeImages?: BadgeImage[];
  languages: Language[];
}

export interface SolutionItem {
  label: string;
  href: string;
  description?: string;
  icon?: SanityImage;
}

export interface SolutionsMenu {
  industries?: SolutionItem[];
  industriesExploreLabel?: string;
  industriesExploreHref?: string;
  teams?: SolutionItem[];
  videoCard?: {
    title?: string;
    href?: string;
    linkLabel?: string;
    thumbnail?: SanityImage;
  };
}

export interface Navigation {
  header: NavigationHeader;
  solutionsMenu?: SolutionsMenu;
  footer: NavigationFooter;
}

export interface CtaButton {
  label: string;
  href: string;
  style?: 'filled' | 'outline' | 'ghost';
  color?: 'blue' | 'green' | 'dark' | 'white';
}

export interface HeroSection {
  _type: 'heroSection';
  key?: string;
  badge?: string;
  headline: string;
  headlineHighlight?: string;
  highlightColor?: 'blue' | 'fuchsia' | 'green' | 'orange';
  subheadline?: string;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
  footnote?: string;
  layout?: 'split' | 'centered';
  heroImage?: SanityImage;
  heroImageAlt?: string;
}

export interface LogoItem {
  name: string;
  image?: SanityImage;
  href?: string;
}

export interface LogosSection {
  _type: 'logosSection';
  key?: string;
  heading?: string;
  logos?: LogoItem[];
}

export interface FeatureItem {
  icon?: SanityImage;
  heading: string;
  description?: string;
}

export interface FeaturesSection {
  _type: 'featuresSection';
  key?: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  features?: FeatureItem[];
}

export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

export interface StatsSection {
  _type: 'statsSection';
  key?: string;
  heading?: string;
  subheading?: string;
  stats?: StatItem[];
}

export interface CtaSection {
  _type: 'ctaSection';
  key?: string;
  heading?: string;
  subheading?: string;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
  footnote?: string;
  bgStyle?: 'white' | 'light' | 'dark' | 'brand';
}

export type HomepageSection = HeroSection | LogosSection | FeaturesSection | StatsSection | CtaSection;

export interface Homepage {
  seo?: SeoData;
  sections?: HomepageSection[];
}

export interface SeoData {
  metaTitle: string;
  metaDescription: string;
  ogImage?: SanityImage;
  ogTitle?: string;
  ogDescription?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
  structuredData?: string;
}
