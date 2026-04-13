import { Link, NavLink } from 'react-router-dom'
import { media, resolveMediaPath } from '../../lib/mediaPaths'

export function SiteHeader() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" to="/" aria-label="Shakti Photon Solutions home">
          <img
            src={resolveMediaPath(media.logo)}
            alt="Shakti Photon Solutions Private Limited"
            className="brand-logo"
            loading="eager"
          />
        </Link>

        <nav aria-label="Primary navigation" className="primary-nav">
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/solutions">Solutions</NavLink>
            </li>
            <li>
              <NavLink to="/electrolyzers">Electrolyzers</NavLink>
            </li>
            <li>
              <NavLink to="/fuelcells">Fuel cells</NavLink>
            </li>
            <li>
              <NavLink to="/r-d-work-stations">R&amp;D Work Stations</NavLink>
            </li>
            <li>
              <NavLink to="/team">Team</NavLink>
            </li>
            <li className="more-item">
              <span className="more-trigger">More</span>
              <ul className="more-dropdown" aria-label="More pages">
                <li>
                  <NavLink to="/our-customers">Our Customers</NavLink>
                </li>
                <li>
                  <NavLink to="/contact-us">Contact Us</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
