// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Contact form submission
const contactForm = document.querySelector('.contact-block');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      if (result.success) {
        alert('¡Gracias por tu mensaje! Te responderemos pronto.');
        e.target.reset();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el mensaje. Intenta nuevamente.');
    }
  });
}

console.log('RMZ Solutions website loaded');
