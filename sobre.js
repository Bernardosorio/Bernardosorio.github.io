/* ============================================================
   "Quem sou eu" — entrance reveal.
   Self-contained: only touches elements inside .sobre.
   ============================================================ */
(() => {
  'use strict';

  const section = document.querySelector('.sobre');
  if (!section) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      section.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .15 });
  revealObserver.observe(section);
})();
