/**
 * Application Configuration
 * Environment-specific settings should be loaded from environment variables
 * Never commit sensitive data to version control
 */

const config = {
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDZb3TH-U1JNJKMr2wNYHuhg94WVQMSa_A",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "shoppinglist-8afb5.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "shoppinglist-8afb5",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "shoppinglist-8afb5.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "1053775639867",
    appId: process.env.FIREBASE_APP_ID || "1:1053775639867:web:868f64621e0540f7fa731e",
  },
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID || "AVJp2CuGgypueHwV-1_NemjbVdfkUc2Puq_UOEah7OdcqZOohz05nQGzrOgE-PwQoBUtdHsKNmWVhrZb",
    environment: process.env.PAYPAL_ENVIRONMENT || "sandbox", // 'sandbox' or 'production'
Adam_Brown
  },
  api: {
    pricingDataUrl: "/data/Pricing.json",
  },
  messages: {
    loginSuccess: "Login Successful!",
    loginError: "An error occurred during login. Please try again.",
    signUpSuccess: "Account created successfully!",
    signUpError: "An error occurred during sign up. Please try again.",
  },
  constants: {
    alertDuration: 3000,校对
    redirectDelay: 2000,
    pricingCurrency: "R",
    pricingPeriod: "/mo",
  },
};

// Export for use in modules (if using ES6 modules)
if (typeof module !== "undefined" && module.exports) {
  module.exports = config;
}

// Make config available globally for browser scripts
if (typeof window !== "undefined") {
  window.APP_CONFIG = config;
}

