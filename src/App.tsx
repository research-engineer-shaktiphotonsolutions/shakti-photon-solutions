import { useEffect, useState, useRef, useCallback } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { getPublicMediaUrl } from './lib/mediaRepository'
import { isSupabaseConfigured } from './lib/supabaseClient'
import './App.css'

// ---------------------------------------------------------------------------
// Single grouped CDN-fallback notification popup
// ---------------------------------------------------------------------------
let _notifyCdnFallback: (() => void) | null = null

function useCdnFallbackPopup() {
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const notify = useCallback(() => {
    setCount((c) => c + 1)
    setVisible(true)
    // Reset auto-dismiss timer on each new fallback
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setVisible(false), 500)
  }, [])

  _notifyCdnFallback = notify

  const dismiss = useCallback(() => {
    setVisible(false)
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  return { visible, count, dismiss }
}

function CdnFallbackPopup({
  visible,
  count,
  onDismiss,
}: {
  visible: boolean
  count: number
  onDismiss: () => void
}) {
  if (!visible) return null
  return (
    <div className="cdn-popup" role="status" aria-live="polite">
      <div className="cdn-popup-icon">☁</div>
      <div className="cdn-popup-body">
        <p className="cdn-popup-title">Using local images</p>
        <p className="cdn-popup-sub">
          {count} image{count !== 1 ? 's' : ''} loaded from local storage
          — CDN unavailable
        </p>
      </div>
      <button
        className="cdn-popup-close"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Media resolution helpers
// ---------------------------------------------------------------------------
const mediaBase = '/assets/images/'

/** Returns the Supabase CDN URL when configured, otherwise null. */
function getSupabaseUrl(path: string): string | null {
  const storagePath = path.replace(/^\/assets\/images\//, '')
  return getPublicMediaUrl(storagePath)
}

/**
 * <MediaImage> – tries Supabase CDN first; on load error falls back to the
 * local public/ folder and fires a brief toast notification.
 */
type MediaImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** The canonical path, e.g. /assets/images/shared/logo.png */
  mediaSrc: string
}

function MediaImage({ mediaSrc, alt = '', ...rest }: MediaImageProps) {
  const supabaseUrl = getSupabaseUrl(mediaSrc)
  // If Supabase is configured use its URL, otherwise go straight to local
  const primarySrc = supabaseUrl ?? mediaSrc
  const [src, setSrc] = useState(primarySrc)

  const handleError = useCallback(() => {
    if (src !== mediaSrc) {
      // Already tried Supabase – fall back to local
      setSrc(mediaSrc)
      _notifyCdnFallback?.()
    }
  }, [src, mediaSrc])

  return <img {...rest} src={src} alt={alt} onError={handleError} />
}

// Pre-declared local image paths (used in multiple components)
const media = {
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

/**
 * resolveMediaPath – returns the Supabase CDN URL when configured, otherwise
 * the local public-folder path. Actual error-based fallback is handled by the
 * global image error listener installed in <App>.
 */
function resolveMediaPath(path: string): string {
  const storagePath = path.replace(/^\/assets\/images\//, '')
  return getPublicMediaUrl(storagePath) ?? path
}

function SiteHeader() {
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

function HomePage() {
  return (
    <main className="content-shell">
      <section className="mission reveal-on-scroll" id="our-mission" aria-labelledby="mission-title">
        <article className="mission-copy">
          <h1 id="mission-title">Our Mission</h1>
          <p>
            At <strong>Shakti Photon Solutions</strong>, we are revolutionizing energy solutions with
            our cutting-edge on-site hydrogen generators and on-site CO2 recycling units.
          </p>
          <p>
            Our technology is designed to deliver clean, efficient, and cost-effective hydrogen
            production using PEM, AEM and Alkaline electrolyzer technologies for industries
            including pharmaceuticals, chemicals, jewelry, and renewable energy applications.
          </p>

          <div className="mission-points" role="list" aria-label="Mission highlights">
            <p role="listitem">Convert CO2 into fuels such as CO, HCOOH, C2H4.</p>
            <p role="listitem">Convert biomass into CO and H2.</p>
            <p role="listitem">Produce H2 from direct seawater.</p>
          </div>

          <p>
            Our team specializes in integrating renewable energy sources including photovoltaic,
            wind, and hydropower with electrolyzers for hydrogen-based energy storage as well.
          </p>
        </article>

        <aside className="mission-visual" aria-label="Hydrogen generator showcase">
          <img
            src={resolveMediaPath(media.missionVisual)}
            alt="Onsite hydrogen generator and onsite CO2 recycling unit"
            loading="lazy"
          />
          <h2>Onsite Hydrogen Generator</h2>
          <h2>Onsite CO2 recycling unit</h2>
        </aside>
      </section>

      <section className="why-choose reveal-on-scroll" aria-labelledby="why-title">
        <h2 id="why-title">Why Choose Our Hydrogen Generators?</h2>
        <ul>
          <li>On-Demand Hydrogen Production: No need for storage or transportation.</li>
          <li>High Purity: Up to 99.999% pure hydrogen for critical applications.</li>
          <li>Energy-Efficient: Powered by renewable energy sources for zero-emission hydrogen.</li>
          <li>Compact and Scalable: Customizable solutions to meet varying industry demands.</li>
          <li>Smart Monitoring and Control: IoT-based real-time tracking and optimization.</li>
        </ul>

        <p>
          We are committed to providing safe, efficient, and innovative solutions for global
          industries, offering a diverse range of products such as Green hydrogen electrolyzers,
          reversible fuel cells, and R&amp;D-scale electrolyzers. Our mission extends to delivering
          state-of-the-art R&amp;D infrastructure tailored for academia and industry while offering
          cutting-edge green energy solutions for residential, industrial, and commercial sectors.
          Our solutions are meticulously crafted by a team of seasoned scientists with over 16 years
          of global research and industry expertise across Singapore, the USA, and Sweden,
          emphasizing a collaborative and forward-thinking approach.
        </p>

        <h2 id="our-technology">Our Technology</h2>
        <p>
          Our advanced PEM (Proton Exchange Membrane) electrolyzers ensure reliable hydrogen
          production with low maintenance and operational costs. Integrated with digital monitoring
          and automation, our systems provide seamless plug-and-play functionality for diverse
          industrial needs.
        </p>

        <h3>Applications of Our Hydrogen Generators</h3>
        <ul>
          <li>Pharmaceutical and Chemical Industries - Ultra-pure hydrogen for precision processes.</li>
          <li>Jewelry Manufacturing - Reliable hydrogen supply for smelting, refining, and processing.</li>
          <li>Fuel Cells and Energy Storage - Green hydrogen for clean power solutions.</li>
          <li>Industrial Gas Supply - On-site hydrogen generation reduces reliance on external suppliers.</li>
          <li>
            Hydrogen-Infused Water - Rich in antioxidants, promoting health benefits such as reduced
            inflammation, improved metabolism, enhanced athletic performance, and better
            cardiovascular health. Also used in skincare for hydration and agriculture to enhance
            plant growth and stress resistance.
          </li>
        </ul>
      </section>

      <section className="event-photo reveal-on-scroll" aria-label="Industrial showcase image">
        <img
          src={resolveMediaPath(media.eventShowcase)}
          alt="Shakti Photon Solutions presenting hydrogen technology at an event"
          loading="lazy"
        />
      </section>

      <section className="customer-gallery reveal-on-scroll" aria-label="Customer and event highlights">
        <ul>
          {media.customerGallery.map((image, index) => (
            <li key={image}>
              <img
                src={resolveMediaPath(image)}
                alt={`Shakti Photon Solutions customer collaboration ${index + 1}`}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

function SolutionsPage() {
  return (
    <main className="content-shell solutions-page">
      <h1>EPC Solutions</h1>
      <p className="solutions-intro">
        We are a team with a passionate scientific and business background, dedicated to serve you
        best.
      </p>

      <section className="solutions-grid reveal-on-scroll" aria-label="EPC categories">
        <article className="solution-card">
          <div className="solution-icon hydrogen-icon" aria-hidden="true">
            <span></span>
            <span></span>
          </div>
          <h2>Hydrogen</h2>
          <ul>
            <li>Electrolyzers (PEM, AEM, Alkaline)</li>
            <li>Fuelcell (PEM, SOFC)</li>
            <li>Hydrogen Storage.</li>
          </ul>
        </article>

        <article className="solution-card">
          <div className="solution-icon carbon-icon" aria-hidden="true"></div>
          <h2>Carbon Harvesting</h2>
          <ul>
            <li>Ethanol</li>
            <li>Methanol</li>
            <li>Aviation Turbine Fuel</li>
            <li>Syngas</li>
          </ul>
        </article>

        <article className="solution-card">
          <div className="solution-icon energy-icon" aria-hidden="true">
            <span></span>
            <span></span>
          </div>
          <h2>Energy</h2>
          <ul>
            <li>Wind</li>
            <li>Solar</li>
            <li>Compressed Air</li>
            <li>Fly Wheel</li>
            <li>Hydro Power</li>
          </ul>
        </article>
      </section>
    </main>
  )
}

function ElectrolyzersPage() {
  return (
    <main className="content-shell electrolyzer-page">
      <h1>Electrolyzers</h1>

      <section className="electrolyzer-hero reveal-on-scroll" aria-label="Electrolyzer overview">
        <article>
          <p>
            <strong>Hydrogen:</strong> We offer PEM (proton exchange), AEM (anion exchange) and
            Alkaline electrolyzers with customized water flow and bipolar plate designs for
            efficient electrolysis, with capacities ranging from 0.01 to 100 kW.
          </p>
          <p>
            <strong>CO2 to fuel:</strong> We offer CO2 reduction electrolyzers.
          </p>
          <p>CO2 into CO</p>
          <p>CO2 into Formic acid</p>
          <p>CO2 into Ethylene.</p>
        </article>
        <img
          src={resolveMediaPath('/assets/images/electrolyzers/0aa2fb_5c914aac142841d5814887d3fee4a52c_mv2.jpg-0aa2fb_5c914aac142841d5814887d3fee4a52c_mv2.jpg')}
          alt="Electrolyzer plate assembly"
          loading="lazy"
        />
      </section>

      <section className="electrolyzer-block stacks-section reveal-on-scroll">
        <h2>Electrolyzer stacks</h2>
        <div className="image-grid cols-3">
          <img
            src={resolveMediaPath('/assets/images/electrolyzers/0aa2fb_3359824f31c04f54bcbf9d1485cd63b5_mv2.png-7_stack_top.png')}
            alt="Electrolyzer stack model 7"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/electrolyzers/0aa2fb_3fb4b021017e4420b68e4f93d87907cc_mv2.png-15_stack_top.png')}
            alt="Electrolyzer stack model 15"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/electrolyzers/0aa2fb_621886650de1402d94cc444a711ebf73_mv2.png-0aa2fb_621886650de1402d94cc444a711ebf73_mv2.png')}
            alt="Advanced electrolyzer stack"
            loading="lazy"
          />
        </div>
      </section>

      <section className="electrolyzer-block bop-section reveal-on-scroll">
        <h2>Electrolyzer&apos;s with BOP</h2>
        <div className="image-grid cols-2">
          <img
            src={resolveMediaPath('/assets/images/electrolyzers/0aa2fb_fad5ab636a5e4fd88c2eb991bf6bdb8d_mv2.png-0aa2fb_fad5ab636a5e4fd88c2eb991bf6bdb8d_mv2.png')}
            alt="PEM generator with balance of plant diagram"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/electrolyzers/0aa2fb_005531545ac04fe6b57d79e72c52acb9_mv2.jpg-Student_Demo_Unit_green_hydrogen.jpg')}
            alt="Student demo unit green hydrogen"
            loading="lazy"
          />
        </div>
      </section>

      <section className="electrolyzer-block catalyst-section reveal-on-scroll">
        <h2>Electrolyzer&apos;s for development of new catalyst</h2>
        <div className="image-grid cols-3">
          <img
            src={resolveMediaPath('/assets/images/electrolyzers/0aa2fb_71dabc5fff3d4a99886a23d12a674f3df000.jpg-0aa2fb_71dabc5fff3d4a99886a23d12a674f3df000.jpg')}
            alt="Catalyst development single cell frame"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/electrolyzers/0aa2fb_86975920e0194cf69dd71aa4e621016a_mv2.jpg-Single_Cell_1.jpg')}
            alt="Single cell catalyst prototype"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/electrolyzers/0aa2fb_94cb7ddd90404b9d8714cf5cfc1662be_mv2.png-Electrolyzer_3.png')}
            alt="Electrolyzer catalyst plate pair"
            loading="lazy"
          />
        </div>
      </section>

      <section className="electrolyzer-block performance-section reveal-on-scroll">
        <h2>Stack performance test station</h2>
        <div className="image-grid cols-2">
          <img
            src={resolveMediaPath('/assets/images/electrolyzers/0aa2fb_3790b3016cfd4aa6b1df23c5089f53ff_mv2.jpg-0aa2fb_3790b3016cfd4aa6b1df23c5089f53ff_mv2.jpg')}
            alt="PEM hydrogen electrolyzer performance stacks"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/electrolyzers/0aa2fb_35298b8caa0442689ad32eddf218de64_mv2.jpg-R_D_PEM_Working_Station.jpg')}
            alt="R and D PEM working station"
            loading="lazy"
          />
        </div>
      </section>

      <section className="electrolyzer-block microgrid-section reveal-on-scroll">
        <h2>H2 Micro grid:Array of electrolyzers operation to balance grid</h2>
        <div className="image-grid cols-1">
          <img
            src={resolveMediaPath('/assets/images/electrolyzers/0aa2fb_fb7ecd8f9a764edfbca5460179f8c3d6_mv2.png-0aa2fb_fb7ecd8f9a764edfbca5460179f8c3d6_mv2.png')}
            alt="H2 micro grid array of electrolyzers"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  )
}

function FuelCellsPage() {
  return (
    <main className="content-shell fuelcells-page">
      <h1>Fuel Cell Solutions</h1>

      <section className="fuelcells-hero reveal-on-scroll" aria-label="Fuel cells overview">
        <article>
          <p>
            Our fuel cells efficiently convert hydrogen into electrical energy, offering reliable
            and clean power solutions. We provide customized PEM fuel cells with tailored hydrogen
            flow and bipolar plate designs (open and closed configurations for oxygen), available in
            capacities ranging from 1W to 100W.
          </p>

          <h2>Our advanced fuel cell technology powers:</h2>
          <ul>
            <li>
              Hydrogen-Powered Drones - Lightweight and high-efficiency solutions for extended
              flight time.
            </li>
            <li>
              Backup Power Systems - Reliable fuel cell solutions for residential and commercial
              power backup.
            </li>
            <li>
              Heavy-Duty Vehicles - Scalable fuel cell technology for trucks, buses, and trains,
              with capacities ranging from 1kW to 400kW.
            </li>
          </ul>

          <p>
            We specialize in custom fuel cell integration for diverse applications, ensuring high
            performance and efficiency.
          </p>
        </article>

        <img
          src={resolveMediaPath('/assets/images/fuelcells/0aa2fb_7d15fdf97f8b440480a3fba3870c8d21_mv2.png-0aa2fb_7d15fdf97f8b440480a3fba3870c8d21_mv2.png')}
          alt="Fuel cell plate stack concept"
          loading="lazy"
        />
      </section>

      <section className="fuelcells-block reveal-on-scroll">
        <h2>Fuel Cell Designs</h2>
        <div className="image-grid cols-2">
          <img
            src={resolveMediaPath('/assets/images/fuelcells/0aa2fb_1e1144e75db7418f8e0cc4bd8028e655_mv2.png-0aa2fb_1e1144e75db7418f8e0cc4bd8028e655_mv2.png')}
            alt="Fuel cell exploded bipolar plate"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/fuelcells/0aa2fb_c4d835655bf7482cb0e7a0f0823093fc_mv2.jpg-0aa2fb_c4d835655bf7482cb0e7a0f0823093fc_mv2.jpg')}
            alt="Machined fuel cell flow-field plate"
            loading="lazy"
          />
        </div>

        <div className="image-grid cols-2">
          <img
            src={resolveMediaPath('/assets/images/fuelcells/0aa2fb_11f90aee02cf470497f7dee792c442f9_mv2.png-0aa2fb_11f90aee02cf470497f7dee792c442f9_mv2.png')}
            alt="PEM fuel cell stack with tie rods"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/fuelcells/0aa2fb_a61697316aa949029116ac3d9a5200ab_mv2.png-0aa2fb_a61697316aa949029116ac3d9a5200ab_mv2.png')}
            alt="High power fuel cell stack module"
            loading="lazy"
          />
        </div>
      </section>

      <section className="fuelcells-block reveal-on-scroll">
        <h2>Fuelcell&apos;s for R&amp;D works as well as for teaching institutions</h2>
        <div className="image-grid cols-2">
          <img
            src={resolveMediaPath('/assets/images/fuelcells/0aa2fb_04af92351993425598659bbaacbc5c96_mv2.jpg-0aa2fb_04af92351993425598659bbaacbc5c96_mv2.jpg')}
            alt="R and D fuel cell test setup"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/fuelcells/0aa2fb_ac46eda98e1842a8a193a138968a4fbc_mv2.gif-0aa2fb_ac46eda98e1842a8a193a138968a4fbc_mv2.gif')}
            alt="Fuel cell operation demonstration"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  )
}

function RDWorkstationsPage() {
  return (
    <main className="content-shell rd-page">
      <h1>Customized Research and Development Products</h1>
      <p className="rd-subtitle">
        Catalyst Discovery R&amp;D Platform for Electrolyzer, Fuelcell, Gas-diffusion electrode.
      </p>

      <section className="rd-block reveal-on-scroll">
        <div className="image-grid cols-3">
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_d59fcd8fb61a4bb4af9212649e87103a_mv2.png-0aa2fb_d59fcd8fb61a4bb4af9212649e87103a_mv2.png')}
            alt="Catalyst discovery platform panel"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_4b27ca37e29742d59e6ae1cc66176c0f_mv2.png-0aa2fb_4b27ca37e29742d59e6ae1cc66176c0f_mv2.png')}
            alt="Membrane sample and fixture"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_8dcfd3a9f34f44bda86b6e3bff71b21bf000.jpg-0aa2fb_8dcfd3a9f34f44bda86b6e3bff71b21bf000.jpg')}
            alt="Catalyst bead morphology"
            loading="lazy"
          />
        </div>
      </section>

      <section className="rd-block reveal-on-scroll">
        <h2>Process Discovery R&amp;D platform</h2>
        <div className="image-grid cols-2">
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_69f8d2e6c9b44b2d8c9cb61e293186b2_mv2.png-0aa2fb_69f8d2e6c9b44b2d8c9cb61e293186b2_mv2.png')}
            alt="Process discovery CAD setup"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_6411ab33acd3486b8c9ec502540c4f7df000.jpg-0aa2fb_6411ab33acd3486b8c9ec502540c4f7df000.jpg')}
            alt="Process discovery bench"
            loading="lazy"
          />
        </div>
      </section>

      <section className="rd-block reveal-on-scroll">
        <h2>Photo-Electro-Chemical R&amp;D platform</h2>
        <div className="image-grid cols-1">
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_894462a7280c44bcb7a71af74e2afea4_mv2.jpg-Picture_1.jpg')}
            alt="Photo-electro-chemical platform"
            loading="lazy"
          />
        </div>
      </section>

      <section className="rd-block reveal-on-scroll">
        <h2>Electrolyzer Assembly Stress feedback R&amp;D platform</h2>
        <div className="image-grid cols-2">
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_f02cd5f950d34bc4b58c6d65e227eb38_mv2.jpg-R_D_electrolyzer_pic.jpg')}
            alt="Electrolyzer assembly stress feedback station"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_3425839455204853b833e469242e69d9_mv2.png-0aa2fb_3425839455204853b833e469242e69d9_mv2.png')}
            alt="Electrolyzer stress simulation and tooling"
            loading="lazy"
          />
        </div>
      </section>

      <section className="rd-block reveal-on-scroll">
        <h2>GDE based R&amp;D electrolyzer and Fuelcell</h2>
        <div className="image-grid cols-3">
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_42762d8ced484243b6e0d7e885651e74_mv2.png-0aa2fb_42762d8ced484243b6e0d7e885651e74_mv2.png')}
            alt="GDE based electrolyzer CAD"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_42ce603337bb41d59f39264d4f7f5dcc_mv2.png-0aa2fb_42ce603337bb41d59f39264d4f7f5dcc_mv2.png')}
            alt="GDE channel plate pattern"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_e70b158d80fc4e5d92b830151e1b4becf000.jpg-0aa2fb_e70b158d80fc4e5d92b830151e1b4becf000.jpg')}
            alt="GDE assembly hardware"
            loading="lazy"
          />
        </div>
      </section>

      <section className="rd-block reveal-on-scroll">
        <h2>H-cell for new catalysts</h2>
        <div className="image-grid cols-4">
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_7e4744029f3c4e399848838df22108da_mv2.png-0aa2fb_7e4744029f3c4e399848838df22108da_mv2.png')}
            alt="H-cell conceptual assembly"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_a6d2476c8c5e44ef9e2d611fac1b74ef_mv2.png-0aa2fb_a6d2476c8c5e44ef9e2d611fac1b74ef_mv2.png')}
            alt="H-cell rendering"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_f3d9ebfcb8aa42099c56bc4efb6b0751_mv2.png-0aa2fb_f3d9ebfcb8aa42099c56bc4efb6b0751_mv2.png')}
            alt="H-cell exploded module"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_6528857cf57a4d668157c2c14fc52f91_mv2.png-Photochemical_reactor_CAD_render.png')}
            alt="Photochemical reactor for catalyst studies"
            loading="lazy"
          />
        </div>
      </section>

      <section className="rd-block reveal-on-scroll">
        <h2>In-house R&amp;D center</h2>
        <div className="image-grid cols-2">
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_8195a5bf40a24b2f841fa1e2213968c3_mv2.png-Screenshot_2024-05-29_at_11_45_57.png')}
            alt="In-house lab activity 1"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_4cd077909b6e4dd28753645f3badbae6_mv2.png-Screenshot_2024-09-28_at_14_54_28.png')}
            alt="In-house lab activity 2"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_f82bef43809c44ee8113aebb11bde0c7_mv2.png-Screenshot_2024-03-17_at_22_06_22.png')}
            alt="In-house equipment and diagnostics"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_7b58b3804f9143f084d988ab9f615ddd_mv2.png-Screenshot_2023-02-20_at_11_06_57.png')}
            alt="In-house experimental rig"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_e357abfba3ed42a9b1ae03f0417351a2_mv2.png-Screenshot_2023-08-20_at_12_52_55.png')}
            alt="In-house pilot assembly"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_bda44b22e7144e9dbadca5c34a2ee8ed_mv2.jpeg-WhatsApp_Image_2024-11-09_at_19_03_34.jpeg')}
            alt="In-house manufacturing setup"
            loading="lazy"
          />
        </div>
      </section>

      <section className="rd-block reveal-on-scroll">
        <h2>MEA recycling</h2>
        <div className="image-grid cols-3">
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_d4cf044143f849f28edabce4fe15ef85_mv2.png-MEA_Recycling_1.png')}
            alt="MEA recycling workflow"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_80229a2eddda4477828bec51a7db105c_mv2.jpg-IMG-20250303-WA0013.jpg')}
            alt="MEA recycling lab sample"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_884da947d81f4922a3eb0aa53af9b33a_mv2.jpg-RF_Sputter_candid_.jpg')}
            alt="RF sputter process"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_970e0a601bf449d29fc07f41f981a15a_mv2.jpg-IMG-20250303-WA0014.jpg')}
            alt="Recycled layer inspection"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_58be24472150448c8b782cb1f4a2089a_mv2.jpg-IMG-20250303-WA0011.jpg')}
            alt="MEA recovery bench"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_30f8b3e49b7f492591a3a7619c026e6f_mv2.jpg-IMG-20250213-WA0008.jpg')}
            alt="MEA recycling quality check"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_7bbf7348ae3643f5a317db3dba74d346_mv2.png-Au_Deposition_on_Anode_GDE_1.png')}
            alt="Gold deposition on anode GDE"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_23040e7f06e74b22a943f53f470d145e_mv2.avif-Gold_deposition.avif')}
            alt="Gold deposition sample"
            loading="lazy"
          />
          <img
            src={resolveMediaPath('/assets/images/rd/0aa2fb_6c2653aa26a64a6ba9a9159333f5779d_mv2.jpg-IMG-20250303-WA0008.jpg')}
            alt="Recycled catalyst plate"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  )
}

function TeamPage() {
  const coreTeam = [
    {
      name: 'Noah Jacob',
      role: 'CTO',
      image: '/assets/images/team/core-noah.png',
    },
    {
      name: 'Jan Nisa Ahad',
      role: 'Research Head',
      image: '/assets/images/team/core-jan-nisa.png',
    },
    {
      name: 'Gyan Kumar Sah',
      role: 'Research Engineer',
      image: '/assets/images/team/core-gyan.jpeg',
    },
    {
      name: 'Mesa Sai Gagan',
      role: 'Research Engineer',
      image: '/assets/images/team/core-gagan.jpg',
    },
  ]

  const advisors = [
    {
      name: 'Dr. Jagadeesh Kalepu',
      role: 'Advisor',
      image: '/assets/images/team/advisor-jagadeesh.png',
    },
    {
      name: 'Dr. Siddhartha Ghosh',
      role: 'Advisor',
      image: '/assets/images/team/advisor-siddhartha.jpg',
    },
    {
      name: 'Lokesh Kumar',
      role: 'Advisor',
      image: '/assets/images/team/advisor-lokesh.avif',
    },
  ]

  return (
    <main className="content-shell team-page">
      <h1>Meet the Founders</h1>

      <section className="founders-grid reveal-on-scroll" aria-label="Founders">
        <article className="founder-card">
          <img src={resolveMediaPath('/assets/images/team/founder-sravani.jpg')} alt="Sravani Vulli" loading="lazy" />
          <h2>Sravani Vulli</h2>
          <p>
            Ms. Sravani Vulli, the Managing Director and Founder, brings over 15 years of
            experience in electronics and IT. An alumnus of the esteemed National University of
            Singapore (NUS), she is responsible for overseeing key aspects of the business,
            including investment strategies, location selection for expansion, and team development.
            Her expertise and visionary leadership play a crucial role in driving the growth and
            operational excellence of the startup as it scales to new heights.
          </p>
        </article>

        <article className="founder-card">
          <img
            src={resolveMediaPath('/assets/images/team/founder-mallikarjuna.jpg')}
            alt="Mallikarjuna Rao M"
            loading="lazy"
          />
          <h2>Mallikarjuna Rao M</h2>
          <p>
            Dr. Malikarjun, a seasoned innovator with 16+ years of global R&amp;D experience at NUS
            Singapore, Uppsala University, IIT Kanpur, and the University of Hyderabad, combines
            scientific expertise with 16+ years of entrepreneurial success in retail. With 60+
            publications, multiple patents, and two successful ventures, he is driven by a vision
            to develop sustainable energy solutions through innovation and strategic leadership.
          </p>
        </article>
      </section>

      <section className="team-grid-section reveal-on-scroll">
        <h2>Our Core Team.</h2>
        <div className="member-grid cols-2">
          {coreTeam.map((member) => (
            <article className="member-card" key={member.name}>
              <img src={resolveMediaPath(member.image)} alt={member.name} loading="lazy" />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="team-grid-section reveal-on-scroll">
        <h2>Our Adivisory Team.</h2>
        <div className="member-grid cols-2 advisors-grid">
          {advisors.map((member) => (
            <article className="member-card" key={member.name}>
              <img src={resolveMediaPath(member.image)} alt={member.name} loading="lazy" />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="apply-today reveal-on-scroll">
        <h2>Apply Today</h2>
        <p>
          We&apos;re building a sustainable future with energy-efficient electrolyzers. Be part of the
          innovation!
        </p>
        <div className="apply-links">
          <a href="mailto:info@shaktiphotonsolutions.com">info@shaktiphotonsolutions.com</a>
          <a href="tel:+917382025117">+91 7382025117</a>
        </div>
      </section>
    </main>
  )
}

function CustomersPage() {
  const customers = [
    { name: 'IIT DELHI', image: '/assets/images/customers/iit-delhi.png' },
    { name: 'NIT WARANGAL', image: '/assets/images/customers/nit-warangal.png' },
    { name: 'RV COLLEGE OF ENGINEERING', image: '/assets/images/customers/rv-college.png' },
    { name: 'GITAM University', image: '/assets/images/customers/gitam.jpeg' },
    { name: 'TIFR HYDERABAD', image: '/assets/images/customers/tifr.png' },
    { name: 'VELLORE INSITUTE OF TECHNOLOGY- AP', image: '/assets/images/customers/vit-ap.png' },
    { name: 'University of Hyderabad', image: '/assets/images/customers/uoh.png' },
    { name: 'IIT Hyderabad', image: '/assets/images/customers/iit-hyderabad.png' },
    { name: 'CISR - CGCRI', image: '/assets/images/customers/csir-cgcri.png' },
    { name: 'Pavakah Energy', image: '/assets/images/customers/pavakah.png' },
    { name: 'Aviral Power', image: '/assets/images/customers/aviral.png' },
    { name: 'Synthetic Gases', image: '/assets/images/customers/synthetic-gases.jpg' },
  ]

  return (
    <main className="content-shell customers-page">
      <h1>Our Valued Customers</h1>
      <p className="customers-intro">Leading institutions and industries</p>
      <p className="customers-intro">Delivering advanced hydrogen and renewable energy solutions.</p>

      <section className="customers-grid reveal-on-scroll" aria-label="Customer logos">
        {customers.map((customer) => (
          <article className="customer-card" key={customer.name}>
            <img src={resolveMediaPath(customer.image)} alt={customer.name} loading="lazy" />
            <h2>{customer.name}</h2>
          </article>
        ))}
      </section>
    </main>
  )
}

function ContactPage() {
  return (
    <main className="content-shell contact-page">
      <section className="contact-grid reveal-on-scroll">
        <article className="contact-form-card">
          <h1>Get in Touch</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="inline-fields">
              <label>
                First Name *
                <input type="text" name="firstName" />
              </label>
              <label>
                Last Name
                <input type="text" name="lastName" />
              </label>
            </div>
            <label>
              Email *
              <input type="email" name="email" />
            </label>
            <label>
              Message *
              <textarea name="message" rows={5}></textarea>
            </label>
            <button type="submit">Send</button>
          </form>
        </article>

        <article className="contact-details-panel">
          <h2>Corporate Offices:</h2>
          <ul>
            <li>IIT Madras Research Park, Chennai, Tamilnadu, India 600113.</li>
            <li>JC Bose Block, SRM AP, Guntur, Andhra Pradesh, India 522502.</li>
            <li>Industrial Phase-7, Mohali, Punjab, India 160055.</li>
          </ul>

          <p>
            <a href="tel:+917382025117">+91 7382025117</a>
          </p>
          <p>
            <a href="mailto:info@shaktiphotonsolutions.com">info@shaktiphotonsolutions.com</a>
          </p>
          <p>
            <a
              href="https://linkedin.com/company/shakti-photon-solutions-private-limited/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </p>

          <div className="map-wrap" aria-label="Office map">
            <iframe
              title="Shakti Photon Solutions location"
              src="https://www.google.com/maps?q=IIT+Madras+Research+Park+Chennai&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </article>
      </section>
    </main>
  )
}

function SiteFooter() {
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

function App() {
  const location = useLocation()
  const supabaseReady = isSupabaseConfigured()
  const cdnFallback = useCdnFallbackPopup()

  // Scroll to top and set up scroll-reveal on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal-on-scroll'),
    )

    if (revealTargets.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -6% 0px',
      },
    )

    revealTargets.forEach((node) => {
      node.classList.remove('is-visible')
      observer.observe(node)
    })

    return () => {
      observer.disconnect()
    }
  }, [location.pathname])

  // Global image error handler: Supabase CDN first, local fallback + toast
  useEffect(() => {
    function handleImgError(e: Event) {
      const img = e.target as HTMLImageElement
      if (!img || img.tagName !== 'IMG') return

      const failedSrc = img.src
      // Only fall back if this looks like a Supabase storage URL
      if (!failedSrc.includes('supabase.co')) return

      // Derive the local public path from the Supabase URL
      // Supabase URL pattern: .../storage/v1/object/public/site-media/<storagePath>
      const storageMatch = failedSrc.match(/\/object\/public\/[^/]+\/(.+)$/)
      if (!storageMatch) return

      const localPath = `/assets/images/${storageMatch[1]}`
      img.src = localPath
      _notifyCdnFallback?.()
    }

    document.addEventListener('error', handleImgError, true /* capture */)
    return () => document.removeEventListener('error', handleImgError, true)
  }, [])

  return (
    <div className="page">
      {/* Slim amber banner when Supabase is not configured at all */}
      {!supabaseReady && (
        <div className="supabase-banner" role="alert">
          ⚠ Supabase not configured – images are loading from local public folder.
          Add <code>VITE_SUPABASE_URL</code> &amp; <code>VITE_SUPABASE_ANON_KEY</code> to&nbsp;<code>.env</code>.
        </div>
      )}
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/electrolyzers" element={<ElectrolyzersPage />} />
        <Route path="/fuelcells" element={<FuelCellsPage />} />
        <Route path="/r-d-work-stations" element={<RDWorkstationsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/our-customers" element={<CustomersPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <SiteFooter />
      {/* Popup overlay for image CDN fallback notifications */}
      <CdnFallbackPopup visible={cdnFallback.visible} count={cdnFallback.count} onDismiss={cdnFallback.dismiss} />
    </div>
  )
}

export default App


