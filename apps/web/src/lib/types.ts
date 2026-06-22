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

// Custom code injected per section (stored as strings after GROQ projection)
export interface CustomCode {
  enabled?: boolean;
  html?: string;
  css?: string;
  javascript?: string;
}

export interface HeroSection {
  _type: 'heroSection';
  _key?: string;
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
  customCode?: CustomCode;
}

export interface LogoItem {
  name: string;
  image?: SanityImage;
  href?: string;
}

export interface LogosSection {
  _type: 'logosSection';
  _key?: string;
  key?: string;
  heading?: string;
  logos?: LogoItem[];
  customCode?: CustomCode;
}

export interface FeatureItem {
  icon?: SanityImage;
  heading: string;
  description?: string;
}

export interface FeaturesSection {
  _type: 'featuresSection';
  _key?: string;
  key?: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  features?: FeatureItem[];
  customCode?: CustomCode;
}

export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

export interface StatsSection {
  _type: 'statsSection';
  _key?: string;
  key?: string;
  heading?: string;
  subheading?: string;
  stats?: StatItem[];
  customCode?: CustomCode;
}

export interface CtaSection {
  _type: 'ctaSection';
  _key?: string;
  key?: string;
  heading?: string;
  subheading?: string;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
  footnote?: string;
  bgStyle?: 'white' | 'light' | 'dark' | 'brand';
  customCode?: CustomCode;
}

export interface TestimonialItem {
  quote: string;
  body: string;
  authorName: string;
  authorTitle?: string;
  industry?: string;
  companyLogo?: SanityImage;
  source?: string;
  rating?: number;
}

export interface TestimonialsSection {
  _type: 'testimonialsSection';
  _key?: string;
  key?: string;
  heading?: string;
  subheading?: string;
  testimonials?: TestimonialItem[];
  customCode?: CustomCode;
}

export type HomepageSection = HeroSection | LogosSection | FeaturesSection | StatsSection | CtaSection | TestimonialsSection;

export interface Homepage {
  seo?: SeoData;
  sections?: HomepageSection[];
}

// ── D365 Home Section Types ──────────────────────────────────────────────────

export interface D365HeroSection {
  _type: 'd365HeroSection';
  _key?: string;
  headlinePrefix?: string;
  rotatingWords?: string[];
  subheadline?: string;
  footnote?: string;
  heroImage?: { asset: { url: string } };
  heroImageAlt?: string;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
}

export interface D365LogoItem {
  _key?: string;
  name: string;
  logo?: { asset: { url: string } };
  href?: string;
  badge?: string;
}

export interface D365TrustBarSection {
  _type: 'd365TrustBarSection';
  _key?: string;
  heading?: string;
  logosRow1?: D365LogoItem[];
  logosRow2?: D365LogoItem[];
}

export interface D365StatItem {
  _key?: string;
  number: string;
  label: string;
}

export interface D365StatsSection {
  _type: 'd365StatsSection';
  _key?: string;
  stats?: D365StatItem[];
}

export interface D365FeatureCard {
  _key?: string;
  title: string;
  image?: { asset: { url: string } };
  imageAlt?: string;
}

export interface D365FeatureCardsSection {
  _type: 'd365FeatureCardsSection';
  _key?: string;
  headingGradient?: string;
  headingPlain?: string;
  body?: string;
  cards?: D365FeatureCard[];
}

export interface D365ChannelTab {
  _key?: string;
  label: string;
  description?: string;
  image?: { asset: { url: string } };
  imageAlt?: string;
}

export interface D365ChannelTabsSection {
  _type: 'd365ChannelTabsSection';
  _key?: string;
  heading?: string;
  body?: string;
  tabs?: D365ChannelTab[];
}

export interface D365SubFeature {
  _key?: string;
  title: string;
  description?: string;
}

export interface D365AICard {
  _key?: string;
  label: string;
  description?: string;
  readMoreHref?: string;
  image?: { asset: { url: string } };
  imageAlt?: string;
  subFeatures?: D365SubFeature[];
}

export interface D365AIFeaturesSection {
  _type: 'd365AIFeaturesSection';
  _key?: string;
  heading?: string;
  body?: string;
  cards?: D365AICard[];
}

