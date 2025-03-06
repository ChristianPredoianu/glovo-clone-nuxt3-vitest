<script setup lang="ts">
import { capitalizeFirstLetter } from '@/composables/helpers/capitalizeFirstLetter';
import { fetchData } from '@/composables/helpers/fetchGenericData';
import { isMealData } from '@/composables/helpers/mealTypeGuards';
import { productCategories } from '@/data/productCategoriesData';
import type { IMeals, ISingleMeal, ICuisineType } from '@/types/meals';
import type { IProduct, IFakeStoreCategories } from '@/types/products';

interface FetchResult<T> {
  data: IMeals | IProduct[] | null;
  isLoading: boolean;
}

const emittedFilter = ref('');
const filteredData = useState<FetchResult<IMeals | IProduct[] | null>>(
  'filteredData',
  () => ({ data: null, isLoading: false })
);

const route = useRoute();
const { isFakeStoreIndex, getCategoryName } = useFilter();
const { screenWidth } = useScreenWidth();
const { currentModalProps, setModalProps } = useModalProps();
const { openModal, closeModal } = useModal();

const { initialFetchEndpoint, selectedApiEndpoint } = useEndpoints(
  route.params.category,
  emittedFilter,
  route.query.index as string
);

const { data } = await useFetch<IMeals | IProduct[] | null>(initialFetchEndpoint.value!);

async function fetchDataAndUpdate() {
  if (emittedFilter.value) {
    filteredData.value.isLoading = true;
    const result = await fetchData<IMeals | IProduct[]>(selectedApiEndpoint.value!);
    filteredData.value.data = result.data || null;
    filteredData.value.isLoading = false;
  } else {
    filteredData.value.data = null;
  }
}

function handleEmitSelected(
  selectedFilter: IFakeStoreCategories | ICuisineType | string
) {
  emittedFilter.value =
    typeof selectedFilter === 'string' ? '' : getCategoryName(selectedFilter);
  filteredData.value.data = null;
}

function handleMealCardClick(item: ISingleMeal | IProduct, price?: number) {
  const finalPrice = price ?? 0;
  setModalProps({ ...item, price: finalPrice });
  openModal('productModal');
}

const renderType = computed(() => {
  if (filteredData.value.data) {
    return isMealData(filteredData.value.data) ? 'filteredMeals' : 'filteredProducts';
  }
  if (data.value) {
    return isMealData(data.value) ? 'meals' : 'products';
  }
  return null;
});

// Generate prices based on the number of items
const itemCount = computed(() => {
  if (filteredData.value.data) {
    return isMealData(filteredData.value.data)
      ? (filteredData.value.data as IMeals).hits.length
      : (filteredData.value.data as IProduct[]).length;
  }
  if (data.value) {
    return isMealData(data.value)
      ? (data.value as IMeals).hits.length
      : (data.value as IProduct[]).length;
  }
  return 0;
});

const { prices } = useRandomPrices(itemCount.value);

function handleCategoryClick() {
  emittedFilter.value = '';
}

watch(emittedFilter, fetchDataAndUpdate);

onBeforeRouteLeave((to, from, next) => {
  emittedFilter.value = '';
  next();
});
</script>

<template>
  <!-- Filter Modal -->
  <Modal modalName="filter">
    <FilterModalOverlay @emitSelected="handleEmitSelected" @closeModal="closeModal" />
  </Modal>

  <Modal modalName="productModal">
    <ProductModalOverlay
      :productModalProps="currentModalProps"
      @closeModal="closeModal"
    />
  </Modal>
  <div class="container mx-auto px-4">
    <section
      v-if="screenWidth <= 1024"
      class="mt-10 flex justify-center items-center gap-4"
    >
      <RoundedBtn
        @emitClick="openModal('filter')"
        text="Filter"
        backCol="bg-orange-200"
        icon="fa-filter"
      />
    </section>
    <section class="container mx-auto px-4 mt-10 md:mt-28">
      <div
        class="grid grid-cols-2 sm:grid-cols-3 lg:px-20 md:grid-cols-4 lg:grid-cols-8 gap-y-4 text-center text-green-900"
      >
        <CategoryCard
          v-for="(productCategory, index) in productCategories"
          :key="productCategory.text"
          :index="index"
          :productCategory="{ ...productCategory, index }"
          @click="handleCategoryClick"
        />
      </div>
    </section>
    <section class="container mx-auto px-4 flex justify-between">
      <div v-if="screenWidth >= 1024" class="mt-20">
        <CategoryFilter @emitSelected="handleEmitSelected" />
      </div>

      <div class="w-full lg:w-4/5">
        <h1 class="text-xl font-bold md:text-2xl pt-5 mt-6 lg:mt-12">
          {{ capitalizeFirstLetter(route.params.category) }}
          {{ !isFakeStoreIndex ? 'meals' : '' }}
        </h1>
        <h2 v-if="emittedFilter !== ''" class="text-gray-500 text-lg font-semibold mt-1">
          {{ emittedFilter }}
        </h2>

        <div v-if="filteredData.isLoading" class="flex justify-center -mt-40 w-full">
          <LoadingSpinner />
        </div>

        <div
          v-if="renderType"
          class="grid gap-y-8 gap-x-8 mt-6"
          :class="{
            'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6':
              renderType === 'meals' || renderType === 'filteredMeals',
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4':
              renderType === 'products' || renderType === 'filteredProducts',
          }"
        >
          <template v-if="renderType === 'meals' || renderType === 'filteredMeals'">
            <MealCard
              v-for="(meal, index) in (renderType === 'meals' ? (data as IMeals).hits : (filteredData.data as IMeals).hits)"
              :key="renderType === 'meals' ? meal.recipe.label : `meal-${index}`"
              :meal="meal"
              :price="prices[index]"
              @click="handleMealCardClick(meal, prices[index])"
            />
          </template>

          <template v-if="renderType === 'products' || renderType === 'filteredProducts'">
            <ProductCard
              v-for="(product, index) in (renderType === 'products' ? (data as IProduct[]) : (filteredData.data as IProduct[]))"
              :key="product.id"
              :product="product"
              :price="prices[index]"
              @click="handleMealCardClick(product)"
            />
          </template>
        </div>
      </div>
    </section>
  </div>
</template>
