<script setup lang="ts">
const props = defineProps({
  text: String,
  icon: String,
  backCol: String,
});

const emit = defineEmits(['emitClick']);

const { isLoaded } = useIsLoaded();
</script>

<template>
  <button class="flex flex-col gap-y-1" @click="emit('emitClick')">
    <font-awesome-icon
      v-if="isLoaded"
      :icon="['fas', props.icon]"
      data-test="fa-icon"
      class="bg-orange-200 p-2 rounded-full text-gray-600 cursor-pointer h-4 w-4"
      :class="[props.backCol]"
    />
    <p class="text-center font-semibold">{{ props.text }}</p>
  </button>
</template>
