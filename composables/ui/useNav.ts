export function useNav() {
  const isNavOpen = useState('isNavOpen', () => false);

  function openNav() {
    isNavOpen.value = true;
  }

  function closeNav() {
    isNavOpen.value = false;
  }

  return { isNavOpen, openNav, closeNav } as const;
}
