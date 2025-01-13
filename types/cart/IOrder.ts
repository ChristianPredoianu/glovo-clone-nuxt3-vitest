import type { ICartProduct } from './ICartProduct';

export interface IOrder {
  id?: number;
  numberOfProducts: number;
  products: ICartProduct[];
  totalPrice: number;
}
