import { ref as dbRef, get, push, set, update } from 'firebase/database';
import type { IOrder } from '@/types/cart/IOrder';

export function useFirebaseOrderActions() {
  const fetchedOrders = ref<IOrder[]>([]);
  const isLoading = ref<boolean>(false);

  const { setSuccessMessageWithTimeout, handleError, setErrorMessage, handleAuthError } =
    useMessageHandler();
  const { isAuthReady, user } = useAuth();
  const { $database } = useNuxtApp();

  async function fetchOrders(): Promise<void> {
    setErrorMessage('');

    if (!isAuthReady.value) return;

    isLoading.value = true;

    try {
      if (!user.value) throw new Error('User is not authenticated');

      const ordersRef = dbRef($database, `users/${user.value.uid}/orders`);
      const snapshot = await get(ordersRef);

      if (!snapshot.exists()) {
        console.log('No orders found for this user.');
        fetchedOrders.value = [];
        return;
      }

      const orders = snapshot.val();
      fetchedOrders.value = Object.keys(orders).map((key) => ({
        id: key, // Include the order's unique key as an `id` field
        ...orders[key],
      })) as IOrder[];

      console.log('Fetched orders:', fetchedOrders.value);
    } catch (error: any) {
      console.error('Error fetching orders:', error.message);
      handleError(`Error fetching orders: ${error.message}`);
      fetchedOrders.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  async function writeOrderDetails(order: IOrder) {
    setErrorMessage('');

    try {
      if (!user.value) throw new Error('User is not authenticated');

      const ordersRef = dbRef($database, `users/${user.value.uid}/orders`);

      const newOrderRef = push(ordersRef);
      await set(newOrderRef, order);

      console.log('New order added:', order);
      setSuccessMessageWithTimeout('Order information saved successfully');
    } catch (error: any) {
      console.error('Error writing order details:', error.message);
      handleError(`Error writing order details: ${error.message}`);
    }
  }

  return { fetchedOrders, isLoading, fetchOrders, writeOrderDetails };
}
