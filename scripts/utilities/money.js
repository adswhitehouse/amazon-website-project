export function twoDecimalPlaces(priceCents) {
  return (priceCents / 100).toFixed(2);
}

export default twoDecimalPlaces;
