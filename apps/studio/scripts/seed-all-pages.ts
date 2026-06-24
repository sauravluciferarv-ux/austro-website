/**
 * seed-all-pages.ts — seeds ALL singleton page documents into Sanity.
 *
 * Run from apps/studio:
 *   cd apps/studio && npm run seed:all
 *
 * Requires SANITY_WRITE_TOKEN in apps/studio/.env
 *   Get one: sanity.io/manage → project → API → Tokens → Add (Editor role)
 *
 * Safe to re-run: uses createOrReplace (idempotent).
 * Only overwrites fields you define here — existing Sanity edits outside
 * these fields are preserved if you use `patch` instead of `createOrReplace`.
 */
import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';

// ── Env setup ─────────────────────────────────────────────────────────────────

function loadEnv(filePath: string): Record<string, string> {
  try {
    return Object.fromEntries(
      fs.readFileSync(filePath, 'utf-8')
        .split(/\r?\n/)
        .filter(l => l.trim() && !l.startsWith('#') && l.includes('='))
        .map(l => { const idx = l.indexOf('='); return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()]; })
    );
  } catch { return {}; }
}

const env = loadEnv(path.join(process.cwd(), '.env'));
const projectId = env.SANITY_STUDIO_PROJECT_ID ?? '77nsnfp0';
const dataset   = env.SANITY_STUDIO_DATASET   ?? 'staging';
const token     = env.SANITY_WRITE_TOKEN ?? process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error('\n❌  SANITY_WRITE_TOKEN not set.');
  console.error('   Add to apps/studio/.env:  SANITY_WRITE_TOKEN=<editor-token>\n');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false, token });

// ── Key generator ─────────────────────────────────────────────────────────────

let n = 0;
const k = () => `sp${String(++n).padStart(4, '0')}`;

// ── Documents ─────────────────────────────────────────────────────────────────

