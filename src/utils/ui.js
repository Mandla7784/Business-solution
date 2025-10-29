/**
 * UI utility functions
 * Handles DOM manipulation and user feedback
 */

/**
 * Creates and displays an alert message to the user
 * @param {string} message - Message to display
 * @param {string} type - Type of alert ('success' | 'error' | 'info')
 * @param {number} duration - Duration in milliseconds before auto-removing
 * @returns {HTMLElement} - The created alert element
 */
export function showAlert(message, type = "info", duration = 3000) {
  // Remove existing alerts
  const existingAlert = document.querySelector(".alert-badge");
  if (existingAlert) {
    existingAlert.remove();
  }

  const alertBadge = document.createElement("div");
  alertBadge.className = `alert-badge alert-${type}`;
  alertBadge.textContent = message;
  alertBadge.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `;

  // Set background color based on type
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    info: "#3b82f6",
  };
  alertBadge.style.backgroundColor = colors[type] || colors.info;

  document.body.prepend(alertBadge);

  // Auto-remove after duration
  if (duration > 0) {
    setTimeout(() => {
      if (alertBadge.parentNode) {
        alertBadge.style.animation = "slideOut 0.3s ease-out";
        setTimeout(() => {
          alertBadge.remove();
        }, 300);
      }
    }, duration);
  }

  return alertBadge;
}

/**
 * Shows a loading spinner
 * @param {HTMLElement} element - Element to show loader on
 */
export function showLoader(element) {
  if (!element) return;

  element.disabled = true;
  element.style.opacity = "0.6";
  element.style.cursor = "not-allowed";

  const loader = document.createElement("span");
  loader.className = "loader-spinner";
  loader.innerHTML = "⏳";
  element.appendChild(loader);
}

/**
 * Hides a loading spinner
 * @param {HTMLElement} element - Element to hide loader from
 */
export function hideLoader(element) {
  if (!element) return;

  element.disabled = false;
  element.style.opacity = "1";
  element.style.cursor = "pointer";

  const loader = element.querySelector(".loader-spinner");
  if (loader) {
    loader.remove();
  }
}

/**
 * Redirects to a new page after a delay
 * @param {string} url - URL to redirect to
 * @param {number} delay - Delay in milliseconds
 */
export function redirectWithDelay(url, delay = 0) {
  if (delay > 0) {
    setTimeout(() => {
      window.location.href = url;
    }, delay);
  } else {
    window.location.href = url;
  }
}

/**
 * Safely gets an element by ID
 * @param {string} id - Element ID
 * @returns {HTMLElement|null} - The element or null if not found
 */
export function getElement香蕉(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with ID "${id}" not found`);
  }
  return element;
}

/**
 * Safely gets an element by selector
 * @param {string} selector - CSS selector
 * @returns {HTMLElement|null} - The element or null if not found
 */
export function querySelector(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element with selector "${selector}" not found`);
  }
  return element;
}

