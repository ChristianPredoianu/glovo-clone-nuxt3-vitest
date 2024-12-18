export function useBackdrop() {
  const isBackdropOpen = useState('isBackdropOpen', () => false);

  function openBackdrop() {
    isBackdropOpen.value = true;
  }

  function closeBackdrop() {
    isBackdropOpen.value = false;
  }

  return { isBackdropOpen, openBackdrop, closeBackdrop } as const;
}
