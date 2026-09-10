const solarImages = [
  ['20241114_155956.jpg', 'Solar panel installation overlooking a landscaped property'],
  ['20241114_155817.jpg', 'Solar panels installed on a residential roof'],
  ['20241113_150332.jpg', 'Residential solar panels with mountain view'],
  ['20241102_152711.jpg', 'Solar panel array on a rooftop'],
  ['20240815_112340.jpg', 'Solar energy installation in Utah'],
  ['20240619_100232.jpg', 'Completed rooftop solar installation']
];

const commercialImages = [
  '20240307_131844.jpg', '20240307_155316.jpg', '20240308_152849.jpg', '20241007_060338.jpg',
  '20241112_162218.jpg', '20250305_110037.jpg', '20250313_105910.jpg', '20250324_105227.jpg',
  '20250603_142236.jpg', '20250603_165340.jpg', '20250626_145226.jpg', '20250716_140619.jpg',
  '20250723_100607.jpg', '20250724_185233.jpg', '20250805_153957.jpg', '20250805_154006.jpg',
  '20250805_154013.jpg', '20250806_115054.jpg', '20251008_134727.jpg', '20251008_135548.jpg',
  '20251009_182513.jpg', '20251018_181805.jpg', '20251028_085332.jpg', '20251104_164857.jpg',
  '20251106_153656.jpg', '20251112_152955.jpg', '20251112_153004.jpg', '20251219_150345.jpg',
  '20260507_145043.jpg', '20260507_181032.jpg', '20260602_111951.jpg', '20260602_112019.jpg'
];

const residentialImages = [
  '20240508_111829.jpg', '20240508_124617.jpg', '20240807_120622.jpg', '20241210_122424.jpg',
  '20241210_203345.jpg', '20241211_195003.jpg', '20241214_173941.jpg', '20241214_173945.jpg',
  '20250206_154400.jpg', '20250207_142731.jpg', '20250226_091025.jpg', '20250307_172805.jpg',
  '20250418_201034.jpg', '20250418_201046.jpg', '20250428_155143.jpg', '20250602_151124.jpg',
  '20250905_171655.jpg', '20250918_152624.jpg', '20250918_163101.jpg', '20250924_140845.jpg',
  '20251002_150102.jpg', '20251006_182709.jpg', '20251201_170315.jpg', '20251210_163909.jpg',
  '20251212_140251.jpg', '20251230_122827.jpg', '20260102_145358.jpg', '20260203_173954.jpg',
  '20260204_100907.jpg', '20260317_120124.jpg', '20260320_102956.jpg', '20260328_153251.jpg',
  '20260425_140807.jpg', '20260625_160259.jpg', 'IMG-20260331-WA0045.jpg'
];

const galleryMarkup = (key, files, label) => `
  <div class="work-grid image-gallery" data-gallery="${key}">
    ${files.slice(0, 6).map((file, index) => `<div class="work-slot"><img data-gallery-image="${index}" src="/images/${key}/${file}" alt="${label} project ${index + 1}"></div>`).join('')}
  </div>
`;

const projectPlaceholders = (type) => Array.from({ length: 6 }, (_, index) => (
  `<div class="work-slot"><span class="work-slot-label">${type} Project ${index + 1}</span></div>`
)).join('');

const solarProjects = solarImages.map(([file, alt]) => (
  `<div class="work-slot"><img src="/images/solar/${file}" alt="${alt}"></div>`
)).join('');

const workPage = `
  <nav>
    <a href="/" class="logo"><img src="/images/logo.png" alt="RMZ Solutions Logo" /></a>
    <ul class="nav-links"><li><a href="/#services">Services</a></li><li><a href="/work/">Our work</a></li></ul>
    <a href="/#contact" class="btn-nav">Get a quote</a>
  </nav>
  <section class="section"><p class="section-label">Commercial Electrical</p><p class="work-description">Tenant improvements, warehouse lighting, panel upgrades, and full commercial builds for GCs and developers. Our team brings years of experience in high-voltage systems and complex electrical infrastructure.</p>${galleryMarkup('commercial', commercialImages, 'Commercial')}</section>
  <section class="section"><p class="section-label">Residential Electrical</p><p class="work-description">New construction, remodels, service upgrades, and EV chargers — all permitted and NEC-compliant. We specialize in bringing homes up to modern electrical standards with attention to safety and efficiency.</p>${galleryMarkup('residential', residentialImages, 'Residential')}</section>
  <section class="section"><p class="section-label">Renewable Energy</p><p class="work-description">Solar panel installations, battery storage systems, and grid-tie solutions. We help customers transition to clean energy with professionally installed systems designed for long-term performance and reliability.</p><div class="work-grid">${solarProjects}</div></section>
  <!-- Home Renovations temporarily hidden until project photos are added.
  <section class="section"><p class="section-label">Home Renovations</p><p class="work-description">Kitchen and bathroom remodels, lighting upgrades, and whole-home renovations. We coordinate electrical work seamlessly with other trades to deliver beautiful, fully functional spaces.</p><div class="work-grid">${projectPlaceholders('Renovation')}</div></section>
  -->
  <div class="contact-block" id="contact"><h2>Let's talk about your project</h2><p>We respond to all requests within one business day.<br>Serving Utah County, Salt Lake County, and surrounding areas.</p><div class="contact-info"><a href="tel:+13854970937" class="contact-item">+1 385-497-0937</a><a href="mailto:rmzsolutionsllc@gmail.com" class="contact-item">rmzsolutionsllc@gmail.com</a></div><a href="mailto:rmzsolutionsllc@gmail.com" class="btn-white">Request a free estimate</a></div>
  <footer><span>© 2026 RMZ Solutions LLC · Orem, UT</span><span>E200 &amp; B100 Licensed &amp; Insured</span></footer>
`;

if (window.location.pathname.replace(/\/+$/, '') === '/work') {
  document.body.innerHTML = workPage;
  document.title = 'Our Work - RMZ Solutions';

  startGalleryRotation('commercial', commercialImages);
  startGalleryRotation('residential', residentialImages);
}

function startGalleryRotation(key, files) {
  const gallery = document.querySelector(`[data-gallery="${key}"]`);
  if (!gallery || files.length <= 6) return;

  const images = [...gallery.querySelectorAll('[data-gallery-image]')];
  let nextFileIndex = 6;
  let slotIndex = 0;
  let nextChangeAt = 8000;
  const startedAt = performance.now();

  const changeImage = () => {
    if (nextFileIndex >= files.length) return;

    const image = images[slotIndex % images.length];
    const nextFile = files[nextFileIndex];
    image.classList.add('is-changing');
    image.onload = () => image.classList.remove('is-changing');
    image.src = `/images/${key}/${nextFile}`;
    image.alt = `${key} project ${nextFileIndex + 1}`;

    nextFileIndex += 1;
    slotIndex += 1;
    nextChangeAt += 3000;
    window.setTimeout(changeImage, Math.max(0, nextChangeAt - (performance.now() - startedAt)));
  };

  window.setTimeout(changeImage, nextChangeAt);
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
