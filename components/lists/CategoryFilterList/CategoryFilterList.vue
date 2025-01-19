<script setup lang="ts">
import type { IFakeStoreCategories } from '@/types/products';
import type { ICuisineType } from '@/types/meals';

const emit = defineEmits(['emitSelected']);

const { filters } = useFilter();

const { setActive, isActive } = useIsActive();
const { getCategoryName } = useFilter();

function handleClick(selectedFilter: IFakeStoreCategories | ICuisineType) {
  const categoryName = getCategoryName(selectedFilter);
  emit('emitSelected', selectedFilter);
  setActive(categoryName);
}
</script>

<template>
  <ul class="flex flex-col gap-y-2">
    <li
      v-for="category in filters"
      :key="category.id"
      class="flex gap-x-2 items-center pb-2 border-solid border-b-1 border-gray-100 cursor-pointer"
      @click="handleClick(category)"
    >
      <font-awesome-icon
        data-test="icon"
        :icon="['fas', category?.icon]"
        class="fa-fw bg-orange-200 p-2 rounded-full text-gray-600"
        :class="{ 'bg-orange-300': isActive(getCategoryName(category)) }"
      />
      <p :class="{ 'font-semibold': isActive(getCategoryName(category)) }">
        {{ getCategoryName(category) }}
      </p>
    </li>
  </ul>
</template>
