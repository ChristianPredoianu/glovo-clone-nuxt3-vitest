export default function useIsLoaded() {
  const isLoaded = ref(false);

  onMounted(() => {
    isLoaded.value = true;
  });

  return { isLoaded } as const;
}
