import { galleryImages } from './gallery-images.js';

const { commercial: commercialImages, residential: residentialImages, solar: solarImages } = galleryImages;

const gallery = (category, images) => Array.from({ length: 6 }, (_, index) => {
  const file = images[index];
  return `<div class="work-slot"><img data-gallery="${category}" data-index="${index}" src="/images/${category}/${file}" alt="${category} electrical project"></div>`;
}).join('');

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
  <div class="contact-block" id="contact"><h2>Let's talk about your project</h2><p>We respond to all requests within one business day.<br>Serving Utah County, Salt Lake County, and surrounding areas.</p><div class="contact-info"><a href="tel:+13854970937" class="contact-item">+1 385-497-0937</a><a href="mailto:rmzsolutionsllc@gmail.com" class="contact-item">rmzsolutionsllc@gmail.com</a></div><a href="mailto:rmzsolutionsllc@gmail.com" class="btn-white">Request a free estimate</a></div>
  <footer><span>© 2026 RMZ Solutions LLC · Orem, UT</span><span>E200 &amp; B100 Licensed &amp; Insured</span></footer>
`;

if (window.location.pathname.replace(/\/+$/, '') === '/work') {
  document.body.innerHTML = workPage;
  document.title = 'Our Work - RMZ Solutions';

  document.querySelectorAll('[data-gallery]').forEach((image) => {
    const category = image.dataset.gallery;
    const images = { commercial: commercialImages, residential: residentialImages, solar: solarImages }[category];
    let currentIndex = Number(image.dataset.index);

    const rotateImage = () => {
      let nextIndex = Math.floor(Math.random() * images.length);
      while (images.length > 1 && nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * images.length);
      }
      currentIndex = nextIndex;
      image.src = `/images/${category}/${images[currentIndex]}`;
      window.setTimeout(rotateImage, 4000 + Math.random() * 4000);
    };

    window.setTimeout(rotateImage, 4000 + Math.random() * 4000);
  });
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
