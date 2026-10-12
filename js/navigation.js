/**
 * LUMINA CREATIVE STUDIO - NAVIGATION & MOBILE MENU CONTROLLER
 * Smooth animated hamburger menu, active page tracking, and accessibility
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');
    const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const desktopLinks = document.querySelectorAll('.nav-link');

    let isMenuOpen = false;

    /**
     * Open Mobile Navigation Drawer
     */
    function openMenu() {
      if (isMenuOpen || !mobileDrawer || !hamburgerBtn) return;
      isMenuOpen = true;

      hamburgerBtn.classList.add('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');

      if (mobileBackdrop) {
        mobileBackdrop.classList.add('is-active');
        mobileBackdrop.setAttribute('aria-hidden', 'false');
      }

      mobileDrawer.classList.add('is-active');
      mobileDrawer.setAttribute('aria-hidden', 'false');

      // Lock body scroll
      document.body.classList.add('menu-open');
    }

    /**
     * Close Mobile Navigation Drawer
     */
    function closeMenu() {
      if (!isMenuOpen || !mobileDrawer || !hamburgerBtn) return;
      isMenuOpen = false;

      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');

      if (mobileBackdrop) {
        mobileBackdrop.classList.remove('is-active');
        mobileBackdrop.setAttribute('aria-hidden', 'true');
      }

      mobileDrawer.classList.remove('is-active');
      mobileDrawer.setAttribute('aria-hidden', 'true');

      // Unlock body scroll
      document.body.classList.remove('menu-open');
    }

    /**
     * Toggle Mobile Navigation
     */
    function toggleMenu() {
      if (isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Toggle button click listener
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
      });
    }

    // Close when clicking outside on backdrop
    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', () => {
        closeMenu();
      });
    }

    // Close when any mobile navigation link is clicked
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on Escape key press for keyboard accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
        if (hamburgerBtn) hamburgerBtn.focus();
      }
    });

    // Automatically close mobile menu if viewport resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
      }
    });

    /**
     * Header scroll shadow effect
     */
    function handleHeaderScroll() {
      if (!header) return;
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    /**
     * Active Navigation Link Detection
     * Automatically sets .active and aria-current="page" based on URL
     */
    function highlightActivePage() {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';

      const allNavLinks = [...desktopLinks, ...mobileLinks];
      allNavLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;

        const targetFile = href.split('/').pop() || 'index.html';
        const isCurrent =
          (currentPath === '' && targetFile === 'index.html') ||
          currentPath === targetFile ||
          (currentPath === 'index.html' && (targetFile === './' || targetFile === 'index.html'));

        if (isCurrent) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      });
    }

    highlightActivePage();
  });
})();
