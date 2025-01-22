import { ref as dbRef, get, push, set } from 'firebase/database';
import {
  fetchedOrders,
  isLoading,
} from '@/composables/firebase/database/store/databaseStore';
import type { IOrder } from '@/types/cart/IOrder';

export function useFirebaseOrderActions() {
  const { setSuccessMessageWithTimeout, errorMessage, handleError, resetMessage } =
    useMessageHandler();
  const { isAuthReady, user } = useAuth();
  const { $database } = useNuxtApp();

  async function fetchOrders(): Promise<void> {
    resetMessage(errorMessage);

    if (!isAuthReady.value) return;

    isLoading.value = true;

    try {
      if (!user.value) throw new Error('User is not authenticated');

      const ordersRef = dbRef($database, `users/${user.value.uid}/orders`);
      const snapshot = await get(ordersRef);

      if (!snapshot.exists()) {
        fetchedOrders.value = [];
        return;
      }

      const orders = snapshot.val();
      fetchedOrders.value = Object.keys(orders).map((key) => ({
        id: key,
        ...orders[key],
      })) as IOrder[];
    } catch (error: any) {
      console.error('Error fetching orders:', error.message);
      handleError(`Error fetching orders: ${error.message}`);
      fetchedOrders.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  async function writeOrderDetails(order: IOrder) {
    resetMessage(errorMessage);

    try {
      if (!user.value) throw new Error('User is not authenticated');

      const ordersRef = dbRef($database, `users/${user.value.uid}/orders`);

      const newOrderRef = push(ordersRef);
      await set(newOrderRef, order);

      setSuccessMessageWithTimeout('Order information saved successfully');
    } catch (error: any) {
      console.error('Error writing order details:', error.message);
      handleError(`Error writing order details: ${error.message}`);
    }
  }

  return { fetchedOrders, isLoading, fetchOrders, writeOrderDetails };
}
