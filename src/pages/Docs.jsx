import { Link } from 'react-router-dom'
import { registry } from '../data/registry'
import { CopyBlock } from '../ui/CopyBlock'

const categories = [...new Set(registry.map((c) => c.category))].sort()

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 mb-14">
      <h2 className="text-xl font-bold tracking-tight mb-4">{title}</h2>
      {children}
    </section>
  )
}

function Step({ n, title, children }) {
  return (
    <div className="flex gap-4">
      <div className="w-7 h-7 rounded-full bg-surface-2 border border-border flex items-center justify-center text-[12px] font-mono font-semibold text-amber flex-shrink-0">
        {n}
      </div>
      <div className="pb-6">
        <p className="text-[14px] font-semibold text-ink">{title}</p>
        <div className="text-[13.5px] text-ink-dim mt-1 leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

export default function Docs() {
  const toc = [
    ['quick-start', 'Quick start'],
    ['requirements', 'Requirements'],
    ['theming', 'Theming'],
    ['categories', 'Categories'],
    ['faq', 'FAQ'],
    ['ecosystem', 'Beyond compo'],
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 pt-12">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1">
            {toc.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="block text-[13px] text-ink-dim hover:text-ink py-1.5 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>

        <div>
          <p className="text-[12px] font-mono text-amber uppercase tracking-wider mb-2">Documentation</p>
          <h1 className="text-[34px] font-bold tracking-tight mb-3">Using compo</h1>
          <p className="text-ink-dim text-[15px] max-w-lg leading-relaxed mb-12">
            compo is a copy paste component library. There is no package to install and no build
            step to run. Every component ships as plain React and Tailwind, ready to drop into
            your project.
          </p>

          <Section id="quick-start" title="Quick start">
            <Step n="1" title="Find a component">
              Browse the <Link to="/" className="text-amber underline underline-offset-2">component grid</Link>,
              or open one directly to see its full preview.
            </Step>
            <Step n="2" title="Copy the code">
              On any component page, press "Copy code" in the top right of the code panel.
              This copies the full React component, including its Tailwind classes.
            </Step>
            <Step n="3" title="Paste it into your project">
              Create a new file under <code className="text-ink bg-surface-2 px-1.5 py-0.5 rounded text-[12.5px] font-mono">src/components/</code>,
              paste the code, and import it wherever you need it. No extra dependencies beyond
              React and Tailwind are required for most components.
            </Step>
            <Step n="4" title="Adjust props to fit your data">
              Most components take props for the content shown in the preview, for example
              a Pricing Card takes <code className="text-ink bg-surface-2 px-1.5 py-0.5 rounded text-[12.5px] font-mono">tier</code>,{' '}
              <code className="text-ink bg-surface-2 px-1.5 py-0.5 rounded text-[12.5px] font-mono">price</code>,
              and <code className="text-ink bg-surface-2 px-1.5 py-0.5 rounded text-[12.5px] font-mono">popular</code>.
              Check the top of each component file for its full prop list.
            </Step>
          </Section>

          <Section id="requirements" title="Requirements">
            <ul className="text-[13.5px] text-ink-dim space-y-2 leading-relaxed">
              <li>• React 18 or later, function components with hooks.</li>
              <li>• Tailwind CSS v3 configured in your project (<code className="text-ink bg-surface-2 px-1.5 py-0.5 rounded text-[12.5px] font-mono">tailwind.config.js</code> with the default color palette available).</li>
              <li>• A handful of components use <code className="text-ink bg-surface-2 px-1.5 py-0.5 rounded text-[12.5px] font-mono">useState</code> or{' '}
                <code className="text-ink bg-surface-2 px-1.5 py-0.5 rounded text-[12.5px] font-mono">useEffect</code>; nothing outside React's standard library.</li>
              <li>• No component depends on a UI kit like shadcn or Radix. What you copy is what runs.</li>
            </ul>
          </Section>

          <Section id="theming" title="Theming">
            <p className="text-[13.5px] text-ink-dim leading-relaxed mb-4">
              Every component uses two accent colors from Tailwind's palette: <span className="text-amber font-medium">amber-400</span> and{' '}
              <span className="text-lime font-medium">lime-400</span>. To match your own brand,
              find and replace those two class names across the component you copied.
            </p>
            <CopyBlock
              label="example"
              code={`bg-amber-400   →   bg-blue-500
text-amber-400 →   text-blue-500
bg-lime-400    →   bg-emerald-400`}
            />
          </Section>

          <Section id="categories" title="Categories">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 rounded-full bg-surface-2 border border-border text-[12.5px] text-ink-dim"
                >
                  {c}
                </span>
              ))}
            </div>
          </Section>

          <Section id="faq" title="FAQ">
            <div className="space-y-5">
              <div>
                <p className="text-[14px] font-semibold text-ink">Is compo free to use?</p>
                <p className="text-[13.5px] text-ink-dim mt-1">Yes. Every component is free for personal and commercial projects, with no attribution required.</p>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-ink">Do I need an account?</p>
                <p className="text-[13.5px] text-ink-dim mt-1">No. Browsing and copying code never requires signing in.</p>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-ink">Can I use these without Tailwind?</p>
                <p className="text-[13.5px] text-ink-dim mt-1">You will need to translate the utility classes into plain CSS yourself. The class names describe the exact styles applied, so a one to one conversion is usually direct.</p>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-ink">Will more components be added?</p>
                <p className="text-[13.5px] text-ink-dim mt-1">Yes, new components are added regularly across all the categories listed above.</p>
              </div>
            </div>
          </Section>

          <Section id="ecosystem" title="Beyond compo">
            <p className="text-[13.5px] text-ink-dim leading-relaxed">
              compo only covers UI components. For full page templates, see{' '}
              <Link to="/templates" className="text-amber underline underline-offset-2">Templates</Link>.
              For everything else in the stack - icons, AI coding tools, hosting - see{' '}
              <Link to="/tools" className="text-amber underline underline-offset-2">Tools we like</Link>.
              {' '}Want to submit your own component? <Link to="/auth" className="text-amber underline underline-offset-2">Create an account</Link>.
            </p>
          </Section>
        </div>

        <footer className="mt-16 pt-6 border-t border-border">
          <Link to="/privacy" className="text-[12px] text-ink-faint hover:text-ink-dim transition-colors">
            Privacy Policy
          </Link>
        </footer>
      </div>
    </div>
  )
}
