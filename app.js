/* ==========================================================================
   1. Mobile Menu Toggle
   ========================================================================== */
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');

if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });
}


/* ==========================================================================
   2. Pre-select Race from URL (?race=...)
   ========================================================================== */
const params = new URLSearchParams(location.search);
const race = params.get('race');
const raceSelect = document.querySelector('#race');

if (race && raceSelect) {
  raceSelect.value = race;
}


/* ==========================================================================
   3. Form Handling (submit -> success message -> reset)
   ========================================================================== */
function connectForm(formId, successId) {
  const form = document.querySelector(formId);
  const success = document.querySelector(successId);

  if (!form || !success) return;

  // On submit: validate, hide form, show success message
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    form.hidden = true;
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // On reset button: hide success message, show empty form again
  success.querySelector('.reset-form')?.addEventListener('click', () => {
    success.hidden = true;
    form.hidden = false;
    form.reset();
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

connectForm('#registration-form', '#registration-success');
connectForm('#contact-form', '#contact-success');

/* js for image slider hero sction */

  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots .dot');
  let current = 0;
  let timer;

  function showSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    timer = setInterval(() => showSlide(current + 1), 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      showSlide(i);
      startAuto();
    });
  });

  startAuto();

