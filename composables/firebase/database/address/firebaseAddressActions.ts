import { ref as dbRef, get, push, set, update } from 'firebase/database';
import type { IShippingAddress } from '@/types/locations';

export async function fetchAddressInfo(
  userId: string,
  database: any,
  address: IShippingAddress
) {
  try {
    if (!userId) {
      console.error('User is not authenticated');
      return;
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
      console.log('No address data found');
    }
  } catch (error: any) {
    console.error('Error fetching address info:', error.message);
  }
}

export async function writeAddressInfo(
  userId: string,
  database: any,
  address: IShippingAddress
) {
  try {
    if (!userId) {
      console.error('User is not authenticated');
      return;
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

      const addressToUpdateRef = dbRef(database, `users/${userId}/address/${addressKey}`);
      await update(addressToUpdateRef, address);
      console.log('Address updated at key:', addressKey);
    }
  } catch (error: any) {
    console.error(`Error writing address info: ${error.message}`);
  }
}
