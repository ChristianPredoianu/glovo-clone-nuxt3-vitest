<script setup lang="ts">
const emits = defineEmits(['emitSelected']);

const { filters } = useFilter();

function emitSelected(selectedFilter: string) {
  emits('emitSelected', selectedFilter);
}
</script>

<template>
  <ul class="flex flex-col gap-y-2">
    <MealCategoryFilterListItem
      v-for="category in filters"
      :key="category.id"
      :category="category"
      @emitSelected="emitSelected"
    />
  </ul>
</template>
