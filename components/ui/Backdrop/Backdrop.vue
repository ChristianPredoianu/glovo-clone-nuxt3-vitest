<script setup lang="ts">
const props = defineProps({
  isBackdropOpen: {
    type: Boolean,
  },
});
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
      data-test="backdrop"
      @click="closeBackdropElements"
    ></div>
  </Teleport>
</template>
