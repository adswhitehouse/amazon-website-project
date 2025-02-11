import { renderCheckoutHeader } from "../scripts/checkout/checkoutHeader.js";

// Create empty cart array that will contain product data of the items added to the cart if there is any data stored in local storage
export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

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
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
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
  renderCheckoutHeader();
  saveToStorage();
}

// Function to update cart quantity when clicking update and save with an input value
export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });
  renderCheckoutHeader()
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
