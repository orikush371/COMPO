import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

// Set this once you have a real PayPal app. Client ID is public - safe to
// ship in frontend code. The matching Secret lives only in Supabase Edge
// Function secrets, never here.
const PAYPAL_CLIENT_ID = 'AcUfWpYqEh6tbpN37gJTSN-IAkrDpNNBA7X6wsbTbDrD_6baY19tuELz-exJ1T47JYuJLLmE87wZKsrS'

function loadPayPalScript() {
  return new Promise((resolve, reject) => {
    if (window.paypal) return resolve(window.paypal)
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`
    script.onload = () => resolve(window.paypal)
    script.onerror = reject
    document.body.appendChild(script)
  })
}

export function PayPalBuyButton({ templateSlug, priceLabel, onSuccess }) {
  const containerRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | loading | verifying | success | error
  const [email, setEmail] = useState('')
  const [showEmailPrompt, setShowEmailPrompt] = useState(false)

  useEffect(() => {
    if (PAYPAL_CLIENT_ID === 'YOUR_PAYPAL_CLIENT_ID') return // not configured yet
    if (!showEmailPrompt || !email || !containerRef.current) return

    let buttons
    loadPayPalScript().then((paypal) => {
      containerRef.current.innerHTML = ''
      buttons = paypal.Buttons({
        style: { layout: 'horizontal', height: 40 },
        createOrder: (data, actions) => {
          const amount = priceLabel.replace('$', '')
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }],
          })
        },
        onApprove: async (data) => {
          setStatus('verifying')
          const { data: fnData, error: fnError } = await supabase.functions.invoke(
            'verify-paypal-purchase',
            { body: { orderId: data.orderID, templateSlug, buyerEmail: email } }
          )
          if (fnError || fnData?.error) {
            setStatus('error')
            return
          }
          setStatus('success')
          onSuccess?.()
        },
        onError: () => setStatus('error'),
      })
      buttons.render(containerRef.current)
    })

    return () => buttons?.close?.()
  }, [showEmailPrompt, email, templateSlug, priceLabel, onSuccess])

  if (PAYPAL_CLIENT_ID === 'YOUR_PAYPAL_CLIENT_ID') {
    return (
      <button
        disabled
        className="w-full py-2 rounded-lg bg-surface-2 border border-border text-[12.5px] text-ink-faint cursor-not-allowed"
      >
        Purchasing coming soon
      </button>
    )
  }

  if (status === 'success') {
    return (
      <div className="w-full py-2 rounded-lg bg-lime/10 border border-lime/40 text-[12.5px] text-lime text-center font-medium">
        Purchased! Check your email.
      </div>
    )
  }

  if (!showEmailPrompt) {
    return (
      <button
        onClick={() => setShowEmailPrompt(true)}
        className="w-full py-2 rounded-lg bg-amber text-[#1a1200] text-[12.5px] font-semibold"
      >
        Buy for {priceLabel}
      </button>
    )
  }

  return (
    <div className="space-y-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full px-3 py-2 rounded-lg bg-surface-2 border border-border text-[12.5px] text-ink placeholder:text-ink-faint outline-none"
      />
      {status === 'verifying' && (
        <p className="text-[11.5px] text-ink-faint text-center">Verifying payment…</p>
      )}
      {status === 'error' && (
        <p className="text-[11.5px] text-red-400 text-center">Something went wrong. Try again.</p>
      )}
      <div ref={containerRef} />
    </div>
  )
}
