<script setup lang="ts">
const props = defineProps({
  errorMessage: String,
  successMessage: String,
});
</script>

<template>
  <p
    class="h-10 my-1 text-sm font-semibold"
    :class="errorMessage ? 'text-red-500' : 'text-green-500'"
  >
    {{ errorMessage || successMessage }}
  </p>
</template>
