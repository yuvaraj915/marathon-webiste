// ---------- Page navigation ----------
const pages = { home: document.getElementById('page-home'),
                about: document.getElementById('page-about'),
                contact: document.getElementById('page-contact') };
const navLinks = document.querySelectorAll('.nav-links a');

function goTo(name){
  Object.values(pages).forEach(p => p.classList.remove('active'));
  pages[name].classList.add('active');
  navLinks.forEach(l => l.classList.toggle('active', l.dataset.nav === name));
  window.scrollTo({top:0, behavior:'instant'});
}

document.querySelectorAll('[data-nav]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    goTo(el.dataset.nav);
    closeMobileMenu();
  });
});

// ---------- Mobile menu ----------
const burger = document.getElementById('burger');
const navLinksWrap = document.querySelector('.nav-links');
const headerEl = document.querySelector('header');

function openMobileMenu(){
  burger.classList.add('open');
  navLinksWrap.style.display = 'flex';
  Object.assign(navLinksWrap.style, {
    flexDirection:'column',
    position:'fixed',
    top: headerEl.offsetHeight + 'px',
    left:'0', right:'0',
    background:'#ffffff',
    padding:'24px 22px',
    gap:'18px',
    borderBottom:'1px solid #e2e2e0',
    zIndex:200
  });
}

function closeMobileMenu(){
  burger.classList.remove('open');
  navLinksWrap.style.display = 'none';
}

burger.addEventListener('click', () => {
  const isOpen = burger.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

// ---------- Marquee ----------
const marqueeItems = ['42.195 KM','21KM','15KM','10KM', '5KM', '3KM', 'One start', 'Your finish', 'Race the city'];
const track = document.getElementById('marquee-track');
track.innerHTML = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]
  .map(t => `<span>${t} ·</span>`).join('');

// ---------- Animated stat counters ----------
const statEls = document.querySelectorAll('.stat-num');
const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1300;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
};
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { animateCount(entry.target); statObserver.unobserve(entry.target); }
  });
}, { threshold: 0.5 });
statEls.forEach(el => statObserver.observe(el));

// ---------- Contact form ----------
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  note.classList.add('show');
  form.reset();
});

// ---------- Hero image slider ----------
const slides = document.querySelectorAll('#hero-slider .slide');
const dotsWrap = document.getElementById('hero-dots');
let currentSlide = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToSlide(i));
  dotsWrap.appendChild(dot);
});
const dots = dotsWrap.querySelectorAll('.dot');

function goToSlide(index){
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

setInterval(() => {
  goToSlide((currentSlide + 1) % slides.length);
}, 4000); // change slide every 4 seconds

/* ---------- Upcoming events: single button collapses/expands the whole race-grid ---------- */
const toggleBtn = document.getElementById('toggle-races');
const raceGrid = document.getElementById('race-grid');

toggleBtn.addEventListener('click', () => {
  raceGrid.classList.toggle('closed');
  toggleBtn.classList.toggle('closed');
  toggleBtn.setAttribute('aria-expanded', raceGrid.classList.contains('closed') ? 'false' : 'true');
});

// ---------- Beta banner dismiss ----------
const betaBanner = document.getElementById('beta-banner');
const betaClose = document.getElementById('beta-close');
if (betaBanner && betaClose) {
  betaClose.addEventListener('click', () => {
    betaBanner.classList.add('hidden');
  });
}