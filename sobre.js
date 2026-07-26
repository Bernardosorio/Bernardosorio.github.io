/* ============================================================
   "Quem sou eu" — entrance reveal + stat count-up.
   Self-contained: only touches elements inside .sobre.
   ============================================================ */
(() => {
  'use strict';

  const section = document.querySelector('.sobre');
  if (!section) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCount(el, target, duration) {
    const prefix = el.textContent.match(/^\D*/)[0];
    const start = performance.now();
    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(target * eased);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      section.classList.add('is-visible');
      if (!prefersReducedMotion) {
        section.querySelectorAll('.sobre__stat-n[data-count]').forEach((el) => {
          animateCount(el, parseInt(el.dataset.count, 10), 1200);
        });
      }
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .15 });
  revealObserver.observe(section);
})();
