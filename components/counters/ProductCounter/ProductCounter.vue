<script setup lang="ts">
import type { ICartProduct } from '@/types';

const props = defineProps({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: Object as PropType<ICartProduct>,
    required: true,
  },
});

const { addToCart, removeFromCart } = useCart();
</script>

<template>
  <div class="flex space-between items-center justify-center gap-2">
    <p
      data-test="remove-btn"
      class="bg-gray-500 text-gray-100 rounded-sm flex items-center justify-center w-8 h-8 cursor-pointer"
      @click="removeFromCart(product.id!)"
    >
      -
    </p>
    <p data-test="quantity" class="border border-gray-500 py-1 px-3">{{ quantity }}</p>
    <p
      data-test="add-btn"
      class="bg-gray-400 text-gray-100 rounded-sm flex items-center justify-center w-8 h-8 cursor-pointer"
      @click="addToCart(product)"
    >
      +
    </p>
  </div>
</template>
