import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="content-shell notfound-page">
      <h1>Page Not Found</h1>
      <p>
        The page you requested is not available. Explore the core sections below to continue.
      </p>

      <ul className="notfound-links">
        <li>
          <Link to="/solutions">Explore hydrogen and carbon EPC solutions</Link>
        </li>
        <li>
          <Link to="/electrolyzers">View PEM, AEM, and alkaline electrolyzers</Link>
        </li>
        <li>
          <Link to="/fuelcells">Review fuel cell systems for mobility and backup power</Link>
        </li>
        <li>
          <Link to="/contact-us">Contact the engineering team</Link>
        </li>
      </ul>
    </main>
  )
}
