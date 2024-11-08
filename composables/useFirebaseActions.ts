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

  async function writeFavoriteUserItemData(favoriteItem: IItem) {
    const favoriteItemRef = ref($database, 'users/' + user.value?.uid + '/favoriteItems');
    const snapshot = await get(favoriteItemRef);
    const isFavorite = snapshot.exists();
    const newFavoriteItemRef = push(favoriteItemRef);

    set(newFavoriteItemRef, favoriteItem);
  }

  async function fetchFavoriteStatus(favoriteItem: IItem): Promise<boolean> {
    const favoriteItemRef = ref(
      $database,
      `users/${user.value?.uid}/favoriteItems/${favoriteItem.id}`
    );
    const snapshot = await get(favoriteItemRef);
    console.log(snapshot);
    return snapshot.exists();
  }
  return { writeFavoriteUserItemData, fetchFavoriteStatus } as const;
}
