import { useCallback, useRef, useState } from 'react'

let notifyCdnFallback: (() => void) | null = null

export function triggerCdnFallbackNotification(): void {
  notifyCdnFallback?.()
}

export function useCdnFallbackPopup() {
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const notify = useCallback(() => {
    setCount((current) => current + 1)
    setVisible(true)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => setVisible(false), 500)
  }, [])

  notifyCdnFallback = notify

  const dismiss = useCallback(() => {
    setVisible(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }, [])

  return { visible, count, dismiss }
}
