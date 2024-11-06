export function useIsActive() {
  const selected = useState<string | number>('selected', () => '');

  function setActive(userSelected: string | number) {
    selected.value = userSelected;
  }

  function isActive(userSelected: string | number): boolean {
    return selected.value === userSelected;
  }

  function clearActive() {
    selected.value = '';
  }

  return { setActive, isActive, clearActive } as const;
}
