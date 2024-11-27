<script setup lang="ts">
const { progressWidth } = useProgressBar();
</script>

<template>
  <div class="relative w-full h-1 bg-gray-300 rounded-md overflow-hidden">
    <!-- The progress bar filling -->
    <div
      data-test="progress"
      class="h-full bg-green-500 transition-all duration-300 ease-linear"
      :style="{ width: progressWidth + '%' }"
    ></div>
  </div>
</template>
