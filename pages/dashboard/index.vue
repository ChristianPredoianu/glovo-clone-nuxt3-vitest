<script setup lang="ts">
import SelectDropdown from '@/components/ui/Dropdown/SelectDropdown.vue';
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';
import { replaceRecipeText } from '@/helpers/replaceRecipeText';
import { cuisineTypes } from '@/data/productCategoriesData';
import { fakeStoreCategories } from '@/data/productCategoriesData';

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

const { fetchedFavoriteItems, fetchFavoriteItems } = useFirebaseActions();
const { isAuthReady } = useAuth();

const filteredItems = computed(() => {
  if (!selectedOption.value || selectedOption.value === 'All Categories')
    return fetchedFavoriteItems.value;

  return fetchedFavoriteItems.value.filter(
    (item) => capitalizeFirstLetter(item.category) === selectedOption.value
  );
});

const { currentPage, itemsPerPage, totalItems, displayedItems, handlePageChange } =
  usePagination(filteredItems, 5);

function emitSelected(option: string) {
  selectedOption.value = option;
}

watch(
  () => isAuthReady.value,
  (ready) => {
    if (ready) fetchFavoriteItems();
  },
  { immediate: true }
);
</script>

<template>
  <div class="min-h-screen container mx-auto px-4 py-4">
    <BackBtn :page="'/'" class="mb-4" />
    <section
      class="flex flex-col gap-y-4 items-center md:gap-y-6 lg:flex-row lg:justify-between bg-white p-4 rounded-xl"
    >
      <SearchBar />
      <Profile />
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
          :currentPage="currentPage"
          :totalItems="totalItems"
          :itemsPerPage="itemsPerPage"
          @pageChanged="handlePageChange"
        />
      </div>
      <h1>{{ selectedOption }}</h1>
      <ul class="mt-4 space-y-4">
        <li
          v-for="item in filteredItems"
          :key="item.id"
          class="flex items-center p-4 border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out"
        >
          <img
            src="/glovo.jpg"
            alt="Item Image"
            class="w-32 h-32 object-cover rounded-lg mr-4"
          />
          <div class="flex flex-col gap-y-1">
            <p class="text-lg font-semibold text-gray-800">
              {{ capitalizeFirstLetter(item.category) }}
            </p>
            <p class="text-sm text-gray-600">{{ replaceRecipeText(item.label) }}</p>
          </div>
        </li>
      </ul>
      <h2 v-if="filteredItems.length === 0" class="text-xl font-semibold text-center">
        You don't have any favorites in this category
      </h2>
    </section>
  </div>
</template>
