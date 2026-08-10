const SHORTCUTS = [
  { keys: ['⌘', 'K'], desc: 'Open the command menu (search + actions)' },
  { keys: ['↑', '↓'], desc: 'Move through results in the command menu' },
  { keys: ['↵'], desc: 'Select the highlighted result' },
  { keys: ['ESC'], desc: 'Close the command menu' },
  { keys: ['?'], desc: 'Open this shortcuts page' },
]

export default function Shortcuts() {
  return (
    <div className="max-w-2xl mx-auto px-6 pb-24">
      <div className="pt-12 pb-8">
        <p className="text-[12px] font-mono text-amber uppercase tracking-wider mb-2">Reference</p>
        <h1 className="text-[32px] font-bold tracking-tight">Keyboard shortcuts</h1>
        <p className="text-ink-dim mt-2 text-[15px]">Every shortcut compo supports.</p>
      </div>
      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        {SHORTCUTS.map((s, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-5 py-3.5 border-b border-border last:border-0"
          >
            <span className="text-[13.5px] text-ink-dim">{s.desc}</span>
            <span className="flex items-center gap-1">
              {s.keys.map((k, j) => (
                <kbd
                  key={j}
                  className="px-2 py-1 rounded-md bg-surface-2 border border-border text-[11px] font-mono text-ink"
                >
                  {k}
                </kbd>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
