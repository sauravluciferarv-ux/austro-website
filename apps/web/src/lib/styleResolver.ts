// Converts structured Sanity style objects into inline CSS strings and <style> tag content.
// All functions are pure and safe to call with undefined inputs.

export interface StyleSpacing {
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
}

export interface StyleTypography {
  preset?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textTransform?: string;
  textAlign?: string;
  color?: string;
}

export interface StyleBackground {
  type?: 'none' | 'color' | 'gradient' | 'image';
  color?: string;
  gradient?: string;
  image?: { asset?: { url?: string } };
  imagePosition?: string;
  imageSize?: string;
  overlay?: string;
  opacity?: number;
}

export interface StyleBorder {
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  borderRadius?: string;
  boxShadow?: string;
}

export interface StyleSize {
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
}

export interface StyleResponsive {
  desktop?: StyleSpacing;
  tablet?: StyleSpacing;
  mobile?: StyleSpacing;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

// Typography preset → CSS class mapping (matches design-system.css tokens)
const TYPOGRAPHY_PRESETS: Record<string, string> = {
  'display-xl': 'text-preset-display-xl',
  'display-lg': 'text-preset-display-lg',
  h1: 'text-preset-h1',
  h2: 'text-preset-h2',
  h3: 'text-preset-h3',
  h4: 'text-preset-h4',
  'body-lg': 'text-preset-body-lg',
  body: 'text-preset-body',
  'body-sm': 'text-preset-body-sm',
  caption: 'text-preset-caption',
  label: 'text-preset-label',
};

// Gap token → CSS value
const GAP_TOKENS: Record<string, string> = {
  none: '0',
  xs: '8px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
  '2xl': '64px',
};

// Column layout → CSS grid-template-columns
const COLUMN_TEMPLATES: Record<string, string> = {
  '1': '1fr',
  '2': 'repeat(2, 1fr)',
  '3': 'repeat(3, 1fr)',
  '4': 'repeat(4, 1fr)',
  '2-1': '2fr 1fr',
  '1-2': '1fr 2fr',
  '1-3': '1fr 3fr',
  '3-1': '3fr 1fr',
};

// Section container max-width → CSS value
const SECTION_WIDTH_MAP: Record<string, string> = {
  full: '100%',
  wide: '1400px',
  boxed: '1200px',
  narrow: '800px',
};

export function resolveSpacing(s?: StyleSpacing): string {
  if (!s) return '';
  const parts: string[] = [];
  if (s.paddingTop)    parts.push(`padding-top:${s.paddingTop}`);
  if (s.paddingRight)  parts.push(`padding-right:${s.paddingRight}`);
  if (s.paddingBottom) parts.push(`padding-bottom:${s.paddingBottom}`);
  if (s.paddingLeft)   parts.push(`padding-left:${s.paddingLeft}`);
  if (s.marginTop)     parts.push(`margin-top:${s.marginTop}`);
  if (s.marginRight)   parts.push(`margin-right:${s.marginRight}`);
  if (s.marginBottom)  parts.push(`margin-bottom:${s.marginBottom}`);
  if (s.marginLeft)    parts.push(`margin-left:${s.marginLeft}`);
  return parts.join(';');
}

export function resolveTypography(t?: StyleTypography): string {
  if (!t) return '';
  const parts: string[] = [];
  if (t.fontSize)      parts.push(`font-size:${t.fontSize}`);
  if (t.fontWeight)    parts.push(`font-weight:${t.fontWeight}`);
  if (t.lineHeight)    parts.push(`line-height:${t.lineHeight}`);
  if (t.letterSpacing) parts.push(`letter-spacing:${t.letterSpacing}`);
  if (t.textTransform) parts.push(`text-transform:${t.textTransform}`);
  if (t.textAlign)     parts.push(`text-align:${t.textAlign}`);
  if (t.color)         parts.push(`color:${t.color}`);
  return parts.join(';');
}

export function resolveTypographyClass(t?: StyleTypography): string {
  if (!t?.preset) return '';
  return TYPOGRAPHY_PRESETS[t.preset] ?? '';
}

export function resolveBackground(bg?: StyleBackground): string {
  if (!bg || !bg.type || bg.type === 'none') return '';
  const parts: string[] = [];
  if (bg.type === 'color' && bg.color) {
    parts.push(`background-color:${bg.color}`);
  }
  if (bg.type === 'gradient' && bg.gradient) {
    parts.push(`background:${bg.gradient}`);
  }
  if (bg.type === 'image') {
    const url = bg.image?.asset?.url;
    if (url) {
      parts.push(`background-image:url('${url}')`);
      parts.push(`background-position:${bg.imagePosition ?? 'center center'}`);
      parts.push(`background-size:${bg.imageSize ?? 'cover'}`);
      parts.push('background-repeat:no-repeat');
    }
  }
  if (bg.opacity !== undefined && bg.opacity !== 1) {
    parts.push(`opacity:${bg.opacity}`);
  }
  return parts.join(';');
}

export function resolveBorder(b?: StyleBorder): string {
  if (!b) return '';
  const parts: string[] = [];
  if (b.borderWidth && b.borderStyle && b.borderStyle !== 'none') {
    parts.push(`border:${b.borderWidth} ${b.borderStyle} ${b.borderColor ?? 'currentColor'}`);
  }
  if (b.borderRadius) parts.push(`border-radius:${b.borderRadius}`);
  if (b.boxShadow)    parts.push(`box-shadow:${b.boxShadow}`);
  return parts.join(';');
}

export function resolveSize(s?: StyleSize): string {
  if (!s) return '';
  const parts: string[] = [];
  if (s.width)     parts.push(`width:${s.width}`);
  if (s.maxWidth)  parts.push(`max-width:${s.maxWidth}`);
  if (s.minWidth)  parts.push(`min-width:${s.minWidth}`);
  if (s.height)    parts.push(`height:${s.height}`);
  if (s.minHeight) parts.push(`min-height:${s.minHeight}`);
  if (s.maxHeight) parts.push(`max-height:${s.maxHeight}`);
  return parts.join(';');
}

// Merge multiple resolved CSS strings, filtering empty ones
export function mergeStyles(...parts: (string | undefined | false)[]): string {
  return (parts.filter(Boolean) as string[]).join(';');
}

// Resolves gap token or raw value
export function resolveGap(gap?: string): string {
  if (!gap) return '';
  return GAP_TOKENS[gap] ?? gap;
}

// Resolves column layout to a CSS grid-template-columns value
export function resolveColumns(columns?: string, custom?: string): string {
  if (!columns || columns === '1') return '';
  if (columns === 'custom') return custom ?? '1fr';
  return COLUMN_TEMPLATES[columns] ?? '1fr';
}

// Resolves section container max-width
export function resolveSectionMaxWidth(width?: string, custom?: string): string {
  if (!width || width === 'full') return '';
  if (width === 'custom') return custom ?? '';
  return SECTION_WIDTH_MAP[width] ?? '';
}

// Generates media-query CSS for responsive overrides on a given CSS class selector
export function resolveResponsiveCss(cls: string, responsive?: StyleResponsive): string {
  if (!responsive) return '';
  const rules: string[] = [];

  const desktopSpacing = resolveSpacing(responsive.desktop);
  if (desktopSpacing) rules.push(`@media (min-width:1024px){.${cls}{${desktopSpacing}}}`);

  const tabletSpacing = resolveSpacing(responsive.tablet);
  if (tabletSpacing) rules.push(`@media (min-width:768px) and (max-width:1023px){.${cls}{${tabletSpacing}}}`);

  const mobileSpacing = resolveSpacing(responsive.mobile);
  if (mobileSpacing) rules.push(`@media (max-width:767px){.${cls}{${mobileSpacing}}}`);

  if (responsive.hideOnMobile)  rules.push(`@media (max-width:767px){.${cls}{display:none!important}}`);
  if (responsive.hideOnTablet)  rules.push(`@media (min-width:768px) and (max-width:1023px){.${cls}{display:none!important}}`);
  if (responsive.hideOnDesktop) rules.push(`@media (min-width:1024px){.${cls}{display:none!important}}`);

  return rules.join('');
}

// Generates a scoped <style> block from a block/section's customCss string
export function resolveScopedCss(cls: string, customCss?: string): string {
  if (!cls || !customCss) return '';
  // Prepend .cls { } wrapper if the user wrote bare properties (no braces)
  const hasBraces = /\{/.test(customCss);
  return hasBraces ? customCss : `.${cls} { ${customCss} }`;
}

// Computes all style props needed by a D365 section component from its Sanity data.
// Pass the section data object and the fallback HTML id (e.g. 'd365-hero').
export function resolveSectionStyleProps(
  data: {
    background?: StyleBackground;
    border?: StyleBorder;
    spacing?: StyleSpacing;
    size?: StyleSize;
    sectionResponsive?: StyleResponsive;
    sectionId?: string;
    sectionClass?: string;
    customCss?: string;
  } | null | undefined,
  defaultId: string
): { sectionId: string; extraClass: string; inlineStyle: string; css: string } {
  const sectionId  = data?.sectionId  || defaultId;
  const extraClass = data?.sectionClass || '';

  const inlineStyle = mergeStyles(
    resolveBackground(data?.background),
    resolveBorder(data?.border),
    resolveSpacing(data?.spacing),
    resolveSize(data?.size),
  );

  const sel = `#${sectionId}`;
  const parts: string[] = [];

  // Background image overlay (requires ::after pseudo-element)
  if (data?.background?.type === 'image' && data.background.overlay) {
    parts.push(`${sel}{position:relative}${sel}::after{content:'';position:absolute;inset:0;background:${data.background.overlay};pointer-events:none;}`);
  }

  // Responsive spacing + visibility media queries
  const r = data?.sectionResponsive;
  if (r) {
    const ds = resolveSpacing(r.desktop);
    if (ds) parts.push(`@media (min-width:1024px){${sel}{${ds}}}`);
    const ts = resolveSpacing(r.tablet);
    if (ts) parts.push(`@media (min-width:768px) and (max-width:1023px){${sel}{${ts}}}`);
    const ms = resolveSpacing(r.mobile);
    if (ms) parts.push(`@media (max-width:767px){${sel}{${ms}}}`);
    if (r.hideOnMobile)  parts.push(`@media (max-width:767px){${sel}{display:none!important}}`);
    if (r.hideOnTablet)  parts.push(`@media (min-width:768px) and (max-width:1023px){${sel}{display:none!important}}`);
    if (r.hideOnDesktop) parts.push(`@media (min-width:1024px){${sel}{display:none!important}}`);
  }

  // Custom CSS – wrap bare properties in #id { } if no braces present
  if (data?.customCss) {
    const hasBraces = /\{/.test(data.customCss);
    parts.push(hasBraces ? data.customCss : `${sel} { ${data.customCss} }`);
  }

  return { sectionId, extraClass, inlineStyle, css: parts.join('') };
}
