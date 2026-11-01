/**
 * MUEEN GARDEN'S LLP - Luxury Landscape & Irrigation Systems
 * Core Client-Side Interactions & Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initGardenStyleTabs();
  initComparisonSlider();
  initIrrigationCalculator();
  initPortfolioFilters();
  initPortfolioModal();
  initFaqAccordion();
  initLeadForms();
  initStatCounters();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   STICKY HEADER
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    toggleBtn.setAttribute(
      'aria-expanded',
      navMenu.classList.contains('open') ? 'true' : 'false'
    );
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   GARDEN STYLE EXPLORER TABS (FINASI FEATURE)
   -------------------------------------------------------------------------- */
function initGardenStyleTabs() {
  const tabBtns = document.querySelectorAll('.style-tab-btn');
  const panels = document.querySelectorAll('.style-content-panel');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStyle = btn.dataset.style;

      // Update button state
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panel visibility
      panels.forEach(panel => {
        if (panel.id === targetStyle) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   BEFORE & AFTER INTERACTIVE COMPARISON SLIDER
   -------------------------------------------------------------------------- */
function initComparisonSlider() {
  const slider = document.querySelector('.comparison-slider');
  if (!slider) return;

  const afterImgBox = slider.querySelector('.comparison-after');
  const handle = slider.querySelector('.comparison-handle');
  let isDown = false;

  function moveSlider(e) {
    if (!isDown) return;
    const rect = slider.getBoundingClientRect();
    const pageX = e.pageX !== undefined ? e.pageX : (e.touches ? e.touches[0].pageX : 0);
    let position = pageX - rect.left;

    if (position < 0) position = 0;
    if (position > rect.width) position = rect.width;

    const percentage = (position / rect.width) * 100;
    afterImgBox.style.width = percentage + '%';
    handle.style.left = percentage + '%';
  }

  // Mouse Events
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    moveSlider(e);
  });
  window.addEventListener('mouseup', () => { isDown = false; });
  window.addEventListener('mousemove', moveSlider);

  // Touch Events (Mobile)
  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    moveSlider(e);
  });
  window.addEventListener('touchend', () => { isDown = false; });
  window.addEventListener('touchmove', moveSlider);
}

/* --------------------------------------------------------------------------
   INTERACTIVE IRRIGATION & WATER SAVINGS CALCULATOR
   -------------------------------------------------------------------------- */
function initIrrigationCalculator() {
  const plotInput = document.getElementById('calcPlotArea');
  const typeSelect = document.getElementById('calcLandscapeType');
  const resultWater = document.getElementById('resultWaterSavings');
  const resultZones = document.getElementById('resultIrrigationZones');
  const resultTech = document.getElementById('resultTechSpec');
  const resultEstimate = document.getElementById('resultEstimatedRange');

  if (!plotInput || !typeSelect) return;

  function recalculate() {
    const area = parseFloat(plotInput.value) || 2400; // default sq ft
    const landscape = typeSelect.value;

    let waterSavedLitersYearly = Math.round(area * 14.5);
    let zones = Math.max(2, Math.ceil(area / 1200));
    let basePricePerSqFt = 45; // average landscape + smart irrigation in INR
    let techNote = 'Smart Drip & Rotors';

    if (landscape === 'villa_lawn') {
      basePricePerSqFt = 55;
      techNote = 'Hunter Pop-up Rotors & IoT Controller';
    } else if (landscape === 'tropical') {
      basePricePerSqFt = 75;
      techNote = 'Micro-Mist Drip + Multi-Zone Timers';
    } else if (landscape === 'commercial') {
      basePricePerSqFt = 42;
      zones = Math.max(4, Math.ceil(area / 2000));
      techNote = 'Heavy-Duty Solenoid Valves & Weather Station';
    } else if (landscape === 'terrace') {
      basePricePerSqFt = 85;
      zones = Math.max(1, Math.ceil(area / 800));
      techNote = 'Pressure Compensating Drip & Drainage Cell';
    }

    const estimatedMin = Math.round((area * basePricePerSqFt * 0.85) / 1000) * 1000;
    const estimatedMax = Math.round((area * basePricePerSqFt * 1.25) / 1000) * 1000;

    if (resultWater) resultWater.textContent = `${waterSavedLitersYearly.toLocaleString('en-IN')} L / Year`;
    if (resultZones) resultZones.textContent = `${zones} Automated Zones`;
    if (resultTech) resultTech.textContent = techNote;
    if (resultEstimate) resultEstimate.textContent = `₹${estimatedMin.toLocaleString('en-IN')} - ₹${estimatedMax.toLocaleString('en-IN')}`;
  }

  plotInput.addEventListener('input', recalculate);
  typeSelect.addEventListener('change', recalculate);
  recalculate();
}

