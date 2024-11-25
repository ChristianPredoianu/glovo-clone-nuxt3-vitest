export function useProgressBar() {
  const progressWidth = useState<number>('progressWidth', () => 0);
  const isBarActive = ref(false);

  let startTime: number | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function startProgressBar() {
    progressWidth.value = 0;
    isBarActive.value = true;
    startTime = null;

    const interval = setInterval(() => {
      if (progressWidth.value < 100) {
        progressWidth.value += 100;
      } else {
        clearInterval(interval);
        progressWidth.value = 100;

        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
          isBarActive.value = false;
        }, 500);
      }
    }, 10);
  }

  return { startProgressBar, isBarActive, progressWidth } as const;
}
