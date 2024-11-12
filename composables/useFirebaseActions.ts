import { getDatabase, ref, set, get, remove, push } from 'firebase/database';

import type { IItem } from '@/interfaces/interfaces.interface';

declare module '#app' {
  interface NuxtApp {
    $database: ReturnType<typeof getDatabase>;
  }
}

export function useFirebaseActions() {
  const { user } = useAuth();
  const { $database } = useNuxtApp();

  function getFavoriteItemRef() {
    if (!user.value) throw new Error('User is not authenticated');
    return ref($database, `users/${user.value.uid}/favoriteItems`);
  }

  async function isLabelAlreadyFavorite(favoriteItem: IItem): Promise<boolean> {
    try {
      const favoriteItemRef = getFavoriteItemRef();
      const snapshot = await get(favoriteItemRef);

      if (!snapshot.exists()) return false;

      const favorites = snapshot.val() as { [key: string]: IItem };
      const isAlreadyFavorite = Object.values(favorites).some(
        (item) => item.label === favoriteItem.label
      );

      return isAlreadyFavorite;
    } catch (error: any) {
      console.error(`Error in isLabelAlreadyFavorite: ${error.message}`);
      return false;
    }
  }

  async function writeFavoriteUserItemData(favoriteItem: IItem) {
    try {
      if (!user.value) {
        console.error('User is not authenticated');
        return;
      }

      const isAlreadyFavorite = await isLabelAlreadyFavorite(favoriteItem);

      if (isAlreadyFavorite) return;

      const favoriteItemRef = getFavoriteItemRef();
      const newFavoriteItemRef = push(favoriteItemRef);
      await set(newFavoriteItemRef, favoriteItem);

      console.log('Item added to favorites');
    } catch (error: any) {
      console.error(`Error adding item to favorites: ${error.message}`);
    }
  }

  async function isItemFavorite(label: string): Promise<boolean> {
    try {
      if (!user.value || !label) {
        console.error('Invalid user or label');
        return false;
      }

      const favoriteItemRef = getFavoriteItemRef();
      const snapshot = await get(favoriteItemRef);

      if (!snapshot.exists()) return false;

      const favorites = snapshot.val() as { [key: string]: IItem };
      const isFavorite = Object.values(favorites).some((item) => item.label === label);

      return isFavorite;
    } catch (error: any) {
      console.error(`Error in isItemFavorite: ${error.message}`);
      return false;
    }
  }
  async function deleteFavoriteUserItemData(favoriteItem: IItem) {
    try {
      if (!user.value || !favoriteItem || !favoriteItem.label) {
        console.error('Invalid item or user not authenticated');
        return;
      }

      const favoriteItemRef = getFavoriteItemRef();
      const snapshot = await get(favoriteItemRef);

      if (!snapshot.exists()) {
        console.log('No favorite items to delete');
        return;
      }

      const favorites = snapshot.val() as { [key: string]: IItem };

      // Find the key of the item to delete based on the label
      const favoriteItemKey = Object.keys(favorites).find(
        (key) => favorites[key].label === favoriteItem.label
      );

      if (favoriteItemKey) {
        const favoriteItemToDeleteRef = ref(
          $database,
          `users/${user.value.uid}/favoriteItems/${favoriteItemKey}`
        );
        await remove(favoriteItemToDeleteRef);
        console.log('Favorite item deleted');
      } else {
        console.log('Item not found in favorites');
      }
    } catch (error: any) {
      console.error(`Error deleting favorite item: ${error.message}`);
    }
  }

  return {
    writeFavoriteUserItemData,
    isItemFavorite,
    deleteFavoriteUserItemData,
  } as const;
}
