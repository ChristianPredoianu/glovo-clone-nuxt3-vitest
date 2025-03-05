<script setup lang="ts">
const props = defineProps({
  disabled: Boolean,
  bgColor: {
    type: String,
    default: 'bg-green-600',
  },
});
</script>
<template>
  <button
    type="submit"
    aria-label="Submit Form"
    :disabled="disabled"
    class="text-gray-100 py-2 px-4 rounded-md hover:bg-green-700 transition-opacity duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="bgColor"
  >
    <slot></slot>
  </button>
</template>
