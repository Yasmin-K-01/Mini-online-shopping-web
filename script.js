const products = [
  { id: 1, name: "Wireless Headphones", price: 89, desc: "Clear sound and deep bass", emoji: "🎧" },
  { id: 2, name: "Smart Watch", price: 129, desc: "Track fitness and notifications", emoji: "⌚" },
  { id: 3, name: "Portable Speaker", price: 59, desc: "Great sound for every room", emoji: "🔊" }
];

const productsContainer = document.getElementById("products");
const cartItemsContainer = document.getElementById("cart-items");
const subtotalEl = document.getElementById("subtotal");
const shippingEl = document.getElementById("shipping");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");

let cart = [];

function renderProducts() {
  productsContainer.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-info">
            <div class="product-emoji">${product.emoji}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <div class="price">$${product.price.toFixed(2)}</div>
          </div>
          <div class="product-actions">
            <input class="qty-input" type="number" min="1" value="1" aria-label="Quantity for ${product.name}" />
            <button class="add-btn" data-id="${product.id}">Add</button>
          </div>
        </article>
      `
    )
    .join("");
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  const qtyInput = document.querySelector(`.add-btn[data-id="${productId}"]`).previousElementSibling;
  const quantity = parseInt(qtyInput.value, 10) || 1;

  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  renderCart();
}

function renderCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-text">Your cart is empty.</p>';
  } else {
    cartItemsContainer.innerHTML = cart
      .map(
        (item) => `
          <div class="cart-item">
            <span>${item.name} × ${item.quantity}</span>
            <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
          </div>
        `
      )
      .join("");
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  shippingEl.textContent = `$${shipping.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
}

productsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-btn")) {
    addToCart(Number(event.target.dataset.id));
  }
});

renderProducts();
renderCart();
