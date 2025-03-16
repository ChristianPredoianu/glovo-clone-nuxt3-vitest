import { ref as dbRef, get, push, set, remove, getDatabase } from 'firebase/database';
import {
  fetchedFavoriteItems,
  isLoading,
} from '@/composables/firebase/database/store/databaseStore';
import type { IItem } from '@/types';

declare module '#app' {
  interface NuxtApp {
    $database: ReturnType<typeof getDatabase>;
  }
}

const { setErrorMessage, resetMessage } = useMessageHandler();

export function useFirebaseFavoriteItemActions() {
  const { $database } = useNuxtApp();
  const { isAuthReady, user } = useAuth();
  const { errorMessage } = useMessageHandler();

  function handleError(message: string, error: any) {
    const errorDetails = error.message || 'An unknown error occurred';
    console.error(`${message}:`, errorDetails);
    setErrorMessage(`${message}: ${errorDetails}`);
  }

  function getFavoriteItemRef() {
    if (!user.value) throw new Error('User is not authenticated');
    return dbRef($database, `users/${user.value.uid}/favoriteItems`);
  }

  async function fetchFavoriteItems() {
    resetMessage(errorMessage);
    errorMessage.value = null;

    if (!isAuthReady.value) return;

    isLoading.value = true;
    try {
      const favoriteItemRef = getFavoriteItemRef();
      const snapshot = await get(favoriteItemRef);

      if (snapshot.exists()) {
        const favorites = snapshot.val() as { [key: string]: IItem };
        fetchedFavoriteItems.value = Object.values(favorites);
      } else {
        fetchedFavoriteItems.value = [];
      }
    } catch (error: any) {
      handleError('Error fetching favorite items', error);
    } finally {
      isLoading.value = false;
    }
  }

  async function isItemFavorite(label: string): Promise<boolean> {
    errorMessage.value = null;
    try {
      if (!user.value || !label) throw new Error('Invalid user or label');

      const favoriteItemRef = getFavoriteItemRef();
      const snapshot = await get(favoriteItemRef);

      if (!snapshot.exists()) return false;

      const favorites = snapshot.val() as { [key: string]: IItem };
      return Object.values(favorites).some((item) => item.label === label);
    } catch (error: any) {
      handleError('Error checking if item is favorite', error);
      return false;
    }
  }

  async function writeFavoriteUserItemData(
    userId: string,
    database: any,
    favoriteItem: IItem
  ) {
    errorMessage.value = null;
    try {
      if (!userId) throw new Error('User is not authenticated');

      const isAlreadyFavorite = await isLabelAlreadyFavorite(
        userId,
        database,
        favoriteItem
      );

      if (isAlreadyFavorite) return;

      const favoriteItemRef = dbRef(database, `users/${userId}/favoriteItems`);
      const newFavoriteItemRef = push(favoriteItemRef);
      await set(newFavoriteItemRef, favoriteItem);
    } catch (error: any) {
      handleError('Error writing favorite item data', error);
    }
  }

  async function deleteFavoriteUserItemData(
    userId: string,
    database: any,
    favoriteItem: IItem
  ) {
    errorMessage.value = null;
    try {
      if (!userId) throw new Error('User is not authenticated');

      if (!favoriteItem || !favoriteItem.label)
        throw new Error('Invalid item provided for deletion');

      const favoriteItemRef = dbRef(database, `users/${userId}/favoriteItems`);
      const snapshot = await get(favoriteItemRef);

      if (!snapshot.exists()) return;

      const favorites = snapshot.val() as { [key: string]: IItem };

      // Find the key of the item to delete based on the label
      const favoriteItemKey = Object.keys(favorites).find(
        (key) => favorites[key].label === favoriteItem.label
      );

      if (favoriteItemKey) {
        const favoriteItemToDeleteRef = dbRef(
          database,
          `users/${userId}/favoriteItems/${favoriteItemKey}`
        );
        await remove(favoriteItemToDeleteRef);
      }
    } catch (error: any) {
      handleError('Error deleting favorite item', error);
    }
  }

  async function isLabelAlreadyFavorite(
    userId: string,
    database: any,
    favoriteItem: IItem
  ): Promise<boolean> {
    errorMessage.value = null;
    try {
      if (!userId) throw new Error('User is not authenticated');

      const favoriteItemsRef = dbRef(database, `users/${userId}/favoriteItems`);
      const snapshot = await get(favoriteItemsRef);

      if (snapshot.exists()) {
        const favoriteItems = snapshot.val() as { [key: string]: IItem };

        return Object.values(favoriteItems).some(
          (item) => item.label === favoriteItem.label
        );
      }
      return false;
    } catch (error: any) {
      handleError('Error checking if item is already favorite', error);
      return false;
    }
  }

  return {
    fetchFavoriteItems,
    fetchedFavoriteItems,
    isLoading,
    isItemFavorite,
    writeFavoriteUserItemData,
    deleteFavoriteUserItemData,
    errorMessage,
  } as const;
}
