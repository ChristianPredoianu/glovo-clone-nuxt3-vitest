import type { IIngredient } from './IIngredient';

export interface ISingleMeal {
  price: number;
  recipe: {
    cuisineType: string[];
    label: string;
    image: string;
    ingredients?: IIngredient[];
    uri: string;
  };
}
