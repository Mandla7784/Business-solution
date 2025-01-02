/**
 *
 * @param {*} data
 * @returns
 * This function fetches card data from json file
 */
const url = "/data/Pricing.json";
const pricngContainer = document.querySelector(".pricng-container");
const renderPricingCards = async (data) => {
  try {
    const response = await fetch(data);

    if (response.ok) {
      const data = await response.json();
      const cardsData = data["pricing"];

      cardsData.forEach((item) => {
        const pricingCard = createPricingCard(item);
        pricngContainer.appendChild(pricingCard);
      });

      return cardsData;
    }
  } catch (error) {
    console.log(error, "Error fetching resources");
  }
};

/**
 *
 * @param {object} param
 * This is to create the cards by  generating  HTML structure
 *
 */
function createPricingCard({ heading, price, description, btnText }) {
  // Create card container
  const card = document.createElement("div");
  card.className = "pricing-card shadow-lg rounded-lg border p-6 text-center";

  // Heading
  const headingElement = document.createElement("h3");
  headingElement.className = "text-2xl font-bold text-gray-800 mb-4";
  headingElement.textContent = heading;
  card.appendChild(headingElement);

  // Price
  const priceElement = document.createElement("h1");
  priceElement.className = "text-4xl font-extrabold text-blue-600 mb-4";
  priceElement.textContent = price === "Contact Us" ? price : `$${price}/mo`;
  card.appendChild(priceElement);

  // Description
  const descriptionElement = document.createElement("p");
  descriptionElement.className = "text-gray-600 mb-6";
  descriptionElement.textContent = description;
  card.appendChild(descriptionElement);

  // Button
  const button = document.createElement("button");
  button.className =
    "bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition";
  button.textContent = btnText;
  card.appendChild(button);

  return card;
}

function main() {
  renderPricingCards(url);
}
main();
