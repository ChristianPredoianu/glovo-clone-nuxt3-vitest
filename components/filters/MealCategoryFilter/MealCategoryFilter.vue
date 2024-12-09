<script setup lang="ts">
import type {
  IFakeStoreCategories,
  ICuisineType,
} from '@/interfaces/interfaces.interface';

const emits = defineEmits(['emitSelected']);

function handleEmitSelected(selectedFilter: IFakeStoreCategories | ICuisineType) {
  emits('emitSelected', selectedFilter);
}
</script>

<template>
  <MealCategoryFilterList @emitSelected="handleEmitSelected" />
</template>
