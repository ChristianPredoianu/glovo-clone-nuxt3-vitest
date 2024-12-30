export function useScreenWidth() {
  const screenWidth = ref(0);

  onMounted(() => {
    if (import.meta.client) {
      window.addEventListener('resize', changeWidth);
      setInitialWidth();
    }
  });

  onUnmounted(() => {
    if (import.meta.client) window.removeEventListener('resize', changeWidth);
  });

  function changeWidth() {
    screenWidth.value = window.innerWidth;
  }

  function setInitialWidth() {
    if (import.meta.client) screenWidth.value = window.innerWidth;
  }

  return { screenWidth, setInitialWidth } as const;
}
