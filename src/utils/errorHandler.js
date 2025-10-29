// firebase error messages
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

// handle errors
export function handleError(error, context = "Application", showToUser = true) {
  const errorMessage = error?.code
    ? getFirebaseErrorMessage(error)
    : error?.message || "An unexpected error occurred.";

  if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    console.error(`[${context}] Error:`, error);
  }

  if (showToUser && typeof window !== "undefined") {
    import("./ui.js").then(({ showAlert }) => {
      showAlert(errorMessage, "error");
    });
  }

  return errorMessage;
}
