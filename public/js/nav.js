/**
 * js/nav.js — SINGLE SOURCE OF TRUTH for the site navigation.
 * Edit THIS file to add/remove nav links across ALL pages.
 * Automatically highlights the correct active link based on current page URL.
 */

(function () {
  const NAV_LINKS = [
    { href: '/products.html',              label: 'Products' },
    { href: '/equipment-as-a-service.html', label: 'Equipment as a Service' },
    { href: '/about.html',                 label: 'About Us' },
    { href: '/blog/index.html',            label: 'Blog' },
    { href: '/contact.html',               label: 'Contact' },
  ];

  function isActive(href) {
    const path = window.location.pathname;
    if (href === '/blog/index.html') {
      return path.startsWith('/blog');
    }
    return path === href || path === href.replace('.html', '');
  }

  function buildNav() {
    const desktopLinks = NAV_LINKS.map(({ href, label }) =>
      `<a href="${href}" class="nav-link${isActive(href) ? ' active' : ''}" role="listitem">${label}</a>`
    ).join('\n      ');

    const mobileLinks = NAV_LINKS.map(({ href, label }) =>
      `<a href="${href}" class="nav-mobile-link">${label}</a>`
    ).join('\n    ');

    return `
  <nav class="nav" id="main-nav" role="navigation" aria-label="Main navigation">
    <div class="nav-inner container">
      <a href="/" class="nav-logo" aria-label="Shakti Photon Solutions Home">
        <div class="nav-logo-icon">
          <img src="/favicon.png" alt="" width="40" height="40" aria-hidden="true">
        </div>
        <div class="nav-logo-text">
          <span class="nav-logo-name">Shakti Photon Solutions</span>
          <span class="nav-logo-sub">Private Limited</span>
        </div>
      </a>
      <div class="nav-links" role="list">
      ${desktopLinks}
      </div>
      <!-- <a href="/contact.html" class="nav-cta">Get a Quote →</a> -->
      <button
        class="nav-hamburger"
        id="hamburger-btn"
        aria-label="Open mobile menu"
        aria-expanded="false"
        aria-controls="mobile-menu"
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <!-- MOBILE MENU -->
  <div class="nav-mobile" id="mobile-menu" aria-label="Mobile navigation" role="navigation">
    ${mobileLinks}
    <!-- <a href="/contact.html" class="nav-mobile-cta">Get a Quote →</a> -->
  </div>`;
  }

  function injectNav() {
    const placeholder = document.getElementById('site-nav');
    if (!placeholder) return;
    placeholder.outerHTML = buildNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNav);
  } else {
    injectNav();
  }
})();
