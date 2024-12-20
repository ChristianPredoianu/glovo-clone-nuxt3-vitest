<script setup lang="ts">
import type { IFakeStoreCategories } from '@/types/products';
import type { ICuisineType } from '@/types/meals';

const { setActive, isActive } = useIsActive();
const { filters, getCategoryName } = useFilter();

const emits = defineEmits(['selectedFilter']);

function handleClick(category: IFakeStoreCategories | ICuisineType) {
  const categoryName = getCategoryName(category);
  emits('selectedFilter', category);

  setActive(categoryName);
}

function handleDeleteFilter() {
  setActive('');
  emits('selectedFilter', '');
}
</script>

<template>
  <ul class="grid place-content-center grid-cols-3 sm:grid-cols-4 gap-4 mt-8">
    <li
      v-for="category in filters"
      :key="category.id"
      class="relative py-4 rounded-lg flex flex-col items-center cursor-pointer gap-y-2"
      @click="handleClick(category)"
    >
      <font-awesome-icon
        :icon="['fas', category.icon]"
        data-test="filter-icon"
        class="text-gray-700 text-3xl p-2 rounded-full w-min"
        :class="{ 'bg-orange-200': isActive(getCategoryName(category)) }"
      />
      <p class="text-gray-800 text-center text-sm font-semibold">
        {{ getCategoryName(category) }}
      </p>
      <font-awesome-icon
        data-test="fa-remove"
        v-if="isActive(getCategoryName(category))"
        @click.stop="handleDeleteFilter"
        :icon="['fas', 'close']"
        class="absolute bottom-10 right-4 rounded-full p-2 text-xs bg-gray-600 text-gray-200 cursor-pointer shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-gray-700"
        title="Remove Filter"
      />
    </li>
  </ul>
</template>
