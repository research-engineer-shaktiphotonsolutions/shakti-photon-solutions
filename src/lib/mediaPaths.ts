import { getPublicMediaUrl } from './mediaRepository'

const mediaBase = '/assets/images/'

export const media = {
  logo: `${mediaBase}shared/0aa2fb_20f7fb02f96f448aa56341259c9e2b04_mv2.png-Logo_WIth_Whitebox.png`,
  missionVisual: `${mediaBase}home/0aa2fb_85d0761ab7534293ba0714700d628256_mv2.jpg-Picture_1_edited.jpg`,
  eventShowcase: `${mediaBase}home/0aa2fb_0ccbb51197c84c969128ca98fe3434b2_mv2.jpg-IMG_0485_JPG.jpg`,
  customerGallery: [
    `${mediaBase}home/0aa2fb_8312b2d81a214aa78d071780abedf288_mv2.jpg-0aa2fb_8312b2d81a214aa78d071780abedf288_mv2.jpg`,
    `${mediaBase}home/0aa2fb_852b91ee8e3f465c8108cf7da29c019c_mv2.jpg-0aa2fb_852b91ee8e3f465c8108cf7da29c019c_mv2.jpg`,
    `${mediaBase}home/0aa2fb_ed443e16ed1d4e409050a7b2625628cc_mv2.jpg-0aa2fb_ed443e16ed1d4e409050a7b2625628cc_mv2.jpg`,
  ],
  partnerMark: `${mediaBase}shared/0aa2fb_7c1bf2a3111945b29e1aa80851b237d8_mv2.png-Screenshot_2024-12-07_at_11_10_edited.png`,
}

export function resolveMediaPath(path: string): string {
  const storagePath = path.replace(/^\/assets\/images\//, '').replace(/^[^/]+\//, '')
  return getPublicMediaUrl(storagePath) ?? path
}

export function resolveDisplayMediaPath(path: string): string {
  const normalized = path.trim()
  if (!normalized) return ''

  if (/^(https?:\/\/|data:|blob:)/i.test(normalized)) {
    return normalized
  }

  return resolveMediaPath(normalized)
}
