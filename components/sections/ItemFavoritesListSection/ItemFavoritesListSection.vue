<script setup lang="ts">
import { cuisineTypes } from '@/data/productCategoriesData';
import { fakeStoreCategories } from '@/data/productCategoriesData';
import type { IItem } from '@/types';

const selectedOption = ref('');

const { fetchedFavoriteItems, isLoading, fetchFavoriteItems } =
  useFirebaseFavoriteItemActions();
const { isAuthReady } = useAuth();

const filteredItems = computed(() => {
  if (!selectedOption.value || selectedOption.value === 'All Categories')
    return fetchedFavoriteItems.value;

  return fetchedFavoriteItems.value.filter(
    (item) => capitalizeFirstLetter(item.category) === selectedOption.value
  );
});

const filteredItemsRef = ref<IItem[]>(filteredItems.value);

const { currentPage, itemsPerPage, totalItems, displayedItems, handlePageChange } =
  usePagination(filteredItemsRef, 5);

const mergedCategories = [
  { category: 'All Categories' },
  ...cuisineTypes.map(({ cuisineType }) => ({
    category: capitalizeFirstLetter(cuisineType),
  })),
  ...fakeStoreCategories.map(({ category }) => ({
    category: capitalizeFirstLetter(category),
  })),
];

function emitSelected(option: string) {
  selectedOption.value = option;
}

onMounted(() => {
  if (isAuthReady.value) {
    fetchFavoriteItems();
  } else {
    const stopWatching = watch(
      () => isAuthReady.value,
      (ready) => {
        if (ready) {
          fetchFavoriteItems();
          stopWatching();
        }
      },
      { immediate: true }
    );
  }
});

watch(filteredItems, (newFilteredItems) => {
  filteredItemsRef.value = newFilteredItems;
});
</script>

<template>
  <LoadingSpinner v-if="isLoading" />
  <section v-if="fetchedFavoriteItems.length > 0">
    <div class="flex flex-col items-center md:flex-row md:justify-between mt-4">
      <DropdownSelectDropdown
        :options="mergedCategories"
        displayKey="category"
        defaultOptionText="All Categories"
        @emitSelected="emitSelected"
      />
      <Pagination
        v-if="displayedItems.length > 0"
        :currentPage="currentPage"
        :totalItems="totalItems"
        :itemsPerPage="itemsPerPage"
        @pageChanged="handlePageChange"
      />
    </div>
    <DashboardFavoriteItemList :displayedItems="displayedItems" />

    <h2
      v-if="displayedItems.length === 0"
      class="text-xl mt-10 font-semibold text-center"
    >
      You don't have any favorites in this category
    </h2>
  </section>
  <h2 v-else class="text-xl mt-10 font-semibold text-center">
    You don't have any favorites yet
  </h2>
</template>
