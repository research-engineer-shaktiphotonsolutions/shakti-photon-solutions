import { media } from '../lib/mediaPaths'

export const PRIMARY_ORIGIN = 'https://shakti-photon-solutions.lovable.app'
export const LEGACY_ORIGINS = [
  'https://www.shaktiphotonsolutions.com',
  'https://shaktiphotonsolutions.com',
]
export const SITE_NAME = 'Shakti Photon Solutions | Green Hydrogen'
const ORGANIZATION_NAME = 'Shakti Photon Solutions'
const DEFAULT_OG_IMAGE = media.missionVisual
const DEFAULT_KEYWORDS =
  'shakti photon solutions, green hydrogen, hydrogen generator, electrolyzer systems, pem electrolyzer, aem electrolyzer, alkaline electrolyzer, pem fuel cells, carbon harvesting, co2 recycling, hydrogen r&d workstations, clean energy engineering, india hydrogen company'
const DEFAULT_GOOGLEBOT = 'index, follow'
const DEFAULT_GOOGLE = 'notranslate'
const DEFAULT_GEO_REGION = 'IN'
const DEFAULT_GEO_PLACENAME = 'India'
const DEFAULT_LANGUAGE = 'en-IN'
const DEFAULT_COUNTRY = 'India'
const DEFAULT_OG_LOCALE = 'en_IN'

type JsonLd = Record<string, unknown>

type SeoRoute = {
  path: string
  title: string
  description: string
  keywords?: string
  pageName: string
  noindex?: boolean
  ogType?: 'website' | 'article'
  changefreq?: 'weekly' | 'monthly'
  priority?: string
  schemas?: JsonLd[]
}

const homeSchemas: JsonLd[] = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: PRIMARY_ORIGIN,
    logo: `${PRIMARY_ORIGIN}${media.logo}`,
    sameAs: ['https://linkedin.com/company/shakti-photon-solutions-private-limited/'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-7382025117',
      contactType: 'customer support',
      areaServed: 'IN',
      availableLanguage: ['en'],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: ORGANIZATION_NAME,
    url: PRIMARY_ORIGIN,
    inLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What type of electrolyzers do you provide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We provide PEM, AEM, and alkaline electrolyzers with customizable power and flow configurations for industrial and research use.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you build fuel cell systems for R&D and teaching?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We offer compact fuel cell systems and configurable test platforms for universities, labs, and pilot deployments.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can Shakti Photon Solutions support custom hydrogen projects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our team supports custom engineering for hydrogen generation, CO2 reduction, and R&D workstations across industries and institutions.',
        },
      },
    ],
  },
]

