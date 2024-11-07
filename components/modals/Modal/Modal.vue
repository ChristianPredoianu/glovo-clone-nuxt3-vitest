<script setup lang="ts">
const props = defineProps({ modalName: String });

const { isModalOpen, closeModal } = useModal();

// Compute `isOpen` by calling `isModalOpen` with the modalName, ensuring a boolean result
const isOpen = computed(() => isModalOpen(props.modalName!));
</script>

<template>
  <Teleport to="body" v-if="isOpen">
    <Backdrop :isBackdropOpen="isOpen" @closeElement="closeModal" />
    <article
      class="fixed inset-0 mx-auto my-auto z-50 bg-white rounded-lg shadow-lg w-11/12 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-2xl p-6 md:p-8 lg:p-10 overflow-y-auto max-h-[90vh] transition-all"
    >
      <div class="flex justify-end">
        <button
          @click="closeModal"
          class="text-gray-600 hover:text-gray-800 transition duration-200"
        >
          <CloseIcon />
        </button>
      </div>
      <div class="pt-4">
        <slot></slot>
      </div>
    </article>
  </Teleport>
</template>
