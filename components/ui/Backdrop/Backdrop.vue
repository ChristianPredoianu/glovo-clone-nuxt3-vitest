<script setup lang="ts">
// Declare the props for the Backdrop component
const props = defineProps<{ isBackdropOpen?: boolean }>();
const emits = defineEmits(['closeElement']);

const { closeBackdrop } = useBackdrop();

function closeBackdropElements() {
  closeBackdrop();
  emits('closeElement');
}
</script>

<template>
  <Teleport to="body" v-if="isBackdropOpen">
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="closeBackdropElements"
    ></div>
  </Teleport>
</template>
