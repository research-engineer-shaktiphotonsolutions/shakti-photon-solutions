import { Link } from 'react-router-dom'
import { media, resolveMediaPath } from '../../lib/mediaPaths'

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer-inner">
        <div className="contact-details">
          <h2>Corporate Offices:</h2>
          <ul>
            <li>IIT Madras Research Park, Chennai, Tamilnadu, India 600113.</li>
            <li>JC Bose Block, SRM University AP, Amaravathi, Guntur, Andhra Pradesh, India 522502.</li>
          </ul>

          <div className="contact-lines">
            <p className="contact-row">
              <span aria-hidden="true" className="row-icon">
                +
              </span>
              <a href="tel:+917382025117">+91 7382025117</a>
            </p>

            <p className="contact-row">
              <span aria-hidden="true" className="row-icon">
                @
              </span>
              <a href="mailto:info@shaktiphotonsolutions.com">info@shaktiphotonsolutions.com</a>
            </p>

            <p className="contact-row social-row">
              <a
                href="https://linkedin.com/company/shakti-photon-solutions-private-limited/"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="Visit Shakti Photon Solutions on LinkedIn"
              >
                in
              </a>
              <a
                href="https://linkedin.com/company/shakti-photon-solutions-private-limited/"
                target="_blank"
                rel="noreferrer"
                className="social-label"
              >
                Shakti Photon Solution
              </a>
            </p>
          </div>

          <div className="footer-links" aria-label="Important pages">
            <h3>Explore</h3>
            <ul>
              <li>
                <Link to="/solutions">Hydrogen and Carbon EPC Solutions</Link>
              </li>
              <li>
                <Link to="/electrolyzers">PEM, AEM and Alkaline Electrolyzers</Link>
              </li>
              <li>
                <Link to="/fuelcells">Fuel Cell Systems and Designs</Link>
              </li>
              <li>
                <Link to="/r-d-work-stations">Research and Development Work Stations</Link>
              </li>
              <li>
                <Link to="/our-customers">Customer and Institutional Partnerships</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="partner-badge">
          <p className="reg-mark">R</p>
          <img src={resolveMediaPath(media.partnerMark)} alt="Mark Enyz partner identity" loading="lazy" />
          <p className="partner-meta">GST: 37ABKCS1534R1ZN</p>
          <p className="partner-meta">PAN: ABKCS1534R</p>
        </div>
      </div>
    </footer>
  )
}
