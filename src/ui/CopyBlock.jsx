import { useState } from 'react'

export function CopyBlock({ label, code }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 bg-surface-2 rounded-t-2xl">
        <span className="text-[12px] font-mono text-ink-dim">{label}</span>
        <button
          onClick={copy}
          className={`text-[11.5px] font-medium px-2.5 py-1 rounded-md border transition-colors ${
            copied ? 'bg-lime/10 border-lime/40 text-lime copy-pop' : 'bg-bg border-border text-ink-dim hover:text-ink hover:border-border-hi'
          }`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-5 text-[13px] font-mono leading-[1.7] text-ink-dim overflow-x-auto">{code}</pre>
    </div>
  )
}
