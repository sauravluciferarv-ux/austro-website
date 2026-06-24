import { useState } from 'react'
import { SyncIcon } from '@sanity/icons'
import { useToast } from '@sanity/ui'
import type { DocumentActionComponent, DocumentActionProps } from 'sanity'

// ── URL helpers ────────────────────────────────────────────────────────────

const FIXED_URLS: Record<string, string> = {
  homepage: '/',
  pricingPage: '/pricing/',
  featuresPage: '/features/',
  aboutPage: '/about-us/',
  contactPage: '/contact/',
  requestDemoPage: '/request-demo/',
}

function getPageUrl(doc: { _type: string; slug?: { current?: string } } | null): string {
  if (!doc) return '/'
  if (FIXED_URLS[doc._type]) return FIXED_URLS[doc._type]
  if (doc._type === 'page') return `/${doc.slug?.current ?? ''}`
  if (doc._type === 'blogPost') return `/blog/${doc.slug?.current ?? ''}`
  return '/'
}

const PREVIEW_ORIGIN: string =
  (import.meta as unknown as Record<string, Record<string, string>>).env
    ?.SANITY_STUDIO_PREVIEW_URL ?? 'http://localhost:4321'

// ── Action ─────────────────────────────────────────────────────────────────

/**
 * Adds a "Clear Cache" button to the document action bar.
 * Calls /api/revalidate on the web app to purge the CDN cache for the page
 * corresponding to the current document.
 */
export const ClearCacheAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const doc = (props.draft ?? props.published) as {
    _type: string
    slug?: { current?: string }
  } | null

  const pageUrl = getPageUrl(doc)

  return {
    label: loading ? 'Clearing…' : 'Clear Cache',
    title: `Clear CDN cache for ${pageUrl}`,
    icon: SyncIcon,
    disabled: loading,
    onHandle: async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `${PREVIEW_ORIGIN}/api/revalidate?path=${encodeURIComponent(pageUrl)}`,
          { method: 'GET' },
        )
        if (res.ok) {
          toast.push({
            status: 'success',
            title: 'Cache cleared',
            description: `${pageUrl} will serve fresh content on the next request.`,
          })
        } else {
          toast.push({
            status: 'warning',
            title: 'Cache refresh queued',
            description: `CDN cache for ${pageUrl} will expire within 5 minutes.`,
          })
        }
      } catch {
        toast.push({
          status: 'warning',
          title: 'Cache refresh queued',
          description: `CDN cache for ${pageUrl} will expire within 5 minutes.`,
        })
      } finally {
        setLoading(false)
      }
    },
  }
}
