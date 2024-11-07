<script setup lang="ts">
const props = defineProps({
  text: String;
  icon: String;
  backCol: String;
});

const emits = defineEmits(['emitClick']);
</script>

<template>
  <div class="flex flex-col gap-y-1">
    <font-awesome-icon
      :icon="['fas', props.icon]"
      class="bg-orange-200 p-2 rounded-full text-gray-600 cursor-pointer h-4 w-4"
      :class="[props.backCol]"
      @click="emits('emitClick')"
    />
    <p class="text-center font-semibold">{{ props.text }}</p>
  </div>
</template>
