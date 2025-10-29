/**
 * Authentication Module
 * Handles user authentication with Firebase
 * Supports: Email/Password, Google, and Facebook authentication
 */

// Initialize Firebase with configuration from config file
const firebaseConfig = window.APP_CONFIG?.firebase || {
  apiKey: "AIzaSyDZb3TH-U1JNJKMr2wNYHuhg94WVQMSa_A",
  authDomain: "shoppinglist-8afb5.firebaseapp.com",
  projectId: "shoppinglist-8afb5",
  storageBucket: "shoppinglist-8afb5.appspot.com",
  messagingSenderId: "1053775639867",
  appId: "1:1053775639867:web:868f64621e0540f7fa731e",
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const config = window.APP_CONFIG || {};

/**
 * Shows user-friendly alert message
 * @param {string} message - Message to display
 * @param {string} type - Alert type ('success' | 'error' | 'info')
 */
function showAlert(message, type = "info") {
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
    background-color: ${
      type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"
    };
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `;

  document.body.prepend(alertBadge);

  const duration = config.constants?.alertDuration || 3000;
  setTimeout(() => {
    if (alertBadge.parentNode) {
      alertBadge.remove();
    }
  }, duration);
}

/**
 * Gets user-friendly error message from Firebase error
 * @param {object} error - Firebase error object
 * @returns {string} - User-friendly error message
 */
function getErrorMessage(error) {
  if (!error || !error.code) {
    return "An unexpected error occurred. Please try again.";
  }

  const errorMessages = {
    "auth/user-not-found": "No account found with this email address.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/email-already-in-use": "This email is already registered.",
    "auth/weak-password": "Password is too weak. Please use a stronger password.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/operation-not-allowed": "This sign-in method is not enabled.",
    "auth/network-request-failed": "Network error. Please check your connection.",
    "auth/popup-closed-by-user": "Sign-in window was closed. Please try again.",
    "auth/cancelled-popup-request": "Sign-in request was cancelled.",
    "auth/popup-blocked": "Pop-up was blocked. Please allow pop-ups and try again.",
  };

  return errorMessages[error.code] || error.message || "An error occurred. Please try again.";
}

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
  if (!email || typeof email !== "string") {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Handles Google Sign-In
 * Sets up event listener for Google authentication button
 */
function signInWithGoogle() {
  const form = document.querySelector("form");
  const loginWithGoogleButton = document.querySelector(".google");

  if (!form || !loginWithGoogleButton) {
    console.warn("Google sign-in button or form not found");
    return;
  }

  // Prevent form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  const provider = new firebase.auth.GoogleAuthProvider();

  loginWithGoogleButton.addEventListener("click", (event) => {
    event.preventDefault();

    auth
      .signInWithPopup(provider)
      .then((results) => {
        const user = results.user;
        const welcomeMessage = `Welcome ${user.displayName || user.email}!`;
        showAlert(welcomeMessage, "success");

        // Redirect after successful login
        const redirectDelay = config.constants?.redirectDelay || 2000;
        setTimeout(() => {
          window.location.href = "/index.html";
        }, redirectDelay);
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error);
        showAlert(errorMessage, "error");
      });
  });
}

/**
 * Handles Email/Password Sign-In
 * Sets up event listener for email/password authentication
 */
function signInWithEmail() {
  const loginButton = document.getElementById("loginButton");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (!loginButton || !emailInput || !passwordInput) {
    console.warn("Login form elements not found");
    return;
  }

  loginButton.addEventListener("click", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validate inputs
    if (!email || !isValidEmail(email)) {
      showAlert("Please enter a valid email address", "error");
      return;
    }

    if (!password || password.length < 6) {
      showAlert("Password must be at least 6 characters long", "error");
      return;
    }

    // Attempt sign-in
    auth
      .signInWithEmailAndPassword(email, password)
      .then((credentials) => {
        const user = credentials.user;
        const successMessage = config.messages?.loginSuccess || "Login Successful!";
        showAlert(successMessage, "success");

        // Redirect after successful login
        setTimeout(() => {
          window.location.href = "/index.html";
        }, config.constants?.redirectDelay || 2000);
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error);
        showAlert(errorMessage, "error");
      });
  });
}

/**
 * Handles Facebook Sign-In
 * Sets up event listener for Facebook authentication
 */
function signInWithFacebook() {
  const facebookButton = document.querySelector("#facebook");

  if (!facebookButton) {
    console.warn("Facebook sign-in button not found");
    return;
  }

  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  facebookButton.addEventListener("click", (event) => {
    event.preventDefault();

    auth
      .signInWithPopup(facebookProvider)
      .then((results) => {
        const user = results.user;
        const welcomeMessage = `Welcome ${user.displayName || user.email}!`;
        showAlert(welcomeMessage, "success");

        // Redirect after successful login
        const redirectDelay = config.constants?.redirectDelay || 2000;
        setTimeout(() => {
          window.location.href = "/index.html";
        }, redirectDelay);
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error);
        showAlert(errorMessage, "error");
      });
  });
}

/**
 * Initializes authentication handlers when DOM is ready
 */
function initializeAuth() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      signInWithEmail();
      signInWithGoogle();
      signInWithFacebook();
    });
  } else {
    signInWithEmail();
    signInWithGoogle();
    signInWithFacebook();
  }
}

// Initialize authentication when script loads
initializeAuth();


