import { resolveMediaPath } from '../lib/mediaPaths'

export function CustomersPage() {
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
