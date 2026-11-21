
/* Cycling words under the hero heading */
const words = [
  'DATA ANALYST',
  'RESEARCHER',
  'BUILDER',
  'TRAVELER',
  'PHOTOGRAPHER',
  'PROBLEM SOLVER'
];

const cycleElement = document.getElementById('cycle');

if (cycleElement) {
  let wordIndex = 0;

  setInterval(() => {
    wordIndex = (wordIndex + 1) % words.length;
    cycleElement.textContent = words[wordIndex];
  }, 2200);
}

/* Reveal sections while scrolling */
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => {
    element.classList.add('visible');
  });
}

/* Interactive navigation */
const navLinks = Array.from(
  document.querySelectorAll('.nav nav a[href^="#"]')
);

const sectionLinks = navLinks.map(link => ({
  link,
  section: document.querySelector(link.getAttribute('href'))
})).filter(item => item.section);

/* Set active navigation tab */
function setActiveNav(id) {
  sectionLinks.forEach(({ link, section }) => {
    const active = section.id === id;

    link.classList.toggle('active', active);

    if (active) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

/* Automatically highlight tabs while scrolling */
function updateActiveNav() {
  let current = 'home';

  sectionLinks.forEach(({ section }) => {
    if (section.getBoundingClientRect().top <= 180) {
      current = section.id;
    }
  });

  setActiveNav(current);
}

/* Click interaction */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    setActiveNav(link.getAttribute('href').slice(1));
  });
});

/* Scroll interaction */
window.addEventListener('scroll', updateActiveNav, {
  passive: true
});

window.addEventListener('load', updateActiveNav);

updateActiveNav();
