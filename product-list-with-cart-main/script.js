
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const totalPriceElem = document.getElementById('total-price');


let cart = {}; // {id: {name, price, quantity}}
const formatPrice = price => parseFloat(price).toFixed(2);

function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  let itemCount = 0;

  if (Object.keys(cart).length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty">Your added items will appear here</p>';
    cartTotal.classList.add('hidden');
    cartCount.textContent = 0;
    return;
  }

  for (let id in cart) {
    const item = cart[id];
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    itemCount += item.quantity;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <span>$${formatPrice(itemTotal)}</span>
    `;
    cartItemsContainer.appendChild(cartItem);
  }

  cartCount.textContent = itemCount;
  totalPriceElem.textContent = formatPrice(total);
  cartTotal.classList.remove('hidden');
}
document.querySelectorAll('.add-btn').forEach(btn => {
  const id = btn.dataset.id;
  const name = btn.dataset.name;
  let price = parseFloat(btn.dataset.price.replace('$',''));
  let quantity = 1;

  const incrementIcon = btn.querySelector('.icon:nth-child(1)');
  const decrementIcon = btn.querySelector('.icon:nth-child(3)');

  if (incrementIcon) {
    incrementIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      quantity += 1;
      btn.innerHTML = `${incrementIcon.outerHTML} ${quantity} ${decrementIcon.outerHTML}`;
    });
  }

  if (decrementIcon) {
    decrementIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      if (quantity > 1) quantity -= 1;
      btn.innerHTML = `${incrementIcon.outerHTML} ${quantity} ${decrementIcon.outerHTML}`;
    });
  }

  btn.addEventListener('click', () => {
    if (!cart[id]) {
      cart[id] = { name, price, quantity };
    } else {
      cart[id].quantity += quantity;
    }

    quantity = 1;
    updateCart();
  });
});
