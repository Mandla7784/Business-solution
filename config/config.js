// app config (browser-safe)
(function () {
  const env = (typeof process !== "undefined" && process.env) || {};
  const cfg = {
    firebase: {
      apiKey: env.FIREBASE_API_KEY || "AIzaSyDZb3TH-U1JNJKMr2wNYHuhg94WVQMSa_A",
      authDomain:
        env.FIREBASE_AUTH_DOMAIN || "shoppinglist-8afb5.firebaseapp.com",
      projectId: env.FIREBASE_PROJECT_ID || "shoppinglist-8afb5",
      storageBucket:
        env.FIREBASE_STORAGE_BUCKET || "shoppinglist-8afb5.appspot.com",
      messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID || "1053775639867",
      appId:
        env.FIREBASE_APP_ID || "1:1053775639867:web:868f64621e0540f7fa731e",
    },
    paypal: {
      clientId:
        env.PAYPAL_CLIENT_ID ||
        "AVJp2CuGgypueHwV-1_NemjbVdfkUc2Puq_UOEah7OdcqZOohz05nQGzrOgE-PwQoBUtdHsKNmWVhrZb",
      environment: env.PAYPAL_ENVIRONMENT || "sandbox",
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
      alertDuration: 3000,
      redirectDelay: 2000,
      pricingCurrency: "R",
      pricingPeriod: "/mo",
    },
    security: {
      allowedOrigins: [
        // add your domains here
      ],
      csrfTokenExpiry: 3600,
      enableCSRFProtection: true,
      enableCORS: true,
    },
  };

  if (typeof window !== "undefined") {
    window.APP_CONFIG = Object.assign({}, window.APP_CONFIG || {}, cfg);
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = cfg;
  }
})();
