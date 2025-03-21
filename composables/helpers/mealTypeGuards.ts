import type { IMeals, ISingleMeal, IProduct } from '@/types';

export function isMealData(data: IMeals | IProduct[] | null): data is IMeals {
  return data !== null && 'hits' in data;
}

export function isSingleMealData(item: ISingleMeal | IProduct): item is ISingleMeal {
  return (item as ISingleMeal).recipe !== undefined;
}
