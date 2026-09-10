const solarImages = [
  ['20241114_155956.jpg', 'Solar panel installation overlooking a landscaped property'],
  ['20241114_155817.jpg', 'Solar panels installed on a residential roof'],
  ['20241113_150332.jpg', 'Residential solar panels with mountain view'],
  ['20241102_152711.jpg', 'Solar panel array on a rooftop'],
  ['20240815_112340.jpg', 'Solar energy installation in Utah'],
  ['20240619_100232.jpg', 'Completed rooftop solar installation']
];

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
  <section class="section"><p class="section-label">Commercial Electrical</p><p class="work-description">Tenant improvements, warehouse lighting, panel upgrades, and full commercial builds for GCs and developers. Our team brings years of experience in high-voltage systems and complex electrical infrastructure.</p><div class="work-grid">${projectPlaceholders('Commercial')}</div></section>
  <section class="section"><p class="section-label">Residential Electrical</p><p class="work-description">New construction, remodels, service upgrades, and EV chargers — all permitted and NEC-compliant. We specialize in bringing homes up to modern electrical standards with attention to safety and efficiency.</p><div class="work-grid">${projectPlaceholders('Residential')}</div></section>
  <section class="section"><p class="section-label">Renewable Energy</p><p class="work-description">Solar panel installations, battery storage systems, and grid-tie solutions. We help customers transition to clean energy with professionally installed systems designed for long-term performance and reliability.</p><div class="work-grid">${solarProjects}</div></section>
  <section class="section"><p class="section-label">Home Renovations</p><p class="work-description">Kitchen and bathroom remodels, lighting upgrades, and whole-home renovations. We coordinate electrical work seamlessly with other trades to deliver beautiful, fully functional spaces.</p><div class="work-grid">${projectPlaceholders('Renovation')}</div></section>
  <div class="contact-block" id="contact"><h2>Let's talk about your project</h2><p>We respond to all requests within one business day.<br>Serving Utah County, Salt Lake County, and surrounding areas.</p><div class="contact-info"><a href="tel:+13854970937" class="contact-item">+1 385-497-0937</a><a href="mailto:rmzsolutionsllc@gmail.com" class="contact-item">rmzsolutionsllc@gmail.com</a></div><a href="mailto:rmzsolutionsllc@gmail.com" class="btn-white">Request a free estimate</a></div>
  <footer><span>© 2026 RMZ Solutions LLC · Orem, UT</span><span>E200 &amp; B100 Licensed &amp; Insured</span></footer>
`;

if (window.location.pathname.replace(/\/+$/, '') === '/work') {
  document.body.innerHTML = workPage;
  document.title = 'Our Work - RMZ Solutions';
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
