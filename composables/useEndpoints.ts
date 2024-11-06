import { fakeStoreCategories } from '@/data/productCategoriesData';

export function useEndpoints(
  category?: string | string[],
  filter?: Ref<string>,
  routeIndex?: string
) {
  const config = useRuntimeConfig();
  console.log(config);
  const restCountriesEndpoint = 'https://restcountries.com/v3.1/region/europe';
  const edamamBaseUrl = 'https://api.edamam.com/api/recipes/v2?type=public';
  const locationiqBaseUrl = 'https://api.locationiq.com/v1/autocomplete';

  const indexMealDataEndpoint = computed(() => {
    return `${edamamBaseUrl}&app_id=${config.public.edamamAppId}&app_key=${config.public.edamamAppKey}&mealType=Dinner&dishType=Main%20course`;
  });

  const locationEndpoint = computed(() => {
    if (filter)
      return `${locationiqBaseUrl}?key=${config.public.apiKeyLocationReverse}&q=${filter.value}&limit=5`;
  });

  const initialFetchEndpoint = computed(() => {
    if (routeIndex)
      return routeIndex !== null && +routeIndex >= 0 && +routeIndex <= 3
        ? edamamApiEndpoint.value
        : fakeStoreEndpoint.value;
  });

  const edamamApiEndpoint = computed(() => {
    return `https://api.edamam.com/api/recipes/v2?type=public&app_id=${config.public.edamamAppId}&app_key=${config.public.edamamAppKey}&mealType=${category}&dishType=Main%20course`;
  });

  const edamamApiFilteredEndpoint = computed(() => {
    if (filter)
      return `https://api.edamam.com/api/recipes/v2?type=public&app_id=${config.public.edamamAppId}&app_key=${config.public.edamamAppKey}&mealType=${category}&cuisineType=${filter.value}`;
  });

  const fakeStoreEndpoint = computed(() => {
    return `https://fakestoreapi.com/products/category/${category}`;
  });

  const fakeStoreFilteredEndpoint = computed(() => {
    if (filter)
      return `https://fakestoreapi.com/products/category/${filter.value.toLowerCase()}`;
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
    restCountriesEndpoint,
    initialFetchEndpoint,
    selectedApiEndpoint,
  } as const;
}
