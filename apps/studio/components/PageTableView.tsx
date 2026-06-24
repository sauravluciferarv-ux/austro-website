import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useClient } from 'sanity'
import { IntentLink } from 'sanity/router'
import { Box, Button, Card, Flex, Spinner, Stack, Text, Badge } from '@sanity/ui'
import { EditIcon, EyeOpenIcon, TrashIcon, SyncIcon, LaunchIcon } from '@sanity/icons'

// ── Types ─────────────────────────────────────────────────────────────────

interface PageDoc {
  _id: string
  _type: string
  _updatedAt: string
  _createdAt: string
  title?: string
  slug?: string
  status?: string
  publishedAt?: string
  authorName?: string
  seoTitle?: string
  noIndex?: boolean
  hasDraft?: boolean
}

interface DocStatus {
  label: string
  tone: 'positive' | 'caution' | 'critical' | 'default'
}

type FilterMode = 'all' | 'pages' | 'blog'

// ── Constants ──────────────────────────────────────────────────────────────

const ALL_TYPES = [
  'homepage', 'pricingPage', 'featuresPage', 'aboutPage',
  'contactPage', 'requestDemoPage', 'page', 'blogPost',
]

const SINGLETON_TYPES = new Set([
  'homepage', 'pricingPage', 'featuresPage', 'aboutPage', 'contactPage', 'requestDemoPage',
])

const TYPE_LABELS: Record<string, string> = {
  homepage: 'Homepage',
  pricingPage: 'Pricing',
  featuresPage: 'Features',
  aboutPage: 'About Us',
  contactPage: 'Contact',
  requestDemoPage: 'Request Demo',
  page: 'Page',
  blogPost: 'Blog Post',
}

const FIXED_URLS: Record<string, string> = {
  homepage: '/',
  pricingPage: '/pricing/',
  featuresPage: '/features/',
  aboutPage: '/about-us/',
  contactPage: '/contact/',
  requestDemoPage: '/request-demo/',
}

// Exclude drafts (drafts.* prefix) — we add hasDraft via sub-query instead.
// This prevents duplicate rows from appearing when a document has both a
// published version and a pending draft.
const GROQ_QUERY = `*[
  _type in $types &&
  !(_id in path("drafts.**"))
] | order(_updatedAt desc) {
  _id,
  _type,
  _updatedAt,
  _createdAt,
  title,
  "slug": slug.current,
  status,
  publishedAt,
  "authorName": author->name,
  "seoTitle": seo.metaTitle,
  "noIndex": seo.noIndex,
  "hasDraft": count(*[_id == "drafts." + ^._id]) > 0
}`

const PREVIEW_ORIGIN: string =
  (import.meta as unknown as Record<string, Record<string, string>>).env
    ?.SANITY_STUDIO_PREVIEW_URL ?? 'http://localhost:4321'

// ── Helpers ────────────────────────────────────────────────────────────────

function getTitle(doc: PageDoc): string {
  return doc.title || TYPE_LABELS[doc._type] || 'Untitled'
}

function getUrl(doc: PageDoc): string {
  if (FIXED_URLS[doc._type]) return FIXED_URLS[doc._type]
  if (doc._type === 'page') return `/${doc.slug ?? ''}`
  if (doc._type === 'blogPost') return `/blog/${doc.slug ?? ''}`
  return '/'
}

function getStatus(doc: PageDoc): DocStatus {
  // hasDraft = published document with pending draft changes
  if (doc.hasDraft) return { label: 'Has Changes', tone: 'caution' }
  if (doc.status === 'draft') return { label: 'Draft', tone: 'caution' }
  if (doc.status === 'review') return { label: 'In Review', tone: 'default' }
  return { label: 'Published', tone: 'positive' }
}

