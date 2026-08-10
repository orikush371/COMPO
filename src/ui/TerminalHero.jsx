import { useEffect, useState } from 'react'

const COMMANDS = [
  'npx compo add gradient-button',
  'npx compo add spotlight-card',
  'npx compo add progress-ring',
]

export function TerminalHero() {
  const [cmdIndex, setCmdIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const full = COMMANDS[cmdIndex]
    let t
    if (phase === 'typing') {
      if (text.length < full.length) {
        t = setTimeout(() => setText(full.slice(0, text.length + 1)), 38)
      } else {
        t = setTimeout(() => setPhase('pausing'), 1400)
      }
    } else if (phase === 'pausing') {
      t = setTimeout(() => setPhase('deleting'), 200)
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), 18)
      } else {
        setCmdIndex((cmdIndex + 1) % COMMANDS.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(t)
  }, [text, phase, cmdIndex])

  return (
    <div className="text-center pt-20 pb-14">
      <div className="inline-flex items-center gap-2 text-[12px] font-mono text-ink-dim bg-surface border border-border rounded-full px-3.5 py-1.5 mb-7">
        <span className="w-1.5 h-1.5 rounded-full bg-lime" />
        51 components shipped
      </div>
      <h1 className="text-[44px] sm:text-[58px] font-bold tracking-tight leading-[1.05]">
        Components you'd<br />
        <span className="bg-gradient-to-r from-amber to-lime bg-clip-text text-transparent">actually copy.</span>
      </h1>
      <p className="text-ink-dim text-[17px] mt-5 max-w-lg mx-auto leading-relaxed">
        Live previews, real code, no accounts. Built for React + Tailwind.
      </p>
      <div className="mt-9 max-w-md mx-auto rounded-xl border border-border bg-surface overflow-hidden text-left">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a30]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a30]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a30]" />
        </div>
        <div className="px-4 py-4 font-mono text-[13.5px]">
          <span className="text-lime">$</span> <span className="text-ink">{text}</span>
          <span className="caret text-amber">▍</span>
        </div>
      </div>
    </div>
  )
}
