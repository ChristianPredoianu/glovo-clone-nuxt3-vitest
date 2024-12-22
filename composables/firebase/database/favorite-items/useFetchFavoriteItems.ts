import { ref as dbRef, getDatabase, get } from 'firebase/database';

import type { IItem } from '@/types/products';

declare module '#app' {
  interface NuxtApp {
    $database: ReturnType<typeof getDatabase>;
  }
}

export function useFetchFavoriteItems() {
  const fetchedFavoriteItems: Ref<IItem[]> = ref([]);

  const isLoading = ref(false);

  const { isAuthReady, user } = useAuth();
  const { $database } = useNuxtApp();

  function getFavoriteItemRef() {
    if (!user.value) throw new Error('User is not authenticated');
    return dbRef($database, `users/${user.value.uid}/favoriteItems`);
  }

  async function fetchFavoriteItems() {
    if (!isAuthReady.value) {
      return;
    }

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
      console.error(`Error fetching favorite items: ${error.message}`);
    } finally {
      isLoading.value = false;
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

  return {
    fetchedFavoriteItems,
    isLoading,
    fetchFavoriteItems,
    isItemFavorite,
  } as const;
}
