import { ref } from 'vue';

const currentModal = ref<string | null>(null);

export function useModal() {
  function openModal(modalName: string) {
    currentModal.value = modalName;
    console.log(currentModal.value);
  }

  function closeModal() {
    currentModal.value = null;
  }

  function isModalOpen(modalName: string): boolean {
    return currentModal.value === modalName;
  }

  return { currentModal, isModalOpen, openModal, closeModal };
}
