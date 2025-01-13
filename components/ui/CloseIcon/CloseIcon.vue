<script setup lang="ts">
const emits = defineEmits(['close']);
</script>

<template>
  <font-awesome-icon
    :icon="['fas', 'close']"
    data-test="fa-close"
    class="text-2xl text-right font-semibold cursor-pointer"
    @click="emits('close')"
  />
</template>
