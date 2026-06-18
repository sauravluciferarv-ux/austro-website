import navigation from './documents/navigation';
import siteSettings from './documents/siteSettings';
import homepage from './documents/homepage';
import page from './documents/page';
import blogPost from './documents/blogPost';
import author from './documents/author';
import sectionTemplate from './documents/sectionTemplate';
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

export const schemaTypes = [
  // Documents
  navigation,
  siteSettings,
  homepage,
  page,
  blogPost,
  author,
  sectionTemplate,
  // Objects (existing)
  link,
  socialLink,
  seo,
  ctaButton,
  customCode,
  // Homepage sections (existing)
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
];
