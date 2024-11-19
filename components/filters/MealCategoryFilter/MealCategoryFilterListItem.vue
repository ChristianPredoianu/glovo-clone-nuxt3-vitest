<script setup lang="ts">
import type {
  IFakeStoreCategories,
  ICuisineType,
} from '@/interfaces/interfaces.interface';

const props = defineProps({
  category: {
    type: [Object] as PropType<IFakeStoreCategories | ICuisineType>,
    required: true,
  },
});

const emits = defineEmits(['emitSelected']);

const { setActive, isActive } = useIsActive();
const { getCategoryName } = useFilter();

function handleClick(selectedFilter: IFakeStoreCategories | ICuisineType) {
  const categoryName = getCategoryName(selectedFilter);
  emits('emitSelected', selectedFilter);
  setActive(categoryName);
}
</script>

<template>
  <li
    class="flex gap-x-2 items-center pb-2 border-solid border-b-1 border-gray-100 cursor-pointer"
    @click="handleClick(category)"
  >
    <font-awesome-icon
      data-test="icon"
      :icon="['fas', category?.icon]"
      class="fa-fw bg-orange-200 p-2 rounded-full text-gray-600"
      :class="{ 'bg-orange-300': isActive(getCategoryName(category)) }"
    />
    <p
      data-test="category"
      :class="{ 'font-semibold': isActive(getCategoryName(category)) }"
    >
      {{ getCategoryName(category) }}
    </p>
  </li>
</template>
