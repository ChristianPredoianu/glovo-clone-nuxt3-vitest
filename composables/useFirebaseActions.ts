import {
  getDatabase,
  ref,
  set,
  get,
  query,
  orderByChild,
  equalTo,
  push,
} from 'firebase/database';

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
    const favoriteItemRef = getFavoriteItemRef();
    const snapshot = await get(favoriteItemRef);

    if (!snapshot.exists()) return false;

    const favorites = snapshot.val() as { [key: string]: IItem };

    const isAlreadyFavorite = Object.values(favorites).some(
      (item) => item.label === favoriteItem.label
    );

    return isAlreadyFavorite;
  }

  async function writeFavoriteUserItemData(favoriteItem: IItem) {
    if (!user.value) return;

    const isAlreadyFavorite = await isLabelAlreadyFavorite(favoriteItem);

    if (isAlreadyFavorite) {
      console.log('Item is already a favorite');
      return;
    }

    const favoriteItemRef = getFavoriteItemRef();
    const newFavoriteItemRef = push(favoriteItemRef);
    await set(newFavoriteItemRef, favoriteItem);
    console.log('Item added to favorites');
  }

  async function isItemFavorite(label: string): Promise<boolean> {
    if (!user.value || !label) return false;

    const favoriteItemRef = getFavoriteItemRef();
    const snapshot = await get(favoriteItemRef);

    if (!snapshot.exists()) return false;

    const favorites = snapshot.val() as { [key: string]: IItem };

    const isFavorite = Object.values(favorites).some((item) => item.label === label);

    return isFavorite;
  }

  return { writeFavoriteUserItemData, isItemFavorite } as const;
}
