<script setup lang="ts">
const props = defineProps({
  disabled: Boolean,
});
</script>
<template>
  <button
    type="submit"
    aria-label="Submit Form"
    :disabled="disabled"
    class="w-full bg-green-600 text-gray-100 py-2 px-4 rounded-md hover:bg-green-700 transition-opacity duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <slot></slot>
  </button>
</template>
