<script setup lang="ts">
import type { IFakeStoreCategories } from '@/types/products';
import type { ICuisineType } from '@/types/meals';

const emits = defineEmits(['emitSelected']);

function handleEmitSelected(selectedFilter: IFakeStoreCategories | ICuisineType) {
  emits('emitSelected', selectedFilter);
}
</script>

<template>
  <CategoryFilterList @emitSelected="handleEmitSelected" />
</template>
