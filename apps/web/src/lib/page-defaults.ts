/**
 * page-defaults.ts
 *
 * Single source of truth for all page content defaults.
 *
 * HOW THIS WORKS:
 * 1. This file defines the authoritative default content for every page.
 * 2. The seed script (apps/studio/scripts/seed-all-pages.ts) reads and copies
 *    this content into Sanity on first run.
 * 3. Astro pages import these as FALLBACKS — shown only when Sanity hasn't been
 *    seeded yet or Sanity is unreachable.
 * 4. Once seeded, all content comes from Sanity and becomes visually editable.
 *
 * TO ADD NEW CONTENT:
 * 1. Add the field to the Sanity schema (apps/studio/schemas/documents/<type>.ts)
 * 2. Add the default value here in the correct page section
 * 3. Add it to the GROQ query (apps/web/src/lib/queries.ts)
 * 4. Render it in the Astro page
 * 5. Run: cd apps/studio && npm run seed:all
 *
 * TO ADD A NEW PAGE:
 * Option A (content pages): Create a `page` document in Sanity — auto-rendered
 *           by [...slug].astro with full visual editing support.
 * Option B (dedicated pages): Add schema, add page here, add Astro page,
 *           update seed script, run seed:all.
 */

// ── Pricing Page ──────────────────────────────────────────────────────────────

export const PRICING_DEFAULTS = {
  heroEyebrow: 'Pricing',
  heroHeading: 'Pricing built for teams of all sizes',
  heroSubheading:
    'Powerful helpdesk software without the enterprise price tag.\nTry every feature free for 21 days — no credit card required.',
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
  plansFootnote: 'All plans include a 21-day free trial. No credit card required. Need volume discounts?',
  plansFootnoteContactLabel: 'Contact us',
  plansFootnoteContactHref: '/contact/',
  comparisonEyebrow: 'Value Comparison',
  comparisonHeading: 'Save up to 80% vs. competitors',
  comparisonSubheading: 'Monthly cost for 10 agents on comparable plans (billed annually).',
  comparisonFootnote: '* Prices shown are indicative based on publicly available plans as of 2026.',
  featureTableEyebrow: 'Full Comparison',
  featureTableHeading: 'Everything included across all plans',
  aiAddonEyebrow: 'AI Agent Add-on',
  aiAddonBullets: [
    'Multi-agent creation with custom personas',
    'Contextual resolution from your knowledge base',
    'Autonomous escalation to human agents',
    'Usage-based: $50 / 1,000 credits',
  ],
  aiAddonCtaLabel: 'Learn about AI Agent',
  aiAddonCtaHref: '/features/ai-agent/',
  aiAddonCardGradient: 'linear-gradient(135deg, var(--d365-blue) 0%, #7b1fa2 100%)',
  aiAddonCardSmallBg: '#1a1a2e',
  aiAddonStats: [
    { stat: '85%', label: 'tickets auto-resolved' },
    { stat: '$50', label: 'per 1,000 credits' },
  ],
  trustBarLabel: 'Trusted by 7,000+ businesses across 65+ countries',
  trustBarCustomers: [
    'CBRE Group', 'LAPD', 'Panasonic', 'BBC',
    'Yamaha', 'Konica Minolta', 'Standard Bank', 'University of Kentucky',
  ],
  trustBarStats: [
    { number: '4.9', label: 'Rating on G2' },
    { number: '7,000+', label: 'Businesses' },
    { number: '65+', label: 'Countries' },
    { number: '21-day', label: 'Free trial' },
  ],
  faqEyebrow: 'FAQ',
  faqHeading: 'Frequently asked questions',
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
    metaDescription:
      'Simple, transparent pricing. Start free, scale as you grow. Desk365 plans start at $12/agent/month. 21-day free trial, no credit card required.',
  },
};

