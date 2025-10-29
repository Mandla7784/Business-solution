/**
 * Navigation Bar Component
 * Reusable navbar functionality
 */

/**
 * Creates and returns a navigation bar HTML string
 * @param {object} options - Navigation options
 * @param {string} options.currentPage - Current page identifier
 * @returns {string} - HTML string for navbar
 */
export function createNavbar(options = {}) {
  const { currentPage = "home" } = options;

  return `
    <nav>
      <div class="nav-container">
        <h2 style="color: rgb(24, 163, 243); font-weight: bold" class="logo">
          Penta-<span style="color: hsl(328, 100%, 50%)">Solution</span>
        </h2>
        <div class="menuItems">
          <ul>
            <a href="/index.html#home" ${currentPage === "home" ? 'class="active"' : ""}>Home</a>
            <a href="/index.html#products" ${currentPage === "products" ? 'class="active"' : ""}>Products</a>
            <a href="/index.html#Pricing" ${currentPage === "pricing" ? 'class="active"' : ""}>Pricing</a>
            <a href="/index.html#solutions" ${currentPage === "solutions" ? 'class="active"' : ""}>Solutions</a>
            <a href="/index.html#enterprise" ${currentPage === "enterprise" ? 'class="active"' : ""}>Enterprise</a>
          </ul>
          <div class="account">
            <a class="login" href="/GetIntouch.html">Log in</a>
            <a class="free" href="./News-letter-form.html">Try free</a>
            <a class="btn-donate" href="/payment.html">Donate</a>
          </div>
        </div>
      </div>
      <i id="menuIcon" class="fa-solid fa-bars"></i>
    </nav>
  `;
}

