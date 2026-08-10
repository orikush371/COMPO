import { useEffect, useRef, useState } from 'react'

export function GradientButton() {
  return (
    <button className="px-5 py-2.5 rounded-lg font-semibold text-sm text-[#1a1200] bg-gradient-to-br from-amber to-amber-2 shadow-[0_4px_20px_-4px_rgba(240,168,60,0.6)] hover:shadow-[0_6px_28px_-4px_rgba(240,168,60,0.8)] hover:-translate-y-0.5 transition-all">
      Get started
    </button>
  )
}

export function SpotlightCard() {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
      }}
      className="relative w-56 p-5 rounded-2xl bg-surface-2 border border-border overflow-hidden cursor-pointer"
      style={{
        background: `radial-gradient(180px circle at ${pos.x}% ${pos.y}%, rgba(240,168,60,0.16), transparent 70%), #191916`,
      }}
    >
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber to-lime mb-3" />
      <h4 className="text-sm font-semibold text-ink">Spotlight Card</h4>
      <p className="text-xs text-ink-dim mt-1">Glow tracks your cursor.</p>
    </div>
  )
}

export function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-lime/10 text-lime border border-lime/25">
      <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
      Live now
    </span>
  )
}

export function ToggleSwitch() {
  const [on, setOn] = useState(true)
  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-11 h-6 rounded-full relative transition-colors ${on ? 'bg-gradient-to-r from-amber to-amber-2' : 'bg-surface-2 border border-border'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-bg shadow transition-transform ${on ? 'translate-x-5 bg-[#1a1200]' : ''}`} />
    </button>
  )
}

export function AvatarStack() {
  const people = [
    { i: 'JD', c: '#f0a83c' }, { i: 'AM', c: '#c9f24e' }, { i: 'RK', c: '#e8794a' }, { i: '+4', c: '#38382c' },
  ]
  return (
    <div className="flex">
      {people.map((p, idx) => (
        <div key={idx} className="w-9 h-9 rounded-full border-2 border-surface-2 flex items-center justify-center text-[11px] font-bold text-[#1a1200] -ml-2.5 first:ml-0" style={{ background: p.c }}>
          {p.i}
        </div>
      ))}
    </div>
  )
}

export function SegmentedControl() {
  const [active, setActive] = useState('week')
  const opts = ['day', 'week', 'month']
  return (
    <div className="inline-flex p-1 rounded-lg bg-surface-2 border border-border text-xs font-medium">
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => setActive(o)}
          className={`px-3 py-1.5 rounded-md capitalize transition-colors ${active === o ? 'bg-amber text-[#1a1200]' : 'text-ink-dim hover:text-ink'}`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export function TooltipDemo() {
  const [show, setShow] = useState(false)
  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <button className="px-4 py-2 rounded-lg bg-surface-2 border border-border text-sm text-ink">Hover me</button>
      {show && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-md bg-ink text-bg text-xs font-medium whitespace-nowrap">
          Helpful hint text
        </div>
      )}
    </div>
  )
}

export function ToastDemo() {
  return (
    <div className="w-64 p-3.5 rounded-xl bg-surface-2 border border-border flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-lime/15 text-lime flex items-center justify-center text-xs font-bold flex-shrink-0">✓</div>
      <div>
        <p className="text-sm font-semibold text-ink">Changes saved</p>
        <p className="text-xs text-ink-dim mt-0.5">Your update is live.</p>
      </div>
    </div>
  )
}

export function StatCounter() {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0
        const id = setInterval(() => {
          start += 137
          if (start >= 12400) { start = 12400; clearInterval(id) }
          setN(start)
        }, 16)
        obs.disconnect()
      }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref}>
      <p className="text-4xl font-bold font-mono text-ink tabular-nums">{n.toLocaleString()}</p>
      <p className="text-xs text-ink-dim mt-1 uppercase tracking-wide">Active builders</p>
    </div>
  )
}

export function ProgressRing() {
  const pct = 72
  const r = 34, c = 2 * Math.PI * r
  return (
    <div className="relative w-24 h-24">
      <svg width="96" height="96" className="-rotate-90">
        <circle cx="48" cy="48" r={r} stroke="#26261f" strokeWidth="8" fill="none" />
        <circle cx="48" cy="48" r={r} stroke="url(#g)" strokeWidth="8" fill="none"
          strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} strokeLinecap="round" />
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0a83c" />
            <stop offset="100%" stopColor="#c9f24e" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold font-mono text-ink">{pct}%</div>
    </div>
  )
}

export function CommandKbd() {
  return (
    <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-2 border border-border text-ink-dim text-sm">
      Search components
      <span className="ml-auto flex items-center gap-1">
        <kbd className="px-1.5 py-0.5 rounded bg-bg border border-border text-[11px] font-mono text-ink-dim">⌘</kbd>
        <kbd className="px-1.5 py-0.5 rounded bg-bg border border-border text-[11px] font-mono text-ink-dim">K</kbd>
      </span>
    </div>
  )
}

export function MarqueeTags() {
  const tags = ['React', 'Tailwind', 'Framer Motion', 'Radix', 'TypeScript', 'Vite']
  const row = [...tags, ...tags]
  return (
    <div className="overflow-hidden w-64 mask-fade">
      <div className="flex gap-2 animate-marquee w-max">
        {row.map((t, i) => (
          <span key={i} className="px-3 py-1.5 rounded-full bg-surface-2 border border-border text-xs text-ink-dim whitespace-nowrap">{t}</span>
        ))}
      </div>
    </div>
  )
}

export function PricingCard() {
  return (
    <div className="w-56 p-5 rounded-2xl bg-surface-2 border border-amber/40 relative">
      <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-amber text-[#1a1200] text-[10px] font-bold">POPULAR</div>
      <p className="text-xs text-ink-dim font-mono uppercase tracking-wider">Pro</p>
      <p className="text-2xl font-bold text-ink mt-1">$19<span className="text-sm font-normal text-ink-dim">/mo</span></p>
      <button className="mt-4 w-full py-2 rounded-lg bg-gradient-to-br from-amber to-amber-2 text-[#1a1200] text-sm font-semibold">Choose plan</button>
    </div>
  )
}

export function FileDropZone() {
  return (
    <div className="w-60 py-8 rounded-xl border-2 border-dashed border-border hover:border-amber/50 flex flex-col items-center justify-center text-center transition-colors cursor-pointer">
      <div className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center mb-2 text-amber">↑</div>
      <p className="text-xs text-ink font-medium">Drop files here</p>
      <p className="text-[11px] text-ink-faint mt-0.5">or click to browse</p>
    </div>
  )
}

export function TestimonialCard() {
  return (
    <div className="w-64 p-5 rounded-2xl bg-surface-2 border border-border">
      <p className="text-[13px] text-ink leading-relaxed">"Ships faster than anything I've used. The docs alone saved me a week."</p>
      <div className="flex items-center gap-2.5 mt-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber to-lime" />
        <div>
          <p className="text-xs font-semibold text-ink">Dana K.</p>
          <p className="text-[11px] text-ink-faint">Frontend lead</p>
        </div>
      </div>
    </div>
  )
}

export function Stepper() {
  const steps = ['Account', 'Details', 'Review']
  const active = 1
  return (
    <div className="flex items-center">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${
              i < active ? 'bg-lime text-[#0a1400]' : i === active ? 'bg-amber text-[#1a1200]' : 'bg-surface-2 border border-border text-ink-faint'
            }`}>
              {i < active ? '✓' : i + 1}
            </div>
            <span className="text-[10px] text-ink-dim mt-1.5">{s}</span>
          </div>
          {i < steps.length - 1 && <div className={`w-10 h-px mx-1 -mt-4 ${i < active ? 'bg-lime' : 'bg-border'}`} />}
        </div>
      ))}
    </div>
  )
}

