import { ref as dbRef, get, push, set, update } from 'firebase/database';
import type { IShippingAddress } from '@/types/locations';

export function useFirebaseAddressActions() {
  const errorMessage = ref<string | null>(null);

  function handleError(message: string, error: any) {
    const errorDetails = error?.message || 'An unknown error occurred';
    console.error(`${message}:`, errorDetails);
    errorMessage.value = `${message}: ${errorDetails}`;
  }

  async function fetchAddressInfo(
    userId: string,
    database: any,
    address: IShippingAddress
  ) {
    errorMessage.value = null;
    try {
      if (!userId) {
        throw new Error('User is not authenticated');
      }

      const addressRef = dbRef(database, `users/${userId}/address`);
      const snapshot = await get(addressRef);

      if (snapshot.exists()) {
        const addressData = snapshot.val();
        const addressKey = Object.keys(addressData)[0];
        const fetchedAddress = addressData[addressKey];

        address.streetAndHouseNumber = fetchedAddress.streetAndHouseNumber || '';
        address.zipCode = fetchedAddress.zipCode || '';
        address.city = fetchedAddress.city || '';
        address.country = fetchedAddress.country || '';
      } else {
        throw new Error('No address data found');
      }
    } catch (error: any) {
      handleError('Error fetching address info', error);
    }
  }

  async function writeAddressInfo(
    userId: string,
    database: any,
    address: IShippingAddress
  ) {
    errorMessage.value = null;
    try {
      if (!userId) {
        throw new Error('User is not authenticated');
      }

      const addressRef = dbRef(database, `users/${userId}/address`);
      const snapshot = await get(addressRef);

      if (!snapshot.exists()) {
        const newAddressRef = push(addressRef);
        await set(newAddressRef, address);
        console.log('New address added:', address);
      } else {
        const existingAddresses = snapshot.val();
        const addressKey = Object.keys(existingAddresses)[0];

        const addressToUpdateRef = dbRef(
          database,
          `users/${userId}/address/${addressKey}`
        );
        await update(addressToUpdateRef, address);
        console.log('Address updated at key:', addressKey);
      }
    } catch (error: any) {
      handleError('Error writing address info', error);
    }
  }

  return { fetchAddressInfo, writeAddressInfo, errorMessage };
}