export const DEFAULT_PLANS = [
  {
    id: 'free',
    name: 'FREE',
    tagline: 'For solopreneurs & personal projects',
    monthlyPrice: 0,
    yearlyPrice: 0,
    ctaLabel: 'Get Started Free',
    ctaHref: 'https://app.desk365.io/register',
    ctaStyle: 'outline',
    highlight: false,
    badge: null as string | null,
    features: [
      'Up to 50 tickets/month',
      '1 agent seat',
      'Email ticketing',
      'Web form',
      'Knowledge base (5 articles)',
      'Standard support',
    ],
  },
  {
    id: 'standard',
    name: 'STANDARD',
    tagline: 'Core helpdesk for growing teams',
    monthlyPrice: 16,
    yearlyPrice: 12,
    ctaLabel: 'Start Free Trial',
    ctaHref: '/pricing/#start',
    ctaStyle: 'outline-blue',
    highlight: false,
    badge: null as string | null,
    features: [
      'Unlimited tickets',
      'Email, Teams & web form channels',
      'Basic automations & SLA management',
      'Knowledge base (unlimited articles)',
      '200 GB file storage',
      'Standard reports',
      'MFA security',
      '21-day free trial',
    ],
  },
  {
    id: 'plus',
    name: 'PLUS',
    tagline: 'Advanced tools for scaling support',
    monthlyPrice: 28,
    yearlyPrice: 22,
    ctaLabel: 'Start Free Trial',
    ctaHref: '/pricing/#start',
    ctaStyle: 'green-solid',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Everything in Standard',
      'Round-robin & load-based assignment',
      'Time-based automations',
      'Ticket watchers & sharing',
      'CSAT surveys',
      'Multiple dashboards',
      '500 GB file storage',
      'AI draft replies (100 credits/mo)',
    ],
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    tagline: 'Enterprise-grade compliance & AI',
    monthlyPrice: 40,
    yearlyPrice: 32,
    ctaLabel: 'Start Free Trial',
    ctaHref: '/pricing/#start',
    ctaStyle: 'blue-solid',
    highlight: false,
    badge: null as string | null,
    features: [
      'Everything in Plus',
      'Asset & software lifecycle management',
      'HIPAA compliance & encrypted fields',
      'PII / PHI data redaction',
      'Scheduled ticket creation',
      'Contact management customization',
      '1 TB file storage',
      'AI draft replies (200 credits/mo)',
    ],
  },
];

export const DEFAULT_COMPETITORS = [
  { name: 'Desk365', price: 220, highlight: true },
  { name: 'Zoho Desk', price: 230, highlight: false },
  { name: 'Freshdesk', price: 590, highlight: false },
  { name: 'Zendesk', price: 1150, highlight: false },
];

export const DEFAULT_AI_CREDIT_CARDS = [
  { planName: 'Plus', credits: '100 free credits/mo' },
  { planName: 'Premium', credits: '200 free credits/mo' },
];

export const DEFAULT_FAQS = [
  {
    question: 'Why is Desk365 priced so competitively?',
    answer:
      "We're a product-focused company that invests in engineering efficiency over large sales teams. This lets us pass the savings on to customers without sacrificing quality — you get enterprise features at a fraction of the cost of Zendesk or Freshdesk.",
  },
  {
    question: 'What happens after the 21-day free trial?',
    answer:
      'After your trial you automatically move to the Free plan (up to 50 tickets/month). You can upgrade to Standard, Plus, or Premium at any time from your dashboard — no credit card required to start the trial.',
  },
  {
    question: 'Can I switch between monthly and yearly billing?',
    answer:
      'Yes. You can switch at any time from your account settings. Switching to yearly gives you a 25% discount. If you switch mid-cycle, we prorate the difference.',
  },
  {
    question: 'What is an "agent"?',
    answer:
      'An agent is any team member who logs in to respond to tickets. End-users (customers submitting tickets) are never counted as agents and are unlimited across all plans.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, Amex, Discover) as well as ACH bank transfer and wire transfer for annual invoices. All payments are processed securely through Stripe.',
  },
  {
    question: 'Is migration assistance included?',
    answer:
      'Yes — we provide free migration assistance to help you move tickets, contacts, and settings from your existing helpdesk. Our team works with you directly to ensure a smooth transition.',
  },
  {
    question: 'Are there discounts for nonprofits or startups?',
    answer:
      'Yes. We offer special pricing for nonprofits and qualified startups. Contact our sales team at sales@desk365.io to learn more.',
  },
  {
    question: 'How does the AI Agent add-on work?',
    answer:
      'The AI Agent is a usage-based add-on at $50 per 1,000 credits. Plus plans include 100 free credits/month and Premium includes 200. One credit is consumed per AI-resolved ticket interaction.',
  },
];

