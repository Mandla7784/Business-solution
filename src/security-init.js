/**
 * Security Initialization
 * Initializes all security features including CSRF protection and form security
 * This should be loaded on all pages
 */

// Initialize form security if the module exists
(async function initSecurity() {
  try {
    // Import security utilities
    const { initializeFormSecurity } = await import("./utils/formSecurity.js");

    // Initialize form security
    initializeFormSecurity();

    console.log("Security features initialized");
  } catch (error) {
    console.warn("Security initialization error:", error);
    // Continue even if security modules fail to load
  }
})();
