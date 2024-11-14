<script setup lang="ts">
const { isLoaded } = useIsLoaded();
</script>

<template>
  <div class="flex items-center bg-gray-200 rounded-full px-4 py-2 w-full max-w-md">
    <font-awesome-icon
      v-if="isLoaded"
      :icon="['fas', 'search']"
      class="text-gray-500 mr-2"
    />

    <input
      type="text"
      placeholder="Search..."
      class="bg-transparent outline-none flex-grow text-gray-700"
    />
  </div>
</template>
