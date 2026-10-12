/**
 * LUMINA CREATIVE STUDIO - THEME MANAGER (DARK / LIGHT MODE)
 * Handles persistent theme switching, system preferences, and accessibility
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'lumina_theme_preference';
  const root = document.documentElement;

  /**
   * Determine preferred theme:
   * 1. Check localStorage for user saved preference
   * 2. Fall back to OS prefers-color-scheme
   */
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Apply theme to DOM and sync toggle buttons
   * @param {string} theme - 'dark' or 'light'
   */
  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }

    // Sync all theme toggle buttons on the page (desktop, mobile, etc.)
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      const isDark = theme === 'dark';
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute(
        'aria-label',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      );
      btn.setAttribute(
        'title',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      );
    });
  }

  /**
   * Toggle between dark and light themes
   */
  function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }

  // Initialize theme as early as possible
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Bind event listeners once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Re-apply to ensure button attributes are properly synced
    applyTheme(getPreferredTheme());

    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });
    });

    // Listen for OS system theme changes if user hasn't saved a custom preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  });

  // Expose toggleTheme to window if needed
  window.LuminaTheme = {
    get: getPreferredTheme,
    apply: applyTheme,
    toggle: toggleTheme,
  };
})();
