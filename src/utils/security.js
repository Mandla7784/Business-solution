// generate csrf token
function generateCSRFToken() {
  const array = new Uint32Array(10);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
}

// get or create csrf token
export function getCSRFToken() {
  let token = sessionStorage.getItem("csrfToken");

  if (!token) {
    token = generateCSRFToken();
    sessionStorage.setItem("csrfToken", token);
    document.cookie = `csrfToken=${token}; SameSite=Strict; Secure; Path=/; Max-Age=3600`;
  }

  return token;
}

// validate csrf token
export function validateCSRFToken(token) {
  const storedToken = sessionStorage.getItem("csrfToken");
  return storedToken !== null && storedToken === token;
}

// add csrf to fetch headers
export function addCSRFToken(options = {}) {
  const token = getCSRFToken();

  options.headers = options.headers || {};
  options.headers["X-CSRF-Token"] = token;
  options.headers["X-Requested-With"] = "XMLHttpRequest";

  return options;
}

// secure fetch wrapper
export async function secureFetch(url, options = {}) {
  const secureOptions = addCSRFToken(options);

  secureOptions.mode = secureOptions.mode || "cors";
  secureOptions.credentials = secureOptions.credentials || "same-origin";

  secureOptions.headers = {
    ...secureOptions.headers,
    "Content-Type": secureOptions.headers["Content-Type"] || "application/json",
    Accept: "application/json",
  };

  try {
    const response = await fetch(url, secureOptions);

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

// add csrf token to form
export function addCSRFTokenToForm(form) {
  if (!form) return;

  let tokenInput = form.querySelector('input[name="csrfToken"]');

  if (!tokenInput) {
    tokenInput = document.createElement("input");
    tokenInput.type = "hidden";
    tokenInput.name = "csrfToken";
    tokenInput.value = getCSRFToken();
    form.appendChild(tokenInput);
  } else {
    tokenInput.value = getCSRFToken();
  }
}

// validate form submission
export function validateFormSubmission(formData) {
  const submittedToken = formData.get("csrfToken");
  return validateCSRFToken(submittedToken);
}

// get allowed origins for cors
export function getAllowedOrigins() {
  const config = window.APP_CONFIG || {};
  const allowedOrigins = config.security?.allowedOrigins || [
    window.location.origin,
    "https://penta-solution.com",
    "https://www.penta-solution.com",
  ];

  return allowedOrigins;
}

// check if origin is allowed
export function isOriginAllowed(origin) {
  const allowedOrigins = getAllowedOrigins();
  return allowedOrigins.includes(origin) || origin === window.location.origin;
}
