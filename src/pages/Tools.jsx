const TOOL_GROUPS = [
  {
    category: 'AI coding',
    tools: [
      { name: 'v0 by Vercel', desc: 'Generate UI from a prompt, then refine it in a live editor.', url: 'https://v0.dev' },
      { name: 'Cursor', desc: 'An AI-first code editor built on top of VS Code.', url: 'https://cursor.com' },
      { name: 'Bolt.new', desc: 'Full-stack app scaffolding straight from a browser prompt.', url: 'https://bolt.new' },
    ],
  },
  {
    category: 'Tailwind ecosystem',
    tools: [
      { name: 'Headless UI', desc: 'Unstyled, accessible UI primitives from the Tailwind team.', url: 'https://headlessui.com' },
      { name: 'Tailwind Variants', desc: 'A first-class variant API for building component libraries.', url: 'https://www.tailwind-variants.org' },
      { name: 'Heroicons', desc: 'A free icon set from the makers of Tailwind CSS.', url: 'https://heroicons.com' },
    ],
  },
  {
    category: 'Icons & assets',
    tools: [
      { name: 'Lucide', desc: 'A clean, consistent icon library with an official React package.', url: 'https://lucide.dev' },
      { name: 'Iconify', desc: 'One search across 200,000+ icons from dozens of open-source sets.', url: 'https://icon-sets.iconify.design' },
    ],
  },
  {
    category: 'Hosting & deploys',
    tools: [
      { name: 'Vercel', desc: 'Zero-config deploys for React apps, with previews on every push.', url: 'https://vercel.com' },
      { name: 'Netlify', desc: 'Another solid static/SSR hosting option with a generous free tier.', url: 'https://netlify.com' },
    ],
  },
]

export default function Tools() {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-24">
      <div className="pt-12 pb-8">
        <p className="text-[12px] font-mono text-amber uppercase tracking-wider mb-2">Tools we like</p>
        <h1 className="text-[32px] font-bold tracking-tight">The rest of the stack</h1>
        <p className="text-ink-dim mt-2 text-[15px] max-w-lg">
          compo only covers UI components. Here's what we reach for around it -
          no sponsorships, just tools we'd recommend to a friend.
        </p>
      </div>

      {TOOL_GROUPS.map((group) => (
        <section key={group.category} className="mb-10">
          <h2 className="text-[12px] font-mono uppercase tracking-wider text-ink-dim mb-4">{group.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {group.tools.map((t) => (
              <a
                key={t.name}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3.5 rounded-xl border border-border bg-surface hover:border-border-hi transition-colors"
              >
                <p className="text-[13.5px] font-semibold text-ink">{t.name}</p>
                <p className="text-[12px] text-ink-dim mt-1 leading-relaxed">{t.desc}</p>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
