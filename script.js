/* ============================================================
   Triple Crown Properties LLC — Script
   ============================================================ */

/* --- Navbar scroll effect --- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* --- Mobile hamburger --- */
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.nav-mobile');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

/* --- Smooth-scroll for all anchor links --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* --- Contact form (Netlify / Formspree compatible) --- */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn    = form.querySelector('.btn-submit');
    const notice = form.querySelector('.form-success');
    const agreed = form.querySelector('#smsConsent').checked;

    if (!agreed) {
      alert('Please check the consent box before submitting.');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      /* Formspree: replace "YOUR_FORM_ID" in index.html action attribute.
         Netlify Forms: works automatically when deployed on Netlify.      */
      const resp = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (resp.ok) {
        form.style.display = 'none';
        notice.style.display = 'block';
      } else {
        throw new Error('Server error');
      }
    } catch {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      alert('Something went wrong. Please email us directly at contact@triplecrownpropertiesllc.com');
    }
  });
}

/* --- Intersection Observer — fade-in on scroll --- */
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
