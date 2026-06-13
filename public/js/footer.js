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
          <div class="footer-logo-wrap">
            <img
              src="/assets/images/shared/0aa2fb_20f7fb02f96f448aa56341259c9e2b04_mv2.png-Logo_WIth_Whitebox.png"
              alt="Shakti Photon Solutions Private Limited"
              height="46" loading="lazy"
            >
          </div>
          <!-- ▼ EDIT THIS LINE to change the footer tagline everywhere ▼ -->
          <p>India's green hydrogen &amp; net-zero technology company. Specializing in Custom Industrial Solutions, On-site hydrogen generators, fuel cell systems, and CCUS solutions.</p>
          <div class="footer-socials">
            <a href="https://www.linkedin.com/company/shakti-photon-solutions-private-limited/"
               class="footer-social-btn" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href="https://wa.me/917382025117"
               class="footer-social-btn" target="_blank" rel="noreferrer" aria-label="WhatsApp">&#x1F4AC;</a>
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
