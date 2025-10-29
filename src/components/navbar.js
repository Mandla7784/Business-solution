// navbar component
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
            <a href="/html/index.html#home" ${currentPage === "home" ? 'class="active"' : ""}>Home</a>
            <a href="/html/index.html#products" ${currentPage === "products" ? 'class="active"' : ""}>Products</a>
            <a href="/html/index.html#Pricing" ${currentPage === "pricing" ? 'class="active"' : ""}>Pricing</a>
            <a href="/html/index.html#solutions" ${currentPage === "solutions" ? 'class="active"' : ""}>Solutions</a>
            <a href="/html/index.html#enterprise" ${currentPage === "enterprise" ? 'class="active"' : ""}>Enterprise</a>
          </ul>
          <div class="account">
            <a class="login" href="/html/GetIntouch.html">Log in</a>
            <a class="free" href="/html/News-letter-form.html">Try free</a>
            <a class="btn-donate" href="/html/payment.html">Donate</a>
          </div>
        </div>
      </div>
      <i id="menuIcon" class="fa-solid fa-bars"></i>
    </nav>
  `;
}
