/* ================================================================
   SHAKTI PHOTON SOLUTIONS — main.js
   Navigation, Scroll Reveal, Counter Animation, Smooth Scroll
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. NAVIGATION — Scroll & Hamburger ---- */
  const nav        = document.getElementById('main-nav');
  const hamburger  = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Sticky nav with scrolled class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.contains('open');
    hamburger.classList.toggle('active');
    mobileMenu?.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-mobile-link, .nav-mobile-cta').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      mobileMenu?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (mobileMenu?.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger?.contains(e.target)) {
      hamburger?.classList.remove('active');
      mobileMenu.classList.remove('open');
    }
  });

  /* ---- 2. HERO — Subtle BG Zoom on Load ---- */
  setTimeout(() => {
    document.querySelector('.hero')?.classList.add('loaded');
  }, 100);

  /* ---- 3. SCROLL REVEAL (Intersection Observer) ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  /* ---- 4. COUNTER ANIMATION ---- */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const suffix   = el.dataset.suffix   || '';
    const prefix   = el.dataset.prefix   || '';
    const duration = 2000; // ms
    const start    = Date.now();

    function tick() {
      const elapsed  = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = target * easeOutCubic(progress);

      if (Number.isInteger(target)) {
        el.textContent = prefix + Math.round(value) + suffix;
      } else {
        el.textContent = prefix + value.toFixed(1) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => {
    counterObserver.observe(el);
  });

  /* ---- 5. SMOOTH SCROLL for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id     = anchor.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const top    = target.getBoundingClientRect().top + window.scrollY - navH - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- 6. CONTACT FORM (Formspree) ---- */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        contactForm.style.display = 'none';
        formSuccess?.classList.add('show');
      } else {
        const data = await response.json();
        alert(data.error || 'Something went wrong. Please try again or contact us on WhatsApp.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    } catch {
      alert('Network error. Please try WhatsApp or email directly.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  /* ---- 7. URL QUERY PARAMS — Pre-fill form from product/service links ---- */
  const urlParams    = new URLSearchParams(window.location.search);
  const productParam = urlParams.get('product');
  const serviceParam = urlParams.get('service');

  // Map URL param values → { selectValue, label, message }
  const prefillMap = {
    // Products (from homepage cards)
    'electrolyzers': {
      select: 'pem-electrolyzer',
      label:  'Hydrogen Generators (Electrolyzers)',
      msg:    'Hi, I am interested in your Hydrogen Generator / Electrolyzer systems. Could you please share more details on specifications, pricing, and lead time for my application?'
    },
    'fuelcells': {
      select: 'fuel-cell',
      label:  'Fuel Cell Systems',
      msg:    'Hi, I am interested in your Fuel Cell Systems. Could you please share more details on the available power range, specifications, and pricing for my use case?'
    },
    'ccus': {
      select: 'ccus',
      label:  'CCUS / CO₂ Reduction Systems',
      msg:    'Hi, I am interested in your CCUS / CO₂ Reduction Systems. Could you please share more details on how the system works, available scales, and pricing?'
    },
    // EaaS services (from EaaS page)
    'sputtering': {
      select: 'sputtering',
      label:  'RF Magnetron Sputtering',
      msg:    'Hi, I would like to book a session on your RF Magnetron Sputtering system. Please let me know about availability, pricing per session, and substrate/material requirements.'
    },
    'spray-nozzle': {
      select: 'spray-nozzle',
      label:  'Ultrasonic Spray Nozzle',
      msg:    'Hi, I would like to book a session on your Ultrasonic Spray Nozzle system for MEA/GDE fabrication. Please share session pricing and scheduling details.'
    },
    'hot-press': {
      select: 'hot-press',
      label:  'Hot Press / MEA Fabrication',
      msg:    'Hi, I would like to book a Hot Press session for MEA bonding. Please share details on temperature/pressure range, session pricing, and availability.'
    },
    '3d-printing': {
      select: '3d-printing',
      label:  '3D Printing / Rapid Prototyping',
      msg:    'Hi, I would like to request a 3D printing job for a prototype component. Please share material options, turnaround time, and pricing.'
    },
  };

  const param    = productParam || serviceParam;
  const prefill  = param ? prefillMap[param.toLowerCase()] : null;

  if (prefill) {
    // 1. Pre-select the dropdown
    const serviceSelect = document.getElementById('service-select');
    if (serviceSelect) {
      const option = Array.from(serviceSelect.options).find(
        opt => opt.value === prefill.select
      );
      if (option) serviceSelect.value = option.value;
    }

    // 2. Pre-fill the message textarea
    const messageField = document.getElementById('message');
    if (messageField && !messageField.value) {
      messageField.value = prefill.msg;
    }

    // 3. Scroll smoothly to the form
    const form = document.getElementById('contact-form');
    if (form) {
      setTimeout(() => {
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const top  = form.getBoundingClientRect().top + window.scrollY - navH - 24;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 400);
    }
  }

  /* ---- 8. PARTNER LOGOS — Staggered reveal ---- */
  const partnerLogos = document.querySelectorAll('.partner-logo');
  partnerLogos.forEach((logo, i) => {
    logo.style.transitionDelay = `${i * 0.05}s`;
  });

  /* ---- 9. ACTIVE NAV HIGHLIGHT on scroll ---- */
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      if (window.scrollY >= section.offsetTop - navH - 60) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

});
