export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'az', label: 'A–Z' },
  { value: 'za', label: 'Z–A' },
  { value: 'most-viewed', label: 'Most viewed' },
]

export function SortSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-[12.5px] text-ink-dim outline-none cursor-pointer hover:border-border-hi transition-colors"
    >
      {SORT_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
