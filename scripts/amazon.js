import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { twoDecimalPlaces } from "./utilities/money.js";

updateCartQuantity()

// 2 - Create variable that will contain all of the product HTML's
let productsHTML = "";
//

// 3 - Create a forEach loop that generates unique HTML for each product in the products array and appends it to the variable productsHTML for each product
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${twoDecimalPlaces(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="jsQuantitySelection-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart jsAddedToCart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary jsAddToCartBtn" data-product-id="${
        product.id
      }">
        Add to Cart
      </button>
    </div>`;
});
//

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".jsCartQuantity").textContent = cartQuantity;
}

// 4 - Access the HTML element we want to hold the productsHTML and set its innerText to productsHTML
document.querySelector(".jsProductsGrid").innerHTML = productsHTML;
//

// 6 - When the Add to Cart button is clicked, if the product already exists in the cart its select option quantity will be added. If not, the new product will be added to cart along with its select option quantity. Header cart quantity is updated to match total cart quantity
document.querySelectorAll(".jsAddToCartBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const { productId } = btn.dataset;

    addToCart(productId);
    
    updateCartQuantity()
    //

    // 7 - Create timer which resets if the Add to Cart button is clicked again while the timer is active
    const addedToCart = document.querySelector(`.jsAddedToCart-${productId}`);
    let timer;

    const runTimer = () => {
      addedToCart.classList.add("added-to-cart-opacity-full");
      timer = setTimeout(() => {
        addedToCart.classList.remove("added-to-cart-opacity-full");
      }, 2000);
    };

    runTimer();

    btn.addEventListener("click", () => {
      clearTimeout(timer);
      runTimer();
    });
    //
  });
});
