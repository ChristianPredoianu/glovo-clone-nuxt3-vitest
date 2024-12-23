export function useRandomPrices(itemCount: number) {
  const prices = useState<number[]>('prices', () => {
    return Array.from({ length: itemCount }, () => Math.floor(Math.random() * 50) + 10);
  });

  return {
    prices,
  };
}
