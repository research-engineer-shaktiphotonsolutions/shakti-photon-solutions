import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type MarketingContactPopupProps = {
  visible: boolean
  showLauncher: boolean
  onDismiss: () => void
  onReopen: () => void
}

const WHATSAPP_NUMBER = '917382025117'
const WHATSAPP_MESSAGE = 'Hi Shakti Photon Solutions, I have a query regarding your products and solutions.'
const EMAIL_ADDRESS = 'info@shaktiphotonsolutions.com'
const EMAIL_SUBJECT = 'Query from website visitor'
const EMAIL_BODY = 'Hello Shakti Photon Solutions, I have a query regarding your products and solutions.'

const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
const emailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_ADDRESS)}&su=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`
const emailFallbackLink = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`
const DISMISS_ANIMATION_MS = 360

export function MarketingContactPopup({ visible, showLauncher, onDismiss, onReopen }: MarketingContactPopupProps) {
  const [isMinimizing, setIsMinimizing] = useState(false)

  useEffect(() => {
    if (!isMinimizing) return

    const timer = setTimeout(() => {
      setIsMinimizing(false)
      onDismiss()
    }, DISMISS_ANIMATION_MS)

    return () => clearTimeout(timer)
  }, [isMinimizing, onDismiss])

  useEffect(() => {
    if (!visible) {
      setIsMinimizing(false)
    }
  }, [visible])

  const handleDismiss = () => {
    setIsMinimizing(true)
  }

  if (!visible && !showLauncher) return null

  if (!visible && showLauncher) {
    return (
      <button
        type="button"
        className="contact-popup-launcher"
        onClick={onReopen}
        aria-label="Open contact options"
      >
        <span className="contact-popup-launcher-dot" aria-hidden="true"></span>
        Contact Us
      </button>
    )
  }

  return (
    <aside
      className={`contact-popup ${isMinimizing ? 'is-minimizing' : ''}`}
      aria-live="polite"
      aria-label="Contact us quickly"
    >
      <button
        type="button"
        className="contact-popup-close"
        onClick={handleDismiss}
        aria-label="Dismiss contact popup"
        disabled={isMinimizing}
      >
        x
      </button>

      <p className="contact-popup-eyebrow">Need help fast?</p>
      <h3>Got a query?</h3>
      <p className="contact-popup-copy">
        Reach our team directly on WhatsApp or email. We usually respond quickly during business hours.
      </p>

      <div className="contact-popup-actions">
        <a href={whatsappLink} target="_blank" rel="noreferrer" className="contact-popup-btn whatsapp">
          WhatsApp Us
        </a>
        <a href={emailLink} target="_blank" rel="noreferrer" className="contact-popup-btn email">
          Email Us
        </a>
      </div>

      <p className="contact-popup-fallback">
        If needed, <a href={emailFallbackLink}>open your default mail app</a>
      </p>

      <p className="contact-popup-footer">
        Prefer details form? <Link to="/contact-us">Go to Contact Page</Link>
      </p>
    </aside>
  )
}