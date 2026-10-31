// Catalog Data
const products = [
  {
    id: 1,
    name: "Heavyweight Boxy Tee - Jet Black",
    price: 1299,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Waffle Knit Long Sleeve - Charcoal",
    price: 1799,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Wide Leg Denim Jeans - Washed Black",
    price: 2499,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Classic Henley Shirt - Deep Navy",
    price: 1499,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=700&q=80"
  }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById("productGrid");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

// Render Product Catalog
function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (item) => `
      <div class="product-card">
        <img src="${item.image}" alt="${item.name}" class="product-image" loading="lazy" />
        <div class="product-info">
          <div class="product-title">${item.name}</div>
          <div class="product-price">₹${item.price.toLocaleString("en-IN")}</div>
          <button class="add-btn" onclick="addToCart(${item.id})">Add to Bag</button>
        </div>
      </div>
    `
    )
    .join("");
}

// Add Item to Cart
window.addToCart = function (id) {
  const product = products.find((p) => p.id === id);
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  openCartDrawer();
};

// Update Cart Display & Totals
function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalCount;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    cartTotal.textContent = "₹0.00";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item">
        <div>
          <div style="font-weight: 600;">${item.name}</div>
          <div style="font-size: 0.85rem; color: var(--muted);">Qty: ${item.quantity} × ₹${item.price}</div>
        </div>
        <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 0.85rem; font-weight: 600;">Remove</button>
      </div>
    `
    )
    .join("");

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `₹${totalAmount.toLocaleString("en-IN")}`;
}

// Remove Item
window.removeFromCart = function (id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartUI();
};

// Drawer Controls
function openCartDrawer() {
  cartDrawer.classList.add("open");
  overlay.classList.add("open");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("open");
}

cartBtn.addEventListener("click", openCartDrawer);
closeCart.addEventListener("click", closeCartDrawer);
overlay.addEventListener("click", closeCartDrawer);

// Initialize Page
renderProducts();
