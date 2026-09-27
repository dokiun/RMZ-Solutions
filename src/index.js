import { galleryImages } from './gallery-images.js';

const { commercial: commercialImages, residential: residentialImages, solar: solarImages } = galleryImages;

const gallery = (category, images) => Array.from({ length: 6 }, (_, index) => {
  const file = images[index];
  return `<button class="work-slot" type="button" data-gallery="${category}" data-index="${index}" aria-pressed="false" aria-label="View ${category} project photo">
    <span class="gallery-media">
      <img class="gallery-image" data-layer="0" src="/images/${category}/${file}" alt="${category} electrical project">
      <img class="gallery-image" data-layer="1" alt="" aria-hidden="true">
    </span>
  </button>`;
}).join('');

const homeCarouselImages = [
  ...commercialImages.slice(0, 4).map((file) => ['commercial', file, 'Commercial electrical project']),
  ...residentialImages.slice(0, 4).map((file) => ['residential', file, 'Residential electrical project']),
  ...solarImages.slice(0, 4).map((file) => ['solar', file, 'Solar installation project']),
];

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

const estimateForm = `
  <form class="estimate-form" action="https://formsubmit.co/rmzsolutionsllc@gmail.com" method="POST">
    <input type="hidden" name="_subject" value="New estimate request from RMZ Solutions website">
    <input type="hidden" name="_template" value="table">
    <input type="hidden" name="_next" value="https://rmzsolutionsutah.com/thanks.html">
    <div class="estimate-honeypot" aria-hidden="true">
      <label for="work-website">Leave this field empty</label>
      <input id="work-website" type="text" name="_honey" tabindex="-1" autocomplete="off">
    </div>
    <div class="estimate-fields">
      <div class="estimate-field">
        <label for="work-estimate-name">Name</label>
        <input id="work-estimate-name" name="name" type="text" autocomplete="name" maxlength="100" required>
      </div>
      <div class="estimate-field">
        <label for="work-estimate-email">Email</label>
        <input id="work-estimate-email" name="email" type="email" autocomplete="email" maxlength="160" required>
      </div>
      <div class="estimate-field">
        <label for="work-estimate-phone">Phone</label>
        <input id="work-estimate-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" maxlength="30" required>
      </div>
      <div class="estimate-field">
        <label for="work-estimate-city">City</label>
        <input id="work-estimate-city" name="city" type="text" autocomplete="address-level2" maxlength="80" required>
      </div>
      <div class="estimate-field estimate-field-wide">
        <label for="work-estimate-description">Describe the work</label>
        <textarea id="work-estimate-description" name="description" rows="5" maxlength="2000" required></textarea>
      </div>
    </div>
    <button class="btn-white estimate-submit" type="submit">Request a free estimate</button>
  </form>`;

const renderHomeCarousel = () => {
  const carousel = document.querySelector('#home-carousel');
  if (!carousel) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const track = carousel.querySelector('[data-photo-track]');
  const sequence = shuffle(homeCarouselImages);
  const cards = sequence.map(([category, file, alt]) => `
    <a class="home-photo-card" href="/work/" aria-label="View ${alt.toLowerCase()} in the full gallery">
      <img src="/images/${category}/${file}" alt="${alt}">
    </a>
  `).join('');
  track.innerHTML = `${cards}${cards}`;

  const imageReady = (image) => image.complete
    ? Promise.resolve()
    : new Promise((resolve) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    });

  const updateMotion = () => {
    track.classList.toggle('is-static', reducedMotion.matches);
  };
  const updateLoopDistance = () => {
    const secondSequenceStart = track.children[sequence.length];
    if (secondSequenceStart) {
      track.style.setProperty('--home-loop-distance', `${secondSequenceStart.offsetLeft}px`);
    }
  };
  updateMotion();
  updateLoopDistance();
  reducedMotion.addEventListener('change', updateMotion);
  Promise.all([...track.querySelectorAll('img')].map(imageReady)).then(() => {
    updateLoopDistance();
    track.classList.add('is-ready');
  });
  window.addEventListener('resize', updateLoopDistance);
};

const workPage = `
  <nav>
    <a href="/" class="logo"><img src="/images/logo.png" alt="RMZ Solutions Logo" /></a>
    <ul class="nav-links"><li><a href="/#services">Services</a></li><li><a href="/work/">Our work</a></li></ul>
    <a href="/#contact" class="btn-nav">Get a quote</a>
  </nav>
  <section class="section"><p class="section-label">Commercial Electrical</p><p class="work-description">Tenant improvements, warehouse lighting, panel upgrades, and full commercial builds for GCs and developers. Our team brings years of experience in high-voltage systems and complex electrical infrastructure.</p><div class="work-grid">${gallery('commercial', commercialImages)}</div></section>
  <section class="section"><p class="section-label">Residential Electrical</p><p class="work-description">New construction, remodels, service upgrades, and EV chargers — all permitted and NEC-compliant. We specialize in bringing homes up to modern electrical standards with attention to safety and efficiency.</p><div class="work-grid">${gallery('residential', residentialImages)}</div></section>
  <section class="section"><p class="section-label">Renewable Energy</p><p class="work-description">Solar panel installations, battery storage systems, and grid-tie solutions. We help customers transition to clean energy with professionally installed systems designed for long-term performance and reliability.</p><div class="work-grid">${gallery('solar', solarImages)}</div></section>
  <!-- Home Renovations temporarily hidden until project photos are added. -->
  <div class="contact-block" id="contact"><h2>Let's talk about your project</h2><p>We respond to all requests within one business day.<br>Serving Utah County, Salt Lake County, and surrounding areas.</p><div class="contact-info"><a href="tel:+13854970937" class="contact-item">+1 385-497-0937</a><a href="mailto:rmzsolutionsllc@gmail.com" class="contact-item">rmzsolutionsllc@gmail.com</a></div>${estimateForm}</div>
  <footer><span>© 2026 RMZ Solutions LLC · Orem, UT</span><span class="footer-license">DOPL #14299094-5501 · E200 &amp; B100</span><span>Licensed &amp; Insured</span></footer>
`;

