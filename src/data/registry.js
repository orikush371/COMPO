import {
  GradientButton, SpotlightCard, StatusBadge, ToggleSwitch, AvatarStack,
  SegmentedControl, TooltipDemo, ToastDemo, StatCounter, ProgressRing,
  CommandKbd, MarqueeTags, PricingCard, FileDropZone,
  TestimonialCard, Stepper, DropdownMenu, RatingStars, ChatBubble,
  SkeletonLoader, Timeline, LiquidGlassButton, OrbitTimeline, EmptyState,
  LinkPreviewCard, ComparisonTable,
} from '../ui/demos'
import { registry2 } from './registry2'

export const registry = [
  {
    slug: 'gradient-button',
    name: 'Gradient Button',
    category: 'Buttons',
    desc: 'A warm amber-to-gold call-to-action button with lift on hover.',
    Demo: GradientButton,
    code: `export function GradientButton() {
  return (
    <button className="px-5 py-2.5 rounded-lg font-semibold text-sm
      text-[#1a1200] bg-gradient-to-br from-amber-400 to-yellow-300
      shadow-[0_4px_20px_-4px_rgba(240,168,60,0.6)]
      hover:shadow-[0_6px_28px_-4px_rgba(240,168,60,0.8)]
      hover:-translate-y-0.5 transition-all">
      Get started
    </button>
  )
}`,
  },
  {
    slug: 'spotlight-card',
    name: 'Spotlight Card',
    category: 'Cards',
    desc: 'A card whose glow follows the cursor, tracked via mouse coordinates.',
    Demo: SpotlightCard,
    code: `import { useRef, useState } from 'react'

export function SpotlightCard({ children }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })

  function onMove(e) {
    const r = ref.current.getBoundingClientRect()
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="relative p-5 rounded-2xl border border-white/10"
      style={{
        background:
          'radial-gradient(180px circle at ' + pos.x + '% ' + pos.y + '%, ' +
          'rgba(240,168,60,0.16), transparent 70%), #191916',
      }}
    >
      {children}
    </div>
  )
}`,
  },
  {
    slug: 'status-badge',
    name: 'Status Badge',
    category: 'Badges',
    desc: 'A pulsing pill badge for live or online status.',
    Demo: StatusBadge,
    code: `export function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
      text-xs font-semibold bg-lime-400/10 text-lime-300
      border border-lime-400/25">
      <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
      Live now
    </span>
  )
}`,
  },
  {
    slug: 'toggle-switch',
    name: 'Toggle Switch',
    category: 'Inputs',
    desc: 'An animated switch with a gradient fill when active.',
    Demo: ToggleSwitch,
    code: `import { useState } from 'react'

export function ToggleSwitch({ defaultOn = true }) {
  const [on, setOn] = useState(defaultOn)
  const track = on
    ? 'bg-gradient-to-r from-amber-400 to-yellow-300'
    : 'bg-zinc-800 border border-zinc-700'
  const knob = on ? 'translate-x-5' : ''
  return (
    <button
      onClick={() => setOn(!on)}
      className={'w-11 h-6 rounded-full relative transition-colors ' + track}
    >
      <span
        className={'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-black transition-transform ' + knob}
      />
    </button>
  )
}`,
  },
  {
    slug: 'avatar-stack',
    name: 'Avatar Stack',
    category: 'Avatars',
    desc: 'Overlapping avatar circles for showing collaborators.',
    Demo: AvatarStack,
    code: `export function AvatarStack({ people }) {
  return (
    <div className="flex">
      {people.map((p, i) => (
        <div
          key={i}
          className="w-9 h-9 rounded-full border-2 border-zinc-900 flex
            items-center justify-center text-[11px] font-bold text-black
            -ml-2.5 first:ml-0"
          style={{ background: p.color }}
        >
          {p.initials}
        </div>
      ))}
    </div>
  )
}`,
  },
  {
    slug: 'segmented-control',
    name: 'Segmented Control',
    category: 'Inputs',
    desc: 'A tabbed pill selector for switching between a small set of views.',
    Demo: SegmentedControl,
    code: `import { useState } from 'react'

export function SegmentedControl({ options, defaultValue }) {
  const [active, setActive] = useState(defaultValue ?? options[0])
  return (
    <div className="inline-flex p-1 rounded-lg bg-zinc-900 border
      border-zinc-800 text-xs font-medium">
      {options.map((o) => {
        const cls = active === o
          ? 'bg-amber-400 text-black'
          : 'text-zinc-400 hover:text-white'
        return (
          <button
            key={o}
            onClick={() => setActive(o)}
            className={'px-3 py-1.5 rounded-md capitalize transition-colors ' + cls}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}`,
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'Overlays',
    desc: 'A minimal hover tooltip that appears above the trigger.',
    Demo: TooltipDemo,
    code: `import { useState } from 'react'

export function Tooltip({ label, children }) {
  const [show, setShow] = useState(false)
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5
          py-1.5 rounded-md bg-white text-black text-xs font-medium
          whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  )
}`,
  },
  {
    slug: 'toast',
    name: 'Notification Toast',
    category: 'Overlays',
    desc: 'A success toast card with icon, title, and description.',
    Demo: ToastDemo,
    code: `export function Toast({ title, description }) {
  return (
    <div className="w-64 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800
      flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-lime-400/15 text-lime-300
        flex items-center justify-center text-xs font-bold flex-shrink-0">
        ✓
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-zinc-400 mt-0.5">{description}</p>
      </div>
    </div>
  )
}`,
  },
  {
    slug: 'stat-counter',
    name: 'Stat Counter',
    category: 'Data display',
    desc: 'A number that animates upward when it scrolls into view.',
    Demo: StatCounter,
    code: `import { useEffect, useRef, useState } from 'react'

export function StatCounter({ target, label, duration = 1200 }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      const step = target / (duration / 16)
      let cur = 0
      const id = setInterval(() => {
        cur += step
        if (cur >= target) { cur = target; clearInterval(id) }
        setN(Math.round(cur))
      }, 16)
      obs.disconnect()
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])

  return (
    <div ref={ref}>
      <p className="text-4xl font-bold font-mono tabular-nums">{n.toLocaleString()}</p>
      <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wide">{label}</p>
    </div>
  )
}`,
  },
  {
    slug: 'progress-ring',
    name: 'Progress Ring',
    category: 'Data display',
    desc: 'A circular progress indicator with a gradient stroke.',
    Demo: ProgressRing,
    code: `export function ProgressRing({ percent = 72, size = 96, stroke = 8 }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} stroke="#26261f" strokeWidth={stroke} fill="none" />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke}
          stroke="url(#ring-gradient)" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (percent / 100) * c}
        />
        <defs>
          <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0a83c" />
            <stop offset="100%" stopColor="#c9f24e" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center
        text-sm font-bold font-mono">{percent}%</div>
    </div>
  )
}`,
  },
  {
    slug: 'command-kbd',
    name: 'Command Palette Trigger',
    category: 'Inputs',
    desc: 'A search field styled like a command palette trigger with a keyboard hint.',
    Demo: CommandKbd,
    code: `export function CommandTrigger({ placeholder = 'Search...' }) {
  return (
    <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg
      bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm">
      {placeholder}
      <span className="ml-auto flex items-center gap-1">
        <kbd className="px-1.5 py-0.5 rounded bg-black border
          border-zinc-800 text-[11px] font-mono text-zinc-400">⌘</kbd>
        <kbd className="px-1.5 py-0.5 rounded bg-black border
          border-zinc-800 text-[11px] font-mono text-zinc-400">K</kbd>
      </span>
    </div>
  )
}`,
  },
  {
    slug: 'marquee-tags',
    name: 'Marquee Tags',
    category: 'Data display',
    desc: 'An infinitely scrolling row of tags, useful for tech stacks or logos.',
    Demo: MarqueeTags,
    code: `export function MarqueeTags({ tags }) {
  const row = [...tags, ...tags]
  return (
    <div className="overflow-hidden mask-fade">
      <div className="flex gap-2 animate-marquee w-max">
        {row.map((t, i) => (
          <span key={i} className="px-3 py-1.5 rounded-full bg-zinc-900
            border border-zinc-800 text-xs text-zinc-400 whitespace-nowrap">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/* tailwind.config.js keyframes:
   marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } }
   animation: { marquee: 'marquee 24s linear infinite' } */`,
  },
  {
    slug: 'pricing-card',
    name: 'Pricing Card',
    category: 'Cards',
    desc: 'A single pricing tier card with a "popular" ribbon.',
    Demo: PricingCard,
    code: `export function PricingCard({ tier, price, popular }) {
  return (
    <div className="w-56 p-5 rounded-2xl bg-zinc-900 border
      border-amber-400/40 relative">
      {popular && (
        <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full
          bg-amber-400 text-black text-[10px] font-bold">POPULAR</div>
      )}
      <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">{tier}</p>
      <p className="text-2xl font-bold mt-1">
        {price}<span className="text-sm font-normal text-zinc-400">/mo</span>
      </p>
      <button className="mt-4 w-full py-2 rounded-lg bg-gradient-to-br
        from-amber-400 to-yellow-300 text-black text-sm font-semibold">
        Choose plan
      </button>
    </div>
  )
}`,
  },
  {
    slug: 'file-drop-zone',
    name: 'File Drop Zone',
    category: 'Inputs',
    desc: 'A dashed drop target for drag-and-drop file uploads.',
    Demo: FileDropZone,
    code: `export function FileDropZone({ onDrop }) {
  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="py-8 rounded-xl border-2 border-dashed border-zinc-800
        hover:border-amber-400/50 flex flex-col items-center justify-center
        text-center transition-colors cursor-pointer"
    >
      <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800
        flex items-center justify-center mb-2 text-amber-400">↑</div>
      <p className="text-xs font-medium">Drop files here</p>
      <p className="text-[11px] text-zinc-500 mt-0.5">or click to browse</p>
    </div>
  )
}`,
  },
  {
    slug: 'testimonial-card',
    name: 'Testimonial Card',
    category: 'Cards',
    desc: 'A quote card with avatar, name, and role for social proof.',
    Demo: TestimonialCard,
    code: `export function TestimonialCard({ quote, name, role }) {
  return (
    <div className="w-64 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
      <p className="text-[13px] text-white leading-relaxed">"{quote}"</p>
      <div className="flex items-center gap-2.5 mt-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-lime-400" />
        <div>
          <p className="text-xs font-semibold text-white">{name}</p>
          <p className="text-[11px] text-zinc-500">{role}</p>
        </div>
      </div>
    </div>
  )
}`,
  },
  {
    slug: 'stepper',
    name: 'Stepper',
    category: 'Data display',
    desc: 'A multi-step progress indicator for forms and onboarding flows.',
    Demo: Stepper,
    code: `export function Stepper({ steps, active }) {
  return (
    <div className="flex items-center">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={
              'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ' +
              (i < active ? 'bg-lime-400 text-black'
                : i === active ? 'bg-amber-400 text-black'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-500')
            }>
              {i < active ? '✓' : i + 1}
            </div>
            <span className="text-[10px] text-zinc-400 mt-1.5">{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={'w-10 h-px mx-1 -mt-4 ' + (i < active ? 'bg-lime-400' : 'bg-zinc-800')} />
          )}
        </div>
      ))}
    </div>
  )
}`,
  },
  {
    slug: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'Overlays',
    desc: 'A simple click-triggered dropdown with a list of actions.',
    Demo: DropdownMenu,
    code: `import { useState } from 'react'

export function DropdownMenu({ items, onSelect }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800
          text-sm text-white flex items-center gap-2"
      >
        Actions <span className="text-zinc-500 text-xs">▾</span>
      </button>
      {open && (
        <div className="absolute top-11 left-0 w-40 rounded-lg border
          border-zinc-800 bg-zinc-900 overflow-hidden shadow-xl">
          {items.map((it) => (
            <div
              key={it}
              onClick={() => { onSelect?.(it); setOpen(false) }}
              className="px-3.5 py-2.5 text-[13px] text-zinc-400
                hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              {it}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}`,
  },
  {
    slug: 'rating-stars',
    name: 'Rating Stars',
    category: 'Inputs',
    desc: 'A clickable star rating input with amber highlight.',
    Demo: RatingStars,
    code: `import { useState } from 'react'

export function RatingStars({ defaultValue = 4, max = 5, onChange }) {
  const [rating, setRating] = useState(defaultValue)
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => { setRating(n); onChange?.(n) }}
          className={
            'text-2xl leading-none transition-colors ' +
            (n <= rating ? 'text-amber-400' : 'text-zinc-800')
          }
        >
          ★
        </button>
      ))}
    </div>
  )
}`,
  },
  {
    slug: 'chat-bubble',
    name: 'Chat Bubble',
    category: 'Data display',
    desc: 'Two-tone message bubbles for a chat or DM interface.',
    Demo: ChatBubble,
    code: `export function ChatBubble({ received, sent }) {
  return (
    <div className="flex flex-col gap-2 w-56">
      <div className="self-start bg-zinc-900 border border-zinc-800
        rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-[13px] text-white
        max-w-[85%]">
        {received}
      </div>
      <div className="self-end bg-gradient-to-br from-amber-400 to-yellow-300
        text-black rounded-2xl rounded-br-sm px-3.5 py-2.5 text-[13px]
        font-medium max-w-[85%]">
        {sent}
      </div>
    </div>
  )
}`,
  },
  {
    slug: 'skeleton-loader',
    name: 'Skeleton Loader',
    category: 'Data display',
    desc: 'A shimmering placeholder for content that is still loading.',
    Demo: SkeletonLoader,
    code: `export function SkeletonLoader() {
  return (
    <div className="w-56 space-y-3">
      <div className="h-24 rounded-xl bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full
          animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent
          via-white/5 to-transparent" />
      </div>
      <div className="h-3 w-3/4 rounded bg-zinc-900" />
      <div className="h-3 w-1/2 rounded bg-zinc-900" />
    </div>
  )
}

/* add to CSS:
@keyframes shimmer { 100% { transform: translateX(100%); } } */`,
  },
  {
    slug: 'timeline',
    name: 'Timeline',
    category: 'Data display',
    desc: 'A vertical timeline for order status or activity history.',
    Demo: Timeline,
    code: `export function Timeline({ events }) {
  return (
    <div className="w-56">
      {events.map((e, i) => (
        <div key={e.title} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={
              'w-2.5 h-2.5 rounded-full ' +
              (i === events.length - 1 ? 'bg-amber-400' : 'bg-lime-400')
            } />
            {i < events.length - 1 && <div className="w-px flex-1 bg-zinc-800" />}
          </div>
          <div className="pb-5">
            <p className="text-[13px] text-white font-medium">{e.title}</p>
            <p className="text-[11px] text-zinc-500">{e.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}`,
  },
  {
    slug: 'liquid-glass-button',
    name: 'Liquid Glass Button',
    category: 'Buttons',
    desc: 'A frosted glass button with a soft ambient glow behind it.',
    Demo: LiquidGlassButton,
    code: `export function LiquidGlassButton() {
  return (
    <button className="relative px-6 py-3 rounded-full text-sm
      font-semibold text-white overflow-hidden backdrop-blur-xl
      bg-white/5 border border-white/15
      shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]
      hover:bg-white/10 transition-colors">
      <span className="relative z-10">Continue</span>
      <span className="absolute -inset-8 bg-gradient-to-br
        from-amber-400/20 via-transparent to-lime-400/20 blur-2xl" />
    </button>
  )
}`,
  },
  {
    slug: 'orbit-timeline',
    name: 'Orbit Timeline',
    category: 'Timelines',
    desc: 'Milestones arranged in orbit around a center point, computed from angle degrees.',
    Demo: OrbitTimeline,
    code: `export function OrbitTimeline({ items, radius = 70, center = 70 }) {
  return (
    <div className="relative" style={{ width: center * 2, height: center * 2 }}>
      <div className="absolute inset-0 rounded-full border border-dashed border-zinc-800" />
      <div className="absolute inset-0 flex items-center justify-center
        text-[11px] font-mono text-zinc-400">core</div>
      {items.map((it) => {
        const rad = (it.deg * Math.PI) / 180
        const x = center + radius * Math.cos(rad)
        const y = center + radius * Math.sin(rad)
        return (
          <div
            key={it.label}
            className="absolute w-9 h-9 -ml-4.5 -mt-4.5 rounded-full
              bg-zinc-900 border border-amber-400/40 flex items-center
              justify-center text-[9px] font-semibold text-amber-400"
            style={{ left: x, top: y }}
          >
            {it.label}
          </div>
        )
      })}
    </div>
  )
}`,
  },
  {
    slug: 'empty-state',
    name: 'Empty State',
    category: 'Data display',
    desc: 'A friendly placeholder for a list or page with no content yet.',
    Demo: EmptyState,
    code: `export function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="py-10 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-2xl bg-zinc-900 border
        border-zinc-800 flex items-center justify-center mb-4 text-xl">📭</div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="text-xs text-zinc-400 mt-1 max-w-[200px]">{description}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 rounded-lg bg-amber-400 text-black
            text-xs font-semibold"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}`,
  },
  {
    slug: 'link-preview-card',
    name: 'Link Preview Card',
    category: 'Overlays',
    desc: 'A hover-triggered preview card that appears above an inline link.',
    Demo: LinkPreviewCard,
    code: `import { useState } from 'react'

export function LinkPreview({ label, title, url }) {
  const [hover, setHover] = useState(false)
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <a className="text-amber-400 underline underline-offset-4 text-sm">{label}</a>
      {hover && (
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-48
          rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden
          shadow-2xl">
          <div className="h-20 bg-gradient-to-br from-amber-400/30 to-lime-400/20" />
          <div className="p-2.5">
            <p className="text-[11px] font-semibold text-white">{title}</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">{url}</p>
          </div>
        </div>
      )}
    </span>
  )
}`,
  },
  {
    slug: 'comparison-table',
    name: 'Comparison Table',
    category: 'Data display',
    desc: 'A compact feature comparison grid between two columns.',
    Demo: ComparisonTable,
    code: `export function ComparisonTable({ rows, leftLabel, rightLabel }) {
  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden text-xs">
      <div className="grid grid-cols-3 bg-zinc-900 border-b
        border-zinc-800 font-semibold text-white">
        <div className="p-2.5"> </div>
        <div className="p-2.5 text-center text-zinc-500">{leftLabel}</div>
        <div className="p-2.5 text-center text-amber-400">{rightLabel}</div>
      </div>
      {rows.map((r) => (
        <div key={r} className="grid grid-cols-3 border-b border-zinc-800
          last:border-0 text-zinc-400">
          <div className="p-2.5">{r}</div>
          <div className="p-2.5 text-center text-zinc-500">–</div>
          <div className="p-2.5 text-center text-lime-400">✓</div>
        </div>
      ))}
    </div>
  )
}`,
  },
  ...registry2,
]