// Feature comparison table — display-only, intentionally not in Sanity
// (complex tabular structure; edit directly in this file when needed)
export const FEATURE_ROWS: {
  category: string;
  items: { feature: string; free: boolean | string; standard: boolean | string; plus: boolean | string; premium: boolean | string }[];
}[] = [
  {
    category: 'Ticketing & Channels',
    items: [
      { feature: 'Email ticketing', free: true, standard: true, plus: true, premium: true },
      { feature: 'Microsoft Teams ticketing', free: false, standard: true, plus: true, premium: true },
      { feature: 'Web portal / self-service', free: true, standard: true, plus: true, premium: true },
      { feature: 'Web form & widget', free: true, standard: true, plus: true, premium: true },
      { feature: 'Unlimited tickets', free: '50/mo', standard: true, plus: true, premium: true },
    ],
  },
  {
    category: 'Automation & SLA',
    items: [
      { feature: 'Workflow automations', free: false, standard: 'Basic', plus: 'Advanced', premium: 'Advanced' },
      { feature: 'Time-based automations', free: false, standard: false, plus: true, premium: true },
      { feature: 'SLA management', free: false, standard: true, plus: true, premium: true },
      { feature: 'SLA escalations & reminders', free: false, standard: true, plus: true, premium: true },
      { feature: 'Round-robin assignment', free: false, standard: false, plus: true, premium: true },
    ],
  },
  {
    category: 'Knowledge Base',
    items: [
      { feature: 'Knowledge base articles', free: '5 articles', standard: 'Unlimited', plus: 'Unlimited', premium: 'Unlimited' },
      { feature: 'Customer-facing portal', free: true, standard: true, plus: true, premium: true },
      { feature: 'Multi-brand knowledge base', free: false, standard: false, plus: true, premium: true },
      { feature: 'Article versioning', free: false, standard: false, plus: false, premium: true },
    ],
  },
  {
    category: 'Reports & Analytics',
    items: [
      { feature: 'Standard reports', free: false, standard: true, plus: true, premium: true },
      { feature: 'CSAT surveys', free: false, standard: false, plus: true, premium: true },
      { feature: 'Multiple dashboards', free: false, standard: false, plus: true, premium: true },
      { feature: 'Custom reports', free: false, standard: false, plus: false, premium: true },
    ],
  },
  {
    category: 'Security & Compliance',
    items: [
      { feature: 'Multi-factor authentication (MFA)', free: false, standard: true, plus: true, premium: true },
      { feature: 'HIPAA compliance', free: false, standard: false, plus: false, premium: true },
      { feature: 'Encrypted fields', free: false, standard: false, plus: false, premium: true },
      { feature: 'PII / PHI data redaction', free: false, standard: false, plus: false, premium: true },
      { feature: 'SOC 2 Type II & GDPR', free: true, standard: true, plus: true, premium: true },
    ],
  },
  {
    category: 'AI & Productivity',
    items: [
      { feature: 'AI draft replies', free: false, standard: false, plus: '100 credits/mo', premium: '200 credits/mo' },
      { feature: 'Canned responses', free: false, standard: true, plus: true, premium: true },
      { feature: 'Ticket watchers & sharing', free: false, standard: false, plus: true, premium: true },
      { feature: 'Scheduled ticket creation', free: false, standard: false, plus: false, premium: true },
    ],
  },
  {
    category: 'Asset Management',
    items: [
      { feature: 'Hardware asset tracking', free: false, standard: false, plus: false, premium: true },
      { feature: 'Software lifecycle management', free: false, standard: false, plus: false, premium: true },
      { feature: 'Vendor management', free: false, standard: false, plus: false, premium: true },
      { feature: 'Asset–ticket linking', free: false, standard: false, plus: false, premium: true },
    ],
  },
  {
    category: 'Storage',
    items: [
      { feature: 'File storage', free: '1 GB', standard: '200 GB', plus: '500 GB', premium: '1 TB' },
    ],
  },
];

