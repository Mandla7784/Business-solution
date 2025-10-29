/**
 * Main Application Script
 * Handles pricing cards rendering and navigation menu toggling
 */

const config = window.APP_CONFIG || {};

/**
 * Fetches pricing card data from JSON file
 * @param {string} url - URL to fetch pricing data from
 * @returns {Promise<Array>} - Array of pricing card data
 */
async function fetchPricingData(url) {
  try {
    // Use secure fetch for CORS protection
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

/**
 * Creates a pricing card element
 * @param {object} cardData - Pricing card data object
 * @param {string} cardData.heading - Card heading
 * @param {number|string} cardData.price - Card price (number or "text us")
 * @param {string} cardData.description - Card description
 * @param {string} cardData.btnText - Button text
 * @returns {HTMLElement} - The created pricing card element
 */
function createPricingCard({ heading, price, description, btnText }) {
  const card = document.createElement("div");
  card.className = "pricing-card";

  // Heading
  const headingElement = document.createElement("h3");
  headingElement.className = "pricing-card-heading";
  headingElement.textContent = heading;
  card.appendChild(headingElement);

  // Price
  const priceElement = document.createElement("h1");
  priceElement.className = "pricing-card-price";
  const currency = config.constants?.pricingCurrency || "R";
  const period = config.constants?.pricingPeriod || "/mo";
  priceElement.textContent =
    price === "text us" ? price : `${currency}${price}${period}`;
  card.appendChild(priceElement);

  // Description
  const descriptionElement = document.createElement("p");
  descriptionElement.className = "pricing-card-description";
  descriptionElement.textContent = description;
  card.appendChild(descriptionElement);

  // Button
  const button = document.createElement("a");
  button.className = "pricing-card-button";
  button.href = "/GetIntouch.html";
  button.textContent = btnText;
  card.appendChild(button);

  return card;
}

/**
 * Renders pricing cards to the container
 * @param {string} dataUrl - URL to fetch pricing data from
 */
async function renderPricingCards(dataUrl) {
  const pricingContainer = document.querySelector(".pricng-container");

  if (!pricingContainer) {
    console.warn("Pricing container not found");
    return;
  }

  try {
    const pricingData = await fetchPricingData(dataUrl);
    pricingContainer.innerHTML = ""; // Clear existing content

    pricingData.forEach((item) => {
      const pricingCard = createPricingCard(item);
      pricingContainer.appendChild(pricingCard);
    });
  } catch (error) {
    console.error("Error rendering pricing cards:", error);
    pricingContainer.innerHTML = `<p style="color: red;">Error loading pricing information. Please try again later.</p>`;
  }
}

/**
 * Toggles the mobile navigation menu
 * Handles menu icon switching and menu visibility
 */
function initializeMobileMenu() {
  const menuIcon = document.getElementById("menuIcon");
  const menu = document.querySelector(".menuItems");

  if (!menuIcon || !menu) {
    console.warn("Menu icon or menu items not found");
    return;
  }

  menuIcon.addEventListener("click", () => {
    const isMenuOpened = menuIcon.classList.contains("fa-x");

    if (isMenuOpened) {
      // Close the menu
      menuIcon.classList.remove("fa-x");
      menuIcon.classList.add("fa-bars");
      menu.classList.add("Closed");
      menu.classList.remove("Opened");
    } else {
      // Open the menu
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-x");
      menu.classList.remove("Closed");
      menu.classList.add("Opened");
    }
  });
}

/**
 * Main initialization function
 * Initializes all features when DOM is ready
 */
function init() {
  const pricingDataUrl = config.api?.pricingDataUrl || "/data/Pricing.json";

  // Render pricing cards
  renderPricingCards(pricingDataUrl);

  // Initialize mobile menu
  initializeMobileMenu();
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
