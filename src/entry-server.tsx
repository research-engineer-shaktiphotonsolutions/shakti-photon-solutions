import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { PUBLIC_SITEMAP_ROUTES, getRobotsTxt, getSeoHeadHtml, getSitemapXml } from './seo/siteSeo'

export { PUBLIC_SITEMAP_ROUTES, getRobotsTxt, getSitemapXml }

export function render(url: string) {
  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )

  const headHtml = getSeoHeadHtml(url)
  return { appHtml, headHtml }
}
