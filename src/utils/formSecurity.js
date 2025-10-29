import {
  addCSRFTokenToForm,
  validateFormSubmission,
  secureFetch,
} from "./security.js";

// secure all forms
export function secureAllForms() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    addCSRFTokenToForm(form);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      if (!validateFormSubmission(formData)) {
        alert(
          "Security validation failed. Please refresh the page and try again."
        );
        return;
      }

      await handleSecureFormSubmission(form, formData);
    });
  });
}

// handle secure form submission
async function handleSecureFormSubmission(form, formData) {
  const action =
    form.action || form.getAttribute("data-action") || "/api/contact";
  const method = form.method || "POST";

  try {
    const options = {
      method: method.toUpperCase(),
      body: formData,
    };

    const response = await secureFetch(action, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    showFormSuccess(form);
    form.reset();

    sessionStorage.removeItem("csrfToken");
  } catch (error) {
    console.error("Form submission error:", error);
    showFormError(form, error.message);
  }
}

// show success message
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

// show error message
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

  const existingError = form.querySelector(".form-error-message");
  if (existingError) {
    existingError.remove();
  }

  form.appendChild(errorMsg);

  setTimeout(() => {
    errorMsg.remove();
  }, 5000);
}

// init form security
export function initializeFormSecurity() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", secureAllForms);
  } else {
    secureAllForms();
  }
}
