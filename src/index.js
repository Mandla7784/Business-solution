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
 * Creates a pricing card using HTML structure.
 * @param {object} param - Pricing card data.
 */
function createPricingCard({ heading, price, description, btnText }) {
  // Create card container
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
  priceElement.textContent = price === "text us" ? price : `R${price}/mo`;
  card.appendChild(priceElement);

  // Description
  const descriptionElement = document.createElement("p");
  descriptionElement.className = "pricing-card-description";
  descriptionElement.textContent = description;
  card.appendChild(descriptionElement);

  // Button
  const button = document.createElement("button");
  button.className = "pricing-card-button";
  button.textContent = btnText;
  card.appendChild(button);

  return card;
}

function main() {
  renderPricingCards(url);
}
main();
