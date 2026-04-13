import { Link } from 'react-router-dom'
import { getPageName } from '../../seo/siteSeo'

type BreadcrumbNavProps = {
  pathname: string
}

export function BreadcrumbNav({ pathname }: BreadcrumbNavProps) {
  if (pathname === '/') {
    return null
  }

  const pageName = getPageName(pathname)

  return (
    <nav aria-label="Breadcrumb" className="content-shell breadcrumb-nav">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li aria-current="page">{pageName}</li>
      </ol>
    </nav>
  )
}
