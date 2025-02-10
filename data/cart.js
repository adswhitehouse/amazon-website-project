// Create empty cart array that will contain product data of the items added to the cart if there is any data stored in local storage
export let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Saves cart to local storage when function is called
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
//

// Adds new item to cart
export function addToCart(productId) {
  const quantitySelection = document.querySelector(
    `.jsQuantitySelection-${productId}`
  ).value;

  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += Number(quantitySelection);
  } else {
    cart.push({
      productId,
      quantity: Number(quantitySelection),
    });
  }
  saveToStorage();
}

// Copy of updateCartQuantity that is called when removeItemFromCart is called and updates the checkout link again
export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".jsReturnToHomeLink").textContent = `${cartQuantity} items`;
}

// Removes item from cart
export function removeItemFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  updateCartQuantity()
  saveToStorage();
}
