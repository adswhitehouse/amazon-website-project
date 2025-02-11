import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";

renderCheckoutHeader()

renderOrderSummary();

renderPaymentSummary();
