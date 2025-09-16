// Product data
const products = {

}
 
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPriceEl = document.getElementById("total-price");
const cartTotalBox = document.getElementById("cart-total");

let cart = [];

// Render products
products.forEach(product => {
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="product-info">
      <p class="price">$${product.price.toFixed(2)}</p>
      <h4>${product.name}</h4>
      <button class="add-btn" data-id="${product.id}">Add to Cart</button>
    </div>
  `;
  productList.appendChild(div);
});

// Add to cart
document.querySelector(".add-btn").forEach(button=> {
    button.addEventListener("click", () => {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.qty++;
        } else {
         cart.push({id, name, price, qty: 1});
        }
        updateCart();
    })
})

function updateCart() {
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    cartItems.innerHTML = <p class="empty">Your added items will appear here</p>;
    cartTotalBox.classList.add("hidden");
  } else {
    cart.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <span>${item.name} (x${item.qty})</span>
        <span>$${(item.price * item.qty).toFixed(2)}</span>
      `;
      cartItems.appendChild(div);
    });
    cartTotalBox.classList.remove("hidden");
  }

  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  totalPriceEl.textContent = cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
}