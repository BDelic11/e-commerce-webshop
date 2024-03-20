export function formatPrice(price?: number) {
  if (price === undefined) {
    return null;
  }
  return (price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "EUR",
  });
}
