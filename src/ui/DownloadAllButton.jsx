import { useState } from 'react'
import JSZip from 'jszip'
import { registry } from '../data/registry'

export function DownloadAllButton() {
  const [busy, setBusy] = useState(false)

  async function download() {
    setBusy(true)
    try {
      const zip = new JSZip()
      const readme = [
        '# compo_ - all components',
        '',
        `${registry.length} copy-paste React + Tailwind components.`,
        'Each file is self-contained. See https://compo-orikushraz-5181s-projects.vercel.app for live previews.',
        '',
      ].join('\n')
      zip.file('README.md', readme)
      const folder = zip.folder('components')
      registry.forEach((item) => {
        folder.file(`${item.slug}.jsx`, item.code)
      })
      const blob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'compo-components.zip'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      onClick={download}
      disabled={busy}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-2 border border-border text-ink text-sm font-medium hover:border-border-hi transition-colors disabled:opacity-60"
    >
      {busy ? 'Zipping…' : `Download all ${registry.length} as .zip`}
    </button>
  )
}