export interface D365MicrosoftCard {
  _key?: string;
  title: string;
  description?: string;
  icon?: { asset: { url: string } };
}

export interface D365MicrosoftSection {
  _type: 'd365MicrosoftSection';
  _key?: string;
  heading?: string;
  body?: string;
  linkLabel?: string;
  linkHref?: string;
  heroImage?: { asset: { url: string } };
  heroImageAlt?: string;
  cards?: D365MicrosoftCard[];
}

export interface D365ITSMCard {
  _key?: string;
  title: string;
  description?: string;
  linkLabel?: string;
  linkHref?: string;
  image?: { asset: { url: string } };
  imageAlt?: string;
}

export interface D365ITSMSection {
  _type: 'd365ITSMSection';
  _key?: string;
  heading?: string;
  body?: string;
  cards?: D365ITSMCard[];
}

export interface D365CapabilityItem {
  _key?: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface D365CapabilitiesSection {
  _type: 'd365CapabilitiesSection';
  _key?: string;
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  capabilities?: D365CapabilityItem[];
}

export interface D365ComparisonRow {
  _key?: string;
  feature: string;
  desk365?: string;
  col2?: string;
  col3?: string;
}

export interface D365ComparisonSection {
  _type: 'd365ComparisonSection';
  _key?: string;
  heading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  col2Label?: string;
  col3Label?: string;
  rows?: D365ComparisonRow[];
}

export interface D365IntegrationCard {
  _key?: string;
  title: string;
  description?: string;
  icon?: { asset: { url: string } };
  linkLabel?: string;
  linkHref?: string;
}

export interface D365IntegrationsSection {
  _type: 'd365IntegrationsSection';
  _key?: string;
  heading?: string;
  body?: string;
  cards?: D365IntegrationCard[];
}

export interface D365TestimonialItem {
  _key?: string;
  quote: string;
  name: string;
  title?: string;
  company?: string;
  rating?: number;
  reviewPlatform?: string;
}

export interface D365TestimonialsSection {
  _type: 'd365TestimonialsSection';
  _key?: string;
  heading?: string;
  subtext?: string;
  testimonials?: D365TestimonialItem[];
}

export interface D365WhyChooseCard {
  _key?: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface D365WhyChooseSection {
  _type: 'd365WhyChooseSection';
  _key?: string;
  heading?: string;
  body?: string;
  awardImage?: { asset: { url: string } };
  awardText?: string;
  cards?: D365WhyChooseCard[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface D365SecuritySection {
  _type: 'd365SecuritySection';
  _key?: string;
  heading?: string;
  bullets?: string[];
  badgeImage?: { asset: { url: string } };
  badgeImageAlt?: string;
}

export interface D365BlogPost {
  _key?: string;
  category: string;
  title: string;
  href: string;
  image?: { asset: { url: string } };
  imageAlt?: string;
}

export interface D365BlogSection {
  _type: 'd365BlogSection';
  _key?: string;
  heading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  posts?: D365BlogPost[];
}

export interface D365FinalCtaSection {
  _type: 'd365FinalCtaSection';
  _key?: string;
  heading?: string;
  body?: string;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
  footnote?: string;
  logoImage?: { asset: { url: string } };
}

export type D365HomeSection =
  | D365HeroSection
  | D365TrustBarSection
  | D365StatsSection
  | D365FeatureCardsSection
  | D365ChannelTabsSection
  | D365AIFeaturesSection
  | D365MicrosoftSection
  | D365ITSMSection
  | D365CapabilitiesSection
  | D365ComparisonSection
  | D365IntegrationsSection
  | D365TestimonialsSection
  | D365WhyChooseSection
  | D365SecuritySection
  | D365BlogSection
  | D365FinalCtaSection;

export interface SeoData {
  metaTitle: string;
  metaDescription: string;
  ogImage?: SanityImage;
  ogTitle?: string;
  ogDescription?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalUrl?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  structuredData?: string;
}

// ── Sitemap entry types ─────────────────────────────────────────────────────

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  publishedAt?: string;
  changefreq?: string;
  priority?: number;
}

// ── Page / BlogPost / Author ────────────────────────────────────────────────

export interface PageDoc {
  _type: 'page';
  _updatedAt: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  lastModified?: string;
  seo?: SeoData;
}

export interface BlogPostDoc {
  _type: 'blogPost';
  _updatedAt: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  lastModified?: string;
  excerpt?: string;
  heroImage?: SanityImage;
  categories?: string[];
  seo?: SeoData;
}

export interface AuthorDoc {
  _type: 'author';
  _updatedAt: string;
  name: string;
  slug: { current: string };
  bio?: string;
  jobTitle?: string;
  avatar?: SanityImage;
}

// ── Page Builder Types ───────────────────────────────────────────────────────

export interface PortableTextBlock {
  _type: string;
  _key?: string;
  style?: string;
  children?: Array<{ _type: string; _key?: string; text?: string; marks?: string[] }>;
  markDefs?: Array<{ _type: string; _key: string; href?: string; openInNewTab?: boolean }>;
}

export interface PageSectionBlock {
  _type: string;
  _key?: string;
  blockId?: string;
  blockClass?: string;
  customCss?: string;
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
  // Heading
  level?: string;
  text?: string;
  // Image / ImageBox / ImageCarousel
  image?: { asset: { url: string; _id?: string }; alt?: string; caption?: string };
  images?: Array<{ asset: { url: string }; alt?: string; caption?: string; _key?: string }>;
  caption?: string;
  link?: string;
  openInNewTab?: boolean;
  width?: string;
  alignment?: string;
  // RichText
  content?: PortableTextBlock[];
  // Video
  url?: string;
  thumbnail?: { asset: { url: string } };
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  aspectRatio?: string;
  // Button
  href?: string;
  style?: string;
  size?: string;
  icon?: string;
  // Divider
  color?: string;
  thickness?: string;
  // Spacer
  height?: string;
  heightMobile?: string;
  // Accordion
  items?: Array<{
    _key?: string;
    title?: string;
    content?: PortableTextBlock[];
    buttonText?: string;
    buttonHref?: string;
    description?: string;
  }>;
  openFirst?: boolean;
  allowMultiple?: boolean;
  // HTML / Shortcode
  html?: string;
  code?: string;
  // ImageBox / IconBox
  title?: string;
  description?: string;
  // Icon
  iconSvg?: string;
  // Form
  formTitle?: string;
  fields?: Array<{
    _key?: string;
    type?: string;
    label?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    options?: string[];
  }>;
  submitText?: string;
  successMessage?: string;
  webhookUrl?: string;
  // Loop Grid / Carousel
  source?: string;
  itemCount?: number;
  columns?: string;
  gap?: string;
  // Slides
  slides?: Array<{
    _key?: string;
    title?: string;
    description?: string;
    image?: { asset: { url: string }; alt?: string };
    buttonText?: string;
    buttonHref?: string;
  }>;
  // Carousel settings
  autoplayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  // Template ref
  template?: { section?: PageSection };
}

export interface PageSection {
  _key?: string;
  sectionId?: string;
  sectionClass?: string;
  label?: string;
  blocks?: PageSectionBlock[];
  // Layout
  containerWidth?: 'full' | 'wide' | 'contained' | 'narrow';
  layout?: 'stack' | 'cols-2' | 'cols-3' | 'cols-4' | 'grid' | 'carousel';
  gap?: string;
  verticalAlign?: string;
  horizontalAlign?: string;
  // Background
  bgColor?: string;
  bgImage?: { asset: { url: string } };
  bgGradient?: string;
  // Spacing
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  marginTop?: string;
  marginBottom?: string;
  minHeight?: string;
  // Responsive
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
  // Custom CSS
  customCss?: string;
}

export interface PageBuilderPage {
  _type: 'page';
  _id: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  lastModified?: string;
  seo?: SeoData;
  pageBuilder?: PageSection[];
}

// Homepage document with the unified page builder (mirrors PageBuilderPage)
export interface HomepagePageBuilder {
  _id: string;
  _type: 'homepage';
  seo?: SeoData;
  pageBuilder?: (PageSection | D365HomeSection)[];
}