// ─── 1. Pricing Page ──────────────────────────────────────────────────────────
const pricingPage = {
  _id: 'pricingPage',
  _type: 'pricingPage',
  status: 'published',
  heroEyebrow: 'Pricing',
  heroHeading: 'Pricing built for teams of all sizes',
  heroSubheading: 'Powerful helpdesk software without the enterprise price tag.\nTry every feature free for 21 days — no credit card required.',
  billingConfig: {
    monthlyLabel: 'Monthly',
    yearlyLabel: 'Yearly',
    yearlySaveBadge: 'Save 25%',
    billingYearlyNote: 'billed yearly',
    billingMonthlyNote: 'billed monthly',
  },
  priceUnit: '/agent/mo',
  freePriceLabel: 'Free',
  featureTableColumnLabels: {
    featureCol: 'Feature',
    freeCol: 'Free',
    standardCol: 'Standard',
    plusCol: 'Plus',
    premiumCol: 'Premium',
  },
  plans: [
    {
      _key: k(), _type: 'pricingTier',
      id: { current: 'free' },
      name: 'FREE',
      tagline: 'For solopreneurs & personal projects',
      monthlyPrice: 0, yearlyPrice: 0,
      ctaLabel: 'Get Started Free',
      ctaHref: 'https://app.desk365.io/register',
      ctaStyle: 'outline',
      highlight: false,
      features: ['Up to 50 tickets/month', '1 agent seat', 'Email ticketing', 'Web form', 'Knowledge base (5 articles)', 'Standard support'],
    },
    {
      _key: k(), _type: 'pricingTier',
      id: { current: 'standard' },
      name: 'STANDARD',
      tagline: 'Core helpdesk for growing teams',
      monthlyPrice: 16, yearlyPrice: 12,
      ctaLabel: 'Start Free Trial',
      ctaHref: '/pricing/#start',
      ctaStyle: 'outline-blue',
      highlight: false,
      features: ['Unlimited tickets', 'Email, Teams & web form channels', 'Basic automations & SLA management', 'Knowledge base (unlimited articles)', '200 GB file storage', 'Standard reports', 'MFA security', '21-day free trial'],
    },
    {
      _key: k(), _type: 'pricingTier',
      id: { current: 'plus' },
      name: 'PLUS',
      tagline: 'Advanced tools for scaling support',
      monthlyPrice: 28, yearlyPrice: 22,
      ctaLabel: 'Start Free Trial',
      ctaHref: '/pricing/#start',
      ctaStyle: 'green-solid',
      highlight: true,
      badge: 'Most Popular',
      features: ['Everything in Standard', 'Round-robin & load-based assignment', 'Time-based automations', 'Ticket watchers & sharing', 'CSAT surveys', 'Multiple dashboards', '500 GB file storage', 'AI draft replies (100 credits/mo)'],
    },
    {
      _key: k(), _type: 'pricingTier',
      id: { current: 'premium' },
      name: 'PREMIUM',
      tagline: 'Enterprise-grade compliance & AI',
      monthlyPrice: 40, yearlyPrice: 32,
      ctaLabel: 'Start Free Trial',
      ctaHref: '/pricing/#start',
      ctaStyle: 'blue-solid',
      highlight: false,
      features: ['Everything in Plus', 'Asset & software lifecycle management', 'HIPAA compliance & encrypted fields', 'PII / PHI data redaction', 'Scheduled ticket creation', 'Contact management customization', '1 TB file storage', 'AI draft replies (200 credits/mo)'],
    },
  ],
  plansFootnote: 'All plans include a 21-day free trial. No credit card required. Need volume discounts?',
  plansFootnoteContactLabel: 'Contact us',
  plansFootnoteContactHref: '/contact/',
  competitors: [
    { _key: k(), _type: 'competitor', name: 'Desk365',  price: 220,  highlight: true },
    { _key: k(), _type: 'competitor', name: 'Zoho Desk',price: 230,  highlight: false },
    { _key: k(), _type: 'competitor', name: 'Freshdesk',price: 590,  highlight: false },
    { _key: k(), _type: 'competitor', name: 'Zendesk',  price: 1150, highlight: false },
  ],
  comparisonEyebrow: 'Value Comparison',
  comparisonHeading: 'Save up to 80% vs. competitors',
  comparisonSubheading: 'Monthly cost for 10 agents on comparable plans (billed annually).',
  comparisonFootnote: '* Prices shown are indicative based on publicly available plans as of 2026.',
  featureTableEyebrow: 'Full Comparison',
  featureTableHeading: 'Everything included across all plans',
  aiAddonEyebrow: 'AI Agent Add-on',
  aiAddonHeading: 'Autonomous AI that resolves tickets on its own',
  aiAddonBody: 'Deploy AI agents that understand context, search your knowledge base, and resolve repetitive queries without human intervention — escalating only when truly needed.',
  aiAddonBullets: [
    'Multi-agent creation with custom personas',
    'Contextual resolution from your knowledge base',
    'Autonomous escalation to human agents',
    'Usage-based: $50 / 1,000 credits',
  ],
  aiAddonCtaLabel: 'Learn about AI Agent',
  aiAddonCtaHref: '/features/ai-agent/',
  aiAddonCreditCards: [
    { _key: k(), _type: 'aiAddonCreditCard', planName: 'Plus', credits: '100 free credits/mo' },
    { _key: k(), _type: 'aiAddonCreditCard', planName: 'Premium', credits: '200 free credits/mo' },
  ],
  aiAddonCardGradient: 'linear-gradient(135deg, var(--d365-blue) 0%, #7b1fa2 100%)',
  aiAddonCardSmallBg: '#1a1a2e',
  aiAddonStats: [
    { _key: k(), _type: 'aiAddonStat', stat: '85%', label: 'tickets auto-resolved' },
    { _key: k(), _type: 'aiAddonStat', stat: '$50', label: 'per 1,000 credits' },
  ],
  trustBarLabel: 'Trusted by 7,000+ businesses across 65+ countries',
  trustBarCustomers: ['CBRE Group', 'LAPD', 'Panasonic', 'BBC', 'Yamaha', 'Konica Minolta', 'Standard Bank', 'University of Kentucky'],
  trustBarStats: [
    { _key: k(), _type: 'trustBarStat', number: '4.9', label: 'Rating on G2' },
    { _key: k(), _type: 'trustBarStat', number: '7,000+', label: 'Businesses' },
    { _key: k(), _type: 'trustBarStat', number: '65+', label: 'Countries' },
    { _key: k(), _type: 'trustBarStat', number: '21-day', label: 'Free trial' },
  ],
  faqEyebrow: 'FAQ',
  faqHeading: 'Frequently asked questions',
  faqs: [
    { _key: k(), _type: 'faqItem', question: 'Why is Desk365 priced so competitively?', answer: "We're a product-focused company that invests in engineering efficiency over large sales teams. This lets us pass the savings on to customers without sacrificing quality — you get enterprise features at a fraction of the cost of Zendesk or Freshdesk." },
    { _key: k(), _type: 'faqItem', question: 'What happens after the 21-day free trial?', answer: 'After your trial you automatically move to the Free plan (up to 50 tickets/month). You can upgrade to Standard, Plus, or Premium at any time from your dashboard — no credit card required to start the trial.' },
    { _key: k(), _type: 'faqItem', question: 'Can I switch between monthly and yearly billing?', answer: 'Yes. You can switch at any time from your account settings. Switching to yearly gives you a 25% discount. If you switch mid-cycle, we prorate the difference.' },
    { _key: k(), _type: 'faqItem', question: 'What is an "agent"?', answer: 'An agent is any team member who logs in to respond to tickets. End-users (customers submitting tickets) are never counted as agents and are unlimited across all plans.' },
    { _key: k(), _type: 'faqItem', question: 'What payment methods do you accept?', answer: 'We accept all major credit cards (Visa, Mastercard, Amex, Discover) as well as ACH bank transfer and wire transfer for annual invoices. All payments are processed securely through Stripe.' },
    { _key: k(), _type: 'faqItem', question: 'Is migration assistance included?', answer: 'Yes — we provide free migration assistance to help you move tickets, contacts, and settings from your existing helpdesk. Our team works with you directly to ensure a smooth transition.' },
    { _key: k(), _type: 'faqItem', question: 'Are there discounts for nonprofits or startups?', answer: 'Yes. We offer special pricing for nonprofits and qualified startups. Contact our sales team at sales@desk365.io to learn more.' },
    { _key: k(), _type: 'faqItem', question: 'How does the AI Agent add-on work?', answer: 'The AI Agent is a usage-based add-on at $50 per 1,000 credits. Plus plans include 100 free credits/month and Premium includes 200. One credit is consumed per AI-resolved ticket interaction.' },
  ],
  finalCtaHeading: 'Start your free 21-day trial today',
  finalCtaSubheading: 'No credit card required. Full access to all Plus features during the trial.',
  finalCtaPrimaryLabel: 'Start Your Free Trial',
  finalCtaPrimaryHref: 'https://app.desk365.io/register',
  finalCtaSecondaryLabel: 'Book a Demo',
  finalCtaSecondaryHref: '/request-demo/',
  finalCtaFootnote: 'SOC 2 Type II • GDPR • HIPAA (Premium) • US & EU data centers',
  finalCtaGradientAccent: '#5e35b1',
  seo: {
    metaTitle: 'Pricing — Desk365 | AI-Powered Helpdesk for Teams of All Sizes',
    metaDescription: 'Simple, transparent pricing. Start free, scale as you grow. Desk365 plans start at $12/agent/month. 21-day free trial, no credit card required.',
  },
};

