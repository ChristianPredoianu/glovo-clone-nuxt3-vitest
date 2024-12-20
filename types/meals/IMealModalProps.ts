import type { IIngredient } from './IIngredient';
import type { IProductModalProps } from '../products';

export interface IMealModalProps extends IProductModalProps {
  ingredients: IIngredient[];
}
