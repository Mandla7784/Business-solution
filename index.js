/**
 *
 * @param {*} data
 * @returns
 * This function fetches card data from json file
 */
const url = "/data/Pricing.json";
const renderPricingCards = async (data) => {
  try {
    const response = await fetch(data);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
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
}

function main() {
  renderPricingCards(url);
}
main();
