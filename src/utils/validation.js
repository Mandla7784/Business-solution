/**
 * Validation utility functions
 * Provides input validation and sanitization
 */

/**
 * Validates email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
export function isValidEmail(email) {
  if (!email || typeof email !== "string") {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @param {number} minLength - Minimum password length (default: 6)
 * @returns {object} - { isValid: boolean, error: string|null }
 */
export function validatePassword(password, minLength = 6) {
  if (!password || typeof password !== "string") {
    return { isValid: false, error: "Password is required" };
  }

  if (password.length < minLength) {
    return {
      isValid: false,
      error: `Password must be at least ${minLength} characters long`,
    };
  }

  return { isValid: true, error: null };
}

/**
 * Validates phone number format (basic validation)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if phone number is valid
 */
export function isValidPhone(phone) {
  if (!phone || typeof phone !== "string") {
    return false;
  }
  // Allow various phone number formats
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone.trim()) && phone.trim().length >= 10;
}

/**
 * Sanitizes user input by trimming whitespace
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export function sanitizeInput(input) {
  if (typeof input !== "string") {
    return "";
  }
  return input.trim();
}

/**
 * Validates form inputs
 * @param {object} inputs - Object containing form inputs
 * @returns {object} - { isValid: boolean, errors: object }
 */
export function validateForm(inputs) {
  const errors = {};
  let isValid = true;

  if (inputs.email && !isValidEmail(inputs.email)) {
    errors.email = "Please enter a valid email address";
    isValid = false;
  }

  if (inputs.password) {
    const passwordValidation = validatePassword(inputs.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.error;
      isValid = false;
    }
  }

  if (inputs.phone && !isValidPhone(inputs.phone)) {
    errors.phone = "Please enter a valid phone number";
    isValid = false;
  }

  return { isValid, errors };
}
