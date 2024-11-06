import type { IMeals, IProduct, ISingleMeal } from '@/interfaces/interfaces.interface';

export function useIsMealData() {
  function isMealData(data: IMeals | IProduct[] | null): data is IMeals {
    return data !== null && 'hits' in data;
  }

  function isSingleMealData(item: ISingleMeal | IProduct): item is ISingleMeal {
    return (item as ISingleMeal).recipe !== undefined;
  }

  return { isMealData, isSingleMealData } as const;
}