/* --------------------------------------------------------------------------
   PORTFOLIO CATEGORY FILTERS
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const items = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   PORTFOLIO MODAL PREVIEW
   -------------------------------------------------------------------------- */
function initPortfolioModal() {
  const modal = document.getElementById('projectModal');
  const modalClose = document.querySelector('.modal-close-btn');
  const items = document.querySelectorAll('.portfolio-item');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalCat = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDescription');

  if (!modal) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.portfolio-title');
      const cat = item.querySelector('.portfolio-cat');
      const desc = item.dataset.details || 'Turnkey landscape architecture and automated irrigation engineering engineered by Mueen Garden’s LLP.';

      if (modalImg && img) modalImg.src = img.src;
      if (modalTitle && title) modalTitle.textContent = title.textContent;
      if (modalCat && cat) modalCat.textContent = cat.textContent;
      if (modalDesc) modalDesc.textContent = desc;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* --------------------------------------------------------------------------
   FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const headers = document.querySelectorAll('.faq-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');

      // Close other FAQs
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      // Toggle current
      item.classList.toggle('active', !isOpen);
    });
  });
}

/* --------------------------------------------------------------------------
   LEAD FORMS & WHATSAPP INTEGRATION
   -------------------------------------------------------------------------- */
function initLeadForms() {
  const targetPhone = '919844135235';

  // Hero Quick Form
  const heroForm = document.getElementById('heroQuickForm');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = heroForm.querySelector('[name="name"]')?.value || 'Client';
      const phone = heroForm.querySelector('[name="phone"]')?.value || '';
      const service = heroForm.querySelector('[name="service"]')?.value || 'Landscaping & Irrigation';
      const location = heroForm.querySelector('[name="location"]')?.value || 'Bengaluru';

      const message = `Hello Mueen Garden's LLP!%0A%0AMy name is *${encodeURIComponent(name)}*.%0APhone: *${encodeURIComponent(phone)}*%0ALocation: *${encodeURIComponent(location)}*%0AI am looking for: *${encodeURIComponent(service)}*.%0APlease schedule an on-site consultation for my property.`;

      window.open(`https://wa.me/${targetPhone}?text=${message}`, '_blank');
      heroForm.reset();
    });
  }

  // Full Lead Form in Contact Section
  const contactForm = document.getElementById('consultationForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]')?.value || 'Client';
      const phone = contactForm.querySelector('[name="phone"]')?.value || '';
      const email = contactForm.querySelector('[name="email"]')?.value || 'Not provided';
      const service = contactForm.querySelector('[name="service"]')?.value || 'Landscaping & Irrigation';
      const property = contactForm.querySelector('[name="property"]')?.value || 'Private Villa';
      const notes = contactForm.querySelector('[name="notes"]')?.value || 'Please reach out regarding a consultation.';

      const message = `*NEW INQUIRY - MUEEN GARDEN'S LLP*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Email:* ${encodeURIComponent(email)}%0A*Property Type:* ${encodeURIComponent(property)}%0A*Service:* ${encodeURIComponent(service)}%0A*Project Details:* ${encodeURIComponent(notes)}`;

      window.open(`https://wa.me/${targetPhone}?text=${message}`, '_blank');
      alert('Thank you! Your inquiry is being forwarded to Mueen Garden\'s LLP via WhatsApp.');
      contactForm.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   ANIMATED STAT COUNTERS
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 1800; // ms
          const stepTime = 30;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = `${prefix}${target}${suffix}`;
              clearInterval(timer);
            } else {
              counter.textContent = `${prefix}${Math.floor(current)}${suffix}`;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsBanner = document.querySelector('.stats-banner');
  if (statsBanner) observer.observe(statsBanner);
}

/* --------------------------------------------------------------------------
   BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
