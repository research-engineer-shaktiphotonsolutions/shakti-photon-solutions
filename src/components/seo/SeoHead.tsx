import { useEffect } from 'react'
import { getSeoModel } from '../../seo/siteSeo'

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

    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'robots', robotsValue)
    upsertCanonical(seo.canonical)

    upsertMeta('property', 'og:type', seo.ogType)
    upsertMeta('property', 'og:site_name', 'Shakti Photon Solutions')
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:url', seo.canonical)
    upsertMeta('property', 'og:image', seo.ogImage)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
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
