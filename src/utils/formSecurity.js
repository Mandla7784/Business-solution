/**
 * Form Security Handler
 * Secures form submissions with CSRF protection
 */

import {
  addCSRFTokenToForm,
  validateFormSubmission,
  secureFetch,
} from "./security.js";

/**
 * Secures all forms on the page with CSRF protection
 */
export function secureAllForms() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    // Add CSRF token to form
    addCSRFTokenToForm(form);

    // Intercept form submission
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      // Validate CSRF token
      if (!validateFormSubmission(formData)) {
        alert(
          "Security validation failed. Please refresh the page and try again."
        );
        return;
      }

      // Handle form submission securely
      await handleSecureFormSubmission(form, formData);
    });
  });
}

/**
 * Handles secure form submission
 * @param {HTMLFormElement} form - Form element
 * @param {FormData} formData - Form data
 */
async function handleSecureFormSubmission(form, formData) {
  const action =
    form.action || form.getAttribute("data-action") || "/api/contact";
  const method = form.method || "POST";

  try {
    // Convert FormData to JSON if needed, or send as FormData
    const options = {
      method: method.toUpperCase(),
      body: formData,
      // Don't set Content-Type for FormData, browser will set it with boundary
    };

    const response = await secureFetch(action, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Show success message
    showFormSuccess(form);

    // Reset form
    form.reset();

    // Regenerate CSRF token after successful submission
    sessionStorage.removeItem("csrfToken");
  } catch (error) {
    console.error("Form submission error:", error);
    showFormError(form, error.message);
  }
}

/**
 * Shows success message for form submission
 * @param {HTMLFormElement} form - Form element
 */
function showFormSuccess(form) {
  const successMsg = document.createElement("div");
  successMsg.className = "form-success-message";
  successMsg.textContent = "Form submitted successfully!";
  successMsg.style.cssText = `
    padding: 15px;
    background-color: #10b981;
    color: white;
    border-radius: 5px;
    margin-top: 10px;
  `;

  form.appendChild(successMsg);

  setTimeout(() => {
    successMsg.remove();
  }, 5000);
}

/**
 * Shows error message for form submission
 * @param {HTMLFormElement} form - Form element
 * @param {string} message - Error message
 */
function showFormError(form, message) {
  const errorMsg = document.createElement("div");
  errorMsg.className = "form-error-message";
  errorMsg.textContent = `Error: ${message}`;
  errorMsg.style.cssText = `
    padding: 15px;
    background-color: #ef4444;
    color: white;
    border-radius: 5px;
    margin-top: 10px;
  `;

  // Remove existing error message
  const existingError = form.querySelector(".form-error-message");
  if (existingError) {
    existingError.remove();
  }

  form.appendChild(errorMsg);

  setTimeout(() => {
    errorMsg.remove();
  }, 5000);
}

/**
 * Initializes form security when DOM is ready
 */
export function initializeFormSecurity() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", secureAllForms);
  } else {
    secureAllForms();
  }
}