// ─── 2. Features Page ─────────────────────────────────────────────────────────
const featuresPage = {
  _id: 'featuresPage',
  _type: 'featuresPage',
  status: 'published',
  heroEyebrow: 'All Features',
  heroHeading: 'Delight your customers at scale',
  heroSubheading: 'Scale your support with a simple yet feature-packed helpdesk. Automate workflows, enable self-service, and give your team the tools they need to collaborate and resolve issues faster in a clean, intuitive interface that just works.',
  heroPrimaryCtaLabel: 'Start Your Free Trial',
  heroPrimaryCtaHref: 'https://app.desk365.io/register',
  heroSecondaryCtaLabel: 'Request Demo',
  heroSecondaryCtaHref: '/request-demo/',
  heroFootnote: 'No credit card required',
  learnMoreLabel: 'Learn more',
  categories: [
    {
      _key: k(), _type: 'featureCategory',
      id: { current: 'ai' }, label: 'Artificial Intelligence',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>`,
      features: [
        { _key: k(), _type: 'featureItem', name: 'AI Agent', href: '/features/ai-agent/', description: 'Deploy autonomous AI agents that resolve repetitive queries, search your knowledge base, and escalate only when truly needed — reducing ticket volume without extra headcount.', tags: ['Autonomous', 'Multi-agent', 'Knowledge integration'] },
        { _key: k(), _type: 'featureItem', name: 'AI Copilot', href: '/features/ai-agent/', description: 'Assist your human agents with intelligent reply drafting, instant ticket summarization, and real-time knowledge base suggestions — so every response is faster and more accurate.', tags: ['Draft replies', 'Summarization', 'Knowledge suggestions'] },
      ],
    },
    {
      _key: k(), _type: 'featureCategory',
      id: { current: 'itsm' }, label: 'IT Service Management',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/>`,
      features: [
        { _key: k(), _type: 'featureItem', name: 'Asset Management', href: '/features/asset-management/', description: 'Track hardware, software, and consumable assets across their full lifecycle. Link assets directly to tickets, users, and departments for full visibility and accountability.', tags: ['Hardware tracking', 'Software lifecycle', 'Depreciation'] },
        { _key: k(), _type: 'featureItem', name: 'Change & Approval Management', href: '/features/approval-management/', description: 'Automate sequential and non-sequential approval workflows for IT changes. Keep stakeholders informed at every step with automatic notifications and audit trails.', tags: ['Approval workflows', 'Change control', 'Audit trail'] },
      ],
    },
    {
      _key: k(), _type: 'featureCategory',
      id: { current: 'microsoft' }, label: 'Microsoft Integrations',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>`,
      features: [
        { _key: k(), _type: 'featureItem', name: 'Microsoft Teams Ticketing', href: '/microsoft-teams-ticketing-system/', description: 'Create, manage, and resolve support tickets directly inside Microsoft Teams — without switching tabs. Works as a native app your team already uses every day.', tags: ['Native Teams app', 'No tab switching', 'Real-time updates'] },
        { _key: k(), _type: 'featureItem', name: 'Microsoft Entra ID Sync', href: '/features/customization/', description: 'Automatically sync users, roles, and departments from Microsoft Entra ID (formerly Azure AD). Centralize identity management and reduce manual provisioning.', tags: ['Auto-sync', 'SSO', 'Role mapping'] },
      ],
    },
    {
      _key: k(), _type: 'featureCategory',
      id: { current: 'ticketing' }, label: 'Ticketing',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/>`,
      features: [
        { _key: k(), _type: 'featureItem', name: 'Unified Inbox', href: '/features/ticket-assignment/', description: 'Manage all incoming support requests from email, Teams, web form, and portal in a single, organized inbox — eliminating duplicate tickets and missed requests.', tags: ['Omnichannel', 'Deduplication', 'Priority queue'] },
        { _key: k(), _type: 'featureItem', name: 'Automations', href: '/features/automations/', description: 'Configure powerful macros and rules triggered on ticket creation, updates, or time conditions. Automate routing, escalation, tagging, and status changes without code.', tags: ['Workflow rules', 'Time-based triggers', 'Auto-routing'] },
        { _key: k(), _type: 'featureItem', name: 'SLA Management', href: '/features/slas/', description: 'Define service level agreements with response and resolution targets. Get automatic reminders, escalations, and infraction reports to keep your team accountable.', tags: ['SLA policies', 'Escalations', 'Breach reporting'] },
        { _key: k(), _type: 'featureItem', name: 'APIs, Webhooks & Connectors', href: '/features/customization/', description: 'Integrate Desk365 with your existing tools via a fully documented REST API, real-time webhooks, and pre-built connectors for popular business apps.', tags: ['REST API', 'Webhooks', 'Third-party connectors'] },
      ],
    },
    {
      _key: k(), _type: 'featureCategory',
      id: { current: 'omnichannel' }, label: 'Omnichannel',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>`,
      features: [
        { _key: k(), _type: 'featureItem', name: 'Email Ticketing', href: '/features/ticket-assignment/', description: 'Every email to your support address is automatically converted to a tracked ticket — with threading, attachments, and full history.', tags: ['Auto-convert', 'Threading', 'Attachment support'] },
        { _key: k(), _type: 'featureItem', name: 'Microsoft Teams', href: '/microsoft-teams-ticketing-system/', description: 'Let employees submit and track tickets without leaving Microsoft Teams using a native bot and app interface.', tags: ['Native bot', 'Teams channel', 'Real-time'] },
        { _key: k(), _type: 'featureItem', name: 'Web Portal', href: '/features/customization/', description: 'Give customers a branded self-service portal to submit tickets, track status, and browse your knowledge base — reducing inbound volume.', tags: ['Branded portal', 'Ticket tracking', 'Self-service'] },
        { _key: k(), _type: 'featureItem', name: 'Web Form & Widget', href: '/features/customization/', description: 'Embed a support form or floating widget on any website page. Customize fields, branding, and routing without code.', tags: ['Embeddable', 'Custom fields', 'No-code setup'] },
      ],
    },
    {
      _key: k(), _type: 'featureCategory',
      id: { current: 'self-service' }, label: 'Self-Service',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>`,
      features: [
        { _key: k(), _type: 'featureItem', name: 'Knowledge Base', href: '/features/knowledge-base/', description: 'Build a searchable knowledge base with unlimited articles, categories, and rich media. Empower customers to find answers before submitting tickets.', tags: ['WYSIWYG editor', 'Search', 'Rich media'] },
        { _key: k(), _type: 'featureItem', name: 'Internal Knowledge Base', href: '/features/knowledge-base/', description: 'Create agent-only training articles and internal guides visible only to your support team — keeping sensitive procedures private.', tags: ['Agent-only', 'Training docs', 'Restricted access'] },
        { _key: k(), _type: 'featureItem', name: 'Multi-brand Knowledge Base', href: '/features/knowledge-base/', description: 'Run separate knowledge base portals for different products, brands, or customer segments — each with its own branding and content.', tags: ['Multi-brand', 'Custom domains', 'Separate portals'] },
        { _key: k(), _type: 'featureItem', name: 'Article Versioning', href: '/features/knowledge-base/', description: 'Maintain a full version history of every article. Roll back to previous versions, review change logs, and keep content accurate over time.', tags: ['Version history', 'Rollback', 'Change log'] },
      ],
    },
    {
      _key: k(), _type: 'featureCategory',
      id: { current: 'productivity' }, label: 'Productivity',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>`,
      features: [
        { _key: k(), _type: 'featureItem', name: 'Ticket Assignment', href: '/features/ticket-assignment/', description: 'Auto-assign incoming tickets using round-robin, load-based, or skill-based routing rules — ensuring balanced workloads and faster response times.', tags: ['Round-robin', 'Load-based', 'Skill-based'] },
        { _key: k(), _type: 'featureItem', name: 'Canned Responses', href: '/features/automations/', description: "Save and reuse frequently-sent replies with dynamic placeholders. Let agents respond to common questions in seconds instead of minutes.", tags: ['Saved replies', 'Placeholders', 'Quick insert'] },
        { _key: k(), _type: 'featureItem', name: 'Multilingual Support', href: '/features/customization/', description: "Support customers in 30+ languages. Desk365 auto-detects the customer's language and routes to the right agent or knowledge base.", tags: ['30+ languages', 'Auto-detect', 'Localized portal'] },
        { _key: k(), _type: 'featureItem', name: 'Custom Views', href: '/features/ticket-assignment/', description: 'Create personalized ticket queues with custom filters and columns. Every agent sees the tickets most relevant to their role.', tags: ['Saved filters', 'Custom columns', 'Personal queues'] },
      ],
    },
    {
      _key: k(), _type: 'featureCategory',
      id: { current: 'reports' }, label: 'Reports & Analytics',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>`,
      features: [
        { _key: k(), _type: 'featureItem', name: 'Productivity Reports', href: '/features/reports/', description: 'Track agent performance, ticket volumes, response times, and resolution rates with pre-built productivity reports. Identify bottlenecks before they escalate.', tags: ['Agent performance', 'Volume trends', 'Resolution rates'] },
        { _key: k(), _type: 'featureItem', name: 'CSAT Surveys', href: '/features/reports/', description: 'Automatically send satisfaction surveys after ticket resolution. Collect ratings and feedback to measure customer happiness and identify improvement areas.', tags: ['Auto-send', 'Star ratings', 'Feedback collection'] },
        { _key: k(), _type: 'featureItem', name: 'Custom Reports & Dashboards', href: '/features/reports/', description: 'Build custom reports and dashboards tailored to your KPIs. Export data as CSV for deeper analysis in your BI tools.', tags: ['Custom KPIs', 'Export CSV', 'Multiple dashboards'] },
      ],
    },
    {
      _key: k(), _type: 'featureCategory',
      id: { current: 'customization' }, label: 'Customization',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/>`,
      features: [
        { _key: k(), _type: 'featureItem', name: 'Custom Fields & Forms', href: '/features/customization/', description: 'Add custom fields to tickets, contacts, and assets. Build intake forms tailored to your workflows — capturing exactly the data you need from the start.', tags: ['Custom fields', 'Form builder', 'Conditional logic'] },
        { _key: k(), _type: 'featureItem', name: 'Custom Roles & Permissions', href: '/features/customization/', description: 'Define granular access levels with custom roles. Control what each agent can see, create, modify, or delete.', tags: ['Role-based access', 'Granular permissions', 'Agent hierarchy'] },
        { _key: k(), _type: 'featureItem', name: 'White-label & Custom Domain', href: '/features/customization/', description: "Brand your helpdesk portal with your logo, colors, and custom domain. Customers see your brand — not ours.", tags: ['Custom domain', 'Logo & colors', 'White-label'] },
        { _key: k(), _type: 'featureItem', name: 'Email Templates', href: '/features/customization/', description: 'Customize every transactional email your customers and agents receive — from ticket confirmations to escalation alerts.', tags: ['HTML templates', 'Dynamic variables', 'Branding'] },
      ],
    },
    {
      _key: k(), _type: 'featureCategory',
      id: { current: 'security' }, label: 'Security',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>`,
      features: [
        { _key: k(), _type: 'featureItem', name: 'Multi-Factor Authentication', href: '/features/security/', description: 'Require MFA for all agent logins. Supports TOTP authenticator apps and SMS-based verification to protect your helpdesk from unauthorized access.', tags: ['TOTP', 'SMS verification', 'Enforced for all agents'] },
        { _key: k(), _type: 'featureItem', name: 'HIPAA Compliance', href: '/features/security/', description: 'Premium plan includes HIPAA-compliant data handling — encrypted fields, Business Associate Agreement (BAA), and audit logs for healthcare organizations.', tags: ['BAA available', 'Encrypted fields', 'Healthcare-ready'] },
        { _key: k(), _type: 'featureItem', name: 'PII / PHI Data Redaction', href: '/features/security/', description: 'Automatically detect and redact personally identifiable information from ticket bodies and attachments before storage — reducing compliance risk.', tags: ['Auto-redaction', 'PII detection', 'GDPR / CCPA'] },
        { _key: k(), _type: 'featureItem', name: 'SOC 2 Type II & GDPR', href: '/features/security/', description: 'Desk365 is SOC 2 Type II certified and fully GDPR-compliant. Data centers available in the US and EU for data residency requirements.', tags: ['SOC 2 Type II', 'GDPR', 'US & EU data centers'] },
      ],
    },
  ],
  finalCtaHeading: 'Ready to simplify your support?',
  finalCtaSubheading: 'Start your free 21-day trial. No credit card required.',
  finalCtaPrimaryLabel: 'Start Free Trial',
  finalCtaPrimaryHref: 'https://app.desk365.io/register',
  finalCtaSecondaryLabel: 'View Pricing',
  finalCtaSecondaryHref: '/pricing/',
  finalCtaGradientAccent: '#5e35b1',
  seo: {
    metaTitle: 'Features — Desk365 | Full Helpdesk Feature List',
    metaDescription: 'Explore the full Desk365 feature set: AI agent, Microsoft Teams, ITSM, omnichannel ticketing, knowledge base, reports, and more.',
  },
};

