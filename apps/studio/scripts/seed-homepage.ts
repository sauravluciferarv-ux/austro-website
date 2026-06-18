/**
 * Homepage seed script.
 *
 * Run from the monorepo root:
 *   cd apps/studio && npm run seed
 *
 * Before running, add SANITY_WRITE_TOKEN to apps/studio/.env
 * Get a token: sanity.io/manage → project → API → Tokens → Add (Editor role)
 */
import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';

// Parse .env file without an extra dependency
function loadEnv(filePath: string): Record<string, string> {
  try {
    return Object.fromEntries(
      fs.readFileSync(filePath, 'utf-8')
        .split(/\r?\n/)
        .filter(l => l.trim() && !l.startsWith('#') && l.includes('='))
        .map(l => {
          const idx = l.indexOf('=');
          return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
        })
    );
  } catch { return {}; }
}

// Script is run from apps/studio (the npm script runs "cd apps/studio && npm run seed")
const studioEnv = loadEnv(path.join(process.cwd(), '.env'));

const projectId = studioEnv.SANITY_STUDIO_PROJECT_ID ?? '77nsnfp0';
const dataset   = studioEnv.SANITY_STUDIO_DATASET   ?? 'staging';
const token     = studioEnv.SANITY_WRITE_TOKEN ?? process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error('\n❌  SANITY_WRITE_TOKEN not set.\n');
  console.error('   1. Go to: https://sanity.io/manage  → your project → API → Tokens');
  console.error('   2. Click "Add API token" and choose the "Editor" role');
  console.error('   3. Paste the token into apps/studio/.env:');
  console.error('        SANITY_WRITE_TOKEN=<your-token-here>');
  console.error('   4. Re-run: cd apps/studio && npm run seed\n');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false, token });

// ── Helpers ───────────────────────────────────────────────────────────────────

let c = 0;
const k = () => `seed${String(++c).padStart(3, '0')}`;

const placeholder = (label: string) =>
  '<div style="display:flex;align-items:center;justify-content:center;border-radius:16px;' +
  'background:linear-gradient(135deg,#dbeafe 0%,#c7d2fe 100%);min-height:360px;' +
  'box-shadow:inset 0 2px 12px rgba(99,102,241,.12);">' +
  '<div style="text-align:center;padding:24px;">' +
  '<div style="font-size:52px;margin-bottom:12px;">🖼️</div>' +
  `<p style="color:#4f46e5;font-weight:600;font-size:15px;font-family:sans-serif;margin:0;">${label}</p>` +
  '<p style="color:#818cf8;font-size:12px;font-family:sans-serif;margin:6px 0 0;">' +
  'Replace with an Image Block in Studio</p></div></div>';

// Portable text helpers
const h2Block = (text: string) => ({
  _type: 'block', _key: k(), style: 'h2', markDefs: [] as any[],
  children: [{ _type: 'span', _key: k(), text, marks: [] as string[] }],
});
const pBlock = (text: string) => ({
  _type: 'block', _key: k(), style: 'normal', markDefs: [] as any[],
  children: [{ _type: 'span', _key: k(), text, marks: [] as string[] }],
});
const linkBlock = (text: string, href: string) => {
  const lk = k();
  return {
    _type: 'block', _key: k(), style: 'normal',
    markDefs: [{ _key: lk, _type: 'link', href, openInNewTab: false }],
    children: [{ _type: 'span', _key: k(), text, marks: [lk] }],
  };
};

// ── Document ──────────────────────────────────────────────────────────────────