const routeDefinitions: SeoRoute[] = [
  {
    path: '/',
    title: 'Shakti Photon Solutions | Green Hydrogen',
    description:
      'Shakti Photon Solutions develops on-site hydrogen generators, electrolyzers, and CO2 recycling systems for clean, efficient industrial and research energy applications.',
    keywords:
      'shakti photon solutions, green hydrogen, on-site hydrogen generators, industrial electrolyzers, co2 recycling systems, hydrogen energy india',
    pageName: 'Home',
    ogType: 'website',
    changefreq: 'weekly',
    priority: '1.0',
    schemas: homeSchemas,
  },
  {
    path: '/solutions',
    title: 'EPC Hydrogen and Carbon Harvesting Solutions | Shakti Photon Solutions',
    description:
      'Explore EPC solutions for hydrogen production, carbon harvesting, and renewable energy integration designed for scalable industrial deployment.',
    keywords:
      'hydrogen epc solutions, carbon harvesting solutions, renewable hydrogen integration, hydrogen project engineering, clean energy epc india',
    pageName: 'Solutions',
    changefreq: 'weekly',
    priority: '0.9',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Hydrogen and Carbon Harvesting EPC Solutions',
        provider: {
          '@type': 'Organization',
          name: ORGANIZATION_NAME,
          url: PRIMARY_ORIGIN,
        },
      },
    ],
  },
  {
    path: '/electrolyzers',
    title: 'PEM, AEM and Alkaline Electrolyzers | Shakti Photon Solutions',
    description:
      'Discover customizable PEM, AEM, and alkaline electrolyzer systems from 0.01 kW to 100 kW for hydrogen generation and CO2 reduction.',
    keywords:
      'pem electrolyzer, aem electrolyzer, alkaline electrolyzer, hydrogen generation systems, industrial electrolyzers india, lab electrolyzers',
    pageName: 'Electrolyzers',
    changefreq: 'weekly',
    priority: '0.9',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Industrial and R&D Electrolyzers',
        brand: {
          '@type': 'Brand',
          name: ORGANIZATION_NAME,
        },
        category: 'Hydrogen Electrolyzer',
      },
    ],
  },
  {
    path: '/fuelcells',
    title: 'PEM Fuel Cell Solutions for Mobility and Backup Power | Shakti Photon Solutions',
    description:
      'Shakti Photon Solutions provides PEM fuel cells for drones, backup systems, and heavy-duty mobility with custom stack designs.',
    keywords:
      'pem fuel cells, fuel cell stacks, drone fuel cells, backup power fuel cells, hydrogen mobility power systems',
    pageName: 'Fuel Cells',
    changefreq: 'weekly',
    priority: '0.9',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'PEM Fuel Cell Systems',
        brand: {
          '@type': 'Brand',
          name: ORGANIZATION_NAME,
        },
        category: 'Fuel Cell',
      },
    ],
  },
  {
    path: '/r-d-work-stations',
    title: 'Hydrogen and Catalyst R&D Workstations | Shakti Photon Solutions',
    description:
      'Access catalyst discovery, process development, and electrochemical R&D workstations for academic and industrial innovation programs.',
    keywords:
      'hydrogen r&d workstations, catalyst discovery workstation, electrochemical process development, research lab hydrogen systems, university hydrogen equipment',
    pageName: 'R&D Work Stations',
    changefreq: 'weekly',
    priority: '0.8',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'R&D Electrochemical Workstations',
        brand: {
          '@type': 'Brand',
          name: ORGANIZATION_NAME,
        },
        category: 'Scientific Research Equipment',
      },
    ],
  },
  {
    path: '/team',
    title: 'Leadership and Research Team | Shakti Photon Solutions',
    description:
      'Meet the founders, research leaders, and advisors building advanced hydrogen and sustainable energy systems at Shakti Photon Solutions.',
    keywords:
      'shakti photon team, hydrogen experts, energy researchers, clean technology leadership, shakti photon advisors',
    pageName: 'Team',
    changefreq: 'monthly',
    priority: '0.7',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Shakti Photon Solutions Team',
      },
    ],
  },
  {
    path: '/our-customers',
    title: 'Customers and Institutional Partners | Shakti Photon Solutions',
    description:
      'See the universities, labs, and energy innovators working with Shakti Photon Solutions on hydrogen and electrochemical technologies.',
    keywords:
      'hydrogen technology customers, institutional partners, university collaborations, research partners, clean energy clients india',
    pageName: 'Our Customers',
    changefreq: 'monthly',
    priority: '0.7',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Customer and Research Partners',
      },
    ],
  },
  {
    path: '/contact-us',
    title: 'Contact Shakti Photon Solutions | Hydrogen Project Consultation',
    description:
      'Contact Shakti Photon Solutions for hydrogen generators, fuel cells, R&D systems, and custom clean-energy engineering support.',
    keywords:
      'contact shakti photon solutions, hydrogen project consultation, electrolyzer inquiry, fuel cell inquiry, clean energy engineering support',
    pageName: 'Contact Us',
    changefreq: 'monthly',
    priority: '0.8',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Shakti Photon Solutions',
      },
    ],
  },
  {
    path: '/admin',
    title: 'Admin | Shakti Photon Solutions',
    description: 'Private admin area for internal content management.',
    keywords: 'shakti photon admin portal, internal content management',
    pageName: 'Admin',
    noindex: true,
  },
  {
    path: '/404',
    title: 'Page Not Found | Shakti Photon Solutions',
    description: 'The requested page could not be found.',
    keywords: 'shakti photon solutions page not found',
    pageName: 'Not Found',
    noindex: true,
  },
]

const routeMap = new Map(routeDefinitions.map((route) => [route.path, route]))

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/'
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function toAbsoluteUrl(pathname: string): string {
  return pathname === '/' ? PRIMARY_ORIGIN : `${PRIMARY_ORIGIN}${pathname}`
}

function buildBreadcrumbSchema(pathname: string, pageName: string): JsonLd | null {
  if (pathname === '/') return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: PRIMARY_ORIGIN,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageName,
        item: toAbsoluteUrl(pathname),
      },
    ],
  }
}

