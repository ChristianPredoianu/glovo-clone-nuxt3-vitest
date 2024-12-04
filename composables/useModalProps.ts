import { useIsMealData } from '@/composables/useIsMealData';
import type {
  IProduct,
  ISingleMeal,
  IMealModalProps,
  IProductModalProps,
  ModalProps,
} from '@/interfaces/interfaces.interface';

export function useModalProps() {
  const mealModalProps = ref<IMealModalProps | null>(null);
  const productModalProps = ref<IProductModalProps | null>(null);

  const { isSingleMealData } = useIsMealData();

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
        price: item.price,
      };
      mealModalProps.value = null;
    }
  }

  const currentModalProps = computed<ModalProps | null>(() => {
    return mealModalProps.value || productModalProps.value || null;
  });

  return { currentModalProps, setModalProps } as const;
}
