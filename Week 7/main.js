// bookList.js
export function renderBooks(books, container, addToCart) {
  container.innerHTML = ""; 

  books.forEach((book, index) => {
    const div = document.createElement("div");
    div.className = "book";
    div.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Price:</strong> ₹${book.price}</p>
      <p><strong>Status:</strong> ${book.availability}</p>
      <button ${book.availability !== "in stock" ? "disabled" : ""} 
              data-index="${index}">
        Add to Cart
      </button>
    `;

    const btn = div.querySelector("button");
    btn.addEventListener("click", () => addToCart(book));
    container.appendChild(div);
  });
}
// cart.js
let cart = [];

export function addToCart(book) {
  cart.push(book);
  updateCartUI();
}

export function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

export function calculateTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

export function getCart() {
  return cart;
}
// ui.js
import { getCart, removeFromCart, calculateTotal } from "./cart.js";

export function updateCartUI() {
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";

  const cart = getCart();
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.title} - ₹${item.price}</span>
      <button data-index="${index}">Remove</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      removeFromCart(index);
    });

    cartContainer.appendChild(div);
  });

  const totalDiv = document.createElement("div");
  totalDiv.className = "cart-total";
  totalDiv.innerHTML = `<strong>Total: ₹${calculateTotal()}</strong>`;
  cartContainer.appendChild(totalDiv);

  const checkoutBtn = document.createElement("button");
  checkoutBtn.textContent = "Proceed to Checkout";
  checkoutBtn.addEventListener("click", () => {
    alert("Redirecting to mock checkout...");
  });

  cartContainer.appendChild(checkoutBtn);
}