export function DropdownMenu() {
  const [open, setOpen] = useState(false)
  const items = ['Edit', 'Duplicate', 'Archive']
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="px-4 py-2 rounded-lg bg-surface-2 border border-border text-sm text-ink flex items-center gap-2">
        Actions <span className="text-ink-faint text-xs">▾</span>
      </button>
      {open && (
        <div className="absolute top-11 left-0 w-40 rounded-lg border border-border bg-surface-2 overflow-hidden shadow-xl">
          {items.map((it) => (
            <div key={it} className="px-3.5 py-2.5 text-[13px] text-ink-dim hover:bg-bg hover:text-ink transition-colors cursor-pointer">{it}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export function RatingStars() {
  const [rating, setRating] = useState(4)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} onClick={() => setRating(n)} className={`text-2xl leading-none transition-colors ${n <= rating ? 'text-amber' : 'text-border'}`}>
          ★
        </button>
      ))}
    </div>
  )
}

export function ChatBubble() {
  return (
    <div className="flex flex-col gap-2 w-56">
      <div className="self-start bg-surface-2 border border-border rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-[13px] text-ink max-w-[85%]">
        Got a minute to review the PR?
      </div>
      <div className="self-end bg-gradient-to-br from-amber to-amber-2 text-[#1a1200] rounded-2xl rounded-br-sm px-3.5 py-2.5 text-[13px] font-medium max-w-[85%]">
        On it now 🔥
      </div>
    </div>
  )
}

export function SkeletonLoader() {
  return (
    <div className="w-56 space-y-3">
      <div className="h-24 rounded-xl bg-surface-2 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
      <div className="h-3 w-3/4 rounded bg-surface-2" />
      <div className="h-3 w-1/2 rounded bg-surface-2" />
    </div>
  )
}

export function Timeline() {
  const events = [
    { t: 'Order placed', d: 'Mon' },
    { t: 'Shipped', d: 'Wed' },
    { t: 'Out for delivery', d: 'Fri' },
  ]
  return (
    <div className="w-56">
      {events.map((e, i) => (
        <div key={e.t} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`w-2.5 h-2.5 rounded-full ${i === events.length - 1 ? 'bg-amber' : 'bg-lime'}`} />
            {i < events.length - 1 && <div className="w-px flex-1 bg-border" />}
          </div>
          <div className="pb-5">
            <p className="text-[13px] text-ink font-medium">{e.t}</p>
            <p className="text-[11px] text-ink-faint">{e.d}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function LiquidGlassButton() {
  return (
    <button className="relative px-6 py-3 rounded-full text-sm font-semibold text-ink overflow-hidden backdrop-blur-xl bg-white/5 border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-white/10 transition-colors">
      <span className="relative z-10">Continue</span>
      <span className="absolute -inset-8 bg-gradient-to-br from-amber/20 via-transparent to-lime/20 blur-2xl" />
    </button>
  )
}

export function OrbitTimeline() {
  const items = [
    { label: 'Plan', deg: -90 },
    { label: 'Build', deg: 30 },
    { label: 'Ship', deg: 150 },
  ]
  return (
    <div className="relative w-40 h-40">
      <div className="absolute inset-0 rounded-full border border-dashed border-border" />
      <div className="absolute inset-0 flex items-center justify-center text-[11px] font-mono text-ink-dim">core</div>
      {items.map((it) => {
        const rad = (it.deg * Math.PI) / 180
        const x = 70 + 70 * Math.cos(rad)
        const y = 70 + 70 * Math.sin(rad)
        return (
          <div
            key={it.label}
            className="absolute w-9 h-9 -ml-4.5 -mt-4.5 rounded-full bg-surface-2 border border-amber/40 flex items-center justify-center text-[9px] font-semibold text-amber"
            style={{ left: x, top: y }}
          >
            {it.label}
          </div>
        )
      })}
    </div>
  )
}

export function EmptyState() {
  return (
    <div className="w-64 py-10 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-2xl bg-surface-2 border border-border flex items-center justify-center mb-4 text-xl">📭</div>
      <p className="text-sm font-semibold text-ink">No projects yet</p>
      <p className="text-xs text-ink-dim mt-1 max-w-[200px]">Create your first project to get started.</p>
      <button className="mt-4 px-4 py-2 rounded-lg bg-amber text-[#1a1200] text-xs font-semibold">New project</button>
    </div>
  )
}

export function LinkPreviewCard() {
  const [hover, setHover] = useState(false)
  return (
    <span className="relative inline-block" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <span className="text-amber underline underline-offset-4 cursor-pointer text-sm">compo docs</span>
      {hover && (
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-48 rounded-xl border border-border bg-surface-2 overflow-hidden shadow-2xl">
          <div className="h-20 bg-gradient-to-br from-amber/30 to-lime/20" />
          <div className="p-2.5">
            <p className="text-[11px] font-semibold text-ink">Documentation</p>
            <p className="text-[10px] text-ink-faint mt-0.5">compo.dev/docs</p>
          </div>
        </div>
      )}
    </span>
  )
}

export function ComparisonTable() {
  const rows = ['Live preview', 'Copy code', 'No account']
  return (
    <div className="w-64 rounded-xl border border-border overflow-hidden text-xs">
      <div className="grid grid-cols-3 bg-surface-2 border-b border-border font-semibold text-ink">
        <div className="p-2.5"> </div>
        <div className="p-2.5 text-center text-ink-faint">Others</div>
        <div className="p-2.5 text-center text-amber">compo</div>
      </div>
      {rows.map((r) => (
        <div key={r} className="grid grid-cols-3 border-b border-border last:border-0 text-ink-dim">
          <div className="p-2.5">{r}</div>
          <div className="p-2.5 text-center text-ink-faint">–</div>
          <div className="p-2.5 text-center text-lime">✓</div>
        </div>
      ))}
    </div>
  )
}
