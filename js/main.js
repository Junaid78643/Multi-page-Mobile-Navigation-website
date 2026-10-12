/**
 * LUMINA CREATIVE STUDIO - MAIN GLOBAL SCRIPT
 * Utility interactions, FAQ accordion, back-to-top button, newsletter feedback
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Year
    const yearEls = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearEls.forEach((el) => {
      el.textContent = currentYear;
    });

    // 2. Back-To-Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
      function toggleBackToTop() {
        if (window.scrollY > 350) {
          backToTopBtn.classList.add('is-visible');
        } else {
          backToTopBtn.classList.remove('is-visible');
        }
      }

      window.addEventListener('scroll', toggleBackToTop, { passive: true });
      toggleBackToTop();

      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    }

    // 3. FAQ Accordion Interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      const btn = item.querySelector('.faq-question-btn');
      const answer = item.querySelector('.faq-answer-collapse');

      if (btn && answer) {
        btn.addEventListener('click', () => {
          const isOpen = item.classList.contains('is-open');

          // Close all other open accordion items
          faqItems.forEach((otherItem) => {
            if (otherItem !== item && otherItem.classList.contains('is-open')) {
              otherItem.classList.remove('is-open');
              const otherBtn = otherItem.querySelector('.faq-question-btn');
              const otherAnswer = otherItem.querySelector('.faq-answer-collapse');
              if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
              if (otherAnswer) otherAnswer.style.maxHeight = null;
            }
          });

          // Toggle clicked item
          if (isOpen) {
            item.classList.remove('is-open');
            btn.setAttribute('aria-expanded', 'false');
            answer.style.maxHeight = null;
          } else {
            item.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        });
      }
    });

    // 4. Newsletter Subscription Form Handler
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('.newsletter-input');
        if (input && input.value.trim()) {
          const originalPlaceholder = input.placeholder;
          input.value = '';
          input.placeholder = '✓ Subscribed successfully!';
          input.disabled = true;

          setTimeout(() => {
            input.disabled = false;
            input.placeholder = originalPlaceholder;
          }, 3500);
        }
      });
    }
  });
})();