// ─── 3. About Page ────────────────────────────────────────────────────────────
const aboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  status: 'published',
  heroEyebrow: 'About Us',
  heroHeading: 'Building the helpdesk for the modern era',
  heroSubheading: "Desk365 was founded on a simple belief: powerful helpdesk software shouldn't require a six-figure contract. We built the platform we wished existed — enterprise-grade features at a price that works for teams of every size.",
  heroBgGradient: 'linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #5e35b1 100%)',
  missionEyebrow: 'Our Mission',
  missionHeading: 'Our mission',
  missionBody1: "Desk365 was built for the team leader who needed better tools but couldn't justify the price of Zendesk or Freshdesk. We took everything modern support teams need — omnichannel ticketing, AI-powered automation, ITSM, knowledge base — and packaged it at a price point anyone can afford.",
  missionBody2: "Our engineering team ships meaningful updates every two weeks, guided by the same customers who use Desk365 to run their support operations every day. When you submit feedback, there's a good chance it's in the next release.",
  missionStats: [
    { _key: k(), _type: 'missionStat', stat: '85%', label: 'tickets resolved with AI', colorKey: 'blue' },
    { _key: k(), _type: 'missionStat', stat: '<2s', label: 'average response time', colorKey: 'green' },
    { _key: k(), _type: 'missionStat', stat: '99.9%', label: 'uptime SLA', colorKey: 'dark' },
  ],
  stats: [
    { _key: k(), _type: 'statItem', number: '7,000+', label: 'Businesses worldwide' },
    { _key: k(), _type: 'statItem', number: '65+',    label: 'Countries served' },
    { _key: k(), _type: 'statItem', number: '4.9',    label: 'G2 rating' },
    { _key: k(), _type: 'statItem', number: '2019',   label: 'Founded' },
  ],
  valuesEyebrow: 'Our Values',
  valuesHeading: 'How we build and operate',
  values: [
    { _key: k(), _type: 'valueItem', title: 'Simplicity First',    description: 'We believe powerful software should be simple to use. Every feature is designed to reduce friction, not add to it.', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>` },
    { _key: k(), _type: 'valueItem', title: 'Customer Obsessed',   description: 'Our own product is our best showcase. Every release is driven by real feedback from the support teams who use Desk365 every day.', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>` },
    { _key: k(), _type: 'valueItem', title: 'Move Fast',           description: "We ship meaningful updates every sprint. If you report a bug today, there's a good chance it's fixed before your next login.", icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>` },
    { _key: k(), _type: 'valueItem', title: 'Transparent Pricing', description: 'No hidden fees, no surprise overages. What you see on the pricing page is exactly what you pay.', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>` },
  ],
  timelineEyebrow: 'Our Journey',
  timelineHeading: 'From zero to 7,000+ businesses',
  milestones: [
    { _key: k(), _type: 'milestone', year: '2019', event: 'Desk365 founded by Kani Technologies in Coimbatore, India' },
    { _key: k(), _type: 'milestone', year: '2020', event: 'Launched Microsoft Teams integration — a first for SMB helpdesk software' },
    { _key: k(), _type: 'milestone', year: '2021', event: 'Reached 1,000 business customers across 30 countries' },
    { _key: k(), _type: 'milestone', year: '2022', event: 'Achieved SOC 2 Type II certification and launched HIPAA-compliant tier' },
    { _key: k(), _type: 'milestone', year: '2023', event: 'Launched full ITSM suite with Asset Management and Change Approvals' },
    { _key: k(), _type: 'milestone', year: '2024', event: 'Surpassed 5,000 businesses. Launched AI Copilot for agents' },
    { _key: k(), _type: 'milestone', year: '2025', event: 'Introduced autonomous AI Agent — resolving 85%+ of repetitive tickets' },
    { _key: k(), _type: 'milestone', year: '2026', event: '7,000+ businesses in 65+ countries. 4.9 G2 rating' },
  ],
  finalCtaHeading: 'Join 7,000+ businesses on Desk365',
  finalCtaSubheading: 'Start your free 21-day trial. No credit card required.',
  finalCtaPrimaryLabel: 'Start Free Trial',
  finalCtaPrimaryHref: 'https://app.desk365.io/register',
  finalCtaSecondaryLabel: 'Book a Demo',
  finalCtaSecondaryHref: '/request-demo/',
  finalCtaGradientAccent: '#5e35b1',
  seo: {
    metaTitle: 'About Us — Desk365 | Building the Helpdesk for the Modern Era',
    metaDescription: 'Desk365 was founded to make powerful helpdesk software accessible to every team — not just enterprise. Learn about our mission, values, and story.',
  },
};

