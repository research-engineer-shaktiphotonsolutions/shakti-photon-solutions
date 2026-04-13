import { media } from './mediaPaths'

const HOME_MEDIA_STORAGE_KEY = 'sps-home-media-config-v1'

export type HomeMediaConfig = {
  missionVisual: string
  eventShowcase: string
  customerGallery: [string, string, string]
}

export type HomeImageEditorRenderers = {
  missionVisual?: React.ReactNode
  eventShowcase?: React.ReactNode
  customerGallery?: Array<React.ReactNode | null>
}

export type HomeImageSlotKey =
  | 'missionVisual'
  | 'eventShowcase'
  | 'customerGallery-0'
  | 'customerGallery-1'
  | 'customerGallery-2'

export function getDefaultHomeMediaConfig(): HomeMediaConfig {
  return {
    missionVisual: media.missionVisual,
    eventShowcase: media.eventShowcase,
    customerGallery: [
      media.customerGallery[0] ?? '',
      media.customerGallery[1] ?? '',
      media.customerGallery[2] ?? '',
    ],
  }
}

export function normalizeHomeMediaConfig(input: Partial<HomeMediaConfig> | null | undefined): HomeMediaConfig {
  const defaults = getDefaultHomeMediaConfig()
  const gallery = Array.isArray(input?.customerGallery)
    ? input.customerGallery
    : defaults.customerGallery

  return {
    missionVisual: (input?.missionVisual ?? defaults.missionVisual).trim(),
    eventShowcase: (input?.eventShowcase ?? defaults.eventShowcase).trim(),
    customerGallery: [
      (gallery[0] ?? defaults.customerGallery[0]).trim(),
      (gallery[1] ?? defaults.customerGallery[1]).trim(),
      (gallery[2] ?? defaults.customerGallery[2]).trim(),
    ],
  }
}

export function readStoredHomeMediaConfig(): HomeMediaConfig {
  if (typeof window === 'undefined') return getDefaultHomeMediaConfig()

  try {
    const stored = window.localStorage.getItem(HOME_MEDIA_STORAGE_KEY)
    if (!stored) return getDefaultHomeMediaConfig()

    const parsed = JSON.parse(stored) as Partial<HomeMediaConfig>
    return normalizeHomeMediaConfig(parsed)
  } catch {
    return getDefaultHomeMediaConfig()
  }
}

export function persistHomeMediaConfig(config: HomeMediaConfig): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(HOME_MEDIA_STORAGE_KEY, JSON.stringify(config))
  } catch {
    // Ignore storage failures (private mode / restricted environments).
  }
}

export function getHomeMediaSlotValue(config: HomeMediaConfig, key: HomeImageSlotKey): string {
  switch (key) {
    case 'missionVisual':
      return config.missionVisual
    case 'eventShowcase':
      return config.eventShowcase
    case 'customerGallery-0':
      return config.customerGallery[0]
    case 'customerGallery-1':
      return config.customerGallery[1]
    case 'customerGallery-2':
      return config.customerGallery[2]
    default:
      return ''
  }
}

export function setHomeMediaSlotValue(config: HomeMediaConfig, key: HomeImageSlotKey, value: string): HomeMediaConfig {
  const nextValue = value.trim()

  switch (key) {
    case 'missionVisual':
      return { ...config, missionVisual: nextValue }
    case 'eventShowcase':
      return { ...config, eventShowcase: nextValue }
    case 'customerGallery-0':
      return { ...config, customerGallery: [nextValue, config.customerGallery[1], config.customerGallery[2]] }
    case 'customerGallery-1':
      return { ...config, customerGallery: [config.customerGallery[0], nextValue, config.customerGallery[2]] }
    case 'customerGallery-2':
      return { ...config, customerGallery: [config.customerGallery[0], config.customerGallery[1], nextValue] }
    default:
      return config
  }
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
        return
      }

      reject(new Error('Could not read image file as text data.'))
    }
    reader.onerror = () => reject(new Error('Failed to read selected image.'))
    reader.readAsDataURL(file)
  })
}
