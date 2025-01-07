<script setup lang="ts">
import { capitalizeFirstLetter } from '@/composables/helpers/capitalizeFirstLetter';
import { replaceRecipeText } from '@/composables/helpers/replaceRecipeText';
import type { IItem } from '@/types/products';

const props = defineProps({
  displayedItems: {
    type: Array as PropType<IItem[]>,
    required: true,
  },
});

const { addToCart } = useCart();
</script>

<template>
  <ul class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <li
      v-for="item in displayedItems"
      :key="item.id"
      class="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out"
    >
      <img
        src="../../../public/glovo.jpg"
        alt="Item Image"
        class="w-40 h-40 object-cover rounded-lg mb-4 sm:w-48 sm:h-48 md:w-56 md:h-56"
      />

      <div class="flex flex-col items-center gap-y-2 text-center sm:text-left">
        <p class="text-lg font-semibold text-gray-800">
          {{ capitalizeFirstLetter(item.category) }}
        </p>
        <p class="text-sm text-gray-600">
          {{ replaceRecipeText(item.label) }}
        </p>
      </div>
      <div
        class="flex flex-col items-center sm:items-end gap-y-4 mt-4 sm:mt-0 sm:ml-auto"
      >
        <p class="text-2xl font-bold text-green-700">{{ item.price }}€</p>
        <CtaBtn
          class="px-6 py-2 mt-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
          @click="addToCart(item)"
        >
          Add to Cart
        </CtaBtn>
      </div>
    </li>
  </ul>
</template>
