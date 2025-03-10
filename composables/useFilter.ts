import { cuisineTypes, fakeStoreCategories } from '@/data/productCategoriesData';
import { capitalizeFirstLetter } from '@/composables/helpers/capitalizeFirstLetter';
import type { IFakeStoreCategories } from '@/types/products';
import type { ICuisineType } from '@/types/meals';

export function useFilter() {
  const route = useRoute();

  const isFakeStoreIndex = computed(() => {
    const index = route.query.index ? Number(route.query.index) : 0;
    return index > 3;
  });

  const filters = computed(() => {
    return isFakeStoreIndex.value ? fakeStoreCategories : cuisineTypes;
  });

  function getCategoryName(category: IFakeStoreCategories | ICuisineType) {
    return 'category' in category
      ? capitalizeFirstLetter(category.category)
      : category.cuisineType;
  }

  return {
    isFakeStoreIndex,
    filters,
    getCategoryName,
  } as const;
}