const doc = {
  _id: 'homepage',
  _type: 'homepage',
  seo: {
    metaTitle:       'Desk365 — Helpdesk for Microsoft 365',
    metaDescription: 'A modern helpdesk built for Microsoft Teams. Automate workflows and deliver exceptional support.',
  },
  pageBuilder: [

    // ── 1. Hero (headline + subtitle) ────────────────────────────────────────
    {
      _type: 'pageSection', _key: k(),
      label: '🏠 Hero',
      layout: 'stack', containerWidth: 'contained',
      bgColor: '#eef2ff',
      paddingTop: '100px', paddingBottom: '16px',
      gap: 'lg', horizontalAlign: 'center',
      blocks: [
        {
          _type: 'headingBlock', _key: k(),
          text: 'Scale Your Customer Support with Desk365',
          level: 'h1', alignment: 'center',
        },
        {
          _type: 'richTextBlock', _key: k(),
          content: [
            pBlock('A powerful helpdesk built for Microsoft 365. Manage tickets, automate workflows, and deliver exceptional support — all from within Teams.'),
          ],
        },
      ],
    },

    // ── 2. Hero CTA buttons (two side-by-side) ───────────────────────────────
    {
      _type: 'pageSection', _key: k(),
      label: '🔵 Hero Buttons',
      layout: 'cols-2', containerWidth: 'narrow',
      bgColor: '#eef2ff',
      paddingTop: '0px', paddingBottom: '100px',
      gap: 'md', horizontalAlign: 'center',
      blocks: [
        { _type: 'buttonBlock', _key: k(), text: 'Start Free Trial', href: '/signup/', style: 'primary', size: 'lg', alignment: 'center' },
        { _type: 'buttonBlock', _key: k(), text: 'Book a Demo', href: '/request-demo/', style: 'outline', size: 'lg', alignment: 'center' },
      ],
    },

    // ── 3. Feature: IMAGE LEFT | text right ──────────────────────────────────
    {
      _type: 'pageSection', _key: k(),
      label: '✨ Ticket Management (img left)',
      layout: 'cols-2', containerWidth: 'wide',
      paddingTop: '80px', paddingBottom: '80px',
      gap: 'xl', verticalAlign: 'center',
      blocks: [
        { _type: 'htmlBlock', _key: k(), html: placeholder('Ticket Management Dashboard') },
        {
          _type: 'richTextBlock', _key: k(),
          content: [
            h2Block('Smarter Ticket Management'),
            pBlock('Automatically route, prioritize, and track support tickets with SLA-driven workflows. Your team stays focused — nothing slips through the cracks.'),
            pBlock(''),
            pBlock('✅  Auto-assignment rules'),
            pBlock('✅  SLA timers & breach alerts'),
            pBlock('✅  Collision detection for agents'),
            linkBlock('Explore all features →', '/features/'),
          ],
        },
      ],
    },

    // ── 4. Feature: text left | IMAGE RIGHT ──────────────────────────────────
    {
      _type: 'pageSection', _key: k(),
      label: '💬 Teams Integration (img right)',
      layout: 'cols-2', containerWidth: 'wide',
      bgColor: '#f9fafb',
      paddingTop: '80px', paddingBottom: '80px',
      gap: 'xl', verticalAlign: 'center',
      blocks: [
        {
          _type: 'richTextBlock', _key: k(),
          content: [
            h2Block('Support Built Inside Microsoft Teams'),
            pBlock('Your team already lives in Teams — so does Desk365. Agents create, view, and resolve tickets without switching apps. End-users submit by messaging the helpdesk bot.'),
            pBlock(''),
            pBlock('✅  Native Teams bot for ticket submission'),
            pBlock('✅  Agent notifications in Teams channels'),
            pBlock('✅  One-click escalation from chat to ticket'),
            linkBlock('See the Teams integration →', '/microsoft-teams-helpdesk/'),
          ],
        },
        { _type: 'htmlBlock', _key: k(), html: placeholder('Microsoft Teams Integration') },
      ],
    },

    // ── 5. Feature: IMAGE LEFT | text right (3rd block) ──────────────────────
    {
      _type: 'pageSection', _key: k(),
      label: '📊 Analytics (img left)',
      layout: 'cols-2', containerWidth: 'wide',
      paddingTop: '80px', paddingBottom: '80px',
      gap: 'xl', verticalAlign: 'center',
      blocks: [
        { _type: 'htmlBlock', _key: k(), html: placeholder('Support Analytics Dashboard') },
        {
          _type: 'richTextBlock', _key: k(),
          content: [
            h2Block('Analytics That Drive Better Support'),
            pBlock('Measure what matters with real-time dashboards. Track first-response times, resolution rates, agent performance, and CSAT scores — all in one place.'),
            pBlock(''),
            pBlock('✅  CSAT & NPS tracking'),
            pBlock('✅  Agent workload & performance reports'),
            pBlock('✅  Exportable CSV / Excel reports'),
            linkBlock('View reporting features →', '/features/reports/'),
          ],
        },
      ],
    },

    // ── 6. CTA banner (dark blue gradient) ───────────────────────────────────
    {
      _type: 'pageSection', _key: k(),
      label: '🎯 CTA Banner',
      layout: 'stack', containerWidth: 'full',
      sectionClass: 'cta-banner',
      bgGradient: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
      paddingTop: '80px', paddingBottom: '80px',
      gap: 'lg', horizontalAlign: 'center',
      customCss: [
        '.cta-banner h2 { color: white; }',
        '.cta-banner p  { color: #bfdbfe; }',
        '.cta-banner .cta-white-btn a { border-color: white; color: white; }',
        '.cta-banner .cta-white-btn a:hover { background: rgba(255,255,255,.12); }',
      ].join('\n'),
      blocks: [
        {
          _type: 'headingBlock', _key: k(),
          text: 'Ready to Transform Your Customer Support?',
          level: 'h2', alignment: 'center',
        },
        {
          _type: 'richTextBlock', _key: k(),
          content: [
            pBlock('Join 1,000+ teams who use Desk365 to resolve tickets faster and deliver exceptional support experiences. 21-day free trial — no credit card required.'),
          ],
        },
        {
          _type: 'buttonBlock', _key: k(),
          text: 'Start Free Trial',
          href: '/signup/',
          style: 'outline', size: 'lg', alignment: 'center',
          blockClass: 'cta-white-btn',
        },
      ],
    },

  ],
};

// ── Run ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🌱  Seeding homepage  →  ${projectId} / ${dataset}\n`);

  // Write both the published document AND the draft.
  // The Presentation tool shows the DRAFT when preview mode is on.
  // Without seeding the draft, any existing draft (old edits) would override
  // the seeded published document and the preview would show stale content.
  const published = await client.createOrReplace(doc);
  console.log(`✅  Published document saved  (_id: ${published._id})`);

  const draft = await client.createOrReplace({ ...doc, _id: `drafts.homepage` });
  console.log(`✅  Draft document saved       (_id: ${draft._id})\n`);

  console.log('Next steps:');
  console.log('  • Open Studio → "Preview" tab (eye icon) — the Presentation tool');
  console.log('  • Hover over any section/block → click the pencil to jump to that field');
  console.log('  • Edits now refresh the preview automatically (no publish needed)');
  console.log('  • Replace 🖼️ placeholders with real Image Blocks when ready\n');
}

main().catch(err => { console.error('❌', err.message ?? err); process.exit(1); });
