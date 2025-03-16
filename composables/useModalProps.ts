import { isSingleMealData } from '@/composables/helpers/mealTypeGuards';
import type {
  ModalProps,
  IProduct,
  IProductModalProps,
  ISingleMeal,
  IMealModalProps,
} from '@/types';

export function useModalProps() {
  const mealModalProps = ref<IMealModalProps | null>(null);
  const productModalProps = ref<IProductModalProps | null>(null);

  const currentModalProps = computed<ModalProps | null>(() => {
    return mealModalProps.value || productModalProps.value || null;
  });

  function extractRecipeId(uri: string): string {
    const prefix = '#recipe_';
    const index = uri.indexOf(prefix);

    return uri.substring(index + prefix.length);
  }

  function setModalProps(item: ISingleMeal | IProduct) {
    if (isSingleMealData(item)) {
      mealModalProps.value = {
        id: extractRecipeId(item.recipe.uri),
        label: item.recipe.label,
        img: item.recipe.image,
        ingredients: item.recipe.ingredients || [],
        price: item.price,
      };
      productModalProps.value = null;
    } else {
      productModalProps.value = {
        id: item.id,
        label: item.title!,
        img: item.image,
        description: item.description,
        price: item.price,
      };
      mealModalProps.value = null;
    }
  }

  return { currentModalProps, setModalProps } as const;
}
