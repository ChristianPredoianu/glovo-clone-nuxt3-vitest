import { fakeStoreCategories } from '@/data/productCategoriesData';
import {
  restCountriesEndpoint,
  edamamBaseUrl,
  locationiqBaseUrl,
  fakestoreBaseUrl,
  locationiqReverse,
} from '@/endpoints';

export function useEndpoints(
  category?: string | string[],
  filter?: Ref<string>,
  routeIndex?: string
) {
  const config = useRuntimeConfig();

  const indexMealDataEndpoint = computed(() => {
    return `${edamamBaseUrl}&app_id=${config.public.edamamAppId}&app_key=${config.public.edamamAppKey}&mealType=Dinner&dishType=Main%20course&from=0&to=20`;
  });

  const locationEndpoint = computed(() => {
    if (filter)
      return `${locationiqBaseUrl}?key=${config.public.apiKeyLocationReverse}&q=${filter.value}&limit=5`;
  });

  const locationReverseEndpoint = computed(() => {
    return `${locationiqReverse}?key=${config.public.apiKeyLocationReverse}`;
  });

  console.log(locationReverseEndpoint.value);

  const initialFetchEndpoint = computed(() => {
    if (routeIndex)
      return routeIndex !== null && +routeIndex >= 0 && +routeIndex <= 3
        ? edamamApiEndpoint.value
        : fakeStoreEndpoint.value;
  });

  const edamamApiEndpoint = computed(() => {
    return `${edamamBaseUrl}&app_id=${config.public.edamamAppId}&app_key=${config.public.edamamAppKey}&mealType=${category}&dishType=Main%20course`;
  });

  const edamamApiFilteredEndpoint = computed(() => {
    if (filter)
      return `${edamamBaseUrl}&app_id=${config.public.edamamAppId}&app_key=${config.public.edamamAppKey}&mealType=${category}&cuisineType=${filter.value}`;
  });

  const fakeStoreEndpoint = computed(() => {
    return `${fakestoreBaseUrl}${category}`;
  });

  const fakeStoreFilteredEndpoint = computed(() => {
    if (filter) return `${fakestoreBaseUrl}${filter.value.toLowerCase()}`;
  });

  const selectedApiEndpoint = computed(() => {
    let shouldFetchFromFakeStore;

    if (filter) {
      shouldFetchFromFakeStore = fakeStoreCategories.some(
        (category) => category.category.toLowerCase() === filter.value.toLowerCase()
      );
    }

    return shouldFetchFromFakeStore
      ? fakeStoreFilteredEndpoint.value
      : edamamApiFilteredEndpoint.value;
  });

  return {
    indexMealDataEndpoint,
    locationEndpoint,
    locationReverseEndpoint,
    restCountriesEndpoint,
    initialFetchEndpoint,
    selectedApiEndpoint,
  } as const;
}
