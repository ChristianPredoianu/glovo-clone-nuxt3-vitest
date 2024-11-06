export function useKeyDown(
  optionsLength: Ref<number>,
  callback: (index: number) => void
) {
  const selectedIndex = useState<number>(() => 0);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedIndex.value = Math.min(selectedIndex.value + 1, optionsLength.value - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      selectedIndex.value !== -1 && callback(selectedIndex.value);
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
  });

  return {
    selectedIndex,
  } as const;
}