// ── Features Page ─────────────────────────────────────────────────────────────

export const FEATURES_DEFAULTS = {
  heroEyebrow: 'All Features',
  heroHeading: 'Delight your customers at scale',
  heroSubheading:
    'Scale your support with a simple yet feature-packed helpdesk. Automate workflows, enable self-service, and give your team the tools they need to collaborate and resolve issues faster in a clean, intuitive interface that just works.',
  heroPrimaryCtaLabel: 'Start Your Free Trial',
  heroPrimaryCtaHref: 'https://app.desk365.io/register',
  heroSecondaryCtaLabel: 'Request Demo',
  heroSecondaryCtaHref: '/request-demo/',
  heroFootnote: 'No credit card required',
  learnMoreLabel: 'Learn more',
  finalCtaHeading: 'Ready to simplify your support?',
  finalCtaSubheading: 'Start your free 21-day trial. No credit card required.',
  finalCtaPrimaryLabel: 'Start Free Trial',
  finalCtaPrimaryHref: 'https://app.desk365.io/register',
  finalCtaSecondaryLabel: 'View Pricing',
  finalCtaSecondaryHref: '/pricing/',
  finalCtaGradientAccent: '#5e35b1',
  seo: {
    metaTitle: 'Features — Desk365 | Full Helpdesk Feature List',
    metaDescription:
      'Explore the full Desk365 feature set: AI agent, Microsoft Teams, ITSM, omnichannel ticketing, knowledge base, reports, and more.',
  },
};

