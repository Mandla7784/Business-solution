/**
 * Security Utilities
 * Handles CSRF protection and CORS configuration
 */

/**
 * Generates a secure random token for CSRF protection
 * @returns {string} - Random token
 */
function generateCSRFToken() {
  const array = new Uint32Array(10);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
}

/**
 * Gets or creates a CSRF token for the current session
 * @returns {string} - CSRF token
 */
export function getCSRFToken() {
  let token = sessionStorage.getItem("csrfToken");

  if (!token) {
    token = generateCSRFToken();
    sessionStorage.setItem("csrfToken", token);
    // Store in a cookie as well for server-side validation
    document.cookie = `csrfToken=${token}; SameSite=Strict; Secure; Path=/; Max-Age=3600`;
  }

  return token;
}

/**
 * Validates CSRF token
 * @param {string} token - Token to validate
 * @returns {boolean} - True if token is valid
 */
export function validateCSRFToken(token) {
  const storedToken = sessionStorage.getItem("csrfToken");
  return storedToken !== null && storedToken === token;
}

/**
 * Adds CSRF token to fetch request headers
 * @param {object} options - Fetch options object
 * @returns {object} - Updated fetch options with CSRF token
 */
export function addCSRFToken(options = {}) {
  const token = getCSRFToken();

  options.headers = options.headers || {};
  options.headers["X-CSRF-Token"] = token;
  options.headers["X-Requested-With"] = "XMLHttpRequest";

  return options;
}

/**
 * Secure fetch wrapper with CSRF protection and CORS handling
 * @param {string} url - URL to fetch
 * @param {object} options - Fetch options
 * @returns {Promise<Response>} - Fetch response
 */
export async function secureFetch(url, options = {}) {
  // Add CSRF token to requests
  const secureOptions = addCSRFToken(options);

  // Set CORS mode
  secureOptions.mode = secureOptions.mode || "cors";
  secureOptions.credentials = secureOptions.credentials || "same-origin";

  // Add security headers
  secureOptions.headers = {
    ...secureOptions.headers,
    "Content-Type": secureOptions.headers["Content-Type"] || "application/json",
    Accept: "application/json",
  };

  try {
    const response = await fetch(url, secureOptions);

    // Check if response includes CSRF validation header
    const csrfValid = response.headers.get("X-CSRF-Valid");
    if (csrfValid === "false") {
      throw new Error("CSRF token validation failed");
    }

    return response;
  } catch (error) {
    console.error("Secure fetch error:", error);
    throw error;
  }
}

/**
 * Adds CSRF token input to a form
 * @param {HTMLFormElement} form - Form element
 */
export function addCSRFTokenToForm(form) {
  if (!form) return;

  // Check if token input already exists
  let tokenInput = form.querySelector('input[name="csrfToken"]');

  if (!tokenInput) {
    tokenInput = document.createElement("input");
    tokenInput.type = "hidden";
    tokenInput.name = "csrfToken";
    tokenInput.value = getCSRFToken();
    form.appendChild(tokenInput);
  } else {
    // Update existing token
    tokenInput.value = getCSRFToken();
  }
}

/**
 * Validates form submission with CSRF token
 * @param {FormData} formData - Form data to validate
 * @returns {boolean} - True if CSRF token is valid
 */
export function validateFormSubmission(formData) {
  const submittedToken = formData.get("csrfToken");
  return validateCSRFToken(submittedToken);
}

/**
 * Gets allowed origins for CORS (should match your domain)
 * @returns {Array<string>} - Array of allowed origins
 */
export function getAllowedOrigins() {
  const config = window.APP_CONFIG || {};
  const allowedOrigins = config.security?.allowedOrigins || [
    window.location.origin,
    "https://penta-solution.com",
    "https://www.penta-solution.com",
  ];

  return allowedOrigins;
}

/**
 * Checks if origin is allowed for CORS
 * @param {string} origin - Origin to check
 * @returns {boolean} - True if origin is allowed
 */
export function isOriginAllowed(origin) {
  const allowedOrigins = getAllowedOrigins();
  return allowedOrigins.includes(origin) || origin === window.location.origin;
}
