import { ref as dbRef, get, push, set, update } from 'firebase/database';
import type { IShippingAddress } from '@/types';

export function useFirebaseAddressActions() {
  const { setSuccessMessageWithTimeout, setErrorMessage } = useMessageHandler();

  function handleError(message: string, error: any) {
    const errorDetails = error?.message || 'An unknown error occurred';
    setErrorMessage(`${message}: ${errorDetails}`);
  }

  async function fetchAddressInfo(
    userId: string,
    database: any,
    address: IShippingAddress
  ) {
    setErrorMessage('');

    if (!userId) {
      handleError('Error writing address info', new Error('User is not authenticated'));
      return;
    }

    try {
      const addressRef = dbRef(database, `users/${userId}/address`);
      const snapshot = await get(addressRef);

      if (!snapshot.exists()) throw new Error('No address information found');

      const addressData = snapshot.val();
      const addressKey = Object.keys(addressData)[0];
      const fetchedAddress = addressData[addressKey];

      address.streetAndHouseNumber = fetchedAddress.streetAndHouseNumber || '';
      address.zipCode = fetchedAddress.zipCode || '';
      address.city = fetchedAddress.city || '';
      address.country = fetchedAddress.country || '';
    } catch (error: any) {
      handleError('Please update your address info', error);
    }
  }

  async function writeAddressInfo(
    userId: string,
    database: any,
    address: IShippingAddress
  ) {
    setErrorMessage('');

    if (!userId) {
      return handleError(
        'Error fetching address info',
        new Error('User is not authenticated')
      );
    }

    try {
      const addressRef = dbRef(database, `users/${userId}/address`);
      const snapshot = await get(addressRef);

      if (!snapshot.exists()) {
        const newAddressRef = push(addressRef);
        await set(newAddressRef, address);
        console.log('New address added:', address);
        setSuccessMessageWithTimeout('Address information saved successfully');
        return;
      }

      // Update existing address
      const existingAddresses = snapshot.val();
      const addressKey = Object.keys(existingAddresses)[0];
      const existingAddress = existingAddresses[addressKey];

      const hasChanges = Object.entries(address).some(
        ([key, value]) => value !== existingAddress[key]
      );

      if (!hasChanges) {
        setErrorMessage(
          'No changes detected, update the fields if you want to update your address.'
        );
        return;
      }

      const addressToUpdateRef = dbRef(database, `users/${userId}/address/${addressKey}`);
      await update(addressToUpdateRef, address);
      console.log('Address updated at key:', addressKey);
      setSuccessMessageWithTimeout('Address information updated successfully');
    } catch (error: any) {
      handleError('Error writing address info', error);
    }
  }

  return { fetchAddressInfo, writeAddressInfo };
}