export const DEFAULT_FEATURE_CATEGORIES = [
  {
    id: 'ai',
    label: 'Artificial Intelligence',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>`,
    features: [
      { name: 'AI Agent', href: '/features/ai-agent/', description: 'Deploy autonomous AI agents that resolve repetitive queries, search your knowledge base, and escalate only when truly needed — reducing ticket volume without extra headcount.', tags: ['Autonomous', 'Multi-agent', 'Knowledge integration'] },
      { name: 'AI Copilot', href: '/features/ai-agent/', description: 'Assist your human agents with intelligent reply drafting, instant ticket summarization, and real-time knowledge base suggestions — so every response is faster and more accurate.', tags: ['Draft replies', 'Summarization', 'Knowledge suggestions'] },
    ],
  },
  {
    id: 'itsm',
    label: 'IT Service Management',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/>`,
    features: [
      { name: 'Asset Management', href: '/features/asset-management/', description: 'Track hardware, software, and consumable assets across their full lifecycle. Link assets directly to tickets, users, and departments for full visibility and accountability.', tags: ['Hardware tracking', 'Software lifecycle', 'Depreciation'] },
      { name: 'Change & Approval Management', href: '/features/approval-management/', description: 'Automate sequential and non-sequential approval workflows for IT changes. Keep stakeholders informed at every step with automatic notifications and audit trails.', tags: ['Approval workflows', 'Change control', 'Audit trail'] },
    ],
  },
  {
    id: 'microsoft',
    label: 'Microsoft Integrations',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>`,
    features: [
      { name: 'Microsoft Teams Ticketing', href: '/microsoft-teams-ticketing-system/', description: 'Create, manage, and resolve support tickets directly inside Microsoft Teams — without switching tabs. Works as a native app your team already uses every day.', tags: ['Native Teams app', 'No tab switching', 'Real-time updates'] },
      { name: 'Microsoft Entra ID Sync', href: '/features/customization/', description: 'Automatically sync users, roles, and departments from Microsoft Entra ID (formerly Azure AD). Centralize identity management and reduce manual provisioning.', tags: ['Auto-sync', 'SSO', 'Role mapping'] },
    ],
  },
  {
    id: 'ticketing',
    label: 'Ticketing',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/>`,
    features: [
      { name: 'Unified Inbox', href: '/features/ticket-assignment/', description: 'Manage all incoming support requests from email, Teams, web form, and portal in a single, organized inbox — eliminating duplicate tickets and missed requests.', tags: ['Omnichannel', 'Deduplication', 'Priority queue'] },
      { name: 'Automations', href: '/features/automations/', description: 'Configure powerful macros and rules triggered on ticket creation, updates, or time conditions. Automate routing, escalation, tagging, and status changes without code.', tags: ['Workflow rules', 'Time-based triggers', 'Auto-routing'] },
      { name: 'SLA Management', href: '/features/slas/', description: 'Define service level agreements with response and resolution targets. Get automatic reminders, escalations, and infraction reports to keep your team accountable.', tags: ['SLA policies', 'Escalations', 'Breach reporting'] },
      { name: 'APIs, Webhooks & Connectors', href: '/features/customization/', description: 'Integrate Desk365 with your existing tools via a fully documented REST API, real-time webhooks, and pre-built connectors for popular business apps.', tags: ['REST API', 'Webhooks', 'Third-party connectors'] },
    ],
  },
  {
    id: 'omnichannel',
    label: 'Omnichannel',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>`,
    features: [
      { name: 'Email Ticketing', href: '/features/ticket-assignment/', description: 'Every email to your support address is automatically converted to a tracked ticket — with threading, attachments, and full history.', tags: ['Auto-convert', 'Threading', 'Attachment support'] },
      { name: 'Microsoft Teams', href: '/microsoft-teams-ticketing-system/', description: 'Let employees submit and track tickets without leaving Microsoft Teams using a native bot and app interface.', tags: ['Native bot', 'Teams channel', 'Real-time'] },
      { name: 'Web Portal', href: '/features/customization/', description: 'Give customers a branded self-service portal to submit tickets, track status, and browse your knowledge base — reducing inbound volume.', tags: ['Branded portal', 'Ticket tracking', 'Self-service'] },
      { name: 'Web Form & Widget', href: '/features/customization/', description: 'Embed a support form or floating widget on any website page. Customize fields, branding, and routing without code.', tags: ['Embeddable', 'Custom fields', 'No-code setup'] },
    ],
  },
  {
    id: 'self-service',
    label: 'Self-Service',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>`,
    features: [
      { name: 'Knowledge Base', href: '/features/knowledge-base/', description: 'Build a searchable knowledge base with unlimited articles, categories, and rich media. Empower customers to find answers before submitting tickets.', tags: ['WYSIWYG editor', 'Search', 'Rich media'] },
      { name: 'Internal Knowledge Base', href: '/features/knowledge-base/', description: 'Create agent-only training articles and internal guides visible only to your support team — keeping sensitive procedures private.', tags: ['Agent-only', 'Training docs', 'Restricted access'] },
      { name: 'Multi-brand Knowledge Base', href: '/features/knowledge-base/', description: 'Run separate knowledge base portals for different products, brands, or customer segments — each with its own branding and content.', tags: ['Multi-brand', 'Custom domains', 'Separate portals'] },
      { name: 'Article Versioning', href: '/features/knowledge-base/', description: 'Maintain a full version history of every article. Roll back to previous versions, review change logs, and keep content accurate over time.', tags: ['Version history', 'Rollback', 'Change log'] },
    ],
  },
  {
    id: 'productivity',
    label: 'Productivity',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>`,
    features: [
      { name: 'Ticket Assignment', href: '/features/ticket-assignment/', description: 'Auto-assign incoming tickets using round-robin, load-based, or skill-based routing rules — ensuring balanced workloads and faster response times.', tags: ['Round-robin', 'Load-based', 'Skill-based'] },
      { name: 'Canned Responses', href: '/features/automations/', description: "Save and reuse frequently-sent replies with dynamic placeholders. Let agents respond to common questions in seconds instead of minutes.", tags: ['Saved replies', 'Placeholders', 'Quick insert'] },
      { name: 'Multilingual Support', href: '/features/customization/', description: "Support customers in 30+ languages. Desk365 auto-detects the customer's language and routes to the right agent or knowledge base.", tags: ['30+ languages', 'Auto-detect', 'Localized portal'] },
      { name: 'Custom Views', href: '/features/ticket-assignment/', description: 'Create personalized ticket queues with custom filters and columns. Every agent sees the tickets most relevant to their role.', tags: ['Saved filters', 'Custom columns', 'Personal queues'] },
    ],
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>`,
    features: [
      { name: 'Productivity Reports', href: '/features/reports/', description: 'Track agent performance, ticket volumes, response times, and resolution rates with pre-built productivity reports. Identify bottlenecks before they escalate.', tags: ['Agent performance', 'Volume trends', 'Resolution rates'] },
      { name: 'CSAT Surveys', href: '/features/reports/', description: 'Automatically send satisfaction surveys after ticket resolution. Collect ratings and feedback to measure customer happiness and identify improvement areas.', tags: ['Auto-send', 'Star ratings', 'Feedback collection'] },
      { name: 'Custom Reports & Dashboards', href: '/features/reports/', description: 'Build custom reports and dashboards tailored to your KPIs. Export data as CSV for deeper analysis in your BI tools.', tags: ['Custom KPIs', 'Export CSV', 'Multiple dashboards'] },
    ],
  },
  {
    id: 'customization',
    label: 'Customization',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/>`,
    features: [
      { name: 'Custom Fields & Forms', href: '/features/customization/', description: 'Add custom fields to tickets, contacts, and assets. Build intake forms tailored to your workflows — capturing exactly the data you need from the start.', tags: ['Custom fields', 'Form builder', 'Conditional logic'] },
      { name: 'Custom Roles & Permissions', href: '/features/customization/', description: 'Define granular access levels with custom roles. Control what each agent can see, create, modify, or delete.', tags: ['Role-based access', 'Granular permissions', 'Agent hierarchy'] },
      { name: 'White-label & Custom Domain', href: '/features/customization/', description: "Brand your helpdesk portal with your logo, colors, and custom domain. Customers see your brand — not ours.", tags: ['Custom domain', 'Logo & colors', 'White-label'] },
      { name: 'Email Templates', href: '/features/customization/', description: 'Customize every transactional email your customers and agents receive — from ticket confirmations to escalation alerts.', tags: ['HTML templates', 'Dynamic variables', 'Branding'] },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>`,
    features: [
      { name: 'Multi-Factor Authentication', href: '/features/security/', description: 'Require MFA for all agent logins. Supports TOTP authenticator apps and SMS-based verification to protect your helpdesk from unauthorized access.', tags: ['TOTP', 'SMS verification', 'Enforced for all agents'] },
      { name: 'HIPAA Compliance', href: '/features/security/', description: 'Premium plan includes HIPAA-compliant data handling — encrypted fields, Business Associate Agreement (BAA), and audit logs for healthcare organizations.', tags: ['BAA available', 'Encrypted fields', 'Healthcare-ready'] },
      { name: 'PII / PHI Data Redaction', href: '/features/security/', description: 'Automatically detect and redact personally identifiable information from ticket bodies and attachments before storage — reducing compliance risk.', tags: ['Auto-redaction', 'PII detection', 'GDPR / CCPA'] },
      { name: 'SOC 2 Type II & GDPR', href: '/features/security/', description: 'Desk365 is SOC 2 Type II certified and fully GDPR-compliant. Data centers available in the US and EU for data residency requirements.', tags: ['SOC 2 Type II', 'GDPR', 'US & EU data centers'] },
    ],
  },
];

