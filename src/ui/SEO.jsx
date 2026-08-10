import { Helmet } from 'react-helmet-async'
import { useLocation, useParams } from 'react-router-dom'
import { registry } from '../data/registry'

const SITE = 'https://compo-orikushraz-5181s-projects.vercel.app'
const DEFAULT_TITLE = 'compo_ - copy-paste UI components for React + Tailwind'
const DEFAULT_DESC = 'Live-preview React + Tailwind components. Copy the code, ship it. 48+ free components: buttons, cards, loaders, forms, and more.'

export function SEO() {
  const location = useLocation()
  const params = useParams()
  const path = location.pathname
  const url = SITE + path

  let title = DEFAULT_TITLE
  let description = DEFAULT_DESC
  let jsonLd = null

  if (path === '/docs') {
    title = 'Documentation - compo_'
    description = 'How to use compo: find a component, copy the code, paste it into your React + Tailwind project. No install, no account.'
  } else if (path.startsWith('/components/') && params.slug) {
    const item = registry.find((c) => c.slug === params.slug)
    if (item) {
      title = `${item.name} - compo_ (${item.category})`
      description = `${item.desc} Free copy-paste React + Tailwind component. No install required.`
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: item.name,
        description: item.desc,
        programmingLanguage: 'JSX',
        codeSampleType: 'snippet',
        runtimePlatform: 'React',
        url,
        isPartOf: {
          '@type': 'WebSite',
          name: 'compo_',
          url: SITE,
        },
        license: 'https://opensource.org/licenses/MIT',
      }
    } else {
      title = 'Component not found - compo_'
      description = DEFAULT_DESC
    }
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="compo_" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
