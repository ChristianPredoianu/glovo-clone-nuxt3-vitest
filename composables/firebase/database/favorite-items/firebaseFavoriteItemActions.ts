import { ref as dbRef, get, remove, push, set } from 'firebase/database';
import type { IItem } from '@/types/products';

export async function writeFavoriteUserItemData(
  userId: string,
  database: any,
  favoriteItem: IItem
) {
  try {
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }

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
    console.error(`Error adding item to favorites: ${error.message}`);
  }
}

export async function deleteFavoriteUserItemData(
  userId: string,
  database: any,
  favoriteItem: IItem
) {
  try {
    if (!userId || !favoriteItem || !favoriteItem.label) {
      console.error('Invalid item or user not authenticated');
      return;
    }

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
    console.error(`Error deleting favorite item: ${error.message}`);
  }
}

async function isLabelAlreadyFavorite(
  userId: string,
  database: any,
  favoriteItem: IItem
): Promise<boolean> {
  try {
    const favoriteItemRef = dbRef(database, `users/${userId}/favoriteItems`);
    const snapshot = await get(favoriteItemRef);

    if (!snapshot.exists()) return false;

    const favorites = snapshot.val() as { [key: string]: IItem };
    const isAlreadyFavorite = Object.values(favorites).some(
      (item) => item.label === favoriteItem.label
    );

    return isAlreadyFavorite;
  } catch (error: any) {
    return false;
  }
}
