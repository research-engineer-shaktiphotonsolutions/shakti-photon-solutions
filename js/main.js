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
  const refParam     = urlParams.get('ref');

  if (refParam) {
    const refInput = document.getElementById('ref-page');
    if (refInput) {
      refInput.value = refParam;
    }
  } else if (document.referrer) {
    try {
      const referrerUrl = new URL(document.referrer);
      if (referrerUrl.hostname === window.location.hostname) {
        const refInput = document.getElementById('ref-page');
        if (refInput && !refInput.value) {
          refInput.value = referrerUrl.pathname.replace(/^\/|\.html$/g, '') || 'homepage';
        }
      }
    } catch (err) {
      // ignore
    }
  }

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
    // 'sputtering': { // university asset — not for advertisement
    //   select: 'sputtering',
    //   label:  'RF Magnetron Sputtering',
    //   msg:    'Hi, I would like to book a session on your RF Magnetron Sputtering system. Please let me know about availability, pricing per session, and substrate/material requirements.'
    // },
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

  /* ================================================================
     10. ENQUIRY MODAL — Popup with confetti
     ================================================================ */

  // Product/service metadata for pre-filling the modal
  const eqProductData = {
    electrolyzers: {
      tag: 'Electrolyzers',
      title: 'Enquire About Hydrogen Generators',
      subtitle: 'PEM, AEM & Alkaline — 0.01 kW to 100 kW · 99.999% purity',
      select: 'pem-electrolyzer',
      msg: 'Hi, I am interested in your Hydrogen Generator / Electrolyzer systems. Could you please share specifications, pricing, and lead time for my application?'
    },
    fuelcells: {
      tag: 'Fuel Cells',
      title: 'Enquire About Fuel Cell Systems',
      subtitle: 'From 1W bench-top to 400 kW — drones, transport, backup power',
      select: 'fuel-cell',
      msg: 'Hi, I am interested in your Fuel Cell Systems. Could you please share the available power range, specifications, and pricing for my use case?'
    },
    ccus: {
      tag: 'CCUS',
      title: 'Enquire About CCUS Systems',
      subtitle: 'CO₂ → CO, Formic Acid & Ethylene via electrochemical reduction',
      select: 'ccus',
      msg: 'Hi, I am interested in your CCUS / CO₂ Reduction Systems. Could you please share details on scale, specifications, and pricing?'
    },
    epc: {
      tag: 'EPC Integration',
      title: 'Discuss Your EPC Project',
      subtitle: 'End-to-end hydrogen, carbon & renewable energy integration',
      select: 'epc',
      msg: 'Hi, I am interested in your EPC / turnkey system integration services. Could you please share more about your approach and past projects?'
    },
    // sputtering: { // university asset — not for advertisement
    //   tag: 'EaaS',
    //   title: 'Book RF Sputtering Session',
    //   subtitle: 'RF Magnetron Sputtering — thin film deposition for research & production',
    //   select: 'sputtering',
    //   msg: 'Hi, I would like to book a session on your RF Magnetron Sputtering system. Please share availability, session pricing, and material/substrate requirements.'
    // },
    'spray-nozzle': {
      tag: 'EaaS',
      title: 'Book Ultrasonic Spray Session',
      subtitle: 'Ultrasonic Spray Nozzle — catalyst & MEA/GDE coating',
      select: 'spray-nozzle',
      msg: 'Hi, I would like to book a session on your Ultrasonic Spray Nozzle for MEA/GDE fabrication. Please share session pricing and scheduling details.'
    },
    'hot-press': {
      tag: 'EaaS',
      title: 'Book Hot Press Session',
      subtitle: 'Hot Press — MEA bonding & membrane electrode assembly',
      select: 'hot-press',
      msg: 'Hi, I would like to book a Hot Press session for MEA bonding. Please share the temperature/pressure range, pricing, and availability.'
    },
    '3d-printing': {
      tag: 'EaaS',
      title: 'Request 3D Printing',
      subtitle: '3D Printing — rapid prototyping for lab & custom components',
      select: '3d-printing',
      msg: 'Hi, I would like to request a 3D printing job for a prototype component. Please share material options, turnaround time, and pricing.'
    },
  };

  // Lazy-create modal HTML and inject into <body> once
  let eqOverlay = null;
  let eqStopConfetti = null;

  function eqCreateModal() {
    const el = document.createElement('div');
    el.id = 'eq-overlay';
    el.className = 'eq-overlay';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-labelledby', 'eq-title');
    el.innerHTML = `
      <canvas class="eq-confetti-canvas" id="eq-confetti" aria-hidden="true"></canvas>
      <div class="eq-modal">
        <button class="eq-close" id="eq-close-btn" aria-label="Close">✕</button>
        <div class="eq-header">
          <span class="eq-tag" id="eq-tag">Products</span>
          <h3 class="eq-title" id="eq-title">Get a Quote</h3>
          <p class="eq-subtitle" id="eq-subtitle">Fill in your details and we'll respond within 24 hours.</p>
        </div>
        <form class="eq-form" id="eq-form" action="https://formspree.io/f/mnjypvga" method="POST" novalidate>
          <input type="hidden" name="_source" id="eq-source" value="modal">
          <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
          <div class="eq-row">
            <div class="eq-group">
              <label for="eq-fname">First Name <span class="eq-req">*</span></label>
              <input type="text" id="eq-fname" name="first_name" required placeholder="Rahul" autocomplete="given-name">
            </div>
            <div class="eq-group">
              <label for="eq-lname">Last Name <span class="eq-req">*</span></label>
              <input type="text" id="eq-lname" name="last_name" required placeholder="Sharma" autocomplete="family-name">
            </div>
          </div>
          <div class="eq-row">
            <div class="eq-group">
              <label for="eq-email">Email <span class="eq-req">*</span></label>
              <input type="email" id="eq-email" name="email" required placeholder="you@company.com" autocomplete="email">
            </div>
            <div class="eq-group">
              <label for="eq-phone">Phone / WhatsApp <span class="eq-req">*</span></label>
              <input type="tel" id="eq-phone" name="phone" required placeholder="+91 98765 43210" autocomplete="tel">
            </div>
          </div>
          <div class="eq-group">
            <label for="eq-org">Organisation / Institute</label>
            <input type="text" id="eq-org" name="organisation" placeholder="IIT Delhi / My Company" autocomplete="organization">
          </div>
          <div class="eq-group">
            <label for="eq-heard-via">How Did You Hear About Us? <span class="eq-req">*</span></label>
            <select id="eq-heard-via" name="heard_via" required>
              <option value="">— Select —</option>
              <option value="google-search">Google Search</option>
              <option value="linkedin">LinkedIn</option>
              <option value="word-of-mouth">Word of Mouth / Colleague referred me</option>
              <option value="conference-event">Conference or Event (e.g. Green Hydrogen Summit)</option>
              <option value="blog-article">Blog Article on your website</option>
              <option value="social-media">Social Media (Instagram / Twitter / YouTube)</option>
              <option value="direct-knew">Already knew about Shakti Photon Solutions</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="eq-group" id="eq-heard-via-other-group" style="display:none;">
            <label for="eq-heard-via-other">Please specify <span class="eq-req">*</span></label>
            <input type="text" id="eq-heard-via-other" name="heard_via_other" placeholder="Please tell us how you found us…">
          </div>
          <div class="eq-group">
            <label for="eq-service">Product / Service Interest</label>
            <select id="eq-service" name="service">
              <option value="">— Select —</option>
              <option value="pem-electrolyzer">PEM Electrolyzer (Hydrogen Generator)</option>
              <option value="aem-electrolyzer">AEM Electrolyzer</option>
              <option value="alkaline-electrolyzer">Alkaline Electrolyzer</option>
              <option value="fuel-cell">Fuel Cell System</option>
              <option value="ccus">CCUS — CO₂ Reduction System</option>
              <option value="rd-platform">R&D Platform / Workstation</option>
              <!-- <option value="sputtering">EaaS — RF Sputtering</option> university asset -->
              <option value="spray-nozzle">EaaS — Ultrasonic Spray</option>
              <option value="hot-press">EaaS — Hot Press</option>
              <option value="3d-printing">EaaS — 3D Printing</option>
              <option value="epc">Full EPC / System Integration</option>
              <option value="other">General Inquiry</option>
            </select>
          </div>
          <div class="eq-group">
            <label for="eq-msg">Your Message <span class="eq-req">*</span></label>
            <textarea id="eq-msg" name="message" required rows="3"
              placeholder="Describe your application, capacity needed, timeline…"></textarea>
          </div>
          <button type="submit" class="eq-submit" id="eq-submit">
            Send Enquiry <span class="eq-arrow">→</span>
          </button>
        </form>
        <div class="eq-success" id="eq-success" aria-live="polite">
          <div class="eq-success-icon">🎉</div>
          <h4>Enquiry Sent!</h4>
          <p>Our team will reply within 24 hours. For instant response, WhatsApp us directly!</p>
          <a href="https://wa.me/917382025117"
             class="eq-wa-btn" target="_blank" rel="noreferrer">
            💬 Continue on WhatsApp
          </a>
        </div>
      </div>`;
    document.body.appendChild(el);
    return el;
  }

  function eqGetOverlay() {
    if (!eqOverlay) eqOverlay = eqCreateModal();
    return eqOverlay;
  }

  function eqOpen(productKey) {
    const overlay = eqGetOverlay();
    const data    = eqProductData[productKey] || {
      tag: 'Products', title: 'Get a Quote',
      subtitle: 'Fill in your details — we respond within 24 hours.',
      select: 'other', msg: ''
    };

    overlay.querySelector('#eq-tag').textContent     = data.tag;
    overlay.querySelector('#eq-title').textContent   = data.title;
    overlay.querySelector('#eq-subtitle').textContent = data.subtitle;
    overlay.querySelector('#eq-service').value        = data.select;
    overlay.querySelector('#eq-msg').value            = data.msg;
    overlay.querySelector('#eq-source').value         = `modal-${productKey}`;

    // Reset attribution fields
    const eqHeardVia = overlay.querySelector('#eq-heard-via');
    if (eqHeardVia) eqHeardVia.value = '';
    const eqHeardViaOtherGroup = overlay.querySelector('#eq-heard-via-other-group');
    if (eqHeardViaOtherGroup) eqHeardViaOtherGroup.style.display = 'none';
    const eqHeardViaOther = overlay.querySelector('#eq-heard-via-other');
    if (eqHeardViaOther) {
      eqHeardViaOther.value = '';
      eqHeardViaOther.removeAttribute('required');
    }

    // Reset to form view
    overlay.querySelector('#eq-form').style.display    = '';
    overlay.querySelector('#eq-success').style.display = 'none';
    const submitBtn = overlay.querySelector('#eq-submit');
    submitBtn.textContent = 'Send Enquiry ';
    const arrow = document.createElement('span');
    arrow.className = 'eq-arrow';
    arrow.textContent = '→';
    submitBtn.appendChild(arrow);
    submitBtn.disabled = false;

    overlay.classList.add('eq-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => overlay.querySelector('#eq-fname')?.focus(), 350);
  }

  function eqClose() {
    if (!eqOverlay) return;
    eqOverlay.classList.remove('eq-open');
    document.body.style.overflow = '';
    if (eqStopConfetti) { eqStopConfetti(); eqStopConfetti = null; }
  }

  function eqFireConfetti() {
    const canvas = document.getElementById('eq-confetti');
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    const COLORS = ['#00B4D8','#F59E0B','#1B2D6E','#10B981','#EF4444','#8B5CF6','#F97316','#EC4899'];
    const particles = Array.from({ length: 160 }, () => ({
      x:  Math.random() * canvas.width,
      y: -20 - Math.random() * 120,
      w:  Math.random() * 13 + 4,
      h:  Math.random() * 6  + 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 6,
      vy:  Math.random() * 5 + 2,
      rotation: Math.random() * 360,
      vr: (Math.random() - 0.5) * 12,
      opacity: 1,
    }));

    let raf;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.09;                  // gravity
        p.rotation += p.vr;
        p.opacity  -= 0.0055;
        if (p.opacity <= 0) return;
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (alive) {
        raf = requestAnimationFrame(animate);
      } else {
        canvas.style.display = 'none';
      }
    }
    animate();
    return () => { cancelAnimationFrame(raf); canvas.style.display = 'none'; };
  }

  // Handle modal form submission
  document.addEventListener('submit', async (e) => {
    if (e.target.id !== 'eq-form') return;
    e.preventDefault();
    const form    = e.target;
    const btn     = document.getElementById('eq-submit');
    btn.textContent = 'Sending…';
    btn.disabled    = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.style.display = 'none';
        const success = document.getElementById('eq-success');
        success.style.display = 'flex';
        eqStopConfetti = eqFireConfetti();
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || 'Something went wrong. Please try WhatsApp or email us directly.');
        btn.textContent = 'Send Enquiry →';
        btn.disabled    = false;
      }
    } catch {
      alert('Network error. Please try WhatsApp or email us directly.');
      btn.textContent = 'Send Enquiry →';
      btn.disabled    = false;
    }
  });

  // Open modal on any [data-product] button click (event delegation)
  document.addEventListener('click', (e) => {
    const productBtn = e.target.closest('[data-product]');
    if (productBtn) {
      e.preventDefault();
      eqOpen(productBtn.dataset.product);
      return;
    }
    // Close on backdrop or ✕ button
    if (e.target.id === 'eq-overlay' || e.target.closest('#eq-close-btn')) {
      eqClose();
    }
  });

  // Handle "Other" marketing option for both contact page form and enquiry modal
  document.addEventListener('change', (e) => {
    if (e.target.id === 'heard-via' || e.target.id === 'eq-heard-via') {
      const isModal = e.target.id === 'eq-heard-via';
      const otherGroup = document.getElementById(isModal ? 'eq-heard-via-other-group' : 'heard-via-other-group');
      const otherInput = document.getElementById(isModal ? 'eq-heard-via-other' : 'heard-via-other');
      
      if (e.target.value === 'other') {
        if (otherGroup) otherGroup.style.display = 'block';
        if (otherInput) otherInput.setAttribute('required', 'required');
      } else {
        if (otherGroup) otherGroup.style.display = 'none';
        if (otherInput) {
          otherInput.value = '';
          otherInput.removeAttribute('required');
        }
      }
    }
  });

});

