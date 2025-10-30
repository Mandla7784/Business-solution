const appConfig = window.APP_CONFIG || {};

// fetch pricing data
async function fetchPricingData(url) {
  try {
    const secureFetch = (await import("./utils/security.js")).secureFetch;
    const response = await secureFetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.pricing || [];
  } catch (error) {
    console.error("Error fetching pricing data:", error);
    throw error;
  }
}

// create pricing card element
function createPricingCard({ heading, price, description, btnText }) {
  const card = document.createElement("div");
  card.className = "pricing-card";

  const headingElement = document.createElement("h3");
  headingElement.className = "pricing-card-heading";
  headingElement.textContent = heading;
  card.appendChild(headingElement);

  const priceElement = document.createElement("h1");
  priceElement.className = "pricing-card-price";
  const currency = appConfig.constants?.pricingCurrency || "R";
  const period = appConfig.constants?.pricingPeriod || "/mo";
  priceElement.textContent =
    price === "text us" ? price : `${currency}${price}${period}`;
  card.appendChild(priceElement);

  const descriptionElement = document.createElement("p");
  descriptionElement.className = "pricing-card-description";
  descriptionElement.textContent = description;
  card.appendChild(descriptionElement);

  const button = document.createElement("a");
  button.className = "pricing-card-button";
  button.href = "/html/GetIntouch.html";
  button.textContent = btnText;
  card.appendChild(button);

  return card;
}

// render pricing cards
async function renderPricingCards(dataUrl) {
  const pricingContainer = document.querySelector(".pricng-container");

  if (!pricingContainer) {
    console.warn("Pricing container not found");
    return;
  }

  try {
    const pricingData = await fetchPricingData(dataUrl);
    pricingContainer.innerHTML = "";

    pricingData.forEach((item) => {
      const pricingCard = createPricingCard(item);
      pricingContainer.appendChild(pricingCard);
    });
  } catch (error) {
    console.error("Error rendering pricing cards:", error);
    pricingContainer.innerHTML = `<p style="color: red;">Error loading pricing information. Please try again later.</p>`;
  }
}

// mobile menu toggle
function initializeMobileMenu() {
  const menuIcon = document.getElementById("menuIcon");
  const menu = document.querySelector(".menuItems");

  if (!menuIcon || !menu) {
    console.warn("Menu icon or menu items not found");
    return;
  }

  const setClosed = () => {
    menuIcon.classList.remove("fa-x");
    menuIcon.classList.add("fa-bars");
    menu.classList.add("Closed");
    menu.classList.remove("Opened");
  };

  const setOpened = () => {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-x");
    menu.classList.remove("Closed");
    menu.classList.add("Opened");
  };

  // Ensure consistent initial state based on viewport
  if (window.matchMedia("(max-width: 900px)").matches) {
    setClosed();
  } else {
    // On desktop, ensure menu is controlled by CSS (no mobile classes)
    menu.classList.remove("Closed", "Opened");
    menuIcon.classList.remove("fa-x");
    menuIcon.classList.add("fa-bars");
  }

  // Toggle on icon click
  menuIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    const isMenuOpened = menuIcon.classList.contains("fa-x");
    if (isMenuOpened) {
      setClosed();
    } else {
      setOpened();
    }
  });

  // Close when clicking outside on mobile
  document.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 900px)").matches) {
      setClosed();
    }
  });

  // Handle responsive transitions between mobile and desktop
  window.addEventListener("resize", () => {
    if (window.matchMedia("(max-width: 900px)").matches) {
      setClosed();
    } else {
      menu.classList.remove("Closed", "Opened");
      menuIcon.classList.remove("fa-x");
      menuIcon.classList.add("fa-bars");
    }
  });
}

// init everything
function init() {
  const pricingDataUrl = appConfig.api?.pricingDataUrl || "/data/Pricing.json";
  renderPricingCards(pricingDataUrl);
  initializeMobileMenu();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
