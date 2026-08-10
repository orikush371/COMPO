import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../ui/AuthContext'
import { supabase } from '../lib/supabase'

const CATEGORIES = [
  'Buttons', 'Cards', 'Badges', 'Inputs', 'Avatars', 'Overlays', 'Data display',
  'Timelines', 'Accordions', 'Alerts', 'Checkboxes', 'Radio Groups', 'Search Bars',
  'Selects', 'Paginations', 'Popovers', 'Profiles', 'Sidebars', 'Sign Ins',
  'Sliders', 'Spinner Loaders', 'Tables', 'Tabs', 'Tags', 'Notifications',
  'Grids & Bento', 'Links', 'Charts', 'Date Pickers', 'File Uploads', 'Steppers',
]

const STATUS_LABEL = {
  pending: 'Pending review',
  approved: 'Approved',
  rejected: 'Rejected',
}

const STATUS_CLASS = {
  pending: 'text-amber bg-amber/10 border-amber/25',
  approved: 'text-lime bg-lime/10 border-lime/30',
  rejected: 'text-red-400 bg-red-400/10 border-red-400/25',
}

export default function Account() {
  const { user, loading, signOut } = useAuth()
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState([])
  const [loadingSubs, setLoadingSubs] = useState(true)

  const [name, setName] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitBusy, setSubmitBusy] = useState(false)

  useEffect(() => {
    if (!loading && !user) navigate('/auth')
  }, [loading, user, navigate])

  useEffect(() => {
    if (!user) return
    supabase
      .from('submissions')
      .select('id, name, category, status, created_at, rejection_reason')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setSubmissions(data ?? [])
        setLoadingSubs(false)
      })
  }, [user])

  if (!user) return null

  async function onSubmitComponent(e) {
    e.preventDefault()
    setSubmitError('')
    setSubmitBusy(true)

    // Server-side rate limiting + moderation queueing happens in the
    // submit-component edge function, not here. The client only gathers input.
    const { data, error } = await supabase.functions.invoke('submit-component', {
      body: { name, category, description, code },
    })
    setSubmitBusy(false)

    if (error || data?.error) {
      setSubmitError(data?.error || error?.message || 'Something went wrong.')
      return
    }

    setName('')
    setDescription('')
    setCode('')
    setSubmissions((prev) => [data.submission, ...prev])
  }

  return (
    <div className="max-w-2xl mx-auto px-6 pb-24 pt-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-[12px] font-mono text-amber uppercase tracking-wider mb-1">Account</p>
          <h1 className="text-[26px] font-bold tracking-tight">{user.email}</h1>
        </div>
        <button
          onClick={() => signOut()}
          className="px-3.5 py-2 rounded-lg bg-surface-2 border border-border text-[12.5px] text-ink-dim hover:text-ink transition-colors"
        >
          Sign out
        </button>
      </div>

      <section className="mb-12">
        <h2 className="text-[13px] font-semibold text-ink mb-4">Submit a component</h2>
        <form onSubmit={onSubmitComponent} className="space-y-3">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Component name"
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-2 border border-border text-[13px] text-ink placeholder:text-ink-faint outline-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-2 border border-border text-[13px] text-ink outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="One-sentence description"
            rows={2}
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-2 border border-border text-[13px] text-ink placeholder:text-ink-faint outline-none resize-none"
          />
          <textarea
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your React + Tailwind component code here"
            rows={10}
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-2 border border-border text-[12.5px] font-mono text-ink placeholder:text-ink-faint outline-none resize-none"
          />
          {submitError && <p className="text-[12.5px] text-red-400">{submitError}</p>}
          <button
            type="submit"
            disabled={submitBusy}
            className="px-4 py-2 rounded-lg bg-amber text-[#1a1200] text-[13px] font-semibold disabled:opacity-60"
          >
            {submitBusy ? 'Submitting...' : 'Submit for review'}
          </button>
          <p className="text-[11.5px] text-ink-faint">
            Submissions are reviewed before publishing. Max 5 pending submissions at a time.
          </p>
        </form>
      </section>

      <section>
        <h2 className="text-[13px] font-semibold text-ink mb-4">Your submissions</h2>
        {loadingSubs ? (
          <p className="text-[12.5px] text-ink-faint">Loading...</p>
        ) : submissions.length === 0 ? (
          <p className="text-[12.5px] text-ink-faint">You haven't submitted anything yet.</p>
        ) : (
          <div className="space-y-2">
            {submissions.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-surface"
              >
                <div>
                  <p className="text-[13px] font-medium text-ink">{s.name}</p>
                  <p className="text-[11.5px] text-ink-faint">{s.category}</p>
                  {s.status === 'rejected' && s.rejection_reason && (
                    <p className="text-[11.5px] text-red-400 mt-1">{s.rejection_reason}</p>
                  )}
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${STATUS_CLASS[s.status]}`}>
                  {STATUS_LABEL[s.status]}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
