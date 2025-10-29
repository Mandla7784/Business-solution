// init security stuff
(async function initSecurity() {
  try {
    const { initializeFormSecurity } = await import("./utils/formSecurity.js");
    initializeFormSecurity();
    console.log("Security initialized");
  } catch (error) {
    console.warn("Security init error:", error);
  }
})();
