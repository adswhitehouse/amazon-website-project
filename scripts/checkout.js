import { cart, removeItemFromCart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { twoDecimalPlaces } from "./utilities/money.js";
import { updateQuantity } from "../data/cart.js";

updateCartQuantity();

// Loop through the cart items checking if the product id of the cart item matches the product id of the product. If so, there is a match. The HTML for the the cart item is generated with the items unique data and the HTML is placed into the parent container to be displayed on the page
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
              Quantity: <span class="quantity-label jsQuantityLabel-${
                matchingProduct.id
              }">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary jsUpdateLink" data-product-id="${
              matchingProduct.id
            }">
              Update
            </span>
            <input class="quantity-input jsQuantityInput-${
              matchingProduct.id
            } jsInputCart" data-product-id="${matchingProduct.id}">
            <span class="save-quantity-link link-primary jsSaveLink" data-product-id="${
              matchingProduct.id
            }">Save</span>
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

// Upon clicking the "delete" link, the item is removed from the cart using removeItemFromCart function imported from cart.js with a productId parameter of the items productId and then also deleted from the carts HTML
document.querySelectorAll(".jsDeleteFromCart").forEach((link) => {
  link.addEventListener("click", () => {
    let productId = link.dataset.productId;
    removeItemFromCart(productId);
    let container = document.querySelector(`.jsCartItemContainer-${productId}`);
    container.remove();
  });
});

// After clicking Update, the input and span element are shown
document.querySelectorAll(".jsUpdateLink").forEach((link) => {
  link.addEventListener("click", () => {
    let productId = link.dataset.productId;
    let container = document.querySelector(`.jsCartItemContainer-${productId}`);
    container.classList.add("is-editing-quantity");

    let quantityInput = document.querySelector(`.jsQuantityInput-${productId}`);
  });
});

// After clicking Save, the input and span element are hidden and the quantity is updated globally
document.querySelectorAll(".jsSaveLink").forEach((link) => {
  link.addEventListener("click", () => {
    let productId = link.dataset.productId;
    let container = document.querySelector(`.jsCartItemContainer-${productId}`);
    let quantityInput = document.querySelector(`.jsQuantityInput-${productId}`);
    let quantityValue = Number(quantityInput.value);
    let quantityLabel = document.querySelector(`.jsQuantityLabel-${productId}`);

    if (quantityValue > 0 && quantityValue < 101) {
      container.classList.remove("is-editing-quantity");
      updateQuantity(productId, quantityValue);
      quantityLabel.textContent = quantityValue;
      quantityInput.classList.remove("is-focused");
    } else {
      alert("Please input a valid quantity between 1 and 100");
    }
  });
});

document.querySelectorAll(".jsInputCart").forEach((input) => {
  input.addEventListener("keydown", (e) => {
    let productId = input.dataset.productId;
    let container = document.querySelector(`.jsCartItemContainer-${productId}`);
    let quantityInput = document.querySelector(`.jsQuantityInput-${productId}`);
    let quantityValue = Number(quantityInput.value);
    let quantityLabel = document.querySelector(`.jsQuantityLabel-${productId}`);

    if (e.key === "Enter") {
      if (quantityValue > 0 && quantityValue < 101) {
        container.classList.remove("is-editing-quantity");
        updateQuantity(productId, quantityValue);
        quantityLabel.textContent = quantityValue;
        quantityInput.classList.remove("is-focused");
      } else {
        alert("Please input a valid quantity between 1 and 100");
      }
    }
  });
});