// ─── 4. Contact Page ──────────────────────────────────────────────────────────
const contactPage = {
  _id: 'contactPage',
  _type: 'contactPage',
  status: 'published',
  heroEyebrow: 'Contact Us',
  heroHeading: "We'd love to hear from you",
  heroSubheading: "Whether you have a question, need a hand, or want to see a demo — we're here.",
  heroPrimaryCtaLabel: 'Book a Demo',
  heroPrimaryCtaHref: '/request-demo/',
  heroSecondaryCtaLabel: 'Start Free Trial',
  heroSecondaryCtaHref: 'https://app.desk365.io/register',
  supportEmail: 'support@desk365.io',
  generalEmail: 'contact@desk365.io',
  careersEmail: 'careers@desk365.io',
  contactCards: [
    { _key: k(), _type: 'contactCard', title: 'Support', description: 'Technical issues, account help, or billing questions.', emailKey: 'support' },
    { _key: k(), _type: 'contactCard', title: 'General Inquiries', description: 'Feature requests, partnerships, and press inquiries.', emailKey: 'general' },
    { _key: k(), _type: 'contactCard', title: 'Careers', description: 'Interested in joining the Desk365 team?', emailKey: 'careers' },
  ],
  officesEyebrow: 'Our Offices',
  officesHeading: 'Where we are',
  offices: [
    { _key: k(), _type: 'office', city: 'San Francisco', region: 'USA',   flag: '🇺🇸', description: 'Bay Area headquarters serving North America.' },
    { _key: k(), _type: 'office', city: 'Coimbatore',   region: 'India', flag: '🇮🇳', description: 'Engineering and support operations center.' },
  ],
  resourcesEyebrow: 'Resources',
  resourcesHeading: 'Find answers on your own',
  resourcesSubheading: 'Most questions are already answered in our help center and documentation.',
  resources: [
    { _key: k(), _type: 'resource', title: 'Help Center', description: 'Troubleshooting advice, setup guides, and step-by-step articles for getting the most out of Desk365.', linkLabel: 'Visit Help Center', linkHref: 'https://support.desk365.io', external: true },
    { _key: k(), _type: 'resource', title: 'Video Tutorials', description: 'Step-by-step video walkthroughs showing exactly how to configure and use Desk365 features.', linkLabel: 'Watch Videos', linkHref: '/videos/', external: false },
    { _key: k(), _type: 'resource', title: 'Blog', description: 'Insights, best practices, and the latest trends in customer service, IT support, and helpdesk software.', linkLabel: 'Read the Blog', linkHref: '/blog/', external: false },
    { _key: k(), _type: 'resource', title: 'API Documentation', description: 'Full REST API reference with code examples for integrating Desk365 with your existing tools and workflows.', linkLabel: 'View API Docs', linkHref: 'https://developer.desk365.io', external: true },
    { _key: k(), _type: 'resource', title: 'Partner Program', description: 'Become a Desk365 reseller or referral partner and earn commissions helping businesses modernize their helpdesk.', linkLabel: 'Join as Partner', linkHref: '/partners/', external: false },
  ],
  finalCtaHeading: 'Ready to get started?',
  finalCtaSubheading: '21-day free trial. No credit card. Full Plus features from day one.',
  finalCtaPrimaryLabel: 'Start Free Trial',
  finalCtaPrimaryHref: 'https://app.desk365.io/register',
  finalCtaSecondaryLabel: 'Book a Demo',
  finalCtaSecondaryHref: '/request-demo/',
  finalCtaGradientAccent: '#5e35b1',
  seo: {
    metaTitle: 'Contact Us — Desk365',
    metaDescription: 'Get in touch with the Desk365 team. Access our help center, reach out by email, or book a demo. We would love to hear from you!',
  },
};

