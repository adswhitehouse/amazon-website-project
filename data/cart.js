// 5 - Create cart array that will contain product data of the items added to the cart
export let cart = [];
//
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
}
