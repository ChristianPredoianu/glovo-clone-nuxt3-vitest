<script setup lang="ts">
import { cuisineTypes } from '@/data/productCategoriesData';
import { fakeStoreCategories } from '@/data/productCategoriesData';
import type { IItem } from '@/types/products';

const selectedOption = ref('');

const { fetchedFavoriteItems, fetchFavoriteItems } = useFetchFavoriteItems();
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

watch(filteredItems, (newFilteredItems) => {
  filteredItemsRef.value = newFilteredItems;
});

onMounted(() => {
  if (isAuthReady.value) {
    fetchFavoriteItems();
  } else {
    watch(
      () => isAuthReady.value,
      (ready) => {
        if (ready) fetchFavoriteItems();
      },
      { immediate: true }
    );
  }
});
</script>

<template>
  <section class="p-4 mt-4" v-if="fetchedFavoriteItems.length > 0">
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
    <h2 v-if="displayedItems.length === 0" class="text-xl font-semibold text-center">
      You don't have any favorites in this category
    </h2>
  </section>
</template>
