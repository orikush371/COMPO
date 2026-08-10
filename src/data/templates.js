// "ours" templates are locked - full source ships only after a Supabase-backed
// purchase flow exists. Until then, `locked: true` and no `files` are shown.
export const ownTemplates = [
  {
    slug: 'saas-landing',
    name: 'SaaS Landing Page',
    price: '$19',
    desc: 'Hero, feature grid, pricing table, and footer - built entirely from compo components, wired together into one page.',
    tags: ['Landing', 'SaaS'],
    locked: true,
  },
  {
    slug: 'dashboard-starter',
    name: 'Dashboard Starter',
    price: '$24',
    desc: 'Sidebar nav, stat cards, data table, and a settings page. A real admin-panel skeleton, not just a mockup.',
    tags: ['Dashboard', 'Admin'],
    locked: true,
  },
  {
    slug: 'ecommerce-product-page',
    name: 'E-commerce Product Page',
    price: '$15',
    desc: 'Product gallery, pricing card, reviews section, and a sticky add-to-cart bar.',
    tags: ['E-commerce'],
    locked: true,
  },
]

// External marketplace templates - affiliate/referral links where available.
// These are real third-party products, not compo's own work.
export const externalTemplates = [
  {
    name: 'Tailwind UI',
    desc: 'Official Tailwind CSS component + template marketplace, maintained by the Tailwind team.',
    url: 'https://tailwindui.com/templates',
  },
  {
    name: 'Cruip',
    desc: 'Modern, developer-friendly Tailwind templates for SaaS and marketing sites.',
    url: 'https://cruip.com/',
  },
  {
    name: 'Shadcn UI Blocks',
    desc: 'Community-built page blocks and templates on top of shadcn/ui.',
    url: 'https://ui.shadcn.com/blocks',
  },
]
