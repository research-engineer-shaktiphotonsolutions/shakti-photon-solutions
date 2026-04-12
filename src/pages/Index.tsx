import hydrogenGenerator from "@/assets/hydrogen-generator.jpg";

const navItems = ["Home", "Solutions", "Electrolyzers", "Fuel cells", "R&D Work Stations", "Team", "More"];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="bg-nav">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-3 bg-background rounded-md px-4 py-2">
            <div className="w-10 h-10 bg-nav rounded-full flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                <circle cx="20" cy="20" r="18" stroke="hsl(200,80%,55%)" strokeWidth="2" />
                <path d="M20 8 L14 20 L20 18 L20 32 L26 20 L20 22 Z" fill="hsl(200,80%,55%)" />
              </svg>
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-foreground leading-tight">Shakti Photon Solutions</p>
              <p className="font-heading text-xs text-foreground leading-tight">Private Limited</p>
              <p className="font-body text-xs font-bold tracking-widest text-foreground">SHAKTI</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a key={item} href="#" className="text-primary-foreground font-body text-sm hover:opacity-80 transition-opacity">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="font-body text-foreground mb-6">
              At <strong>Shakti Photon Solutions</strong>, we are revolutionizing energy solutions with our cutting-edge on-site hydrogen generators and on-site CO2 recycling units.
            </p>
            <p className="font-body text-foreground mb-8">
              Our technology is designed to deliver clean, efficient, and cost-effective hydrogen production using PEM, AEM and Alkaline electrolyzer technologies for industries including pharmaceuticals, chemicals, jewelry, and renewable energy applications.
            </p>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Convert CO2 into fuels such as CO, HCOOH, C2H4.
            </h3>
            <p className="font-heading text-xl text-foreground mb-3">Convert biomass into CO & H2.</p>
            <p className="font-heading text-xl text-foreground">Produce H2 from direct seawater.</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={hydrogenGenerator}
              alt="Onsite Hydrogen Generator"
              width={512}
              height={512}
              className="max-w-sm w-full rounded"
            />
            <h3 className="font-heading text-xl font-bold text-foreground mt-4">Onsite Hydrogen Generator</h3>
            <p className="font-heading text-lg text-foreground mt-2">Onsite CO₂ recycling unit</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
