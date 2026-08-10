import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../ui/AuthContext'

export default function Auth() {
  const [mode, setMode] = useState('sign-in') // 'sign-in' | 'sign-up'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)
  const { signInWithEmail, signUpWithEmail, signInWithGitHub, user } = useAuth()
  const navigate = useNavigate()

  if (user) {
    navigate('/account')
    return null
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setInfo('')
    setBusy(true)
    const { error: err } =
      mode === 'sign-in' ? await signInWithEmail(email, password) : await signUpWithEmail(email, password)
    setBusy(false)
    if (err) {
      setError(err.message)
    } else if (mode === 'sign-up') {
      setInfo('Check your email to confirm your account.')
    } else {
      navigate('/account')
    }
  }

  async function onGitHub() {
    setError('')
    const { error: err } = await signInWithGitHub()
    if (err) setError(err.message)
  }

  return (
    <div className="max-w-sm mx-auto px-6 pb-24 pt-16">
      <h1 className="text-[26px] font-bold tracking-tight text-center mb-1">
        {mode === 'sign-in' ? 'Sign in' : 'Create account'}
      </h1>
      <p className="text-ink-dim text-[13.5px] text-center mb-8">
        Sign in to submit components or manage your templates.
      </p>

      <button
        onClick={onGitHub}
        className="w-full py-2.5 rounded-lg bg-surface-2 border border-border text-[13.5px] text-ink font-medium flex items-center justify-center gap-2 hover:border-border-hi transition-colors mb-4"
      >
        Continue with GitHub
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[11px] text-ink-faint">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-2 border border-border text-[13.5px] text-ink placeholder:text-ink-faint outline-none"
        />
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-2 border border-border text-[13.5px] text-ink placeholder:text-ink-faint outline-none"
        />
        {error && <p className="text-[12.5px] text-red-400">{error}</p>}
        {info && <p className="text-[12.5px] text-lime">{info}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full py-2.5 rounded-lg bg-amber text-[#1a1200] text-[13.5px] font-semibold disabled:opacity-60"
        >
          {busy ? 'Please wait...' : mode === 'sign-in' ? 'Sign in' : 'Create account'}
        </button>
      </form>

      <p className="text-center text-[12.5px] text-ink-dim mt-5">
        {mode === 'sign-in' ? "Don't have an account? " : 'Already have an account? '}
        <button
          onClick={() => {
            setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')
            setError('')
            setInfo('')
          }}
          className="text-amber underline underline-offset-2"
        >
          {mode === 'sign-in' ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </div>
  )
}
