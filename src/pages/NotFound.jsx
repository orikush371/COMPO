import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <p className="text-[13px] font-mono text-amber mb-3">404</p>
      <h1 className="text-2xl font-bold tracking-tight">This page does not exist.</h1>
      <p className="text-ink-dim mt-3 text-[14.5px]">
        The component or page you are looking for was moved or never existed.
      </p>
      <Link
        to="/"
        className="inline-block mt-7 px-5 py-2.5 rounded-lg bg-amber text-[#1a1200] text-sm font-semibold"
      >
        Back to components
      </Link>
    </div>
  )
}
