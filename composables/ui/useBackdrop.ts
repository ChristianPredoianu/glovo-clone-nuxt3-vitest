export function useBackdrop() {
  const isBackdropOpen = useState<boolean>('isBackdropOpen', () => false);

  function openBackdrop() {
    isBackdropOpen.value = true;
  }

  function closeBackdrop() {
    isBackdropOpen.value = false;
  }

  return { isBackdropOpen, openBackdrop, closeBackdrop } as const;
}
