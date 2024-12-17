<script setup lang="ts">
const props = defineProps({
  authErrorMessage: String,
  successMessage: String,
});
</script>

<template>
  <p
    class="my-1 text-sm font-semibold"
    :class="authErrorMessage ? 'text-red-500' : 'text-green-500'"
  >
    {{ authErrorMessage || successMessage }}
  </p>
</template>
