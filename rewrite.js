const fs = require('fs');
const path = require('path');

const headerPath = path.join(__dirname, 'apps', 'web', 'src', 'components', 'global', 'Header.astro');
let content = fs.readFileSync(headerPath, 'utf8');

// The replacement desktop nav
const desktopNavStr = `<nav class="hidden lg:flex items-center gap-0 flex-1" aria-label="Main navigation">
        <!-- Features Mega Menu -->
        <div class="nav-dropdown">
          <button type="button"
            class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none"
            aria-expanded="false" aria-haspopup="true">
            Features
            <svg class="w-3.5 h-3.5 transition-transform duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="dropdown-panel left-0 w-[640px] p-5">
            <div class="grid grid-cols-2 gap-1 mb-4">
              {featuresCol1.map(item => {
                const fc = getFC(item.label);
                return (
                  <a href={item.href} class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group/fi">
                    <span class={\`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 \${fc.bg}\`}>
                      <svg class={\`w-4.5 h-4.5 \${fc.ic}\`} style="width:18px;height:18px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" set:html={featureIconPaths[item.label] ?? defaultPath}></svg>
                    </span>
                    <span>
                      <span class="block text-sm font-semibold text-gray-900 group-hover/fi:text-blue-600 transition-colors leading-tight">{item.label}</span>
                      {item.desc && <span class="block text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</span>}
                    </span>
                  </a>
                );
              })}
              {featuresCol2.map(item => {
                const fc = getFC(item.label);
                return (
                  <a href={item.href} class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group/fi">
                    <span class={\`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 \${fc.bg}\`}>
                      <svg class={\`w-4.5 h-4.5 \${fc.ic}\`} style="width:18px;height:18px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" set:html={featureIconPaths[item.label] ?? defaultPath}></svg>
                    </span>
                    <span>
                      <span class="block text-sm font-semibold text-gray-900 group-hover/fi:text-blue-600 transition-colors leading-tight">{item.label}</span>
                      {item.desc && <span class="block text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</span>}
                    </span>
                  </a>
                );
              })}
            </div>
            <div class="border-t border-gray-100 pt-3">
              <a href="/features/" class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider border border-[#7CB518] text-[#5A8000] hover:bg-[#7CB518] hover:text-white px-4 py-2 rounded-lg transition-colors">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/>
                </svg>
                Explore All Features
              </a>
            </div>
          </div>
        </div>

        <!-- Solutions Mega Menu -->
        <div class="nav-dropdown">
          <button type="button"
            class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none"
            aria-expanded="false" aria-haspopup="true">
            Solutions
            <svg class="w-3.5 h-3.5 transition-transform duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="dropdown-panel left-0 w-[680px] p-5">
            <div class="grid grid-cols-2 gap-0 divide-x divide-gray-100">
              <div class="pr-5">
                <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1 mb-3">Industries</p>
                <div class="space-y-0.5">
                  {industriesLinks.map(item => (
                    <a href={item.href} class="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 transition-colors group/si">
                      <span class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                        <svg class="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" set:html={solutionIconPaths[item.label] ?? defaultPath}></svg>
                      </span>
                      <span>
                        <span class="block text-sm font-semibold text-gray-900 group-hover/si:text-blue-600 transition-colors leading-tight">{item.label}</span>
                        <span class="block text-xs text-gray-500 mt-0.5">{item.desc}</span>
                      </span>
                    </a>
                  ))}
                </div>
                <a href="/industries/" class="inline-flex items-center gap-1 mt-3 px-2 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/>
                  </svg>
                  Explore All Industries
                </a>
              </div>
              <div class="pl-5">
                <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1 mb-3">Teams</p>
                <div class="space-y-0.5">
                  {teamsLinks.map(item => (
                    <a href={item.href} class="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 transition-colors group/st">
                      <span class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                        <svg class="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" set:html={solutionIconPaths[item.label] ?? defaultPath}></svg>
                      </span>
                      <span>
                        <span class="block text-sm font-semibold text-gray-900 group-hover/st:text-blue-600 transition-colors leading-tight">{item.label}</span>
                        <span class="block text-xs text-gray-500 mt-0.5 leading-snug">{item.desc}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-100">
              <a href="/videos/" class="flex items-center justify-between gap-4 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors group/vc">
                <div>
                  <p class="text-sm font-semibold text-gray-900 group-hover/vc:text-blue-700 leading-snug">
                    Getting Started with Desk365: Your Modern Helpdesk Ticketing System
                  </p>
                  <span class="inline-flex items-center gap-1 mt-1.5 text-xs font-semibold text-[#7CB518]">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/>
                    </svg>
                    Watch Video
                  </span>
                </div>
                <div class="flex-shrink-0 w-24 h-16 rounded-lg bg-blue-100 flex items-center justify-center overflow-hidden">
                  <svg class="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>

        <a href="/microsoft-teams-ticketing-system/"
          class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
          Microsoft Teams
        </a>

        <a href="/pricing/"
          class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
          Pricing
        </a>

        <div class="nav-dropdown">
          <button type="button"
            class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors focus:outline-none"
            aria-expanded="false" aria-haspopup="true">
            Resources
            <svg class="w-3.5 h-3.5 transition-transform duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="dropdown-panel left-0 w-80 p-3">
            {resourcesItems.map(item => {
              const rc = getRC(item.label);
              return (
                <a href={item.href} class="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group/ri"
                  {...item.href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}}>
                  <span class={\`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 \${rc.bg}\`}>
                    <svg class={\`w-4.5 h-4.5 \${rc.ic}\`} style="width:18px;height:18px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" set:html={resourceIconPaths[item.label] ?? defaultPath}></svg>
                  </span>
                  <span>
                    <span class="block text-sm font-semibold text-gray-900 group-hover/ri:text-blue-600 transition-colors">{item.label}</span>
                    {item.desc && <span class="block text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</span>}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>`;

