import { useState } from 'react'

export function Accordion() {
  const [open, setOpen] = useState(0)
  const items = ['What is compo?', 'Is it free?', 'Do I need Tailwind?']
  return (
    <div className="w-64 rounded-xl border border-border overflow-hidden">
      {items.map((it, i) => (
        <div key={it} className="border-b border-border last:border-0">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left text-[13px] font-medium text-ink"
          >
            {it}
            <span className={`text-ink-faint transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          {open === i && (
            <div className="px-4 pb-3 text-[12.5px] text-ink-dim">Yes, and it takes about ten seconds to find out.</div>
          )}
        </div>
      ))}
    </div>
  )
}

export function AlertBanner() {
  return (
    <div className="w-72 flex items-start gap-3 p-3.5 rounded-xl bg-amber/10 border border-amber/25">
      <div className="w-5 h-5 rounded-full bg-amber flex items-center justify-center text-[11px] font-bold text-[#1a1200] flex-shrink-0 mt-0.5">!</div>
      <div>
        <p className="text-[13px] font-semibold text-ink">Update available</p>
        <p className="text-[12px] text-ink-dim mt-0.5">A new version ships better performance.</p>
      </div>
    </div>
  )
}

export function CheckboxList() {
  const [checked, setChecked] = useState([true, false, true])
  const items = ['Email notifications', 'SMS alerts', 'Weekly digest']
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((it, i) => (
        <label key={it} className="flex items-center gap-2.5 cursor-pointer">
          <span
            onClick={() => setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)))}
            className={`w-4.5 h-4.5 rounded flex items-center justify-center text-[10px] font-bold ${
              checked[i] ? 'bg-amber text-[#1a1200]' : 'bg-surface-2 border border-border'
            }`}
            style={{ width: 18, height: 18 }}
          >
            {checked[i] && '✓'}
          </span>
          <span className="text-[13px] text-ink-dim">{it}</span>
        </label>
      ))}
    </div>
  )
}

export function RadioGroup() {
  const [val, setVal] = useState('monthly')
  const opts = ['monthly', 'yearly']
  return (
    <div className="flex flex-col gap-2.5">
      {opts.map((o) => (
        <label key={o} className="flex items-center gap-2.5 cursor-pointer" onClick={() => setVal(o)}>
          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${val === o ? 'border-amber' : 'border-border'}`}>
            {val === o && <span className="w-2 h-2 rounded-full bg-amber" />}
          </span>
          <span className="text-[13px] text-ink-dim capitalize">{o}</span>
        </label>
      ))}
    </div>
  )
}

export function SearchBar() {
  return (
    <div className="w-64 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border focus-within:border-amber/50 transition-colors">
      <span className="text-ink-faint text-sm">⌕</span>
      <input placeholder="Search components…" className="bg-transparent outline-none text-[13px] text-ink placeholder:text-ink-faint w-full" />
    </div>
  )
}

