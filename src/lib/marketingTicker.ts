export const DEFAULT_MARKETING_TICKER_TEXT =
  'Custom PEM, AEM and Alkaline Electrolyzers | On-Site Hydrogen Generation | CO2 to Fuel Innovation | R&D Platforms for Academia and Industry'

const MARKETING_TICKER_STORAGE_KEY = 'sps-marketing-ticker'

export function normalizeTickerText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

export function readStoredTickerText(): string {
  if (typeof window === 'undefined') return DEFAULT_MARKETING_TICKER_TEXT

  try {
    const stored = window.localStorage.getItem(MARKETING_TICKER_STORAGE_KEY)
    if (!stored) return DEFAULT_MARKETING_TICKER_TEXT

    const normalized = normalizeTickerText(stored)
    return normalized || DEFAULT_MARKETING_TICKER_TEXT
  } catch {
    return DEFAULT_MARKETING_TICKER_TEXT
  }
}

export function persistTickerText(value: string): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(MARKETING_TICKER_STORAGE_KEY, value)
  } catch {
    // Ignore storage failures (private mode / restricted environments).
  }
}
