import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { PUBLIC_SITEMAP_ROUTES, getRobotsTxt, getSitemapXml, render } = await import('./dist/server/entry-server.js')

const routesToPrerender = [...PUBLIC_SITEMAP_ROUTES.map((route) => route.path), '/404']

;(async () => {
  for (const routeUrl of routesToPrerender) {
    const { appHtml, headHtml } = render(routeUrl)
    const html = template.replace('<!--seo-head-->', headHtml).replace('<!--app-html-->', appHtml)

    const filePath = `dist${routeUrl === '/' ? '/index' : routeUrl}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }

  const lastModifiedIso = new Date().toISOString().split('T')[0]
  fs.writeFileSync(toAbsolute('dist/sitemap.xml'), getSitemapXml(lastModifiedIso))
  fs.writeFileSync(toAbsolute('dist/robots.txt'), getRobotsTxt())
  console.log('generated: dist/sitemap.xml')
  console.log('generated: dist/robots.txt')
})()
