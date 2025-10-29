// email validation
export function isValidEmail(email) {
  if (!email || typeof email !== "string") {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

// password validation
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

// phone validation
export function isValidPhone(phone) {
  if (!phone || typeof phone !== "string") {
    return false;
  }
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone.trim()) && phone.trim().length >= 10;
}

// clean up input
export function sanitizeInput(input) {
  if (typeof input !== "string") {
    return "";
  }
  return input.trim();
}

// validate form inputs
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
