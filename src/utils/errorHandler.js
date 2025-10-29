/**
 * Error handling utilities
 * Centralized error handling and logging
 */

/**
 * Maps Firebase error codes to user-friendly messages
 * @param {object} error - Firebase error object
 * @returns {string} - User-friendly error message
 */
export function getFirebaseErrorMessage(error) {
  if (!error || !error.code) {
    return "An unexpected error occurred. Please try again.";
  }

  const errorMessages = {
    "auth/user-not-found": "No account found with this email address.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/email-already-in-use": "This email is already registered.",
    "auth/weak-password":
      "Password is too weak. Please use a stronger password.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/operation-not-allowed": "This sign-in method is not enabled.",
    "auth/network-request-failed":
      "Network error. Please check your connection.",
    "auth/popup-closed-by-user": "Sign-in window was closed. Please try again.",
    "auth/cancelled-popup-request": "Sign-in request was cancelled.",
    "auth/popup-blocked":
      "Pop-up was blocked. Please allow pop-ups and try again.",
  };

  return (
    errorMessages[error.code] ||
    error.message ||
    "An error occurred. Please try again."
  );
}

/**
 * Handles and logs errors consistently
 * @param {Error|object} error - Error object
 * @param {string} context - Context where error occurred
 * @param {boolean} showToUser - Whether to show error to user
 * @returns {string} - User-friendly error message
 */
export function handleError(error, context = "Application", showToUser = true) {
  const errorMessage = error?.code
    ? getFirebaseErrorMessage(error)
    : error?.message || "An unexpected error occurred.";

  // Log error to console in development
  if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    console.error(`[${context}] Error:`, error);
  }

  // Show to user if requested
  if (showToUser && typeof window !== "undefined") {
    // Import dynamically to avoid circular dependencies
    import("./ui.js").then(({ showAlert }) => {
      showAlert(errorMessage, "error");
    });
  }

  return errorMessage;
}