export type SeoModel = {
  pathname: string
  title: string
  description: string
  keywords: string
  canonical: string
  ogType: 'website' | 'article'
  ogImage: string
  ogLocale: string
  ogCountryName: string
  googlebot: string
  google: string
  geoRegion: string
  geoPlacename: string
  language: string
  country: string
  noindex: boolean
  pageName: string
  schemas: JsonLd[]
}

export function getSeoModel(pathname: string): SeoModel {
  const normalizedPath = normalizePath(pathname)
  const matchedRoute = routeMap.get(normalizedPath)
  const route = matchedRoute ?? routeMap.get('/404')!
  const canonicalPath = matchedRoute ? normalizedPath : '/404'
  const breadcrumbSchema = buildBreadcrumbSchema(canonicalPath, route.pageName)
  const schemas = route.schemas ? [...route.schemas] : []

  if (breadcrumbSchema) {
    schemas.push(breadcrumbSchema)
  }

  return {
    pathname: normalizedPath,
    title: route.title,
    description: route.description,
    keywords: route.keywords ?? DEFAULT_KEYWORDS,
    canonical: toAbsoluteUrl(canonicalPath),
    ogType: route.ogType ?? 'website',
    ogImage: `${PRIMARY_ORIGIN}${DEFAULT_OG_IMAGE}`,
    ogLocale: DEFAULT_OG_LOCALE,
    ogCountryName: DEFAULT_COUNTRY,
    googlebot: DEFAULT_GOOGLEBOT,
    google: DEFAULT_GOOGLE,
    geoRegion: DEFAULT_GEO_REGION,
    geoPlacename: DEFAULT_GEO_PLACENAME,
    language: DEFAULT_LANGUAGE,
    country: DEFAULT_COUNTRY,
    noindex: Boolean(route.noindex),
    pageName: route.pageName,
    schemas,
  }
}

export function getSeoHeadHtml(pathname: string): string {
  const seo = getSeoModel(pathname)
  const robotsValue = seo.noindex ? 'noindex, nofollow, noarchive' : 'index, follow, max-image-preview:large'

  const schemaTags = seo.schemas
    .map(
      (schema, index) =>
        `<script type="application/ld+json" data-seo-script="${index}">${JSON.stringify(schema)}</script>`,
    )
    .join('\n')

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<link rel="icon" href="/favicon.png" type="image/png" />`,
    `<meta name="application-name" content="${SITE_NAME}" />`,
    `<meta name="apple-mobile-web-app-title" content="${SITE_NAME}" />`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(seo.keywords)}" />`,
    `<meta name="robots" content="${robotsValue}" />`,
    `<meta name="googlebot" content="${seo.googlebot}" />`,
    `<meta name="google" content="${seo.google}" />`,
    `<meta name="geo.region" content="${seo.geoRegion}" />`,
    `<meta name="geo.placename" content="${seo.geoPlacename}" />`,
    `<meta name="language" content="${seo.language}" />`,
    `<meta name="country" content="${seo.country}" />`,
    `<link rel="canonical" href="${seo.canonical}" />`,
    `<meta property="og:type" content="${seo.ogType}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${seo.canonical}" />`,
    `<meta property="og:image" content="${seo.ogImage}" />`,
    `<meta property="og:locale" content="${seo.ogLocale}" />`,
    `<meta property="og:country-name" content="${seo.ogCountryName}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:url" content="${seo.canonical}" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${seo.ogImage}" />`,
    schemaTags,
  ]
    .filter(Boolean)
    .join('\n')
}

export const PUBLIC_SITEMAP_ROUTES = routeDefinitions
  .filter((route) => !route.noindex && route.path !== '/404')
  .map((route) => ({
    path: route.path,
    changefreq: route.changefreq ?? 'weekly',
    priority: route.priority ?? '0.7',
  }))

export function getSitemapXml(lastModifiedIso: string): string {
  const urlEntries = PUBLIC_SITEMAP_ROUTES.map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${toAbsoluteUrl(path)}</loc>
    <lastmod>${lastModifiedIso}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  ).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

export function getRobotsTxt(): string {
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /user
Disallow: /user/
Disallow: /profile
Disallow: /profile/
Disallow: /auth
Disallow: /auth/
Disallow: /api
Disallow: /api/
Disallow: /internal
Disallow: /internal/

Sitemap: ${PRIMARY_ORIGIN}/sitemap.xml`
}

export function getPageName(pathname: string): string {
  return getSeoModel(pathname).pageName
}
