<script setup lang="ts">
const props = defineProps({
  backCol: String,
  textCol: {
    type: String,
    default: undefined,
  },
  borderCol: {
    type: String,
    default: undefined,
  },
  borderWidth: {
    type: String,
    default: undefined,
  },
  fontSize: {
    type: String,
    default: undefined,
  },
  paddingX: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits(['clicked']);
</script>

<template>
  <button
    class="bg-green-600 py-3 px-10 rounded-xl font-bold cursor-pointer hover:bg-green-700"
    :class="[
      props.fontSize,
      props.backCol,
      props.textCol,
      props.borderCol,
      props.borderWidth,
      props.paddingX,
    ]"
    @click="emit('clicked')"
  >
    <slot></slot>
  </button>
</template>