// ─── 5. Request Demo Page ─────────────────────────────────────────────────────
const requestDemoPage = {
  _id: 'requestDemoPage',
  _type: 'requestDemoPage',
  status: 'published',
  heroHeading: 'See Desk365 in action',
  heroSubheading: "Schedule a personalized 30-minute demo with a Desk365 specialist. We'll walk through the features most relevant to your team.",
  formHeading: 'Book a Demo',
  benefitsSectionTitle: "What you'll get from the demo",
  successHeading: "You're booked!",
  successBody: 'Thanks for requesting a demo. A Desk365 specialist will reach out within one business day to confirm your slot.',
  successCtaLabel: 'Start Free Trial in the meantime',
  successCtaHref: 'https://app.desk365.io/register',
  formConfig: {
    firstNameLabel: 'First Name',
    lastNameLabel: 'Last Name',
    workEmailLabel: 'Work Email',
    companyLabel: 'Company Name',
    teamSizeLabel: 'Team Size',
    currentHelpdeskLabel: 'Current Helpdesk',
    messageLabel: 'What would you like to see?',
    firstNamePlaceholder: 'Jane',
    lastNamePlaceholder: 'Smith',
    workEmailPlaceholder: 'jane@company.com',
    companyPlaceholder: 'Acme Corp',
    messagePlaceholder: 'e.g. Microsoft Teams integration, AI agent, asset management...',
    submitLabel: 'Request Your Demo',
    privacyText: 'By submitting, you agree to our Privacy Policy. We never share your data.',
    privacyPolicyLabel: 'Privacy Policy',
    privacyPolicyHref: '/privacy-policy/',
    teamSizeOptions: ['1–5 agents', '6–20 agents', '21–50 agents', '51–200 agents', '200+ agents'],
    currentHelpdeskOptions: ['Zendesk', 'Freshdesk', 'Zoho Desk', 'Jira Service Management', 'ServiceNow', 'Email only', 'None', 'Other'],
  },
  benefits: [
    'Live walkthrough of all features tailored to your use case',
    'See Microsoft Teams integration in action',
    'AI Agent demo — watch it resolve tickets autonomously',
    'Q&A with a Desk365 product specialist',
    "Migration assistance planning if you're switching from another tool",
    'Custom pricing for teams of 20+ agents',
  ],
  testimonials: [
    { _key: k(), _type: 'testimonial', quote: 'The demo convinced us in 30 minutes. We were on Freshdesk paying 4x more for half the features.',                               name: 'Sarah T.',  title: 'Head of Support', company: 'TechCorp Inc.' },
    { _key: k(), _type: 'testimonial', quote: 'Seeing the Teams integration live was the deciding factor. Our team lives in Teams — now our helpdesk does too.',                name: 'David K.',  title: 'IT Manager',      company: 'Financial Services Co.' },
  ],
  trustBadges: [
    { _key: k(), _type: 'trustBadge', label: 'SOC 2 Type II' },
    { _key: k(), _type: 'trustBadge', label: 'GDPR Compliant' },
    { _key: k(), _type: 'trustBadge', label: 'HIPAA (Premium)' },
  ],
  seo: {
    metaTitle: 'Book a Demo — Desk365 | AI-Powered Helpdesk Software',
    metaDescription: 'See Desk365 in action. Book a personalized 30-minute demo with a product specialist and discover how to simplify your support operations.',
  },
};

