import { useEffect } from 'react'
import { SITE_NAME, getSeoModel } from '../../seo/siteSeo'

type SeoHeadProps = {
  pathname: string
}

function upsertMeta(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attributeName}="${attributeValue}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attributeName, attributeValue)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }

  link.setAttribute('href', url)
}

export function SeoHead({ pathname }: SeoHeadProps) {
  useEffect(() => {
    const seo = getSeoModel(pathname)
    const robotsValue = seo.noindex ? 'noindex, nofollow, noarchive' : 'index, follow, max-image-preview:large'

    document.title = seo.title

    upsertMeta('name', 'application-name', SITE_NAME)
    upsertMeta('name', 'apple-mobile-web-app-title', SITE_NAME)
    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'keywords', seo.keywords)
    upsertMeta('name', 'robots', robotsValue)
    upsertMeta('name', 'googlebot', seo.googlebot)
    upsertMeta('name', 'google', seo.google)
    upsertMeta('name', 'geo.region', seo.geoRegion)
    upsertMeta('name', 'geo.placename', seo.geoPlacename)
    upsertMeta('name', 'language', seo.language)
    upsertMeta('name', 'country', seo.country)
    upsertCanonical(seo.canonical)

    upsertMeta('property', 'og:type', seo.ogType)
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:url', seo.canonical)
    upsertMeta('property', 'og:image', seo.ogImage)
    upsertMeta('property', 'og:locale', seo.ogLocale)
    upsertMeta('property', 'og:country-name', seo.ogCountryName)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:url', seo.canonical)
    upsertMeta('name', 'twitter:title', seo.title)
    upsertMeta('name', 'twitter:description', seo.description)
    upsertMeta('name', 'twitter:image', seo.ogImage)

    document
      .head
      .querySelectorAll('script[data-managed-seo="true"]')
      .forEach((script) => script.remove())

    seo.schemas.forEach((schema) => {
      const schemaTag = document.createElement('script')
      schemaTag.type = 'application/ld+json'
      schemaTag.dataset.managedSeo = 'true'
      schemaTag.text = JSON.stringify(schema)
      document.head.appendChild(schemaTag)
    })
  }, [pathname])

  return null
}
