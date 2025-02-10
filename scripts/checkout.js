import { cart, removeItemFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { twoDecimalPlaces } from "./utilities/money.js";

// 8 - Loop through the cart items checking if the product id of the cart item matches the product id of the product. If so, there is a match. The HTML for the the cart item is generated with the items unique data and the HTML is placed into the parent container to be displayed on the page
let cartHTML = "";
cart.forEach((cartItem) => {
  let productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  cartHTML += `
    <div class="cart-item-container jsCartItemContainer-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${twoDecimalPlaces(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary jsDeleteFromCart" data-product-id="${
              matchingProduct.id
            }">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
});
document.querySelector(".jsOrderSummary").innerHTML = cartHTML;
//

// 9 - Upon clicking the "delete" link, the item is removed from the cart using removeItemFromCart function imported from cart.js with a productId parameter of the items productId and then also deleted from the carts HTML 
document.querySelectorAll(".jsDeleteFromCart").forEach((link) => {
  link.addEventListener("click", () => {
    let productId = link.dataset.productId;
    removeItemFromCart(productId);
    let container = document.querySelector(`.jsCartItemContainer-${productId}`)
    container.remove()
  });
});
// 