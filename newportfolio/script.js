document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  if (typeof Typed !== 'undefined') {
    new Typed('.highlight', {
      strings: ['Software developer', 'FastAPI or Django Developer', 'Data Science and Engineer' ,'GenAI Enthusiast'],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1200,
      loop: true,
      smartBackspace: true,
    });
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.getElementById("year").textContent = new Date().getFullYear();
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
});
