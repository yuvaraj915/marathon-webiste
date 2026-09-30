const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

/*hero section image slider js*/
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
}, 4000);


/*js for scroll animation after image slider section*/
const distanceItems = ['5 KM', '10 KM', '15 KM', '21 KM'];
const distanceTrack = document.getElementById('distance-track');
distanceTrack.innerHTML = [...distanceItems, ...distanceItems, ...distanceItems, ...distanceItems]
  .map(t => `<span>${t}</span>`).join('');