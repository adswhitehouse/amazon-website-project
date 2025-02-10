// 5 - Create cart array that will contain product data of the items added to the cart
export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
  }
];
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
