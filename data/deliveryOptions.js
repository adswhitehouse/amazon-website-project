import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"

export let deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  let todaysDate = dayjs();
  let deliveryDate = todaysDate.add(deliveryOption.deliveryDays, "days");
  let dateString = deliveryDate.format("dddd, MMMM D");
  return dateString
}
