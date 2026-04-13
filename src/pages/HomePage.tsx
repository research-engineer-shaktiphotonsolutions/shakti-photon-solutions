import type { HomeImageEditorRenderers, HomeMediaConfig } from '../lib/homeMedia'
import { resolveDisplayMediaPath } from '../lib/mediaPaths'
import { Link } from 'react-router-dom'

type HomePageProps = {
  homeMedia: HomeMediaConfig
  disableRevealAnimations?: boolean
  imageEditors?: HomeImageEditorRenderers
}

export function HomePage({
  homeMedia,
  disableRevealAnimations = false,
  imageEditors,
}: HomePageProps) {
  const missionVisualSrc = resolveDisplayMediaPath(homeMedia.missionVisual)
  const eventShowcaseSrc = resolveDisplayMediaPath(homeMedia.eventShowcase)
  const customerGallery = homeMedia.customerGallery
    .map((image, index) => ({ image: image.trim(), slotIndex: index }))
    .filter((entry) => Boolean(entry.image))

  const revealClassName = disableRevealAnimations ? '' : 'reveal-on-scroll'

  return (
    <main className="content-shell">
      <section className={`${revealClassName} mission`.trim()} id="our-mission" aria-labelledby="mission-title">
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
          {imageEditors?.missionVisual && (
            <div className="home-image-inline-editor">{imageEditors.missionVisual}</div>
          )}
          {missionVisualSrc && (
            <img
              src={missionVisualSrc}
              alt="Onsite hydrogen generator and onsite CO2 recycling unit"
              loading="lazy"
            />
          )}
          <h2>Onsite Hydrogen Generator</h2>
          <h2>Onsite CO2 recycling unit</h2>
        </aside>
      </section>

      <section className={`${revealClassName} why-choose`.trim()} aria-labelledby="why-title">
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

      <section className={`${revealClassName} event-photo`.trim()} aria-label="Industrial showcase image">
        {imageEditors?.eventShowcase && (
          <div className="home-image-inline-editor">{imageEditors.eventShowcase}</div>
        )}
        {eventShowcaseSrc && (
          <img
            src={eventShowcaseSrc}
            alt="Shakti Photon Solutions presenting hydrogen technology at an event"
            loading="lazy"
          />
        )}
      </section>

      <section className={`${revealClassName} customer-gallery`.trim()} aria-label="Customer and event highlights">
        <ul>
          {customerGallery.map(({ image, slotIndex }) => (
            <li key={`${slotIndex}-${image}`}>
              {imageEditors?.customerGallery?.[slotIndex] && (
                <div className="home-image-inline-editor">{imageEditors.customerGallery[slotIndex]}</div>
              )}
              <img
                src={resolveDisplayMediaPath(image)}
                alt={`Shakti Photon Solutions customer collaboration ${slotIndex + 1}`}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </section>

      <section className={`${revealClassName} related-links`.trim()} aria-labelledby="related-pages-title">
        <h2 id="related-pages-title">Explore Related Hydrogen Technology Pages</h2>
        <ul>
          <li>
            <Link to="/electrolyzers">Compare PEM, AEM, and alkaline electrolyzer platforms</Link>
          </li>
          <li>
            <Link to="/fuelcells">Review fuel cell systems for mobility and backup power</Link>
          </li>
          <li>
            <Link to="/r-d-work-stations">See catalyst discovery and electrochemical R&amp;D workstations</Link>
          </li>
          <li>
            <Link to="/contact-us">Request a custom hydrogen or CO2 conversion consultation</Link>
          </li>
        </ul>
      </section>

      <section className={`${revealClassName} homepage-faq`.trim()} aria-labelledby="faq-title">
        <h2 id="faq-title">Frequently Asked Questions</h2>

        <article>
          <h3>Which hydrogen electrolyzer is suitable for industrial deployment?</h3>
          <p>
            Selection depends on purity targets, duty cycle, and integration constraints.
            <Link to="/electrolyzers"> Our electrolyzer page</Link> outlines PEM, AEM, and
            alkaline options from pilot to production capacities.
          </p>
        </article>

        <article>
          <h3>Can you build custom fuel cell systems for mobility and backup power?</h3>
          <p>
            Yes. We design configurable PEM fuel cell systems for use cases including drones,
            resilient power backup, and transportation programs. See
            <Link to="/fuelcells"> fuel cell solutions</Link> for stack examples.
          </p>
        </article>

        <article>
          <h3>Do you support research labs and universities with R&amp;D hardware?</h3>
          <p>
            Yes. We provide specialized catalyst discovery and electrochemical workstations for
            academia and industrial R&amp;D groups. Explore
            <Link to="/r-d-work-stations"> R&amp;D workstation offerings</Link>.
          </p>
        </article>
      </section>
    </main>
  )
}
