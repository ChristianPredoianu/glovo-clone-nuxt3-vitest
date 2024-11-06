export function useCloseElementOnEscape(callback: () => void) {
  function handleEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape') callback();
  }

  onMounted(() => {
    document.addEventListener('keydown', handleEscapeKey);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscapeKey);
  });
}