function fmtDate(d?: string): string {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// ── Shared style tokens ────────────────────────────────────────────────────

const ROW_GRID = '3fr 1.5fr 120px 140px 2fr 2fr 230px'

// Use explicit, predictable colors that work in both Studio light & dark themes
const colors = {
  link: '#0070f3',
  text: 'inherit',
  subtle: 'var(--card-muted-fg-color)',
  border: 'var(--card-border-color)',
  rowHover: 'var(--card-bg2-color)',
  seoOk: '#3bb54a',
  seoWarn: '#f59b23',
  criticalFg: 'var(--card-critical-fg-color, #e5484d)',
}

// ── Table Row ─────────────────────────────────────────────────────────────

interface RowProps {
  doc: PageDoc
  onTrash(doc: PageDoc): void
  onClearCache(doc: PageDoc): void
}

function TableRow({ doc, onTrash, onClearCache }: RowProps) {
  const [hovered, setHovered] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const title = getTitle(doc)
  const url = getUrl(doc)
  const status = getStatus(doc)
  const canDelete = !SINGLETON_TYPES.has(doc._type)
  const liveUrl = PREVIEW_ORIGIN + url
  const dateStr = fmtDate(doc.publishedAt || doc._createdAt)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setConfirmDelete(false) }}
      style={{
        display: 'grid',
        gridTemplateColumns: ROW_GRID,
        gap: '8px',
        alignItems: 'center',
        padding: '9px 20px',
        borderBottom: `1px solid ${colors.border}`,
        background: hovered ? colors.rowHover : 'transparent',
        transition: 'background 0.1s ease',
        minWidth: 0,
      }}
    >
      {/* ── 1. Title + URL ── */}
      <div style={{ minWidth: 0 }}>
        <IntentLink
          intent="edit"
          params={{ id: doc._id, type: doc._type }}
          style={{ textDecoration: 'none', display: 'block' }}
        >
          <span
            style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: colors.link,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              lineHeight: '1.4',
              cursor: 'pointer',
            }}
          >
            {title}
          </span>
        </IntentLink>
        <span
          style={{
            display: 'block',
            fontSize: 11,
            color: colors.subtle,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginTop: 1,
            lineHeight: '1.4',
          }}
        >
          {url}
        </span>
        {doc._type === 'blogPost' && (
          <span
            style={{
              display: 'inline-block',
              marginTop: 3,
              fontSize: 10,
              fontWeight: 500,
              padding: '1px 6px',
              borderRadius: 3,
              border: `1px solid ${colors.border}`,
              color: colors.subtle,
              lineHeight: '16px',
            }}
          >
            Blog
          </span>
        )}
      </div>

      {/* ── 2. Author ── */}
      <div style={{ minWidth: 0 }}>
        <span
          style={{
            display: 'block',
            fontSize: 13,
            color: doc.authorName ? colors.text : colors.subtle,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {doc.authorName ?? '—'}
        </span>
      </div>

      {/* ── 3. Status ── */}
      <div>
        <Badge tone={status.tone} mode="outline">
          {status.label}
        </Badge>
      </div>

      {/* ── 4. Date ── */}
      <div>
        <span style={{ fontSize: 13, color: colors.text, whiteSpace: 'nowrap' }}>
          {dateStr}
        </span>
      </div>

      {/* ── 5. Permalink ── */}
      <div style={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span
          style={{
            display: 'block',
            fontSize: 12,
            color: colors.text,
            fontFamily: 'ui-monospace, "Cascadia Mono", "Segoe UI Mono", monospace',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: 1,
            minWidth: 0,
          }}
        >
          {url}
        </span>
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          title="View live page"
          style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <LaunchIcon style={{ width: 13, height: 13, color: colors.link, opacity: 0.8 }} />
        </a>
      </div>

      {/* ── 6. SEO ── */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: doc.seoTitle ? colors.seoOk : colors.seoWarn,
              flexShrink: 0,
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontSize: 12,
              color: colors.text,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {doc.seoTitle ?? 'No SEO title'}
          </span>
        </div>
        {doc.noIndex && (
          <span
            style={{
              display: 'inline-block',
              marginTop: 3,
              fontSize: 10,
              fontWeight: 500,
              padding: '1px 5px',
              borderRadius: 3,
              border: `1px solid ${colors.criticalFg}`,
              color: colors.criticalFg,
              lineHeight: '16px',
            }}
          >
            noindex
          </span>
        )}
      </div>

      {/* ── 7. Actions (visible on hover) ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.15s ease',
          pointerEvents: hovered ? 'auto' : 'none',
        }}
      >
        {!confirmDelete ? (
          <>
            {/* Quick Edit */}
            <IntentLink
              intent="edit"
              params={{ id: doc._id, type: doc._type }}
              style={{ textDecoration: 'none' }}
            >
              <Button
                as="span"
                mode="ghost"
                tone="default"
                icon={EditIcon}
                text="Edit"
                fontSize={1}
                padding={2}
              />
            </IntentLink>

            {/* Visual Edit — navigate to presentation tool for THIS page's URL */}
            <Button
              mode="ghost"
              tone="primary"
              icon={EyeOpenIcon}
              text="Visual"
              fontSize={1}
              padding={2}
              title={`Open ${url} in Visual Editor`}
              onClick={() => {
                // /presentation/:type/:id?preview=/path/
                // The Presentation tool reads `preview` search param to set the
                // iframe URL, and :type/:id to focus the correct document panel.
                window.location.href =
                  `/presentation/${doc._type}/${doc._id}` +
                  `?preview=${encodeURIComponent(url)}`
              }}
            />

            {/* View live */}
            <a href={liveUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <Button
                as="span"
                mode="ghost"
                tone="default"
                icon={LaunchIcon}
                text="View"
                fontSize={1}
                padding={2}
              />
            </a>

            {/* Clear cache */}
            <Button
              mode="ghost"
              tone="default"
              icon={SyncIcon}
              fontSize={1}
              padding={2}
              title="Clear CDN cache for this page"
              onClick={() => onClearCache(doc)}
            />

            {/* Trash — disabled for singleton pages */}
            {canDelete && (
              <Button
                mode="ghost"
                tone="critical"
                icon={TrashIcon}
                fontSize={1}
                padding={2}
                title="Move to trash"
                onClick={() => setConfirmDelete(true)}
              />
            )}
          </>
        ) : (
          <Flex align="center" gap={2} style={{ whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: colors.criticalFg }}>
              Delete?
            </span>
            <Button
              mode="default"
              tone="critical"
              text="Yes"
              fontSize={1}
              padding={2}
              onClick={() => { setConfirmDelete(false); onTrash(doc) }}
            />
            <Button
              mode="ghost"
              text="No"
              fontSize={1}
              padding={2}
              onClick={() => setConfirmDelete(false)}
            />
          </Flex>
        )}
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────

const COLUMNS = ['Title', 'Author', 'Status', 'Date', 'Permalink', 'SEO', '']

export function PageTableView() {
  const client = useClient({ apiVersion: '2024-01-01' })

  const [docs, setDocs] = useState<PageDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterMode>('all')
  const [toast, setToast] = useState<{
    msg: string
    tone: 'positive' | 'critical' | 'default'
  } | null>(null)

  const showToast = useCallback(
    (msg: string, tone: 'positive' | 'critical' | 'default') => {
      setToast({ msg, tone })
      setTimeout(() => setToast(null), 3500)
    },
    [],
  )

  const fetchDocs = useCallback(async () => {
    try {
      const result = await client.fetch<PageDoc[]>(GROQ_QUERY, { types: ALL_TYPES })
      setDocs(result)
      setError(null)
    } catch {
      setError('Failed to load pages. Check your network connection.')
    } finally {
      setLoading(false)
    }
  }, [client])

  useEffect(() => {
    fetchDocs()
    const sub = client
      .listen(GROQ_QUERY, { types: ALL_TYPES }, { visibility: 'query' })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((event: any) => {
        if (event?.type === 'mutation') fetchDocs()
      })
    return () => sub.unsubscribe()
  }, [client, fetchDocs])

  const handleTrash = useCallback(
    async (doc: PageDoc) => {
      try {
        await client.delete(doc._id).catch(() => null)
        await client.delete(`drafts.${doc._id}`).catch(() => null)
        showToast(`"${getTitle(doc)}" deleted.`, 'positive')
        fetchDocs()
      } catch {
        showToast('Failed to delete document.', 'critical')
      }
    },
    [client, fetchDocs, showToast],
  )

  const handleClearCache = useCallback(
    async (doc: PageDoc) => {
      const url = getUrl(doc)
      try {
        const res = await fetch(
          `${PREVIEW_ORIGIN}/api/revalidate?path=${encodeURIComponent(url)}`,
        )
        showToast(
          res.ok ? `Cache cleared for ${url}` : `Cache will refresh within 5 min for ${url}`,
          res.ok ? 'positive' : 'default',
        )
      } catch {
        showToast(`Cache will refresh within 5 min for ${url}`, 'default')
      }
    },
    [showToast],
  )

  const filtered = useMemo(
    () =>
      docs.filter(d => {
        if (filter === 'pages') return d._type !== 'blogPost'
        if (filter === 'blog') return d._type === 'blogPost'
        return true
      }),
    [docs, filter],
  )

  return (
    <Box
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ── */}
      <Box style={{ flexShrink: 0, padding: '16px 20px 0' }}>
        <Flex align="center" justify="space-between" style={{ marginBottom: 10 }}>
          <Stack space={1}>
            <Text size={3} weight="bold">Pages</Text>
            <Text size={1} muted>
              {loading ? 'Loading…' : `${filtered.length} ${filtered.length === 1 ? 'item' : 'items'}`}
            </Text>
          </Stack>
          <Flex gap={1}>
            {(['all', 'pages', 'blog'] as FilterMode[]).map(f => (
              <Button
                key={f}
                mode={filter === f ? 'default' : 'ghost'}
                tone="default"
                text={f === 'all' ? 'All' : f === 'pages' ? 'Pages' : 'Blog Posts'}
                fontSize={1}
                padding={2}
                onClick={() => setFilter(f)}
              />
            ))}
          </Flex>
        </Flex>

        {/* Toast */}
        {toast && (
          <Card tone={toast.tone} padding={3} radius={2} style={{ marginBottom: 8 }}>
            <Text size={1}>{toast.msg}</Text>
          </Card>
        )}

        {/* Column headers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: ROW_GRID,
            gap: '8px',
            padding: '6px 20px 8px',
            borderBottom: `2px solid ${colors.border}`,
          }}
        >
          {COLUMNS.map((col, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                color: colors.subtle,
              }}
            >
              {col}
            </span>
          ))}
        </div>
      </Box>

      {/* ── Body ── */}
      <Box style={{ flex: 1, overflowY: 'auto' }}>
        {loading ? (
          <Flex justify="center" padding={7}>
            <Spinner />
          </Flex>
        ) : error ? (
          <Card tone="critical" padding={4} margin={3} radius={2}>
            <Text>{error}</Text>
          </Card>
        ) : filtered.length === 0 ? (
          <Card padding={4} margin={3} radius={2}>
            <Text muted>No pages found.</Text>
          </Card>
        ) : (
          filtered.map(doc => (
            <TableRow
              key={doc._id}
              doc={doc}
              onTrash={handleTrash}
              onClearCache={handleClearCache}
            />
          ))
        )}
      </Box>
    </Box>
  )
}
