import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CdnFallbackPopup } from './components/CdnFallbackPopup'
import { GeminiAssistantWidget } from './components/GeminiAssistantWidget'
import { MarketingContactPopup } from './components/MarketingContactPopup'
import { BreadcrumbNav } from './components/layout/BreadcrumbNav'
import { MarketingTicker } from './components/layout/MarketingTicker'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { SeoHead } from './components/seo/SeoHead'
import { useCdnFallbackPopup, triggerCdnFallbackNotification } from './hooks/useCdnFallbackPopup'
import { useMarketingContactPopup } from './hooks/useMarketingContactPopup'
import { useScrollReveal } from './hooks/useScrollReveal'
import {
  normalizeHomeMediaConfig,
  persistHomeMediaConfig,
  readStoredHomeMediaConfig,
  type HomeMediaConfig,
} from './lib/homeMedia'
import {
  DEFAULT_MARKETING_TICKER_TEXT,
  normalizeTickerText,
  persistTickerText,
  readStoredTickerText,
} from './lib/marketingTicker'
import { isSupabaseConfigured } from './lib/supabaseClient'
import { AdminAuth } from './components/AdminAuth'
import { AdminPage } from './pages/AdminPage'
import { ContactPage } from './pages/ContactPage'
import { CustomersPage } from './pages/CustomersPage'
import { ElectrolyzersPage } from './pages/ElectrolyzersPage'
import { FuelCellsPage } from './pages/FuelCellsPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { RDWorkstationsPage } from './pages/RDWorkstationsPage'
import { SolutionsPage } from './pages/SolutionsPage'
import { TeamPage } from './pages/TeamPage'
import './App.css'

function App() {
  const location = useLocation()
  const supabaseReady = isSupabaseConfigured()
  const cdnFallback = useCdnFallbackPopup()
  const marketingPopup = useMarketingContactPopup({
    enabled: location.pathname !== '/contact-us' && location.pathname !== '/admin',
  })
  const [tickerText, setTickerText] = useState(() => readStoredTickerText())
  const [homeMedia, setHomeMedia] = useState(() => readStoredHomeMediaConfig())

  const saveTickerText = useCallback((value: string) => {
    const normalized = normalizeTickerText(value) || DEFAULT_MARKETING_TICKER_TEXT
    setTickerText(normalized)
    persistTickerText(normalized)
  }, [])

  const saveHomeMedia = useCallback((config: HomeMediaConfig) => {
    const normalized = normalizeHomeMediaConfig(config)
    setHomeMedia(normalized)
    persistHomeMediaConfig(normalized)
  }, [])

  useScrollReveal(location.pathname)

  useEffect(() => {
    function handleImgError(event: Event) {
      const img = event.target as HTMLImageElement
      if (!img || img.tagName !== 'IMG') return

      const failedSrc = img.src
      if (!failedSrc.includes('supabase.co')) return

      const storageMatch = failedSrc.match(/\/object\/public\/[^/]+\/(.+)$/)
      if (!storageMatch) return

      const localPath = `/assets/images/${storageMatch[1]}`
      img.src = localPath
      triggerCdnFallbackNotification()
    }

    document.addEventListener('error', handleImgError, true)
    return () => document.removeEventListener('error', handleImgError, true)
  }, [])

  return (
    <div className="page">
      <SeoHead pathname={location.pathname} />

      {!supabaseReady && (
        <div className="supabase-banner" role="alert">
          ⚠ Supabase not configured – images are loading from local public folder.
          Add <code>VITE_SUPABASE_URL</code> &amp; <code>VITE_SUPABASE_ANON_KEY</code> to&nbsp;<code>.env</code>.
        </div>
      )}

      <SiteHeader />
      <MarketingTicker text={tickerText} />
      <BreadcrumbNav pathname={location.pathname} />

      <Routes>
        <Route path="/" element={<HomePage homeMedia={homeMedia} />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/electrolyzers" element={<ElectrolyzersPage />} />
        <Route path="/fuelcells" element={<FuelCellsPage />} />
        <Route path="/r-d-work-stations" element={<RDWorkstationsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/our-customers" element={<CustomersPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route
          path="/admin"
          element={(
            <AdminPage
              tickerText={tickerText}
              onSaveTickerText={saveTickerText}
              homeMedia={homeMedia}
              onSaveHomeMedia={saveHomeMedia}
            />
          )}
        />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <SiteFooter />
      <MarketingContactPopup
        visible={marketingPopup.visible}
        showLauncher={marketingPopup.showLauncher}
        onDismiss={marketingPopup.dismiss}
        onReopen={marketingPopup.reopen}
      />
      <GeminiAssistantWidget enabled={location.pathname !== '/admin'} />
      <CdnFallbackPopup visible={cdnFallback.visible} count={cdnFallback.count} onDismiss={cdnFallback.dismiss} />
    </div>
  )
}

export default App
