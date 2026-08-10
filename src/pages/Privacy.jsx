export default function Privacy() {
  return (
    <div className="max-w-2xl mx-auto px-6 pb-24">
      <div className="pt-12 pb-8">
        <p className="text-[12px] font-mono text-amber uppercase tracking-wider mb-2">Legal</p>
        <h1 className="text-[32px] font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-ink-dim mt-2 text-[13.5px]">Last updated: August 2026</p>
      </div>

      <div className="space-y-8 text-[13.5px] text-ink-dim leading-relaxed">
        <section>
          <h2 className="text-[15px] font-semibold text-ink mb-2">What we collect</h2>
          <p>
            Browsing and copying components never requires an account and collects nothing.
            If you create an account, we store your email address and a securely hashed
            password (or your GitHub profile ID if you sign in with GitHub). If you purchase
            a template, we store the email you provide and a record of the PayPal order for
            receipt and support purposes.
          </p>
        </section>

        <section>
          <h2 className="text-[15px] font-semibold text-ink mb-2">Local device storage</h2>
          <p>
            Favorites, recently-viewed components, and your theme preference are stored only
            in your browser's local storage. They never leave your device and are not visible
            to us.
          </p>
        </section>

        <section>
          <h2 className="text-[15px] font-semibold text-ink mb-2">Payments</h2>
          <p>
            Payments are processed entirely by PayPal. We never see or store your card or
            PayPal account details. We only receive confirmation that an order was completed,
            the amount, and the email address you provided at checkout.
          </p>
        </section>

        <section>
          <h2 className="text-[15px] font-semibold text-ink mb-2">Component uploads</h2>
          <p>
            If you submit a component for the marketplace, we store the code you submit,
            your account email, and basic metadata (name, category, description). Submissions
            are reviewed before they're published.
          </p>
        </section>

        <section>
          <h2 className="text-[15px] font-semibold text-ink mb-2">Analytics</h2>
          <p>
            We use Vercel Analytics, a privacy-focused analytics service that does not use
            cookies and does not track individuals across sites.
          </p>
        </section>

        <section>
          <h2 className="text-[15px] font-semibold text-ink mb-2">Advertising</h2>
          <p>
            This site may display Google AdSense ads. Google may use cookies to serve ads
            based on your visits to this and other sites. You can opt out of personalized
            advertising through Google's Ad Settings.
          </p>
        </section>

        <section>
          <h2 className="text-[15px] font-semibold text-ink mb-2">Your data</h2>
          <p>
            You can request deletion of your account and associated data at any time by
            contacting us. Purchase records are kept as required for accounting and legal
            purposes even after account deletion.
          </p>
        </section>

        <section>
          <h2 className="text-[15px] font-semibold text-ink mb-2">Contact</h2>
          <p>
            Questions about this policy or your data can be sent to the contact listed on our
            Docs page.
          </p>
        </section>
      </div>
    </div>
  )
}
