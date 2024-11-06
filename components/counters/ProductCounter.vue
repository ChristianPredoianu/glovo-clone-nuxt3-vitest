<script setup lang="ts">
import type { ICartProduct } from '@/interfaces/interfaces.interface';

const props = defineProps<{
  quantity: number;
  product: ICartProduct;
}>();

const { addToCart, removeFromCart } = useCart();
</script>

<template>
  <div class="flex space-between items-center justify-center gap-2">
    <p
      class="bg-gray-500 text-gray-100 rounded-sm flex items-center justify-center w-8 h-8 cursor-pointer"
      @click="removeFromCart(product.id)"
    >
      -
    </p>
    <p class="border border-gray-500 py-1 px-3">{{ quantity }}</p>
    <p
      class="bg-gray-400 text-gray-100 rounded-sm flex items-center justify-center w-8 h-8 cursor-pointer"
      @click="addToCart(product)"
    >
      +
    </p>
  </div>
</template>
