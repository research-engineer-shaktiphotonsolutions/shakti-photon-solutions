/**
 * js/footer.js — SINGLE SOURCE OF TRUTH for the site footer.
 * Edit THIS file to update the footer across ALL pages.
 * Uses absolute paths so it works on root pages AND /blog/ pages.
 */

(function () {
  const FOOTER_HTML = `
  <footer class="footer" aria-label="Site footer">
    <div class="container">
      <div class="footer-grid">

        <!-- Brand -->
        <div class="footer-brand">
          <a href="/" class="footer-logo" aria-label="Shakti Photon Solutions Home">
            <div class="footer-logo-icon">
              <img src="/favicon.png" alt="" width="40" height="40" aria-hidden="true">
            </div>
            <div class="footer-logo-text">
              <span class="footer-logo-name">Shakti Photon Solutions</span>
              <span class="footer-logo-sub">Private Limited</span>
            </div>
          </a>
          <!-- ▼ EDIT THIS LINE to change the footer tagline everywhere ▼ -->
          <p>India's green hydrogen &amp; net-zero technology company. Specializing in Custom Industrial Solutions, On-site hydrogen generators, fuel cell systems, and CCUS solutions.</p>
          <div class="footer-socials">
            <a href="https://www.linkedin.com/company/shakti-photon-solutions-private-limited/"
               class="footer-social-btn" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href="https://wa.me/917382025117"
               class="footer-social-btn" target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
            <a href="mailto:info@shaktiphotonsolutions.com"
               class="footer-social-btn" aria-label="Email">&#x2709;</a>
          </div>
        </div>

        <!-- Products -->
        <div class="footer-col">
          <h5>Products</h5>
          <nav class="footer-links" aria-label="Product pages">
            <!-- ▼ EDIT THIS LIST to add/remove products ▼ -->
            <a href="/products.html#electrolyzers" class="footer-link">PEM Electrolyzers</a>
            <a href="/products.html#electrolyzers" class="footer-link">AEM Electrolyzers</a>
            <a href="/products.html#electrolyzers" class="footer-link">Alkaline Electrolyzers</a>
            <a href="/products.html#fuelcells"     class="footer-link">Fuel Cell Systems</a>
            <a href="/products.html#co2"           class="footer-link">CCUS Systems</a>
            <a href="/products.html#mea"           class="footer-link">MEA Manufacturing</a>
          </nav>
        </div>

        <!-- Company -->
        <div class="footer-col">
          <h5>Company</h5>
          <nav class="footer-links" aria-label="Company pages">
            <a href="/about.html"                  class="footer-link">About Us</a>
            <a href="/about.html#team"             class="footer-link">Our Team</a>
            <a href="/equipment-as-a-service.html" class="footer-link">Equipment as a Service</a>
            <a href="/blog/index.html"             class="footer-link">Blog</a>
            <a href="/contact.html"                class="footer-link">Contact Us</a>
          </nav>
        </div>

        <!-- Offices -->
        <div class="footer-col">
          <h5>Our Offices</h5>
          <!-- ▼ EDIT THIS to update office addresses ▼ -->
          <div class="footer-offices">
            <address class="footer-office">
              <strong>Chennai (Headquarters)</strong>
              IIT Madras Research Park,<br>
              Chennai, Tamil Nadu — 600 113
            </address>
            <address class="footer-office">
              <strong>Amaravati, Andhra Pradesh</strong>
              JC Bose Block, SRM AP University,<br>
              Amaravati — 522 502
            </address>
          </div>
        </div>

      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p class="footer-copy">© 2026 Shakti Photon Solutions Private Limited. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="tel:+917382025117" class="footer-bottom-link">+91 73820 25117</a>
          <a href="mailto:info@shaktiphotonsolutions.com" class="footer-bottom-link">info@shaktiphotonsolutions.com</a>
        </div>
      </div>
      <!-- Legal / Brand Credibility -->
      <div class="footer-legal">
        <img
          src="/assets/images/shared/0aa2fb_7c1bf2a3111945b29e1aa80851b237d8_mv2.png-Screenshot_2024-12-07_at_11_10_edited.png"
          alt="Mark Enyz® — Registered Brand"
          class="footer-legal-logo"
        >
        <span class="footer-legal-sep">|</span>
        <span class="footer-legal-item"><strong>GST:</strong> 37ABKCS1534R1ZN</span>
        <span class="footer-legal-sep">|</span>
        <span class="footer-legal-item"><strong>PAN:</strong> ABKCS1534R</span>
      </div>
    </div>
  </footer>`;

  function injectFooter() {
    const placeholder = document.getElementById('site-footer');
    if (!placeholder) return;
    placeholder.outerHTML = FOOTER_HTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
  } else {
    injectFooter();
  }
})();