// ─── 6. Homepage ─────────────────────────────────────────────────────────────
const homepage = {
  _id: 'homepage',
  _type: 'homepage',
  pageBuilder: [
    // 1. Hero
    {
      _key: k(), _type: 'd365HeroSection',
      headlinePrefix: 'AI-powered helpdesk',
      headlineConnector: 'for',
      rotatingWords: ['customer service', 'IT admins', 'Microsoft Teams', 'MSPs', 'teams of all sizes'],
      subheadline: "One platform for both customer support and IT – tickets, assets, Microsoft Teams, and AI agents all in a single workspace. Built for teams who've outgrown basic ticketing but don't need the complexity of Zendesk or ServiceNow.",
      footnote: 'No credit card required.',
      primaryCta: { label: 'Start Your Free Trial', href: '/pricing/' },
    },
    // 2. Trust Bar (logos use component static fallback — upload images in Studio to override)
    {
      _key: k(), _type: 'd365TrustBarSection',
      heading: 'Trusted by 7,000+ businesses around the world',
    },
    // 3. Stats
    {
      _key: k(), _type: 'd365StatsSection',
      stats: [
        { _key: k(), number: '7,000+',  label: 'Businesses worldwide' },
        { _key: k(), number: '65+',     label: 'Countries served' },
        { _key: k(), number: '4.9',     label: 'Rating on G2' },
        { _key: k(), number: '21 Days', label: 'Free trial, no card needed' },
      ],
    },
    // 4. Feature Cards (card images use static fallback — upload images in Studio to override)
    {
      _key: k(), _type: 'd365FeatureCardsSection',
      headingGradient: 'Ticketing + AI',
      headingPlain: 'The only platform your agents need.',
      body: "Desk365 brings everything support and IT teams need into one reliable platform so you can move faster without juggling tools.",
    },
    // 5. Channel Tabs (tab images use static fallback)
    {
      _key: k(), _type: 'd365ChannelTabsSection',
      heading: 'Meet your customers where they already are',
      body: 'From Microsoft Teams to email to a branded support portal – every channel feeds into one unified inbox. No channel-switching, no missed tickets.',
    },
    // 6. AI Features (card images use static fallback)
    {
      _key: k(), _type: 'd365AIFeaturesSection',
      heading: 'Less busywork. More human support.',
      body: "Desk365's AI is different. It works in the background to reduce workload and stand-in to automate repetitive tasks so agents can do what they do best – be human.",
    },
    // 7. Microsoft (card icons and hero image use static fallback)
    {
      _key: k(), _type: 'd365MicrosoftSection',
      heading: "We're committed to your Microsoft investment",
      body: "Desk365 doesn't just plug into Teams – it's built to live inside the Microsoft ecosystem. From SSO to Entra ID Sync, you can do it all within Desk365 out-of-the-box.",
      linkLabel: 'Explore Teams integration',
      linkHref: '/microsoft-teams-ticketing-system/',
    },
    // 8. ITSM (card images use static fallback)
    {
      _key: k(), _type: 'd365ITSMSection',
      heading: 'Helpdesk + ITSM. Finally in one place.',
      body: "Most teams juggle separate tools for customer support and internal IT operations. Desk365 brings both together, so your agents get one inbox, one workspace, and one view of every request across the business.",
    },
    // 9. Capabilities
    {
      _key: k(), _type: 'd365CapabilitiesSection',
      heading: "Everything you'd expect. Plus what others charge extra for.",
      body: 'Every feature your support and IT teams need — in one plan, at one price.',
      ctaLabel: 'Explore all features',
      ctaHref: '/features/',
      capabilities: [
        { _key: k(), title: 'Unified Inbox',           description: 'Every ticket from every channel in one shared inbox. Filter, assign, and collaborate without switching tabs.',                                                                                    icon: 'inbox'    },
        { _key: k(), title: 'SLAs',                    description: 'Define SLAs by ticket type, priority, or customer segment. Get alerts before breaches happen, not after.',                                                                                       icon: 'clock'    },
        { _key: k(), title: 'Knowledge Base',          description: 'Publish solution articles internally or publicly. AI Copilot can generate drafts from resolved tickets automatically.',                                                                           icon: 'book'     },
        { _key: k(), title: 'Ticket Notifications',    description: 'Get notified on Teams and email about tickets you should not miss. Alert agents instantly for every ticketing action via push notifications.',                                                    icon: 'bell'     },
        { _key: k(), title: 'Canned Responses',        description: 'Agents can create a library of canned responses to make it easy to respond to routine requests quickly.',                                                                                        icon: 'chat'     },
        { _key: k(), title: 'Automations',             description: 'Trigger automations on ticket creation, updates, or time-based events. Route tickets and update fields without manual effort.',                                                                   icon: 'bolt'     },
        { _key: k(), title: 'Round Robin Assignment',  description: 'Distribute tickets across agents automatically. Balance workloads and keep response times consistent.',                                                                                           icon: 'users'    },
        { _key: k(), title: 'Reports and Analytics',   description: 'Track resolution times, agent performance, ticket volume, and SLA compliance. Power BI integration for deeper analysis.',                                                                        icon: 'chart'    },
        { _key: k(), title: 'Multi-Department Access', description: 'Configure departments as distinct groups with separate queues, email addresses, and permission levels – all from one account.',                                                                   icon: 'building' },
      ],
    },
    // 10. Comparison
    {
      _key: k(), _type: 'd365ComparisonSection',
      heading: 'The cleaner alternative to Freshdesk & Zendesk',
      ctaLabel: 'Start Your Free Trial',
      ctaHref: '/pricing/',
      col2Label: 'Freshdesk',
      col3Label: 'Zendesk',
      rows: [
        { _key: k(), feature: 'Omni-channel ticketing',             desk365: 'true', col2: 'true',              col3: 'true'              },
        { _key: k(), feature: 'Microsoft Teams native integration', desk365: 'true', col2: 'Add-on',            col3: '3rd party only'    },
        { _key: k(), feature: 'AI Agent (no-code)',                 desk365: 'true', col2: 'Higher plans only', col3: 'Add-on, costly'    },
        { _key: k(), feature: 'AI Copilot for agents',             desk365: 'true', col2: 'Add-on',            col3: 'Add-on'            },
        { _key: k(), feature: 'IT Asset Management',               desk365: 'true', col2: 'Separate product',  col3: 'false'             },
        { _key: k(), feature: 'Change Management',                 desk365: 'true', col2: 'Separate product',  col3: 'false'             },
        { _key: k(), feature: 'Knowledge Base',                    desk365: 'true', col2: 'true',              col3: 'true'              },
        { _key: k(), feature: 'SLA Management',                    desk365: 'true', col2: 'true',              col3: 'Higher plans only' },
        { _key: k(), feature: 'Power Automate Connector',          desk365: 'true', col2: 'false',             col3: 'false'             },
        { _key: k(), feature: 'Microsoft Entra SSO',               desk365: 'true', col2: 'Add-on',            col3: 'Add-on'            },
        { _key: k(), feature: 'Round Robin Assignment',            desk365: 'true', col2: 'true',              col3: 'true'              },
        { _key: k(), feature: 'Transparent pricing',               desk365: 'true', col2: 'false',             col3: 'false'             },
      ],
    },
    // 11. Integrations (card icons use static fallback)
    {
      _key: k(), _type: 'd365IntegrationsSection',
      heading: 'Plugs in to your current tech stack',
      body: 'Desk365 integrates seamlessly with Microsoft Teams or any other tools you already use. A helpdesk so extensive, it works to enhance collaboration and streamlines your existing workflow.',
    },
    // 12. Testimonials
    {
      _key: k(), _type: 'd365TestimonialsSection',
      heading: "Don't just take our word for it",
      subtext: 'See why our customers choose us. Hear from real people who have experienced the difference.',
      testimonials: [
        { _key: k(), quote: "Desk365 has got all the right ingredients that a Helpdesk solution needs under its belt.",       name: 'Jugal Piplani',   title: 'Technical Solutions Manager',          company: 'Gapcloud',                         rating: 5, reviewPlatform: 'G2'       },
        { _key: k(), quote: "Highly Recommend. The onboarding was smooth and the support team was incredibly helpful throughout.", name: 'Jessica Harrison', title: 'Sr. Associate',                   company: 'Christopher Consultants, Ltd.',     rating: 5, reviewPlatform: 'G2'       },
        { _key: k(), quote: "They really make you feel they are part of your team. The response times are incredible.",        name: 'Jeroen H',        title: 'Scientist Sensortechnologies',         company: 'Biotechnology',                    rating: 5, reviewPlatform: 'G2'       },
        { _key: k(), quote: "A very good system all round. Simple to use, powerful features, and great value for money.",       name: 'Andy Roberts',    title: 'Network & Communications Support Specialist', company: 'CSG',                rating: 5, reviewPlatform: 'G2'       },
        { _key: k(), quote: "Truly an outstanding product with a knowledgeable, prompt and courteous staff.",                  name: 'Ryan Geiler',     title: 'IT Director',                         company: 'Community Medical Center',         rating: 5, reviewPlatform: 'G2'       },
        { _key: k(), quote: "The Helpdesk system everyone should know about. Desk365 has everything you need and more.",       name: 'Mirko B',         title: 'System & Network Administrator',       company: 'Oil and Energy',                   rating: 5, reviewPlatform: 'Capterra'  },
        { _key: k(), quote: "Desk365 has plenty of features which we love to use. The Microsoft Teams integration is a game-changer.", name: 'Jan Schwärzel', title: 'CTO',                          company: 'ComSet AG',                        rating: 5, reviewPlatform: 'G2'       },
        { _key: k(), quote: "Teams integration is fantastic! Our staff love being able to submit and track tickets right from Teams.", name: 'Lonny L',   title: 'IT Manager',                         company: 'Farming',                          rating: 5, reviewPlatform: 'G2'       },
      ],
    },
    // 13. Why Choose
    {
      _key: k(), _type: 'd365WhyChooseSection',
      heading: 'Why choose Desk365?',
      body: "Customers who choose Desk365 feel the difference. Built for and by customers, every feature, every detail is crafted so our users' lives are simplified.",
      awardText: 'Highly rated on G2 and Capterra. Trusted by industry reviewers worldwide.',
      ctaLabel: 'Start Your Free Trial',
      ctaHref: '/pricing/',
      cards: [
        { _key: k(), title: 'Set up in minutes',            description: 'Migrate, onboard, and get started with your new helpdesk almost instantly.',                                                                                 icon: 'lightning' },
        { _key: k(), title: 'Easy to use',                  description: 'Intuitive software your teams can pick-up in no-time. Ensure a smooth experience for both your agents and your customers.',                                   icon: 'thumb'     },
        { _key: k(), title: 'Support that goes the extra mile', description: 'Have questions? Need help? Desk365 is committed to real human support and providing true resolution.',                                                    icon: 'chat'      },
        { _key: k(), title: 'Highest ROI and product value', description: 'Reduce costs and increase agent productivity from day 1 so your business sustains growth.',                                                                  icon: 'dollar'    },
      ],
    },
    // 14. Security (badge image uses static fallback)
    {
      _key: k(), _type: 'd365SecuritySection',
      heading: 'Security, Safety and Compliance',
      bullets: [
        'At Desk365, ensuring the security of your data is our top priority. We adhere to stringent security policies and controls that meet leading industry standards.',
        'To cater to our customers, we operate data centers in both the US and EU, specifically offering EU-based centers for those in the European Union.',
        'We are SOC 2 Type 2 Certified and GDPR compliant.',
      ],
    },
    // 15. Blog (post images use static fallback)
    {
      _key: k(), _type: 'd365BlogSection',
      heading: 'Featured blog posts',
      ctaLabel: 'Read more',
      ctaHref: '/blog/',
    },
    // 16. Final CTA (logo image uses static fallback)
    {
      _key: k(), _type: 'd365FinalCtaSection',
      heading: 'Empower your teams with the best helpdesk platform',
      body: 'Choose from our high-value plans that are inclusive of all the features your business needs. No credit card needed.',
      primaryCta: { label: 'Start Your Free Trial', href: '/pricing/' },
      secondaryCta: { label: 'Request Demo', href: '/request-demo/' },
      footnote: '21-day free trial · No credit card required',
    },
  ],
  seo: {
    metaTitle: 'Desk365 — AI-Powered Helpdesk for Teams of All Sizes',
    metaDescription: "One platform for both customer support and IT – tickets, assets, Microsoft Teams, and AI agents all in a single workspace. Built for teams who've outgrown basic ticketing but don't need the complexity of Zendesk or ServiceNow.",
  },
};

