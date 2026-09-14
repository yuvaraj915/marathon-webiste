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
  document.querySelector('.nav-links').style.display = '';
}

document.querySelectorAll('[data-nav]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    goTo(el.dataset.nav);
  });
});

// ---------- Mobile menu ----------
const burger = document.getElementById('burger');
const navLinksWrap = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  const open = navLinksWrap.style.display === 'flex';
  navLinksWrap.style.display = open ? 'none' : 'flex';
  Object.assign(navLinksWrap.style, {
    flexDirection:'column', position:'fixed', top:'64px', left:'0', right:'0',
    background:'#ffffff', padding:'24px 22px', gap:'18px',
    borderBottom:'1px solid #e2e2e0', zIndex:200
  });
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