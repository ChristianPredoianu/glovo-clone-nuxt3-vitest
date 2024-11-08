import { getDatabase, ref, set, get, remove } from 'firebase/database';

import type { IItem } from '@/interfaces/interfaces.interface';

declare module '#app' {
  interface NuxtApp {
    $database: ReturnType<typeof getDatabase>;
  }
}

export function useFirebaseActions() {
  const { user } = useAuth();
  const { $database } = useNuxtApp();

  async function writeFavoriteUserItemData(favoriteItem: IItem) {
    const favoriteItemRef = ref($database, 'users/' + user.value?.uid + '/favoriteItems');
    const snapshot = await get(favoriteItemRef);
    const isFavorite = snapshot.exists();
    /*  const newFavoriteItemRef = push(favoriteItemRef);

    return set(newFavoriteItemRef, favoriteItem); */

    if (isFavorite) {
      await remove(favoriteItemRef);
    } else {
      await set(favoriteItemRef, favoriteItem);
    }
  }

  async function fetchFavoriteStatus(favoriteItem: IItem): Promise<boolean> {
    const favoriteItemRef = ref(
      $database,
      `users/${user.value?.uid}/favoriteItems/${favoriteItem.id}`
    );
    const snapshot = await get(favoriteItemRef);
    return snapshot.exists();
  }
  return { writeFavoriteUserItemData, fetchFavoriteStatus } as const;
}
