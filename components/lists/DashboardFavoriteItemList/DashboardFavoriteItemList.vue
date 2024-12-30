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
</script>

<template>
  <ul class="mt-4 space-y-4">
    <li
      v-for="item in displayedItems"
      :key="item.id"
      class="flex items-center p-4 border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out"
    >
      <img
        src="../../../public/glovo.jpg"
        alt="Item Image"
        class="w-32 h-32 object-cover rounded-lg mr-4"
      />
      <div class="flex flex-col gap-y-1">
        <p class="text-lg font-semibold text-gray-800">
          {{ capitalizeFirstLetter(item.category) }}
        </p>
        <p class="text-sm text-gray-600">{{ replaceRecipeText(item.label) }}</p>
      </div>
      <p>{{ item }}</p>
    </li>
  </ul>
</template>
