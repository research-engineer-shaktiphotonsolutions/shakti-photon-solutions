import { resolveMediaPath } from '../lib/mediaPaths'

export function FuelCellsPage() {
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
