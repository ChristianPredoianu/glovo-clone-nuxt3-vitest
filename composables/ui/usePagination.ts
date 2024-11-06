export function usePagination<T>(items: Ref<T[]>, numberOfItemsPerPage: number) {
  const currentPage = ref(1);
  const itemsPerPage = numberOfItemsPerPage;
  const totalItems = items.value.length;

  const displayedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.value.slice(start, end);
  });

  function handlePageChange(newPage: number) {
    currentPage.value = newPage;
  }

  return {
    currentPage,
    itemsPerPage,
    totalItems,
    displayedItems,
    handlePageChange,
  } as const;
}
