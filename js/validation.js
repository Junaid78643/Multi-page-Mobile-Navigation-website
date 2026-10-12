/**
 * LUMINA CREATIVE STUDIO - CONTACT FORM VALIDATION ENGINE
 * Robust client-side validation, inline error messaging, real-time counters & submission UX
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const formCard = document.querySelector('.form-card');
    const successCard = document.getElementById('formSuccessCard');
    const resetSuccessBtn = document.getElementById('resetSuccessBtn');
    const successNamePlaceholder = document.getElementById('successUserName');

    // Form Field Elements
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const subjectSelect = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const consentInput = document.getElementById('consent');
    const submitBtn = contactForm.querySelector('.submit-btn');

    // Message Character Counter Elements
    const charCounter = document.getElementById('messageCharCount');
    const minCharWarning = document.getElementById('messageMinNotice');
    const MIN_MESSAGE_LENGTH = 15;
    const MAX_MESSAGE_LENGTH = 500;

    // Email Regular Expression (RFC 5322 compatible)
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    // Track fields that have been touched by user
    const touchedFields = new Set();

    /**
     * Show Error for a Specific Field
     */
    function showError(inputEl, message) {
      const group = inputEl.closest('.form-group');
      if (!group) return;

      group.classList.add('has-error');
      group.classList.remove('is-valid');
      inputEl.setAttribute('aria-invalid', 'true');

      let errorMsgEl = group.querySelector('.field-error-msg');
      if (errorMsgEl) {
        const textSpan = errorMsgEl.querySelector('.error-text') || errorMsgEl;
        textSpan.textContent = message;
      }
    }

    /**
     * Clear Error and Mark Field Valid
     */
    function clearError(inputEl) {
      const group = inputEl.closest('.form-group');
      if (!group) return;

      group.classList.remove('has-error');
      group.classList.add('is-valid');
      inputEl.setAttribute('aria-invalid', 'false');

      const errorMsgEl = group.querySelector('.field-error-msg');
      if (errorMsgEl) {
        const textSpan = errorMsgEl.querySelector('.error-text') || errorMsgEl;
        textSpan.textContent = '';
      }
    }

    /**
     * Reset Field State (neither valid nor error)
     */
    function resetFieldState(inputEl) {
      const group = inputEl.closest('.form-group');
      if (!group) return;

      group.classList.remove('has-error', 'is-valid');
      inputEl.removeAttribute('aria-invalid');
    }

    /**
     * Validate Name Field
     * Requirement: Required, minimum 3 characters, valid name characters
     */
    function validateName() {
      const val = nameInput.value.trim();

      if (!val) {
        showError(nameInput, 'Full name is required.');
        return false;
      }

      if (val.length < 3) {
        showError(nameInput, `Name must be at least 3 characters long (currently ${val.length}).`);
        return false;
      }

      // Check for valid name characters (letters, spaces, hyphens, periods, apostrophes)
      const namePattern = /^[a-zA-ZÀ-ÿ\s'-.]+$/;
      if (!namePattern.test(val)) {
        showError(nameInput, 'Please enter a valid name using letters only.');
        return false;
      }

      clearError(nameInput);
      return true;
    }

    /**
     * Validate Email Field
     * Requirement: Required, matches valid email format
     */
    function validateEmail() {
      const val = emailInput.value.trim();

      if (!val) {
        showError(emailInput, 'Email address is required.');
        return false;
      }

      if (!EMAIL_REGEX.test(val)) {
        showError(emailInput, 'Please enter a valid email address (e.g., name@domain.com).');
        return false;
      }

      clearError(emailInput);
      return true;
    }

    /**
     * Validate Subject / Service Field (if selected)
     */
    function validateSubject() {
      if (!subjectSelect) return true;
      const val = subjectSelect.value;

      if (!val || val === '') {
        showError(subjectSelect, 'Please select a topic or project type.');
        return false;
      }

      clearError(subjectSelect);
      return true;
    }

    /**
     * Validate Message Field
     * Requirement: Required, minimum length 15 characters
     */
    function validateMessage() {
      const val = messageInput.value.trim();

      if (!val) {
        showError(messageInput, 'Message cannot be empty.');
        return false;
      }

      if (val.length < MIN_MESSAGE_LENGTH) {
        showError(
          messageInput,
          `Message must be at least ${MIN_MESSAGE_LENGTH} characters (currently ${val.length} characters).`
        );
        return false;
      }

      clearError(messageInput);
      return true;
    }

    /**
     * Validate Consent Checkbox
     */
    function validateConsent() {
      if (!consentInput) return true;

      if (!consentInput.checked) {
        showError(consentInput, 'You must agree to the privacy policy to submit.');
        return false;
      }

      clearError(consentInput);
      return true;
    }

    /**
     * Update Message Live Character Counter
     */
    function updateCharCounter() {
      if (!messageInput || !charCounter) return;
      const currentLength = messageInput.value.length;
      charCounter.textContent = `${currentLength} / ${MAX_MESSAGE_LENGTH}`;

      if (currentLength < MIN_MESSAGE_LENGTH) {
        if (minCharWarning) {
          minCharWarning.textContent = `(Min ${MIN_MESSAGE_LENGTH} chars - ${MIN_MESSAGE_LENGTH - currentLength} more needed)`;
          minCharWarning.style.color = 'var(--text-muted)';
        }
      } else {
        if (minCharWarning) {
          minCharWarning.textContent = '(Minimum length met)';
          minCharWarning.style.color = 'var(--success)';
        }
      }

      if (currentLength >= MAX_MESSAGE_LENGTH) {
        charCounter.classList.add('limit-reached');
      } else if (currentLength > MAX_MESSAGE_LENGTH - 40) {
        charCounter.classList.add('warning');
        charCounter.classList.remove('limit-reached');
      } else {
        charCounter.classList.remove('warning', 'limit-reached');
      }
    }

    // Attach real-time input & blur events
    nameInput.addEventListener('blur', () => {
      touchedFields.add('name');
      validateName();
    });
    nameInput.addEventListener('input', () => {
      if (touchedFields.has('name')) validateName();
    });

    emailInput.addEventListener('blur', () => {
      touchedFields.add('email');
      validateEmail();
    });
    emailInput.addEventListener('input', () => {
      if (touchedFields.has('email')) validateEmail();
    });

    if (subjectSelect) {
      subjectSelect.addEventListener('change', () => {
        touchedFields.add('subject');
        validateSubject();
      });
      subjectSelect.addEventListener('blur', () => {
        touchedFields.add('subject');
        validateSubject();
      });
    }

    messageInput.addEventListener('input', () => {
      updateCharCounter();
      if (touchedFields.has('message')) {
        validateMessage();
      }
    });
    messageInput.addEventListener('blur', () => {
      touchedFields.add('message');
      validateMessage();
    });

    if (consentInput) {
      consentInput.addEventListener('change', () => {
        touchedFields.add('consent');
        validateConsent();
      });
    }

    // Initial character counter setup
    updateCharCounter();

    /**
     * Form Submission Handler
     */
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Mark all fields as touched
      touchedFields.add('name');
      touchedFields.add('email');
      touchedFields.add('subject');
      touchedFields.add('message');
      touchedFields.add('consent');

      // Validate all fields
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isSubjectValid = validateSubject();
      const isMessageValid = validateMessage();
      const isConsentValid = validateConsent();

      const isAllValid =
        isNameValid && isEmailValid && isSubjectValid && isMessageValid && isConsentValid;

      if (!isAllValid) {
        // Focus first invalid element for accessibility
        const firstErrorEl = contactForm.querySelector('.form-group.has-error input, .form-group.has-error select, .form-group.has-error textarea');
        if (firstErrorEl) {
          firstErrorEl.focus();
        }
        return;
      }

      // If valid, show loading state and simulate asynchronous submission
      const userName = nameInput.value.trim();
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Reset form inputs & styles
        contactForm.reset();
        touchedFields.clear();
        [nameInput, emailInput, subjectSelect, messageInput, consentInput].forEach((el) => {
          if (el) resetFieldState(el);
        });
        updateCharCounter();

        // Display Success Card
        if (successNamePlaceholder) {
          successNamePlaceholder.textContent = userName;
        }

        contactForm.style.display = 'none';
        if (successCard) {
          successCard.classList.add('is-active');
          successCard.focus();
          successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 850);
    });

    /**
     * Handle "Send Another Message" button to restore form
     */
    if (resetSuccessBtn) {
      resetSuccessBtn.addEventListener('click', () => {
        if (successCard) {
          successCard.classList.remove('is-active');
        }
        contactForm.style.display = 'block';
        nameInput.focus();
      });
    }
  });
})();
