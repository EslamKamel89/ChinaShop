export function money(value: number) {
  return Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "EGP",
  }).format(value);
}
