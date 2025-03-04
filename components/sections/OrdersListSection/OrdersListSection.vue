<script setup lang="ts">
const { fetchOrders, fetchedOrders, isLoading } = useFirebaseOrderActions();
const { isAuthReady } = useAuth();

const { currentPage, itemsPerPage, totalItems, displayedItems, handlePageChange } =
  usePagination(fetchedOrders, 5);

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
    <div class="mt-6">
      <OrdersList :orderedItems="displayedItems" />
    </div>
    <h2
      v-if="displayedItems.length === 0"
      class="text-xl mt-10 font-semibold text-center"
    >
      You don't have any orders.
    </h2>
  </section>
  <h2 v-else class="text-xl mt-10 font-semibold text-center">
    You don't have any orders yet
  </h2>
</template>
