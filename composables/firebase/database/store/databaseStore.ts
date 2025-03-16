import type { IItem, IOrder } from '@/types';

export const fetchedFavoriteItems: Ref<IItem[]> = ref([]);
export const fetchedOrders = ref<IOrder[]>([]);
export const isLoading = ref(false);
