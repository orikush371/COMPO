import {
  Accordion, AlertBanner, CheckboxList, RadioGroup, SearchBar, SelectDropdown,
  Pagination, Popover, ProfileCard, SidebarNav, SignInForm, RangeSlider,
  SpinnerLoader, DataTable, TabsDemo, TagInput, NotificationBell, BentoGrid,
  Breadcrumbs, KanbanCard, OrbLoaderGallery,
  BarChart, DatePicker, FileUploadProgress, StepWizard,
} from '../ui/demos2'

export const registry2 = [
  {
    slug: 'accordion',
    name: 'Accordion',
    category: 'Accordions',
    desc: 'Collapsible sections where only one panel is open at a time.',
    Demo: Accordion,
    code: `import { useState } from 'react'

export function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      {items.map((it, i) => (
        <div key={it.title} className="border-b border-zinc-800 last:border-0">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full flex items-center justify-between px-4 py-3
              text-left text-[13px] font-medium text-white"
          >
            {it.title}
            <span className={'text-zinc-500 transition-transform ' + (open === i ? 'rotate-45' : '')}>+</span>
          </button>
          {open === i && (
            <div className="px-4 pb-3 text-[12.5px] text-zinc-400">{it.body}</div>
          )}
        </div>
      ))}
    </div>
  )
}`,
  },
  {
    slug: 'alert-banner',
    name: 'Alert Banner',
    category: 'Alerts',
    desc: 'An inline warning banner with an icon and short message.',
    Demo: AlertBanner,
    code: `export function AlertBanner({ title, description }) {
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-xl
      bg-amber-400/10 border border-amber-400/25">
      <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center
        justify-center text-[11px] font-bold text-black flex-shrink-0 mt-0.5">!</div>
      <div>
        <p className="text-[13px] font-semibold text-white">{title}</p>
        <p className="text-[12px] text-zinc-400 mt-0.5">{description}</p>
      </div>
    </div>
  )
}`,
  },
  {
    slug: 'checkbox-list',
    name: 'Checkbox List',
    category: 'Checkboxes',
    desc: 'A stacked list of checkboxes for settings or preferences.',
    Demo: CheckboxList,
    code: `import { useState } from 'react'

export function CheckboxList({ items, defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked ?? items.map(() => false))
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((it, i) => (
        <label key={it} className="flex items-center gap-2.5 cursor-pointer">
          <span
            onClick={() => setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)))}
            className={
              'w-[18px] h-[18px] rounded flex items-center justify-center text-[10px] font-bold ' +
              (checked[i] ? 'bg-amber-400 text-black' : 'bg-zinc-900 border border-zinc-800')
            }
          >
            {checked[i] && '✓'}
          </span>
          <span className="text-[13px] text-zinc-400">{it}</span>
        </label>
      ))}
    </div>
  )
}`,
  },
  {
    slug: 'radio-group',
    name: 'Radio Group',
    category: 'Radio Groups',
    desc: 'A single-select group of radio options with a custom dot indicator.',
    Demo: RadioGroup,
    code: `import { useState } from 'react'

export function RadioGroup({ options, defaultValue }) {
  const [val, setVal] = useState(defaultValue ?? options[0])
  return (
    <div className="flex flex-col gap-2.5">
      {options.map((o) => (
        <label key={o} className="flex items-center gap-2.5 cursor-pointer" onClick={() => setVal(o)}>
          <span className={
            'w-4 h-4 rounded-full border-2 flex items-center justify-center ' +
            (val === o ? 'border-amber-400' : 'border-zinc-700')
          }>
            {val === o && <span className="w-2 h-2 rounded-full bg-amber-400" />}
          </span>
          <span className="text-[13px] text-zinc-400 capitalize">{o}</span>
        </label>
      ))}
    </div>
  )
}`,
  },
  {
    slug: 'search-bar',
    name: 'Search Bar',
    category: 'Search Bars',
    desc: 'A rounded search field with a focus ring on the border.',
    Demo: SearchBar,
    code: `export function SearchBar({ placeholder, onChange }) {
  return (
    <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl
      bg-zinc-900 border border-zinc-800 focus-within:border-amber-400/50
      transition-colors">
      <span className="text-zinc-500 text-sm">⌕</span>
      <input
        placeholder={placeholder}
        onChange={onChange}
        className="bg-transparent outline-none text-[13px] text-white
          placeholder:text-zinc-500 w-full"
      />
    </div>
  )
}`,
  },
  {
    slug: 'select-dropdown',
    name: 'Select Dropdown',
    category: 'Selects',
    desc: 'A custom select trigger with a list that opens on click.',
    Demo: SelectDropdown,
    code: `import { useState } from 'react'

export function SelectDropdown({ options, defaultValue }) {
  const [open, setOpen] = useState(false)
  const [val, setVal] = useState(defaultValue ?? options[0])
  return (
    <div className="relative w-40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3.5 py-2.5
          rounded-lg bg-zinc-900 border border-zinc-800 text-[13px] text-white"
      >
        {val} <span className="text-zinc-500 text-xs">▾</span>
      </button>
      {open && (
        <div className="absolute top-11 left-0 w-full rounded-lg border
          border-zinc-800 bg-zinc-900 overflow-hidden shadow-xl z-10">
          {options.map((o) => (
            <div
              key={o}
              onClick={() => { setVal(o); setOpen(false) }}
              className="px-3.5 py-2.5 text-[13px] text-zinc-400
                hover:bg-black hover:text-white cursor-pointer"
            >
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}`,
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    category: 'Paginations',
    desc: 'Numbered page navigation with previous and next controls.',
    Demo: Pagination,
    code: `import { useState } from 'react'

export function Pagination({ pageCount, defaultPage = 1 }) {
  const [page, setPage] = useState(defaultPage)
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm"
      >‹</button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => setPage(n)}
          className={
            'w-8 h-8 rounded-lg text-sm font-medium ' +
            (page === n ? 'bg-amber-400 text-black' : 'bg-zinc-900 border border-zinc-800 text-zinc-400')
          }
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => setPage(Math.min(pageCount, page + 1))}
        className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm"
      >›</button>
    </div>
  )
}`,
  },
  {
    slug: 'popover',
    name: 'Popover',
    category: 'Popovers',
    desc: 'A click-triggered panel anchored to a button.',
    Demo: Popover,
    code: `import { useState } from 'react'

export function Popover({ triggerLabel, title, body }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white"
      >
        {triggerLabel}
      </button>
      {open && (
        <div className="absolute top-11 left-0 w-52 p-3.5 rounded-xl
          border border-zinc-800 bg-zinc-900 shadow-2xl z-10">
          <p className="text-[12.5px] font-semibold text-white mb-1">{title}</p>
          <p className="text-[11.5px] text-zinc-500">{body}</p>
        </div>
      )}
    </div>
  )
}`,
  },
  {
    slug: 'profile-card',
    name: 'Profile Card',
    category: 'Profiles',
    desc: 'A compact user card with avatar, name, role, and a follow action.',
    Demo: ProfileCard,
    code: `export function ProfileCard({ name, role, onFollow }) {
  return (
    <div className="w-60 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br
        from-amber-400 to-lime-400 mx-auto mb-3" />
      <p className="text-[14px] font-semibold text-white">{name}</p>
      <p className="text-[12px] text-zinc-500">{role}</p>
      <button
        onClick={onFollow}
        className="mt-3 px-4 py-1.5 rounded-lg bg-black border border-zinc-800 text-[12px] text-white"
      >
        Follow
      </button>
    </div>
  )
}`,
  },
  {
    slug: 'sidebar-nav',
    name: 'Sidebar Nav',
    category: 'Sidebars',
    desc: 'A vertical navigation list with an active item highlight.',
    Demo: SidebarNav,
    code: `export function SidebarNav({ items }) {
  return (
    <div className="w-40 rounded-xl border border-zinc-800 bg-zinc-900 p-2 flex flex-col gap-1">
      {items.map((it) => (
        <div
          key={it.label}
          className={
            'px-3 py-2 rounded-lg text-[12.5px] font-medium ' +
            (it.active ? 'bg-amber-400/15 text-amber-400' : 'text-zinc-400')
          }
        >
          {it.label}
        </div>
      ))}
    </div>
  )
}`,
  },
  {
    slug: 'sign-in-form',
    name: 'Sign In Form',
    category: 'Sign Ins',
    desc: 'A minimal email and password sign in card.',
    Demo: SignInForm,
    code: `export function SignInForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="w-64 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
      <p className="text-[14px] font-semibold text-white mb-3">Sign in</p>
      <div className="space-y-2">
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 text-[12px] text-white placeholder:text-zinc-500"
        />
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 text-[12px] text-white placeholder:text-zinc-500"
        />
      </div>
      <button className="mt-3 w-full py-2 rounded-lg bg-amber-400 text-black text-[13px] font-semibold">
        Continue
      </button>
    </form>
  )
}`,
  },
  {
    slug: 'range-slider',
    name: 'Range Slider',
    category: 'Sliders',
    desc: 'A native range input styled with the accent color.',
    Demo: RangeSlider,
    code: `import { useState } from 'react'

export function RangeSlider({ label, defaultValue = 50 }) {
  const [val, setVal] = useState(defaultValue)
  return (
    <div className="w-56">
      <div className="flex justify-between text-[11px] text-zinc-500 mb-1.5">
        <span>{label}</span><span>{val}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full accent-amber-400"
      />
    </div>
  )
}`,
  },
  {
    slug: 'spinner-loader',
    name: 'Spinner Loader',
    category: 'Spinner Loaders',
    desc: 'A rotating ring spinner built with a single border trick.',
    Demo: SpinnerLoader,
    code: `export function SpinnerLoader({ size = 32 }) {
  return (
    <div
      className="rounded-full border-2 border-zinc-800 border-t-amber-400 animate-spin"
      style={{ width: size, height: size }}
    />
  )
}`,
  },
  {
    slug: 'data-table',
    name: 'Data Table',
    category: 'Tables',
    desc: 'A compact table with a header row and simple borders between rows.',
    Demo: DataTable,
    code: `export function DataTable({ columns, rows }) {
  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden text-[12px]">
      <div className="grid bg-zinc-900 font-semibold text-white px-3.5 py-2"
        style={{ gridTemplateColumns: 'repeat(' + columns.length + ', 1fr)' }}>
        {columns.map((c) => <span key={c}>{c}</span>)}
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className="grid px-3.5 py-2 text-zinc-400 border-t border-zinc-800"
          style={{ gridTemplateColumns: 'repeat(' + columns.length + ', 1fr)' }}
        >
          {r.map((cell, j) => <span key={j}>{cell}</span>)}
        </div>
      ))}
    </div>
  )
}`,
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    category: 'Tabs',
    desc: 'A two tab switcher with an underline indicator on the active tab.',
    Demo: TabsDemo,
    code: `import { useState } from 'react'

export function Tabs({ tabs, panels, defaultTab }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0])
  return (
    <div>
      <div className="flex border-b border-zinc-800">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={
              'px-4 py-2 text-[12.5px] font-medium capitalize border-b-2 -mb-px ' +
              (active === t ? 'border-amber-400 text-white' : 'border-transparent text-zinc-500')
            }
          >
            {t}
          </button>
        ))}
      </div>
      <div className="p-4 text-[12.5px] text-zinc-400">{panels[active]}</div>
    </div>
  )
}`,
  },
  {
    slug: 'tag-input',
    name: 'Tag Input',
    category: 'Tags',
    desc: 'A field that renders existing tags as chips and appends new ones.',
    Demo: TagInput,
    code: `import { useState } from 'react'

export function TagInput({ defaultTags = [] }) {
  const [tags, setTags] = useState(defaultTags)
  return (
    <div className="flex flex-wrap gap-1.5 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
      {tags.map((t) => (
        <span key={t} className="flex items-center gap-1 px-2 py-1 rounded-md
          bg-amber-400/15 text-amber-400 text-[11px] font-medium">
          {t}
          <span onClick={() => setTags(tags.filter((x) => x !== t))} className="cursor-pointer opacity-70">×</span>
        </span>
      ))}
      <input
        placeholder="Add tag…"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value) {
            setTags([...tags, e.target.value])
            e.target.value = ''
          }
        }}
        className="bg-transparent outline-none text-[12px] text-white
          placeholder:text-zinc-500 flex-1 min-w-[60px]"
      />
    </div>
  )
}`,
  },
  {
    slug: 'notification-bell',
    name: 'Notification Bell',
    category: 'Notifications',
    desc: 'A bell icon button with an unread count badge.',
    Demo: NotificationBell,
    code: `export function NotificationBell({ count }) {
  return (
    <div className="relative w-10 h-10 rounded-full bg-zinc-900
      border border-zinc-800 flex items-center justify-center text-zinc-400">
      🔔
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full
          bg-amber-400 text-[8px] font-bold text-black flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  )
}`,
  },
  {
    slug: 'bento-grid',
    name: 'Bento Grid',
    category: 'Grids & Bento',
    desc: 'An asymmetric grid of tiles with one large featured cell.',
    Demo: BentoGrid,
    code: `export function BentoGrid() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-2 h-36">
      <div className="col-span-2 row-span-2 rounded-xl bg-zinc-900
        border border-zinc-800 flex items-end p-2.5">
        <span className="text-[11px] text-zinc-400">Analytics</span>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-amber-400 to-lime-400" />
      <div className="rounded-xl bg-zinc-900 border border-zinc-800" />
    </div>
  )
}`,
  },
  {
    slug: 'breadcrumbs',
    name: 'Breadcrumbs',
    category: 'Links',
    desc: 'A path indicator showing the current page location.',
    Demo: Breadcrumbs,
    code: `export function Breadcrumbs({ parts }) {
  return (
    <div className="flex items-center gap-1.5 text-[12.5px]">
      {parts.map((p, i) => (
        <span key={p} className="flex items-center gap-1.5">
          <span className={i === parts.length - 1 ? 'text-white font-medium' : 'text-zinc-500'}>{p}</span>
          {i < parts.length - 1 && <span className="text-zinc-500">/</span>}
        </span>
      ))}
    </div>
  )
}`,
  },
  {
    slug: 'kanban-card',
    name: 'Kanban Card',
    category: 'Cards',
    desc: 'A task card for a kanban board, with a label, due date, and assignee.',
    Demo: KanbanCard,
    code: `export function KanbanCard({ label, title, due }) {
  return (
    <div className="w-52 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
      <span className="px-2 py-0.5 rounded-md bg-amber-400/15 text-amber-400 text-[10px] font-semibold">
        {label}
      </span>
      <p className="text-[13px] font-medium text-white mt-2">{title}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-[11px] text-zinc-500">{due}</span>
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-lime-400" />
      </div>
    </div>
  )
}`,
  },
{
    slug: 'orb-loader',
    name: 'Orb Loader',
    category: 'Spinner Loaders',
    desc: '10 dot-lattice sweep patterns (ripple, diagonal, comet, column, row, scramble, diamond, checker, spiral, flicker) in one component, plus square and diamond dot shapes.',
    Demo: OrbLoaderGallery,
    code: `const N = 3
const MID = (N - 1) / 2

const RING = (() => {
  const ring = []
  for (let x = 0; x < N; x++) ring.push([x, 0])
  for (let y = 1; y < N; y++) ring.push([N - 1, y])
  for (let x = N - 2; x >= 0; x--) ring.push([x, N - 1])
  for (let y = N - 2; y >= 1; y--) ring.push([0, y])
  return ring
})()
const RING_INDEX = new Map(RING.map(([x, y], i) => [x + ',' + y, i]))

// variant: 'ripple' | 'diagonal' | 'comet' | 'column' | 'row'
//        | 'scramble' | 'diamond' | 'checker' | 'spiral' | 'flicker'
function orbDelay(variant, x, y) {
  const dx = x - MID
  const dy = y - MID
  switch (variant) {
    case 'ripple':
      return Math.hypot(dx, dy) * 240 - (dx === 0 && dy === 0 ? 70 : 0)
    case 'diagonal':
      return ((x + y) / (2 * (N - 1))) * 900
    case 'comet': {
      const i = RING_INDEX.get(x + ',' + y)
      if (i === undefined) return 0
      return -(((RING.length - i) % RING.length) / RING.length) * 1100
    }
    case 'column':
      return (x / (N - 1)) * 700
    case 'row':
      return (y / (N - 1)) * 700
    case 'scramble': {
      const i = RING_INDEX.get(x + ',' + y)
      if (i === undefined) return 0
      return -(((i * 3) % RING.length) / RING.length) * 1100
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

// shape: 'circle' | 'square' | 'diamond'
export function OrbLoader({ variant = 'ripple', shape = 'circle', label = 'Thinking…', pill = true }) {
  const radius = shape === 'square' ? '20%' : shape === 'diamond' ? '0%' : '50%'
  const rotate = shape === 'diamond' ? 'rotate(45deg)' : 'none'

  const cells = []
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      cells.push({ key: x + '-' + y, left: x * 6, top: y * 6, delay: orbDelay(variant, x, y) })
    }
  }

  const dots = (
    <div className="relative" style={{ width: 20, height: 20 }}>
      {cells.map((c) => (
        <span
          key={c.key}
          className="absolute bg-amber-400"
          style={{
            width: 3, height: 3,
            left: c.left + 4, top: c.top + 4,
            borderRadius: radius,
            transform: rotate,
            opacity: 0.16,
            animation: 'orb-pulse 1.3s cubic-bezier(.66,0,.34,1) infinite',
            animationDelay: c.delay + 'ms',
          }}
        />
      ))}
    </div>
  )

  if (!pill) return dots
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 rounded-full bg-zinc-900 border border-zinc-800">
      {dots}
      <span className="text-[12px] text-zinc-400">{label}</span>
    </div>
  )
}

/* Usage:
   <OrbLoader variant="comet" shape="square" />
   <OrbLoader variant="spiral" pill={false} /> */

/* add to CSS:
@keyframes orb-pulse {
  0% { opacity: 0.16; transform: scale(1); }
  28% { opacity: 1; transform: scale(1.4); }
  56%, 100% { opacity: 0.16; transform: scale(1); }
} */`,
  },
  {
    slug: 'bar-chart',
    name: 'Bar Chart',
    category: 'Charts',
    desc: 'A minimal 5-bar chart built with plain divs and a gradient fill, no charting library.',
    Demo: BarChart,
    code: `export function BarChart({ data }) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="flex items-end gap-3 h-32">
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5">
          <div
            className="w-full rounded-t-md bg-gradient-to-t from-amber-400 to-lime-400"
            style={{ height: (d.value / max) * 100 + '%' }}
          />
          <span className="text-[10px] text-zinc-500">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

/* usage: <BarChart data={[{ label: 'Mon', value: 40 }, ...]} /> */`,
  },
  {
    slug: 'date-picker',
    name: 'Date Picker',
    category: 'Date Pickers',
    desc: 'A month calendar grid with a selectable day, header, and prev/next controls.',
    Demo: DatePicker,
    code: `import { useState } from 'react'

export function DatePicker({ month, year, daysInMonth, defaultDay }) {
  const [selected, setSelected] = useState(defaultDay)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  return (
    <div className="w-64 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
      <div className="flex items-center justify-between mb-3">
        <button className="text-zinc-500 text-sm px-1">\u2039</button>
        <span className="text-[13px] font-semibold text-white">{month} {year}</span>
        <button className="text-zinc-500 text-sm px-1">\u203a</button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={i} className="text-[10px] text-zinc-500 text-center py-1">{d}</span>
        ))}
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setSelected(d)}
            className={
              'text-[11px] rounded-md py-1.5 transition-colors ' +
              (d === selected ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:bg-black')
            }
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  )
}`,
  },
  {
    slug: 'file-upload-progress',
    name: 'File Upload Progress',
    category: 'File Uploads',
    desc: 'A file card with an animated progress bar, showing upload percentage and size.',
    Demo: FileUploadProgress,
    code: `export function FileUploadProgress({ fileName, fileType, sizeLabel, progress }) {
  return (
    <div className="w-64 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-amber-400/15 text-amber-400
          flex items-center justify-center text-[11px] font-bold flex-shrink-0">
          {fileType}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12.5px] text-white font-medium truncate">{fileName}</p>
          <p className="text-[10.5px] text-zinc-500">{progress}% \u00b7 {sizeLabel}</p>
        </div>
      </div>
      <div className="mt-2.5 h-1.5 rounded-full bg-black overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-lime-400 transition-all"
          style={{ width: progress + '%' }}
        />
      </div>
    </div>
  )
}`,
  },
  {
    slug: 'step-wizard',
    name: 'Multi-step Wizard',
    category: 'Steppers',
    desc: 'A form wizard shell with labeled steps, a progress bar, and back/next controls.',
    Demo: StepWizard,
    code: `import { useState } from 'react'

export function StepWizard({ steps }) {
  const [step, setStep] = useState(1)
  return (
    <div className="w-64 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
      <div className="flex items-center justify-between mb-3">
        {steps.map((s, i) => (
          <span
            key={s}
            className={'text-[11px] font-medium ' + (i + 1 === step ? 'text-amber-400' : 'text-zinc-500')}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="h-1 rounded-full bg-black overflow-hidden mb-3">
        <div
          className="h-full bg-amber-400 transition-all"
          style={{ width: (step / steps.length) * 100 + '%' }}
        />
      </div>
      <p className="text-[12px] text-zinc-400 mb-3">
        Step {step} of {steps.length}: {steps[step - 1]}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          className="flex-1 py-1.5 rounded-lg bg-black border border-zinc-800 text-[12px] text-zinc-400"
        >
          Back
        </button>
        <button
          onClick={() => setStep((s) => Math.min(steps.length, s + 1))}
          className="flex-1 py-1.5 rounded-lg bg-amber-400 text-black text-[12px] font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  )
}`,
  },
]
