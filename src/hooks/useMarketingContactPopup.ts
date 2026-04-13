import { useCallback, useEffect, useState } from 'react'

type UseMarketingContactPopupOptions = {
  enabled: boolean
}

const STORAGE_KEY = 'sps:marketing-contact-popup:dismissed-at'
const SHOW_DELAY_MS = 2000
const COOLDOWN_MS = 12 * 60 * 60 * 1000

function canShowPopup(): boolean {
  if (typeof window === 'undefined') return false

  const dismissedAtRaw = window.localStorage.getItem(STORAGE_KEY)
  if (!dismissedAtRaw) return true

  const dismissedAt = Number(dismissedAtRaw)
  if (!Number.isFinite(dismissedAt)) return true

  return Date.now() - dismissedAt > COOLDOWN_MS
}

function hasRecentDismissal(): boolean {
  if (typeof window === 'undefined') return false

  const dismissedAtRaw = window.localStorage.getItem(STORAGE_KEY)
  if (!dismissedAtRaw) return false

  const dismissedAt = Number(dismissedAtRaw)
  if (!Number.isFinite(dismissedAt)) return false

  return Date.now() - dismissedAt <= COOLDOWN_MS
}

export function useMarketingContactPopup({ enabled }: UseMarketingContactPopupOptions) {
  const [visible, setVisible] = useState(false)
  const [showLauncher, setShowLauncher] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setVisible(false)
      setShowLauncher(false)
      return
    }

    if (!canShowPopup()) {
      setVisible(false)
      setShowLauncher(hasRecentDismissal())
      return
    }

    const timer = setTimeout(() => {
      setVisible(true)
      setShowLauncher(false)
    }, SHOW_DELAY_MS)

    return () => clearTimeout(timer)
  }, [enabled])

  const dismiss = useCallback(() => {
    setVisible(false)
    setShowLauncher(true)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()))
    }
  }, [])

  const reopen = useCallback(() => {
    setVisible(true)
    setShowLauncher(false)
  }, [])

  return { visible, showLauncher, dismiss, reopen }
}