const mobileNavStr = `<div class="px-4 py-3 space-y-1">
      <div>
        <button type="button"
          class="mobile-accordion-trigger w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors text-left"
          aria-expanded="false" data-target="mobile-acc-features">
          Features
          <svg class="w-4 h-4 transition-transform duration-200 chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div id="mobile-acc-features" class="mobile-accordion-content px-2">
          <div class="pl-2 pb-2 space-y-0.5 border-l-2 border-blue-100 ml-3">
            {[...featuresCol1, ...featuresCol2].map(item => (
              <a href={item.href} class="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                <span class="font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <button type="button"
          class="mobile-accordion-trigger w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors text-left"
          aria-expanded="false" data-target="mobile-acc-solutions">
          Solutions
          <svg class="w-4 h-4 transition-transform duration-200 chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div id="mobile-acc-solutions" class="mobile-accordion-content px-2">
          <div class="pl-2 pb-2 space-y-0.5 border-l-2 border-blue-100 ml-3">
            {[...industriesLinks, ...teamsLinks].map(item => (
              <a href={item.href} class="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                <span class="font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <a href="/microsoft-teams-ticketing-system/"
        class="block px-3 py-3 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
        Microsoft Teams
      </a>

      <a href="/pricing/"
        class="block px-3 py-3 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
        Pricing
      </a>

      <div>
        <button type="button"
          class="mobile-accordion-trigger w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors text-left"
          aria-expanded="false" data-target="mobile-acc-resources">
          Resources
          <svg class="w-4 h-4 transition-transform duration-200 chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div id="mobile-acc-resources" class="mobile-accordion-content px-2">
          <div class="pl-2 pb-2 space-y-0.5 border-l-2 border-blue-100 ml-3">
            {resourcesItems.map(item => (
              <a href={item.href} class="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                 {...(item as any).href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}}>
                <span class="font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>`;

const frontmatterAdditions = `
const featuresItems = [
  { label: 'AI Agent', href: '/features/ai-agent/', desc: 'Get quick, contextual responses' },
  { label: 'Customization', href: '/features/customization/', desc: 'Adapt workflows to your needs' },
  { label: 'Asset Management', href: '/features/asset-management/', desc: 'Manage hardware and software assets' },
  { label: 'Ticket Assignment', href: '/features/ticket-assignment/', desc: 'Auto-assign tickets to agents' },
  { label: 'Automations', href: '/features/automations/', desc: 'Automate repetitive tasks' },
  { label: 'Reports & Analytics', href: '/features/reports/', desc: 'In-depth reporting and tracking' },
  { label: 'SLAs', href: '/features/slas/', desc: 'Set and track service timelines' },
  { label: 'Approval Management', href: '/features/approval-management/', desc: 'Approvals made effortless' },
  { label: 'Knowledge Base', href: '/features/knowledge-base/', desc: 'Centralize information sharing' },
  { label: 'Helpdesk Security', href: '/features/security/', desc: 'Stay secure and compliant' }
];
const mid = Math.ceil(featuresItems.length / 2);
const featuresCol1 = featuresItems.slice(0, mid);
const featuresCol2 = featuresItems.slice(mid);

const resourcesItems = [
  { label: 'Help Center', href: 'https://support.desk365.io', desc: 'Troubleshooting advice and user guides for configuring and utilizing Desk365 efficiently.' },
  { label: 'Videos', href: '/videos/', desc: 'Video tutorials and step-by-step demonstrations will show you exactly how to use Desk365.' },
  { label: 'Blog', href: '/blog/', desc: 'Insights, tips, and stay up-to-date on the latest trends on customer service and more.' },
  { label: 'Customer Stories', href: '/customer-stories/', desc: 'Case studies on how customers use Desk365 to streamline support.' },
  { label: 'Glossary', href: '/glossary/', desc: 'Providing definitions of specific customer service terms to aid comprehension.' }
];`;

content = content.replace(/const navLinks = nav\.navLinks \?\? \[\];[\s\S]*?const resourcesItems = resourcesNav\?\.dropdown \?\? \[\];/m, frontmatterAdditions);

content = content.replace(/<nav class="hidden lg:flex items-center gap-0 flex-1" aria-label="Main navigation">[\s\S]*?<\/nav>/m, desktopNavStr);

content = content.replace(/<div class="px-4 py-3 space-y-1">[\s\S]*?<!-- Language \(mobile\) -->/m, mobileNavStr + '\n\n      <!-- Language (mobile) -->');

fs.writeFileSync(headerPath, content);
console.log('Header successfully rewritten.');
