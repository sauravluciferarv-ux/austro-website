import type { Navigation } from './types';

export const DEFAULT_NAV: Navigation = {
  header: {
    logoAlt: 'Desk365.io',
    navLinks: [
      {
        label: 'Features',
        href: '/features/',
        dropdown: [
          {
            label: 'AI Agent',
            href: '/features/ai-agent/',
            description: 'Get quick, contextual responses',
            iconBg: 'bg-pink-50',
          },
          {
            label: 'Customization',
            href: '/features/customization/',
            description: 'Adapt workflows to your needs',
            iconBg: 'bg-blue-50',
          },
          {
            label: 'Asset Management',
            href: '/features/asset-management/',
            description: 'Manage hardware and software assets',
            iconBg: 'bg-blue-900',
          },
          {
            label: 'Ticket Assignment',
            href: '/features/ticket-assignment/',
            description: 'Auto-assign tickets to agents',
            iconBg: 'bg-violet-50',
          },
          {
            label: 'Automations',
            href: '/features/automations/',
            description: 'Automate repetitive tasks',
            iconBg: 'bg-sky-50',
          },
          {
            label: 'Reports & Analytics',
            href: '/features/reports/',
            description: 'In-depth reporting and tracking',
            iconBg: 'bg-indigo-50',
          },
          {
            label: 'SLAs',
            href: '/features/slas/',
            description: 'Set and track service timelines',
            iconBg: 'bg-cyan-50',
          },
          {
            label: 'Approval Management',
            href: '/features/approval-management/',
            description: 'Approvals made effortless',
            iconBg: 'bg-emerald-50',
          },
          {
            label: 'Knowledge Base',
            href: '/features/knowledge-base/',
            description: 'Centralize information sharing',
            iconBg: 'bg-sky-50',
          },
          {
            label: 'Helpdesk Security',
            href: '/features/security/',
            description: 'Stay secure and compliant',
            iconBg: 'bg-slate-100',
          },
        ],
      },
      {
        label: 'Solutions',
        href: '#',
        dropdown: [],
      },
      {
        label: 'Microsoft Teams',
        href: '/microsoft-teams-ticketing-system/',
      },
      {
        label: 'Pricing',
        href: '/pricing/',
      },
      {
        label: 'Resources',
        href: '#',
        dropdown: [
          {
            label: 'Help Center',
            href: 'https://support.desk365.io',
            description: 'Troubleshooting advice and user guides for configuring and utilizing Desk365 efficiently.',
            iconBg: 'bg-blue-50',
          },
          {
            label: 'Videos',
            href: '/videos/',
            description: 'Video tutorials and step-by-step demonstrations will show you exactly how to use Desk365.',
            iconBg: 'bg-red-50',
          },
          {
            label: 'Blog',
            href: '/blog/',
            description: 'Insights, tips, and stay up-to-date on the latest trends on customer service and more.',
            iconBg: 'bg-violet-50',
          },
          {
            label: 'Customer Stories',
            href: '/customer-stories/',
            description: 'Case studies on how customers use Desk365 to streamline support.',
            iconBg: 'bg-amber-50',
          },
          {
            label: 'Glossary',
            href: '/glossary/',
            description: 'Providing definitions of specific customer service terms to aid comprehension.',
            iconBg: 'bg-emerald-50',
          },
        ],
      },
    ],
    ctaLabel: 'Free Trial',
    ctaHref: '/pricing/',
    ctaStyle: 'primary',
    secondaryCtaLabel: 'Book a Demo',
    secondaryCtaHref: '/request-demo/',
  },

  footer: {
    logoAlt: 'Desk365',
    badgeImages: [
      {
        alt: 'G2',
        href: 'https://www.g2.com/products/desk365/reviews',
        label: 'Desk365 reviews on G2',
      },
    ],
    tagline: 'The simple yet powerful helpdesk for growing teams.',
    columns: [
      {
        heading: 'Features',
        links: [
          { label: 'AI Agent', href: '/features/ai-agent/' },
          { label: 'Asset Management', href: '/features/asset-management/' },
          { label: 'Automations', href: '/features/automations/' },
          { label: 'SLAs', href: '/features/slas/' },
          { label: 'Customization', href: '/features/customization/' },
          { label: 'Notifications', href: '/features/notifications/' },
          { label: 'Change Management', href: '/features/change-management/' },
          { label: 'Contact Management', href: '/features/contact-management/' },
          { label: 'Reports & Analytics', href: '/features/reports/' },
          { label: 'Knowledge Base', href: '/features/knowledge-base/' },
          { label: 'Email Ticketing', href: '/features/email-ticketing/' },
          { label: 'Helpdesk Security', href: '/features/security/' },
          { label: 'All Features', href: '/features/' },
        ],
      },
      {
        heading: 'Microsoft Teams',
        links: [
          { label: 'Teams Ticketing System', href: '/microsoft-teams-ticketing-system/' },
          { label: 'Agent Bot', href: '/microsoft-teams-ticketing-system/agent-bot/' },
          { label: 'Support Bot', href: '/microsoft-teams-ticketing-system/support-bot/' },
        ],
      },
      {
        heading: 'Alternatives',
        links: [
          { label: 'Zendesk Alternative', href: '/alternatives/zendesk/' },
          { label: 'Freshdesk Alternative', href: '/alternatives/freshdesk/' },
          { label: 'Zoho Desk Alternative', href: '/alternatives/zoho-desk/' },
          { label: 'ServiceNow Alternative', href: '/alternatives/servicenow/' },
          { label: 'Other Alternatives', href: '/alternatives/' },
        ],
      },
      {
        heading: 'For Industries',
        links: [
          { label: 'Banking & Finance', href: '/industries/banking-finance/' },
          { label: 'E-Commerce', href: '/industries/e-commerce/' },
          { label: 'Education', href: '/industries/education/' },
          { label: 'Government', href: '/industries/government/' },
          { label: 'Healthcare', href: '/industries/healthcare/' },
          { label: 'Insurance', href: '/industries/insurance/' },
          { label: 'Law Firms', href: '/industries/law-firms/' },
          { label: 'Manufacturing', href: '/industries/manufacturing/' },
          { label: 'MSP', href: '/industries/msp/' },
          { label: 'Non-Profit', href: '/industries/non-profit/' },
          { label: 'Real Estate', href: '/industries/real-estate/' },
          { label: 'SaaS', href: '/industries/saas/' },
          { label: 'Retail', href: '/industries/retail/' },
        ],
      },
      {
        heading: 'For Teams',
        links: [
          { label: 'IT Services', href: '/it-help-desk/' },
          { label: 'Customer Support', href: '/customer-support-ticketing/' },
          { label: 'Human Resources', href: '/hr-help-desk/' },
          { label: 'Facilities Management', href: '/facilities-management/' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'About', href: '/about/' },
          { label: 'Partner Program', href: '/partner-program/' },
          { label: 'Pricing', href: '/pricing/' },
          { label: 'Schedule Demo', href: '/request-demo/' },
          { label: 'Contact Us', href: '/contact/' },
        ],
      },
      {
        heading: 'Resources',
        links: [
          { label: 'Help Center', href: 'https://support.desk365.io', isExternal: true },
          { label: 'Videos', href: '/videos/' },
          { label: 'Blog', href: '/blog/' },
          { label: 'Customer Stories', href: '/customer-stories/' },
          { label: 'Glossary', href: '/glossary/' },
        ],
      },
    ],
    legalLinks: [
      { label: 'Privacy Policy', href: '/privacy-policy/' },
      { label: 'Terms of Service', href: '/terms-of-service/' },
      { label: 'Security', href: '/security/' },
      { label: 'Do Not Sell or Share My Personal Information', href: '/do-not-sell/' },
    ],
    copyrightText: '© 2026 Kani Technologies Inc. All rights reserved.',
    socialLinks: [
      { platform: 'linkedin', href: 'https://www.linkedin.com/company/desk365/' },
      { platform: 'youtube', href: 'https://www.youtube.com/@desk365' },
      { platform: 'twitter', href: 'https://twitter.com/desk365io' },
    ],
    languages: [
      { label: 'English', code: 'en', href: '/' },
      { label: 'Deutsch', code: 'de', href: '/de/' },
      { label: 'Español', code: 'es', href: '/es/' },
      { label: 'Português', code: 'pt', href: '/pt/' },
      { label: 'Español (América Latina)', code: 'es-latam', href: '/es-latam/' },
      { label: 'Português (Brasil)', code: 'pt-br', href: '/pt-br/' },
      { label: 'Français', code: 'fr', href: '/fr/' },
      { label: 'Italiano', code: 'it', href: '/it/' },
      { label: 'Nederlands', code: 'nl', href: '/nl/' },
      { label: 'Polski', code: 'pl', href: '/pl/' },
      { label: 'Svenska', code: 'sv', href: '/sv/' },
      { label: '日本語', code: 'jp', href: '/jp/' },
      { label: '한국어', code: 'ko', href: '/ko/' },
      { label: '中文', code: 'cn', href: '/cn/' },
    ],
  },
};
