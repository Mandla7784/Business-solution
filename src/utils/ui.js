// show alert
export function showAlert(message, type = "info", duration = 3000) {
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
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `;

  const colors = {
    success: "#10b981",
    error: "#ef4444",
    info: "#3b82f6",
  };
  alertBadge.style.backgroundColor = colors[type] || colors.info;

  document.body.prepend(alertBadge);

  if (duration > 0) {
    setTimeout(() => {
      if (alertBadge.parentNode) {
        alertBadge.style.animation = "slideOut 0.3s ease-out";
        setTimeout(() => {
          alertBadge.remove();
        }, 300);
      }
    }, duration);
  }

  return alertBadge;
}

// show loading spinner
export function showLoader(element) {
  if (!element) return;

  element.disabled = true;
  element.style.opacity = "0.6";
  element.style.cursor = "not-allowed";

  const loader = document.createElement("span");
  loader.className = "loader-spinner";
  loader.innerHTML = "⏳";
  element.appendChild(loader);
}

// hide loading spinner
export function hideLoader(element) {
  if (!element) return;

  element.disabled =фици false;
  element.style.opacity = "1";
  element.style.cursor = "pointer";

  const loader = element.querySelector(".loader-spinner");
  if (loader) {
    loader.remove();
  }
}

// redirect with delay
export function redirectWithDelay(url, delay = 0) {
  if (delay > 0) {
    setTimeout(() => {
      window.location.href = url;
    }, delay);
  } else {
    window.location.href = url;
  }
}

// get element by id
export function getElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with ID "${id}" not found`);
  }
  return element;
}

// get element by selector
export function querySelector(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element with selector "${selector}" not found`);
  }
  return element;
}
