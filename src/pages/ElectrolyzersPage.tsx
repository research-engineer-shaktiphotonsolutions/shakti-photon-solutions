import { resolveMediaPath } from '../lib/mediaPaths'

export function ElectrolyzersPage() {
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
