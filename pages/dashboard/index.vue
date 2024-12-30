<script setup lang="ts">
import SelectDropdown from '@/components/ui/Dropdown/SelectDropdown/SelectDropdown.vue';
import { capitalizeFirstLetter } from '@/composables/helpers/capitalizeFirstLetter';
import { cuisineTypes } from '@/data/productCategoriesData';
import { fakeStoreCategories } from '@/data/productCategoriesData';
import DashboardFavoriteItemList from '@/components/lists/DashboardFavoriteItemList/DashboardFavoriteItemList.vue';
import type { IItem } from '@/types/products';

const selectedOption = ref('');

const mergedCategories = [
  { category: 'All Categories' },
  ...cuisineTypes.map(({ cuisineType }) => ({
    category: capitalizeFirstLetter(cuisineType),
  })),
  ...fakeStoreCategories.map(({ category }) => ({
    category: capitalizeFirstLetter(category),
  })),
];

const { fetchedFavoriteItems, isLoading, fetchFavoriteItems } = useFetchFavoriteItems();
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

function emitSelected(option: string) {
  selectedOption.value = option;
}

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

watch(filteredItems, (newFilteredItems) => {
  filteredItemsRef.value = newFilteredItems;
});
</script>

<template>
  <div v-if="isAuthReady" class="min-h-screen">
    <LoadingSpinner v-if="isLoading" />
    <div class="min-h-screen container mx-auto px-4 py-4">
      <BackBtn :page="'/'" class="mb-4" />
      <section
        class="flex flex-col gap-y-4 items-center md:gap-y-6 lg:flex-row lg:justify-between bg-white p-4 rounded-xl"
      >
        <Profile />
        <SearchBar />
      </section>
      <section class="p-4 mt-4">
        <h1 class="font-semibold text-lg">Your favorites</h1>
        <div class="flex flex-col items-center md:flex-row md:justify-between mt-4">
          <SelectDropdown
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
    </div>
  </div>
</template>
