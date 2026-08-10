import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Component demo crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-2 text-center p-6">
          <span className="text-xl">⚠</span>
          <p className="text-[12px] text-ink-faint">This preview failed to render.</p>
        </div>
      )
    }
    return this.props.children
  }
}
