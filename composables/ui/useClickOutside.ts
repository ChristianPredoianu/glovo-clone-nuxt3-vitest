export function useClickOutside(
  elementRef: Ref<HTMLElement | null>,
  callback: () => void
) {
  onMounted(() => {
    document.addEventListener('click', handleClick);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClick);
  });

  function handleClick(event: MouseEvent) {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) callback();
  }
}
