export function generateRandomPrice() {
  const randomFraction = Math.random();

  const randomPrice = 10 + randomFraction * (50 - 10);

  return randomPrice.toFixed(2);
}
