export function useScreenWidth() {
  const screenWidth = ref(0);

  onMounted(() => {
    if (process.client) {
      window.addEventListener('resize', changeWidth);
      setInitialWidth();
    }
  });

  onUnmounted(() => {
    if (process.client) window.removeEventListener('resize', changeWidth);
  });

  function changeWidth() {
    screenWidth.value = window.innerWidth;
  }

  function setInitialWidth() {
    if (process.client) screenWidth.value = window.innerWidth;
  }

  return { screenWidth, setInitialWidth } as const;
}
