import { getDatabase, ref, set, push } from 'firebase/database';

import type { IItem } from '@/interfaces/interfaces.interface';

declare module '#app' {
  interface NuxtApp {
    $database: ReturnType<typeof getDatabase>; // Correctly type $database
  }
}

export function useFirebaseActions() {
  const { user } = useAuth();

  const { $auth, $database } = useNuxtApp();

  function writeFavoriteUserItemData(favoriteItem: IItem) {
    const favoriteItemRef = ref($database, 'users/' + user.value?.uid + '/favoriteItems');
    const newFavoriteItemRef = push(favoriteItemRef);
    return set(newFavoriteItemRef, favoriteItem);
  }
  return { writeFavoriteUserItemData } as const;
}
