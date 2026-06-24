import { EyeOpenIcon } from '@sanity/icons'
import type { DocumentActionComponent, DocumentActionProps } from 'sanity'

// ── URL map for singleton pages ────────────────────────────────────────────

const FIXED_URLS: Record<string, string> = {
  homepage: '/',
  pricingPage: '/pricing/',
  featuresPage: '/features/',
  aboutPage: '/about-us/',
  contactPage: '/contact/',
  requestDemoPage: '/request-demo/',
}

function getPageUrl(docType: string, slug?: string): string {
  if (FIXED_URLS[docType]) return FIXED_URLS[docType]
  if (docType === 'page') return `/${slug ?? ''}`
  if (docType === 'blogPost') return `/blog/${slug ?? ''}`
  return '/'
}

// ── Action ─────────────────────────────────────────────────────────────────

/**
 * "Visual Editor" button in the document action bar.
 *
 * Navigates to the Presentation tool with two pieces of context:
 *   /presentation/:type/:id   → focuses this document's side-panel
 *   ?preview=/path/           → shows the correct page in the iframe
 *
 * The `preview` URL parameter is defined by PresentationSearchParams and is
 * resolved relative to the configured previewUrl.initial in sanity.config.ts.
 */
export const OpenVisualEditorAction: DocumentActionComponent = (
  props: DocumentActionProps,
) => {
  // props.id is always the published (non-draft) document ID
  const docId = props.id
  const docType = props.type

  // Get the slug from whichever version exists
  const liveDoc = props.published ?? props.draft
  const slug = (liveDoc as { slug?: { current?: string } } | null)?.slug?.current

  const pageUrl = getPageUrl(docType, slug)

  // /presentation/:type/:id?preview=/path/
  const presentationHref =
    `/presentation/${docType}/${docId}` +
    `?preview=${encodeURIComponent(pageUrl)}`

  return {
    label: 'Visual Editor',
    title: `Open ${pageUrl} in Visual Editor`,
    icon: EyeOpenIcon,
    onHandle: () => {
      window.location.href = presentationHref
    },
  }
}
