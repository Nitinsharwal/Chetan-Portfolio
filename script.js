document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach((link) =>
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      })
    );
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      }
    });
  }

  /* ---------- Typed.js headline ---------- */
  if (typeof Typed !== 'undefined') {
    new Typed('.highlight', {
      strings: ['Software Developer', 'FastAPI / Django Developer', 'Data Engineer', 'GenAI Enthusiast'],
      typeSpeed: 65,
      backSpeed: 35,
      backDelay: 1400,
      loop: true,
      smartBackspace: true,
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // small stagger by index in batch
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---------- Scroll progress + back-to-top ---------- */
  const bar = document.querySelector('.scroll-progress');
  const backTop = document.getElementById('backTop');
  const updateScroll = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    if (bar) bar.style.width = (scrolled * 100).toFixed(2) + '%';
    if (backTop) backTop.classList.toggle('show', h.scrollTop > 480);
  };
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();
  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Aurora spotlight follows the cursor ---------- */
  if (!isCoarse && !prefersReduced) {
    const spot = document.querySelector('.spotlight');
    if (spot) {
      let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
      let cx = tx, cy = ty;
      let raf = null;
      window.addEventListener('mousemove', (e) => {
        tx = e.clientX; ty = e.clientY;
        if (!spot.classList.contains('active')) spot.classList.add('active');
        if (!raf) raf = requestAnimationFrame(animate);
      });
      window.addEventListener('mouseleave', () => spot.classList.remove('active'));
      const animate = () => {
        cx += (tx - cx) * 0.12;
        cy += (ty - cy) * 0.12;
        spot.style.setProperty('--sx', cx + 'px');
        spot.style.setProperty('--sy', cy + 'px');
        if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
          raf = requestAnimationFrame(animate);
        } else {
          raf = null;
        }
      };
    }
  }

  /* ---------- Magnetic buttons ---------- */
  if (!isCoarse && !prefersReduced) {
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- 3D tilt on data-tilt + cards ---------- */
  if (!isCoarse && !prefersReduced) {
    const tiltEls = document.querySelectorAll('[data-tilt], .project-card, .skill-card, .card, .cert-card, .edu-card, .extra-card');
    tiltEls.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (py - 0.5) * -8;
        const ry = (px - 0.5) * 10;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Smooth anchor scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
        }
      }
    });
  });
});
