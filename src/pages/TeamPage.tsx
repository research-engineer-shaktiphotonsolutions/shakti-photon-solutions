import { useEffect, useState } from 'react'
import { resolveMediaPath } from '../lib/mediaPaths'
import { fetchTeamMembers, type TeamMember } from '../lib/teamApi'

export function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    fetchTeamMembers({ activeOnly: true })
      .then((data) => alive && setMembers(data))
      .catch((err) => console.error('Failed to load team', err))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  const founders = members.filter((m) => m.category === 'founder')
  const coreTeam = members.filter((m) => m.category === 'core')
  const advisors = members.filter((m) => m.category === 'advisor')

  return (
    <main className="content-shell team-page">
      <h1>Meet the Founders</h1>

      {loading && <p>Loading team…</p>}

      {founders.length > 0 && (
        <section className="founders-grid reveal-on-scroll" aria-label="Founders">
          {founders.map((founder) => (
            <article className="founder-card" key={founder.id}>
              {founder.photo_url && (
                <img
                  src={resolveMediaPath(founder.photo_url)}
                  alt={founder.name}
                  loading="lazy"
                />
              )}
              <h2>{founder.name}</h2>
              {founder.bio && <p>{founder.bio}</p>}
            </article>
          ))}
        </section>
      )}

      {coreTeam.length > 0 && (
        <section className="team-grid-section reveal-on-scroll">
          <h2>Our Core Team.</h2>
          <div className="member-grid cols-2">
            {coreTeam.map((member) => (
              <article className="member-card" key={member.id}>
                {member.photo_url && (
                  <img
                    src={resolveMediaPath(member.photo_url)}
                    alt={member.name}
                    loading="lazy"
                  />
                )}
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {advisors.length > 0 && (
        <section className="team-grid-section reveal-on-scroll">
          <h2>Our Adivisory Team.</h2>
          <div className="member-grid cols-2 advisors-grid">
            {advisors.map((member) => (
              <article className="member-card" key={member.id}>
                {member.photo_url && (
                  <img
                    src={resolveMediaPath(member.photo_url)}
                    alt={member.name}
                    loading="lazy"
                  />
                )}
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))}
          </div>
        </section>
      )}

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
