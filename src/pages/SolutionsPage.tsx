export function SolutionsPage() {
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