// ── Seed runner ───────────────────────────────────────────────────────────────

const documents = [
  { doc: homepage,        label: 'Homepage         (/)' },
  { doc: pricingPage,     label: 'Pricing Page     (/pricing)' },
  { doc: featuresPage,    label: 'Features Page    (/features)' },
  { doc: aboutPage,       label: 'About Page       (/about-us)' },
  { doc: contactPage,     label: 'Contact Page     (/contact)' },
  { doc: requestDemoPage, label: 'Request Demo Page (/request-demo)' },
];

async function run() {
  console.log(`\n🌱  Seeding ${documents.length} pages → ${projectId}/${dataset}\n`);

  for (const { doc, label } of documents) {
    try {
      // Write published document
      await client.createOrReplace(doc as any);
      // Delete any stale draft so Studio always shows the seeded content
      await client.delete(`drafts.${doc._id}`).catch(() => { /* no draft to delete */ });
      console.log(`  ✅  ${label}`);
    } catch (err: any) {
      console.error(`  ❌  ${label}\n     ${err.message}`);
    }
  }

  console.log('\n✨  Done.\n');
  console.log('   Next steps:');
  console.log('   1. Hard-refresh Sanity Studio (Ctrl+Shift+R / Cmd+Shift+R)');
  console.log('   2. Open Studio → "Homepage" — you should see 16 sections in Page Builder');
  console.log('   3. Hard-refresh http://localhost:4321 in your browser');
  console.log('   4. For visual editing: open the Presentation (Preview) tool in Studio\n');
}

run().catch(err => { console.error(err); process.exit(1); });
