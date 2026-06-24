import navigation from './documents/navigation';
import siteSettings from './documents/siteSettings';
import homepage from './documents/homepage';
import page from './documents/page';
import blogPost from './documents/blogPost';
import author from './documents/author';
import sectionTemplate from './documents/sectionTemplate';
// Dedicated page schemas
import pricingPage from './documents/pricingPage';
import featuresPage from './documents/featuresPage';
import contactPage from './documents/contactPage';
import aboutPage from './documents/aboutPage';
import requestDemoPage from './documents/requestDemoPage';
// Style objects
import styleSpacing from './objects/style/styleSpacing';
import styleTypography from './objects/style/styleTypography';
import styleBackground from './objects/style/styleBackground';
import styleBorder from './objects/style/styleBorder';
import styleSize from './objects/style/styleSize';
import styleResponsive from './objects/style/styleResponsive';
import link from './objects/link';
import socialLink from './objects/socialLink';
import seo from './objects/seo';
import ctaButton from './objects/ctaButton';
import customCode from './objects/customCode';
import heroSection from './sections/heroSection';
import logosSection from './sections/logosSection';
import featuresSection from './sections/featuresSection';
import statsSection from './sections/statsSection';
import ctaSection from './sections/ctaSection';
import testimonialsSection from './sections/testimonialsSection';
// Page builder objects
import pageSection from './objects/pageSection';
import headingBlock from './objects/blocks/headingBlock';
import imageBlock from './objects/blocks/imageBlock';
import richTextBlock from './objects/blocks/richTextBlock';
import videoBlock from './objects/blocks/videoBlock';
import buttonBlock from './objects/blocks/buttonBlock';
import dividerBlock from './objects/blocks/dividerBlock';
import spacerBlock from './objects/blocks/spacerBlock';
import accordionBlock from './objects/blocks/accordionBlock';
import htmlBlock from './objects/blocks/htmlBlock';
import shortcodeBlock from './objects/blocks/shortcodeBlock';
import imageBoxBlock from './objects/blocks/imageBoxBlock';
import iconBoxBlock from './objects/blocks/iconBoxBlock';
import imageCarouselBlock from './objects/blocks/imageCarouselBlock';
import formBlock from './objects/blocks/formBlock';
import loopGridBlock from './objects/blocks/loopGridBlock';
import loopCarouselBlock from './objects/blocks/loopCarouselBlock';
import slidesBlock from './objects/blocks/slidesBlock';
import templateBlock from './objects/blocks/templateBlock';
// D365 Home Sections
import d365HeroSection from './sections/d365HeroSection';
import d365TrustBarSection from './sections/d365TrustBarSection';
import d365StatsSection from './sections/d365StatsSection';
import d365FeatureCardsSection from './sections/d365FeatureCardsSection';
import d365ChannelTabsSection from './sections/d365ChannelTabsSection';
import d365AIFeaturesSection from './sections/d365AIFeaturesSection';
import d365MicrosoftSection from './sections/d365MicrosoftSection';
import d365ITSMSection from './sections/d365ITSMSection';
import d365CapabilitiesSection from './sections/d365CapabilitiesSection';
import d365ComparisonSection from './sections/d365ComparisonSection';
import d365IntegrationsSection from './sections/d365IntegrationsSection';
import d365TestimonialsSection from './sections/d365TestimonialsSection';
import d365WhyChooseSection from './sections/d365WhyChooseSection';
import d365SecuritySection from './sections/d365SecuritySection';
import d365BlogSection from './sections/d365BlogSection';
import d365FinalCtaSection from './sections/d365FinalCtaSection';

export const schemaTypes = [
  // Documents
  navigation,
  siteSettings,
  homepage,
  page,
  blogPost,
  author,
  sectionTemplate,
  // Dedicated page documents
  pricingPage,
  featuresPage,
  contactPage,
  aboutPage,
  requestDemoPage,
  // Style objects (shared, reused by all blocks and sections)
  styleSpacing,
  styleTypography,
  styleBackground,
  styleBorder,
  styleSize,
  styleResponsive,
  // Objects (existing)
  link,
  socialLink,
  seo,
  ctaButton,
  customCode,
  // Homepage sections (existing / legacy)
  heroSection,
  logosSection,
  featuresSection,
  statsSection,
  ctaSection,
  testimonialsSection,
  // Page builder
  pageSection,
  headingBlock,
  imageBlock,
  richTextBlock,
  videoBlock,
  buttonBlock,
  dividerBlock,
  spacerBlock,
  accordionBlock,
  htmlBlock,
  shortcodeBlock,
  imageBoxBlock,
  iconBoxBlock,
  imageCarouselBlock,
  formBlock,
  loopGridBlock,
  loopCarouselBlock,
  slidesBlock,
  templateBlock,
  // D365 Home Sections
  d365HeroSection,
  d365TrustBarSection,
  d365StatsSection,
  d365FeatureCardsSection,
  d365ChannelTabsSection,
  d365AIFeaturesSection,
  d365MicrosoftSection,
  d365ITSMSection,
  d365CapabilitiesSection,
  d365ComparisonSection,
  d365IntegrationsSection,
  d365TestimonialsSection,
  d365WhyChooseSection,
  d365SecuritySection,
  d365BlogSection,
  d365FinalCtaSection,
];
