import type { IItem } from '@/types/products/IItem';
import type { IOrder } from '@/types/cart/IOrder';

export const fetchedFavoriteItems: Ref<IItem[]> = ref([]);
export const fetchedOrders = ref<IOrder[]>([]);
export const isLoading = ref(false);
