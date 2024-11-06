import { onMounted, onUnmounted } from 'vue';

export function useScreenWidth() {
  const screenWidth = useState<number>('screenWidth', () =>
    process.client ? window.innerWidth : 0
  );

  function changeWidth() {
    screenWidth.value = window.innerWidth;
  }

  function setInitialWidth() {
    if (process.client) screenWidth.value = window.innerWidth;
  }

  onMounted(() => {
    if (process.client) {
      window.addEventListener('resize', changeWidth);
      setInitialWidth();
    }
  });

  onUnmounted(() => {
    if (process.client) window.removeEventListener('resize', changeWidth);
  });

  return { screenWidth, setInitialWidth } as const;
}
