export function ContactPage() {
  const whatsappNumber = '917382025117'
  const whatsappMessage = 'Hi Shakti Photon Solutions, I have a query regarding your products and solutions.'
  const emailAddress = 'info@shaktiphotonsolutions.com'
  const emailSubject = 'Project requirement'

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
  const emailBody = 'Hello Shakti Photon Solutions, I want to share my project requirement.'
  const emailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

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

          <section className="contact-quick-connect" aria-label="Quick connect">
            <h3>Quick Connect</h3>
            <p>For fast replies, message us directly on WhatsApp or send your requirement by email.</p>
            <div className="contact-quick-connect-actions">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="quick-connect-btn whatsapp">
                WhatsApp
              </a>
              <a href={emailLink} target="_blank" rel="noreferrer" className="quick-connect-btn email">
                Email
              </a>
            </div>
          </section>

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
