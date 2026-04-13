import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { LEGACY_ORIGINS, PRIMARY_ORIGIN } from './seo/siteSeo'

const TRACKING_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']

function normalizeUrlForCanonical() {
  const currentUrl = new URL(window.location.href)
  const currentOrigin = currentUrl.origin

  if (LEGACY_ORIGINS.includes(currentOrigin)) {
    const redirectUrl = `${PRIMARY_ORIGIN}${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`
    window.location.replace(redirectUrl)
    return
  }

  let changed = false
  for (const param of TRACKING_PARAMS) {
    if (currentUrl.searchParams.has(param)) {
      currentUrl.searchParams.delete(param)
      changed = true
    }
  }

  if (changed) {
    const normalized = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`
    window.history.replaceState({}, '', normalized)
  }
}

normalizeUrlForCanonical()

// Remove Lovable platform badge (injected dynamically by the hosting platform)
const LOVABLE_BADGE_IDS = ['lovable-badge-cta', 'lovable-badge-close']

function removeLovableBadge() {
  LOVABLE_BADGE_IDS.forEach(id => {
    const el = document.getElementById(id)
    if (el) el.remove()
  })
}

// Run immediately in case elements are already present
removeLovableBadge()

// Watch for dynamic injection and remove as soon as they appear
const badgeObserver = new MutationObserver(() => {
  removeLovableBadge()
})
badgeObserver.observe(document.body, { childList: true, subtree: true })

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (import.meta.env.PROD) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
