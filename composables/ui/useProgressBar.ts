export function useProgressBar() {
  const progressWidth = ref(0);
  const isBarActive = ref(false);

  let intervalId: ReturnType<typeof setInterval> | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function startProgressBar(step = 20, intervalDuration = 50) {
    if (intervalId !== null) clearInterval(intervalId);
    if (timeoutId !== null) clearTimeout(timeoutId);

    progressWidth.value = 0;
    isBarActive.value = true;

    intervalId = setInterval(() => {
      if (progressWidth.value < 100) {
        progressWidth.value += step;
      } else {
        if (intervalId !== null) clearInterval(intervalId);
        progressWidth.value = 100;

        timeoutId = setTimeout(() => {
          isBarActive.value = false;
        }, 500);
      }
    }, intervalDuration);
  }

  return { startProgressBar, isBarActive, progressWidth } as const;
}
