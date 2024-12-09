import type { ICartProduct } from '@/interfaces/interfaces.interface';
import { watch } from 'vue';

export function useCart() {
  // Initialize cart state from local storage
  const cartProducts = useState<ICartProduct[]>('cartProducts', () => {
    const storedCart = localStorage.getItem('cartProducts');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const { startProgressBar } = useProgressBar();

  // Watch for changes in cartProducts and update local storage
  watch(
    cartProducts,
    (newCart) => {
      localStorage.setItem('cartProducts', JSON.stringify(newCart));
    },
    { deep: true }
  );

  function addToCart(product: ICartProduct | null) {
    if (product !== null) {
      // Check if existing product
      const existingProduct = cartProducts.value.find((p) => p.id === product.id);

      // If product already in the cart, increase quantity
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

      product.quantity && product.quantity > 1
        ? product.quantity--
        : cartProducts.value.splice(productIndex, 1);
    }
  }

  const updatedTotalPrice = computed(() => {
    return cartProducts.value.reduce((total, product) => {
      const quantity = product.quantity ?? 0; // Default to 0 if undefined or null
      return +(total + quantity * product.price).toFixed(2);
    }, 0);
  });

  const numberOfCartProducts = computed(() => {
    return cartProducts.value.reduce((total, product) => {
      return total + (product.quantity || 0); //If product.quantity is undefined or null, we fall back to 0
    }, 0);
  });

  return {
    cartProducts,
    addToCart,
    removeFromCart,
    numberOfCartProducts,
    updatedTotalPrice,
  } as const;
}
