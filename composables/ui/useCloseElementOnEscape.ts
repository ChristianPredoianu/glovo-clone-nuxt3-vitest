export function useCloseElementOnEscape(callback: () => void) {
  onMounted(() => {
    document.addEventListener('keydown', handleEscapeKey);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscapeKey);
  });

  function handleEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape') callback();
  }
}
