import type { ICartProduct } from '@/types/cart';
import type { IProduct } from '@/types/products';
import { computed } from 'vue';

export function useCart() {
  const cartProducts = useState<ICartProduct[]>('cartProducts', () => []);

  const { startProgressBar } = useProgressBar();

  const updatedTotalPrice = computed(() => {
    return cartProducts.value.reduce((total, product) => {
      const quantity = product.quantity ?? 0; // Default to 0 if undefined or null
      return +(total + quantity * product.price).toFixed(2);
    }, 0);
  });

  const numberOfCartProducts = computed(() => {
    return cartProducts.value.reduce((total, product) => {
      return total + (product.quantity ?? 0); // Default to 0 if undefined or null
    }, 0);
  });

  function addToCart(product: ICartProduct | null) {
    if (product !== null) {
      // Check if the product already exists in the cart
      const existingProduct = cartProducts.value.find((p) => p.id === product.id);

      // If the product is already in the cart, increase its quantity
      existingProduct
        ? (existingProduct.quantity = (existingProduct.quantity || 1) + 1)
        : cartProducts.value.push({ ...product, quantity: 1 });

      startProgressBar();
    }
  }

  function removeFromCart(productId: number | string) {
    const productIndex = cartProducts.value.findIndex(
      (product) => product.id === productId
    );

    if (productIndex !== -1) {
      const product = cartProducts.value[productIndex];

      // Decrease quantity or remove the product if quantity reaches zero
      product.quantity && product.quantity > 1
        ? product.quantity--
        : cartProducts.value.splice(productIndex, 1);
    }
  }

  return {
    cartProducts,
    addToCart,
    removeFromCart,
    numberOfCartProducts,
    updatedTotalPrice,
  } as const;
}