// ── About Page ────────────────────────────────────────────────────────────────

export const ABOUT_DEFAULTS = {
  heroEyebrow: 'About Us',
  heroHeading: 'Building the helpdesk for the modern era',
  heroSubheading:
    "Desk365 was founded on a simple belief: powerful helpdesk software shouldn't require a six-figure contract. We built the platform we wished existed — enterprise-grade features at a price that works for teams of every size.",
  heroBgGradient: 'linear-gradient(135deg, #1a237e 0%, #3f51b5 50%, #5e35b1 100%)',
  missionEyebrow: 'Our Mission',
  missionHeading: 'Our mission',
  missionBody1:
    "Desk365 was built for the team leader who needed better tools but couldn't justify the price of Zendesk or Freshdesk. We took everything modern support teams need — omnichannel ticketing, AI-powered automation, ITSM, knowledge base — and packaged it at a price point anyone can afford.",
  missionBody2:
    'Our engineering team ships meaningful updates every two weeks, guided by the same customers who use Desk365 to run their support operations every day. When you submit feedback, there\'s a good chance it\'s in the next release.',
  valuesEyebrow: 'Our Values',
  valuesHeading: 'How we build and operate',
  timelineEyebrow: 'Our Journey',
  timelineHeading: 'From zero to 7,000+ businesses',
  finalCtaHeading: 'Join 7,000+ businesses on Desk365',
  finalCtaSubheading: 'Start your free 21-day trial. No credit card required.',
  finalCtaPrimaryLabel: 'Start Free Trial',
  finalCtaPrimaryHref: 'https://app.desk365.io/register',
  finalCtaSecondaryLabel: 'Book a Demo',
  finalCtaSecondaryHref: '/request-demo/',
  finalCtaGradientAccent: '#5e35b1',
  seo: {
    metaTitle: 'About Us — Desk365 | Building the Helpdesk for the Modern Era',
    metaDescription:
      'Desk365 was founded to make powerful helpdesk software accessible to every team — not just enterprise. Learn about our mission, values, and story.',
  },
};