export function SelectDropdown() {
  const [open, setOpen] = useState(false)
  const [val, setVal] = useState('Newest')
  const opts = ['Newest', 'Popular', 'A to Z']
  return (
    <div className="relative w-40">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-surface-2 border border-border text-[13px] text-ink">
        {val} <span className="text-ink-faint text-xs">▾</span>
      </button>
      {open && (
        <div className="absolute top-11 left-0 w-full rounded-lg border border-border bg-surface-2 overflow-hidden shadow-xl z-10">
          {opts.map((o) => (
            <div key={o} onClick={() => { setVal(o); setOpen(false) }} className="px-3.5 py-2.5 text-[13px] text-ink-dim hover:bg-bg hover:text-ink cursor-pointer">{o}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export function Pagination() {
  const [page, setPage] = useState(2)
  return (
    <div className="flex items-center gap-1.5">
      <button onClick={() => setPage(Math.max(1, page - 1))} className="w-8 h-8 rounded-lg bg-surface-2 border border-border text-ink-dim text-sm">‹</button>
      {[1, 2, 3, 4].map((n) => (
        <button key={n} onClick={() => setPage(n)} className={`w-8 h-8 rounded-lg text-sm font-medium ${page === n ? 'bg-amber text-[#1a1200]' : 'bg-surface-2 border border-border text-ink-dim'}`}>{n}</button>
      ))}
      <button onClick={() => setPage(Math.min(4, page + 1))} className="w-8 h-8 rounded-lg bg-surface-2 border border-border text-ink-dim text-sm">›</button>
    </div>
  )
}

export function Popover() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="px-4 py-2 rounded-lg bg-surface-2 border border-border text-sm text-ink">Share</button>
      {open && (
        <div className="absolute top-11 left-0 w-52 p-3.5 rounded-xl border border-border bg-surface-2 shadow-2xl z-10">
          <p className="text-[12.5px] font-semibold text-ink mb-1">Share this component</p>
          <p className="text-[11.5px] text-ink-faint">Copy the link below to share.</p>
        </div>
      )}
    </div>
  )
}

export function ProfileCard() {
  return (
    <div className="w-60 p-5 rounded-2xl bg-surface-2 border border-border text-center">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber to-lime mx-auto mb-3" />
      <p className="text-[14px] font-semibold text-ink">Maya Chen</p>
      <p className="text-[12px] text-ink-faint">Product designer</p>
      <button className="mt-3 px-4 py-1.5 rounded-lg bg-surface border border-border text-[12px] text-ink">Follow</button>
    </div>
  )
}

export function SidebarNav() {
  const items = [
    { label: 'Overview', active: true },
    { label: 'Components', active: false },
    { label: 'Settings', active: false },
  ]
  return (
    <div className="w-40 rounded-xl border border-border bg-surface-2 p-2 flex flex-col gap-1">
      {items.map((it) => (
        <div key={it.label} className={`px-3 py-2 rounded-lg text-[12.5px] font-medium ${it.active ? 'bg-amber/15 text-amber' : 'text-ink-dim'}`}>
          {it.label}
        </div>
      ))}
    </div>
  )
}

export function SignInForm() {
  return (
    <div className="w-64 p-5 rounded-2xl bg-surface-2 border border-border">
      <p className="text-[14px] font-semibold text-ink mb-3">Sign in</p>
      <div className="space-y-2">
        <div className="px-3 py-2 rounded-lg bg-surface border border-border text-[12px] text-ink-faint">you@example.com</div>
        <div className="px-3 py-2 rounded-lg bg-surface border border-border text-[12px] text-ink-faint">••••••••</div>
      </div>
      <button className="mt-3 w-full py-2 rounded-lg bg-amber text-[#1a1200] text-[13px] font-semibold">Continue</button>
    </div>
  )
}

export function RangeSlider() {
  const [val, setVal] = useState(60)
  return (
    <div className="w-56">
      <div className="flex justify-between text-[11px] text-ink-faint mb-1.5">
        <span>Volume</span><span>{val}%</span>
      </div>
      <input type="range" min="0" max="100" value={val} onChange={(e) => setVal(e.target.value)} className="w-full accent-amber" />
    </div>
  )
}

export function SpinnerLoader() {
  return (
    <div className="w-8 h-8 rounded-full border-2 border-border border-t-amber animate-spin" />
  )
}

export function DataTable() {
  const rows = [
    ['Sunset', 'Buttons', '4.4k'],
    ['Spotlight', 'Cards', '6.8k'],
    ['Orbit', 'Timelines', '1.2k'],
  ]
  return (
    <div className="w-64 rounded-xl border border-border overflow-hidden text-[12px]">
      <div className="grid grid-cols-3 bg-surface-2 font-semibold text-ink px-3.5 py-2">
        <span>Name</span><span>Type</span><span className="text-right">Uses</span>
      </div>
      {rows.map((r) => (
        <div key={r[0]} className="grid grid-cols-3 px-3.5 py-2 text-ink-dim border-t border-border">
          <span>{r[0]}</span><span>{r[1]}</span><span className="text-right">{r[2]}</span>
        </div>
      ))}
    </div>
  )
}

export function TabsDemo() {
  const [active, setActive] = useState('preview')
  const tabs = ['preview', 'code']
  return (
    <div className="w-56">
      <div className="flex border-b border-border">
        {tabs.map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`px-4 py-2 text-[12.5px] font-medium capitalize border-b-2 -mb-px ${active === t ? 'border-amber text-ink' : 'border-transparent text-ink-faint'}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="p-4 text-[12.5px] text-ink-dim">{active === 'preview' ? 'Rendered output goes here.' : 'Source code goes here.'}</div>
    </div>
  )
}

export function TagInput() {
  const [tags, setTags] = useState(['react', 'tailwind'])
  return (
    <div className="w-56 flex flex-wrap gap-1.5 p-2.5 rounded-lg bg-surface-2 border border-border">
      {tags.map((t) => (
        <span key={t} className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber/15 text-amber text-[11px] font-medium">
          {t}
          <span onClick={() => setTags(tags.filter((x) => x !== t))} className="cursor-pointer opacity-70">×</span>
        </span>
      ))}
      <input placeholder="Add tag…" className="bg-transparent outline-none text-[12px] text-ink placeholder:text-ink-faint flex-1 min-w-[60px]" />
    </div>
  )
}

export function NotificationBell() {
  return (
    <div className="relative w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center text-ink-dim">
      🔔
      <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-amber text-[8px] font-bold text-[#1a1200] flex items-center justify-center">3</span>
    </div>
  )
}

export function BentoGrid() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-2 w-64 h-36">
      <div className="col-span-2 row-span-2 rounded-xl bg-surface-2 border border-border flex items-end p-2.5">
        <span className="text-[11px] text-ink-dim">Analytics</span>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-amber to-lime" />
      <div className="rounded-xl bg-surface-2 border border-border" />
    </div>
  )
}

export function Breadcrumbs() {
  const parts = ['Home', 'Components', 'Gradient Button']
  return (
    <div className="flex items-center gap-1.5 text-[12.5px]">
      {parts.map((p, i) => (
        <span key={p} className="flex items-center gap-1.5">
          <span className={i === parts.length - 1 ? 'text-ink font-medium' : 'text-ink-faint'}>{p}</span>
          {i < parts.length - 1 && <span className="text-ink-faint">/</span>}
        </span>
      ))}
    </div>
  )
}

export function KanbanCard() {
  return (
    <div className="w-52 p-3.5 rounded-xl bg-surface-2 border border-border">
      <span className="px-2 py-0.5 rounded-md bg-amber/15 text-amber text-[10px] font-semibold">Design</span>
      <p className="text-[13px] font-medium text-ink mt-2">Rework the pricing page</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-[11px] text-ink-faint">Due Fri</span>
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber to-lime" />
      </div>
    </div>
  )
}

export const ORB_VARIANTS = [
  'ripple', 'diagonal', 'comet', 'column', 'row',
  'scramble', 'diamond', 'checker', 'spiral', 'flicker',
]

const ORB_N = 3
const ORB_MID = (ORB_N - 1) / 2

const ORB_RING = (() => {
  const ring = []
  for (let x = 0; x < ORB_N; x++) ring.push([x, 0])
  for (let y = 1; y < ORB_N; y++) ring.push([ORB_N - 1, y])
  for (let x = ORB_N - 2; x >= 0; x--) ring.push([x, ORB_N - 1])
  for (let y = ORB_N - 2; y >= 1; y--) ring.push([0, y])
  return ring
})()
const ORB_RING_INDEX = new Map(ORB_RING.map(([x, y], i) => [`${x},${y}`, i]))

function orbDelay(variant, x, y) {
  const dx = x - ORB_MID
  const dy = y - ORB_MID
  switch (variant) {
    case 'ripple':
      return Math.hypot(dx, dy) * 240 - (dx === 0 && dy === 0 ? 70 : 0)
    case 'diagonal':
      return ((x + y) / (2 * (ORB_N - 1))) * 900
    case 'comet': {
      const i = ORB_RING_INDEX.get(`${x},${y}`)
      if (i === undefined) return 0
      return -(((ORB_RING.length - i) % ORB_RING.length) / ORB_RING.length) * 1100
    }
    case 'column':
      return (x / (ORB_N - 1)) * 700
    case 'row':
      return (y / (ORB_N - 1)) * 700
    case 'scramble': {
      const i = ORB_RING_INDEX.get(`${x},${y}`)
      if (i === undefined) return 0
      return -(((i * 3) % ORB_RING.length) / ORB_RING.length) * 1100
    }
    case 'diamond':
      return (Math.abs(dx) + Math.abs(dy)) * 200
    case 'checker':
      return ((x + y) % 2) * 350
    case 'spiral': {
      const angle = Math.atan2(dy, dx)
      const r = Math.hypot(dx, dy)
      return ((angle + Math.PI) / (2 * Math.PI)) * 500 + r * 180
    }
    case 'flicker':
      return ((x * 7 + y * 13) % 5) * 130
    default:
      return 0
  }
}

function orbCells(variant) {
  const cells = []
  for (let y = 0; y < ORB_N; y++) {
    for (let x = 0; x < ORB_N; x++) {
      cells.push({ key: `${x}-${y}`, left: x * 6, top: y * 6, delay: orbDelay(variant, x, y) })
    }
  }
  return cells
}

export function OrbLoader({ variant = 'ripple', shape = 'circle', label = 'Thinking\u2026', pill = true }) {
  const radius = shape === 'square' ? '20%' : shape === 'diamond' ? '0%' : '50%'
  const rotate = shape === 'diamond' ? 'rotate(45deg)' : 'none'
  const content = (
    <div className="relative" style={{ width: 20, height: 20 }}>
      {orbCells(variant).map((c) => (
        <span
          key={c.key}
          className="absolute bg-amber"
          style={{
            width: 3, height: 3,
            left: c.left + 4, top: c.top + 4,
            borderRadius: radius,
            transform: rotate,
            opacity: 0.16,
            animation: `orb-pulse 1.3s cubic-bezier(.66,0,.34,1) infinite`,
            animationDelay: `${c.delay}ms`,
          }}
        />
      ))}
    </div>
  )
  if (!pill) return content
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 rounded-full bg-surface-2 border border-border">
      {content}
      <span className="text-[12px] text-ink-dim">{label}</span>
    </div>
  )
}

export function OrbLoaderGallery() {
  return (
    <div className="grid grid-cols-5 gap-3 w-72">
      {ORB_VARIANTS.map((v) => (
        <div key={v} className="flex flex-col items-center gap-1.5">
          <OrbLoader variant={v} pill={false} />
          <span className="text-[9px] text-ink-faint font-mono">{v}</span>
        </div>
      ))}
    </div>
  )
}

export function BarChart() {
  const data = [
    { label: 'Mon', value: 40 },
    { label: 'Tue', value: 65 },
    { label: 'Wed', value: 35 },
    { label: 'Thu', value: 80 },
    { label: 'Fri', value: 55 },
  ]
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="flex items-end gap-3 h-32 w-56">
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5">
          <div
            className="w-full rounded-t-md bg-gradient-to-t from-amber to-lime"
            style={{ height: `${(d.value / max) * 100}%` }}
          />
          <span className="text-[10px] text-ink-faint">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

export function DatePicker() {
  const [selected, setSelected] = useState(14)
  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  return (
    <div className="w-64 p-3.5 rounded-xl bg-surface-2 border border-border">
      <div className="flex items-center justify-between mb-3">
        <button className="text-ink-faint text-sm px-1">‹</button>
        <span className="text-[13px] font-semibold text-ink">March 2026</span>
        <button className="text-ink-faint text-sm px-1">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={i} className="text-[10px] text-ink-faint text-center py-1">{d}</span>
        ))}
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setSelected(d)}
            className={`text-[11px] rounded-md py-1.5 transition-colors ${
              d === selected ? 'bg-amber text-[#1a1200] font-semibold' : 'text-ink-dim hover:bg-bg'
            }`}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  )
}

export function FileUploadProgress() {
  const [progress, setProgress] = useState(62)
  return (
    <div className="w-64 p-3.5 rounded-xl bg-surface-2 border border-border">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-amber/15 text-amber flex items-center justify-center text-[11px] font-bold flex-shrink-0">
          PDF
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12.5px] text-ink font-medium truncate">quarterly-report.pdf</p>
          <p className="text-[10.5px] text-ink-faint">{progress}% · 1.4 MB</p>
        </div>
      </div>
      <div className="mt-2.5 h-1.5 rounded-full bg-bg overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber to-lime transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export function StepWizard() {
  const [step, setStep] = useState(1)
  const steps = ['Account', 'Profile', 'Review']
  return (
    <div className="w-64 p-4 rounded-xl bg-surface-2 border border-border">
      <div className="flex items-center justify-between mb-3">
        {steps.map((s, i) => (
          <span key={s} className={`text-[11px] font-medium ${i + 1 === step ? 'text-amber' : 'text-ink-faint'}`}>
            {s}
          </span>
        ))}
      </div>
      <div className="h-1 rounded-full bg-bg overflow-hidden mb-3">
        <div
          className="h-full bg-amber transition-all"
          style={{ width: `${(step / steps.length) * 100}%` }}
        />
      </div>
      <p className="text-[12px] text-ink-dim mb-3">Step {step} of {steps.length}: {steps[step - 1]}</p>
      <div className="flex gap-2">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          className="flex-1 py-1.5 rounded-lg bg-bg border border-border text-[12px] text-ink-dim"
        >
          Back
        </button>
        <button
          onClick={() => setStep((s) => Math.min(steps.length, s + 1))}
          className="flex-1 py-1.5 rounded-lg bg-amber text-[#1a1200] text-[12px] font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  )
}
