# Lumina Creative Studio - Multi-Page Website

A high-performance, accessible 3-page responsive website featuring smooth mobile navigation, real-time client-side form validation, and persistent dark/light theme switching.

Built as part of **Task 3: Multi-Page Website with Mobile Navigation & Form Validation**.

---

## 🌟 Key Features

### 1. Consistent Multi-Page Architecture
- **3 Fully Integrated Pages:**
  - `index.html` (Home): Hero, interactive showcase, core capabilities, metrics, and CTA.
  - `about.html` (About): Mission, philosophy timeline, 4-pillar values grid, and leadership team profiles.
  - `contact.html` (Contact): Contact directory, hours, fully validated contact form, and FAQ accordion.
- **Unified Navigation & Footer:** Consistent header with brand identity, desktop links, active state detection, theme switch button, and rich 4-column footer with dynamic copyright year.

### 2. Mobile Hamburger Navigation (Custom JS & CSS Animations)
- **Smooth Morphing Animation:** 3-bar hamburger icon smoothly transforms into an "X" via CSS transforms.
- **Animated Drawer:** Slide-down drawer with cubic-bezier easing, staggered link entrance animations, and subtle backdrop blur overlay.
- **Full Accessibility & UX:**
  - Closes on clicking outside (backdrop click).
  - Closes automatically when selecting any navigation link.
  - Supports keyboard navigation with `Escape` key to close and restore focus.
  - Locks body scrolling (`body.menu-open`) while drawer is open.
  - Responsive auto-reset when window is resized past the mobile breakpoint (768px).

### 3. Contact Form with Robust Client-Side Validation
- **Name Field:** Required, minimum 3 characters, validates against realistic name patterns (letters, spaces, hyphens).
- **Email Field:** Required, validated against RFC 5322 standard regex.
- **Subject Field:** Dropdown selection for project type.
- **Message Field:** Required, minimum 15 characters, maximum 500 characters.
- **Live Character Counter:** Keystroke counter updating in real time (`XX / 500 characters, min 15`) with dynamic color states (normal, warning, limit-reached).
- **Inline Error Feedback:**
  - Specific error messages render directly under each failed field with an alert icon.
  - Inputs gain red border highlight and subtle focus glow.
  - `aria-invalid` and `aria-describedby` set for screen-reader accessibility.
  - Dynamic error clearing: once touched or invalid, typing the correction immediately removes the error.
- **Simulated Form Submission:**
  - Shows an animated button spinner state for ~800ms.
  - Displays a clean success card acknowledging the user by name with a friendly confirmation message.
  - Includes a "Send Another Message" button to restore and reset the form.

### 4. Persistent Dark Mode / Light Mode Theme Switcher
- **CSS Custom Properties:** Dual color systems for light and dark themes using `:root` and `[data-theme="dark"]`.
- **Persistent Storage:** Saves user choice in browser `localStorage`. Remembers selection across page reloads and cross-page navigation.
- **OS Theme Detection:** Automatically falls back to system `prefers-color-scheme: dark` if no prior choice is saved.
- **FOUC Prevention:** Inline script in `<head>` ensures theme is applied before page painting, preventing white flashes in dark mode.
- **Accessible Toggle Button:** Icon animation with `aria-pressed`, `aria-label`, and tooltip.

---

## 📁 File Structure

```
c:\Users\hp\Downloads\Task3_Interndom\
├── index.html           # Home page
├── about.html           # About page
├── contact.html         # Contact page with validated form
├── css/
│   ├── style.css        # Design tokens, variables, typography, layout & components
│   └── responsive.css   # Mobile drawer animations & responsive media queries
├── js/
│   ├── theme.js         # Dark/Light mode engine & localStorage sync
│   ├── navigation.js    # Animated hamburger menu & active link detection
│   ├── validation.js    # Form validation logic, inline errors & submit flow
│   └── main.js          # Back-to-top button, FAQ accordion & dynamic year
└── README.md            # Project documentation
```

---

## 🚀 How to Run Locally

You can run this project using any local web server or by directly opening the HTML files in your browser.

### Option 1: Python HTTP Server (Recommended)
```powershell
python -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000) in your web browser.

### Option 2: Node.js (npx serve)
```powershell
npx serve .
```

### Option 3: Direct File Opening
Double-click `index.html` in Windows Explorer or open it with your browser of choice (Chrome, Edge, Firefox).