if (window.location.pathname.replace(/\/+$/, '') === '/work') {
  document.body.innerHTML = workPage;
  document.title = 'Our Work - RMZ Solutions';

  const imageSets = { commercial: commercialImages, residential: residentialImages, solar: solarImages };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const slotsByCategory = new Map();
  const pendingIndexesByCategory = new Map();

  const rememberNaturalSize = (image) => {
    if (!image.naturalWidth || !image.naturalHeight) return;
    const maxWidth = Math.min(window.innerWidth * 0.68, 620);
    const maxHeight = Math.min(window.innerHeight * 0.68, 620);
    const scale = Math.min(1, maxWidth / image.naturalWidth, maxHeight / image.naturalHeight);
    image.style.setProperty('--natural-width', `${image.naturalWidth}px`);
    image.style.setProperty('--natural-height', `${image.naturalHeight}px`);
    image.style.setProperty('--expanded-width', `${image.naturalWidth * scale}px`);
    image.style.setProperty('--expanded-height', `${image.naturalHeight * scale}px`);
  };

  document.querySelectorAll('[data-gallery]').forEach((slot) => {
    const category = slot.dataset.gallery;
    const slots = slotsByCategory.get(category) || [];
    slots.push({
      element: slot,
      currentIndex: Number(slot.dataset.index),
      activeLayer: 0,
      timer: null,
      transitionTimer: null,
    });
    slotsByCategory.set(category, slots);
  });

  const scheduleRotation = (slotState, delay = 8000 + Math.random() * 4000) => {
    if (reducedMotion.matches) return;
    window.clearTimeout(slotState.timer);
    slotState.timer = window.setTimeout(() => rotateImage(slotState), delay);
  };

  const rotateImage = (slotState) => {
    const category = slotState.element.dataset.gallery;
    const images = imageSets[category];
    const visibleIndexes = new Set((slotsByCategory.get(category) || []).map((item) => item.currentIndex));
    const pendingIndexes = pendingIndexesByCategory.get(category) || new Set();
    const availableIndexes = images
      .map((_, index) => index)
      .filter((index) => !visibleIndexes.has(index) && !pendingIndexes.has(index));
    const candidates = availableIndexes.length ? availableIndexes : images
      .map((_, index) => index)
      .filter((index) => index !== slotState.currentIndex && !pendingIndexes.has(index));

    if (!candidates.length) {
      scheduleRotation(slotState);
      return;
    }

    const nextIndex = candidates[Math.floor(Math.random() * candidates.length)];
    const nextLayer = 1 - slotState.activeLayer;
    const nextImage = slotState.element.querySelector(`[data-layer="${nextLayer}"]`);
    const currentImage = slotState.element.querySelector(`[data-layer="${slotState.activeLayer}"]`);
    const nextSrc = `/images/${category}/${images[nextIndex]}`;
    pendingIndexes.add(nextIndex);
    pendingIndexesByCategory.set(category, pendingIndexes);

    nextImage.onload = () => {
      pendingIndexes.delete(nextIndex);
      rememberNaturalSize(nextImage);
      nextImage.alt = `${category} electrical project`;
      nextImage.removeAttribute('aria-hidden');
      slotState.element.dataset.activeLayer = String(nextLayer);
      slotState.currentIndex = nextIndex;
      slotState.activeLayer = nextLayer;
      currentImage.alt = '';
      currentImage.setAttribute('aria-hidden', 'true');
      window.clearTimeout(slotState.transitionTimer);
      slotState.transitionTimer = window.setTimeout(() => {
        currentImage.removeAttribute('src');
      }, 700);
      scheduleRotation(slotState);
    };
    nextImage.onerror = () => {
      pendingIndexes.delete(nextIndex);
      scheduleRotation(slotState);
    };
    nextImage.addEventListener('load', () => rememberNaturalSize(nextImage), { once: true });
    nextImage.src = nextSrc;
  };

  slotsByCategory.forEach((slots) => {
    slots.forEach((slotState, index) => {
      slotState.element.dataset.activeLayer = '0';
      slotState.element.querySelectorAll('.gallery-image').forEach((image) => {
        if (image.complete) rememberNaturalSize(image);
        else image.addEventListener('load', () => rememberNaturalSize(image), { once: true });
      });
      scheduleRotation(slotState, 8000 + index * 650 + Math.random() * 3000);
    });
  });

  reducedMotion.addEventListener('change', () => {
    slotsByCategory.forEach((slots) => slots.forEach((slotState) => {
      if (reducedMotion.matches) {
        window.clearTimeout(slotState.timer);
      } else {
        scheduleRotation(slotState);
      }
    }));
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('.gallery-image').forEach(rememberNaturalSize);
  });
}

if (window.location.pathname.replace(/\/+$/, '') === '') {
  renderHomeCarousel();
}

document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href').replace(/^\//, ''));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
