<script setup lang="ts">
const emits = defineEmits(['emitSelected']);

function emitSelected(selectedCuisineType: string) {
  emits('emitSelected', selectedCuisineType);
}
</script>

<template>
  <div class="modal">
    <Backdrop />
    <FilterModalOverlay @emitSelected="emitSelected" />
  </div>
</template>