export const DEFAULT_MISSION_STATS = [
  { stat: '85%', label: 'tickets resolved with AI', colorKey: 'blue' },
  { stat: '<2s', label: 'average response time', colorKey: 'green' },
  { stat: '99.9%', label: 'uptime SLA', colorKey: 'dark' },
];

export const DEFAULT_STATS = [
  { number: '7,000+', label: 'Businesses worldwide' },
  { number: '65+', label: 'Countries served' },
  { number: '4.9', label: 'G2 rating' },
  { number: '2019', label: 'Founded' },
];

export const DEFAULT_VALUES = [
  {
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>`,
    title: 'Simplicity First',
    description: 'We believe powerful software should be simple to use. Every feature is designed to reduce friction, not add to it.',
  },
  {
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>`,
    title: 'Customer Obsessed',
    description: 'Our own product is our best showcase. Every release is driven by real feedback from the support teams who use Desk365 every day.',
  },
  {
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>`,
    title: 'Move Fast',
    description: "We ship meaningful updates every sprint. If you report a bug today, there's a good chance it's fixed before your next login.",
  },
  {
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>`,
    title: 'Transparent Pricing',
    description: 'No hidden fees, no surprise overages. What you see on the pricing page is exactly what you pay.',
  },
];

export const DEFAULT_MILESTONES = [
  { year: '2019', event: 'Desk365 founded by Kani Technologies in Coimbatore, India' },
  { year: '2020', event: 'Launched Microsoft Teams integration — a first for SMB helpdesk software' },
  { year: '2021', event: 'Reached 1,000 business customers across 30 countries' },
  { year: '2022', event: 'Achieved SOC 2 Type II certification and launched HIPAA-compliant tier' },
  { year: '2023', event: 'Launched full ITSM suite with Asset Management and Change Approvals' },
  { year: '2024', event: 'Surpassed 5,000 businesses. Launched AI Copilot for agents' },
  { year: '2025', event: 'Introduced autonomous AI Agent — resolving 85%+ of repetitive tickets' },
  { year: '2026', event: '7,000+ businesses in 65+ countries. 4.9 G2 rating' },
];

// ── Contact Page ──────────────────────────────────────────────────────────────

export const CONTACT_DEFAULTS = {
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
  officesEyebrow: 'Our Offices',
  officesHeading: 'Where we are',
  resourcesEyebrow: 'Resources',
  resourcesHeading: 'Find answers on your own',
  resourcesSubheading: 'Most questions are already answered in our help center and documentation.',
  finalCtaHeading: 'Ready to get started?',
  finalCtaSubheading: '21-day free trial. No credit card. Full Plus features from day one.',
  finalCtaPrimaryLabel: 'Start Free Trial',
  finalCtaPrimaryHref: 'https://app.desk365.io/register',
  finalCtaSecondaryLabel: 'Book a Demo',
  finalCtaSecondaryHref: '/request-demo/',
  finalCtaGradientAccent: '#5e35b1',
  seo: {
    metaTitle: 'Contact Us — Desk365',
    metaDescription:
      'Get in touch with the Desk365 team. Access our help center, reach out by email, or book a demo. We would love to hear from you!',
  },
};

