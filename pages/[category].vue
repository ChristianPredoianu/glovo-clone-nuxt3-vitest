<script setup lang="ts">
import { generateRandomPrice, capitalizeFirstLetter } from '@/helpers/helpers';
import { fetchData } from '@/helpers/fetchGenericData';
import { useIsMealData } from '@/composables/useIsMealData';
import type {
  IMeals,
  ISingleMeal,
  ICuisineType,
  IProduct,
  IFakeStoreCategories,
} from '@/interfaces/interfaces.interface';

interface FetchResult<T> {
  data: IMeals | IProduct[] | null;
  isLoading: boolean;
}

const emittedFilter = useState<string>('emmitedFilter', () => '');
const filteredData = useState<FetchResult<IMeals | IProduct[] | null>>(
  'filteredData',
  () => ({ data: null, isLoading: false })
);

const route = useRoute();
const { isFakeStoreIndex, getCategoryName } = useFilter();
const { screenWidth } = useScreenWidth();
const { isMealData } = useIsMealData();
const { currentModalProps, setModalProps } = useModalProps();
const { openModal, closeModal } = useModal();
const { initialFetchEndpoint, selectedApiEndpoint } = useEndpoints(
  route.params.category,
  emittedFilter,
  route.query.index as string
);

const { data, pending } = await useFetch<IMeals | IProduct[] | null>(
  initialFetchEndpoint.value!
);

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

function handleMealCardClick(item: ISingleMeal | IProduct) {
  setModalProps(item);
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
      :price="+generateRandomPrice()"
      @closeModal="closeModal"
    />
  </Modal>
  <div class="container mx-auto px-4 min-h-screen">
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

    <section class="flex justify-between">
      <div v-if="screenWidth >= 1024" class="mt-20">
        <CategoryFilter @emitSelected="handleEmitSelected" />
      </div>

      <div class="w-full lg:w-4/5">
        <h1 class="text-xl font-bold md:text-2xl pt-5 mt-6 lg:mt-12">
          {{ capitalizeFirstLetter($route.params.category) }}
          {{ !isFakeStoreIndex ? 'meals' : '' }}
        </h1>
        <h2 v-if="emittedFilter !== ''" class="text-gray-500 text-lg font-semibold mt-1">
          {{ emittedFilter }}
        </h2>

        <div
          v-if="pending || filteredData.isLoading"
          class="flex justify-center -mt-40 w-full"
        >
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
              @click="handleMealCardClick(meal)"
            />
          </template>

          <template v-if="renderType === 'products' || renderType === 'filteredProducts'">
            <ProductCard
              v-for="product in (renderType === 'products' ? (data as IProduct[]) : (filteredData.data as IProduct[]))"
              :key="product.id"
              :product="product"
              @click="handleMealCardClick(product)"
            />
          </template>
        </div>
      </div>
    </section>
  </div>
</template>
