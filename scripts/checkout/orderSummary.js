import {
  cart,
  removeItemFromCart,
  updateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { twoDecimalPlaces } from "../utilities/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";

updateCartQuantity();

const currentDate = dayjs();
const deliveryDate = currentDate.add(7, "days");
console.log(deliveryDate.format("dddd, MMMM, D"));

export function renderOrderSummary() {
  // Loop through the cart items checking if the product id of the cart item matches the product id of the product. If so, there is a match. The HTML for the the cart item is generated with the items unique data and the HTML is placed into the parent container to be displayed on the page
  let cartHTML = "";
  cart.forEach((cartItem) => {
    let productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    // products.forEach((product) => {
    //   if (product.id === productId) {
    //     matchingProduct = product;
    //   }
    // });

    let deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId)

    let todaysDate = dayjs();
    let deliveryDate = todaysDate.add(deliveryOption.deliveryDays, "days");
    let dateString = deliveryDate.format("dddd, MMMM D");

    cartHTML += `
      <div class="cart-item-container jsCartItemContainer-${
        matchingProduct.id
      }">
        <div class="delivery-date">
          Delivery date: ${dateString}
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
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>`;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let deliveryHTML = "";

    deliveryOptions.forEach((deliveryOption) => {
      let todaysDate = dayjs();
      let deliveryDate = todaysDate.add(deliveryOption.deliveryDays, "days");
      let dateString = deliveryDate.format("dddd, MMMM D");

      let priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${twoDecimalPlaces(deliveryOption.priceCents)} -`;

      let isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      deliveryHTML += `
      <div class="delivery-option jsDeliveryOption" data-product-id="${
        matchingProduct.id
      }" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>`;
    });
    return deliveryHTML;
  }

  document.querySelector(".jsOrderSummary").innerHTML = cartHTML;
  //

  // Upon clicking the "delete" link, the item is removed from the cart using removeItemFromCart function imported from cart.js with a productId parameter of the items productId and then also deleted from the carts HTML
  document.querySelectorAll(".jsDeleteFromCart").forEach((link) => {
    link.addEventListener("click", () => {
      let productId = link.dataset.productId;
      removeItemFromCart(productId);
      let container = document.querySelector(
        `.jsCartItemContainer-${productId}`
      );
      container.remove();
    });
  });

  // After clicking Update, the input and span element are shown
  document.querySelectorAll(".jsUpdateLink").forEach((link) => {
    link.addEventListener("click", () => {
      let productId = link.dataset.productId;
      let container = document.querySelector(
        `.jsCartItemContainer-${productId}`
      );
      container.classList.add("is-editing-quantity");

      let quantityInput = document.querySelector(
        `.jsQuantityInput-${productId}`
      );
    });
  });

  // After clicking Save, the input and span element are hidden and the quantity is updated globally
  document.querySelectorAll(".jsSaveLink").forEach((link) => {
    link.addEventListener("click", () => {
      let productId = link.dataset.productId;
      let container = document.querySelector(
        `.jsCartItemContainer-${productId}`
      );
      let quantityInput = document.querySelector(
        `.jsQuantityInput-${productId}`
      );
      let quantityValue = Number(quantityInput.value);
      let quantityLabel = document.querySelector(
        `.jsQuantityLabel-${productId}`
      );

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

  // Same as above but instead listens for the Enter keydown event on the input elements
  document.querySelectorAll(".jsInputCart").forEach((input) => {
    input.addEventListener("keydown", (e) => {
      let productId = input.dataset.productId;
      let container = document.querySelector(
        `.jsCartItemContainer-${productId}`
      );
      let quantityInput = document.querySelector(
        `.jsQuantityInput-${productId}`
      );
      let quantityValue = Number(quantityInput.value);
      let quantityLabel = document.querySelector(
        `.jsQuantityLabel-${productId}`
      );

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

  // Updates the text when new radio selectors is clicked for delivery option
  document.querySelectorAll(".jsDeliveryOption").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}
