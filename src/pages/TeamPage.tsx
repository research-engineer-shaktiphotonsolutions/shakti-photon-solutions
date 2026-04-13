import { resolveMediaPath } from '../lib/mediaPaths'

export function TeamPage() {
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
