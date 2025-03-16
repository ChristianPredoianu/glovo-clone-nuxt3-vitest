<script setup lang="ts">
import Modal from '@/components/modals/Modal/Modal.vue';
import { productCategories, dishTypes } from '@/data/productCategoriesData';
import { infoCardsData } from '@/data/infocardsData';
import { convertToDropdownOptions } from '@/composables/helpers/convertToDropdownOptions';
import type { ISingleMeal, IMeals } from '@/types/meals';
import type { ILocationsData, ILocationAdress, ICountriesData } from '@/types/locations';
import type { IDropdownOptions } from '@/types/ui';

const emittedInput = ref<string>('');
const selectedMeal = ref<(ISingleMeal & { price: number }) | null>(null);
const emittedOption = ref<IDropdownOptions>({ id: 0, text: '' });
const emittedLocation = ref<ILocationAdress>({
  address: { road: '', postcode: '', town: '', country: '' },
});

const { locationEndpoint, indexMealDataEndpoint, restCountriesEndpoint } = useEndpoints(
  undefined,
  emittedInput,
  undefined
);

const { data: mealData } = await useFetch<IMeals>(() => `${indexMealDataEndpoint.value}`);

const { data: locationData } = await useFetch<ILocationsData[]>(
  () => {
    if (!emittedInput.value || emittedInput.value.trim() === '') return '';

    return `${locationEndpoint.value}`;
  },
  {
    watch: [emittedInput],
  }
);

const { data: countriesData } = await useFetch<ICountriesData[]>(
  () => `${restCountriesEndpoint}`
);

let dropdownOptions: IDropdownOptions[] = [];

const { currentModalProps, setModalProps } = useModalProps();
const { openModal, closeModal } = useModal();
const { isLoaded } = useIsLoaded();
const { prices: mealPrices } = useRandomPrices(mealData.value?.hits.length || 0);

watch(
  () => locationData.value,
  (newValue: ILocationsData[] | null) => {
    newValue
      ? (dropdownOptions = convertToDropdownOptions(newValue))
      : (dropdownOptions = []);
  }
);

watch(
  () => emittedOption.value,
  (newValue: IDropdownOptions | null) => {
    if (newValue !== null) emittedLocation.value.address.road = '';
  }
);

function handleEmittedSearchQuery(searchQuery: string) {
  emittedInput.value = searchQuery;
}

function handleEmmitedOption(option: IDropdownOptions) {
  emittedOption.value = option;
}

function handleEmmitedLocation(location: ILocationAdress) {
  emittedLocation.value = location;
}

function checkIfLocation() {
  return emittedOption.value.text !== '' || emittedLocation.value.address.road !== '';
}

function checkLocationOutput() {
  return emittedLocation.value.address.road !== ''
    ? `${emittedLocation.value.address.road}, 
                  ${emittedLocation.value.address.postcode}, 
                  ${emittedLocation.value.address.town}, 
                  ${emittedLocation.value.address.country}`
    : emittedOption.value.text;
}

function handleMealCardClick(meal: ISingleMeal, price: number) {
  selectedMeal.value = { ...meal, price };
  setModalProps(selectedMeal.value);
  openModal('productModal');
}

function goToLocalFood() {
  navigateTo('/Dinner?index=2');
}
</script>

<template>
  <!-- Product Modal -->
  <Modal modalName="productModal">
    ><ProductModalOverlay :productModalProps="currentModalProps" @closeModal="closeModal"
  /></Modal>

  <!-- Address Modal -->
  <Modal modalName="addressModal">
    <AddressModalOverlay />
  </Modal>

  <section class="bg-amber-400 text-gray-800 min-h-screen md:min-h-min">
    <div
      class="container px-4 pt-28 mx-auto flex flex-col items-center justify-center gap-8 p-10 md:flex-row"
    >
      <div class="w-1/2 md:w-1/3">
        <img src="@/assets/food.png" alt="food" class="md:w-1/2" />
      </div>
      <div class="text-green-900 bg-amber-400 text-center">
        <h1 class="text-2xl font-bold md:text-4xl">Food delivery and more</h1>
        <p class="mt-2 font-medium md:font-xl">
          Groceries, clothing, electronics, anything!
        </p>
        <div class="input-container relative mt-8">
          <AddressForm
            v-if="locationData || dropdownOptions"
            :options="dropdownOptions"
            textKey="text"
            idKey="id"
            @emitInput="handleEmittedSearchQuery"
            @emitOption="handleEmmitedOption"
            @emitLocation="handleEmmitedLocation"
          />

          <p
            v-if="checkIfLocation()"
            class="text-sm md:text-lg font-medium mt-4 absolute top-12 left-0"
          >
            Deliver to:
            <span class="text-sm md:text-lg font-bold">{{ checkLocationOutput() }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 mt-10 md:mt-28">
      <div
        class="grid grid-cols-2 sm:grid-cols-3 lg:px-20 md:grid-cols-4 lg:grid-cols-8 gap-y-4 text-center text-green-900"
      >
        <CategoryCard
          v-for="(productCategory, index) in productCategories"
          :key="productCategory.text"
          :index="index"
          :productCategory="{ ...productCategory, index }"
        />
      </div>
    </div>
  </section>
  <Waves />
  <div class="container mx-auto px-4">
    <section>
      <div class="flex items-center gap-x-2">
        <font-awesome-icon
          v-if="isLoaded"
          :icon="['fas', 'fa-thumbs-up']"
          class="text-yellow-400"
        />
        <h2 class="text-xl font-bold">Meals you might like</h2>
      </div>
      <div
        v-if="mealData"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-8 gap-x-8 mt-8"
      >
        <MealCard
          v-for="(meal, index) in mealData.hits"
          :key="meal.recipe.label"
          :meal="meal"
          :price="mealPrices[index]"
          @click="handleMealCardClick(meal, mealPrices[index])"
        />
      </div>
    </section>
    <section class="container mx-auto px-4 py-10">
      <font-awesome-icon
        v-if="isLoaded"
        :icon="['fas', 'fa-check']"
        class="text-7xl mx-auto w-full py-20 text-amber-400"
      />
      <div
        v-if="checkIfLocation()"
        class="flex flex-col w-full items-center justify-center gap-10 pb-20"
      >
        <h3 class="text-xl md:text-3xl font-bold">
          {{
            `Popular filters in ${
              emittedLocation.address.road !== ''
                ? emittedLocation.address.town
                : emittedOption.text
            }`
          }}
        </h3>
        <div class="md:w-1/2">
          <GenericList :items="dishTypes" field="dishType" />
        </div>
      </div>
    </section>
  </div>
  <div class="container mx-auto px-4">
    <h3 class="text-center text-2xl md:text-4xl font-bold pb-20">Anything delivered</h3>
    <section class="flex flex-col items-center">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard v-for="(card, index) in infoCardsData" :key="index" :card="card" />
      </div>
      <div class="pt-20">
        <CtaBtn @click="goToLocalFood" backCol="bg-green-500" textCol="text-gray-100"
          >Explore food around you</CtaBtn
        >
      </div>
    </section>
  </div>
  <section class="w-full">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#fbbf24"
        fill-opacity="1"
        d="M0,128L80,133.3C160,139,320,149,480,165.3C640,181,800,203,960,202.7C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
    </svg>
    <div class="bg-amber-400 w-full pb-20">
      <h3 class="text-center text-2xl md:text-4xl font-bold pb-20">
        Countries where we deliver
      </h3>
      <div class="container mx-auto px-4">
        <GenericList v-if="countriesData" :items="countriesData" field="name.common" />
      </div>
    </div>
  </section>
</template>
