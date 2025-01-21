<script setup lang="ts">
const { fetchOrders, fetchedOrders, isLoading } = useFirebaseOrderActions();

const { isAuthReady } = useAuth();

onMounted(() => {
  if (isAuthReady.value) {
    fetchOrders();
  } else {
    const stopWatching = watch(
      () => isAuthReady.value,
      (ready) => {
        if (ready) {
          fetchOrders();
          stopWatching();
        }
      },
      { immediate: true }
    );
  }
});

const { currentPage, itemsPerPage, totalItems, displayedItems, handlePageChange } =
  usePagination(fetchedOrders, 5);
</script>

<template>
  <LoadingSpinner v-if="isLoading" />

  <section v-if="fetchedOrders.length > 0">
    <div class="flex flex-col items-center md:flex-row md:justify-between mt-4">
      <Pagination
        v-if="displayedItems.length > 0"
        :currentPage="currentPage"
        :totalItems="totalItems"
        :itemsPerPage="itemsPerPage"
        @pageChanged="handlePageChange"
      />
    </div>
    <OrdersList :orderedItems="displayedItems" />
    <h2 v-if="displayedItems.length === 0" class="text-xl font-semibold text-center">
      You don't have any favorites in this category
    </h2>
  </section>
</template>