export const DEFAULT_CONTACT_CARDS = [
  { title: 'Support', description: 'Technical issues, account help, or billing questions.', emailKey: 'support' },
  { title: 'General Inquiries', description: 'Feature requests, partnerships, and press inquiries.', emailKey: 'general' },
  { title: 'Careers', description: 'Interested in joining the Desk365 team?', emailKey: 'careers' },
];

export const DEFAULT_OFFICES = [
  { city: 'San Francisco', region: 'USA', flag: '🇺🇸', description: 'Bay Area headquarters serving North America.' },
  { city: 'Coimbatore', region: 'India', flag: '🇮🇳', description: 'Engineering and support operations center.' },
];

// Contact resources — display-only, intentionally not in Sanity (static links)
export const CONTACT_RESOURCES = [
  {
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/>`,
    title: 'Help Center', description: 'Troubleshooting advice, setup guides, and step-by-step articles for getting the most out of Desk365.', linkLabel: 'Visit Help Center', linkHref: 'https://support.desk365.io', external: true,
  },
  {
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/>`,
    title: 'Video Tutorials', description: 'Step-by-step video walkthroughs showing exactly how to configure and use Desk365 features.', linkLabel: 'Watch Videos', linkHref: '/videos/', external: false,
  },
  {
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>`,
    title: 'Blog', description: 'Insights, best practices, and the latest trends in customer service, IT support, and helpdesk software.', linkLabel: 'Read the Blog', linkHref: '/blog/', external: false,
  },
  {
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>`,
    title: 'API Documentation', description: 'Full REST API reference with code examples for integrating Desk365 with your existing tools and workflows.', linkLabel: 'View API Docs', linkHref: 'https://developer.desk365.io', external: true,
  },
  {
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"/>`,
    title: 'Partner Program', description: 'Become a Desk365 reseller or referral partner and earn commissions helping businesses modernize their helpdesk.', linkLabel: 'Join as Partner', linkHref: '/partners/', external: false,
  },
];

// ── Request Demo Page ─────────────────────────────────────────────────────────

export const DEMO_DEFAULTS = {
  heroHeading: 'See Desk365 in action',
  heroSubheading:
    "Schedule a personalized 30-minute demo with a Desk365 specialist. We'll walk through the features most relevant to your team.",
  formHeading: 'Book a Demo',
  formCtaLabel: 'Request Your Demo',
  benefitsSectionTitle: "What you'll get from the demo",
  successHeading: "You're booked!",
  successBody:
    'Thanks for requesting a demo. A Desk365 specialist will reach out within one business day to confirm your slot.',
  successCtaLabel: 'Start Free Trial in the meantime',
  successCtaHref: 'https://app.desk365.io/register',
  seo: {
    metaTitle: 'Book a Demo — Desk365 | AI-Powered Helpdesk Software',
    metaDescription:
      'See Desk365 in action. Book a personalized 30-minute demo with a product specialist and discover how to simplify your support operations.',
  },
};

export const DEMO_FORM_DEFAULTS = {
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
  currentHelpdeskOptions: [
    'Zendesk',
    'Freshdesk',
    'Zoho Desk',
    'Jira Service Management',
    'ServiceNow',
    'Email only',
    'None',
    'Other',
  ],
};

export const DEFAULT_TRUST_BADGES = [
  { label: 'SOC 2 Type II' },
  { label: 'GDPR Compliant' },
  { label: 'HIPAA (Premium)' },
];

export const DEFAULT_BENEFITS = [
  'Live walkthrough of all features tailored to your use case',
  'See Microsoft Teams integration in action',
  'AI Agent demo — watch it resolve tickets autonomously',
  'Q&A with a Desk365 product specialist',
  "Migration assistance planning if you're switching from another tool",
  'Custom pricing for teams of 20+ agents',
];

export const DEFAULT_TESTIMONIALS = [
  {
    quote: 'The demo convinced us in 30 minutes. We were on Freshdesk paying 4x more for half the features.',
    name: 'Sarah T.',
    title: 'Head of Support',
    company: 'TechCorp Inc.',
  },
  {
    quote: 'Seeing the Teams integration live was the deciding factor. Our team lives in Teams — now our helpdesk does too.',
    name: 'David K.',
    title: 'IT Manager',
    company: 'Financial Services Co.',
  },
];
