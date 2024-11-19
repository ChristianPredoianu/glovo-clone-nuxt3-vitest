import { cuisineTypes, fakeStoreCategories } from '@/data/productCategoriesData';
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';
import type {
  IFakeStoreCategories,
  ICuisineType,
} from '@/interfaces/interfaces.interface';

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
